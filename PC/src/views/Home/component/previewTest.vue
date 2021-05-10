<template>
  <dl class="previewTest">
    <div class="cover" v-if="loading">
      <a-spin/>
    </div>
    <dd v-for="item in testData" :key="'t'+item.allTestID">
      <div class="test_title">【{{ item.style }}】<span v-html="item.frontTitle"></span><span v-html="item.title"></span></div>
      <ul class="selectItem" v-if="item.selectedItems">
        <li v-for="(sitem,sidx) in item.selectedItems" :key="'s'+sidx">{{ sitem.ItemName }}. <span v-html="sitem.Content"></span></li>
      </ul>
    </dd>
  </dl>
</template>
<script>
import { questionsPay } from '@/api/marketApi'
import { PAPERID } from '@/store/mutation-types'
import handelData from '@/utils/testData.js'
export default {
  data: function () {
    return {
      testData: [],
      loading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // console.log(this.$ls)
      this.loading = true
      const paperID = this.$ls.get(PAPERID)
      questionsPay(paperID).then(testData => {
        this.testData = handelData(testData.StyleItems)
        this.loading = false
      }, () => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scope>
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
}
.cover{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 22%;
  text-align: center;
  background-color: #cccccc5d;
  z-index: 666;
}
.previewTest{
  max-height: 58vh;
  overflow-y: auto;
  dd{
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 5px;
    margin-bottom: 5px;
    .selectItem{
      padding: 10px;
      li{
        margin-top: 5px;
      }
    }
  }
}
</style>
