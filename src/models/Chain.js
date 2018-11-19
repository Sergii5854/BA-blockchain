import Block from "./Block"
import Transaction from "./Transaction";

export default class Chain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 1;

    }

    createGenesisBlock(){
        return new Block( '15/11/2018', 'this important data GenesisBlock', '0')
    }

    getLastBlock(){
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash
        // newBlock.hash = newBlock.calculateHash()
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    mineTransaction(mineRewardAddress) {

        let rewardTransaction = new Transaction(null, mineRewardAddress, this.miningReward)
        this.pendingTransactions.push( this.pendingTransactions )

        let block = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().hash)
        block.mineBlock(this.difficulty)

        console.log("block successfully mined");

        this.pendingTransactions = []

    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction )
    }


    isValid(){
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }
        return true
    }


}