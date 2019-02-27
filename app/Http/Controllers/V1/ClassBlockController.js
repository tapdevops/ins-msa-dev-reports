/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const ClassBlockSchema = require( _directory_base + '/app/Http/Models/V1/ClassBlockSchema.js' );

	// Variable
	const config = require( _directory_base + '/config/app.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.create_v_1_0 = ( req, res ) => {
		const set = new ClassBlockSchema( {
			WERKS: req.body.WERKS,
			AFD_CODE: req.body.AFD_CODE,
			BLOCK_CODE: req.body.BLOCK_CODE,
			CLASS_BLOCK: req.body.CLASS_BLOCK,
			WERKS_AFD_BLOCK_CODE: req.body.WERKS + req.body.AFD_CODE + req.body.BLOCK_CODE,
			WERKS_AFD_CODE: req.body.WERKS + req.body.AFD_CODE,
			DATE_TIME: req.body.DATE_TIME,
			INSERT_TIME: req.body.INSERT_TIME,
			UPDATE_TIME: req.body.UPDATE_TIME,
			DELETE_TIME: req.body.DELETE_TIME
		} );

		set.save()
		.then( data => {
			if ( !data ) {
				return res.send( {
					status: true,
					message: 'Error!',
					data: []
				} );
			}
			
			res.send( {
				status: true,
				message: 'Success!',
				data: []
			} );
		} ).catch( err => {
			res.send( {
				status: true,
				message: 'Error!',
				data: []
			} );
		} );
	}