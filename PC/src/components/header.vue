<template>
  <div>
    <div class="headTop">
      <span class="companyName">广西英腾教育科技股份有限公司</span>
      <!-- <div v-if="page!='exam'" @click="goTakeExam"> 去考试</div>
      <div v-if="page!='exam'" @click="goTakeExam"> 查询成绩</div> -->
      <template v-if="guid">
        <a-dropdown placement="bottomCenter" >
          <div class="ant-dropdown-link"> {{ nikeName }} <a-icon type="caret-down" /></div>
          <a-menu slot="overlay" style="border-top:3px solid #f3f3f3;min-width:100px;text-align:center;">
            <a-menu-item @click="logout">
              退出
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <div class="enterBtn" @click="goIndex"><img src="@/imgs/home/ct_enter.png" alt=""> 进入试题系统</div>
      </template>
      <template v-else>
        <div v-if="page!='login'" @click="goLogin" > 注册/登录</div>
      </template>
    </div>
    <!-- <div class="iconSearch">
      <img class="icon" src="/logo.png" alt="">
    </div> -->
    <div class="topBar">
      <div class="tabBar">
        <a><img class="icon" src="/logo.png" alt=""></a>
        <a><div @click="goHome" :class="[activePage==='home'?'bar_Active':'']">首页</div></a>
        <a><div @click="goSearch">搜题</div></a>
        <!-- <div @click="goMakeup">在线组卷</div> -->
        <a><div @click="goMarket">题集市</div></a>
        <a><div @click="goTiku">题库</div></a>
        <a><div @click="goApp" :class="[activePage==='app'?'bar_Active':'']" >APP</div></a>
        <!-- <div @click="goDetial" :class="[activePage==='detial'?'bar_Active':'']" >版本详情</div> -->
        <a><div @click="goCompany">公司简介</div></a>
      </div>
    </div>
  </div>
</template>

<script>
import { USERNAME, GUID, USERID } from '@/store/mutation-types'
import config from '@/config/project.config'
export default {
  name: 'ComHeader',
  props: {
    activePage: {
      type: String,
      default: 'main'
    },
    from: {
      type: String,
      default: null
    }
  },
  watch: {
    activePage: function () {
      this.page = this.activePage
    }
  },
  data: function () {
    return {
      page: 'main',
      nikeName: '',
      guid: null,
      userID: ''
    }
  },
  mounted () {
    this.page = this.activePage
    this.nikeName = this.$ls.get(USERNAME)
    this.guid = this.$ls.get(GUID)
    this.userID = this.$ls.get(USERID)
  },
  methods: {
    goHome () {
      window.location.href = '/home'
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
    goSearchResult () {
      const a = document.createElement('a')
      a.target = '_brank'
      if (this.guid) {
        a.href = config.searchUrl + '/searchf.html?searchWords=' + this.searchInput + '&userID=' + this.userID + '&guid=' + this.guid
      } else {
        a.href = config.searchUrl + '/searchf.html?searchWords=' + this.searchInput
      }
      a.click()
    },
    goApp () {
      window.location.href = '/tiku/app'
    },
    goDetial () {
      window.location.href = '/vipDetial'
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
    },
    goIndex () {
      const host = window.location.host
      window.open('http://' + host + '/index', '_blank')
    },
    goMarket () {
      if (!this.guid) {
        this.$router.push('/market')
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
      const host = window.location.host
      window.open('http://' + host + '/makeup')
    },
    logout () {
      this.$ls.clear()
      window.location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.headTop{
  padding: 8px 12vw 10px 12vw;
  display: flex;
  text-align: right;
  background-color: #f3f3f3;
  justify-content : flex-end;
  font-size: 0.8rem;
  position: relative;
  min-height: 36px;
  .companyName{
    position: absolute;
    left: 12.5vw;
    color: #333;
    letter-spacing: 1px;
  }
}
.headTop div{
  margin: 0 15px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.headTop .enterBtn{
  background-color: #d5ffbb;
  padding: 2px 10px;
  border-radius: 5px;
}
.enterBtn img{
   width:1.2rem;
   margin-top: -4px;
}
.iconSearch{
   padding: 15px 12vw 10px 12vw;
   overflow: hidden;
}
.iconSearch .icon{
  float: left;
  height: 45px;
  margin-top: -10px;
}
.topBar{
  width: 100%;
  background-color: #fff;
  padding: 30px 0 12px 0;
  .tabBar{
    width: 1330px;
    margin: auto;
    display: flex;
    font-size: 1rem;
    color: #000;
    position: relative;
    a{
      margin-right: 40px;
      color: #222;
      div{
        min-width: 60px;
        text-align: center;
        cursor: pointer;
      }
      img{
        width: 125px;
        float: left;
        margin-top: -20px;
      }
    }
  }
}
.bar_Active{
  border-bottom: 3px solid #ff5c30;
  font-weight: bold;
}

</style>
