<template>
    <div>
        <Hero/>

        <div class="container">
            <div class="row">
                <br>
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
                <br>
                <div class="text-center">

<pre>
    {{blockChain.chain[0].from }}

</pre>

                          <b-table stacked="md"
                                   show-empty
                                   v-if="blockChain.chain"
                                   :items="blockChain.chain"

                          >

                              <template slot="transactions"
                                        slot-scope="row">
                                  <b-row class="mb-2">
                                      <b-col sm="3" class="text-sm-right"><b> From:</b></b-col>
                                      <b-col>{{row.value[0].from}}</b-col>
                                  </b-row>
                                  <b-row class="mb-2">
                                      <b-col sm="3" class="text-sm-right"><b> To:</b></b-col>
                                      <b-col>{{row.value[0].to}}</b-col>
                                  </b-row>
                                  <b-row class="mb-2">
                                      <b-col sm="3" class="text-sm-right"><b> Amount:</b></b-col>
                                      <b-col>{{row.value[0].amount}}</b-col>
                                  </b-row>


                              </template>
                              <template slot="show_details" slot-scope="row">
                                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
       {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                                </b-button>
                              </template>



                              <template slot="row-details" slot-scope="row">
                                  <b-card>
                                      <b-table class="col-md-12" striped hover
                                               v-if="row.transactions"
                                               :items="row.transactions"
                                      >
                                      </b-table>
                                      <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                                  </b-card>
                              </template>
                          </b-table>





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
