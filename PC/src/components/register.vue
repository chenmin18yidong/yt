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
      <input type="text" v-model="psw" placeholder="设置密码">
      <span class="errTip">{{ pswErrtip }}</span>
    </div>

    <div class="xieyi">
      <!--  -->
      <a-radio :checked="checkXiey" @click="checkXiey = !checkXiey">
        我已阅读并同意<span @click="openFWxieyi">《刷题神器服务协议》</span>
        <div style="padding-left:30px;">和<span @click="openYSxieyi">《刷题神器隐私政策》</span></div>
      </a-radio>
    </div>

    <div v-if="checkXiey" class="loginBtn" @click="goRegister">
      注册
    </div>
    <div v-else class="loginBtnDown">
      注册
    </div>

  </div>
</template>

<script>
import { hexMd5 } from '../utils/md5'
import { userInsert, userLogin, getVerifyCode, isRegistered, checkVerifyCode, namerepeat } from '@/api/user'
import { USERID, GUID, USERNAME, USERNUMBER } from '@/store/mutation-types'
import { getQueryString } from '@/utils/utils'
import { pcRegisteredInvite, inviteUserList } from '@/api/invite'
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
      nikeName: '',
      psw: '',

      timeCount: 0,
      checkXiey: false,

      picGuidCode: '',
      vrfPic: '',
      /* 提示 */
      telErrtip: '',
      picVarifErrtip: '',
      telCodeErrtip: '',
      nikeNameErrtip: '',
      pswErrtip: ''
    }
  },
  created () {
    const tel = getQueryString('tel')
    if (tel) {
      this.telephone = tel
    }
    this.getVrfPic()
  },
  methods: {
    goRegister: async function () {
      /* 各种检查检查一遍 */
      await this.checktelInput()
      this.checkpicVarif()
      // await this.checknikeName()
      this.checkPsw()
      if (this.telErrtip || this.picVarifErrtip || this.telCodeErrtip || this.nikeNameErrtip || this.pswErrtip) {
        // 有错误返回
        return
      }

      const deviceId = 'pc'
      const md5Psw = hexMd5(this.psw)
      const param = {
        userNumber: this.telephone,
        passWord: md5Psw,
        code: this.telVarif,
        parentID: 0,
        phoneSN: deviceId
      }
      const inviteCode = getQueryString('inviteCode')
      if (inviteCode) {
        param['inviteCode'] = inviteCode
        this.inviteNewRegister(param)
      } else {
        this.normalRegister(param)
      }
    },
    // 邀新助力的注册
    inviteNewRegister (param) {
      pcRegisteredInvite(param).then(res => {
        // 注册成功，去登陆
        userLogin(this.telephone, param.passWord).then(data => {
          this.$ls.set(USERID, data[0].UserID)
          this.$ls.set(USERNAME, data[0].UserName)
          this.$ls.set(USERNUMBER, this.telephone)
          this.$ls.set(GUID, data[0].guid)
          // 查询助力结果
          inviteUserList(param.inviteCode, data[0].UserID).then(result => {
            switch (result.result) {
              case 'success':
                this.$message.success('助力成功，感谢您为我助力!', 0)
                break
              case 'register':
                this.$message.warning('抱歉，您已注册过刷题神器，不能再为他助力了!', 0)
                break
              case 'over':
                this.$message.info('您已为他助力过了哟!', 0)
                break
            }
            setTimeout(() => {
              window.location.reload()
            }, 5000)
          }, err => {
            this.$message.err('登陆失败了!')
            this.$info({
              title: '提示',
              content: err.message })
          })
        })
      }, err => {
        // console.log(err.message)
        if (err.status === 201) {
          this.$info({
            title: '提示',
            content: err.message })
        } else {
          this.$info({
            title: '提示',
            content: '服务器异常，请稍后重试，注册' + err.status })
        }
      })
    },
    // 普通的注册
    normalRegister (param) {
      userInsert(param).then(res => {
        // 注册成功，去登陆
        userLogin(this.telephone, param.passWord).then(data => {
          this.$message.success('注册成功!')
          this.$ls.set(USERID, data[0].UserID)
          this.$ls.set(USERNAME, data[0].UserName)
          this.$ls.set(USERNUMBER, this.telephone)
          this.$ls.set(GUID, data[0].guid)
          window.location.reload()
        }, err => {
          this.$message.err('登陆失败了!')
          this.$info({
            title: '提示',
            content: err.message })
        })
      }, err => {
        // console.log(err.message)
        if (err.status === 201) {
          this.$info({
            title: '提示',
            content: err.message })
        } else {
          this.$info({
            title: '提示',
            content: '服务器异常，请稍后重试，注册' + err.status })
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
        this.telErrtip = '*该手机号码已注册'
      }, err => {
        if (err.status === 201) {
          this.telErrtip = ''
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
    checknikeName: async function () {
      if (!this.nikeName) {
        this.nikeNameErrtip = '*请输入昵称'
        return
      }
      await namerepeat(this.nikeName).then(res => {
        this.nikeNameErrtip = ''
      }, err => {
        if (err.status === 201) {
          this.nikeNameErrtip = '*该昵称已被占用'
        }
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
