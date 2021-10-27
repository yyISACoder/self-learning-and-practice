<template>
  <div class="btn-box">
    <button @click="html2canvasExport">html2canvas</button>
    <button @click="canvgExport">canvg</button>
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
import Canvg from 'canvg'

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
    },
    async canvgExport() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      //通过from来启动canvg引擎
      const v = await Canvg.fromString(ctx, `<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <g> 
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">马</text>
    <animateTransform attributeName="transform" begin="0s" dur="10s" type="rotate" from="0 160 160" to="360 160 160" repeatCount="indefinite"/>
  </g>
</svg>`);

      // Start SVG rendering with animations and mouse handling.
      v.start();
      document.body.appendChild(canvas)
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
