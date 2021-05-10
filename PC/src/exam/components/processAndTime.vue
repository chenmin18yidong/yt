<template>
  <div class="topCt">
    <div class="processCt">
      <div class="process_lable">完成题数：<span> {{ doneTest }}/{{ testNum }} </span></div>
      <div class="process">
        <div class="process_cover" :style="{width:per+'%'}"></div>
      </div>
    </div>
    <div>
      <slot name="timeCount"></slot>
    </div>
    <div v-if="showTime" class="time_count_Ct">
      <img src="@/exam/images/time.png" alt="">
      <div class="time_text">
        距考试结束还有
        <div>
          <span>{{ hour }}</span>时<span>{{ min }}</span>分<span>{{ secon }}</span>秒
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { EXAMTIME } from '@/store/mutation-types'
export default {
  components: {

  },
  props: {
    testNum: {
      type: Number,
      default: 0
    },
    doneTest: {
      type: Number,
      default: 0
    },
    showTime: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      per: 0,
      timeCount: 0,
      hour: 0,
      min: '00',
      secon: '00'
    }
  },
  computed: {
    ...mapState(['examInfo'])
  },
  watch: {
    doneTest: function (ov, nv) {
      this.per = ((this.doneTest / this.testNum) * 100).toFixed(2)
    }
  },
  created: function () {
    this.per = ((this.doneTest / this.testNum) * 100).toFixed(2)
    this.timego()
  },
  methods: {
    /**
     * 往1位数前补0
     */
    checkTime (i) {
      return i < 10 ? '0' + i : i
    },
    /**
     * 计时
     */
    timego () {
      if (!this.showTime) return
      let historyTime = null
      if (this.$ls.get(EXAMTIME)) {
        historyTime = this.$ls.get(EXAMTIME)['h' + this.examInfo.ExamID]
      }

      this.timeCount = historyTime || this.examInfo.examTime * 60
      // this.timeCount = historyTime || 5 * 60
      if (!this.timeCount) return
      const _self = this
      this.timeInterval = setInterval(function () {
        _self.timeCount--
        const timeBack = {}
        timeBack['h' + _self.examInfo.ExamID] = _self.timeCount
        _self.$ls.set(EXAMTIME, timeBack)
        if (!_self.timeCount) {
          _self.$emit('timeout')
          clearInterval(_self.timeInterval)
        }
        let secon = 0
        let min = 0
        let hour = 0
        secon = parseInt(_self.timeCount % 60, 10)
        min = parseInt((_self.timeCount / 60) % 60, 10)
        hour = parseInt((_self.timeCount / 60 / 60) % 24, 10)
        secon = _self.checkTime(secon)
        min = _self.checkTime(min)
        _self.hour = hour
        _self.min = min
        _self.secon = secon
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.topCt{
  display: flex;
}
.processCt{
  width: 82%;
  display: flex;
  height: 50px;
  line-height: 50px;
}
.processCt>.process_lable span{
  padding: 0 8px;
  font-weight: bold;
}
.processCt>.process{
  position: relative;
  width: 80%;
  height: 8px;
  margin: 22px 10px;
  background-color: #e7e7e7;
  border-radius: 20px;
}
.processCt>.process>.process_cover{
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 20px;
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#fe9007), color-stop(100%, #feb50d));
}
.rightRate_Ct{
  width: 18%;
  padding-top: 11px;
  color: #fe9007;
}
.time_count_Ct{
  width: 18%;
  display: flex;
}
.time_count_Ct img{
  height: 45px;
}
.time_count_Ct>.time_text{
   margin-left: 10px;
  color: #fe9007;
}
.time_count_Ct>.time_text>div{
  display: flex;
}
.time_count_Ct div span{
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 2px;
  margin: 0 3px;
  text-align: center;
  background-color: #fe9007;
  color: #fff;
}
</style>
