<template>
  <div class="menu">
    <div class="menu-header-icon" v-if="isExpand">
      <div class="t-icon">
        <img src="/logo.png" alt="icon">
      </div>
    </div>
    <div class="shrink-icon"><img v-if="!isExpand" src="@/imgs/stsq/tubiao_icon.png" alt=""></div>

    <transition name="shrink-fade">
      <div v-show="!isExpand">
        <div
          v-for="(item,idx) in menuList"
          :key="'shrink-menu'+idx"
          :class="item.selected ? 'shrink-menu-item shrink-active' : 'shrink-menu-item'"
          @click="menuClick(item)">
          <a-tooltip placement="right">
            <template slot="title">
              <span>{{ item.meta && item.meta.title }}</span>
            </template>
            <div class="img"><img :src="item.meta && item.meta.icon" :alt="item.meta && item.meta.title" /></div>
          </a-tooltip>
        </div>
      </div>
    </transition>
    <transition name="exp-fade">
      <div v-show="isExpand">
        <div v-for="(item,idx) in menuList" :key="'exp-menu'+idx" :class="item.selected ? 'exp-menu-item exp-active' : 'exp-menu-item'" @click="menuClick(item)">
          <div class="img"><img :src="item.meta && item.meta.icon" :alt="item.meta && item.meta.title"></div>
          <div>{{ item.meta && item.meta.title }}</div>
        </div>
      </div>
    </transition>
    <div class="swap-expand" @click="swapExpand">
      <a-icon type="swap" />
    </div>
  </div>
</template>
<script>
import { getKSbaoToken } from '@/api/ksbao'
import { USERNAME, USERNUMBER } from '@/store/mutation-types'

export default {
  props: {
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      menuList: []
    }
  },
  created: function () {
    const routes = this.$router.options.routes
    let childrenList = null
    routes.forEach(el => {
      if (el.name === 'index') {
        childrenList = el.children
      }
    })
    childrenList = childrenList.filter(val => val.meta && val.meta.hidden !== true)
    this.menuList = childrenList
  },
  mounted: function () {
    this.initSelect()
  },
  watch: {
    $route: function () {
      this.initSelect()
    }
  },
  methods: {
    initSelect: function () {
      const curRouterName = this.$route.name
      const menuList = JSON.parse(JSON.stringify(this.menuList))
      menuList.forEach(el => {
        if (el.children !== undefined) {
          el.selected = this.checkRoute(el, curRouterName)
        } else {
          if (el.name === curRouterName) {
            el.selected = true
          } else {
            el.selected = false
          }
        }
      })
      this.menuList = menuList
    },
    menuClick: async function (item) {
      if (item.selected) return
      if (item.meta && item.meta.link) {
        let link = item.meta.link
        if (item.meta.ksbaoToken) {
          const token = await this._getKSbaoToken()
          if (token === '') return

          link += `&token=${token}`
        }
        const a = document.createElement('a')
        a.target = '_brank'
        a.href = link
        a.click()
        return
      }
      this.$router.push({ name: item.name })
    },
    swapExpand: function () {
      this.$emit('changeExpand')
    },
    checkRoute: function (route, curRouterName) {
      const childrenList = route.children
      if (route.name === curRouterName) {
        return true
      } else if (childrenList !== undefined) {
        for (let i = 0; i < childrenList.length; i++) {
          const r = childrenList[i]
          const result = this.checkRoute(r, curRouterName)
          if (result) return true
        }
      } else {
        return false
      }
    },
    _getKSbaoToken: function () {
      const userName = this.$ls.get(USERNAME)
      const userNumber = this.$ls.get(USERNUMBER)
      return new Promise(resolve => {
        getKSbaoToken(userName, userNumber).then(data => {
          resolve(data.guid)
        }, err => {
          this.$message.error(err.message)
          resolve('')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  img {
    width: 100%;
    height: auto;
  }
  .menu {
    overflow: auto;
    color: black;
    height: 100%;
    font-size: 1.2em;
    position: relative;
  }
  .menu-header-icon {
    width: 60%;
    margin: 25px auto 30px auto;
  }
  .menu-header-icon .t-icon {
    width: 100%;
  }
  .shrink-icon {
    width: 80%;
    margin: 10px auto;
  }
  .exp-menu-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 15px;
  }
  .exp-menu-item.exp-active {
    background-color: rgb(254, 230, 193);
    border-top-left-radius: 40px;
    font-weight: 600;
    border-bottom-left-radius: 40px;
  }
  .exp-menu-item .img {
    width: 56px;
    padding: 8px 10px 8px 20px;
  }
  .shrink-menu-item {
    cursor: pointer;
  }
  .shrink-menu-item .img{
    width:65px;
    padding: 14px 16px;
  }
  .shrink-menu-item.shrink-active {
    background-color: rgb(254, 230, 193);
  }
  .swap-expand {
    position: absolute;
    right: 6px;
    bottom: 40px;
    font-size: 1.6em;
    color: #4f565e;
    background-color: #fee6c1;
    padding: 0 10px;
    cursor: pointer;
  }

  .shrink-fade-enter-active, .exp-fade-enter-active{
    transition: opacity .5s;
  }
  .shrink-fade-enter, .exp-fade-enter {
    opacity: 0;
  }

</style>
