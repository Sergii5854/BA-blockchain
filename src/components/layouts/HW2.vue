<template>
    <div>
        <Hero/>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h2>Without signature</h2>
                    <b-button @click="addTransition"
                              class="btn btn-md btn-success">Add Transition
                    </b-button>


                </div>

                <div class="col-sm-6">
                    <h2>With signature</h2>
                    <button @click="addTx"
                            class="btn btn-md btn-success">Add Transition
                    </button>
                </div>
                <div class="text-center">
                    <pre class="row">
                        {{blockChain}}

                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import EC from 'elliptic/lib/elliptic/ec';
    import Hero from './../hero.vue'
    import Block from './../../models/Block'
    import Chain from './../../models/Chain'
    import Transaction from './../../models/Transaction'
//    import KeyGenerator from './../../utils/keyGenerator'
    import {randomIntFromInterval, randomNumericString} from './../../utils/random'


    export default {
        name: 'HW2',
        data() {
            return {
                blockChain: new Chain(),
                index: 0,
                myKey: this.getMyKey(),
                myWalletAddress: this.getMyWalletAddress()
            }
        },
        components: {
            Hero
        },
        methods: {
            getMyKey() {
                const ec = new EC('secp256k1');
//                console.log(ec.keyFromPrivate('47c38c05301db390963a0807f1ae35db3248147a0abffa20f0a12ab8cdd46e15'));
                return ec.keyFromPrivate('47c38c05301db390963a0807f1ae35db3248147a0abffa20f0a12ab8cdd46e15')

            },
            getMyWalletAddress() {

                return this.getMyKey().getPublic('hex')
            },

            addTransition() {
                let from = randomNumericString()
                let to = randomNumericString()
                let amount = randomIntFromInterval(0, 100)
                let date = new Date()
                let transaction = new Transaction(from, to, amount)
                let block = new Block(++this.index, date, transaction)
                this.addBlock2Chain(block)
            },
            addBlock2Chain(block) {
                this.blockChain.addBlock(block)
            },
            addTx() {
                let to = randomNumericString()
                let amount = randomIntFromInterval(0, 100)
                let transaction1 = new Transaction(this.myWalletAddress, to, amount)
                transaction1.signTransaction(this.myKey)
                this.blockChain.addTransaction(transaction1)
                this.blockChain.mineTransaction(this.myWalletAddress)

            }


        }
    }
</script>

<style scoped>

</style>
