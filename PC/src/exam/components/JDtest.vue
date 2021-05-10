<template>
  <!-- Atest -->
  <div class="Atest">
    <div class="test_top">
      <div class="test_style">【简答题】（{{ tdata.score }}分）
        <a-tag v-if="tdata.difficulty==='easy'" color="#68d2a1">简单</a-tag>
        <a-tag v-if="tdata.difficulty==='normal'" color="#ff7442">一般</a-tag>
        <a-tag v-if="tdata.difficulty==='difficult'" color="#ff5551">困难</a-tag>
        <span v-if="tdata.flag" @click="setFlag(0)" class="addtag flag"><img src="@/exam/images/flag.png" alt=""> 标记本题</span>
        <span v-else @click="setFlag(1)" class="addtag"><img src="@/exam/images/unflag.png" alt=""> 标记本题</span>
      </div>
      <div class="test_title">{{ tdata.testNO }}、<span v-html="tdata.title"></span>
        <div v-if="tdata.hasVideo" class="videoCt">
          <TcPlayer :id="'video_'+tdata.testNO" :vid="tdata.videoInfo.id" :url="tdata.videoInfo.url" :pause="tdata.testNO==currentIndex?false:true"></TcPlayer>
        </div>
      </div>
    </div>
    <div class="test_bot">
      <dl>
        <dd >
          <a-textarea
            v-if="testType!='moniShowAnser'"
            @change="inputChange"
            :maxLength="1500"
            v-model="userReply"
            :autoSize="{ minRows: 2, maxRows: 6 }"
            placeholder="请输入考试答案"/>
        </dd>
      </dl>
      <div v-if="testType!='moniShowAnser'">
        <a-button v-if="testNum===currentIndex" @click="submit" type="primary">下一题</a-button>
        <a-button v-else @click="answerConfirm" type="primary" ghost>提交答案</a-button>
      </div>
      <!-- <div>
        <a-button @click="goNext" type="primary">下一题</a-button>
      </div> -->
    </div>

  </div>
</template>
<script>
import TcPlayer from '@/exam/components/Tcpalyer'
import { mapState } from 'vuex'
export default {
  components: {
    TcPlayer
  },
  props: {
    tdata: {
      type: Object,
      default: () => {}
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    testNum: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      userReply: '',
      inputLast: ''
    }
  },
  watch: {
    currentIndex: function (ov, nv) {
      this.userReply = this.tdata.userReply
    }
  },
  created: function () {

  },
  mounted: function () {
    this.userReply = this.tdata.userReply
  },
  computed: {
    ...mapState({
      testType: state => state.doExam.testType
    })
  },
  methods: {
    inputChange (e) {
      if (Number(localStorage.getItem('ForbiddenPaste')) === 1) {
        if (e.inputType === 'insertFromPaste') {
          this.$message.destroy()
          this.$message.warning('考试设置了不允许粘贴！')
          // 恢复粘贴之前的内容
          this.userReply = this.inputLast
        } else {
          this.inputLast = this.userReply
        }
      }
    },
    answerConfirm () {
      if (this.userReply.length > 1500) {
        this.$warning({
          title: '提示',
          content: '你输入的内容已达到限制，请重新编辑！'
        })
        return
      }
      this.$emit('answer', this.userReply)
      if (this.testType === 'moniTest') { // 考试提交答案直接下一题
        this.goNext()
      }
    },
    submit () {
      if (this.userReply.length > 1500) {
        this.$warning({
          title: '提示',
          content: '你输入的内容已达到限制，请重新编辑！'
        })
        return
      }
      this.$emit('answer', this.userReply)
      this.$emit('submit')
    },
    setFlag (flag) {
      if (this.testType === 'moniShowAnser') return
      this.$emit('setflag', flag)
    },
    goNext () {
      this.$emit('next')
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor:#fe9007;
@useRed:#ffcdcc;
@useGreen: #80e9c5;
// .Atest{
//   height: 100%;
//   overflow-y: auto;
// }

.test_top{
  background-color: #f9f9f9;
  padding: 15px 35px;
}
.test_bot{
  padding: 15px 35px;
}
.test_style{
  font-weight: bold;
  margin-bottom: 10px;
}
.test_title img{
  max-width: 85%;

}
dd{
  padding: 10px 0;
}
.radioA{
  width: 26px;
  height: 26px;
  line-height: 23px;
  display: block;
  float: left;
  margin-right: 10px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
}
.RDefault {
  border: 1px solid @mainColor;
  color: @mainColor;
}
.RSelect {
  border: 1px solid @mainColor;
  background-color: @mainColor;
  color: #fff;
}
.RRight {
  border: 1px solid @useGreen;
  background-color: @useGreen;
  color: #fff;
}
.RWrong {
  border: 1px solid @useRed;
  background-color: @useRed;
  color: #fff;
}
.addtag{
  float:right;
  font-size: 0.8em;
  font-weight: normal;
}
.addtag img{
  width: 24px;
  margin-top: -4px;
}
.flag{
  color: #eb3a4c;
}
</style>
