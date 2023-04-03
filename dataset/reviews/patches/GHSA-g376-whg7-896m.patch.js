var http=require("http");
var fs=require("fs");
http.createServer(function (request,response) {
  if (request.url.includes.includes('../')) {
	response.writeHeader(400, {'Content-Type': 'text/html'});
	response.end('Request contains forbidden characters');
	return;
  }	                                                                        // CHANGE  
    var path="./"+request.url;
    fs.readFile(path,function (error,data) {
        response.end(data);
    })

}).listen(8888)