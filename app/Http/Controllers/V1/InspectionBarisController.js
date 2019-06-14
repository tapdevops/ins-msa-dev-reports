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

	// Middleware
	const Date = require( _directory_base + '/app/Http/Middleware/Date.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.create_or_update_v_1_0 = async ( req, res ) => {

		var query = await InspectionBarisSchema.findOne( {
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
			WERKS_AFD_BLOCK_CODE: req.body.WERKS_AFD_BLOCK_CODE,
			INSPECTION_DATE: req.body.INSPECTION_DATE
		} );

		// Update Data lama
		if ( query ) {
			var update_body = {
				PERIODE: req.body.PERIODE,
				EST_NAME: req.body.EST_NAME,
				AFD_NAME: req.body.AFD_NAME,
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
			};

			InspectionBarisSchema.findOneAndUpdate( { 
				WERKS_AFD_BLOCK_CODE: req.body.WERKS_AFD_BLOCK_CODE,
				INSPECTION_DATE: req.body.INSPECTION_DATE
			}, update_body, { new: true } )
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
		else {
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
				CONTENT_PERAWATAN: req.body.CONTENT_PERAWATAN,
				INSERT_TIME: Date.convert( 'now', 'YYYYMMDDHHmmss' )
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
	}
	

	exports.find_v_1_0 = async ( req, res ) => {
		
		if ( req.params.start_date && req.params.end_date && req.params.location ) {
			var location = req.params.location
			if ( location.substr( 0, 1) == '0' )  {
				location = req.params.location.substr( 1, 10 );
			}

			var query = await InspectionBarisSchema.find({
					WERKS_AFD_BLOCK_CODE: new RegExp( '^' + location ),
					INSPECTION_DATE: {
						$gte: parseInt( req.params.start_date ),
						$lte: parseInt( req.params.end_date )
					}
				} )
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
				message: 'Success!',
				data: query
			} );
		}
	}

	exports.find_valid_v_1_0 = async ( req, res ) => {
		
		if ( req.params.start_date && req.params.end_date && req.params.location ) {

			var periode = parseInt( req.params.start_date.substr( 0,6 ) );
			var data_inspeksi = [];
			var done_push = 0;
			var interval = 10000;
			var location = req.params.location
			if ( location.substr( 0, 1) == '0' )  {
				location = req.params.location.substr( 1, 10 );
			}
			var query_get_valid_inspeksi = await InspectionBarisSchema.aggregate([
					{
						"$group": {
							"_id": {
								"WERKS_AFD_BLOCK_CODE": "$WERKS_AFD_BLOCK_CODE",
								"AREAL": "$AREAL",
								"PERIODE": "$PERIODE"
							},
							"COUNT": {
								"$sum": 1
							}
						}
					},
					{
						"$match": {
							"COUNT": {
								"$gte": 2
							},
							"_id.WERKS_AFD_BLOCK_CODE": new RegExp( '^' + location ),
							"_id.PERIODE": periode
						}
					},
					{
						"$project": {
							"_id": 0,
							"WERKS_AFD_BLOCK_CODE": "$_id.WERKS_AFD_BLOCK_CODE",
							"AREAL": "$_id.AREAL",
							"PERIODE": "$_id.PERIODE",
							"COUNT": "$COUNT"
						}
					},
					{
						"$sort": {
							"_id.PERIODE": 1,
							"_id.WERKS_AFD_BLOCK_CODE": -1,
							"_id.COUNT": -1
						}
					}
				] );
			
			var z = 1;
			if ( query_get_valid_inspeksi.length > 0 ) {
				query_get_valid_inspeksi.forEach( async function( q ) {
					var query = await InspectionBarisSchema.find( {
							WERKS_AFD_BLOCK_CODE: q.WERKS_AFD_BLOCK_CODE,
							AREAL: q.AREAL,
							PERIODE: q.PERIODE,
							INSPECTION_DATE: {
								$gte: parseInt( req.params.start_date ),
								$lte: parseInt( req.params.end_date )
							}
						} )
						.select( {
							_id: 0, 
							__v: 0 
						} ).sort( {
							WERKS: 1,
							AFD_CODE: 1,
							BLOCK_CODE: 1,
							INSPECTION_DATE: 1
						} );
					if ( query.length > 0 ) {
						query.forEach( function( dt ) {
							if ( data_inspeksi.push( dt ) ) {
								done_push = z;
								console.log( done_push + ' / ' + z );
							}
						} );
					}
					z++;
				} );
			}
			
			var count = 0;
			var intervalObject = setInterval( function () { 
				count++; 
				console.log(count, 'seconds passed'); 
				if ( done_push == query_get_valid_inspeksi.length ) { 
					clearInterval( intervalObject); 
					setTimeout( function () {
						res.status( 200 ).json( {
							status: true,
							message: 'Success!',
							data: data_inspeksi
						} );
					}, 1000 );
				} 
			}, 1000 );
		}
	}