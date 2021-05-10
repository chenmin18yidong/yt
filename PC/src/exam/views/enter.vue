<template>
  <!-- 考试入口 -->
  <div class="enter">
    <div class="top">
      <comHeader activePage="exam" headerBg="whiteBg" from="exam"></comHeader>
    </div>

    <div class="enterExam">
      <div class="eX center_Ct">
        <div class="text_ct">
          <p>进入考试</p>
          如果获得了考试码，请在下面的框中输入考试码进入考试。
          <div class="input_ct">
            <input type="text" v-model="examCode" placeholder="请输入考试码">
            <div class="enter_btn" @click="getexamInfo">进入考试</div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkScore">
      <div class="cS center_Ct">
        <div class="text_ct">
          <p>查询成绩</p>
          考试结束可使用考试码查询考试成绩（考试口令与查询口令一致）。
          <div class="input_ct">
            <input type="text" v-model="scoreCode" placeholder="请输入考试码">
            <div class="enter_btn" @click="goTestResult">查询成绩</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="notice">
      注意事项：<br>
      <p> 1、请使用IE9及以上版本、Chrome、Sogou、Firefox、Safari、QQ浏览器、360浏览器。<br>
        Sogou、360浏览器需要极速模式，不能使用兼容模式。如果再遇到异常可以换以上其中一个浏览器再试。</p>
      <p>2、在规定时间内需答完所有题目，考试结束时，无论是否答完系统都将自动交卷。</p>
      <p>3、在正式考试之前请关闭弹窗应用如QQ、微信、其他浏览器等，答题中不能访问考试窗口之外的区域。如果有窗口意外弹出请立即关闭。</p>
      <p>4、如果答题过程中因电源、网络故障等造成中断，请在X分钟之内再次按照相同的步骤进入考试，从中断处继续答题。</p>
      <div style="margin-top:50px;">
        <a href="" >常见问题?</a>
      </div>
    </div> -->
    <div class="footer">
      <comBottom></comBottom>
    </div>
  </div>
</template>
<script>
import header from '@/components/header'
import bottom from '@/components/bottom'
import { examInfoByApply } from '@/api/takeExam'
import { mapMutations } from 'vuex'
export default {
  components: {
    comHeader: header,
    comBottom: bottom
  },
  data: function () {
    return {
      examCode: '',
      scoreCode: ''
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  methods: {
    ...mapMutations(['storeExamInfo']),
    getexamInfo () {
      if (!this.examCode) {
        return
      }
      examInfoByApply(this.examCode).then(res => {
        if (!res.ExamID && !res.UserID) {
          this.$warning({
            title: '提示',
            content: '考试码错误，请检查是否输入错误！'
          })
          return
        }
        this.storeExamInfo(res)
        this.storeExamInfo({ examCode: this.examCode })
        this.$router.push('/exam/testInfo')
      })
    },
    goTestResult () {
      if (!this.scoreCode) {
        return
      }
      examInfoByApply(this.scoreCode).then(res => {
        if (!res.ExamID && !res.UserID) {
          this.$warning({
            title: '提示',
            content: '考试码错误，请检查是否输入错误！'
          })
          return
        }
        this.storeExamInfo(res)
        this.storeExamInfo({ examCode: this.scoreCode })
        if (res.hasDo) {
          this.$router.push('/exam/result')
        } else {
          this.$warning({
            title: '提示',
            content: '您尚未参加考试，请先参加考试再查看成绩。',
            onOk: () => {
              this.$router.push('/exam/testInfo')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.enter{
  height: 100vh;
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
}
.notice{
  padding: 30px 20vw;
}

.top{
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  overflow: hidden;
  flex-shrink: 0;
}
.enterExam,.checkScore{
  height: 50%;
  min-height: 225px;
  overflow: hidden;
}
.enterExam{
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff8e6e), color-stop(80%, #fc6f66), color-stop(100%, #fa5e62)) ;
}
.checkScore{
  background:#434ae0;
}
.center_Ct{
  width: 60%;
  height: 100%;
  margin-left:20%;
  color: #fff;
  position: relative;
}
.eX{
  background: url('../images/enterbg1.png')  80% center   no-repeat;
  background-size: auto 65%;
}
.cS{
  background: url('../images/enterbg2.png')  80% center   no-repeat;
  background-size: auto 80%;
}

.text_ct{
  padding: 4vh 10%;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
}
.text_ct p{
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 10px;
}
.text_ct>.input_ct{
  margin-top: 25px;
  width: 60%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-radius: 50px;
}
.input_ct input{
  height: 40px;
  width: 70%;
  line-height: 40px;
  border: none;
  outline: none;
  color: #000;
  padding: 0 30px;
  border-radius: 50px;
}
.enter_btn{
  width: 30%;
  max-width: 130px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 50px;
  cursor: pointer;
  user-select: none;
  float:right;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fec80c), color-stop(80%, #fcb80d), color-stop(100%, #ffaa0f)) ;
}
.enter_btn:active{
  background: #fde27f;
}
.footer{
  flex-shrink: 0;
}
</style>
