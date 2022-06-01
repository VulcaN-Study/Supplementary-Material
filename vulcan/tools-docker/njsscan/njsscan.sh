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

echo "Running comand: njsscan --json -o /src/njsscan-report.json /src"

start_time=$(date +%s.%3N)

njsscan --json -o /src/njsscan-report.json /src 

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /app/njsscan-report.time.txt
mv /app/njsscan-report.* /src
