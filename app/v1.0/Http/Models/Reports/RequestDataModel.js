/*
 |--------------------------------------------------------------------------
 | Variable
 |--------------------------------------------------------------------------
 */
	const Mongoose = require( 'mongoose' );

/*
 |--------------------------------------------------------------------------
 | Schema
 |--------------------------------------------------------------------------
 */
	const RequestDataSchema = Mongoose.Schema( {
		BODY: String,
		INSERT_TIME: {
			type: Number,
			get: v => Math.floor( v ),
			set: v => Math.floor( v ),
			alias: 'i',
			default: function() {
				return 0;
			}
		},
		INSERT_USER: String
	} );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = Mongoose.model( 'RequestData', RequestDataSchema, 'TR_REQUEST_DATA' );