import Vue from 'vue'
import VueRouter from 'vue-router'

// import config from '@/config/project.config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'market',
    redirect: '/home/market',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/marketIndex.vue'),
    children: [{
      path: '/home/market',
      name: 'home_market',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home/market.vue'),
      meta: { activeBar: 'market' }
    }, {
      path: '/home/market_detial',
      name: 'home_market_detial',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home/paperDetial.vue'),
      meta: { activeBar: 'detial' }
    },
    {
      path: '/Help/help',
      name: 'Help_help',
      component: () => import(/* webpackChunkName: "home" */'@/views/Help/help.vue'),
      meta: { title: '帮助教程' }
    }
    ]
  },
  // router mode eq 'history' requires 404 error
  {
    path: '*',
    component: () => import(/* webpackChunkName: "stsq" */ '@/views/STSQ/Exception/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
