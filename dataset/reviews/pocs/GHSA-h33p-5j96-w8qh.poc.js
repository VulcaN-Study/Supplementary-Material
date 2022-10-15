var root = require("./src/index");
var gulp = require("gulp");
var options = { opt: 'docs', name: "123\"& touch pwned& \"" }
gulp.src("./src/index.js") .pipe(root(options));