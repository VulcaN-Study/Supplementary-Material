#!/usr/bin/env python3

import requests
import os
import json
import codecs
import time
import sys
from pprint import pprint

def get_resource(url, headers={}, head=False):
    while True:
        if head:
            # print(f"requests.head({url})")
            res = requests.head(url)
        else:
            # print(f"requests.get({url}, headers={headers})")
            res = requests.get(url, headers=headers)
        
        # IF too many requests try again
        if res.status_code == 429:
            print("Sleeping for 60 seconds")
            time.sleep(60)
            continue
        else:
            return res


def get_adv_data(adv_filepath):
    with open(adv_filepath, "r") as adv_file:
        return json.load(adv_file)


def write_adv_data(adv_data, adv_filepath):
    with open(adv_filepath, "w") as adv_file:
        json.dump(adv_data, adv_file)


# GET list of all vulnerable versions in report
def get_vulnerable_versions(adv_data):
    try:
        affectedLen = len(adv_data['versions']['affected'])
        module = adv_data['advisoryData']['module_name']
        # Show the most recent first
        return list(reversed(adv_data['versions']['affected']))
    except:
        pass
        #print(">>>>>>> Invalid advisory")


# GET valid vulnerable package download link
def get_vulnerable_version_endpoint(adv_data, vulnerable_versions):
    
    module = adv_data['advisoryData']['module_name']
    versions_tried = 0
    for vuln_version in vulnerable_versions:
        try:
            version = vuln_version['version']
            # CHECK version endpoit where we can get the dist link (tar)
            packageEndpoint = f"https://www.npmjs.com/package/{module}/v/{version}"
            version_res = get_resource(packageEndpoint, headers={'X-Spiferack': '1'})
            if version_res.status_code != 200:
                # TRY next vulnerable version
                versions_tried += 1
                print(f"ERROR - Invalid version url ({versions_tried} / {len(vulnerable_versions)})")
                continue
            
            res_json = version_res.json()
            # CHECK dist link (tar)
            for v in res_json['packument']['versions']:
                if version == v['version']:
                    tarball_url = v['dist']['tarball']

            # CHECK if code is available
            tarball_res = get_resource(tarball_url, head=True)
            if tarball_res.status_code != 200:
                # TRY next vulnerable version
                versions_tried += 1
                print(f"ERROR - Invalid tarball url ({versions_tried} / {len(vulnerable_versions)})")
                continue

            return {
                "version": vuln_version,
                "tarball_url": tarball_url,
            }
            
        except Exception as e:
            print(e)
            #print(">>>>>>> Invalid advisory")

    


def main():
    advisory_dir = os.path.join(os.getcwd(), "advisories")
    advisories = os.listdir(advisory_dir)

    total_downloaded = 0
    total_advisories = len(advisories)

    for adv_filename in advisories:

        print(f"Processing {adv_filename} - {total_downloaded} of {total_advisories}")
        total_downloaded += 1
        
        adv_filepath = os.path.join(advisory_dir, adv_filename)

        # CHECK if we have a valid advisory json file
        if adv_filename.endswith(".json"):
            # READ advisory file
            adv_data = get_adv_data(adv_filepath)

            # delete unnecessary information
            del adv_data["user"]
            del adv_data["notifications"]
            del adv_data["csrftoken"]
            del adv_data["isNpme"]
            del adv_data["npmExpansions"]
        
            # GET all vulnerable versions metadata
            vulnerable_versions = get_vulnerable_versions(adv_data)
            vulnerable_tarball_link = None

            if len(vulnerable_versions) > 0:
                # TEST and GET tarball download link
                vulnerable_tarball_link = get_vulnerable_version_endpoint(adv_data, vulnerable_versions)

            if vulnerable_tarball_link:
                adv_data["vulnerable_package"] = vulnerable_tarball_link
            
                # WRITE new advisory data in new file
                adv_filepath = os.path.join(advisory_dir, adv_filename)
                write_adv_data(adv_data, adv_filepath)
            else:
                print("ERROR - No code available")


