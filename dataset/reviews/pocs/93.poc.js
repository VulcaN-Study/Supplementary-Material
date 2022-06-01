
Math.random = function() {
    throw new Error("do not use Math.random");
};

// if it uses Math.random, then exception will be thrown
var uuid = require("node-uuid");
console.log(uuid());
