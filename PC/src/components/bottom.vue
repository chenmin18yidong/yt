<template>
  <div class="bottom">
    <div class="footers">
      <div class="foot_title">关于我们</div>
      <div class="foot_textCodeCt">
        <div class="text">
          咨询时间：周一至周五 08:00-18:00 （节假日除外）<br>
          4007728869 <br>
          公司地址：广西柳州市城中区信息产业园C栋5楼创新工场<br>
          商务合作 （QQ）：977077380 <br>
          问题反馈 （QQ）：335112905
        </div>
        <div class="code">
          <div>
            <img style="width:auto;" alt="刷题神器" src="@/imgs/logo2.png">
          </div>
          <div>
            <img src="@/imgs/appqrcode.jpg" alt="">
            <p>安卓端</p>
          </div>
          <div>
            <img src="@/imgs/qrcode-ios.png" alt="">
            <p>iOS端</p>
          </div>
          <div>
            <img src="@/imgs/stsq_applets.jpg" alt="">
            <p>小程序</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ABSBot">
      版权所有：广西英腾教育科技股份有限公司    备案号： <a href="http://www.beian.miit.gov.cn" style="color: #a9adb0; text-decoration: underline;" target="_brank">桂ICP备09009842号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bottom{
  width: 100%;
  background-color:#dadada;
  color: #000;
}
.footers{
  width: 1280px;
  margin: auto;
}
.foot_title{
  font-size: 1.2rem;
}
.foot_textCodeCt{
  padding: 15px 30px 0px 30px;
  display: flex;
  overflow: hidden;
}
.foot_textCodeCt .text,.foot_textCodeCt .code{
  width: 50%;
}
.foot_textCodeCt .text{
  font-size: 0.8rem;
  line-height: 22px;
}
.foot_textCodeCt .code{
  display: flex;
  justify-content: flex-end;
  text-align: center;
  font-size: 0.8rem;
}
.foot_textCodeCt .code div{
  margin-left: 3vw;
}
.foot_textCodeCt .code img{
  width: 80px;
  height: 80px;
  margin-bottom: 3px;
}
.ABSBot{
  background-color: #2c2c2c;
  color: #a9adb0;
  padding: 10px;
  text-align: center;
}
</style>
