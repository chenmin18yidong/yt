<template>
  <!-- 考试入口 -->
  <div class="testInfo">
    <div class="topBg">
      <img class="icon" src="@/imgs/logo.png" alt="">
    </div>
    <div class="mainCt">
      <div class="Title">欢迎参加考试！请核对信息是否属实，如有问题请联系管理员。</div>
      <div class="contain">
        <div class="leftInfo">
          <table>
            <tr>
              <th style="width:150px;text-align:right;padding:15px 0;">
                <span style="padding:0 10px;color:#fe9007;">●</span>
                考生信息：</th>
            </tr>
            <tr>
              <td style="width:150px;text-align:right">考生姓名：</td>
              <td>{{ testInfo.ExamerName }}</td>
            </tr>
            <tr>
              <td style="width:150px;text-align:right">考生电话：</td>
              <td>{{ testInfo.ExamerNumber ||'————' }}</td>
            </tr>
            <tr>
              <td style="width:150px;text-align:right">考生邮箱：</td>
              <td>{{ testInfo.ExamerEmail||'————' }}</td>
            </tr>
          </table>

          <table style="margin-top: 20px;">
            <tr>
              <th style="width:150px;text-align:right;padding:15px 0;">
                <span style="padding:0 10px;color:#fe9007;">●</span>
                考试信息：</th>
            </tr>
            <tr>
              <td style="width:150px;text-align:right">考试名称：</td>
              <td>{{ testInfo.ExamTitle }}</td>
            </tr>
            <!-- <tr>
              <td style="width:150px;text-align:right">考试时间：</td>
              <td>2019.12.14 18:00 —— 2019.12.14 19：00</td>
            </tr> -->
            <tr>
              <td style="width:150px;text-align:right">考试时长：</td>
              <td>{{ testInfo.examTime }}分钟</td>
            </tr>
            <tr>
              <td style="width:150px;text-align:right">考试总分：</td>
              <td>{{ testInfo.TotalScore }}分</td>
            </tr>
            <tr>
              <td style="width:150px;text-align:right">考试题量：</td>
              <td>{{ testInfo.TotalNum }}题</td>
            </tr>
          </table>
        </div>
        <div class="rightBtn">
          <div class="btn action_btn" @click="goTest"> 开始考试</div>
          <div class="btn unable_btn" style="margin-top:10px;" @click="goBack"> 返回</div>
          <!-- <div class="btn unable_btn">开始考试</div> -->
          <!-- <div style="padding-top:10px;">考试时间未开始...</div>
          <div style="color:#fe9007;">00:30</div> -->
          <!-- <div style="color:red;padding:10px 0;">考试已结束</div> -->
        </div>
      </div>
      <!-- <div style="padding-left: 5vw;">
        注意事项：XXXXXXXXXXXXXXXXXXXXXXX
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { examerExamInfo } from '@/api/takeExam'
import { EXAMDATA, EXAMTIME } from '@/store/mutation-types'
export default {
  components: {

  },
  data: function () {
    return {
      testInfo: {}
    }
  },
  created: function () {
    if (!this.examInfo.ExamID) {
      this.$warning({
        title: '提示',
        content: '试卷信息获取失败',
        onOk: () => {
          this.goBack()
        }
      })
      return
    }
    // console.log(this.examInfo.ExamID)
    examerExamInfo(this.examInfo.ExamID, this.examInfo.examCode).then(res => {
      this.testInfo = res
      this.storeExamInfo(res)
    })
  },
  mounted: function () {
  },
  computed: {
    ...mapState(['examInfo'])
  },
  methods: {
    ...mapMutations(['storeExamInfo']),
    goTest () {
      this.$ls.remove(EXAMDATA)
      this.$ls.remove(EXAMTIME)
      this.$router.replace('/exam/doExam')
    },
    goBack () {
      this.$router.replace('/exam')
    }
  }
}
</script>

<style lang="less" scoped>

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
.Title{
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  padding: 7vh 0;
}

.contain{
  display: flex;
  padding: 20px 3vw;
}
.leftInfo{
  border: 1px solid #e2e2e2;
  box-shadow: 1px 2px 2px #f2f2f2,-1px 2px 2px #e2e2e2,1px -2px 2px #f2f2f2,-1px -2px 2px #e2e2e2;
  width: 80%;
  padding: 15px 25px;
  border-radius: 4px;
}
.rightBtn{
  height: 45vh;
  text-align: right;
  width: 15%;
  margin-left: 5%;
  padding-top: 16vh;
  text-align: center;
}
.btn{
  padding: 8px 0;
  margin-left: 10px;
  text-align: center;
  background-color: #4f7bfc;
  border-radius: 4px;
  color: #fff;
  font-size: 0.8em;
  cursor: pointer;
  user-select: none;
}
.unable_btn{
  background-color: #ccc;
}
.action_btn{
  background-color: #4f7bfc;
}
.action_btn:active{
  background-color: #8ba6fa;
}
</style>
