#!/bin/bash

# ODGEN_DIR=/home/tiago/Documents/IST/phd/phd-research/ODGen
ODGEN_DIR=$(pwd)/ODGen

clean_temp () {
    advisoryPath=$1
    cd $ODGEN_DIR;
    $ODGEN_DIR/clean.sh;
    cd $advisoryPath;
}

TIMEOUT=120
counter=0
# packages_dir=/home/tiago/Documents/IST/phd/phd-research/empirical-jsvuln-tools-study/framework/src/packages
packages_dir=$(pwd)/../../../framework/src/packages
for cwe in $(ls $packages_dir)
do

    #echo $packages_dir/$cwe
    for advisoryId in $(ls $packages_dir/$cwe)
    do
        advisoryPath=$packages_dir/$cwe/$advisoryId
        ((counter++))
        echo $advisoryPath
        cd $advisoryPath

        rm -rf $advisoryPath/logs odgen-report.time_exec.txt
        echo "Running comand: python3 ODGen/odgen.py . --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t [all vulns]"
        clean_temp $advisoryPath
        start_time_exec=$(date +%s.%3N)
        python3 $ODGEN_DIR/odgen.py ./package --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t os_command
        clean_temp $advisoryPath
        python3 $ODGEN_DIR/odgen.py ./package --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t code_exec
        clean_temp $advisoryPath
        python3 $ODGEN_DIR/odgen.py ./package --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t proto_pollution
        clean_temp $advisoryPath
        python3 $ODGEN_DIR/odgen.py ./package --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t ipt
        clean_temp $advisoryPath
        python3 $ODGEN_DIR/odgen.py ./package --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t xss
        clean_temp $advisoryPath
        python3 $ODGEN_DIR/odgen.py ./package --timeout $TIMEOUT --nodejs -a -s --max-rep 1 -q -t path_traversal
        end_time_exec=$(date +%s.%3N)
        elapsed_exec=$(echo "scale=3; $end_time_exec - $start_time_exec" | bc)
        echo "$elapsed_exec" > odgen-report.time_exec.txt
        echo "$elapsed_exec"
    done
done


echo "Processed $counter packages"
