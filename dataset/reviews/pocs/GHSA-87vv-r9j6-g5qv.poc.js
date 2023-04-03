var moment = require('moment');

var genstr = function (len, chr) { var result = ""; for (i=0; i<=len; i++) { result = result + chr; }

return result;
}

for (i=20000;i<=10000000;i=i+10000) { 
    console.log("COUNT: " + i); 
    var str = '-' + genstr(i, '1'); 
    console.log("LENGTH: " + str.length); 
    var start = process.hrtime(); 
    moment.duration(str)

    var end = process.hrtime(start);
    console.log(end);
} 