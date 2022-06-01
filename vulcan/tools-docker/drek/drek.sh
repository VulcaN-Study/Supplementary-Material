#!/bin/bash

echo "Running comand: drek --signatures='/app/drek-signatures/signatures/*.yml' --format='json' --ignore='node_modules' /src"

start_time=$(date +%s.%3N)

drek --signatures='/app/drek-signatures/signatures/*.yml' --format='json' --ignore='node_modules' /src > /src/report-drek.json

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /app/report-drek.time.txt
mv /app/report-drek.* /src