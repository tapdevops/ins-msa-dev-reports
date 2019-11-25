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
                message: 'Success!',
                data: []
            } );
        }
        if( reffRole !== 'AFD_CODE' ) {
            return res.send( {
                status: true,
                message: 'Success!',
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
                TGL_REPORT: now,
                WERKS: {
                    "$in": querySearch
                }
            } );
            
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