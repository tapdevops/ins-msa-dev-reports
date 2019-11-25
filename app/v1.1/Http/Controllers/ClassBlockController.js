/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const ClassBlockSchema = require( _directory_base + '/app/v1.1/Http/Models/ClassBlockSchema.js' );

	// Variable
	const config = require( _directory_base + '/config/app.js' );

	// Middleware
	const Date = require( _directory_base + '/app/v1.1/Http/Middleware/Date.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.create_or_update = async ( req, res ) => {
		var body = {
			WERKS: req.body.WERKS,
			AFD_CODE: req.body.AFD_CODE,
			BLOCK_CODE: req.body.BLOCK_CODE,
			CLASS_BLOCK: req.body.CLASS_BLOCK,
			WERKS_AFD_BLOCK_CODE: req.body.WERKS + req.body.AFD_CODE + req.body.BLOCK_CODE,
			WERKS_AFD_CODE: req.body.WERKS + req.body.AFD_CODE,
			DATE_TIME: req.body.DATE_TIME
		};
		var query = await ClassBlockSchema.find( {
			WERKS_AFD_BLOCK_CODE: body.WERKS_AFD_BLOCK_CODE,
			DATE_TIME: req.body.DATE_TIME
		} );

		// Update Data lama
		if ( query.length > 0 ) {
			ClassBlockSchema.findOneAndUpdate( { 
				WERKS_AFD_BLOCK_CODE : body.WERKS_AFD_BLOCK_CODE,
				DATE_TIME: req.body.DATE_TIME
			}, body, { new: true } )
			.then( data => {
				if ( !data ) {
					return res.send( {
						status: true,
						message: 'Error Update!',
						data: []
					} );
				}
				res.send( {
					status: true,
					message: 'Success Update!',
					data: []
				} );
			} ).catch( err => {
				return res.send( {
					status: true,
					message: 'Error Update! 2',
					data: []
				} );
			} );
		}
		// Insert Data baru
		else {
			body.INSERT_TIME = Date.convert( 'now', 'YYYYMMDDHHmmss' );
			var set = new ClassBlockSchema( body );
			set.save()
			.then( data => {
				if ( !data ) {
					return res.send( {
						status: true,
						message: 'Error Insert!',
						data: []
					} );
				}
				res.send( {
					status: true,
					message: 'Success Insert!',
					data: []
				} );
			} ).catch( err => {
				res.send( {
					status: true,
					message: 'Error Insert! 2',
					data: []
				} );
			} );
		}
	}

	exports.find_by_periode = async ( req, res ) => {
		var query = await ClassBlockSchema.aggregate( [
			{
				$project: {
					_id: 0,
					__v: 0,
					INSERT_TIME: 0
				}
			},
			{
				$match: {
					WERKS: req.params.werks,
					DATE_TIME: Number( req.params.date )
				}
			},
			{
				$sort: {
					WERKS: 1,
					AFD_CODE: 1,
					BLOCK_CODE: 1,
					PERIODE: -1
				}
			}
		] );
		
		res.json( {
			status: true,
			message: "Success!",
			data: query
		} );
	};