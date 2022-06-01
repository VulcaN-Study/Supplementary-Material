#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]
do
opt="$1"
case $opt in
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done


echo "Building Codeql Database using command: codeql database create /app/codeql-database --language=javascript"
start_time_db=$(date +%s.%3N)
codeql database create /app/codeql-database --language=javascript -s /src
end_time_db=$(date +%s.%3N)
elapsed_db=$(echo "scale=3; $end_time_db - $start_time_db" | bc)
echo "$elapsed_db" > /app/codeql-report.time_db.txt

QUERY=/app/codeql-repo/javascript/ql/src/codeql-suites/javascript-security-extended.qls

echo "Running comand: codeql database analyze /app/codeql-database $QUERY --format=csv --output=codeql-report.csv"
start_time_exec=$(date +%s.%3N)
codeql database analyze /app/codeql-database $QUERY --format=csv --output=/app/codeql-report.csv
end_time_exec=$(date +%s.%3N)
elapsed_exec=$(echo "scale=3; $end_time_exec - $start_time_exec" | bc)
echo "$elapsed_exec" > /app/codeql-report.time_exec.txt

mv /app/codeql-report.time* /src

rm -rf /app/codeql-database
# mv /app/codeql-report.* /src
