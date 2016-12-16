var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var kinesis = new AWS.Kinesis({endpoint: 'http://localhost:4567'});
var streamName = 'STRINGS';

function postRecord(word) {
	console.log("Putting", word);
	var params = {
		StreamName: streamName,
		PartitionKey: word.substring(0,1),
		Data: word
	};
	
	kinesis.putRecord(params, function(err, data) {
		if (err) console.log('Put failed', err.stack);
		else console.log('Put record with PK '+params.PartitionKey, data);
	});
}

postRecord("Hello");
postRecord("World");

