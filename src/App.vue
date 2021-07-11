<template>
  <div class="btn-box">
    <button @click="html2canvasExport">html2canvas</button>
  </div>
  <div id="box">
    <img
      alt="Vue logo"
      src="https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2307925690,3567173506&fm=58"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import html2canvas from 'html2canvas'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    html2canvasExport() {
      html2canvas(document.getElementById('box'), {
        allowTaint: false,
        scale: 5
      }).then(function(canvas) {
        document.body.appendChild(canvas)
        console.log(canvas.toDataURL())
      })
    }
  }
}
</script>

<style>
.btn-box {
  display: flex;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
