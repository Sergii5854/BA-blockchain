import Block from "./Block"
import Transaction from "./Transaction";

import chainStore from "./../store/chainStore";

export default class Chain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 1;

    }

    createGenesisBlock() {
        return new Block('15/11/2018', 'this important data GenesisBlock', '0')
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash
        // newBlock.hash = newBlock.calculateHash()
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    mineTransaction(mineRewardAddress) {

        let rewardTransaction = new Transaction(null, mineRewardAddress, this.miningReward)
        this.pendingTransactions.push(rewardTransaction)

        let block = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().hash)
        block.mineBlock(this.difficulty)

        console.log("block successfully mined");
        this.chain.push(block)

        this.pendingTransactions = []

    }

    addTransaction(transaction) {
        if(!transaction.from || !transaction.to){
            throw new Error('transaction must include from and to  Addresses')
        }

        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to Chain ')
        }

        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(addres) {
        let balance = 0

        for (let block of this.chain) {
            for (let transaction of block.transactions) {

                if (transaction.from === addres) {
                    balance -= transaction.amount
                }

                if (transaction.to === addres) {
                    balance += transaction.amount
                }
            }
        }

        return balance
    }


    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransaction()) {
                return false
            }


            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }
        return true
    }


}