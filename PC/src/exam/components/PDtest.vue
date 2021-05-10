<template>
  <!-- Atest -->
  <div class="Atest">
    <div class="test_top">
      <div class="test_style">【判断题】（{{ tdata.score }}分）
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
        <dd @click="answerClick('A')">
          <span v-if="tdata.userReply==='A'||tdata.userReply==='对'" class="radioA RSelect">A</span>
          <span v-else class="radioA RDefault">A</span>
          对
        </dd>
        <dd @click="answerClick('B')">
          <span v-if="tdata.userReply==='B'||tdata.userReply==='错'" class="radioA RSelect">B</span>
          <span v-else class="radioA RDefault">B</span>
          错
        </dd>
      </dl>
      <div v-if="testType!='moniShowAnser'">
        <a-button v-if="testNum===currentIndex" @click="submit" type="primary">下一题</a-button>
        <a-button v-else @click="goNext" type="primary">下一题</a-button>
      </div>
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
      userReply: ''
    }
  },
  watch: {
    currentIndex: function (ov, nv) {
      // this.userReply = this.tdata.userReply
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
    answerClick (userReply) {
      if (this.testType === 'moniShowAnser') return
      this.userReply = userReply
      this.$emit('answer', userReply)
    },
    setFlag (flag) {
      if (this.testType === 'moniShowAnser') return
      this.$emit('setflag', flag)
    },
    goNext () {
      this.$emit('next')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor:#fe9007;
@useRed:#ffcdcc;
@useGreen: #80e9c5;
.Atest{
  // height: 100%;
  // overflow-y: auto;
}

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
