import Block from "./Block"
import Transaction from "./Transaction";

const minePeriod =  1000

export default class Chain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 1;

    }

    createGenesisBlock() {
        return new Block('15/11/2018', [{"from":'GenesisBlock' }], '0')
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

        console.log("block successfully mined"); // eslint-disable-line no-console
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

    getBalanceOfAddress(address) {
        let balance = 0

        for (let block of this.chain) {
            for (let transaction of block.transactions) {

                if (transaction.from === address) {
                    balance -= transaction.amount
                }

                if (transaction.to === address) {
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

    async mineBlock(transactions) {
        const begin = performance.now();

        let block = new Block();
        transactions.forEach(function(transaction) {
            block.addTransaction(transaction);
        });
        let getLastBlock = this.getLastBlock();
        block.previousHash = getLastBlock.hash;
        return block.mineBlock(this.difficulty).then(() => {
            const end = performance.now();
            const diff = end - begin;

            console.log({ time: diff, difficulty: this.difficulty }); // eslint-disable-line no-console
            if (diff < minePeriod) {
                this.difficulty += 1;
            } else {
                this.difficulty -= 1;
            }
            this.chain.push(block)
            return this.chain;
        })
    }


}