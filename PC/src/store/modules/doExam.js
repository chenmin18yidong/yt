const doExam = {
  state: {
    currentTestNO: 0, // 当前试题索引，从1开始计数,初始值是0，通过改变这个值来改变试题
    arrAllTest: [], // 试卷整理好的整个试题数组
    testNum: 0, // 试题总数
    testType: '', // 做题模式 ----> 练习: ''，考试: 'moniTest'，回顾: 'moniShowAnser'

    refreshTest: true, //  true/false 监听refreshTest是否改变，改变则刷新试题组件

    timeStart: 0, // 开始做当前小题时间（跳转小题时刷新）记录做题时间
    isReply: 0 //  是否答过题，埋点用  1:第一次答题，0：不是第一次答题 只有普通模式记录
  },
  mutations: {
    storeArrTest: function (state, hd) {
      state.arrAllTest = hd
    },
    storeCurenIndex: function (state, curenIndex = 1) {
      state.currentTestNO = curenIndex
    },
    storeTestNum: function (state, testNum = 0) {
      state.testNum = testNum
    },
    storeTestType: function (state, testType) {
      state.testType = testType
    },

    refreshTestComp: function (state) {
      state.refreshTest = !state.refreshTest
    },
    storeTimeStart: function (state, time) {
      state.timeStart = time
    },
    storeIsReply: function (state, isReply) {
      state.isReply = isReply
    }
  },
  actions: {
  }
}
export default doExam
