import EC from 'elliptic/lib/elliptic/ec';
const ec = new EC('secp256k1');

const key = ec.genKeyPair()
console.log(key);
const publicKey = key.getPublic('hex')
const privetKey = key.getPrivate('hex')

console.group("Generate Key Pair")
console.log(`Public key: ${publicKey}`);
console.log(`Privet key: ${privetKey}`);


console.groupEnd()

