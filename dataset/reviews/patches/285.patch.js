var request = require('request');
request('https://chromedriver.storage.googleapis.com/2.21/chromedriver_win32.zip')
.pipe(require('unzip').Parse()).on('entry', function(entry){
  entry.pipe(require('fs').createWriteStream('./chromedriver.exe'));
});
