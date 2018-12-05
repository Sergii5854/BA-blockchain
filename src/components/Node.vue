<template>
    <div>
        <div class="connect">
            <div class="connect--true" v-if="isConnect">
                Connect
            </div>
            <div class="connect--false" v-else>
                NOT Connect
            </div>
        </div>

        <form
                ref="peerForm"

                :model="peerForm">

            <textarea
                    size="sm" type="text"
                    v-model="peerForm.inner"
            />


            <button :disabled="isMining" type="primary" @click.prevent="submitPeerForm('peerForm')">
                Submit
            </button>
            <button @click="resetForm('peerForm')">
                Reset
            </button>
        </form>


        <form
                ref="transactionForm"
                :model="transactionForm"
        >
            <input
                    size="sm" type="text"
                    v-model="transactionForm.from"
                    placeholder="from">
            <input
                    size="sm" type="text"
                    v-model="transactionForm.to"
                    placeholder="to">
            <input
                    size="sm" type="text"
                    v-model="transactionForm.amount"
                    placeholder="amount">

            <button :disabled="isMining" type="primary" @click.prevent="submitForm('transactionForm')">
                Submit
            </button>
            <button @click="resetForm('transactionForm')">
                Reset
            </button>
        </form>


    </div>
</template>

<script>
    import Node from './../models/Node'
    import Peer from 'simple-peer'
    import Transaction from './../models/Transaction'

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
                transactionForm: {
                    from: "",
                    to: "",
                    amount: 0
                },
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
                console.log('SIGNAL', JSON.stringify(data))  // eslint-disable-line no-console
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
                console.log(block) // eslint-disable-line no-console
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
            submitForm(formName) {
                this.isMining = true
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let transaction = new Transaction(
                            JSON.parse(JSON.stringify(this.transactionForm))
                        );
                        transaction.sign(this.node.wallet()).then(() => {
                            this.peer.send(JSON.stringify(transaction))
                            this.node.chain.mineBlock([transaction]).then(blocks => {
                                console.log('blocks', blocks) // eslint-disable-line no-console
                                this.isMining = false
                                this.updateWorldState(blocks[blocks.length - 1])
                            })
                        }).catch(error => {
                            console.log('submit', error) // eslint-disable-line no-console
                            this.isMining = false
                            this.$message.error(error)
                        });
                    } else {
                        console.log("error submit!!"); // eslint-disable-line no-console
                        return false;
                    }
                })
            },
            submitPeerForm(formName) {
                this.peer.signal(JSON.parse(this.peerForm.inner))
                console.log("error submit!!"); // eslint-disable-line no-console
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.peer.signal(JSON.parse(this.peerForm.inner))
                        console.log("error submit!!"); // eslint-disable-line no-console
                    } else {
                        console.log("error submit!!"); // eslint-disable-line no-console
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        }

    }


</script>

<style scoped>
    .connect{
        display: block;
        width:100%;
        height: auto;
        text-align: right;

    }
    .connect--true{
        color: green;
    }
    .connect--false{
        color: red;
    }


</style>
