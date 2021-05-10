<template>
  <!-- 考试成绩 -->
  <div class="testRsult">
    <div class="topBg">
      <img class="icon" src="@/imgs/logo.png" alt="">
      <span style="float: right;  padding: 25px 60px; color: #fff; font-size: 1.2em;" @click="goBack">返回</span>
    </div>
    <div class="mainCt">
      <div class="Title">考试成绩报告</div>
      <div class="contain">
        <div class="leftInfo">
          <table>
            <tr>
              <th>
                <span style="padding:0 10px;color:#fe9007;">●</span>
                考生信息：</th>
            </tr>
            <tr>
              <td style="min-width:200px;padding-left:40px;"> 姓名：{{ testInfo.ExamerName }} </td>
              <td style="min-width:200px;padding-left:15px;"> 电话：{{ testInfo.ExamerNumber }}  </td>
              <td style="min-width:200px;padding-left:15px;">  邮箱：{{ testInfo.ExamerEmail }} </td>
            </tr>
          </table>
          <table>
            <tr>
              <th>
                <span style="padding:0 10px;color:#fe9007;">●</span>
                考试信息：</th>
            </tr>
            <tr>
              <td style="min-width:400px;padding-left:40px;">考试名称：{{ testInfo.ExamTitle }} </td>
              <td style="min-width:400px;padding-left:15px;"> 考试时长：{{ testInfo.examTime }}分钟 </td>
            </tr>
            <tr>
              <td style="min-width:400px;padding-left:40px;">  考试总分：{{ testInfo.TotalScore }}分</td>
              <td style="min-width:400px;padding-left:15px;">  考试题量：{{ testInfo.TotalNum }}题</td>
            </tr>
          </table>
        </div>
        <div class="rightScore">
          <!-- 非手动判分或者已发布成绩的显示成绩 -->
          <template v-if="testInfo.IsManul==0||testInfo.JudgeStatus==2">
            <span>得分</span>
            <div >{{ testInfo.UserScore||0 }}</div>
          </template>
          <template v-else>
            <span>试卷</span>
            <div style="font-size: 2em;">待批阅</div>
            <span>(请发布成绩后凭考试码查询成绩)</span>
          </template>
        </div>
      </div>

      <div v-if="tbData.length" style="margin-top: 30px;">
        <div class="splitLine">答题情况</div>
        <div style="margin:10px;"> 总题数：{{ ExamTestNum }}题  <span style="padding-left:40px;"> 答题数：{{ UserExamCount }}题</span></div>
        <a-table
          :columns="columns"
          :dataSource="tbData"
          bordered
          size="small"
          :pagination="false"
          rowKey="index">
        </a-table>
      </div>

      <div style="margin-top: 30px;">
        <testResult :detail="detail"></testResult>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { examerAnswerDetail, examerExamInfo } from '@/api/takeExam'
import testResult from '@/exam/components/testResult'
import { dealImg } from '../js/testData'
const columns = [{
  title: '模块名称',
  dataIndex: 'TypeName',
  key: 'TypeName'
}, {
  title: '题型',
  dataIndex: 'Type',
  key: 'Type'
}, {
  title: '满分',
  dataIndex: 'TotalScore',
  key: 'TotalScore'
}, {
  title: '题数',
  dataIndex: 'TestNum',
  key: 'TestNum'
}, {
  title: '错题数',
  dataIndex: 'WrongCount',
  key: 'WrongCount'
}, {
  title: '得分',
  dataIndex: 'ExamerScore',
  key: 'ExamerScore'
}]

