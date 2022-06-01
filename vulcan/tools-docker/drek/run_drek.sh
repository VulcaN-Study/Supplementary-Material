#!/bin/bash
outPath=""

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

echo "Running command: docker run -v $inPath:/src drek"
docker run -v "$inPath":/src drek

if [ -z "$outpath" ]; then
    echo "Check output file(s) in: $inPath"
else
    mv -f "$inPath"/report-drek.* "$outpath"/
    echo "Check output file(s) in: $outpath"
fi