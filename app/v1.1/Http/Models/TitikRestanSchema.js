const mongoose = require( 'mongoose' );

const titikRestanSchema = mongoose.Schema( {
    OPH: String,
    BCC: String,
    TPH_RESTANT_DAY: String,
    LATITUDE: String,
    LONGITUDE: String,
    JML_JANJANG: Number,
    JML_BRONDOLAN: Number,
    KG_TAKSASI: Number,
    TGL_REPORT: {
        type: Number,
        get: v => Math.floor( v ),
        set: v => Math.floor( v ),
        alias: 'i',
        min: 10000000,
        max: 99999999,
        default: function() {
            return 0;
        }
    },
    WERKS: String,
    EST_NAME: String,
    AFD_CODE: String,
    BLOCK_CODE: String,
    BLOCK_NAME: String,
    SORT_SWIPE: String
} );

module.exports = mongoose.model( 'TitikRestanModel', titikRestanSchema, 'TR_TITIK_RESTAN' );