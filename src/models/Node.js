import EC from "elliptic/lib/elliptic/ec";

const ec = new EC("secp256k1");

export default class Node {
    constructor(chain) {
        this.chain = chain
        this.myWallet = ec.genKeyPair()
    }

    publicKey() {
        return this.myWallet.getPublic('hex')
    }

    wallet() {
        return this.myWallet
    }
}