var path = require('path');
var url = require('url');
var qs = require('querystring')
var resdo = require('./res.js');
var reqdo = require('./req.js');
var streamdo = require('./stream.js');

/* exports the loop module */
var loop = exports = module.exports = function (req, res) {
    pipe(req, res);
}

function pipe(req, res) {
    res.head = req.headers;
    // use static
    resdo(res);
    reqdo(req);
    
    bodyParse(req, res);
}

function bodyParse(req, res) {
    req.data = '';
    req.on('data', onData);
    req.on('end', onEnd);

    function onData(d) { req.data += d; }
    function onEnd() {
        // get form req.body    
        if (req.headers['content-type'] && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            req.body = qs.parse(req.data, '&', '=');
        }
        router(req, res);
    }
}


function router(req, res) {
//PATCH: Use variable safeSuffix to sanitize the path
    var safeSuffix = path.normalize(url.parse(req.url)['pathname']).replace(/^(\.\.(\/|\\|$))+/, '');
    pathname = safeSuffix;
    if (path.extname(pathname)) {
        var filepath = path.join(res.config.basename, pathname);
        res.sendfile(filepath);
    }
    else if (pathname === '/' && req.method === 'GET') {
        res.index();
    }
    // req.url
    else if (res.config.router[pathname]) {
        res.config.router[pathname](req, res);
    }
    else {
        res.notFound();
    }
    // index
    //res.notFound();
}