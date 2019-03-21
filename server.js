/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const express = require( 'express' );
	const mongoose = require( 'mongoose' );
	const bodyParser = require( 'body-parser' );

	// Config Variable
	const database = require( './config/database.js' );
	const config = require( './config/app.js' );

	// Global Variable
	global._directory_base = __dirname;
	global._directory_root = '';

	// Variable
	const app = express();

/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
	// Setup Database
	mongoose.Promise = global.Promise;
	mongoose.connect( database.url, {
		useNewUrlParser: true,
		ssl: database.ssl
	} ).then( () => {
		console.log( 'Successfully connected to the Database' );
	} ).catch( err => {
		console.log( 'Could not connect to the Database. Exiting application.' )
	} );

	// Setup App
	app.use( bodyParser.urlencoded( { extended: true } ) );
	app.use( bodyParser.json() );
	app.listen( config.app_port, () => {
		var host = config.ip_address;
		var port = config.app_port;
		console.log( config.app_name + ' running on ' + config.app_port )
	} );

// Routes
app.get( '/', ( req, res ) => {
	res.json( { 'message': config.app_name } )
} );

// Require Bisnis Area Routes
require( './routes/api.js' )( app );
module.exports = app;