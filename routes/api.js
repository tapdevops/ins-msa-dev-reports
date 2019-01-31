const jwt = require( 'jsonwebtoken' );
const config = require( '../config/app.js' );
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );
const jwtDecode = require( 'jwt-decode' );

function token_verify( req, res, next ) {
	// Get auth header value
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
		// Forbidden
		res.sendStatus( 403 );
	}
}

module.exports = ( app ) => {

	// Declare Controllers
	//const afdeling = require( '../app/controllers/afdeling.js' );

	//app.get( '/sync-mobile/region/:start_date/:end_date', token_verify, region.syncMobile );
	//app.post( '/region', verifyToken, region.create );
	//app.get( '/region', token_verify, region.find );
	//app.get( '/region/:id', verifyToken, region.findOne );
	//app.put( '/region/:id', verifyToken, region.update );
	//app.delete( '/region/:id', verifyToken, region.delete );

}