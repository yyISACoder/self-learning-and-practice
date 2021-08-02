<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div style="border: 1px solid black;padding: 10px;margin-bottom: 20px">
      <router-link to='/' style="margin-right: 20px">主页</router-link>
      <router-link to='/micro-app'>微应用</router-link>
    </div>
    <router-view v-show="routeName"></router-view>
    <div
      v-show="!routeName"
      id="container"
      style="border: 1px solid green;padding: 10px;">
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  computed: {
    routeName() {
      // eslint-disable-next-line no-debugger
      return this.$route.name
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
