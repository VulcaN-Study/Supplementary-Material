var jadedown = require('./package/jadedown.js');

var genstr = function (len, chr) {
    var result = "";
    for (let i=0; i<=len; i++) {
        result = result + chr;
    }

    return result;
}


for (let i=1;i<=10000000;i=i+1) {
    console.log("COUNT: " + i);
    var str = genstr(i, 'f') + genstr(i, '#') + '{';
    console.log("LENGTH: " + str.length);
    var start = process.hrtime();
    jadedown(str)

    var end = process.hrtime(start);
    console.log(end);
}