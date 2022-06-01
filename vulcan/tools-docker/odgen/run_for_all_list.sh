#!/bin/bash
counter=$(cat packages.list | wc -l)

TIMEOUT=120
THREADS=4

echo "Running comand: python ../odgen.py /src -m -a -q -t [all vulns]"
start_time_exec=$(date +%s.%3N)
python3 ../../../../ODGen/odgen.py --list packages.list --timeout $TIMEOUT -maq --parallel $THREADS -t os_command
python3 ../../../../ODGen/odgen.py --list packages.list --timeout $TIMEOUT -maq --parallel $THREADS -t code_exec
python3 ../../../../ODGen/odgen.py --list packages.list --timeout $TIMEOUT -maq --parallel $THREADS -t proto_pollution
python3 ../../../../ODGen/odgen.py --list packages.list --timeout $TIMEOUT -maq --parallel $THREADS -t ipt
python3 ../../../../ODGen/odgen.py --list packages.list --timeout $TIMEOUT -maq --parallel $THREADS -t xss
python3 ../../../../ODGen/odgen.py --list packages.list --timeout $TIMEOUT -maq --parallel $THREADS -t path_traversal
end_time_exec=$(date +%s.%3N)
elapsed_exec=$(echo "scale=3; $end_time_exec - $start_time_exec" | bc)
echo "$elapsed_exec" > odgen-report.time_exec.txt

echo "Processed $counter packages"
