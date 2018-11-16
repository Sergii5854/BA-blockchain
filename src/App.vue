<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <pre>
        {{blokCreate}}
        {{testChain}}
<!--<button v-on:click="testChain">testChain</button>-->
    </pre>

        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Block from './components/Block'
    import Chain from './components/Chain'
    import Transaction from './components/Transaction'

    export default {
        name: 'app',
        components: {
            HelloWorld
        },


        computed: {
            blokCreate: function () {
                return new Block(0, '15/11/2018', 'this important data', 'this is first ')
            },
            testChain: function () {
                let blockChain = new Chain()
                blockChain.addBlock(new Block(1, '15/11/2018', 'this important data 1', 'this is second '))
                blockChain.addBlock(new Block(2, '15/11/2018', 'this important data 2', 'this is 3 '))
//                return JSON.stringify(blockChain, null, 2)
                return blockChain
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
