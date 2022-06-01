#!/bin/bash
counter=0
packages_dir=../../../framework/src/packages
for cwe in $(ls $packages_dir)
do

    #echo $packages_dir/$cwe
    for advisoryId in $(ls $packages_dir/$cwe)
    do
        advisoryPath=$packages_dir/$cwe/$advisoryId
        ((counter++))

         if [[ ! -e "$advisoryPath/njsscan-report.csv" ]]; then
            echo "#####################################################"
            echo "Processing package number $counter - $cwe/$advisoryId"
            echo "#####################################################"
            ./run_njsscan.sh $advisoryPath/package -o $advisoryPath
        fi
    done
done

echo "Processed $counter packages"