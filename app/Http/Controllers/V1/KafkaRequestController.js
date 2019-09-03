var kafka = require("kafka-node")
exports.request_data = async( req, res ) => {
	
	Producer = kafka.Producer,
	Consumer = kafka.Consumer,
	client = new kafka.KafkaClient({kafkaHost : "149.129.252.13:9092"}),
	producer = new Producer(client),    
	consumer = new Consumer(
        client,
        [
            { topic: 'kafkaRequestData', partition: 0 },{ topic: 'kafkaDataCollectionProgress', partition: 0 },{ topic: 'kafkaResponse', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );
	producer.on("ready", function() {
		const requestObject = req.body.requestObject;
		console.log( requestObject )
		// console.log( requestObject )
        
			payloads = [
				{ topic: "kafkaRequest", messages: JSON.stringify(requestObject[0]), partition: 0 }
			];

			producer.send( payloads, function( err, data ) {
				console.log( "Send to kafka request data" );
			});
		// }, 2000);
	});

	producer.on("error", function(err) {
		console.log(err);
	});
		
}