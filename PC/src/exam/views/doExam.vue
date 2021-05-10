<template>
  <!-- 考试界面 -->
  <div class="doexam">
    <div class="cover" v-if="loading">
      <a-spin/>
    </div>
    <div class="topBg">
      <img class="icon" src="@/imgs/logo.png" alt="">
    </div>
    <div class="mainCt">
      <div class="testTitle">{{ examInfo.ExamTitle }}</div>
      <topCt v-if="!loading" :testNum="testNum" :doneTest="doneTest" @timeout="EndTest"></topCt>
      <div class="testpart">
        <div class="left_test">
          <div class="test_Ct tb">
            <div class="swiper-container" style="height:100%;">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,idx) in testJSON" :key="idx+'test'+item.testNO">
                  <Atest
                    v-if="item.testType=='ATEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></Atest>
                  <Xtest
                    v-else-if="item.testType=='XTEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></Xtest>
                  <PDtest
                    v-else-if="item.testType=='PDTEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></PDtest>
                  <Atest
                    v-if="item.testType=='A3TEST' && item.subTestType == 'ATEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></Atest>
                  <Xtest
                    v-else-if="item.testType=='A3TEST' && item.subTestType == 'XTEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></Xtest>
                  <TKtest
                    v-else-if="item.testType=='TKTEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></TKtest>
                  <JDtest
                    v-else-if="item.testType=='JDTEST'"
                    :tdata="item"
                    :currentIndex="currentIndex"
                    :testNum="testNum"
                    @answer="AnswerSubmit"
                    @setflag="Setflag"
                    @next="goNext"
                    @submit="EndTest"></JDtest>
                </div>
              </div>
            </div>
          </div>
          <div class="btn_ct tb">
            <span @click="goPre" ><a-icon type="double-left" style="margin-right:10px;" />上一题</span>
            <span @click="goNext" style="float:right;">下一题<a-icon type="double-right" style="margin-left:10px;" /></span>
          </div>
        </div>
        <div class="right_ka tb">
          <tika
            v-if="!loading"
            :currentIndex="currentIndex"
            :currentuserReply="currentuserReply"
            :currentflag="currentflag"
            :arrAllTest="arrAllTest"
            @gotest="goTestNO"
            @submit="EndTest('tika')"></tika>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import Atest from '@/exam/components/Atest'
