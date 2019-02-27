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

	// Config Variable
	const config = require( _directory_base + '/config/app.js' );

	// Controllers Variable
	const Controllers = {
		V1: {
			ClassBlockController: require( _directory_base + '/app/Http/Controllers/V1/ClassBlockController.js' ),
			InspectionBarisController: require( _directory_base + '/app/Http/Controllers/V1/InspectionBarisController.js' )
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

		app.post( '/api/report/class-block', routes_versioning( {
			"1.0.0": Controllers.V1.ClassBlockController.create_v_1_0
		} ) );
		
		app.get( '/api/report/inspection-baris/:location/:start_date/:end_date', routes_versioning( {
			"1.0.0": Controllers.V1.InspectionBarisController.find_v_1_0
		} ) );

		app.post( '/api/report/inspection-baris', routes_versioning( {
			"1.0.0": Controllers.V1.InspectionBarisController.create_v_1_0
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