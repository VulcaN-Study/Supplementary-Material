#!/bin/bash

import requests
from pymongo import MongoClient

def connectToMongoAdvisoryDB():
    URI='mongodb://root:MongoDB2020!@mongo:27017'
    client = MongoClient(URI)
    return client['advisory_db']

def get_resource(url, headers={}, head=False, stream=False):
    while True:
        if head:
            # print(f"requests.head({url})")
            res = requests.head(url)
        else:
            # print(f"requests.get({url}, headers={headers})")
            res = requests.get(url, headers=headers, stream=stream)
        
        # IF too many requests try again
        if res.status_code == 429:
            print("Sleeping for 60 seconds")
            time.sleep(60)
            continue
        else:
            return res