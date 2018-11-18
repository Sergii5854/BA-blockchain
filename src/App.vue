<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <pre>
        {{blockChain}}

         </pre>
        <button @click="addTransition">Add Transition</button>

        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Block from './models/Block'
    import Chain from './models/Chain'
    import Transaction from './models/Transaction'
    import {randomIntFromInterval, randomNumericString } from './utils/random'

    export default {
        name: 'app',
        data() {
            return {
                blockChain: new Chain(),
                index: 0
            }
        },
        components: {
            HelloWorld
        },
        methods: {
            addTransition() {
                let from  = randomNumericString()
                let to  = randomNumericString()
                let amount  = randomIntFromInterval(0,100)
                let date = new Date()
                let transaction = new Transaction(from, to, amount)
                let block = new Block(++this.index, date, transaction )
                this.addBlock2Chain(block)
            },
            addBlock2Chain(block){
                this.blockChain.addBlock(block)
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
