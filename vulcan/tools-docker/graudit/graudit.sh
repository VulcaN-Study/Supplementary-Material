#!/bin/bash

start_time=$(date +%s.%3N)

if [[ ! -e "$advisoryPath/graudit-report.js.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/js.db /src > /results/graudit-report.js.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/js.db /src > /results/graudit-report.js.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.cookie.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/js/cookie.db /src > /results/graudit-report.cookie.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/js/cookie.db /src > /results/graudit-report.cookie.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.node.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/js/node.db /src > /results/graudit-report.node.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/js/node.db /src > /results/graudit-report.node.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.javascript.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/js/javascript.db /src > /results/graudit-report.javascript.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/js/javascript.db /src > /results/graudit-report.javascript.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.sql.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/js/sql.db /src > /results/graudit-report.sql.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/js/sql.db /src > /results/graudit-report.sql.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.owasp.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/owasp/javascript.db /src > /results/graudit-report.owasp.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/owasp/javascript.db /src > /results/graudit-report.owasp.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.xss.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/xss.db /src > /results/graudit-report.xss.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/xss.db /src > /results/graudit-report.xss.txt
fi

if [[ ! -e "$advisoryPath/graudit-report.secrets.txt" ]]; then
    echo "Running comand: graudit -A -B -z -d /app/graudit/signatures/secrets.db /src > /results/graudit-report.secrets.txt"
    timeout 15 graudit -A -B -z -d /app/graudit/signatures/secrets.db /src > /results/graudit-report.secrets.txt
fi

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /results/graudit-report.time.txt

mv /results/graudit-report.* /src
