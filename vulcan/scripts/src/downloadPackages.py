#!/usr/bin/env python3

import requests
import os
import json
import time
import sys
from pprint import pprint
from utils import get_resource,connectToMongoAdvisoryDB


def createDirectory(path):
    try:
        os.mkdir(path)
    except FileExistsError:
        pass


def download_vulnerable_packages(advisories_cursor):
    cwd = os.getcwd()
    packagesDir = os.path.join(cwd, "packages")

    print("Creating 'packages' directory")
    createDirectory(packagesDir)

    for advisory in advisories_cursor:
        cwe = advisory["advisoryData"]["cwe"]
        cweDir = os.path.join(packagesDir, cwe)
        createDirectory(cweDir)

        advisoryId = advisory["advisoryData"]["id"]

        advisoryDir = os.path.join(cweDir, str(advisoryId))
        
        createDirectory(advisoryDir)

        tarball_link = advisory["vulnerable_package"]["tarball_url"]
        tarFilename = os.path.join(advisoryDir, tarball_link.split('/')[-1])
        
        if os.path.exists(tarFilename):
            print(f"\nIgnore {advisoryId}")
            continue
        
        response = get_resource(tarball_link, stream=True)
        print("Downloading", tarball_link.split('/')[-1])

        if response.status_code == 200:
            print("Writing", tarball_link.split('/')[-1])
            with open(tarFilename, 'wb') as f:
                f.write(response.raw.read())
        else:
            print(response.json())


def get_advisories_with_code(advisory_collection):
    return advisory_collection.find({"vulnerable_package": {"$exists": True}})


def main():
    advisory_db = connectToMongoAdvisoryDB()
    advisory_collection = advisory_db.advisories
    advisories_cursor = get_advisories_with_code(advisory_collection)
    
    download_vulnerable_packages(advisories_cursor)

if __name__ == "__main__":
    main()