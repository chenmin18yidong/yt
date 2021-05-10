<template>
  <div>

    <div class="InputCT">
      <input
        placeholder="请输入手机号码"
        type="tel"
        maxlength="11"
        v-model="telephone"
        @blur="checktelInput">
      <span class="errTip">{{ telErrtip }}</span>
    </div>
    <div class="line">
      <div class="InputCT halfIn">
        <input placeholder="请输入验证码" type="number" v-model="picVarif" @blur="checkpicVarif">
        <span class="errTip">{{ picVarifErrtip }}</span>
      </div>
      <div class="verImgC">
        <img @click="getVrfPic" v-if="vrfPic" :src="vrfPic" alt="">
        <img v-else src="../imgs/loading_more.gif" alt="" style="width: 26px;height: 26px;">
      </div>

    </div>
    <div class="line">
      <div class="InputCT halfIn">
        <input type="text" v-model="telVarif" placeholder="请输入短信验证码">
        <span class="errTip">{{ telCodeErrtip }}</span>
      </div>
      <div v-if="timeCount" class="countBtn">
        {{ timeCount }}S
      </div>
      <div v-else class="sendTelCode" @click="sendTelCode">
        获取验证码
      </div>

    </div>
    <div class="InputCT">
      <input type="text" v-model="psw" placeholder="请输入新密码">
      <span class="errTip">{{ pswErrtip }}</span>
    </div>
    <div class="InputCT">
      <input type="text" @blur="checkPswAgain" v-model="pswAgain" placeholder="再次输入新密码">
      <span class="errTip">{{ pswAgainErrtip }}</span>
    </div>

    <div class="loginBtn" @click="changeforgetPsw">
      完成
    </div>

  </div>
</template>

<script>
import { hexMd5 } from '../utils/md5'
import { forgetPassWord, getVerifyCode, isRegistered, checkVerifyCode } from '@/api/user'
import { } from '../utils/utils'
export default {
  name: 'Register',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      telephone: '',
      picVarif: '',
      telVarif: '',
      psw: '',
      pswAgain: '',

      timeCount: 0,

      picGuidCode: '',
      vrfPic: '',
      /* 提示 */
      telErrtip: '',
      picVarifErrtip: '',
      telCodeErrtip: '',
      pswErrtip: '',
      pswAgainErrtip: ''
    }
  },
  created () {
    this.getVrfPic()
  },
  methods: {
    changeforgetPsw: async function () {
      /* 各种检查检查一遍 */
      await this.checktelInput()
      this.checkpicVarif()
      this.checkPsw()
      this.checkPswAgain()
      if (this.telErrtip || this.picVarifErrtip || this.telCodeErrtip || this.pswErrtip || this.pswAgainErrtip) {
        // 有错误返回
        return
      }
      const md5Psw = hexMd5(this.psw)
      /* userNumber,password,code */
      forgetPassWord(this.telephone, md5Psw, this.telVarif).then(res => {
        const self = this
        this.$info({
          title: '提示',
          content: '密码修改成功，去登陆试试',
          onOk () {
            self.goBack()
          }
        })
      }, err => {
        if (err.status === 201) {
          this.$info({
            title: '提示',
            content: err.message })
        } else {
          this.$info({
            title: '提示',
            content: '服务器异常，请稍后重试，忘记密码' + err.status })
        }
      })
    },
    getVrfPic () {
      getVerifyCode().then((res) => {
        this.picGuidCode = res.guidCode
        this.vrfPic = 'https://stsqyzm.tibosi.com/VerificationCode/CreateVerificationCode/?guid=' + res.guidCode
      })
    },
    checktelInput: async function () {
      // 手机号码验证
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.telephone))) {
        this.telErrtip = '*请填写正确的手机号码'
        return
      } else {
        this.telErrtip = ''
      }
      // 检验手机号是否注册过
      await isRegistered(this.telephone).then(res => {
        this.telErrtip = ''
      }, err => {
        if (err.status === 201) {
          this.telErrtip = '*该手机号码未注册'
        } else {
          this.$info({
            title: '提示',
            content: '网络异常，请稍后尝试' })
        }
      })
    },
    checkpicVarif () {
      if (!this.picVarif) {
        this.picVarifErrtip = '*请输入图片验证码'
      } else {
        this.picVarifErrtip = ''
      }
    },
    sendTelCode () {
      if (this.timeCount) {
        return
      }
      if (!this.telephone) {
        this.telErrtip = '*请填写手机号码'
        return
      }
      if (!this.picVarif) {
        this.picVarifErrtip = '*请输入图片验证码'
        return
      }
      this.timeCount = 60
      const self = this
      const timego = window.setInterval(function () {
        if (self.timeCount <= 0) {
          self.timeCount = 0
          window.clearInterval(timego)
        } else {
          self.timeCount = --self.timeCount
        }
      }, 1000)
      // 校验用户输入的图片验证码并发送短信
      checkVerifyCode(this.picVarif, this.telephone, this.picGuidCode).then(res => {
        this.$message.success('短信验证码已发送!')
      }, err => {
        if (err.status === 201) {
          this.picVarifErrtip = '*' + err.message
          self.timeCount = 0
        }
        // console.log(JSON.stringify(err))
      })
    },
    checkPsw () {
      if (!this.psw) {
        this.pswErrtip = '*请输入密码'
        return
      }
      if (this.psw.length < 6) {
        this.pswErrtip = '*密码长度不足6位'
      } else {
        this.pswErrtip = ''
      }
    },
    checkPswAgain () {
      if (this.psw !== this.pswAgain) {
        this.pswAgainErrtip = '*两次输入的密码不一致'
      } else {
        this.pswAgainErrtip = ''
      }
    },
    goBack () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>
.xieyi{
  margin: 15px 0;
  color: #222;
  cursor: pointer;
  user-select: none;
}
.xieyi input{
  width: 15px;
}
.xieyi span{
  color: #222;
  text-decoration: underline;
}

.line{
  /* overflow: hidden; */
  display: flex;
}
.halfIn{
  width: 60%;
}
.verImgC{
  width: 35%;
  margin-left: 5%;
  margin-top: 15px;
  background-color: #f3f3f3;
  height: 38px;
  border: 1px solid #999;
  border-radius: 5px;
  overflow: hidden;
}
.verImgC img{
  width: 100%;
  height: 100%;
}
.InputCT{
  padding:8px;
  margin-top: 15px;
  position: relative;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.errTip{
  position: absolute;
  right: 0;
  bottom: -15px;
  color: red;
  font-size: .6em;
}
input{
  outline: none;
  border: none;
  width: 100%;
}
 input::-webkit-input-placeholder {
  color: #999;
 }

.countBtn{
  width: 35%;
  margin-left: 5%;
  text-align: center;
  color: #fff;
  background-color: #ccc;
  border-radius: 2px;
  height: 42px;
  line-height: 40px;
  margin-top: 15px;
  border:1px solid #ccc;
  cursor: pointer;
  user-select: none;
}
.sendTelCode{
  width: 35%;
  margin-left: 5%;
  text-align: center;
  color: #fff;
  background-color: #f7931b;
  border-radius: 2px;
  height: 38px;
  line-height: 38px;
  margin-top: 15px;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
}
.loginBtnDown{
  text-align: center;
  color: #fff;
  background-color: #ccc;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  border:1px solid #ccc;
  cursor: pointer;
  user-select: none;
  letter-spacing: 5px;
}
.loginBtn{
  text-align: center;
  color: #fff;
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#f59a1f), color-stop(30%, #f88b17), color-stop(100%, #fe6804));
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;
  user-select: none;
  letter-spacing: 5px;
}

</style>
