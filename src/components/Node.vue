<template>
    <div>

    </div>
</template>

<script>
    import Node from './../models/Node'
    import Peer from 'simple-peer'
    import Transaction from './../models/Transaction'

    export default {
        name: 'Node',
        props: {
            chain:{
                type: Object,
                required: true,
            }
        },
        data() {
            return{
                wordState: {},
                peer: {},
                node: {},
                isMining: false,
                transactionForm:{
                    from: "",
                    to: "",
                    amount: 0
                },
                peerForm:{
                    inner:''
                }
            }
        },
        created(){
            this.node = new Node( this.chain )
            this.transactionForm = this.node.publicKey()
            this.initPeer()

        },
        methods:{
            initPeer() {
                this.peer = new Peer({ initiator: location.hash === '#mainTURN', trickle: false })
                this.peer.on('error', this.onPeerError)
                this.peer.on('signal', this.onPeerSignal)
                // this.peer.signal('hey!')
                this.peer.on('connect', this.onPeerConnect)
                this.peer.on('data', this.onPeerData)
            },
        }

    }


</script>

<style scoped>

</style>
