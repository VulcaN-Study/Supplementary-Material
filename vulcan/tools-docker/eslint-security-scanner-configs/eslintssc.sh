#!/bin/sh
find /src -type f -name ".eslintrc.*" -delete

start_time=$(date +%s.%3N)

eslint --ext .html,.htm,.js -c eslint-security-scanner-configs/eslintrc-heavy.js /src > /src/EsLint_Security_Scanner_Configs.txt

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /app/eslint-report.time.txt
mv /app/eslint-report.* /src
mv /app/EsLint_Security_Scanner_Configs.txt /src