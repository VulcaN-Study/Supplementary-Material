#!/bin/bash

ADVISORY_DIR=advisories

function get_remote_file() {
    advisory=$1
    echo "Downloading advisory $advisory"
    curl -s -H 'X-Spiferack: 1' https://www.npmjs.com/advisories/$advisory/versions > $ADVISORY_DIR/$advisory.json
}

function check_files() {
    N_REQUESTS=0

    LOCAL_ADVISORIES=$1
    NEW_ADVISORIES=$2+1

    for ((i=$LOCAL_ADVISORIES; i < $NEW_ADVISORIES; i++)); do
    
        if [[ $N_REQUESTS -gt 98 ]]; then
            echo "[Sleeping for 1 minute after $N_REQUESTS requests]"
            N_REQUESTS=0
            echo "[Requests = $N_REQUESTS]"
            sleep 1m
        fi

        # check if file exists
        if [[ -e $ADVISORY_DIR/$i.json ]]; then
            # get file content
            valid_file_content=$(cat $ADVISORY_DIR/$i.json | grep 'advisoryData')

            # check if file content shows that advisory does not exist
            check_exists=$(cat $ADVISORY_DIR/$i.json | grep 'Advisory not found')

            # check if file does not containt 'advisoryData'
            # check that file exists remotely
            if [[ -z $valid_file_content ]] && [[ -z $check_exists ]]; then
                rm $ADVISORY_DIR/$i.json
                get_remote_file $i
                N_REQUESTS=$[$N_REQUESTS + 1]
            fi
        else
            get_remote_file $i
            N_REQUESTS=$[$N_REQUESTS + 1]
        fi
    done
}

new_advisories=$(python latest_advisory_number.py)
local_advisories=$(ls -l $ADVISORY_DIR | grep '^-' | wc -l)

if [[ $new_advisories -gt $local_advisories ]]; then

    echo "There are $(($new_advisories-$local_advisories)) new advisories"
    echo "Do you wish to download them? (y/n)"
    read choice

    if [[ -n $choice ]] && [[ $choice == "y" ]]; then
        check_files $(($local_advisories+1)) $new_advisories
    fi
else
    echo "There no new advisories to download"
fi
