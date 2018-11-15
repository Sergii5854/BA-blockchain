import sha256 from "sha256"

export default class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data || {};
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
    }


}

