const mongoose = require('mongoose');

const kafkaPayloadSchema = mongoose.Schema({
	TOPIC_NAME: String,
	OFFSET: Number,
	EXECUTE_DATE: {
		type: Number,
		get: v => Math.floor(v),
		set: v => Math.floor(v),
		alias: 'i',
		default: function () {
			return 0;
		}
	}
});

module.exports = mongoose.model('KafkaPayloadModel_v_2_0', kafkaPayloadSchema, 'TM_KAFKA_PAYLOADS');