var zmq = require('zmq')
	, pusher = zmq.socket('push')
	, util = require('util');

pusher.on('error', function(e) {
	util.log(e.toString());
	return;
});

module.exports.connect = function(upstream) {
	util.log('connecting to ' + upstream);
	pusher.connect(upstream);
	return;
}

module.exports.write_devent = function(topic, message) {

	if (!topic || !message) {
		util.log("bad write_devent, need topic and message");
		return;
	}

	pusher.send(topic, zmq.ZMQ_SNDMORE);
	pusher.send(message);
	return;
};
