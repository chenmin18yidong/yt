<template>
  <div class="header">
    <div>
      <!-- <span @click="goHome" class="icon_left"> 首页 </span>
      <span @click="goSearch" class="icon_left">搜题</span>
      <div @click="goMakeup" class="icon_left">在线组卷</div>
      <span @click="goApp" class="icon_left">APP</span>
      <span @click="goDetial" class="icon_left">版本详情</span> -->
    </div>
    <!-- <div><a-dropdown placement="bottomCenter">
      <div class="ant-dropdown-link" style="display:flex;line-height: 27px; ">
        <div class="img"> <img src="@/imgs/VIP.png" alt=""></div>
        <div class="icon-text">开通会员</div>
      </div>
      <a-menu slot="overlay" style="border-top:3px solid #ffb85f;">
        <a-menu-item @click="upgradeVIP">
          <div class="contact_down">
            普通会员
          </div>
        </a-menu-item>
        <a-menu-item @click="goBusiness">
          <div class="contact_down">
            企业会员
          </div>
        </a-menu-item>
      </a-menu></a-dropdown>
    </div> -->
    <div>
      <a-dropdown placement="bottomCenter">
        <div class="ant-dropdown-link" style="display:flex;line-height: 27px; ">
          <div class="img"> <img src="@/imgs/stsq/feedback_icon.png" alt=""></div>
          <div class="icon-text">联系客服</div>
        </div>
        <a-menu slot="overlay" style="border-top:3px solid #ffb85f;">
          <a-menu-item>
            <div class="contact_down">
              <img src="@/imgs/stsq/telephone.png" alt="">
              电话客服 <span>4007728869</span>
            </div>
          </a-menu-item>
          <a-menu-item>
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=335112905&site=qq&menu=yes">
              <div class="contact_down">
                <img src="@/imgs/stsq/qq.png" alt="">
                <a-tag color="#feb148">QQ客服</a-tag>
                <span>553879335</span>
              </div>
            </a>
          </a-menu-item>
          <a-sub-menu key="test" class="subMenu">
            <div slot="title" class="contact_down">
              <img src="@/imgs/stsq/wx.png" alt="">
              微信客服  <span>stsq2017</span>
            </div>
            <a-menu-item>
              <img style="width:150px;" src="@/imgs/stsq/wxFeedBack.jpg" alt="">
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-dropdown>
    </div>
    <div>
      <div class="img"><img src="@/imgs/stsq/wan_help_icon.png" alt=""></div>
      <div class="icon-text">帮助</div>
    </div>
    <div @click="$refs.download.showDownloadModal()">
      <div class="img"><img src="@/imgs/stsq/download_icon.png" alt=""></div>
      <div class="icon-text">app下载</div>
    </div>
    <div>
      <a-dropdown >
        <a class="ant-dropdown-link" style="position:relative;" href="#">
          <a-avatar style="backgroundColor: #ffffff" :size="40" :src="img"/>
          {{ nikeName }}
          <a-icon type="caret-down" />
          <div class="redIcon"></div>
        </a>
        <a-menu slot="overlay" style="border-top:5px solid #ffb85f;">
          <a-menu-item style="border-bottom:1px solid #e2e2e2;display:flex;">
            <div style="width:60px; position:relative;">
              <a-avatar style="backgroundColor: #e2e2e2" :size="54" :src="img"/>
              <img v-if="bus" style="position:absolute;bottom:0;right:0;width:30px;" src="@/imgs/stsq/comVip.png" alt="">
              <img v-else-if="vip" style="position:absolute;bottom:0;right:0;width:30px;" src="@/imgs/stsq/vip.png" alt="">
              <img v-else style="position:absolute;bottom:0;right:0;width:30px;" src="@/imgs/stsq/free.png" alt="">
            </div>
            <div style="min-width:140px;margin:5px 10px; position:relative;">
              <p style="letter-spacing: 2px;"> {{ nikeName }}</p>
              <!-- <a-tag v-if="!bus && vip" @click="upgradeVIP" color="#ff9900">续费</a-tag>
              <a-tag v-if="!bus && !vip" @click="upgradeVIP" color="#ff9900">升级会员</a-tag>

              <a-tag v-if="bus" @click="goBusiness" color="#ff5656">续费</a-tag>
              <a-tag v-else @click="goBusiness" color="#ff5656">升级企业版</a-tag> -->
            </div>

          </a-menu-item>
          <a-menu-item style="display:flex;">
            <!-- <div @click="goTakeExam" class="my_down_btn">
              <img src="@/imgs/stsq/gotest.png" alt="">
              <p>去考试</p>

            </div> -->
            <div @click="goSetting" class="my_down_btn">
              <img src="@/imgs/stsq/setting.png" alt="">
              <p>设置</p>
            </div>
            <div @click="loginOut" class="my_down_btn">

              <img src="@/imgs/stsq/exit.png" alt="">
              <p>退出</p>

            </div>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <DownloadCode ref="download" ></DownloadCode>
  </div>
