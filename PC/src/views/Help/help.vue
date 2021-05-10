<template>
  <div>
    <div class="helpBody">
      <div class="helpBody_box">
        <div class="helpBody_left">
          <ul>
            <li>
              <span @click="click_show('start_use')" class="user public_left_span">开始使用</span>
              <div class="start_use">
                <ul class="public_down_list">
                  <li @click="showdata(1)" :class="this.show === 1 ? 'text_color' : ' '" >  如何开始  </li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('making_test')" class="public_left_span">制作试卷</span>
              <div class="making_test">
                <ul class="public_down_list">
                  <li @click="showdata(2)" :class="this.show === 2 ? 'text_color' : ' '" > 新建试卷</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('form_exam')" class="public_left_span">组织考试</span>
              <div class="form_exam">
                <ul class="public_down_list">
                  <li @click="showdata(3)" :class="this.show === 3 ? 'text_color' : ' '" > 发起考试</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('create_group')" class="public_left_span">创建群组</span>
              <div class="create_group">
                <ul class="public_down_list">
                  <li @click="showdata(10)" :class="this.show === 10 ? 'text_color' : ' '" > 创建群组1</li>
                  <li @click="showdata(11)" :class="this.show === 11 ? 'text_color' : ' '" >创建群组2</li>
                  <li @click="showdata(12)" :class="this.show === 12 ? 'text_color' : ' '" >创建群组3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('trading_paper')" class="public_left_span">交易试卷</span>
              <div class="trading_paper">
                <ul class="public_down_list">
                  <li @click="showdata(13)" :class="this.show === 13 ? 'text_color' : ' '" > 交易试卷1</li>
                  <li @click="showdata(14)" :class="this.show === 14 ? 'text_color' : ' '" >交易试卷2</li>
                  <li @click="showdata(15)" :class="this.show === 15 ? 'text_color' : ' '" >交易试卷3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('offline_subject')" class="public_left_span">离线刷题</span>
              <div class="offline_subject">
                <ul class="public_down_list">
                  <li @click="showdata(16)" :class="this.show === 16 ? 'text_color' : ' '" > 离线刷题1</li>
                  <li @click="showdata(17)" :class="this.show === 17 ? 'text_color' : ' '" >离线刷题2</li>
                  <li @click="showdata(18)" :class="this.show === 18 ? 'text_color' : ' '" >离线刷题3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('chapter_exercises')" class="public_left_span">章节练习</span>
              <div class="chapter_exercises">
                <ul class="public_down_list">
                  <li @click="showdata(19)" :class="this.show === 19 ? 'text_color' : ' '" > 章节练习1</li>
                  <li @click="showdata(20)" :class="this.show === 20 ? 'text_color' : ' '" >章节练习2</li>
                  <li @click="showdata(21)" :class="this.show === 21 ? 'text_color' : ' '" >章节练习3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('custom_applet')" class="public_left_span">自定义小程序</span>
              <div class="custom_applet">
                <ul class="public_down_list">
                  <li @click="showdata(22)" :class="this.show === 22 ? 'text_color' : ' '" > 自定义小程序1</li>
                  <li @click="showdata(23)" :class="this.show === 23 ? 'text_color' : ' '" >自定义小程序2</li>
                  <li @click="showdata(24)" :class="this.show === 24 ? 'text_color' : ' '" >自定义小程序3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('common_problem')" class="public_left_span">常见问题</span>
              <div class="common_problem">
                <ul class="public_down_list">
                  <li @click="showdata(25)" :class="this.show === 25 ? 'text_color' : ' '" > 常见问题1</li>
                  <li @click="showdata(26)" :class="this.show === 26 ? 'text_color' : ' '" >常见问题2</li>
                  <li @click="showdata(27)" :class="this.show === 27 ? 'text_color' : ' '" >常见问题3</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="helpBody_right public_right_screen">
          <div class="user_right" v-show="show === 1">
            <div class="user_right_one_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">如何开始</span>
            </div>
            <div class="user_right_text  public_right_text">
              <ul>
                <li>刷题神器目前共有安卓版、苹果版、网页版、微信小程序版。</li>
                <li>安卓版：目前可以在各大应用市场中下载，搜索刷题神器即可</li>
                <li>苹果版：在App Store搜索刷题神器下载安装</li>
                <li>网页版：在浏览器中输入 <span>www.shuatishenqi.com</span>   即可使用（目前只支持谷歌内核浏览器，常见谷歌内核浏览器有谷歌浏览器、360浏览器极速模式、QQ浏览器极速模式等等）</li>
                <li>微信小程序版:在微信搜一搜中搜索小程序“刷题神器”，即可使用。</li>
              </ul>
            </div>
          </div>
          <div class="making_right_test" v-show="show === 2">
            <div class="making_test_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">创建试卷步骤（网页版）：</span>
            </div>
            <div class="making_test_text public_right_text">
              <ul>
                <li>1.点击“新增试卷”按钮</li>
                <li>2.设置试卷名字。试卷名称不能重复，如（A用户和B用户都可以有名字叫“刷题神器”的试卷，但A用户不能拥有2份名字都叫“刷题神器”的试卷）</li>
                <li>3.选择设置试卷分类</li>
                <li>4.创建试卷成功</li>
                <li>5.下载word/Excel模板进行试题格式整理，整理完毕点击保存</li>
                <li>6.返回官网，点击模板导入，找到刚才保存的模板，一套试卷就成功导入了</li>
                <li>如图： <span @click="making_img('making_test_img')">点击查看图片</span></li>
                <li class="making_test_img">
                  <img src="../../imgs/making_test_img.png" alt="">
                </li>
                <li class="close_making_img" @click="making_img('making_test_img')">
                  <img src="../../imgs/close_img.png" alt="">
                </li>
              </ul>
            </div>
          </div>
          <div class="form_exam_right" v-show="show === 3">
            <div class="form_making_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">发起考试(电脑版)</span>
            </div>
            <div class="public_right_text">
              <ul >
                <li>
                  <div class="form_exam_text">
                    <span>1.到“考试管理”页面点击右上角“新增考试”进入创建考试页面</span>
                  </div>
                  <div class="form_exam_img"></div>
                </li>
                <li> <div class="form_exam_text">
                       <span>2.到“考试管理”页面点击右上角“新增考试”进入创建考试页面</span>
                     </div>
                  <div class="form_exam_img"></div></li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
              </ul></div>

          </div>
          <div class="create_group_one" v-show="show === 10">创建群组1</div>
          <div class="create_group_two" v-show="show === 11">创建群组2</div>
          <div class="create_group_three" v-show="show === 12">创建群组3</div>
          <div class="trading_paper_one" v-show="show === 13">交易试卷1</div>
          <div class="trading_paper_two" v-show="show === 14">交易试卷2</div>
          <div class="trading_paper_three" v-show="show === 15">交易试卷3</div>
          <div class="offline_subject_one" v-show="show === 16">离线刷题1</div>
          <div class="offline_subject_two" v-show="show === 17">离线刷题2</div>
          <div class="offline_subject_three" v-show="show === 18">离线刷题3</div>
          <div class="chapter_exercises_one" v-show="show === 19">章节练习1</div>
          <div class="chapter_exercises_two" v-show="show === 20">章节练习2</div>
          <div class="chapter_exercises_three" v-show="show === 21">章节练习3</div>
          <div class="custom_applet_one" v-show="show === 22">自定义小程序1</div>
          <div class="custom_applet_two" v-show="show === 23">自定义小程序2</div>
          <div class="custom_applet_three" v-show="show === 24">自定义小程序3</div>
          <div class="common_problem_one" v-show="show === 25">常见问题1</div>
          <div class="common_problem_two" v-show="show === 26">常见问题2</div>
          <div class="common_problem_three" v-show="show === 27">常见问题3</div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="footer_Contain">
      <div class="aboutUS">
        <div class="foot_title">关于我们</div>
        <div class="foot_textCodeCt">
          <div class="text">
            服务热线： 4007728869 <br>
            咨询时间：周一至周五 08:00-18:00 （节假日除外） <br>
            公司地址：广西柳州市城中区信息产业园C栋5楼创新工场<br>
            商务合作 （QQ）：977077380 <br>
            问题反馈 （QQ）：335112905 <br>
            开发者名称：广西英腾教育科技股份有限公司<br>
            版本：2.0.0 <br>
            <!-- <a @click="openYSxieyi">隐私协议</a> <a @click="openFWxieyi">用户权限</a> -->
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
    </div>
    <div class="ABSBot">
      版权所有：广西英腾教育科技股份有限公司    备案号： <a href="http://www.beian.miit.gov.cn" style="color: #a9adb0; text-decoration: underline;" target="_brank">桂ICP备09009842号-16</a>
    </div>
    <div class="mask_ceng">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: 1
    }
  },
  methods: {
    showdata (data) {
      console.log(data)
      this.show = data
    },
    click_show (data) {
      // eslint-disable-next-line no-undef
      $('.' + data).stop().slideToggle()
    },
    making_img (data) {
      // eslint-disable-next-line no-undef
      $('.' + data).stop().slideToggle()
      // eslint-disable-next-line no-undef
      $('.mask_ceng').stop().slideToggle()
      // eslint-disable-next-line no-undef
      $('.close_making_img').stop().slideToggle()
    }
  }
}
</script>
<style lang="less" scoped>

