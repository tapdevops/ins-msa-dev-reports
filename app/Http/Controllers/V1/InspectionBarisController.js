/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const InspectionBarisSchema = require( _directory_base + '/app/Http/Models/V1/InspectionBarisSchema.js' );

	// Variable
	const config = require( _directory_base + '/config/app.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.create_v_1_0 = ( req, res ) => {

		//var auth = req.auth;
		const set = new InspectionBarisSchema( {
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
			PERIODE: req.body.PERIODE,
			WERKS_AFD_CODE: req.body.WERKS_AFD_CODE,
			WERKS_AFD_BLOCK_CODE: req.body.WERKS_AFD_BLOCK_CODE,
			WERKS: req.body.WERKS,
			EST_NAME: req.body.EST_NAME,
			AFD_CODE: req.body.AFD_CODE,
			AFD_NAME: req.body.AFD_NAME,
			BLOCK_CODE: req.body.BLOCK_CODE,
			BLOCK_NAME: req.body.BLOCK_NAME,
			LAT_START_INSPECTION: req.body.LAT_START_INSPECTION,
			LONG_START_INSPECTION: req.body.LAT_START_INSPECTION,
			INSPECTION_DATE: req.body.INSPECTION_DATE,
			AREAL: req.body.AREAL,
			LAMA_INSPEKSI: req.body.LAMA_INSPEKSI,
			SPMON: req.body.SPMON,
			MATURITY_STATUS: req.body.MATURITY_STATUS,
			REPORTER_FULLNAME: req.body.REPORTER_FULLNAME,
			REPORTER_JOB: req.body.REPORTER_JOB,
			REPORTER_REF_ROLE: req.body.REPORTER_REF_ROLE,
			REPORTER_USER_ROLE: req.body.REPORTER_USER_ROLE,
			REPORTER_USER_AUTH_CODE: req.body.REPORTER_USER_AUTH_CODE,
			REPORTER_NIK: req.body.REPORTER_NIK,
			CONTENT: req.body.CONTENT,
			CONTENT_PANEN: req.body.CONTENT_PANEN,
			CONTENT_PEMUPUKAN: req.body.CONTENT_PEMUPUKAN,
			CONTENT_PERAWATAN: req.body.CONTENT_PERAWATAN
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
	

	exports.find_v_1_0 = async ( req, res ) => {
		var query = await InspectionBarisSchema.find({})
			.select( {
				_id: 0, 
				__v: 0 
			} ).sort( {
				WERKS: 1,
				AFD_CODE: 1,
				BLOCK_CODE: 1,
				INSPECTION_DATE: 1
			} );

		res.json( {
			status: true,
			message: 'OK',
			data: query
		} )
	}