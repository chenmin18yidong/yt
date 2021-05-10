'use strict'
import Vue from 'vue'
import { message } from 'ant-design-vue'
import { USERID, GUID } from '@/store/mutation-types'
import config from '@/config/project.config'

export const ckHttp = new Request(config.ckurl)
export const thridPartyHttp = new Request(config.wxThridPartyUrl)
export const stsqHttp = new Request(config.stsqurl)
export const Req = Request
// export default new Request();

const reqTimeOut = config.timeOut
function Request (ip) {
  this.Ajax = function (action, data = {}, method = 'post') {
    // eslint-disable-next-line eqeqeq
    if (Vue.ls.get(USERID) && Vue.ls.get(USERID) != -1 && !data['userID']) {
      data['userID'] = Vue.ls.get(USERID)
    }

    if (Vue.ls.get(GUID) && !data['guid']) {
      data['guid'] = Vue.ls.get(GUID)
    }

    data['client'] = 0 // pc

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const elem = data[key]
        if (elem === undefined || elem === '') {
          delete data[key]
        }
      }
    }

    const promise = new Promise(function (resolve, reject) {
      method = method.toUpperCase()
      let url = ip + action

      let xhr = null
      if (window.XMLHttpRequest) { // code for IE7, Firefox, Opera, etc.
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) { // code for IE6, IE5
        /* eslint-disable-next-line */
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      let sendData = null
      if (method === 'POST' || method === 'PUT') {
        sendData = paramsParse(data)
      } else if (method === 'GET') {
        sendData = paramsParse(data)
        url += '?' + sendData + '&_=' + Date.now()
      }

      xhr.open(method, url, true)
      xhr.timeout = reqTimeOut

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

      if (method === 'GET') {
        xhr.send()
      } else if (method === 'POST' || method === 'PUT') {
        xhr.send(sendData)
      }

      xhr.onreadystatechange = function () {
        // console.log(this.responseText);=
        if (this.readyState === 4) {
          if (xhr.status === 200) {
            let resJson = null
            try {
              resJson = JSON.parse(xhr.responseText)
            } catch (e) {
            // eslint-disable-next-line prefer-promise-reject-errors
              reject({ url: action, status: 200, msg: 'Response Text parse failed!' })
              return
            }
            switch (resJson.status) {
              case 200:
                if (resJson.data) {
                  resolve(resJson.data)
                } else {
                  resolve(resJson)
                }
                break
              case 201:
                // 201无数据不弹窗
                reject(resJson)
                break
              case 250:
                // 250非VIP用户
                reject(resJson)
                break
              case 305:
                // 登陆失效
                reject(resJson)
                break
              default:
                reject(resJson)
                message.error('操作失败！' + resJson.status + resJson.message)
                break
            }
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ url: action, status: 500, msg: 'Request failed!' })
          }
        }
      }
      xhr.ontimeout = function () {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ url: action, status: 408, msg: `Request timed out : ${reqTimeOut}ms` })
      }
      xhr.onerror = function () {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ url: action, status: 651, msg: 'Other NetWork Failed！' })
      }
    })

    return promise
  }
}
function paramsParse (param) {
  const par = []
  for (const key in param) {
    const tempArr = []
    tempArr.push(encodeURIComponent(key))
    tempArr.push('=')
    if (typeof (param[key]) === 'object') {
      tempArr.push(encodeURIComponent(JSON.stringify(param[key])))
    } else {
      tempArr.push(encodeURIComponent(param[key]))
    }
    par.push(tempArr.join(''))
  }
  const str = par.join('&')
  return str
}
