/*
 |--------------------------------------------------------------------------
 | Models - View User Auth
 |--------------------------------------------------------------------------
 */
	const Mongoose = require( 'mongoose' );
	const db = require( _directory_base + '/config/database.js' );
	const Connection = Mongoose.createConnection( db.auth[config.app.env].url );
	const ViewUserAuthSchema = Mongoose.Schema( {} );

/*
 |--------------------------------------------------------------------------
 | Exports
 |--------------------------------------------------------------------------
 */
	module.exports = Connection.model( 'ViewUserAuth_v_1_1', ViewUserAuthSchema, 'VIEW_USER_AUTH' );