var extend = require("./src/extend");
foo = extend("function (){});console.log('pwnd'); //(){console.log(123)}","")
console.log(foo);