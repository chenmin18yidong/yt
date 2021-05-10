<template>
  <div>
    <div class="headers">
      <div class="top">
        <span class="companyName">广西英腾教育科技股份有限公司</span>
        <!-- <div @click="goTakeExam"> 去考试</div>
        <div @click="goTakeExam"> 查询成绩</div> -->
        <template v-if="guid">
          <a-dropdown placement="bottomCenter" >
            <div class="ant-dropdown-link"> {{ nikeName }} <a-icon type="caret-down" /></div>
            <a-menu slot="overlay" style="border-top:3px solid #f3f3f3;min-width:100px;text-align:center;">
              <a-menu-item @click="logout">
                退出
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div class="enter" @click="goIndex"><img src="@/imgs/home/ct_enter.png" alt=""> 进入试题系统</div>
        </template>
        <template v-else>
          <div @click="goLogin" > 注册/登录</div>
        </template>
      </div>
      <div class="iconSearch">
        <img class="icon" src="/logo.png" alt="">
        <div class="search">
          <div class="search_typeSelect">
            试题 <img src="@/imgs/home/ct_search.png" alt="">
          </div>
          <div class="search_Input">
            <input type="text" v-model="searchInput">
          </div>
          <div class="search_Btn" @click="goSearchResult">
            搜一下
          </div>
        </div>
      </div>
      <div class="tabBar">
        <div @click="goHome" :class="[topBar==='home'?'bar_Active':'']">首页</div>
        <div @click="goSearch">搜题</div>
        <!-- <div @click="goMakeup">在线组卷</div> -->
        <div @click="goMarket">题集市</div>
        <div @click="goTiku">题库</div>
        <div @click="goApp" :class="[topBar==='app'?'bar_Active':'']" >APP</div>
        <!-- <div @click="goDetial" :class="[topBar==='detial'?'bar_Active':'']" >版本详情</div> -->
        <div @click="goCompany">公司简介</div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="footers">
      <div class="footCt">
        <div class="foot_title">关于我们</div>
        <div class="foot_textCodeCt">
          <div class="text">
            咨询时间：周一至周五 08:00-18:00 （节假日除外）<br>
            4007728869 <br>
            公司地址：广西柳州市城中区信息产业园C栋5楼创新工场<br>
            商务合作 （QQ）：977077380 <br>
            问题反馈 （QQ）：335112905 <br>
            开发者名称：广西英腾教育科技股份有限公司<br>
            版本：2.0.0 <br>

            <a @click="openYSxieyi">隐私协议</a> <a @click="openFWxieyi">用户权限</a>
          </div>
          <div class="code">
            <div>
              <img style="width:auto;" alt="刷题神器" src="@/imgs/logo2.png">
            </div>
            <div>
              <img src="@/imgs/appqrcode.jpg" alt="">
              <p>安卓端</p>
            </div>
            <div>
              <img src="@/imgs/qrcode-ios.png" alt="">
              <p>iOS端</p>
            </div>
            <div>
              <img src="@/imgs/stsq_applets.jpg" alt="">
              <p>小程序</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ABSBot">
      版权所有：广西英腾教育科技股份有限公司    备案号： <a href="http://www.beian.miit.gov.cn" style="color: #a9adb0; text-decoration: underline;" target="_brank">桂ICP备09009842号</a>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import url(./container.less);
</style>

<script>
import { USERNAME, GUID, USERID } from '@/store/mutation-types'
import config from '@/config/project.config'
export default {
  props: {
    topBar: {
      type: String,
      default: 'home'
    }
  },
  data: function () {
    return {
      searchInput: '',
      nikeName: null,
      guid: null,
      userID: ''
    }
  },
  mounted () {
    this.nikeName = this.$ls.get(USERNAME)
    this.guid = this.$ls.get(GUID)
    this.userID = this.$ls.get(USERID)
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goSearch () {
      const a = document.createElement('a')
      if (this.guid) {
        a.href = config.searchUrl + '?userID=' + this.userID + '&guid=' + this.guid
      } else {
        a.href = config.searchUrl
      }
      a.click()
    },
    goSearchResult () {
      if (!this.searchInput) {
        this.goSearch()
        return
      }
      const a = document.createElement('a')
      a.target = '_brank'
      if (this.guid) {
        a.href = config.searchUrl + '/searchf.html?searchWords=' + this.searchInput + '&userID=' + this.userID + '&guid=' + this.guid
      } else {
        a.href = config.searchUrl + '/searchf.html?searchWords=' + this.searchInput
      }
      a.click()
    },
    goTiku () {
      if (this.guid) {
        window.location.href = '/tiku/home?userID=' + this.userID + '&guid=' + this.guid
      } else {
        window.location.href = '/tiku/home?clear=1'
      }
    },
    goCompany () {
      if (this.guid) {
        window.location.href = '/tiku/companyProfile?userID=' + this.userID + '&guid=' + this.guid
      } else {
        window.location.href = '/tiku/companyProfile?clear=1'
      }
    },
    goApp () {
      this.$router.push('/app')
    },
    goDetial () {
      this.$router.push('/vipDetial')
    },
    goLogin () {
      let redirect = this.$route.query.redirect
      if (redirect) {
        redirect = decodeURIComponent(redirect)
        const host = window.location.host
        window.open('http://' + host + '/login?redirect=' + redirect, '_blank')
      } else {
        window.location.href = '/login'
      }
    },
    goTakeExam () {
      window.location.href = '/exam'
      // const host = window.location.host
      // window.open('http://' + host + '/exam')
    },
    goIndex () {
      const host = window.location.host
      window.open('http://' + host + '/index')
    },
    goMarket () {
      if (!this.guid) {
        this.$router.push('/login?redirect=' + encodeURIComponent('/index/market'))
        return
      }
      const host = window.location.host
      window.open('http://' + host + '/index/market', '_blank')
    },
    goMakeup () {
      if (!this.guid) {
        this.$router.push('/login?redirect=' + encodeURIComponent('/makeup'))
        return
      }
      window.location.href = '/makeup'
      // const host = window.location.host
      // window.open('http://' + host + '/makeup')
    },
    openFWxieyi () {
      var iWidth = window.screen.width * 0.7
      var iHeight = window.screen.height * 0.8
      // console.log(iHeight)
      const myWindow = window.open('http://iosstsq.tibosi.com/html/userAgrm.html', '', 'height=' + iHeight + ',width=' + iWidth)
      myWindow.focus()
    },
    openYSxieyi () {
      var iWidth = window.screen.width * 0.7
      var iHeight = window.screen.height * 0.8
      // console.log(iHeight)
      const myWindow = window.open('http://iosstsq.tibosi.com/html/userPrivacyAgrm.html', '', 'height=' + iHeight + ',width=' + iWidth)
      myWindow.focus()
    },
    logout () {
      this.$ls.clear()
      window.location.reload()
    }
  }
}
</script>
