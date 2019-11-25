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

/*
 |--------------------------------------------------------------------------
 | Module Exports
 |--------------------------------------------------------------------------
*/
    exports.titik_restan = async ( req, res ) => {
        try {
            let titikRestan = await TitikRestanSchema.find( {} );
            return res.send( {
                status: true, 
                message: 'Success!',
                data: titikRestan
            } );
        } catch( err ) {
            return res.send( {
                status: false, 
                message: err.message,
                data: []
            } );
        }
    }