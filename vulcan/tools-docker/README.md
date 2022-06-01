# Tools Docker Images 

## Build image
To build the container to run the tool, you'll need to run the provided script:

```bash
./docker-build.sh
```

## Run Tool

> Make sure all scripts are executable

The script `run_<tool_name>.sh` is a wrapper of `docker run`. 
The basic usage of the script is as following:

```
Usage: run_<tool_name>.sh <path_to_scan> [-o|--output <path_output_files>] [--json|html|txt]
    <path_to_scan> - Is the path that will be given to the tool as input.
    -o, --output - The path where the output files will be redirected.
    --json|html|txt - The type of output. By default it outputs all possible outputs. (Note: some tools might not have this option.)
```