<template>
  <dl class="discuss">
    <div class="cover" v-if="loading">
      <a-spin/>
    </div>
    <dd v-for="(item,idx) in disList" :key="'dis'+idx">
      <div class="disName">
        <span>{{ item.UserName }}</span>
        <span>{{ formatDate(new Date(item.CreateTime),'yyyy-MM-dd hh:mm') }}</span>
      </div>
      <div class="disContent">
        {{ item.Comment }}
      </div>
    </dd>
  </dl>
</template>
<script>
import { ratingListNovalid } from '@/api/marketApi'
import { PAPERID } from '@/store/mutation-types'
import { formatDate } from '@/utils/utils'
export default {
  data: function () {
    return {
      loading: false,
      disList: [],
      formatDate
    }
  },
  created () {
    this.loading = true
    const paperID = this.$ls.get(PAPERID)
    ratingListNovalid(paperID).then(res => {
      this.disList = res
      this.loading = false
    }, () => {
      this.loading = false
    })
  }
}
</script>
<style lang="less" scope>
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
.discuss{
  max-height: 58vh;
  overflow-y: auto;
  dd{
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 5px;
    margin-bottom: 5px;
    .disName{
      color: #777;
      font-size: 0.8rem;
      span{
        margin-right: 60px;
      }
    }
    .disContent{
      margin: 8px 0;
    }
  }
}
</style>
