import './public-path'
import Vue from 'vue'
import Home from './home.vue'
import App from './App.vue'
import VueRouter from "vue-router"
import { registerMicroApps, start } from 'qiankun'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      /**
       * path: 路径为 / 时触发该路由规则
       * name: 路由的 name 为 Home
       * component: 触发路由时加载 `Home` 组件
       */
      path: "/",
      name: "Home",
      component: Home,
    },
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#root')


registerMicroApps([
  {
    name: 'microApp',
    entry: 'http://carlblog.site/test/',
    container: '#container',
    activeRule: '/micro-app',
  }
])
// 启动 qiankun
start()