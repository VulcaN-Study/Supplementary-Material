# Dataset

Each advisory is identified by a unique ID, which obeys one of the following formats:

- *npmjs_id*, where *npmjs_id* is a number, if at the time of review **npmjs.com** hosted the advisories (old format) and **github.com** does not host the advisory, e.g:
    
        1548

- *ghsa_id*, where *ghsa_id* is the ID of a GitHub Security Advisory (*GHSA-xxxx-xxxx-xxxx*), if at the time of review **github.com** hosted the advisories (new format), e.g:

        GHSA-vx3p-948g-6vhq

- *npm_id*_*ghsa_id*, if the advisory has an *npm_id* (old format) but is also hosted at **github.com** (new format), e.g:

        10_GHSA-333x-9vgq-v2j4

## *packages/*

The *packages/* directory contains one directory for each advisory. In each directory there is a *.tgz* which contains the vulnerable package reported in the advisory and the output of all the tested tools for that package.   

## *reviews/*

The *reviews/* directory contains the 957 advisory reviews, the *patches/* directory and the *pocs/* directory.

Each advisory review contains:
    
- **Advisory CWE:** The CWE assigned by the reporter who created the advisory.

- **Advisory CVE:** The  Common Vulnerabilities and Exposures identifier (if it exists).

- **Advisory Link:** A URL of the npm or github advisory web page.

- **Correct CWE:** The CWE assigned by the reviewer (might differ from the Advisory CWE) 

- **Correct Package Link**: URL to download the correct package version which contains the vulnerability described in the advisory.

- **Vulnerability Location**: Used to determine if the output of a given vulnerability detection tool is correct. It can be (one or multiple) source/sink or (one or multiple) block patterns.

- **Proof of Concept**: Exploit which proves the existence of the reported vulnerability. It can be an URL referenced by the reporter in the advisory or the name of a file created by the reviewer and located in the *pocs/* directory.

- **Patch**: A possible fix to eliminate the reported vulnerability. It can be an URL referenced by the reporter in the advisory or the name of a file created by the reviewer and located in the *patches/* directory.

- **Tools' Outputs**: Characterized according to a common discrete classification score:

    - **Score A:** The tool correctly detects and classifies the
    vulnerability reported in the advisory (true positive).

    - **Score B:** The tool shows a warning for the vulnerable
    code, but does not explicitly classify the finding as a
    vulnerability (true positive).

    - **Score C:** The tool only shows results that do not match
    the vulnerability in the advisory report (false positives).

    - **Score D:** The tool produces no output (false negative).