import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    examInfo: {
      examCode: null,
      ExamID: null,
      UserID: null,
      hasDo: null,
      Source: null,
      ExamTitle: '',
      examTime: null,
      IsManul: null
    }
  },
  mutations: {
    storeExamInfo (state, data = {}) {
      for (const [key, val] of Object.entries(data)) {
        if (state.examInfo.hasOwnProperty(key)) { state.examInfo[key] = val }
      }
    }
  },
  actions: {
  }
})
