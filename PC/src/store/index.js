import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import doExam from './modules/doExam'
import makeup from './modules/makeup'
import testAdd from './modules/testAdd'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    doExam,
    makeup,
    testAdd
  }
})
