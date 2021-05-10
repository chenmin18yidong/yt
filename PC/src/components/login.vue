/* eslint-disable vue/max-attributes-per-line */
<template>
  <div>
    <div class="logInputCt">
      <div class="loginput">
        <div class="inputCt">
          <input
            type="tel"
            maxlength="11"
            placeholder="请输入手机号码"
            v-model="telephone"
            @blur="checktelInput">
        </div>
        <span class="errTip">{{ telErrtip }}</span>
      </div>
      <div class="loginput">
        <div class="inputCt"><input type="password" v-model="psw" placeholder="请输入密码"></div>
        <span class="errTip">{{ pwdErrtip }}</span>
      </div>
      <span class="goforgetPsw" @click="goForgetPsw">忘记密码</span>
    </div>
    <div @click="login" class="loginBtn">
      登录
    </div>
  </div>
</template>

<script>
import { USERID, GUID, USERNAME, USERNUMBER } from '@/store/mutation-types'

// eslint-disable-next-line camelcase
import { hexMd5 } from '@/utils/md5'
import { userLogin, isRegistered } from '@/api/user'
import { getQueryString } from '@/utils/utils'

export default {
  name: 'Login',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      telephone: '',
      telErrtip: '',
      psw: '',
      pwdErrtip: ''
    }
  },
  mounted () {
    const self = this
    document.onkeydown = function (e) { // 回车提交表单
      // 兼容FF和IE和Opera
      var theEvent = window.event || e
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code === 13) {
        self.login()
      }
    }
  },
  methods: {
    checktelInput: async function () {
      // console.log('检测检测')
      // 手机号码验证!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.telephone))
      if (!this.telephone.length) {
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
          this.$message.error('网络异常，请稍后尝试!')
        }
      })
    },
    login () {
      this.checktelInput()
      if (this.telErrtip) {
        return
      }
      if (!this.psw) {
        this.pwdErrtip = '*请输入密码!'
        return
      }
      const md5Psw = hexMd5(this.psw)
      userLogin(this.telephone, md5Psw).then(data => {
        this.$ls.set(USERID, data[0].UserID)
        this.$ls.set(USERNAME, data[0].UserName)
        this.$ls.set(USERNUMBER, this.telephone)
        this.$ls.set(GUID, data[0].guid)
        this.$ls.set('SLOGAN', data[0].slogan)
        this.$ls.set('INTRODUCTION', data[0].introduction)

        setTimeout(function () {
          let toUrl = getQueryString('toUrl')
          if (toUrl) {
            toUrl = decodeURIComponent(toUrl)
            if (toUrl.indexOf('?') > -1) {
              window.location.href = toUrl + '&userID=' + data[0].UserID + '&guid=' + data[0].guid
            } else {
              window.location.href = toUrl + '?userID=' + data[0].UserID + '&guid=' + data[0].guid
            }
          } else {
            window.location.reload()
          }
        }, 500)
      }, err => {
        this.$message.error('登陆失败了!')
        this.$info({
          title: '提示',
          content: err.message })
      })
    },
    goForgetPsw () {
      this.$emit('goforgetpsw')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loginBtn{
  text-align: center;
  color: #fff;
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#f59a1f), color-stop(30%, #f88b17), color-stop(100%, #fe6804));
  padding: 8px;
  border-radius: 10px;
  margin-top: 70px;
  cursor: pointer;
  user-select: none;
  letter-spacing: 5px;
}
.loginBtn:active{
  background-color: #fdd090;
}

.goforgetPsw{
  float: right;
  padding-top: 15px;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid;
  font-size: 0.8rem;
}

input{
  outline: none;
  border: none;
  width: 100%;
}
 input::-webkit-input-placeholder {
  color: #999;
 }

.loginput .inputCt{
  width: 95%;
  margin: 8px 0;
  font-size: 0.9rem;
}
.inputCt{
  padding-left: 10px;
}
.loginput{
  width: 100%;
  display: flex;
  border: 1px solid #ccc;
  margin-top: 20px;
  position: relative;
  border-radius: 5px;
}
.errTip{
  position: absolute;
  right: 0;
  bottom: -20px;
  color: red;
  font-size: .6em;
}
.logInputCt{
  margin-top: 30px;
}
</style>
