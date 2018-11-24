import sha256 from "sha256"
import EC from 'elliptic/lib/elliptic/ec';

export default class Transaction {

    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    calculateHash() {
        return sha256(this.from + this.to + this.amount)
    }

    signTransaction(signKey) {
        if (signKey.getPublic('hex') !== this.from) {
            throw new Error('You cannot sign Transaction for other wallets')
        }

        let hashTransaction = this.calculateHash()
        let sig = signKey.sign(hashTransaction, 'base64')
        this.signature = sig.toDER('hex')

    }

    isValid() {
        if (this.from === null) return true

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction')
        }
        const ec = new EC('secp256k1');
        let publicKey = ec.keyFromPublic(this.from, 'hex')
        return publicKey.verify(this.calculateHash(), this.signature)

    }


}


