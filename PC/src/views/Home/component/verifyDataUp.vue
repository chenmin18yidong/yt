<template>
  <div>
    <a-form id="varify" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item
        style="margin-bottom: 5px;"
        label="姓名"
        :validate-status="nameHelp?'error':'validating'"
        :help="nameHelp" >
        <a-input v-model="name" style="width:300px" @blur="checkCanSubmit()" placeholder="请输入姓名"/>
      </a-form-item>
      <a-form-item
        style="margin-bottom: 5px;"
        label="身份证"
        :validate-status="IDNumHelp?'error':'validating'"
        :help="IDNumHelp">
        <a-input v-model="IDNum" style="width:300px" @blur="checkIDNum" placeholder="请输入身份证号码" />
      </a-form-item>
      <a-form-item
        style="margin-bottom: 5px;"
        label="支付宝账号">
        <a-input v-model="ZFBid" style="width:300px" @blur="checkZFBIDNum" placeholder="请输入支付宝账号" />
      </a-form-item>
    </a-form>
    <a-form id="varifyPic" :label-col="{ span: 0 }" :wrapper-col="{ span: 23 }">
      <div class="uppicCt">
        <div class="imgTip">
          上传身份证照片
        </div>
        <div class="uptips">{{ uploadmsg }}</div>
        <div class="imgLine">
          <div class="imgCt">
            <a-form-item>
              <a-upload-dragger
                @change="IDfrontPic"
                :beforeUpload="beforeUpload"
                name="file"
                :data="{client, userID, guid,type:1}"
                :action="uploadhost+url" >
                <div v-if="IDfrontBase64" class="viewImg">
                  <img :src="IDfrontBase64" alt="">
                </div>
                <div v-else>
                  <img class="imgPic" src="@/imgs/index_market/picUpload.png" alt="">
                  <p class="imgTip">点击上传身份证正面</p>
                </div>
              </a-upload-dragger>
            </a-form-item>
          </div>
          <div class="imgCt">
            <a-form-item>
              <a-upload-dragger
                @change="IDbackPic"
                :beforeUpload="beforeUpload"
                name="file"
                :data="{client, userID, guid,type:3}"
                :action="uploadhost+url" >
                <div v-if="IDbackBase64" class="viewImg">
                  <img :src="IDbackBase64" alt="">
                </div>
                <div v-else>
                  <img class="imgPic" src="@/imgs/index_market/picUpload.png" alt="">
                  <p class="imgTip">点击上传身份证反面</p>
                </div>
              </a-upload-dragger>
            </a-form-item>
          </div>
        </div>
        <div class="tipBot">
          1.实名认证通过后，不可修改实名信息；<br>
          2.提现操作只能提现到本人名下的支付宝账户中；<br>
          3.姓名、身份证信息、支付宝账号必须是同一个人的信息。
        </div>
      </div>
    </a-form>
    <div v-if="canSubmit" class="upBtn" @click="goSubMit">
      开始认证
    </div>
    <div v-else class="cannotupBtn" @click="checkCanSubmit(true)">
      开始认证
    </div>
  </div>
