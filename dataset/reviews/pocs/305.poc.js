// Test out the Swagger adapter in Fury to convert Swagger 2.0 documents
// into Refract elements.
const source = `
swagger: '2.0'
info:
  title: Read local files
  version: '1.0'

paths:
  /foo:
    get:
      responses:
        200:
          description: Some description
          examples:
            text/html:
              example:
                $ref: '/etc/passwd'
`;

const fury = require('fury');
fury.use(require('./package/lib/adapter.js'));

fury.parse({source}, (err, result) => {
    if (err) { console.log(err) }
    if (result) {
        // Print out the refract to make overview and copy/paste easy
        console.log(JSON.stringify(result.toRefract(), null, 2));
        // Output the js objects so you can inspect each element
        console.log(result.toRefract());
    }
});
