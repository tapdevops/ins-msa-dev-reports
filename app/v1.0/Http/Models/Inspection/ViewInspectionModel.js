/*
 |--------------------------------------------------------------------------
 | Models - View Inspection
 |--------------------------------------------------------------------------
 */
	const Mongoose = require( 'mongoose' );
	const Database = require( _directory_base + '/config/database.js' );
	const Connection = Mongoose.createConnection( Database.auth[config.app.env].url );
	const ViewInspectionSchema = Mongoose.Schema( {} );

/*
 |--------------------------------------------------------------------------
 | Exports
 |--------------------------------------------------------------------------
 */
	module.exports = Connection.model( 'ViewInspection_v_1_0', ViewInspectionSchema, 'VIEW_INSPECTION' );
