/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
     const TitikRestanSchema = require( _directory_base + '/app/v2.0/Http/Models/TitikRestanSchema.js' );

     // Variable
     const config = require( _directory_base + '/config/app.js' );
 
     // Middleware
     const Date = require( _directory_base + '/app/v2.0/Http/Middleware/Date.js' );

     //Helper
     const Helper = require( _directory_base + '/app/v2.0/Http/Libraries/Helper.js' );

/*
 |--------------------------------------------------------------------------
 | Module Exports
 |--------------------------------------------------------------------------
*/
    exports.titik_restan = async ( req, res ) => {
        let userRole = req.auth.USER_ROLE;
        let reffRole = req.auth.REFFERENCE_ROLE;
        if ( userRole !== 'ASISTEN_LAPANGAN' ) {
            return res.send( {
                status: true,
                message: 'Bukan Asisten Lapangan',
                data: []
            } );
        }
        if( reffRole !== 'AFD_CODE' ) {
            return res.send( {
                status: true,
                message: 'Bukan AFD_CODE!',
                data: []
            } );
        }
        let locationCode = String( req.auth.LOCATION_CODE ).split( ',' );
        let werksQuerySearch = [];
        let afdQuerySearch = [];
        locationCode.forEach( function( location ) {
            werksQuerySearch.push( location.substring( 0, 4 ) );
            afdQuerySearch.push( location.substring( 4, 5 ) );
        } );
        try {
            let date = parseInt( Helper.date_format( 'now', 'YYYYMMDD' ) ).toString().substring( 0, 8 ) - 1;
            let titikRestan = await TitikRestanSchema.aggregate( [
                {
                    $match: {
                        TGL_REPORT: date, 
                        WERKS: { $in: werksQuerySearch },
                        AFD_CODE: { $in: afdQuerySearch } 
                    }
                }, {
                    $project: {
                        _id: 0
                    }
                }
            ] );
            return res.send( {
                status: true, 
                message: 'Success',
                data: titikRestan
            } );
        } catch( err ) {
            return res.send( {
                status: false, 
                message: config.error_message.find_500,
                data: []
            } );
        }
    }

    //get kg taksasi
    exports.taksasi = async ( req, res ) => {
        let result = [];
        try {
            let date = parseInt( Helper.date_format( 'now', 'YYYYMMDD' ) ).toString().substring( 0, 8 ) - 1;
            let titikRestan = await TitikRestanSchema.aggregate([
                {
                    $group: {
                        _id: {
                            AFD_CODE: "$AFD_CODE",
                            TGL_REPORT: "$TGL_REPORT",
                            WERKS: "$WERKS"
                        },TOTAL: {  $sum: "$KG_TAKSASI"} }
                },
                {
                    $match: {
                        "_id.TGL_REPORT" : date 
                    }
                }
            ]);
            if ( titikRestan.length > 0 ) {
                titikRestan.forEach( restan => {
                    result.push( {
                        OTORISASI: restan['_id'].WERKS + restan['_id'].AFD_CODE,
                        TOTAL: restan.TOTAL
                    } )
                } );    
            }
            return res.send( {
                status: true,
                message: 'Success',
                data: result
            } )
        } catch ( err ) {
            return res.send( {
                status: false,
                message: config.error_message.find_500,
                data: []
            } );
        }
    }