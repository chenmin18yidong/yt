import { message } from 'ant-design-vue'
import config from '@/config/project.config'
import Vue from 'vue'
import { USERID, GUID } from '@/store/mutation-types'

/**
 * 时间格式化
 * @param {*} date 时间
 * @param {*} fmt 格式 'yyyy-MM-dd hh:mm:ss'
 */
export const formatDate = function (date, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 获取url参数（工具方法）
 * @param {string} name 参数名
 * @date 2019-04-17 16:01:23
 * @version V1.0.0
 */
export const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 * 复制到剪贴板
 * @param {string} content 复制的内容
 * @param {string} msg 复制成功后的提示
 * @author tfj
 * @date 2019-12-09 15:07:06
 * @version V1.0.0
 */
export const copyToClip = function (content, msg) {
  var aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  if (msg == null) {
    message.success('复制成功')
  } else {
    message.success(msg)
  }
}

/**
 * 下载文件
 * @description
 * @author tfj
 * @date 2019-12-20 09:40:19
 * @version V1.0.0
 */
export const downloadFile = function (url, type, params = {}) {
  const form = document.createElement('form')
  form.style.visibility = 'hidden'
  form.method = type
  form.target = '_brank'
  form.action = config.stsqurl + url
  if (type === 'post') {
    params.guid = Vue.ls.get(GUID)
    params.userID = Vue.ls.get(USERID)
  }
  const keys = Object.keys(params)

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (params[key] === '' || params[key] == null) continue
    const input = document.createElement('input')
    input.name = key
    input.value = params[key]
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
