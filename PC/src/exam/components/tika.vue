<template>
  <!-- 题卡 -->
  <div class="tika" ref="tika">
    <div class="tika_top">
      <img style="width:26px;margin-top: -7px;" src="@/exam/images/tika.png" alt="">答题卡
      <span v-if="showTika" @click="showTika=false" style="float:right;font-size:0.8em;"><img style="width:25px;margin-top: -5px;" src="@/exam/images/up.png" alt="">收起</span>
      <span v-else @click="showTika=true" style="float:right;font-size:0.8em;"><img style="width:25px;margin-top: -5px;" src="@/exam/images/down.png" alt="">展开</span>
      <!-- <span style="float:right;"><a-icon type="up-circle" />收起</span> -->
      <!--  -->
    </div>
    <div v-if="showTika" class="scorllCt">
      <div class="tips_ct">
        <span class="tips RDefault"></span> 未做答 <span class="tips Rdone"></span>已作答<span class="tips Rtag"></span> 标记
      </div>
      <div class="carContent">
        <template v-for="(item,idx) in tikaArr">
          <div :key="'tika'+idx">
            <div class="kaLable">{{ item.name }}:</div>
            <template v-for="element in item.testNOArr">
              <em
                v-if="element.flag"
                @click="goTest(element.testNO)"
                :key="'i'+element.testNO"
                :class="[currentIndex===element.testNO?'Rtag RSelect':'Rtag']"
                :style="{'margin-left':tikaMargin+'px'}">{{ element.testNO }}</em>
              <em
                v-else-if="element.userReply"
                @click="goTest(element.testNO)"
                :key="'i'+element.testNO"
                :class="[currentIndex===element.testNO?'Rdone RSelect':'Rdone']"
                :style="{'margin-left':tikaMargin+'px'}">{{ element.testNO }}</em>
              <em v-else-if="currentIndex===element.testNO" :key="'i'+element.testNO" class="RSelect" :style="{'margin-left':tikaMargin+'px'}">{{ element.testNO }}</em>
              <em
                v-else
                @click="goTest(element.testNO)"
                :key="'i'+element.testNO"
                class="RDefault"
                :style="{'margin-left':tikaMargin+'px'}">{{ element.testNO }}</em>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div v-if="redo" class="submitBtn" @click="redoTest">
      重新答题
    </div>
    <div v-else class="submitBtn" @click="submitTest">
      <a-icon type="check-circle" style="margin-right:5px;" /> 交卷
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    currentuserReply: {
      type: String,
      default: ''
    },
    currentflag: {
      type: Number,
      default: 0
    },
    arrAllTest: {
      type: Array,
      default: () => []
    },
    redo: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentflag: function (ov, nv) {
      if (this.currentuserReply) {
        for (let i = 0; i < this.tikaArr.length; i++) {
          const cunrrenKa = this.tikaArr[i].testNOArr.find(el =>
            el.testNO === this.currentIndex
          )
          if (cunrrenKa) {
            cunrrenKa.flag = this.currentflag
            return
          }
        }
      }
    },
    currentuserReply: function (ov, nv) {
      if (this.currentuserReply) {
        for (let i = 0; i < this.tikaArr.length; i++) {
          const cunrrenKa = this.tikaArr[i].testNOArr.find(el =>
            el.testNO === this.currentIndex
          )
          if (cunrrenKa) {
            cunrrenKa.userReply = this.currentuserReply
            return
          }
        }
      }
    }
  },
  data: function () {
    return {
      tikaMargin: 10, // 题卡里的小圆圈左侧边距
      tikaArr: [],
      showTika: true
    }
  },
  created: function () {
    let nameNow = ''// 当前循环到的题型名称
    const self = this

    this.arrAllTest.forEach(function (el) {
      const style = self.redo ? el.subStyle : el.style
      if (style !== nameNow) {
        // 当题型发生变化时，往数组中压入一个JSON
        nameNow = style
        const tikaJson = {
          name: nameNow,
          testNOArr: []
        }
        self.tikaArr.push(tikaJson)
      }
      self.tikaArr[self.tikaArr.length - 1].testNOArr.push(el)
    })
  },
  mounted: function () {
    this.tikaMargin = (this.$refs.tika.clientWidth - 20 - 180) / 6
  },
  methods: {
    goTest (testNO) {
      this.$emit('gotest', testNO)
    },
    submitTest () {
      this.$emit('submit')
    },
    redoTest () {
      this.$emit('redotest')
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor:#fe9007;
@useRed:#ffcdcc;
@useGreen: #80e9c5;

.kaLable{
  margin-top: 20px;
  font-size: 0.9em;
}
.tika{

}
.tika_top{
  padding: 10px;
}
.scorllCt{
  /**70 */
  height:calc( 63vh - 99px);
  overflow-y: auto;
}
.tips_ct{
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 0.9em;
}
.tips{
  width: 16px;
  height: 16px;
  display: block;
  float: left;
  margin-left:10px;
  margin-right:2px;
  margin-top:3px;
  text-align: center;
  cursor: pointer;
}
.RDefault {
   border: 1px solid #eaeaea;
}
.RSelect {
  border: 1px solid @mainColor !important;
}

.Rdone {
  border: 1px solid @useGreen;
  background-color: @useGreen;
}
.Rtag {
  border: 1px solid @useRed;
  background-color: @useRed;
}
.carContent {
  padding: 0 10px;
  margin-top: 10px;
  padding-bottom: 60px;
}
.submitBtn{
  margin: 10px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: #4978fc;
  color:#fff;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
}
.submitBtn:active{
  background-color: #86a5fc;
}
.carContent em {
  display: inline-block;
  margin: 4px 0;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  font-style: normal;
}
</style>
