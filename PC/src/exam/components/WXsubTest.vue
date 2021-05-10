<template>
  <span>
    <a-dropdown :trigger="['click','hover']">
      <span>
        <span class="kong">_</span>
        <span class="kong"><span :class="[(showAnswerResult&&subtest.isError)?'wrongAnswer':'rightAnswer']">{{ answerShow }}</span></span>
        <span class="kong">_</span>
      </span>
      <a-menu slot="overlay">
        <a-menu-item v-for="(item,idx) in subtest.selectedItems" :key="'select'+idx" >
          <div @click="selectAnswer(item.ItemName,item.Content)">
            <a-radio v-if="item.ItemName===userReply" :checked="true" ></a-radio>
            <a-radio v-else-if="testType==='moniShowAnswer'" disabled></a-radio>
            <a-radio v-else ></a-radio>
            {{ item.Content }}
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </span>
</template>
<style lang="less" scope>
  .kong{
    color:#3e76f6;text-decoration:underline;
  }
  .rightAnswer{
    color:#3e76f6;
  }
  .wrongAnswer{
    color:red;text-decoration:line-through;
  }
</style>
<script>
import { mapMutations, mapState } from 'vuex'
// import storeAnswer from '../js/storeAnswer.js'
export default {
  props: {
    testNO: {
      type: Number,
      default: 0
    },
    subtestNo: {
      type: Number,
      default: 0
    },
    subtest: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      answerShow: '',
      userReply: '',
      showAnswerResult: false
    }
  },
  computed: {
    ...mapState({
      refreshTest: state => state.doExam.refreshTest,
      arrAllTest: state => state.doExam.arrAllTest,
      testType: state => state.doExam.testType
    })
  },
  created () {
    this.init()
  },
  mounted () {
    this.init()
  },

  watch: {
    refreshTest: function (nv, ov) {
      this.init()
    }
  },
  methods: {
    init () {
      this.answerShow = this.subtestNo + 1
      this.showAnswerResult = false
      this.userReply = ''

      // 要将用户答案拼上去
      if (this.subtest.userReply || this.testType === 'moniShowAnswer') {
        this.userReply = this.subtest.userReply
        for (let i = 0; i < this.subtest.selectedItems.length; i++) {
          if (this.subtest.selectedItems[i].ItemName === this.userReply) {
            this.answerShow = this.subtest.selectedItems[i].Content
          }
        }
      }
      // 大题有答案就显示对错
      if (this.arrAllTest[this.testNO - 1].userReply && this.testType !== 'moniTest') {
        this.showAnswerResult = true
      }
    },
    selectAnswer (answer, answerContent) {
      if (this.testType === 'moniShowAnswer') return
      this.userReply = answer
      this.answerShow = answerContent
      // 判断对错
      let isError = 0
      if (answer === this.subtest.answer) {
        isError = 0
      } else {
        isError = 1
      }
      // 把数据存在大数组结构上
      this.subtest.userReply = answer
      this.subtest.isError = isError
      // this.arrAllTest[this.currentTestNO - 1].WXsubTest.splice(this.subtestNo, 1, this.subtest)// 存到大数组

      // 拼一个提交答案需要的Object
      const submmitData = {
        allTestID: this.subtest.allTestID,
        userReply: answer,
        subTestID: this.subtest.subTestID,
        styleType: this.subtest.styleType,
        testNO: this.currentTestNO,
        score: this.subtest.score,
        isError: isError
      }
      // storeAnswer(submmitData)
      this.$emit('selectanswer')
    }
  }
}
</script>
