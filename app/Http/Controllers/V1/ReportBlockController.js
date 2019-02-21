/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const ClassBlockModel = require( _directory_base + '/app/Http/Models/V1/ClassBlockModel.js' );

	// Variable
	const config = require( _directory_base + '/config/app.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.create_v_1_0 = ( req, res ) => {

		console.log(config);

		var auth = req.auth;
		const setdata = new ClassBlockModel( {
			WERKS: req.body.WERKS,
			AFD_CODE: req.body.AFD_CODE,
			BLOCK_CODE: req.body.BLOCK_CODE,
			//WERKS_AFD_BLOCK_CODE: req.body.WERKS_AFD_BLOCK_CODE,
			//CLASS: req.body.CLASS,
			//SCORE: req.body.SCORE,
			//PERIODE: req.body.PERIODE,
			//INSERT_TIME: 20190101595959,
			//UPDATE_TIME: 20190101595959,
			//DELETE_TIME: 20190101595959
		} );

		setdata.save()
		.then( data => {
			if ( !data_log ) {
				return res.send( {
					status: false,
					message: config.error_message.create_404,
					data: {}
				} );
			}
			//res.send( {
			//	status: true,
			//	message: config.error_message.create_200,
			//	data: []
			//} );
			res.json( {
				message: 'OK, create',
				data: req.body,
				auth: auth
			} );
		} ).catch( err => {
			res.send( {
				status: false,
				message: config.error_message.create_500,
				data: {},
				error: err
			} );
		} );

		
	}
	

	exports.find_v_1_0 = ( req, res ) => {
		res.json( {
			message: 'OK'
		} )
	}