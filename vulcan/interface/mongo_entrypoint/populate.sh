#!/bin/bash

MONGO_DB=advisory_db
MONGO_USER=root
MONGO_PASS=MongoDB2020!

mongoimport --db $MONGO_DB --collection cwes --authenticationDatabase admin \
    --username $MONGO_USER --password $MONGO_PASS \
    --drop --file /docker-entrypoint-initdb.d/cwes.json --jsonArray

mongoimport --db $MONGO_DB --collection advisories --authenticationDatabase admin \
    --username $MONGO_USER --password $MONGO_PASS \
    --drop --file /docker-entrypoint-initdb.d/advisories.json --jsonArray

mongoimport --db $MONGO_DB --collection analysis --authenticationDatabase admin \
    --username $MONGO_USER --password $MONGO_PASS \
    --drop --file /docker-entrypoint-initdb.d/analysis-results.json --jsonArray