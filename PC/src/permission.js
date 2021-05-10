import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Vue from 'vue'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import router from '@/router'
import { USERID, GUID } from '@/store/mutation-types'
import { Modal } from 'ant-design-vue'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'home', 'market', 'home_market', 'home_market_detial', 'Help_help'] // no redirect whitelist   'main', 'market', 'company', 'produce', 'prodetial', 'home', 'app', 'vipDetial'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  const userID = Vue.ls.get(USERID)

  if (userID) {
    // 处理搜题跳转过来的情况(会带toUrl过来)
    const toUrl = decodeURIComponent(to.query.toUrl)
    if (toUrl && toUrl !== 'undefined') {
      const guid = Vue.ls.get(GUID)
      let url = ''
      if (toUrl.indexOf('?') > -1) {
        url = toUrl + '&userID=' + userID + '&guid=' + guid
      } else {
        url = toUrl + '?userID=' + userID + '&guid=' + guid
      }
      window.location.href = url
      NProgress.done()
      return
    }

    const redirect = decodeURIComponent(to.query.redirect || to.path)
    if (redirect === '/login' || redirect === '/' || redirect === '/index.html') {
      next({ path: '/home' })
    } else if (to.path === redirect) {
      next()
    } else if (redirect.indexOf('/workForOthers') > -1) { // 登录后如果要重定向去协同页面是不给的
      next({ path: '/home' })
    } else {
      // 跳转到目的路由
      next({ path: redirect })
    }
    NProgress.done()
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/home', query: { redirect: to.fullPath } })
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
  Modal.destroyAll()
})
