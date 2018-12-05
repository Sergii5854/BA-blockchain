import sha256 from "sha256"
import BigInteger from 'big-integer'

export default class Block {

    constructor( timestamp, transactions= [], previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
    }

    // mineBlock(difficulty) {
    //     while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    //         this.nonce++;
    //         this.hash = this.calculateHash()
    //     }
    //     console.log(`block mined  ${this.hash} `); // eslint-disable-line no-console
    //
    // }

    hasValidTransaction(){
        for( let transaction of this.transactions ){
            if(!transaction.isValid()){
                return false
            }
        }
        return false
    }


    //hw3
    addTransaction(transaction) {
        if (!transaction.isValid) {
            throw new Error('Invalid transaction')
        }
        this.transactions.push(transaction)
    }

    async mineBlock(difficulty) {
        return new Promise((resolve) => {
            while (!this.hash.startsWith("0".repeat(difficulty))) {
                this.nonce += BigInteger(1);
                if (this.nonce % 5000 === 0) {
                    console.log(this.nonce) // eslint-disable-line no-console
                }
                this.hash = this.calculateHash();
            }
            return resolve(this.hash)
        })
    }






}