import Xtest from '@/exam/components/Xtest'
import PDtest from '@/exam/components/PDtest'
import TKtest from '@/exam/components/TKtest'
import JDtest from '@/exam/components/JDtest'
import tika from '@/exam/components/tika'
import topCt from '@/exam/components/processAndTime'
import { examinationNoLogin, answerExamTestNoLogin, submitExam } from '@/api/takeExam'
import { EXAMDATA, EXAMTIME } from '@/store/mutation-types'
import { testDataHandle } from '@/exam/js/testData'
import testData from '@/exam/js/data'
import { mapState, mapMutations } from 'vuex'
let mySwiper = null
export default {

  components: {
    Atest,
    Xtest,
    PDtest,
    TKtest,
    JDtest,
    tika,
    topCt
  },
  data: function () {
    return {
      currentIndex: 0, // 当前的试题ID
      currentuserReply: '', // 当前题的用户选项，用于刷新答题卡
      currentflag: 0, // 当前题的用户标记，用于刷新答题卡
      testJSON: [{}, {}, {}], // 取3题试题去显示的数组
      arrAllTest: [],
      testNum: 0,
      doneTest: 0,
      recordID: null,
      loading: true,
      examInfo: {
        ExamTitle: '测试数据'
      }
    }
  },
  computed: {
    // ...mapState(['examInfo'])
  },
  created: function () {
    const historyData = this.$ls.get(EXAMDATA)
    if (historyData) {
      /** 还原现场 */
      this.arrAllTest = historyData.arrAllTest
      this.testNum = historyData.testNum
      this.recordID = historyData.recordID
      this.storeExamInfo(historyData.examInfo)
      for (let i = 0; i < this.arrAllTest.length; i++) {
        if (this.arrAllTest[i].userReply) {
          this.doneTest = this.doneTest + 1
        }
      }
      setTimeout(() => {
        this.initSwiper(historyData.currentIndex)
        this.loading = false
      }, 200)
    } else {
      /** 本地数据测试 */
      this.arrAllTest = testDataHandle(testData.testData)
      this.testNum = this.arrAllTest.length
      this.recordID = testData.testData.recordID
      this.$ls.set(EXAMDATA, { arrAllTest: this.arrAllTest, testNum: this.testNum, recordID: this.recordID, currentIndex: 1, examInfo: { ExamTitle: '测试数据' } })// this.examInfo
      this.loading = false
      this.initSwiper(1)
      /** 本地数据测试end */
      // if (!this.examInfo.ExamID) {
      //   this.$warning({
      //     title: '提示',
      //     content: '试卷信息获取失败',
      //     onOk: () => {
      //       this.$router.replace('/exam')
      //     }
      //   })
      //   return
      // }
      // examinationNoLogin(this.examInfo.UserID, this.examInfo.ExamID, this.examInfo.Source).then(res => {
      //   this.arrAllTest = testDataHandle(res)
      //   this.testNum = this.arrAllTest.length
      //   this.recordID = res.recordID
      //   this.$ls.set(EXAMDATA, { arrAllTest: this.arrAllTest, testNum: this.testNum, recordID: this.recordID, currentIndex: 1, examInfo: this.examInfo })
      //   this.initSwiper(1)
      //   this.loading = false
      // }, err => {
      //   this.$warning({
      //     title: '提示',
      //     content: err.message,
      //     onOk: () => {
      //       this.$router.replace('/exam')
      //     }
      //   })
      // })
    }
  },
  mounted () {
    // const _self = this
    this.$nextTick(function () {
      this.loadSwiper()
    })
  },
  beforeDestroy () {
    // 页面关闭的时候提交试卷，用于手动判卷的结束
    submitExam(this.examInfo.UserID, this.recordID)
  },
  methods: {
    ...mapMutations(['storeExamInfo']),
    /** 提交答案 */
    AnswerSubmit (userReply) {
      if (!userReply) return
      const currentTest = this.getCurrentTest()
      if (!currentTest.userReply) {
        this.doneTest = this.doneTest + 1
      }
      currentTest.userReply = userReply
      this.currentuserReply = userReply
      this.$ls.set(EXAMDATA, { arrAllTest: this.arrAllTest, testNum: this.testNum, recordID: this.recordID, currentIndex: this.currentIndex, examInfo: this.examInfo })
      /** (userID, recordID, testID, childTableID, answer, score)提交答案 */
      answerExamTestNoLogin(this.examInfo.UserID, this.recordID, currentTest.allTestID, currentTest.subTestID, userReply, currentTest.score, this.examInfo.IsManul).then(res => {

      })
    },
    /** 标记此题 */
    Setflag (flag) {
      const currentTest = this.getCurrentTest()
      currentTest.flag = flag
      this.currentflag = flag
    },
    /** 取当前试题数据 */
    getCurrentTest () {
      // currentIndex 从1开始计数，取数据时需要减1
      return this.arrAllTest[this.currentIndex - 1]
    },
    goTestNO (testNO) {
      this.initSwiper(testNO)
    },
    goNext () {
      if (this.currentIndex === this.arrAllTest.length) return
      mySwiper.slideNext()
    },
    goPre () {
      if (this.currentIndex === 1) return
      mySwiper.slidePrev()
    },
    EndTest (type) {
      const self = this
      switch (type) {
        case 'tika':
          let noAnswer = 0
          for (let i = 0; i < this.arrAllTest.length; i++) {
            if (!this.arrAllTest[i].userReply) {
              noAnswer++
            }
          }
          if (noAnswer) {
            this.$confirm({
              title: '提示',
              content: '您还有' + noAnswer + '题未答，确定提交试卷吗？',
              onOk () {
                self.goResult()
              },
              onCancel () {}
            })
          } else {
            this.goResult()
          }
          break
        default:
          this.$confirm({
            title: '提示',
            content: '已是最后一题，确定提交试卷吗？',
            onOk () {
              self.goResult()
            },
            onCancel () {}
          })
          break
      }
    },
    goResult () {
      this.$message.info('考试结束!')
      submitExam(this.examInfo.UserID, this.recordID)
      this.$ls.remove(EXAMDATA)
      this.$ls.remove(EXAMTIME)
      // 去结果页
      this.$router.replace('/exam/result')
    },
    /** ***********滑动块代码**************/
    loadSwiper () {
      const _self = this
      // 所有的组件都被加载完
      mySwiper = new Swiper('.swiper-container', {
        threshold: 50,
        on: {
          slideNextTransitionEnd: function () {
            _self.currentIndex++
            if (_self.currentIndex > _self.testNum) {
              _self.currentIndex = _self.testNum
            }
            _self.initSwiper(_self.currentIndex)
            // console.log('slideNextTransitionEnd', _self.currentIndex)
          },
          slidePrevTransitionEnd: function () {
            _self.currentIndex--
            if (_self.currentIndex < 1) {
              _self.currentIndex = 1
            }
            _self.initSwiper(_self.currentIndex)
            // console.log('slideNextTransitionEnd', _self.currentIndex)
          }
        }
      })
    },
    /**
     * 初始化3个显示的swiper，一次只加载3道题
     */
    initSwiper (index) {
      // console.log('initSwiper', index)
      this.currentIndex = index
      // _self.storeCurenIndex(_self.currentIndex)
      // _self.processWidth = (index / _self.testNum) * 100
      if (this.testNum <= 3) {
        this.testJSON = this.arrAllTest
      } else if (index === 1) {
        this.testJSON = this.arrAllTest.slice(0, 3)
      } else if (index === this.testNum) {
        this.testJSON = this.arrAllTest.slice(index - 3, index)
      } else {
        this.testJSON = this.arrAllTest.slice(index - 2, index + 1)
      }

      const dragIndex = this.getDragIndexByTestIndex() // 获取当前滑块索引
      if (mySwiper) {
        mySwiper.slideTo(dragIndex, 0, false)
        window.scrollTo(0, 0)
      }
    },
    /**
     * 获取滑动块的当前块，滑块索引[0,1,2],
     * 重新加载3个滑块时一般情况当前块是中间那个,索引为1，
     * 第一个和最后一个有点特殊
     * 第一个加载前3个试题，滑块索引是0
     * 最后一个加载最后3道试题，滑块索引是2
     */
    getDragIndexByTestIndex () {
      const _self = this
      let dragIndex = 0
      var dragCount = _self.testNum < 3 ? _self.testNum : 3
      if (_self.currentIndex === 1) {
        dragIndex = 0
      } else if (_self.currentIndex === _self.testNum) {
        dragIndex = dragCount - 1
      } else {
        dragIndex = 1
      }
      return dragIndex
    }
    /** ***********滑动块代码end**************/
  }
}
</script>

