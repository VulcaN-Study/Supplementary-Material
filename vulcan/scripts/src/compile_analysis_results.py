#!/usr/bin/env python3

import os
import json
import pandas as pd


def codeql_page(cwe, adv):
    return {
        'tool': 'codeql',
        'executed_commands': [
            "codeql database create codeql-database/ --language=javascript -s /package_src",
            "codeql database analyze codeql-database/ codeql-repo/javascript/ql/src/codeql-suites/javascript-security-extended.qls --format=csv --output=codeql-report.csv",
            "codeql database analyze codeql-database/ codeql-repo/javascript/ql/src/codeql-suites/javascript-security-extended.qls --format=sarif-latest --output=codeql-report.sarif"
        ],
        'tool_documentation': "https://github.com/github/codeql",
        'tool_reports': [
            f"packages/{cwe}/{adv}/codeql.sarif",
            f"packages/{cwe}/{adv}/codeql.csv",
        ]
    }


def njsscan_page(cwe, adv):
    return {
        'tool': 'njsscan',
        'executed_commands': [
            "njsscan --json -o njsscan-report.json /package_src"
        ],
        'tool_documentation': "https://github.com/ajinabraham/njsscan",
        'tool_reports': [
            f"packages/{cwe}/{adv}/njsscan.json"
        ]
    }


def drek_page(cwe, adv):
    return {
        'tool': 'drek',
        'executed_commands': [
            "drek --signatures='drek-signatures/signatures/*.yml' --format='json' --ignore='node_modules' /src > report-drek.json"
        ],
        'tool_documentation': "https://github.com/chrisallenlane/drek",
        'tool_reports': [
            f"packages/{cwe}/{adv}/report-drek.json"
        ]
    }


def mosca_page(cwe, adv):
    return {
        'tool': 'mosca',
        'executed_commands': [
            "mosca --egg Mosca/eggs/javascript_common_fail.egg --path /src --ext '\\.js$' --log mosca-report.txt"
        ],
        'tool_documentation': "https://github.com/CoolerVoid/Mosca",
        'tool_reports': [
            f"packages/{cwe}/{adv}/mosca-report.txt"
        ]
    }


def msdevskim_page(cwe, adv):
    return {
        'tool': 'msdevskim',
        'executed_commands': [
            "devskim analyze /src MSDevSkim.json -f json",
            "devskim analyze /src MSDevSkim.sarif -f sarif",
            "devskim analyze /src MSDevSkim.txt -f text"
        ],
        'tool_documentation': "https://github.com/microsoft/DevSkim",
        'tool_reports': [
            f"packages/{cwe}/{adv}/MSDevSkim.json",
            f"packages/{cwe}/{adv}/MSDevSkim.sarif",
            f"packages/{cwe}/{adv}/MSDevSkim.txt"
        ]
    }


def eslint_page(cwe, adv):
    return {
        'tool': 'eslint',
        'executed_commands': [
            "eslint --ext .html,.htm,.js -c eslint-security-scanner-configs/eslintrc-light.js /src > EsLint_Security_Scanner_Configs.txt"
        ],
        'tool_documentation': "https://github.com/Greenwolf/eslint-security-scanner-configs",
        'tool_reports': [
            f"packages/{cwe}/{adv}/EsLint_Security_Scanner_Configs.txt"
        ]
    }


def insidersec_page(cwe, adv):
    return {
        'tool': 'insidersec',
        'executed_commands': [
            "insider -force -no-html -no-banner -tech javascript -target /src",
            "mv report.json report-insidersec.json"
        ],
        'tool_documentation': "https://github.com/insidersec/insider",
        'tool_reports': [
            f"packages/{cwe}/{adv}/report-insidersec.json"
        ]
    }


def graudit_page(cwe, adv):
    return {
        'tool': 'graudit',
        'executed_commands': [
            "graudit -A -B -z -d graudit/signatures/js.db /src > graudit-report.js.txt",
            "graudit -A -B -z -d graudit/signatures/js/cookie.db /src > graudit-report.cookie.txt",
            "graudit -A -B -z -d graudit/signatures/js/node.db /src > graudit-report.node.txt",
            "graudit -A -B -z -d graudit/signatures/js/javascript.db /src > graudit-report.javascript.txt",
            "graudit -A -B -z -d graudit/signatures/js/sql.db /src > graudit-report.sql.txt",
            "graudit -A -B -z -d graudit/signatures/owasp/javascript.db /src > graudit-report.owasp.txt",
            "graudit -A -B -z -d graudit/signatures/xss.db /src > graudit-report.xss.txt",
            "graudit -A -B -z -d graudit/signatures/secrets.db /src > graudit-report.secrets.txt"
        ],
        'tool_documentation': "https://github.com/wireghoul/graudit/",
        'tool_reports': [
            f"packages/{cwe}/{adv}/graudit-report.js.txt",
            f"packages/{cwe}/{adv}/graudit-report.cookie.txt",
            f"packages/{cwe}/{adv}/graudit-report.node.txt",
            f"packages/{cwe}/{adv}/graudit-report.javascript.txt",
            f"packages/{cwe}/{adv}/graudit-report.sql.txt",
            f"packages/{cwe}/{adv}/graudit-report.owasp.txt",
            f"packages/{cwe}/{adv}/graudit-report.xss.txt",
            f"packages/{cwe}/{adv}/graudit-report.secrets.txt"
        ]
    }


def processResults():
    results = []

    cwd = os.getcwd()
    packagesDir = os.path.join(cwd, "packages")

    count = 0
    cwes = os.listdir(packagesDir)
    for cwe in cwes:
        cwePath = os.path.join(packagesDir, cwe)
        if not os.path.isdir(cwePath):
            continue
    
        print("Processing {0}".format(cwe))
        advisories = os.listdir(cwePath)
        
        for adv in advisories:
            print("\tProcessing {0}".format(adv))
            count += 1

            advPath = os.path.join(cwePath, adv)
            #codeqlPath = os.path.join(advPath, 'codeql.sarif')
            #njsscanPath = os.path.join(advPath, 'njsscan.json')

            codeqlOutput = codeql_page(cwe, adv)
            njsscanOutput = njsscan_page(cwe, adv)
            drekOutput = drek_page(cwe, adv)
            moscaOutput = mosca_page(cwe, adv)
            msdevskimOutput = msdevskim_page(cwe, adv)
            eslintOutput = eslint_page(cwe, adv)
            insidersecOutput = insidersec_page(cwe, adv)
            grauditOutput = graudit_page(cwe, adv)

            results.append({
                'advisory': {
                    'id': adv,
                    'cwe': cwe,
                },
                'analysis': [
                    codeqlOutput,
                    njsscanOutput,
                    drekOutput,
                    moscaOutput,
                    msdevskimOutput,
                    eslintOutput,
                    insidersecOutput,
                    grauditOutput
                ]
            })

    print(count)
    return results            


if __name__ == "__main__":
    with open('analysis-results.json', 'w') as pf:
        json.dump(processResults(), pf)