var keyPub = `ssh-rsa a${Array(200000).join(' ')}x\nx`;
var key = require('./package/').parseKey(keyPub, 'ssh');