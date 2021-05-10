<template>
  <a-modal
    title="下载"
    :footer="null"
    v-model="visible"
    width="550px">
    <div class="code">
      <div class="an">
        <img src="@/imgs/stsq/appqrcode.jpg" alt="">
        <div>安卓版刷题神器APP</div>
      </div>
      <div class="ios">
        <img src="@/imgs/stsq/qrcode-ios.png" alt="">
        <div>苹果版刷题神器APP</div>
      </div>
      <div class="mp">
        <img src="@/imgs/stsq/stsq_applets.jpg" alt="">
        <div>微信扫码，进入刷题君</div>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  data: function () {
    return {
      visible: false
    }
  },
  methods: {
    showDownloadModal: function () {
      this.visible = true
    }
  }
}
</script>
<style lang="less" scoped>
  .code {
    display: flex;
    justify-content: space-around;
  }
  .code img {
    width: 120px;
    height: 120px;
  }
  .code>div {
    text-align: center;
  }
  .code>div>div {
    margin-top: 10px;
  }
</style>
