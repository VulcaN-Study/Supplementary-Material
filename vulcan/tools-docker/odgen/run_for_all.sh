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


        ./run_odgen.sh $advisoryPath/package -o $advisoryPath
    done
done

echo "Processed $counter packages"
