#!/bin/bash

echo "Running comand: ./mosca --egg eggs/javascript_common_fail.egg --path /src --ext \"\\.js$\" --log /src/mosca-report.txt"

start_time=$(date +%s.%3N)

mosca --egg /app/Mosca/eggs/javascript_common_fail.egg --path /src --ext "\\.js$" --log /src/mosca-report.txt

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /app/mosca-report.time.txt

if [[ ! -e /src/mosca-report.txt ]]; then
    touch /src/mosca-report.txt
fi

mv /app/mosca-report.* /src