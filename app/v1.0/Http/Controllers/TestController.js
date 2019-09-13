/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Node Modules
 	const Mongoose = require( 'mongoose' );
 	const Kafka = require("kafka-node")

	//Models
	const Models = {
		"Auth": {
			"ViewUserAuth": require( _directory_base + '/app/v1.0/Http/Models/Auth/ViewUserAuthModel.js' ),
		},
		// "Auth": {
		// 	"ViewUserAuth": require( _directory_base + '/app/v1.0/Http/Models/Auth/ViewUserAuthModel.js' ),
		// },
		"Reports": {
			"DataSource": require( _directory_base + '/app/v1.0/Http/Models/Reports/DataSourceModel.js' ),
			"DataResult": require( _directory_base + '/app/v1.0/Http/Models/Reports/DataResultModel.js' ),
			"RequestData": require( _directory_base + '/app/v1.0/Http/Models/Reports/RequestDataModel.js' ),
		}
	}

	// Libraries
	const HelperLib = require( _directory_base + '/app/v1.0/Http/Libraries/HelperLib.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.data = ( req, res ) => {
		Models.Reports.DataSource.find( {
			REQUEST_ID: "1",
			MSA_NAME: "auth",
			IS_DONE: 0
		} )
		.count()
		.then( data => {
			return res.json( {
				data: data
			} );
		} );
	}
	