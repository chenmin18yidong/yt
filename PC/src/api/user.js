import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/*
  *https://stsqapi.tibosi.com/user/login
  参数名 必选 类型 说明
  userNumber 是 string 用户填入的手机号
  passWord 是 string 密码(MD5)
  client 是 int 客户端编号，IOS： 2
  */
export const userLogin = (userNumber, passWord) => stsqReq('/user/login', { userNumber, passWord })

/* 检测用户填写的手机号是否重复注册 */
export const isRegistered = (userNumber) => stsqReq('/user/isRegistered', { userNumber })

/*
  用户忘记密码
  userNumber 是 string 用户填入的手机号
  passWord 是 string 修改密码(MD5)
  code 是 int 验证码
  */
export const forgetPassWord = (userNumber, passWord, code) => stsqReq('/user/forget/passWord', { userNumber, passWord, code })
/* 检测用户填写的昵称是否存在 */
export const namerepeat = (userName) => stsqReq('/user/name/repeat', { userName })
/*
  修改用户昵称
  参数: userID 用户ID userName 用户昵称 slogen用户签名 type固定传-1 guid client客户端ID，ios传2
*/
export const nameupdate = (data) => stsqReq('/user/name/update', data)
/*
 *修改用户简介
  参数: intro
*/
export const updateIntro = (intro) => stsqReq('/user/updateIntro', { intro })

/* 获取验证码的GUID
  图片验证码地址  https://stsqyzm.tibosi.com/VerificationCode/CreateVerificationCode/?guid=guidCode
  */
export const getVerifyCode = () => stsqReq('/user/getVerifyCode_new', {}, 'get')
/* 校验用户输入的验证码并发送短信
    verifyCode 是 int 图片验证码
    phoneNum 是 int 用户手机号
    guidCode 是 string 请求图片验证码guid
    client 是 int  客户端代码 IOS：2
*/
export const checkVerifyCode = (verifyCode, phoneNum, guidCode) => stsqReq('/user/checkVerifyCode_new', { verifyCode, phoneNum, guidCode })

/*
  用户注册接口
  userNumber是 string 用户填入的手机号
  userName 是string 用户昵称
  passWord 是string 密码(转成MD5)
  code 是string 验证码
  parentID 是string 游客ID 默认传0
  phoneSN 是string 设备串号
  client 是int 客户端编号，IOS： 2
*/
export const userInsert = (data) => stsqReq('/user/insert', data)

/**
 * 检测Vip
 * @description
 * @author tfj
 * @date 2019-12-12 11:05:34
 * @version V1.0.0
 */
export const checkVipStatus = () => stsqReq('/vip/isVip')

/**
 * 检测时候企业用户
 * @description
 * @author tfj
 * @date 2019-12-18 15:25:46
 * @version V1.0.0
 */
export const checkBusinessStatus = () => stsqReq('/user/isBusinessUser')
/**
 * 获取用户公司名称
 * @description
 * @author ty
 * @date 2020-01-06 17:09:31
 * @version V1.0.0
 */
export const getBusinessUser = () => stsqReq('/user/getBusinessUser')
/**
 * 更新用户公司名称
 * @description
 * @author ty
 * @date 2020-01-06 17:09:31
 * @version V1.0.0
 */
export const updateBusinessUser = (businessName) => stsqReq('/user/updateBusinessUser', { businessName })
/**
 * 修改密码
 * @description
 * @author ty
 * @date 2020-01-06 17:09:31
 * @version V1.0.0
 */
export const passWordupdate = (passWord) => stsqReq('/user/passWord/update', { passWord })
