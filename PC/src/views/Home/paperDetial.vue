<template>
  <div class="paperDetial">
    <a-button @click="goBack()" type="primary" size="small" ghost>
      返回题集市
    </a-button>
    <div class="paperInfo">
      <div class="info">
        <div class="paperName">{{ paperInfo.PaperTitle }}</div>
        <div class="paperAuthor"><span>{{ paperInfo.UserName||'stsq_'+paperInfo.UserID }}</span> 创建于{{ formatDate(new Date(paperInfo.OperateTime),'yyyy-MM-dd hh:mm') }}</div>
        <div class="score">
          <span class="textNum">{{ paperInfo.TestNum }}题</span>
          <span>{{ paperInfo.AvgScore }}分</span>
          <span>已售{{ paperInfo.buyCount }}</span>
        </div>
      </div>
      <div class="prise">
        ￥<span>{{ paperInfo.Price }}</span>
      </div>
      <div class="action">
        <div>
          <a-tag color="#fd9607" @click="goBuy()">
            购买
          </a-tag>
        </div>
      </div>
    </div>
    <div class="botInfo">
      <div class="tagBar">
        <span @click="botType='introduce'" :class="[botType==='introduce'?'active':'']">试卷介绍</span>
        <span @click="botType='previewTest'" :class="[botType==='previewTest'?'active':'']">预览试卷</span>
        <span @click="botType='discuss'" :class="[botType==='discuss'?'active':'']">评论</span>
        <span @click="botType='morePaper'" :class="[botType==='morePaper'?'active':'']">作者更多试卷</span>
      </div>
      <div class="bot_list">
        <div v-if="botType==='introduce'" class="introduce">
          {{ paperInfo.Introduction ||'暂无简介' }}
        </div>
        <div v-if="botType==='previewTest'" >
          <previewTest></previewTest>
        </div>
        <div v-if="botType==='discuss'">
          <discuss></discuss>
        </div>
        <div v-if="botType==='morePaper'">
          <morePaper :authorID="paperInfo.UserID"></morePaper>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { middleInfoNovalid } from '@/api/marketApi'
import { PAPERID } from '@/store/mutation-types'
import { formatDate, getQueryString } from '@/utils/utils'
import discuss from '@/views/Home/component/discuss'
import previewTest from '@/views/Home/component/previewTest'
import morePaper from '@/views/Home/component/morePaper'
export default {
  components: {
    discuss,
    previewTest,
    morePaper
  },
  data: function () {
    return {
      paperID: '',
      formatDate,
      paperInfo: {},
      botType: 'introduce', // introduce previewTest  discuss  morePaper
      selectPayType: false,
      payType: '',
      outTradeNo: '',
      paperPayNow: {},
      imgUrl: ''
    }
  },
  created () {
    const paperID = this.$ls.get(PAPERID)
    window.scrollTo(0, 0)
    const self = this
    if (!paperID) {
      this.$info({
        title: '提示',
        content: '试卷信息获取异常！',
        onOk () {
          self.goBack()
        }
      })
      return
    }
    this.paperID = paperID
    this.getInfo()
  },
  methods: {
    getInfo () {
      middleInfoNovalid(this.paperID).then(res => {
        this.paperInfo = res
        const preView = getQueryString('preview')
        if (preView) {
          this.botType = 'previewTest'
        }
      })
    },
    // 购买点击
    goBuy () {
      const host = window.location.host
      window.open('http://' + host + '/login?redirect=' + decodeURIComponent('/market/detial'), '_blank')
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import url(./paperDetial.less);
</style>
