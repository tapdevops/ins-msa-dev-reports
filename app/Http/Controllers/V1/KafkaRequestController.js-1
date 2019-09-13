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
	const Dataresult = require( _directory_base + '/app/Http/Models/V1/DataresultModel.js' ) 

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	var kafka = require("kafka-node")
	exports.request_data = async( req, res ) => {
		const requestObject = req.body.requestObject;
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
			// console.log( requestObject[0].data_source[0].model_name );
			for( var i = 0; i < requestObject[0].data_source.length; i++ ){
				const set = new Datasource( {
					"MSA_NAME": requestObject[0].data_source[i].msa_name,
					"MODEL_NAME": requestObject[0].data_source[i].model_name,
					"REQUESTER": requestObject[0].requester,
					"REQUEST_ID": requestObject[0].request_id,
					"IS_DONE": 0
				} );
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

			producer.send( payloads, function( err, data ) {
				console.log( "Send to kafka request data" );
			});
			// }, 2000);
		});

		producer.on("error", function(err) {
			console.log(err);
		});
		return await checkResult(requestObject[0].requester,requestObject[0].request_id,res);
	}
	
	async function checkResult(requester,request_id,res){
		let result = await Dataresult.find({
			REQUESTER: requester,
			REQUEST_ID: request_id
		})
		if(result.length>0){
			console.log(JSON.parse("["+result[0].DATA+"]"));
			return res.json({
				REQUESTER : result[0].REQUESTER,
				REQUEST_ID : result[0].REQUEST_ID,
				DATA : JSON.parse("["+result[0].DATA+"]")
			});
		}
		else{
			setTimeout(checkResult,5000,requester,request_id,res);
		}
	}
