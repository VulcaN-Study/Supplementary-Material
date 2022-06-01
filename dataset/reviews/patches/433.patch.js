/*jslint node: true */
'use strict';

/* Start Node.js instance serving files */

// Setup this if you want to use actual HTTPS certs (or your own self-signed ones)
// quickserver really isn't made to be used outside of quick tests though, so use with care!
var sslOptions = {
	key: false,
	cert: false,
	ca: false,
	passphrase: false
};

var http = require('http'),
	https = require('https'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	lanIp = require('./lanIp.js'),
	colors = require('colors'),
	port = process.argv[2] || 8888,
	protocol = process.argv[3] || 'http';
 
var serverLogic = function(request, response) {
//PATCH: Use variable safeSuffix to sanitize the path
	var uri = url.parse(request.url).pathname;
	var safeSuffix = path.normalize(uri).replace(/^(\.\.(\/|\\|$))+/, '');
	var	filename = path.join(process.cwd(), safeSuffix);
		

	fs.exists(filename, function(exists) {

		// We have a file that doesn't exist, respond with 404
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}

		// We have a directory, see if we have a static index file
		if (fs.statSync(filename).isDirectory()) {
			if(fs.existsSync(path.join(filename, 'index.html'))) {
				filename = path.join(filename, 'index.html');
			}
			else if(fs.existsSync(path.join(filename, 'index.htm'))) {
				filename = path.join(filename, 'index.htm');
			}
			else if(fs.existsSync(path.join(filename, 'index.svg'))) {
				filename = path.join(filename, 'index.svg');
			}
		}
 
		fs.readFile(filename, "binary", function(err, file) {
			// Something went wrong when reading file
			if(err) {
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}

			// Everything went well, return
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
		});
	});
};

// Create normal HTTP server
if(protocol === 'http') {
	http.createServer(serverLogic).listen(parseInt(port, 10));
}

// Create HTTPS server
// You can provide valid certs in sslOptions in top, if you don't we'll use grunt-contrib-connect's certs (self-signed)
else if(protocol === 'https') {
	https.createServer({
		key: sslOptions.key || fs.readFileSync(path.join(__dirname, 'certs', 'server.key')).toString(),
		cert: sslOptions.cert || fs.readFileSync(path.join(__dirname, 'certs', 'server.crt')).toString(),
		ca: sslOptions.ca || fs.readFileSync(path.join(__dirname, 'certs', 'ca.crt')).toString(),
		passphrase: sslOptions.passphrase || 'grunt',
	}, serverLogic).listen(parseInt(port, 10));
}

// Log IP, etc of server instance
lanIp.find(function(ip) {
	var server = protocol + '://' + ip + ':' + port;
	console.log('\nQuickserver running at:\n'.bold + server.inverse + '\nCTRL + C to shutdown');
});