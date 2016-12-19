var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var kinesis = new AWS.Kinesis({endpoint: 'http://localhost:4567'});
var streamName = 'STRINGS';

var params = {
	ShardCount: 1,
	StreamName: streamName
};
kinesis.createStream(params, function(err, data) {
	if (err) {
		console.log("Stream Create error", err, err.stack);
	}
	else {
		console.log("Created stream", data);
	}
});
