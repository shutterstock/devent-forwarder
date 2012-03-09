var http = require('http')
	, util = require('util');

var pusher;

var server = http.createServer(function(req, res) {
	if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
		respond_with(res, 400);
		return;
	}
	
	var chunks = [];
	var body_len = 0;
	req.on('data', function(chunk) {
		body_len += chunk.length;
		chunks.push(chunk);
	});
	req.on('end', function() {
		var body = new Buffer(body_len);
		var cur_len = 0;
		for (var i = 0; i < chunks.length; i++) {
			chunks[i].copy(body, cur_len);
			cur_len += chunks[i].length;
		}
		pusher.write_devent(decodeURIComponent(req.url.substr(1)), body);
		respond_with(res, 200);
		return;
	});
	req.on('error', function(e) {
		util.log("server error: ", e);
		return;
	});

	return;
});

server.on('clientError', function(e) {
	util.log("client error: ", e);
	return;
});


function respond_with(res, code) {
	res.statusCode = code;
	res.write(code.toString());
	res.end();
	return;
}


function setPusher (p) {
	pusher = p;
}

module.exports = {
	server: server,
	setPusher: setPusher,
}

