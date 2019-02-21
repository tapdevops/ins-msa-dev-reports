const mongoose = require( 'mongoose' );

const InspectionBarisSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	WERKS_AFD_CODE: String,
	WERKS_AFD_BLOCK_CODE: String,
	WERKS: String,
	EST_NAME: String,
	AFD_CODE: String,
	AFD_NAME: String,
	BLOCK_CODE: String,
	BLOCK_NAME: String,
	LAT_START_INSPECTION: String,
	LONG_START_INSPECTION: String,
	INSPECTION_DATE: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	AREAL: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	LAMA_INSPEKSI: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	SPMON: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return null;
		}
	},
	MATURITY_STATUS: String,
	REPORTER_FULLNAME: String,
	REPORTER_JOB: String,
	REPORTER_REF_ROLE: String,
	REPORTER_USER_ROLE: String,
	REPORTER_USER_AUTH_CODE: String,
	REPORTER_NIK: String,
	CONTENT: {
		type : Array, 
		"default" : []
	},
	CONTENT_PANEN: {
		type : Array, 
		"default" : []
	},
	CONTENT_PERAWATAN: {
		type : Array, 
		"default" : []
	},
	CONTENT_PEMUPUKAN: {
		type : Array, 
		"default" : []
	},
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

module.exports = mongoose.model( 'InspectionBaris', InspectionBarisSchema, 'TR_INSPECTION_BARIS' );