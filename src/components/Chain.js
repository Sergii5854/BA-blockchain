import Block from "./Block"

export default class Chain {

    constructor() {
        this.chain = [... this.createGenesisBlock()]

    }

    createGenesisBlock(){
        return new Block(0, '15/11/2018', 'this important data', 'this is first ')
    }

    getLastBlok(){
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlok().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }


}