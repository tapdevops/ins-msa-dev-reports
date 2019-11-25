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
		v_1_1: {
			ClassBlockController: require( _directory_base + '/app/v1.1/Http/Controllers/ClassBlockController.js' ),
			InspectionBarisController: require( _directory_base + '/app/v1.1/Http/Controllers/InspectionBarisController.js' ),
			TitikRestanController: require( _directory_base + '/app/v1.1/Http/Controllers/TitikRestanController.js' )
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
		

		/*
		 |--------------------------------------------------------------------------
		 | API 1.1
		 |--------------------------------------------------------------------------
		 */

		app.post( '/api/v1.1/report/class-block',  Controllers.v_1_1.ClassBlockController.create_or_update );

		app.get( '/api/v1.1/report/class-block/periode/:werks/:date', Controllers.v_1_1.ClassBlockController.find_by_periode );

		app.get( '/api/v1.1/report/inspection-baris/:location/:start_date/:end_date', Controllers.v_1_1.InspectionBarisController.find );

		app.get( '/api/v1.1/report/inspection-baris-valid/:location/:periode',  Controllers.v_1_1.InspectionBarisController.find_valid );

		app.post( '/api/v1.1/report/inspection-baris',  Controllers.v_1_1.InspectionBarisController.create_or_update );

		app.get( '/api/v1.1/report/titik-restan', Controllers.v_1_1.TitikRestanController.titik_restan );
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