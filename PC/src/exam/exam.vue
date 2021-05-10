<template>
  <a-locale-provider :locale="zh_CN">
    <div id="exam" style="min-width:1440px;">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>

// eslint-disable-next-line camelcase
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { message } from 'ant-design-vue'

export default {
  name: 'Exam',
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
#exam {
  font-size: 1rem;
  letter-spacing: 1px;
}
</style>
