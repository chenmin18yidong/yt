<template>
  <!-- Login -->
  <div class="Login">
    <div class="top">
      <comHeader activePage="login"> </comHeader>
    </div>

    <div class="main">
      <div class="input_Contain">
        <div class="swiper-container swiper-no-swiping">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="@/imgs/login/banner1.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="@/imgs/login/banner2.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="@/imgs/login/banner3.png" alt="">
            </div>
          </div>
          <!-- <div class="swiper-pagination"></div> -->
        </div>
        <div class="input_Ct">
          <div v-if="type=='forgetPsw'" class="active">
            <a-icon @click="type='login'" type="left" style="float:left;margin-top:5px;" />
            忘记密码
          </div>
          <div v-else class="login_title">
            <div :class="[type==='login'?'active':'']" @click="type='login'">登录</div>
            <div :class="[type==='register'?'active':'']" @click="type='register'">注册</div>
          </div>

          <div class="contain">
            <login v-if="type=='login'" @goforgetpsw="type='forgetPsw'"></login>
            <register v-if="type=='register'" @back="type='login';"></register>
            <forgetPsw v-if="type=='forgetPsw'" @back="type='login';"></forgetPsw>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="rightPart">
      <div class="contain">
        <login v-if="type=='login'" @goregister="type='register'" @goforgetpsw="type='forgetPsw'"></login>
        <register v-if="type=='register'" @back="type='login';"></register>
        <forgetPsw v-if="type=='forgetPsw'" @back="type='login';"></forgetPsw>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
.Login{
  width: 100%;
  min-width: 1024px;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
.top{
  top: 0;
  z-index: 888;
  min-width: 1024px;
  width: 100%;
  flex-shrink: 0;
}
.main{
  height: 100%;
  background: url('~@/imgs/login/bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.input_Contain{
  width: 1440px;
  margin: auto;
  padding: 60px;
  background-color: #fff;
  position: absolute;
  top: 52%;
  transform: translateY(-60%);
  left: calc(50% - 720px);
  border-radius: 15px;
  box-shadow: 0px 0px 5px #ffe3cf;
  display: flex;
  overflow: hidden;
}
.swiper-container{
  width: 873px;
  height: 440px;
  flex-shrink: 0;
  overflow: hidden;
  margin: 0;
}
.swiper-container img{
  width: 100%;
  height: 100%;
}
.input_Ct{
  width: 100%;
  margin: 0 30px 0 100px;
}
.login_title{
  display: flex;
  cursor: pointer;
}
.login_title div{
  width: 50%;
  margin-left: 2px;
  color: #666 ;
  border-bottom: 2px solid #666;
  padding: 5px 0;
  font-size: 1.1rem;
  text-align: center;
}
.active{
  color: #f7931b !important;
  border-bottom: 2px solid #fb760c !important;
  text-align: center;
  font-size: 1.1rem;
  padding: 5px 0;
}
</style>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import login from '../components/login'
import register from '../components/register'
import forgetPsw from '@/components/forgetPsw'
import header from '@/components/header'
import { getQueryString } from '@/utils/utils'
export default {
  components: {
    comHeader: header,
    login: login,
    register: register,
    forgetPsw: forgetPsw
  },
  data: function () {
    return {
      type: 'login',
      mySwiper: null
    }
  },
  created () {
    const regist = getQueryString('register')
    if (regist) {
      this.type = 'register'
    }
  },
  mounted () {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000 // 5秒切换一次
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }

}
</script>
