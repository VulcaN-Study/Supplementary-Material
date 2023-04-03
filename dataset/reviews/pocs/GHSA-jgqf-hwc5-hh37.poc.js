// Launch the server with this code (you can change the root property)

var http = require('http')
var parseUrl = require('parseurl')
var send = require('send')
 
var server = http.createServer(function onRequest (req, res) {
  send(req, parseUrl(req).pathname, { root: '/home/kali/www/public' })
    .pipe(res)
})
 
server.listen(8012)

/////////////////////

// It returns either 403 status code if the root url is not correct, or 
// it returns another code (e.g. 200 assuming the file exists)
// If 403, the root is not correct, if it's another code, then the root you found is
// the correct name of the root

// Note: no need to make a GET request, a HEAD request will do as well, since only the 
// status code matters
