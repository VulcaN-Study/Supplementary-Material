#!/bin/bash

jq -n 'reduce inputs as $d (.; . + [ $d ])' advisories/* > advisories.json