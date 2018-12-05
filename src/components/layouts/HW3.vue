<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1 class="">WEbRTC TURN </h1>

                <c-node
                        :wallet="myWallet"
                        :chain="chain"
                        @mine="onMine">
                </c-node>

            </div>
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
            onMine() {

            }
        }

    }


</script>

<style scoped>

</style>