def clean_advisories():
    advisory_dir = os.path.join(os.getcwd(), "advisories")
    advisories = os.listdir(advisory_dir)

    total_downloaded = 0
    total_advisories = len(advisories)

    for adv_filename in advisories:

        total_downloaded += 1
        print(f"Processing {adv_filename} - {total_downloaded} of {total_advisories}")

        adv_filepath = os.path.join(advisory_dir, adv_filename)

        # CHECK if we have a valid advisory json file
        if adv_filename.endswith(".json"):
            # READ advisory file
            adv_data = get_adv_data(adv_filepath)

            # delete unnecessary information
            del adv_data["user"]
            del adv_data["notifications"]
            del adv_data["csrftoken"]
            del adv_data["isNpme"]
            del adv_data["npmExpansions"]

            # WRITE new advisory data in new file
            new_adv_filepath = os.path.join(advisory_dir, adv_filename)
            write_adv_data(adv_data, new_adv_filepath)


def clean_cwe_nvd_others():
    advisory_dir = os.path.join(os.getcwd(), "advisories")
    advisories = os.listdir(advisory_dir)

    total_downloaded = 0
    total_advisories = len(advisories)

    for adv_filename in advisories:

        total_downloaded += 1
        print(f"Processing {adv_filename} - {total_downloaded} of {total_advisories}")

        adv_filepath = os.path.join(advisory_dir, adv_filename)

        # CHECK if we have a valid advisory json file
        if adv_filename.endswith(".json"):
            # READ advisory file
            adv_data = get_adv_data(adv_filepath)

            cwe_type = adv_data['advisoryData']['cwe']
            if cwe_type == "CWE-" or cwe_type == "CWE-null":
                adv_data['advisoryData']['cwe'] = "CWE-NVD-Other"

            # WRITE new advisory data in new file
            write_adv_data(adv_data, adv_filepath)


def clean_cwe_506():
    advisory_dir = os.path.join(os.getcwd(), "advisories")
    advisories = os.listdir(advisory_dir)

    total_downloaded = 0
    total_advisories = len(advisories)

    for adv_filename in advisories:

        total_downloaded += 1
        print(f"Processing {adv_filename} - {total_downloaded} of {total_advisories}")

        adv_filepath = os.path.join(advisory_dir, adv_filename)

        # CHECK if we have a valid advisory json file
        if adv_filename.endswith(".json"):
            # READ advisory file
            adv_data = get_adv_data(adv_filepath)

            cwe_type = adv_data['advisoryData']['cwe']
            if cwe_type == "CWE-506":
                os.remove(os.path.join(advisory_dir, adv_filename))


def verify_package_links():
    advisory_dir = os.path.join(os.getcwd(), "advisories")
    advisories = os.listdir(advisory_dir)

    total_downloaded = 0
    total_advisories = len(advisories)

    tested_links = 0

    for adv_filename in advisories:

        total_downloaded += 1

        adv_filepath = os.path.join(advisory_dir, adv_filename)

        # CHECK if we have a valid advisory json file
        if adv_filename.endswith(".json"):
            # READ advisory file
            adv_data = get_adv_data(adv_filepath)

            cwe_type = adv_data['advisoryData']['cwe']
            if cwe_type != "CWE-506":
                try:
                    vulnerable_package = adv_data['vulnerable_package']
                except Exception as e:
                    vulnerable_package = None

                if not vulnerable_package:
                    tested_links += 1
                    # GET all vulnerable versions metadata
                    vulnerable_versions = get_vulnerable_versions(adv_data)
                    vulnerable_tarball_link = None

                    if len(vulnerable_versions) > 0:
                        # TEST and GET tarball download link
                        vulnerable_tarball_link = get_vulnerable_version_endpoint(adv_data, vulnerable_versions)

                    if vulnerable_tarball_link:
                        adv_data["vulnerable_package"] = vulnerable_tarball_link
                        print("Success")

                        # Remove before adding
                        os.remove(os.path.join(advisory_dir, adv_filename))
                    
                        # WRITE new advisory data in new file
                        new_adv_filepath = os.path.join(advisory_dir, adv_filename)
                        write_adv_data(adv_data, new_adv_filepath)
                    else:
                        print("ERROR - No code available")

    print(f"Tested {tested_links} links")

if __name__ == "__main__":
    main()
    clean_advisories()
    clean_cwe_nvd_others()
    verify_package_links()
    clean_cwe_506()