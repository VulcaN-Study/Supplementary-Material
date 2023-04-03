// Iniciando Servidor do desafio
var server = http.createServer(function(request, response){

  // Obtendo o pathname digitado no browser
  var pathname = url.parse(request.url).pathname;
  
  if (pathname.includes.includes('../')) {
	response.writeHeader(400, {'Content-Type': 'text/html'});
	response.end('Request contains forbidden characters');
	return;
  }	
  // Processando roteamento do pathname
  var pagina = rotear(pathname);

  // Renderizando a pagina html
  fs.readFile(pagina, function(err, html){
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.end(html);
  });
});
server.listen(3000, function(){
  console.log('Executando Desafio');
});