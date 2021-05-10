import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueStorage from 'vue-ls'
import vueCookie from 'vue-cookie'
import antV from './utils/antV.js'
import './plugins/ant-design-vue.js'
import './permission'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(antV)

Vue.use(vueStorage, {
  namespace: 'stsq__',
  name: 'ls',
  storage: 'local'
})
Vue.use(vueCookie)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
