const braces = require('braces');
braces.expand(('{'.repeat(2500) + '}'.repeat(2500)).repeat(10));

