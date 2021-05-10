<template>
  <div>
    <div class="helpBody">
      <div class="helpBody_box">
        <div class="helpBody_left">
          <ul>
            <li>
              <span @click="start_suer('start_use')" class="user public_left_span">开始使用</span>
              <div class="start_use">
                <ul class="public_down_list">
                  <li @click="showdata(1)" :class="this.show === 1 ? 'text_color' : ' '" >  关于应用  </li>
                  <li @click="showdata(2)" :class="this.show === 2 ? 'text_color' : ' '" >主要特点</li>
                  <li @click="showdata(3)" :class="this.show === 3 ? 'text_color' : ' '" >如何开始</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('making_test')" class="public_left_span">制作试卷</span>
              <div class="making_test">
                <ul class="public_down_list">
                  <li @click="showdata(4)" :class="this.show === 4 ? 'text_color' : ' '" > 制作试卷1</li>
                  <li @click="showdata(5)" :class="this.show === 5 ? 'text_color' : ' '" >制作试卷2</li>
                  <li @click="showdata(6)" :class="this.show === 6 ? 'text_color' : ' '" >制作试卷3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('form_exam')" class="public_left_span">组织考试</span>
              <div class="form_exam">
                <ul class="public_down_list">
                  <li @click="showdata(7)" :class="this.show === 7 ? 'text_color' : ' '" > 组织考试1</li>
                  <li @click="showdata(8)" :class="this.show === 8 ? 'text_color' : ' '" >组织考试2</li>
                  <li @click="showdata(9)" :class="this.show === 9 ? 'text_color' : ' '" >组织考试3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('create_group')" class="public_left_span">创建群组</span>
              <div class="create_group">
                <ul class="public_down_list">
                  <li @click="showdata(10)" :class="this.show === 10 ? 'text_color' : ' '" > 创建群组1</li>
                  <li @click="showdata(11)" :class="this.show === 11 ? 'text_color' : ' '" >创建群组2</li>
                  <li @click="showdata(12)" :class="this.show === 12 ? 'text_color' : ' '" >创建群组3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('trading_paper')" class="public_left_span">交易试卷</span>
              <div class="trading_paper">
                <ul class="public_down_list">
                  <li @click="showdata(13)" :class="this.show === 13 ? 'text_color' : ' '" > 交易试卷1</li>
                  <li @click="showdata(14)" :class="this.show === 14 ? 'text_color' : ' '" >交易试卷2</li>
                  <li @click="showdata(15)" :class="this.show === 15 ? 'text_color' : ' '" >交易试卷3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('offline_subject')" class="public_left_span">离线刷题</span>
              <div class="offline_subject">
                <ul class="public_down_list">
                  <li @click="showdata(16)" :class="this.show === 16 ? 'text_color' : ' '" > 离线刷题1</li>
                  <li @click="showdata(17)" :class="this.show === 17 ? 'text_color' : ' '" >离线刷题2</li>
                  <li @click="showdata(18)" :class="this.show === 18 ? 'text_color' : ' '" >离线刷题3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('chapter_exercises')" class="public_left_span">章节练习</span>
              <div class="chapter_exercises">
                <ul class="public_down_list">
                  <li @click="showdata(19)" :class="this.show === 19 ? 'text_color' : ' '" > 章节练习1</li>
                  <li @click="showdata(20)" :class="this.show === 20 ? 'text_color' : ' '" >章节练习2</li>
                  <li @click="showdata(21)" :class="this.show === 21 ? 'text_color' : ' '" >章节练习3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('custom_applet')" class="public_left_span">自定义小程序</span>
              <div class="custom_applet">
                <ul class="public_down_list">
                  <li @click="showdata(22)" :class="this.show === 22 ? 'text_color' : ' '" > 自定义小程序1</li>
                  <li @click="showdata(23)" :class="this.show === 23 ? 'text_color' : ' '" >自定义小程序2</li>
                  <li @click="showdata(24)" :class="this.show === 24 ? 'text_color' : ' '" >自定义小程序3</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="start_suer('common_problem')" class="public_left_span">常见问题</span>
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
        <div class="user_right public_right_screen">
          <div class="user_right_one" v-show="show === 1">
            <div class="user_right_one_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">关于应用</span>
            </div>
            <div class="user_right_one_text">
              <span>刷题神器~复习备考智能题库APP，超千万用户使用的刷题利器，现已特权功能永久免费使用。
                精选海量题库，一键导入专属题库，AI智能测评，WEB、IOS、安卓多终端协同，让复习备考更轻松
                、更高效！提供涵盖航空航天、边防出入境、铁楼司机培训、国家电网培训、电力安规、国家
                公务员、医师资格、医学初中高级职称、职业药师、职业护士、卫生招聘、教师资格、消防工程、
                建筑工程、财会经济、警法考试和司法考试各大系列的试题、课程，让学员随时学、随地学、随心学！
              </span>
            </div>
            <div class="user_right_one_img">
              <img src="../../imgs/market/banner.png" alt="">
            </div>
          </div>
          <div class="user_right_two" v-show="show === 2">
            <div class="user_right_two_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">主要特点</span>
            </div>
          </div>
          <div class="user_right_three" v-show="show === 3">
            <div class="user_right_three_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">如何开始</span>
            </div>
          </div>
          <div class="making_test_one" v-show="show === 4">制作试卷1</div>
          <div class="making_test_two" v-show="show === 5">制作试卷2</div>
          <div class="making_test_three" v-show="show === 6">制作试卷3</div>
          <div class="form_exam_one" v-show="show === 7">组织考试1</div>
          <div class="form_exam_two" v-show="show === 8">组织考试2</div>
          <div class="form_exam_three" v-show="show === 9">组织考试3</div>
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
    start_suer (data) {
      // eslint-disable-next-line no-undef
      $('.' + data).stop().slideToggle()
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
.text_color {
  color: #ff8200 !important;
}

.helpBody_left li {
  //  margin: 20px;
  line-height: 50px;
  cursor: pointer;
}

.user_right {
  height: 600px;
  margin:0  0 40px 20px;
  width: 100%;
    .user_right_one_title{
      display: flex;
  }
  .user_right_one_text{
    padding: 20px 80px 0 20px;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
  }
  .user_right_one_img img{
    width: 100%;
    height: 400px;
    padding: 40px 20px 0 0;
  }

  }
  .user_right_two {
    width: 100%;
    height: 100%;
  }
  .user_right_three {
    width: 100%;
    height: 100%;
  }
  @import url(../../views/Home/market.less);
</style>
