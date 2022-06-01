#!/bin/bash

if [ -z "$1" ];then
    echo "Must supply a json file to validate"
    exit
fi

subdir=$(dirname $1)
inpath=$(realpath $subdir)
docker run -v $inpath:/file pajv -s /schema/report-schema.json -d $(basename $1)