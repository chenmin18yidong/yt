<template>
  <div>
    <div v-if="detail.length" class="splitLine">答题详情</div>
    <dd>
      <dl v-for="(item,idx) in detail" :key="'style'+idx">
        <div v-if="item.TestItems.length" class="testStyle">{{ item.TypeName||item.Style }}</div>
        <div v-for="(test,i) in item.TestItems" :key="'test'+i">
          <div class="test_Ct">
            <div>
              {{ test.testNO }}.
              <span v-html="test.TestJson.Title"></span>
              <span style="float:right;">
                <a-icon v-if="test.IsRight" type="check" style="color:#52db57;"/>
                <a-icon v-else type="close" style="color:#fc7376;"/>
                得分：{{ test.Score }} | 满分：{{ item.ScorePerTest }}
              </span>
            </div>
            <ul v-if="test.TestJson.SelectedItems">
              <li v-for=" select in test.TestJson.SelectedItems" :key="idx+'test'+i+select.ItemName">
                <img v-if="test.Answer.includes(select.ItemName)&&test.TestJson.Answer.includes(select.ItemName)" src="@/exam/images/rs_r.png" alt="">
                <img v-else-if="test.Answer.includes(select.ItemName)" src="@/exam/images/rs_w.png" alt="">
                <div v-else class="circle"></div>
                {{ select.ItemName }}.{{ select.Content }}
              </li>
            </ul>
          </div>
          <div class="testAnswer">
            <template v-if="item.Type=='JDTEST'">
              <span class="rightAnswer">正确答案：<span>{{ test.TestJson.Answer }}</span></span>  <br/>
              <span :class="[test.IsRight?'rightAnswer':'wrongAnswer']">考生答案：<span>{{ test.Answer }}</span></span>
            </template>
            <template v-else-if="item.Type=='PDTEST'">
              <span class="rightAnswer">正确答案：<span>
                <template v-if="test.TestJson.Answer=='A'">
                  对
                </template>
                <template v-else-if="test.TestJson.Answer=='B'">
                  错
                </template>
                <template v-else>
                  {{ test.TestJson.Answer }}
                </template>
              </span></span>
              <span :class="[test.IsRight?'userAnswer rightAnswer':'userAnswer wrongAnswer']">考生答案：<span>
                <template v-if="test.Answer=='A'">
                  对
                </template>
                <template v-else-if="test.Answer=='B'">
                  错
                </template>
                <template v-else>
                  {{ test.Answer }}
                </template>
              </span></span>
            </template>
            <template v-else>
              <span class="rightAnswer">正确答案：<span>{{ test.TestJson.Answer }}</span></span>
              <span :class="[test.IsRight?'userAnswer rightAnswer':'userAnswer wrongAnswer']">考生答案：<span>{{ test.Answer }}</span></span>
            </template>
          </div>
        </div>
      </dl>
    </dd>
  </div>
</template>
<style scoped>
dd{
  margin-top: 12px;
}
ul{
 padding: 0;
 margin: 0;
}
ul li{
  list-style:none;
  margin: 5px 0;
}
ul>li>img{
    width: 24px;
  }
ul>li>.circle{
  width: 17px;
  height: 17px;
  border-radius: 50px;
  border: 1px solid #c4c2c2;
  float: left;
  margin: 5px 8px 0 4px;
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
.testStyle{
  background-color: #ffedd5;
  font-weight: bold;
  padding:3px 10px;
}
.test_Ct{
  padding: 10px 10px 0 10px;
}
.testAnswer{
  background-color: #f9f9f9;
  padding:3px 10px;
  margin-bottom: 10px;
}
.rightAnswer::before{
  content: '●';
  color: #52db57;
  margin-right:10px;
}
.rightAnswer span{
  color: #52db57;
}
.userAnswer{
  padding-left: 40px;
}
.wrongAnswer::before{
  content: '●';
  color: #fc7376;
  margin-right:10px;
}
.wrongAnswer span{
  color: #fc7376;
}
</style>
<script>
export default {
  props: {
    detail: {
      type: Array,
      default: () => []
    }
  }

}
</script>
