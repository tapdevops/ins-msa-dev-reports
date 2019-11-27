/*
|--------------------------------------------------------------------------
| Global APP Init
|--------------------------------------------------------------------------
*/
	global._directory_base = __dirname;
	global.config = {};
		config.app = require( './config/app.js' );
		config.database = require( './config/database.js' )[config.app.env];

/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const body_parser = require( 'body-parser' );
	const express = require( 'express' );
	const mongoose = require( 'mongoose' );

	// Primary Variable
	const app = express();

	//Models
	const TitikRestan = require( _directory_base + '/app/v1.1/Http/Models/TitikRestanSchema.js' );
	const KafkaPayload = require( _directory_base + '/app/v1.1/Http/Models/KafkaPayloadSchema.js' );

	//Helper
	const Helper = require( _directory_base + '/app/v1.1/Http/Libraries/Helper.js' );

/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
	// Parse request of content-type - application/x-www-form-urlencoded
	app.use( body_parser.urlencoded( { extended: false } ) );

	// Parse request of content-type - application/json
	app.use( body_parser.json() );

	// Setup Database
	mongoose.Promise = global.Promise;
	mongoose.connect( config.database.url, {
		useNewUrlParser: true,
		ssl: config.database.ssl
	} ).then( () => {
		console.log( "Database :" );
		console.log( "\tStatus \t\t: Connected" );
		console.log( "\tMongoDB URL \t: " + config.database.url + " (" + config.app.env + ")" );
	} ).catch( err => {
		console.log( "Database :" );
		console.log( "\tDatabase Status : Not Connected" );
		console.log( "\tMongoDB URL \t: " + config.database.url + " (" + config.app.env + ")" );
	} );

	// Server Running Message
	app.listen( parseInt( config.app.port[config.app.env] ), () => {
		console.log( "Server :" );
		console.log( "\tStatus \t\t: OK" );
		console.log( "\tService \t: " + config.app.name + " (" + config.app.env + ")" );
		console.log( "\tPort \t\t: " + config.app.port[config.app.env] );
	} );

/*
|--------------------------------------------------------------------------
| Kafka Consumer
|--------------------------------------------------------------------------
*/
	const kafka = require( 'kafka-node' );
	const Consumer = kafka.Consumer;
	const Offset = kafka.Offset;
	const Client = kafka.KafkaClient;
	const topic = 'WEB_REPORT_TITIK_RESTAN';
	const client = new Client( { kafkaHost: config.app.kafka[config.app.env].server_host } );
	const topics = [
		{ topic: topic, partition: 0 }
	];
	const options = { 
		autoCommit: false, 
		fetchMaxWaitMs: 1000, 
		fetchMaxBytes: 1024 * 1024
	};

	const consumer = new Consumer(client, topics, options);
	const offset = new Offset(client);
	
	consumer.on( 'message', ( message ) => {
		if( message ) {
			let data = JSON.parse( message.value );
			TitikRestan.findOne( { BCC: data.BCC } ).then( bcc => {
				if ( !bcc ) {
					if( data ) {
						let set = new TitikRestan ( {
							OPH:data.OPH,
							BCC: data.BCC,
							TPH_RESTANT_DAY: data.TPHRD,
							LATITUDE: data.LAT,
							LONGITUDE: data.LON,
							JML_JANJANG: data.JMLJJ,
							JML_BRONDOLAN: data.JMLBD,
							KG_TAKSASI: data.KGTKS,
							TGL_REPORT: data.TGLRP,
							WERKS: data.WERKS,
							EST_NAME: data.EST_NAME,
							AFD_CODE: data.AFD_CODE,
							BLOCK_CODE: data.BLOCK_CODE,
							BLOCK_NAME: data.BLOCK_NAME
						} );
						set.save()		
						.then( () => {
							console.log( 'sukses simpan' );
						} )
						.catch( err => {
							console.log( err.message );
						} );
					}			
				}
			} );
		} 
	} );
	consumer.on( 'error', function( err ) {
		console.log( 'error', err );
	} );

	consumer.on( 'offsetOutOfRange', function( topic ) {
		topic.maxNum = 2;
		offset.fetch([topic], function( err, offsets ) {
			if( err ) {
				return console.error( err );
			}
			var min = Math.min.apply( null, offsets[topic.topic][topic.partition] );
			consumer.setOffset( topic.topic, topic.partition, min );
		});
	});

	// Routing
	require( './routes/api.js' )( app );
	module.exports = app;