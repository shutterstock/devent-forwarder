var zmq = require('zmq')
	, puller = zmq.socket('pull')
	, util = require('util');

var server = {};
server.listen = function(pull_from) {

	if (!pull_from) {
		throw ("e.g: listen('tcp://*:6554')");
	}
	puller.bind(pull_from, function(err) {
		if (err) {
			throw (err)
		}
	});

};

puller.on('message', function() {
	if (arguments.length !== 2) {
		util.log('malformed message');
		return;
	}
	pusher.write_devent(arguments[0], arguments[1]);
});

puller.on('error', function(err) {
	util.log(err)
});

function setPusher (p) {
	pusher = p;
}

module.exports = {
	server: server,
	setPusher: setPusher,
}

