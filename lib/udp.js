var dgram = require('dgram')
	, util = require('util');

var server = dgram.createSocket("udp4");

var pusher;

server.on("message", function(msg, rinfo) {
	var msg_string = msg.toString('utf8');
	var pos = msg_string.indexOf("\n");
	var topic = msg_string.substr(0, pos);
	var message = msg_string.substr(pos + 1);
	pusher.write_devent(topic, message);
});

function setPusher (p) {
	pusher = p;
}

module.exports = {
	server: server,
	setPusher: setPusher,
}

