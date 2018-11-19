<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
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
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import EC from 'elliptic/lib/elliptic/ec';

    import HelloWorld from './components/HelloWorld.vue'
    import Block from './models/Block'
    import Chain from './models/Chain'
    import Transaction from './models/Transaction'
    import KeyGenerator from './utils/keyGenerator'
    import {randomIntFromInterval, randomNumericString} from './utils/random'

    Vue.use(BootstrapVue);

    export default {
        name: 'app',
        data() {
            return {
                blockChain: new Chain(),
                index: 0,
                myKey: this.getMyKey(),
                myWalletAddress: this.getMyWalletAddress()
            }
        },
        components: {
            HelloWorld
        },
        methods: {
            getMyKey() {
                const ec = new EC('secp256k1');
                console.log(ec.keyFromPrivate('47c38c05301db390963a0807f1ae35db3248147a0abffa20f0a12ab8cdd46e15'));
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

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
