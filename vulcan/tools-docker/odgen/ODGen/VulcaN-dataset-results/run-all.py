import os
import sys
import glob
import shutil

def deleteLogs(dataset):
    print(f"Removing logs...")
    logPath = os.path.join(os.getcwd(), "logs")
    if os.path.exists(logPath):
        shutil.rmtree(logPath)


if len(sys.argv) > 1:
    dataset = sys.argv[1]
    if os.path.isdir(dataset):
        deleteLogs(dataset)
        print("Processing files in ", dataset)
        advisoryDirectories = glob.glob(f"{dataset}/*")
        for advDir in advisoryDirectories:
            srcDir = glob.glob(f"{advDir}/src/*")
            for f in srcDir:
                os.system(f"pwd; python ../odgen.py ./{f} -m -a -q -t os_command")
