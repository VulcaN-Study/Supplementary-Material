acorn = require("./package/dist/acorn.js"); //download acorn package

console.log(acorn.parse("/[x-\ud800]/u", {ecmaVersion: 2020}));
//regex will try to match the string but it will have to go through many computational steps, resulting in a ReDos, since the string is not valid in UTF-16