</template>
<script>
import { verification } from '@/api/marketApi'
import config from '@/config/project.config'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  inject: ['reload'],
  data: function () {
    return {
      name: '',
      nameHelp: '',
      IDNum: '',
      IDNumHelp: '',
      ZFBid: '',
      ZFBHelp: '',
      IDfrontName: '',
      IDfrontBase64: '',
      IDbackName: '',
      IDbackBase64: '',
      cardName: '',
      cardBase64: '',
      uploadhost: config.stsqurl,
      url: '/identity/uploadPersonalInfo',
      uploadmsg: '',
      userID: this.$ls.get('USERID'),
      guid: this.$ls.get('GUID'),
      client: 0,
      canSubmit: false
    }
  },
  methods: {
    goSubMit () {
      const param = {
        fullName: this.name,
        identifyNum: this.IDNum,
        idFront: this.IDfrontName,
        idBack: this.IDbackName,
        aliAcc: this.ZFBid
      }
      verification(param).then(res => {
        this.$message.success('绑定完成,请等待审核成功')
        this.reload()
        this.$emit('close')
      }, err => {
        this.$message.error(err.message)
      })
    },
    checkCanSubmit (showTip = false) {
      let canFlag = true
      if (!this.name) {
        canFlag = false
        if (showTip) {
          this.nameHelp = '请输入姓名'
        } else {
          this.nameHelp = ''
        }
      }
      if (!this.IDNum) {
        canFlag = false
        if (showTip) {
          this.IDNumHelp = '请输入身份证号'
        } else {
          this.IDNumHelp = ''
        }
      }
      if (this.IDNumHelp) {
        canFlag = false
      }
      if (!this.ZFBid) {
        canFlag = false
        if (showTip) {
          this.ZFBHelp = '请输入支付宝账号'
        } else {
          this.ZFBHelp = ''
        }
      }
      if (!this.IDbackName) {
        canFlag = false
        if (showTip) {
          this.uploadmsg = '请上传身份证正面照'
        } else {
          this.cardNumHelp = ''
        }
      }
      if (!this.IDfrontName) {
        canFlag = false
        if (showTip) {
          this.uploadmsg = '请上传身份证反面照'
        } else {
          this.cardNumHelp = ''
        }
      }
      this.canSubmit = canFlag
    },
    checkIDNum () {
      if (!this.IDNum) {
        this.IDNumHelp = ''
        return
      }
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(this.IDNum) === false) {
        this.IDNumHelp = '身份证输入不合法'
      } else {
        this.IDNumHelp = ''
        this.checkCanSubmit()
      }
    },
    checkZFBIDNum () {
      if (!this.ZFBid) {
        this.ZFBHelp = '请输入支付宝账号'
      }
    },
    async IDfrontPic (info) {
      if (!info.file.response) return
      if (info.file.response.status === 200) {
        this.IDfrontName = info.file.response.data.fileName
        this.IDfrontBase64 = await getBase64(info.file.originFileObj)
        this.checkCanSubmit()
      } else if (info.file.response.status === 350) {
        this.uploadmsg = '登录状态失效，请重新登录！'
      } else {
        this.uploadmsg = info.file.response.data.errMessage
      }
    },
    async IDbackPic (info) {
      if (!info.file.response) return
      if (info.file.response.status === 200) {
        this.IDbackName = info.file.response.data.fileName
        this.IDbackBase64 = await getBase64(info.file.originFileObj)
        this.checkCanSubmit()
      } else if (info.file.response.status === 350) {
        this.uploadmsg = '登录状态失效，请重新登录！'
      } else {
        this.uploadmsg = info.file.response.data.errMessage
      }
    },
    beforeUpload (file, fileList) {
      const reg = /\.(jpg|jpeg|png|gif)(\?.*)?$/
      return new Promise((resolve, reject) => {
        let flag = true
        if (!reg.test(file.name)) {
          flag = false
          this.uploadmsg = '“' + file.name + '”不是图片文件，请选择jpg/jpeg/png/gif文件类型！'
        }
        if (file.size > 2097152) {
          this.uploadmsg = '“' + file.name + '”文件过大，最大可上传2MB的文件'
          flag = false
        }
        if (file.size === 0) {
          this.uploadmsg = '不能上传文件夹或空图片（大小为0字节）！'
          flag = false
        }
        if (flag) {
          this.uploadmsg = ''
          resolve()
        } else {
          reject(new Error('请上传图片文件'))
        }
      })
    }

  }
}
</script>
<style lang="less" scope>
  .Verify{
    text-align: center;
  }
  .uppicCt{
    border-top: 1px solid #eee;
    .imgTip{
      padding: 5px 0;
      font-size: 1.2rem;
    }
    .imgLine{
      overflow: hidden;
      margin: 5px 0;
      .imgCt{
        width: 50%;
        float: left;
        .imgPic{
          width: 50px;
        }
        .imgTip{
          color: #ddd;
          font-size: 1rem;
        }
      }
    }
    .uptips{
      color: red;
      line-height: 24px;
      font-size: 0.8rem;
    }
    .tipBot{
      margin: 10px 0;
      border-top: 1px solid #eee;
      padding: 10px 0;
      color: red;
      font-size: 0.8rem;
      line-height: 24px;
    }
  }
  .upBtn{
  background-color: #fd9607;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  text-align: center;
  color: #fff;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  &:active{
    background-color: #faaa3b;
  }
}
.cannotupBtn{
  background-color: #ccc;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  text-align: center;
  color: #fff;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}
.viewImg{
  width:224px;
  height:84px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
