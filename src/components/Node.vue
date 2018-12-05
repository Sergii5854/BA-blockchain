<template>
    <div>
        <br>
        <div class="connect">
            <div class="connect--true connect-indicator connect-indicator-true" v-if="isConnect">
                Connect
            </div>
            <div class="connect--false " v-else>
                <h2>WebRTC Connect Section</h2>
                <h3>  <router-link class="nav-link" to="/hw3" target="_blank">Click here</router-link>
                    To open new tab in browser and create WebRTC connection  </h3>
                <hr>
                <div class="connect-indicator connect-indicator-false">
                    NOT Connect
                </div>
                <div class="offer" v-if="isOffer">
                    <h3>Please, copy this OFFER and past in opening tab</h3>
                    <textarea name="offer" rows="4">{{offer}}</textarea>
                </div>
                <div class="answer" v-if="isAnswer">
                    <h3>Please, copy this ANSWER and past in previous tab</h3>
                    <textarea name="answer" rows="4">{{answer}}</textarea>
                </div>
                <form
                        ref="peerForm"
                        :model="peerForm">
                    <h3 v-if="isOffer">Please, Insert here answer </h3>
                    <h3 v-else>Please, Insert here offer </h3>
                    <textarea
                            size="sm" type="text"
                            v-model="peerForm.inner"
                    />


                    <button :disabled="isMining" type="primary" @click.prevent="submitPeerForm('peerForm')">
                        Submit
                    </button>
                    <button @click.prevent="resetForm('peerForm')">
                        Reset
                    </button>
                </form>
            </div>
        </div>


        <div v-show="isConnect">
            <h2>WebRTC Transaction Section</h2>


            <button @click="addTx"
                    class="btn btn-md btn-success">Add Transition
            </button>


            <div class="text-left" >
                <pre>
                    {{chain }}
                </pre>

                <!--<b-table stacked="md"-->
                         <!--show-empty-->
                         <!--:items="chain"-->
                <!--&gt;-->

                    <!--<template slot="transactions"-->
                              <!--slot-scope="row">-->
                        <!--<b-row class="mb-2">-->
                            <!--<b-col sm="3" class="text-sm-right"><b> From:</b></b-col>-->
                            <!--<b-col v-if="row.value[0].from">{{row.value[0].from}}</b-col>-->
                            <!--<b-col v-else>0</b-col>-->
                        <!--</b-row>-->
                        <!--<b-row class="mb-2">-->
                            <!--<b-col sm="3" class="text-sm-right"><b> To:</b></b-col>-->
                            <!--<b-col>{{row.value[0].to}}</b-col>-->
                        <!--</b-row>-->
                        <!--<b-row class="mb-2">-->
                            <!--<b-col sm="3" class="text-sm-right"><b> Amount:</b></b-col>-->
                            <!--<b-col>{{row.value[0].amount}}</b-col>-->
                        <!--</b-row>-->


                    <!--</template>-->
                    <!--<template slot="show_details" slot-scope="row">-->
                        <!--<b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">-->
                            <!--{{ row.detailsShowing ? 'Hide' : 'Show'}} Details-->
                        <!--</b-button>-->
                    <!--</template>-->


                    <!--<template slot="row-details" slot-scope="row">-->
                        <!--<b-card>-->
                            <!--<b-table class="col-md-12" striped hover-->
                                     <!--v-if="row.transactions"-->
                                     <!--:items="row.transactions"-->
                            <!--&gt;-->
                            <!--</b-table>-->
                            <!--<b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>-->
                        <!--</b-card>-->
                    <!--</template>-->
                <!--</b-table>-->


            </div>
        </div>

    </div>

</template>

