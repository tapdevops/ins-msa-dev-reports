/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
     const TitikRestanSchema = require( _directory_base + '/app/v1.1/Http/Models/TitikRestanSchema.js' );

     // Variable
     const config = require( _directory_base + '/config/app.js' );
 
     // Middleware
     const Date = require( _directory_base + '/app/v1.1/Http/Middleware/Date.js' );

     //Helper
     const Helper = require( _directory_base + '/app/v1.1/Http/Libraries/Helper.js' );

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
        let querySearch = [];
        locationCode.forEach( function( location ) {
            querySearch.push( new RegExp( '^' + location.substr( 0, 4 ) ) )
        } );
        try {
            let now = parseInt( Helper.date_format( 'now', 'YYYYMMDD' ) ).toString().substring( 0, 8 );
            let titikRestan = await TitikRestanSchema.find( {
                TGL_REPORT: 20191124,
                WERKS: {
                    "$in": querySearch
                }
            } ).select( '-_id' );
            
            return res.send( {
                status: true, 
                message: 'Success',
                data: titikRestan
            } );
        } catch( err ) {
            return res.send( {
                status: false, 
                message: config.error_message.create_500,
                data: []
            } );
        }
    }

    //get all titik restan
    exports.titik_restan_all = async ( req, res ) => {
        let result = [];
        try {
            let titikRestan = await TitikRestanSchema.aggregate([
                {
                    $group: {
                        _id: {
                            AFD_CODE: "$AFD_CODE",
                            TGL_REPORT: "$TGL_REPORT",
                            WERKS: "$WERKS"
                        },TOTAL: {  $sum: "$KG_TAKSASI"}}
                },
                {
                    $match: {
                        "_id.TGL_REPORT" : parseInt( req.params.date )
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
                message: config.app.error_message.find_500,
                data: []
            } )
        }
    }