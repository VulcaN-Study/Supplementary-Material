#!/bin/bash

ADVISORY_DIR=advisories_2
NOT_FOUND_ADVISORY_DIR=not_found_advisories_2
VALID=0
NOT_FOUND=0
OTHER_ADVISORIES=0

for id in $(ls $ADVISORY_DIR)
do
    valid_content=$(cat $ADVISORY_DIR/$id | grep "advisoryData")
    not_found=$(cat $ADVISORY_DIR/$id | grep "Advisory not found")

    if [ ! -z "$valid_content" ]; then
        VALID=$(($VALID + 1))
    elif [ ! -z "$not_found" ]; then
        NOT_FOUND=$(($NOT_FOUND + 1))
        mv $ADVISORY_DIR/$id $NOT_FOUND_ADVISORY_DIR
    else
        OTHER_ADVISORIES=$(($OTHER_ADVISORIES + 1))
        echo "$id"
    fi
done

echo "Moved all NOT_FOUND to $NOT_FOUND_ADVISORY_DIR"
echo "VALID=$VALID"
echo "NOT_FOUND=$NOT_FOUND"
echo "OTHER_ADVISORIES=$OTHER_ADVISORIES"