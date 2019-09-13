/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Node Modules
 	const Mongoose = require( 'mongoose' );
 	const Kafka = require("kafka-node")

	//Models
	const Models = {
		"Reports": {
			"DataSource": require( _directory_base + '/app/v1.0/Http/Models/Reports/DataSourceModel.js' ),
			"DataResult": require( _directory_base + '/app/v1.0/Http/Models/Reports/DataResultModel.js' ),
			"RequestData": require( _directory_base + '/app/v1.0/Http/Models/Reports/RequestDataModel.js' ),
		}
	}

	// Libraries
	const HelperLib = require( _directory_base + '/app/v1.0/Http/Libraries/HelperLib.js' );

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	exports.request_data = async( req, res ) => {

		const save_request_data = new Models.Reports.RequestData( {
			"BODY": JSON.stringify( req.body ),
			"INSERT_TIME": parseInt( HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' ) ),
			"INSERT_USER": "1234"
		} );

		save_request_data.save().then( save_request_data => {
			const request_object = req.body.requestObject;
			Producer = Kafka.Producer,
			Consumer = Kafka.Consumer,
			Client = new Kafka.KafkaClient( { kafkaHost : "149.129.252.13:9092" } ),
			producer = new Producer(Client),    
			consumer = new Consumer(
				Client,
				[
					{
						topic: 'kafkaRequestData', 
						partition: 0 
					},
					{ 
						topic: 'kafkaDataCollectionProgress', 
						partition: 0 
					},
					{ 
						topic: 'kafkaResponse', 
						partition: 0 
					}
				],
				{
					autoCommit: false
				}
			);

			producer.on( "ready", async function() {
				for( var i = 0; i < request_object[0].data_source.length; i++ ){
					const set = new Models.Reports.DataSource( {
						"MSA_NAME": request_object[0].data_source[i].msa_name,
						"MODEL_NAME": request_object[0].data_source[i].model_name,
						"REQUESTER": request_object[0].requester,
						"REQUEST_ID": request_object[0].request_id,
						"IS_DONE": 0
					} );
					set.save();
				}
				
				payloads = [
					{ topic: "kafkaRequest", messages: JSON.stringify(request_object[0]), partition: 0 }
				];

				producer.send( payloads, function( err, data ) {
					console.log("OK", payloads);
					return res.json( {
						http_status_code: 200,
						message: "OK",
						data: {
							request_id: req.body.request_id //save_request_data._id
						}
					} );
				});
			});

			producer.on( "error", function( err ) {
				console.log( "ERROR CUY", err )
				return res.json( {
					http_status_code: 500,
					message: "Request failed to queue, producer error.",
					data: {
						request_id: ""
					}
				} );
			});
			
		} );
	}
	
	// async function checkResult(requester,request_id,res){
	// 	let result = await Dataresult.find({
	// 		REQUESTER: requester,
	// 		REQUEST_ID: request_id
	// 	})
	// 	if(result.length>0){
	// 		console.log(JSON.parse("["+result[0].DATA+"]"));
	// 		return res.json({
	// 			REQUESTER : result[0].REQUESTER,
	// 			REQUEST_ID : result[0].REQUEST_ID,
	// 			DATA : JSON.parse("["+result[0].DATA+"]")
	// 		});
	// 	}
	// 	else{
	// 		setTimeout(checkResult,5000,requester,request_id,res);
	// 	}
	// }
