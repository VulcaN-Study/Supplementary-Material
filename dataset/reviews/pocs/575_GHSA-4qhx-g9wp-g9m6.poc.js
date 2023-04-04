var squel = require("./575.patch.js")

console.log(squel.insert().into('buh').setFields({foo: "bar'); select * from passwd; --"}).toString());