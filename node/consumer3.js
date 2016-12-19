var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var kinesis = new AWS.Kinesis({endpoint: 'http://localhost:4567'});
var streamName = 'STRINGS';

function getData(shardIterator) {
	kinesis.getRecords({
		ShardIterator: shardIterator
	}, function(err, recordsData) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			recordsData.Records.forEach(rec => {
				 console.log(/*rec, '=',*/ rec.Data.toString()); // successful response
			});
			setTimeout(function() {
				getData(recordsData.NextShardIterator);
			},1000);
		}
	});
}


function getStreamData(shard) {
	kinesis.getShardIterator({
		ShardId: shard.ShardId,
		ShardIteratorType: 'TRIM_HORIZON',
		StreamName: streamName
	}, function(err, shardIteratordata) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
			getData(shardIteratordata.ShardIterator);
		}
	});
}

console.log("Starting !");
	kinesis.describeStream({
		StreamName: streamName
	},function(err, streamData) {
		if (err) console.log("Error describing Stream", err.stack);
		else {
			streamData.StreamDescription.Shards.forEach(shard => {
				getStreamData(shard);
			});
		}
	});
