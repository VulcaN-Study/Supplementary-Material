const Concat = require('concat-with-sourcemaps');
var concat = new Concat(true, 'all.js', 234); // separator is 234
concat.add(null, "// (c) John Doe");
concat.add('file1.js', "const a = 10;");
concat.add('file2.js', "const b = 20;");
console.log(concat.content.toString('utf-8'));