<script>
    import Node from './../models/Node'
    import Peer from 'simple-peer'
    import Transaction from './../models/Transaction'

    import Block from './../models/Block'
    import Chain from './../models/Chain'

    import EC from 'elliptic/lib/elliptic/ec';
    import {randomIntFromInterval, randomNumericString} from './../utils/random'

    export default {
        name: 'Node',
        props: {
            chain: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                wordState: {},
                peer: {},
                node: {},
                isMining: false,
                isConnect: false,
                isOffer: false,
                offer: {},
                isAnswer: false,
                answer: {},
                myKey: this.getMyKey(),
                myWalletAddress: this.getMyWalletAddress(),
                peerForm: {
                    inner: ''
                }
            }
        },
        created() {
            this.node = new Node(this.chain)
            this.transactionForm = this.node.publicKey()

            this.initPeer()

        },
        methods: {
            initPeer() {
                this.peer = new Peer({initiator: location.hash === '#mainTURN', trickle: false})
                this.peer.on('error', this.onPeerError)
                this.peer.on('signal', this.onPeerSignal)
                // this.peer.signal('hey!')
                this.peer.on('connect', this.onPeerConnect)
                this.peer.on('data', this.onPeerData)
            },
            onPeerError(err) {
                console.log('peer error', err)  // eslint-disable-line no-console
            },
            onPeerSignal(data) {
                let signal = JSON.stringify(data)
                if (data.type === 'offer') {
                    this.isOffer = true
                    this.offer = signal
                }
                if (data.type === 'answer') {
                    this.isAnswer = true
                    this.answer = signal
                }
                console.log('SIGNAL', signal)  // eslint-disable-line no-console
            },
            onPeerConnect() {
                this.isConnect = true
                console.log('CONNECT')  // eslint-disable-line no-console
            },
            onPeerData(data) {
                console.log('data: ' + data)  // eslint-disable-line no-console
                let transaction = new Transaction(
                    JSON.parse(data)
                );
                this.isMining = true
                this.node.chain.mineBlock([transaction]).then(blocks => {
                    console.log('blocks', blocks) // eslint-disable-line no-console
                    this.isMining = false
                    this.updateWorldState(blocks[blocks.length - 1])
                })
            },
            updateWorldState(block) {
                console.log('block', block) // eslint-disable-line no-console
                let transactions = block.transactions
                console.log(block.transactions) // eslint-disable-line no-console
                for (let i = 0; i < transactions.length; i++) {
                    console.log(transactions[i]) // eslint-disable-line no-console
                    let {from, to, amount} = transactions[i]
                    if (this.worldState[from]) {
                        this.worldState[from] -= amount
                    } else {
                        this.worldState[from] = -amount
                    }
                    if (this.worldState[to]) {
                        this.worldState[to] += amount
                    } else {
                        this.worldState[to] = +amount
                    }
                }
            },
            getMyKey() {
                const ec = new EC('secp256k1');

                return ec.keyFromPrivate('043858f05681eb5ab8b5e01e3714a2f930b60338733824211a…cdf136a69e838cf980208a69f36ca2be8e8b7260edb6daff6')

            },
            getMyWalletAddress() {

                return this.getMyKey().getPublic('hex')
            },
            addTx() {
                this.isMining = true

                let to = randomNumericString()
                let amount = randomIntFromInterval(0, 100)

                let transaction = new Transaction(this.myWalletAddress, to, amount)
//                let transaction = new Transaction( JSON.parse(JSON.stringify(this.transactionForm) ))


                transaction.sign(this.myKey).then(() => {

                    this.peer.send(JSON.stringify(transaction))

                    this.node.chain.mineBlock([transaction]).then(blocks => {
                        console.log('blocks', blocks) // eslint-disable-line no-console
                        this.isMining = false
                        this.updateWorldState(blocks[blocks.length - 1])
                    })
                }).catch(error => {
                    console.log('submit', error) // eslint-disable-line no-console
                    this.isMining = false
//                    this.$message.error(error)
                });
            },
            submitPeerForm(formName) {
                this.peer.signal(JSON.parse(this.peerForm.inner))
                console.log("error submit!!"); // eslint-disable-line no-console

            }

        }

    }


</script>

<style scoped>
    .connect {
        display: block;
        width: 100%;
        height: auto;
    }

    .connect-indicator {
        text-align: right;
    }

    .connect-indicator-true {
        color: green;
    }

    .connect-indicator-false {
        color: red;
    }

    textarea {
        width: 100%;
        font-size: 10px;
    }


</style>
