/*
 |--------------------------------------------------------------------------
 | Variable
 |--------------------------------------------------------------------------
 */
    const mongoose = require( 'mongoose' );

/*
 |--------------------------------------------------------------------------
 | Schema
 |--------------------------------------------------------------------------
 */
    const DatasourceSchema = mongoose.Schema( {
        MSA_NAME: String,
        MODEL_NAME: String,
        REQUESTER: String,
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
    module.exports = mongoose.model( 'Datasource', DatasourceSchema, 'DATASOURCE_REQUEST' );