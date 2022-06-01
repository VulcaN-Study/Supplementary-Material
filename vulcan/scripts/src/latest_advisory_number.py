import requests
import re
import json
import time
from pprint import pprint

r = requests.get('https://www.npmjs.com/advisories')
result = re.findall('<a href="/advisories/[0-9]+">', r.text)[0][21:-2]

print(result)

def get_more_advs(present, new):
    advisories = 0
    n_requests = 0

    print(f"{new - present} advisories to check")

    headers = { "X-Spiferack": "1"}
    for adv_id in range(present, new+1):

        if n_requests == 50:
            print(f"Sleeping")
            n_requests = 0
            time.sleep(60)
        
        n_requests += 1
        r = requests.get(f"https://www.npmjs.com/advisories/{adv_id}/versions", headers=headers)
        adv_data = r.json()

        if "advisoryData" in adv_data:
            advisories += 1

    return advisories
        

print(get_more_advs(1549, int(result)))
