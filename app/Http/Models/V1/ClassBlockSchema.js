const mongoose = require( 'mongoose' );
require( 'mongoose-double' )(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const ClassBlockSchema = mongoose.Schema( {
	WERKS: String,
	AFD_CODE: String,
	BLOCK_CODE: String,
	WERKS_AFD_CODE: String,
	WERKS_AFD_BLOCK_CODE: String,
	DATE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	CLASS_BLOCK: String,
	INSERT_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'ClassBlock', ClassBlockSchema, 'TR_CLASS_BLOCK' );