</template>
<script>
import { USERNAME, GUID, USERID } from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import DownloadCode from '@/components/STSQ/Header/DownloadCode'
import img from '@/imgs/head.png'
import config from '@/config/project.config'
export default {
  components: {
    DownloadCode
  },
  data: function () {
    return {
      nikeName: '',
      img,
      guid: '',
      userID: ''
    }
  },
  created: async function () {
    this.initData()
    await this.$store.dispatch('IsVip').catch(e => {
      // console.error(e.msg)
    })
    await this.$store.dispatch('IsBus').catch(e => {
      // console.error(e.msg)
    })
  },
  computed: {
    ...mapGetters(['vip', 'bus'])
  },
  methods: {
    initData: function () {
      this.nikeName = this.$ls.get(USERNAME)
      this.guid = this.$ls.get(GUID)
      this.userID = this.$ls.get(USERID)
    },
    loginOut: function () {
      this.$ls.clear()
      window.location.reload()
    },
    goSetting () {
      this.$router.push('/index/setting')
    },
    goTakeExam () {
      window.location.href = '/exam'
      // const host = window.location.host
      // window.open('http://' + host + '/exam')
    },
    goTiku () {
      if (this.guid) {
        window.location.href = '/tiku/home?userID=' + this.userID + '&guid=' + this.guid
      } else {
        window.location.href = '/tiku/home'
      }
    },
    goBusiness () {
      this.$router.push({ name: 'user_bus' })
    },
    upgradeVIP: function () {
      // this.$info({
      //   title: '温馨提示',
      //   content: 'PC版暂无开通VIP功能，请到下载安装安卓客户端进行开通',
      //   onOk () {}
      // })
      this.$router.push('/index/user_vip')
    },
    goHome () {
      this.$router.push('/home')
    },
    goApp () {
      this.$router.push('/app')
    },
    goDetial () {
      this.$router.push('/vipDetial')
    },
    goMakeup () {
      window.location.href = '/makeup'
      // const host = window.location.host
      // window.open('http://' + host + '/makeup')
    },
    goSearch () {
      const guid = this.$ls.get(GUID)
      const userID = this.$ls.get(USERID)
      const a = document.createElement('a')
      if (guid) {
        a.href = config.searchUrl + '?userID=' + userID + '&guid=' + guid
      } else {
        a.href = config.searchUrl
      }
      a.click()
    }
  }
}
</script>
<style lang="less" scoped>
  .header {
    color: white;
    display: flex;
    align-items: center;
    align-content: center;
    font-size: 0.9em;
  }
  .header>div {
    display: flex;
    align-items: center;
  }
  .header>div:nth-child(n+2){
    flex-shrink: 0;
    margin-right: 45px;
    cursor: pointer;
    user-select: none;
  }
  .header>div:first-child {
    width: 100%;
  }
  .icon_left{
    padding-left: 30px;
    font-size: 1rem;
    cursor: pointer;
  }
  .img {
    width: 26px;
  }
 .img>img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .icon-text{
    line-height: 27px;
    padding-left: 5px;
  }
  .header>div>.ant-dropdown-link {
    color: white;
  }
  .subMenu /deep/ .ant-dropdown-menu-submenu-title > .ant-dropdown-menu-submenu-arrow{
   display: none;
  }
  .redIcon{
    position: absolute;
    top: 0;
    left: 32px;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .my_down_btn{
    width: 50%;
    text-align: center;
    padding: 5px 0;
  }
  .my_down_btn>img{
    width: 30px;
  }
  .my_down_btn>p{
    margin-bottom: 0px;
  }
  .contact_down{
    padding: 0px 20px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
  }
  .contact_down img{
    width: 30px;
  }
  .contact_down span{
    margin-left: 20px;
    float:right;
  }
</style>
