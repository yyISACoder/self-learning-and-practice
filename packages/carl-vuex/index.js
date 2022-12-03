//参考资料：https://juejin.cn/post/6855474001838342151
import Vue from 'vue'

class Store {
  constructor(opt) {
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    this.vm = new Vue({
      data: opt.state
    })

    const getters = opt.getters || {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get() {
          return getters[key](this.state)
        }
      })
    })

    const mutations = opt.mutations || {}
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = paylod => {
        mutations[key](this.vm, paylod)
      }
    })

    const actions = opt.actions || {}
    Object.keys(actions).forEach(key => {
      this.actions[key] = paylod => {
        actions[key](this, paylod)
      }
    })
  }
  get state() {
    return this.vm
  }
  dispatch(actionName, payload) {
    this.actions[actionName](payload)
  }
  commit = (mutationName, paylod) => {
    this.mutations[mutationName](paylod)
  }
}

const install = Vue => {
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent ? this.$parent.$store : {}
      }
    }
  })
}

export default {
  Store,
  install
}
