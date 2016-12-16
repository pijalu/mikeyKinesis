var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var kinesis = new AWS.Kinesis({endpoint: 'http://localhost:4567'});
var streamName = 'STRINGS';

kinesis.listStreams({},function(err, data) {
	if (err) console.log(err, err.stack);
	else data.StreamNames.forEach(stream => {
		console.log("Found",stream);
		kinesis.describeStream({StreamName:stream}, function(err, data) {
			if (err) console.log(err, err.stack);
			else console.log(data);
		});
	});
});
