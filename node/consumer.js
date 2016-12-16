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
			if (recordsData.Records.length>0) console.log(recordsData.Records); // successful response
			/*
			setTimeout(function() {
				getData(recordsData.NextShardIterator);
			},100); */
		}
	});
}


function getStreamData(shard) {
	kinesis.getShardIterator({
		ShardId: shard.ShardId,
		//		ShardIteratorType: 'LATEST',
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