export default {
  components: {
    testResult
  },
  data: function () {
    return {
      testInfo: {},
      columns,
      tbData: [],
      detail: [],
      UserExamCount: '',
      ExamTestNum: ''
    }
  },
  created: function () {
    if (!this.examInfo.ExamID) {
      this.$warning({
        title: '提示',
        content: '试卷信息获取失败',
        onOk: () => {
          this.$router.replace('/exam')
        }
      })
      return
    }
    examerExamInfo(this.examInfo.ExamID, this.examInfo.examCode).then(res => {
      this.testInfo = res
    })
    examerAnswerDetail(this.examInfo.UserID, this.examInfo.ExamID).then(res => {
      // console.log(res)
      this.UserExamCount = res.UserExamCount
      this.ExamTestNum = res.ExamTestNum
      this.tbData = res.overview
      const detail = res.detail
      let idx = 1
      for (let i = 0; i < detail.length; i++) {
        const styleItem = detail[i]
        for (let j = 0; j < styleItem.TestItems.length; j++) {
          const testItem = styleItem.TestItems[j]
          const testJson = JSON.parse(testItem.TestJson)
          if (styleItem.Type === 'A3TEST') {
            for (let k = 0; k < testJson.A3TestItems.length; k++) {
              const a3test = testJson.A3TestItems[k]
              // console.log(styleItem.Type, a3test.A3TestItemID, testItem.ChildTestID)
              if (a3test.A3TestItemID === testItem.ChildTestID) {
                testJson['Title'] = dealImg(testJson.FrontTitle + a3test.Title)
                testJson['SelectedItems'] = JSON.parse(dealImg(JSON.stringify(a3test.SelectedItems)))
                testItem['testNO'] = idx
                testJson['Answer'] = a3test.Answer
                testItem.TestJson = testJson
                idx++
                break
              }
            }
          } else if (styleItem.Type === 'BTEST') {
            for (let k = 0; k < testJson.BTestItems.length; k++) {
              const btest = testJson.BTestItems[k]
              if (btest.BTestItemID === testItem.ChildTestID) {
                testJson['Title'] = dealImg(btest.Title)
                testJson.SelectedItems = JSON.parse(dealImg(JSON.stringify(testJson.SelectedItems)))
                testItem['testNO'] = idx
                testJson['Answer'] = btest.Answer
                testItem.TestJson = testJson
                idx++
                break
              }
            }
            idx++
          } else {
            testJson.Title = dealImg(testJson.Title)
            if (testJson.SelectedItems) {
              testJson.SelectedItems = JSON.parse(dealImg(JSON.stringify(testJson.SelectedItems)))
            }
            testItem['testNO'] = idx
            testItem.TestJson = testJson
            idx++
          }
        }
      }
      this.detail = detail
    })
    /** * 本地测试 */
    // this.tbData = testData.resultData.overview
    // const detail = testData.resultData.detail
    // let idx = 1
    // for (let i = 0; i < detail.length; i++) {
    //   const styleItem = detail[i]
    //   for (let j = 0; j < styleItem.TestItems.length; j++) {
    //     const testItem = styleItem.TestItems[j]
    //     const testJson = JSON.parse(testItem.TestJson)
    //     if (styleItem.Type === 'A3TEST') {
    //       for (let k = 0; k < testJson.A3TestItems.length; k++) {
    //         const a3test = testJson.A3TestItems[k]
    //         console.log(styleItem.Type, a3test.A3TestItemID, testItem.ChildTestID)
    //         if (a3test.A3TestItemID === testItem.ChildTestID) {
    //           testJson['Title'] = dealImg(testJson.FrontTitle + a3test.Title)
    //           testJson['SelectedItems'] = JSON.parse(dealImg(JSON.stringify(a3test.SelectedItems)))
    //           testItem['testNO'] = idx
    //           testJson['Answer'] = a3test.Answer
    //           testItem.TestJson = testJson
    //           idx++
    //           break
    //         }
    //       }
    //     } else if (styleItem.Type === 'BTEST') {
    //       for (let k = 0; k < testJson.BTestItems.length; k++) {
    //         const btest = testJson.BTestItems[k]
    //         if (btest.BTestItemID === testItem.ChildTestID) {
    //           testJson['Title'] = dealImg(btest.Title)
    //           testJson.SelectedItems = JSON.parse(dealImg(JSON.stringify(testJson.SelectedItems)))
    //           testItem['testNO'] = idx
    //           testJson['Answer'] = btest.Answer
    //           testItem.TestJson = testJson
    //           idx++
    //           break
    //         }
    //       }
    //       idx++
    //     } else {
    //       testJson.Title = dealImg(testJson.Title)
    //       if (testJson.SelectedItems) {
    //         testJson.SelectedItems = JSON.parse(dealImg(JSON.stringify(testJson.SelectedItems)))
    //       }
    //       testItem['testNO'] = idx
    //       testItem.TestJson = testJson
    //       idx++
    //     }
    //   }
    // }
    // this.detail = detail
    /** * 本地测试end */
  },
  mounted: function () {
  },
  computed: {
    ...mapState(['examInfo'])
  },
  methods: {
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
  overflow-y: auto;
}
.Title{
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  padding: 3vh 0;
}

.contain{
  display: flex;
}
.leftInfo{
  border: 1px solid #e2e2e2;
  box-shadow: 1px 2px 2px #f2f2f2,-1px 2px 2px #e2e2e2,1px -2px 2px #f2f2f2,-1px -2px 2px #e2e2e2;
  width: 80%;
  padding: 15px 25px;
  border-radius: 4px;
}
.rightScore{
  margin-left: 2%;
  width: 18%;
  background:#fd9707 url('~@/exam/images/rs_pic.png') top right no-repeat ;
  background-size: 30% auto;
  background-position: 90% 0;
  border-radius: 4px;
  padding: 2% 0 0 2%;
  color: #fff;
}
.rightScore div{
  font-size: 3em;
}

.splitLine{
  font-weight: bold;
}
.splitLine::before{
  content: '.';
  background-color: #fd9707;
  color: #fe9007;
  margin-right: 10px;
}

</style>