<style lang="less" scoped>
.swiper-slide{
  overflow-y: auto;
}
.cover{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 22%;
  text-align: center;
  background-color: #cccccc5d;
  z-index: 666;
}
.testpart{
  // display: flex;
  margin-top: 10px;
}
.testpart>.left_test{
  width: 78%;
  margin-right: 1%;
  float: left;
}
.tb{
  border: 1px solid #bbb;
  border-radius: 3px;
}
.testpart>.left_test>.test_Ct{
  height: 63vh;
  margin-bottom: 1vh;
  overflow-y: auto;
}
.testpart>.left_test>.btn_ct{
  height: 6vh;
  line-height: 6vh;
  margin-top: 1vh;
  padding: 0 35px;
}
.testpart>.right_ka{
  width: 20%;
  // height: 70vh;
  float: right;
  overflow: hidden;
}

.testTitle{
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  padding: 15px 0;
}

.topBg{
  position: fixed;
  top: 0;
  width: 100%;
  height: 30vh;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fe9007), color-stop(100%, #feb50d));
}
.icon{
  height: 50px;
  margin: 15px;
}
.mainCt{
  position: absolute;
  left: 3vw;
  top: 10vh;
  height: 90vh;
  width: 93vw;
  padding: 0 3vw;
  background-color: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 8px 8px 0 0;
  box-shadow: 1px 2px 2px #f2f2f2,-1px 2px 2px #f2f2f2;
  overflow: hidden;

}

</style>