//公共css
.public_span_one{
 display: inline-block;
      width: 8px;
      height: 20px;
      margin: 10px 0 0 0;
      background: #ff8200;
}
.public_span_two{
  font-size: 24px;
     font-weight: 900;
     margin: 0 0 0 10px;
}
.public_right_screen{
background: #fff;
    width: 100%;
    height: 100%;
    padding: 40px 0 0 20px;
}
.public_big_text{
  font-size: 16px;
}
.punlic_small_text{
  font-size: 14px;
}
.public_left_span{
  padding-left: 20px;
  font-weight: 500;
  display: inline-block;
  width: 100%;
}
.public_left_span:hover{
   background: #ff8200;
    color: #fff;
}
.public_down_list li{
      padding-left: 20px;
      color: #ababab;
      font-size: 12px !important;
}
.public_right_text ul li{
    margin: 20px  0 0 20px;
    padding: 0 40px 0 0;
    font-weight: 600;
    font-size: 20px;
  }
.helpBody{
  width: 100%;
   background: #f7f7f7;
}
.helpBody_box {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 1330px;
  margin: 0 auto ;
  padding: 10px 0 0 0;
}

.helpBody_left {
  height: 600px;
  overflow: hidden;
  width: 170px;
  background: #ffffff;
  .user {
    display: inline-block;
    width: 100%;
    height: 50px;
  }
  li {
    font-size: 16px;
  }
  .start_use {
    display: none;
  }
}
//制作试卷
.making_test{
  display: none;
}
//组织考试
.form_exam{
  display: none;
}
//创建群组
.create_group{
  display: none;
}
//交易试卷
.trading_paper{
  display: none;
}
//离线刷题
.offline_subject{
  display: none;
}
//章节练习
.chapter_exercises{
  display: none;
}
//自定义小程序
.custom_applet{
  display: none;
}
//常见问题
.common_problem{
  display: none;
}
//遮罩层
.mask_ceng{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  display: none;
  z-index: 9;
}
.text_color {
  color: #ff8200 !important;
}

.helpBody_left li {
  //  margin: 20px;
  line-height: 50px;
  cursor: pointer;
}
.helpBody_right {
  height: 600px;
  margin:0  0 40px 20px;
  width: 100%;
    .user_right_one_title{
      display: flex;
  }
  }
  .user_right {
    width: 100%;
    height: 100%;
    .user_right_text{
      span{
        color:rgb(108, 170, 228);
      }
    }
  }
  .helpBody{
    position: relative;
  }
  .making_test_text{
    span{
      display: inline-block;
      text-align: center;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      width: 150px;
      background: rgb(108, 170, 228);
    }
  }
  .making_test_img{
    position: absolute;
    top: 0;
    left: 50px;
    width: 1800px;
    display: none;
    z-index: 10;
    img{
      width: 100%;
      height: 100%
    }
  }
  .close_making_img{
    position: absolute;
    top: 0;
    left: 50px;
    width: 1800px;
    z-index: 10;
    width: 90px;
    height: 60px;
    display: none;
    cursor: pointer;
    }
    .close_making_img img{
      width: 100%;
      height: 100%
    }

//组织考试
.form_exam_right ul{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   li{
     width: 50%;
     margin: 0 0 0 0;
   }
}
  @import url(../../views/Home/market.less);
</style>
