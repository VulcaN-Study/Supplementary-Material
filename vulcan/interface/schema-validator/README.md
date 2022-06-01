# Schema Validator

## Build image
To build the container to run the tool, you'll need to run the provided script:

```bash
$ ./docker-build.sh
```

## Run Tool

To run the tool just execute the `validate-json.sh` script as such:
```
$ ./validate-json.sh report.json
report.json valid
```

The tool will say `report-filename valid` if it is valid or print out an error message to help you identify the problem. For example:

```
$ ./validate-json.sh invalid-report.json
invalid-report.json invalid
[
  {
    keyword: 'required',
    dataPath: '.tools',
    schemaPath: '#/properties/tools/required',
    params: { missingProperty: 'codeql' },
    message: "should have required property 'codeql'"
  }
]
```
