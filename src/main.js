import Vue from 'vue'
import App from './App'
import router from './router'
// import { PopupPicker } from 'vux'


import objectAssign from 'object-assign'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'




Vue.config.productionTip = false


Vue.use(Vuex)
require('es6-promise').polyfill()

/** i18n **/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)


// const vuxLocales = require('json-loader!yaml-loader!./locales/all.yml')
// const componentsLocales = require('json-loader!yaml-loader!./locales/components.yml')
 
const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}
 
for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}
 
// import { 
  // DevicePlugin, 
  // ToastPlugin, 
  // LocalePlugin, 
  // AlertPlugin, 
  // ConfirmPlugin, 
  // LoadingPlugin, 
  // WechatPlugin 
// } from 'vux'
 
Vue.use(LocalePlugin)
const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

// plugins
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
// Vue.use(DevicePlugin)
// Vue.use(ToastPlugin)
// Vue.use(AlertPlugin)
// Vue.use(ConfirmPlugin)
// Vue.use(LoadingPlugin)
// Vue.use(WechatPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})



