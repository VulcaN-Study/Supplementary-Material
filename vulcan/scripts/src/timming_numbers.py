import os
import subprocess
import json

tools = {
    'codeqldb': ['codeql-report.time_db.txt', 'codeql-report.time_exec.txt'],
    'codeql': 'codeql-report.time_exec.txt',
    'graudit': 'graudit-report.time.txt',
    'eslint': 'eslint-report.time.txt',
    'njsscan': 'njsscan-report.time.txt',
    'drek': 'report-drek.time.txt',
    'mosca': 'mosca-report.time.txt',
    'insidersec': 'report-insidersec.time.txt',
    'msdevskim': 'MSDevSkim.time.txt'
}

def get_timming(tool_path):
    if os.path.exists(tool_path):
        with open(tool_path, 'r') as tf:
            return float(tf.readline())

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
            packagePath = os.path.join(advPath, "package")
            
            locCommand = "( find {0} -name '*.js' -print0 | xargs -0 cat ) | wc -l".format(packagePath)
            
            proc = subprocess.Popen(locCommand, stdout=subprocess.PIPE, shell=True)
            (out, err) = proc.communicate()
            loc = int(out)

            adv_timming = {
                "adv": adv,
                "loc": loc,
                "times": {}
            }

            for tool,tool_path in tools.items():
                if isinstance(tool_path, list):
                    total = 0.0
                    for tp in tool_path:
                        t = get_timming(os.path.join(advPath, tp))
                        if t:
                            total += t
                        else:
                            total = None
                            break 
                    adv_timming["times"][tool] = total 
                else:
                    adv_timming["times"][tool] = get_timming(os.path.join(advPath, tool_path))
            
            results.append(adv_timming)

    print("Processed {0} packages".format(count))
    return results


if __name__ == "__main__":
    with open('timming-results.json', 'w') as pf:
        json.dump(processResults(), pf)