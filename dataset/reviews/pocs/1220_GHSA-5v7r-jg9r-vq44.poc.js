const crackme = require('./crackme') //to do the padding oracle attack
var SimpleCrypto = require("simple-crypto-js").default //vulnerable package

const secretKey = SimpleCrypto.generateRandom() //get the encryption key

const simpleCrypto = new SimpleCrypto(secretKey) //generate encrypt/decrypt obj

const cipher = simpleCrypto.encrypt("text")

//(skipping some crakme initalizations

console.log(crackme.api.auth(cipher)) // will return the plaintext by performing the padding oracle attack


