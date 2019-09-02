/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const jwt = require( 'jsonwebtoken' );
	const uuid = require( 'uuid' );
	const nJwt = require( 'njwt' );
	const jwtDecode = require( 'jwt-decode' );
	const routes_versioning = require( 'express-routes-versioning' )();

	// Controllers Variable
	const Controllers = {
		V1: {
			ClassBlockController: require( _directory_base + '/app/Http/Controllers/V1/ClassBlockController.js' ),
			InspectionBarisController: require( _directory_base + '/app/Http/Controllers/V1/InspectionBarisController.js' ),
			KafkaRequestController: require( _directory_base + '/app/Http/Controllers/V1/KafkaRequestController.js' )

		}
	}

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
|
| Note :
| 	Untuk memanggil setiap API butuh 2 header, yaitu : Authorization dan 
| 	accept-version.
| 	Contoh value :
| 		Authorization: Bearer hJHWHFW88JFWJ56562dwdbw
| 		accept-version: 1.0.0
|
*/
	
	module.exports = ( app ) => {

		/*
		 |--------------------------------------------------------------------------
		 | Welcome Message
		 |--------------------------------------------------------------------------
		 */
			app.get( '/', ( req, res ) => {
				res.json( { 
					application: {
						name : config.app.name,
						port : config.app.port[config.app.env],
						environment : config.app.env
					} 
				} )
			} );
		
		app.post( '/api/report/class-block', routes_versioning( {
			"1.0.0": Controllers.V1.ClassBlockController.create_or_update_v_1_0
		} ) );

		app.get( '/api/report/class-block/periode/:werks/:date', routes_versioning( {
			"1.0.0": Controllers.V1.ClassBlockController.find_by_periode_v_1_0
		} ) );

		app.get( '/api/report/inspection-baris/:location/:start_date/:end_date', routes_versioning( {
			"1.0.0": Controllers.V1.InspectionBarisController.find_v_1_0
		} ) );

		app.get( '/api/report/inspection-baris-valid/:location/:periode', routes_versioning( {
			"1.0.0": Controllers.V1.InspectionBarisController.find_valid_v_1_0
		} ) );

		app.post( '/api/report/inspection-baris', routes_versioning( {
			"1.0.0": Controllers.V1.InspectionBarisController.create_or_update_v_1_0
		} ) );
		app.post( '/api/report/request-report', routes_versioning( {
			"1.0.0": Controllers.V1.KafkaRequestController.request_data
		} ) );
		

	}

/*
|--------------------------------------------------------------------------
| Verify Token
|--------------------------------------------------------------------------
*/
function token_verify( req, res, next ) {
	const bearerHeader = req.headers['authorization'];

	if ( typeof bearerHeader !== 'undefined' ) {
		const bearer = bearerHeader.split( ' ' );
		const bearer_token = bearer[1];
		req.token = bearer_token;

		nJwt.verify( bearer_token, config.secret_key, config.token_algorithm, ( err, authData ) => {
			if ( err ) {
				res.send({
					status: false,
					message: "Invalid Token",
					data: []
				} );
			}
			else {
				req.auth = jwtDecode( req.token );
				req.auth.LOCATION_CODE_GROUP = req.auth.LOCATION_CODE.split( ',' );
				req.config = config;
				next();
			}
		} );
	}
	else {
		res.sendStatus( 403 ); // Forbidden
	}
}