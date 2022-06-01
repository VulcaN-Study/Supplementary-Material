#!/bin/bash

echo "Running comand: insider -force -no-html -tech javascript -target /src"

start_time=$(date +%s.%3N)

insider -force -no-html -no-banner -tech javascript -target /src

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /app/report-insidersec.time.txt
mv /app/report-insidersec.* /src
