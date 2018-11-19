var EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair()
console.log(key);
const publicKey = key.getPublic('hex')
const privetKey = key.getPrivate('hex')

console.group("KEY")
console.log(`Public key ${publicKey}`);
console.log(`privet key ${privetKey}`);


console.groupEnd()

