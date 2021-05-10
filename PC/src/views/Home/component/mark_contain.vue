<template>
  <div class="paperManage">
    <div class="manageTop">
      <div @click="goMarket()" :class="[active==='market'?'tabBar tabBarActive':'tabBar']">
        题集市
      </div>
      <div @click="goBuyPaper()" :class="[active==='buy'?'tabBar tabBarActive':'tabBar']">
        已购买的试卷
      </div>
      <div @click="goManage()" :class="[active==='manage'?'tabBar tabBarActive':'tabBar']">
        商户管理中心
      </div>
    </div>
    <div class="mainContain">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: String,
      default: 'market'
    }
  },
  methods: {
    goMarket () {
      this.$router.push('/index/market')
    },
    goBuyPaper () {
      this.$router.push('/index/buyPaper')
    },
    goManage () {
      this.$router.push('/index/manage')
    }
  }
}
</script>
<style lang="less" scoped>

// 首页
.paperManage{
  width: 96%;
  margin: 2vh 2%;
}
.manageTop{
  overflow: hidden;
}
.manageTop .tabBar{
  float: left;
  display: flex;
  width: 150px;
  flex-direction: row;
  justify-content: center;
  background-color: #ffebce;
  color: #b66e15;
  padding: 12px 0;
  border-radius: 10px 10px 0 0;
  margin-right: 5px;
  cursor: pointer;
}
.tabBarActive{
  background-color: #fff !important;
  color: #000 !important;
}
.manageTop .tabBar img{
  width: 23px;
  height: 23px;
  margin-right: 3px;
}
.testNum{
  float: right;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-top: 10px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  font-size: 0.9em;
}
.testNum em{
  color: #4f7bfc;
  margin-left: 20px;
}

.mainContain{
  height: 80vh;
  background-color: #fff;
  border-radius: 0px 10px 10px 10px;
  padding: 1.2% 2%;
  overflow-y: auto;
}
</style>
