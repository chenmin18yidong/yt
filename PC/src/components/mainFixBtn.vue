<template>
  <!-- 瞄点 -->
  <div>
    <div class="rightFix backTop" @click="goTop">
      <img src="@/imgs/backTop.png" alt=""><br>
      返回顶部
    </div>
    <div class="rightFix  onlineQQ ">
      <div class="hoverhide">
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=335112905&site=qq&menu=yes">
          <img border="0" src="@/imgs/zixun.png" alt="在线咨询" title="在线咨询"/>
          <div> 在线咨询</div>
        </a>
      </div>
      <div class="hover">
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=335112905&site=qq&menu=yes">
          <img border="0" src="@/imgs/zixun.png" alt="在线咨询" title="在线咨询"/>
          <div> 在线咨询<br>QQ:335112905</div>
        </a>
      </div>

    </div>
    <div class="rightFix telephoneNum">
      <div class="hoverhide">
        <img src="@/imgs/dianhua.png" alt="">
        <div> 电话咨询 </div>
      </div>
      <div class="hover">
        <img src="@/imgs/dianhua.png" alt="">
        <div>电话咨询 <br>4007728869</div>
      </div>
    </div>
  </div>
  <!-- 瞄点end -->
</template>
<style scoped>

a{
  color: #fff;
  text-decoration:none;
}
a:hover{color:#fff;}
.rightFix{
  position: fixed;
  right: 0px;
  background-color: #feb148;
  color: #fff;
  text-align: center;
  height: 65px;
  line-height: 30px;
  font-size: 0.8em;
  border-radius: 5px;
  overflow: hidden;
  z-index: 666;
}

.rightFix:active {
  background-color: #fcc67c;
}
.backTop{
  bottom: 300px;
  width: 65px;
}
.backTop img,.hoverhide img{
 width: 24px;
}
.onlineQQ{
  min-width: 65px;
  bottom: 230px;
}
.telephoneNum{
  min-width: 65px;
  bottom: 160px;

}
.telephoneNum:hover .hover,.onlineQQ:hover .hover{
  width: 180px;
}
.telephoneNum:hover .hoverhide,.onlineQQ:hover .hoverhide{
  display: none;
}
.hoverhide{
  display: block;
  transition:display 2s ;
}
.hover{
  width: 0px;
  display: flex;
  transition:width 0.5s ;
}
.hover div{
  line-height: 25px;
  margin-top: 10px;
  white-space: nowrap;
}
.hover img{
  width: 25px;
  height: 25px;
  margin: 20px 10px;
  float: left;
}

</style>

<script>

export default {
  name: 'Produce',
  components: {

  },
  mounted () {
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }
}
</script>
