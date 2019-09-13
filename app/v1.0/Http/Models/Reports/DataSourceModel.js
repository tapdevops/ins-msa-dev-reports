/*
 |--------------------------------------------------------------------------
 | Variable
 |--------------------------------------------------------------------------
 */
	const Mongoose = require( 'mongoose' );
	const ObjectId = Mongoose.Schema.Types.ObjectId;

/*
 |--------------------------------------------------------------------------
 | Schema
 |--------------------------------------------------------------------------
 */
	const DataSourceSchema = Mongoose.Schema( {
		MSA_NAME: String,
		MODEL_NAME: String,
		REQUESTER: String,
		REQUEST_ID: String,
		IS_DONE: {
			type: Number,
			get: v => Math.floor( v ),
			set: v => Math.floor( v ),
			alias: 'i',
			default: function() {
				return 0;
			}
		}
	} );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = Mongoose.model( 'DataSource_v_1_0', DataSourceSchema, 'DATASOURCE_REQUEST' );