#!/bin/bash
json=false sarif=false txt=false

POSITIONAL=()
while [[ $# -gt 0 ]]
do
opt="$1"
case $opt in
    --json)
    json=true
    shift # past argument
    ;;
    --sarif)
    sarif=true
    shift # past argument
    ;;
    --txt)
    txt=true
    shift # past argument
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done

if ! $json && ! $sarif && ! $txt; then
    json=true
    sarif=true
    txt=true
fi


echo "Running comand: devskim analyze /src /src/MSDevSkim.json -f json"
start_time=$(date +%s.%3N)

devskim analyze /src /results/MSDevSkim.json -f json

end_time=$(date +%s.%3N)
# elapsed time with millisecond resolution
# keep three digits after floating point.
elapsed=$(echo "scale=3; $end_time - $start_time" | bc)
echo "$elapsed" > /app/MSDevSkim.time.txt
mv /app/MSDevSkim.time.txt /src

if $json; then
    echo "Running comand: devskim analyze /src /src/MSDevSkim.json -f json"
    devskim analyze /src /results/MSDevSkim.json -f json
fi
if $sarif; then
    echo "Running comand: devskim analyze /src /src/MSDevSkim.sarif -f sarif"
    devskim analyze /src /results/MSDevSkim.sarif -f sarif 
fi
if $txt; then
    echo "Running comand: devskim analyze /src /src/MSDevSkim.txt -f txt"
    devskim analyze /src /results/MSDevSkim.txt -f text 
fi

mv /results/MSDevSkim.* /src
