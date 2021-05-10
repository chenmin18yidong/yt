import Vue from 'vue'
import App from './exam.vue'
import router from './router'
import store from './store'
import vueStorage from 'vue-ls'
import vueCookie from 'vue-cookie'
import '../plugins/ant-design-vue.js'
// import './permission'

Vue.config.productionTip = false

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
}).$mount('#exam')
