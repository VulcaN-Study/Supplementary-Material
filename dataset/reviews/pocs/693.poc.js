var ipns = require("ipns")
const crypto = require('libp2p-crypto')
const sequence = 0
const validity = 1000000
const cid = 'QmWEekX7EZLUd9VXRNMRXW3LXe4F6x7mB8oPxY5XLptrBq'

crypto.keys.generateKeyPair('RSA', 2048, (err, keypair) => {
	ipns.create(keypair, cid, sequence, validity, (err, entry) => {
		//corrupt the record by changing the value to random bytes
		entry.value = crypto.randomBytes(46).toString()
		ipns.validate(keypair.public, entry, (err) => {
			if(err){
				console.log("Error: ", err);
			}
		})
	})
})