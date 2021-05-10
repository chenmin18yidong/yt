import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/exam', name: 'enter', component: r => { require(['@/exam/views/enter'], r) }, meta: { title: '入口' } },
  {
    path: '/exam/testInfo',
    name: 'testInfo',
    component: () => import(/* webpackChunkName: "takeExam" */ '@/exam/views/testInfo.vue')
  },
  {
    path: '/exam/doExam',
    name: 'doExam',
    component: () => import(/* webpackChunkName: "takeExam" */ '@/exam/views/doExam.vue')
  }, {
    path: '/exam/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "takeExam" */ '@/exam/views/testResult.vue')
  },
  //  {
  //   path: '/main',
  //   name: 'main',
  //   component: () => import(/* webpackChunkName: "takeExam" */ '@/views/Home/Main.vue')
  // },
  // {
  //   path: '/market',
  //   name: 'market',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home/Market.vue')
  // }, {
  //   path: '/company',
  //   name: 'company',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home/Company.vue')
  // }, {
  //   path: '/produce',
  //   name: 'produce',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home/Produce.vue')
  // }, {
  //   path: '/prodetial',
  //   name: 'prodetial',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home/ProDetial.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  // router mode eq 'history' requires 404 error
  {
    path: '*',
    component: () => import(/* webpackChunkName: "takeExam" */ '@/views/STSQ/Exception/404.vue')
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routes
})
