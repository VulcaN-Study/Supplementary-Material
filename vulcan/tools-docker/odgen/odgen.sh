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

TIMEOUT=120

echo "Running comand: python ../odgen.py /src -m -a -q -t [all vulns]"
start_time_exec=$(date +%s.%3N)
python3 /app/ODGen/odgen.py /src --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t os_command
python3 /app/ODGen/odgen.py /src --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t code_exec
python3 /app/ODGen/odgen.py /src --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t proto_pollution
python3 /app/ODGen/odgen.py /src --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t ipt
python3 /app/ODGen/odgen.py /src --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t xss
python3 /app/ODGen/odgen.py /src --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t path_traversal
end_time_exec=$(date +%s.%3N)
elapsed_exec=$(echo "scale=3; $end_time_exec - $start_time_exec" | bc)
echo "$elapsed_exec" > /app/odgen-report.time_exec.txt

mv /app/odgen-report.time_exec.txt /src
mv -f /app/logs /src
