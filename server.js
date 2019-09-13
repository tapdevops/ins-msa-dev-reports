/*
|--------------------------------------------------------------------------
| Global APP Init
|--------------------------------------------------------------------------
*/
	global._directory_base = __dirname;
	global._default_db = 'reports';
	global._latest_version = 'v1.0';
	global.config = {};
		config.app = require( './config/app.js' );
		config.database = require( './config/database.js' )[_default_db][config.app.env];

	//Models
	const Datasource = require( _directory_base + '/app/Http/Models/V1/DatasourceModel.js' );
	const Dataresult = require( _directory_base + '/app/Http/Models/V1/DataresultModel.js' );

	// Database Models
	const Models = {
		"Auth": {
			"ViewUserAuth": require( _directory_base + '/app/' + _latest_version + '/Http/Models/Auth/ViewUserAuthModel.js' ),
		},
		// "Inspection": {
		// 	"ViewInspection": require( _directory_base + '/app/' + _latest_version + '/Http/Models/Inspection/ViewInspectionModel.js' ),
		// },
		"Reports": {
			"DataSource": require( _directory_base + '/app/' + _latest_version + '/Http/Models/Reports/DataSourceModel.js' ),
			"DataResult": require( _directory_base + '/app/' + _latest_version + '/Http/Models/Reports/DataResultModel.js' ),
		}
	}

	// Database Set
	async function async_foreach( array, callback ) {
		for ( let index = 0; index < array.length; index++ ) {
			await callback( array[index], index, array );
		}
	}

/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const BodyParser = require( 'body-parser' );
	const Express = require( 'express' );
	const App = Express();
	const Mongoose = require( 'mongoose' );

	// Primary Variable
	var kafka = require( "kafka-node" );
	var Producer = kafka.Producer;
	var Consumer = kafka.Consumer;
	var client = new kafka.KafkaClient( { kafkaHost: "149.129.252.13:9092" } );
	var producer = new Producer( client );
	var consumer = new Consumer(
		client,
		[
			{ topic: 'kafkaRequestData', partition: 0 }, { topic: 'kafkaDataCollectionProgress', partition: 0 }, { topic: 'kafkaResponse', partition: 0 }
		],
		{
			autoCommit: false
		}
	);

	consumer.on( 'message', async function( message ) {
		let json_message = JSON.parse( message.value );
		if ( message.topic == "kafkaDataCollectionProgress" ){ 
			console.log("kafkaDataCollectionProgress Topic");
			if(json_message.requester == "web" ) {
				console.log("Requester Web");
				Datasource.findOneAndUpdate( 
					{
						MSA_NAME: json_message.msa_name,
						MODEL_NAME: json_message.model_name,
						REQUESTER: json_message.requester,
						REQUEST_ID: json_message.request_id,
						IS_DONE : 0	
					}, 
					{
						IS_DONE: 1
					} 
				).then( update_datasource => {
					console.log( "Run Datasource.findOneAndUpdate()" );
					Datasource.find( {
						REQUESTER: json_message.requester,
						REQUEST_ID: json_message.request_id,
						IS_DONE : 0
					} )
					.count()
					.then( datasource_count => {
						console.log( "Run Datasource.find()" );
						if ( datasource_count == 0 ) {
							var ssh = new SSH({
								host: '149.129.252.13',
								user: 'root',
								pass: 'T4pagri123'
							});
							var z = 1;
							//buat switch app dari stream(yang lagi jalan) ke data processor
							ssh.exec("nohup /root/spark/bin/spark-submit /root/pyspark/code/collecting.py requester="+json_message.requester+"/request_id="+json_message.request_id+" > /root/pyspark/output/collectorlog.txt &", {
								out: function(stdout) {
									console.log(stdout);
									console.log( "Z Run : " + z );
									z++;
								}
							}).start();
						}
					} );
				} );
				// let docs = await Datasource.find( {
				// 	REQUESTER: json_message.requester,
				// 	REQUEST_ID: json_message.request_id,
				// 	IS_DONE : 0	
				// } );

				
				// if ( docs.length == 0 ) {
				// 	console.log( "ABCDE" );
				// 	var SSH = require('simple-ssh');
				
				// 	var ssh = new SSH({
				// 		host: '149.129.252.13',
				// 		user: 'root',
				// 		pass: 'T4pagri123'
				// 	});
				// 	//buat switch app dari stream(yang lagi jalan) ke data processor
				// 	ssh.exec("nohup /root/spark/bin/spark-submit /root/pyspark/code/collecting.py requester="+json_message.requester+"/request_id="+json_message.request_id+" > /root/pyspark/output/collectorlog.txt &", {
				// 		out: function(stdout) {
				// 			console.log(stdout);
				// 		}
				// 	}).start();
				// }
				
			}	
		}
		else if ( message.topic == "kafkaResponse" ) {
			console.log( "INPUT DB FROM SPARK" );
			const set = new Dataresult( {
				REQUESTER: json_message.requester,
				REQUEST_ID: json_message.request_id,
				"DATA": json_message.data
			} );
			set.save();
		}
	} );

	consumer.on( 'error', function( error, data ) {
		console.log( error );
	} );

/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
	// Parse request of content-type - application/x-www-form-urlencoded
	App.use( BodyParser.urlencoded( { extended: false } ) );

	// Parse request of content-type - application/json
	App.use( BodyParser.json() );

	// Setup Database
	Mongoose.Promise = global.Promise;
	Mongoose.connect( config.database.url, {
		useNewUrlParser: true,
		ssl: config.database.ssl
	} ).then( () => {
		console.log( "Database Connected:  (" + config.app.env + ")" + config.database.url );
	} ).catch( err => {
		console.log( "\tDatabase Not Connected" );
	} );

	// Server Running Message
	var Server = App.listen( parseInt( config.app.port[config.app.env] ), () => {
		console.log( "Server " + config.app.name + ":" + config.app.port[config.app.env] + " (" + config.app.env + ") is connected." );
	} );

	// Server Timeout (Minutes * Seconds * Miliseconds)
	Server.timeout = 30 * 60 * 1000;

	// Routing
	require( './routes/api.js' )( App );

	// Exports
	module.exports = App;
