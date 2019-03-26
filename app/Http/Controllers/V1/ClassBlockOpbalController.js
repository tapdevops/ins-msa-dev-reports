/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const ClassBlockOpbalSchema = require( _directory_base + '/app/Http/Models/V1/ClassBlockOpbalSchema.js' );

	// Variable
	const config = require( _directory_base + '/config/app.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.create_or_update_v_1_0 = async ( req, res ) => {
		/*
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
			body.INSERT_TIME = req.body.INSERT_TIME;
			body.UPDATE_TIME = req.body.UPDATE_TIME;
			body.DELETE_TIME = req.body.DELETE_TIME;
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
		}*/
	}

	exports.find = async ( req, res ) => {
		var query = await ClassBlockOpbalSchema.find({}).select({_id:0});
		var results = [];
		query.forEach( function( q ) {
			results.push( {
				"WERKS_AFD_CODE": q.WERKS + q.AFD_CODE,
				"WERKS_AFD_BLOCK_CODE": q.WERKS + q.AFD_CODE + q.BLOCK_CODE,
				"WERKS": q.WERKS,
				"AFD_CODE": q.AFD_CODE,
				"BLOCK_CODE": q.BLOCK_CODE,
				"DATE_TIME": q.DATE_TIME,
				"CLASS_BLOCK": q.CLASS_BLOCK
			} );
		} );
		res.json( {
			message: "OK",
			data: results
		} )
	};