<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>

// eslint-disable-next-line camelcase
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { message } from 'ant-design-vue'

export default {
  name: 'App',
  data () {
    return {
      zh_CN
    }
  },
  created: function () {
    message.config({
      top: `110px`,
      duration: 2
      // maxCount: 3
    })
  }
}
</script>

<style>
#app {
  font-size: 16px;
  letter-spacing: 1px;
  min-width:1440px;
  min-height:900px;
  width: 100%;
  height: 100%;
}
</style>
