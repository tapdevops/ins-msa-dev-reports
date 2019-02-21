const mongoose = require( 'mongoose' );

const ClassAfdSchema = mongoose.Schema( {
	WERKS: String,
	AFD_CODE: String,
	WERKS_AFD_CODE: String,
	CLASS: String,
	SCORE: String,
	PERIODE: String,
	INSERT_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	UPDATE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	DELETE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'ClassAfd', ClassAfdSchema, 'TR_CLASS_AFD' );