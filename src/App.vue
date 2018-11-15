<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <pre>
{{blokCreate}}
    </pre>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Block from './components/Block.js'

export default {
  name: 'app',
  components: {
    HelloWorld
  },

    computed: {
        blokCreate: function () {
          return new Block(0, '15/11/2018', 'this important data', 'this is first ')
//            console.log( new Block(0, '15/11/2018', 'this important data', 'this is first ') )
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
