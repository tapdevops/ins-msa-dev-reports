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
	var data_source_request = {
		"auth": false,
		"finding": false,
	}
	var kafka = require( "kafka-node" ),
	Producer = kafka.Producer,
	Consumer = kafka.Consumer,
	client = new kafka.KafkaClient( { kafkaHost: "149.129.252.13:9092" } ),
	producer = new Producer( client ),
	consumer = new Consumer(
		client,
		[
			{ topic: 'kafkaRequestData', partition: 0 }, { topic: 'kafkaDataCollectionProgress', partition: 0 }, { topic: 'kafkaResponse', partition: 0 }
		],
		{
			autoCommit: false
		}
	);
	consumer.on( 'message', function( message ) {
		json_message = JSON.parse( message.value );
		if( message.topic == "kafkaRequestData" ){
			let reqDataObj;
			let responseData = false;
			if( json_message.msa_name == "finding" ) {
				reqDataObj = {
					"msa_name": json_message.msa_name,
					"model_name": json_message.model_name,
					"requester": json_message.requester,
					"request_id": json_message.request_id,
				}
			}
		}
	} )
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

	// Routing
	require( './routes/api.js' )( app );
	module.exports = app;