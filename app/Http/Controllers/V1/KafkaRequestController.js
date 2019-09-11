/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */

	//Models
	const Datasource = require( _directory_base + '/app/Http/Models/V1/DatasourceModel.js' ) 

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
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
		producer.on("ready", async function() {
			const requestObject = req.body.requestObject;
			// console.log( requestObject[0].data_source[0].model_name );
			for( var i = 0; i < requestObject[0].data_source.length; i++ ){
				const set = new Datasource( {
					"MSA_NAME": requestObject[0].data_source[i].msa_name,
					"MODEL_NAME": requestObject[0].data_source[i].model_name,
					"REQUESTER": requestObject[0].requester,
					"IS_DONE": 0
				} );
				// console.log( set );
				set.save();
			}
			var query = await Datasource.aggregate( [
				{
					"$project": {
						"_id": 0
					}
				}
			] );
			
			payloads = [
				{ topic: "kafkaRequest", messages: JSON.stringify(requestObject[0]), partition: 0 }
			];

			console.log("PAYLOADS:");
				console.log(payloads);

			producer.send( payloads, function( err, data ) {
				console.log( "Send to kafka request data" );
			});
			// }, 2000);
		});

		producer.on("error", function(err) {
			console.log(err);
		});

		return res.json({
			message: "Gani"
		})
			
	}