<template>
    <div class="container">
        <div class="row">

            <h1 class="col-md-12">WEbRTC TURN </h1>
            <h3><a href="/hw3" target="_blank">Click here </a> To open new tab in browser and create WebRTC connection  </h3>
            <hr>
            <br>
            <p v-for="(wallet, index) in wallets" :key="index" class="wallet">
                Wallet : {{wallet.getPublic('hex')}}
            </p>

            <hr>
            <br>
            <p class="difficulty" >Difficulty: {{ chain.difficulty }}</p>
            <c-node
                    :wallet="myWallet"
                    :chain="chain"
                    @mine="onMine">
            </c-node>


        </div>
    </div>
</template>

<script>
    import Chain from "./../../models/Chain"
    import EC from "elliptic/lib/elliptic/ec"
    import Node from './../../components/Node'

    const ec = new EC("secp256k1")

    export default {
        name: 'HW3',
        components: {
            "c-node": Node,

        },
        data() {
            return {
                myWallet: {},
                wallets: [],
                chain: {},

            }
        },
        created() {
            this.chain = new Chain();
            this.generateWallet();
            this.generateWallet();
        },
        methods: {
            generateWallet() {
                const keyPair = ec.genKeyPair()
                this.wallets.push(keyPair);
            },
            onMine(){

            }
        }

    }


</script>

<style scoped>

</style>
