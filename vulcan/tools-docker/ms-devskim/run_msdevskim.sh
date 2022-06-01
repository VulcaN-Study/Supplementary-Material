#!/bin/bash
outPath=""
json=false sarif=false txt=false

POSITIONAL=()
while [[ $# -gt 0 ]]
do
opt="$1"
case $opt in
    -o|--output)
    outpath=$(realpath $2)
    shift # past argument
    shift # past value
    ;;
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


# handle non-option arguments
if [[ ${#POSITIONAL[@]} -eq 0 ]]; then
    echo "$0: Is required input path."
    exit 4
fi
inPath=$(realpath ${POSITIONAL[0]})

if ! $json && ! $sarif && ! $txt; then
    echo "Running command: docker run -v $inPath:/src msdevskim"
    docker run -v "$inPath":/src msdevskim
elif $json; then
    echo "Running command: docker run -v $inPath:/src msdevskim --json"
    docker run -v "$inPath":/src msdevskim --json
elif $sarif; then
    echo "Running command: docker run -v $inPath:/src msdevskim --sarif"
    docker run -v "$inPath":/src msdevskim --sarif
elif $txt; then
    echo "Running command: docker run -v $inPath:/src msdevskim --txt"
    docker run -v "$inPath":/src msdevskim --txt
fi

echo "Running command: docker run -v $inPath:/src msdevskim --json"
docker run -v "$inPath":/src msdevskim --json

if [ -z "$outpath" ]; then
    echo "Check output file(s) in: $inPath"
else
    mv -f "$inPath"/MSDevSkim.* "$outpath"/
    echo "Check output file(s) in: $outpath"
fi