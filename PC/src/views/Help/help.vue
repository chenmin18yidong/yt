<template>
  <div>
    <div class="helpBody">
      <div class="helpBody_box">
        <div class="helpBody_left">
          <ul>
            <li>
              <span
                @click="click_show('start_use');title_text_bc(1) "
                id="start_use"
                class="user public_left_span" >开始使用</span>
              <div class="start_use">
                <ul class="public_down_list">
                  <li @click="showdata(1)" :class="this.show === 1 ? 'text_color' : ' '" >  如何开始  </li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('making_test');" id="making_test" class="public_left_span">制作试卷</span>
              <div class="making_test">
                <ul class="public_down_list">
                  <li @click="showdata(2)" :class="this.show === 2 ? 'text_color' : ' '" > 新建试卷</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('form_exam')" id="form_exam" class="public_left_span">组织考试</span>
              <div class="form_exam">
                <ul class="public_down_list">
                  <li @click="showdata(3)" :class="this.show === 3 ? 'text_color' : ' '" > 发起考试</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('create_group');showdata(4)" id="create_group" class="public_left_span">创建群组</span>
            </li>
            <li>
              <span @click="click_show('trading_paper')" id="trading_paper" class="public_left_span">交易试卷</span>
              <div class="trading_paper">
                <ul class="public_down_list">
                  <li @click="showdata(5)" :class="this.show === 5 ? 'text_color' : ' '" > 发布付费卷</li>
                </ul>
              </div>
            </li>
            <li>
              <span @click="click_show('offline_subject');showdata(6)" id="offline_subject" class="public_left_span">离线刷题</span>
            </li>
            <li>
              <span @click="click_show('chapter_exercises');showdata(7)" id="chapter_exercises" class="public_left_span">章节练习</span>
            </li>
            <li>
              <span @click="click_show('custom_applet');showdata(8)" id="custom_applet" class="public_left_span">定制小程序</span>
            </li>
            <li>
              <span @click="click_show('common_problem');showdata(9)" id="common_problem" class="public_left_span">常见问题</span>
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
                <li>6.返回官网，点击模板导入，找到刚才保存的模板，一套试卷就成功导入了 (<span class="public_span_blue">鼠标点击图片，查看大图</span>)</li>
                <li id="making_test_img">
                  <p @click="making_img('making_test_img')"><img src="../../imgs/help_tutorial/making_test_img.png" alt=""></p>
                </li>
              </ul>
            </div>
          </div>
          <div class="form_exam_right" v-show="show === 3">
            <div class="form_exam_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">发起考试(电脑版)(<span class="public_span_blue">鼠标点击右边图片，查看大图</span>)</span>
            </div>
            <div class="public_right_text form_exam_content">
              <div class="exam_content_left_text">
                <ul>
                  <li>1.到“考试管理”页面点击右上角“新增考试”进入创建考试页面。</li>
                  <li>2.建议选择极简考试模式，目前严格考试为企业版使用功能，暂未对外开放，敬请期待。成绩查询处也建议大家把以下选项都勾选上，方便考生了解自己的答题情况。</li>
                  <li>3.勾选考试试卷，最多可同时勾选三套试卷混合出题（为特权功能，需先开通特权）</li>
                  <li>4.选择顺序抽题或者随机抽题，设定每个题型的题数以及分数</li>
                  <li>5.这里设置考生答题的次数及时长，还可以根据试卷的总分设置及格线。</li>
                  <li>6.保存以上配置，此时得到一个考试的二维码。若在小程序内考试，则复制该场考试的二维码，考生扫描二维码即进入考试；若在app内考试，则复制二维码下方的考试分享码发送给考生，二者使用场景不一，请勿混淆。</li>
                </ul>
              </div>
              <div class="exam_content_right_img">
                <ul>
                  <li id="form_exam_img_one">
                    <p @click="exam_img('form_exam_img_one')" ><img src="../../imgs/help_tutorial/form_exam_one.png" alt=""> </p>
                    <span>1</span>
                  </li>
                  <li id="form_exam_img_two">
                    <p @click="exam_img('form_exam_img_two')" ><img src="../../imgs/help_tutorial/form_exam_two.png" alt=""> </p>
                    <span>2</span>
                  </li>
                  <li id="form_exam_img_three">
                    <p @click="exam_img('form_exam_img_three')" ><img src="../../imgs/help_tutorial/form_exam_three.png" alt=""> </p>
                    <span>3</span>
                  </li>
                  <li id="form_exam_img_four">
                    <p @click="exam_img('form_exam_img_four')" ><img src="../../imgs/help_tutorial/form_exam_four.png" alt=""> </p>
                    <span>4</span>
                  </li>
                  <li id="form_exam_img_five">
                    <p @click="exam_img('form_exam_img_five')" ><img src="../../imgs/help_tutorial/form_exam_five.png" alt=""> </p>
                    <span>5</span>
                  </li><li id="form_exam_img_six">
                    <p @click="exam_img('form_exam_img_six')" ><img src="../../imgs/help_tutorial/form_exam_six.png" alt=""> </p>
                    <span>6</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="create_group_right" v-show="show === 4">
            <div class="create_group_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">创建群组</span>
            </div>
            <div class="create_group_text public_right_text">
              <ul>
                <li>在app个人中心上方“我的群组”创建群组，普通用户只能创建1个群组，开通特权后可以创建无数个群组。
                  群组创建成功后，成员通过搜索群名称或者群编号申请加入，群主在“群成员”处同意或拒绝 (<span class="public_span_blue">鼠标滑到图片查看大图</span>)</li>
                <li >
                  <div class="create_group_img" id="create_group_img_one">
                    <span @click="group_change_img('create_group_img_one') " ><img src="../../imgs/help_tutorial/penson_center.png" alt=""></span>
                    <span><img src="../../imgs/help_tutorial/group_home.png" alt=""></span>
                  </div>
                </li>
                <li>
                  群组功能支持在群组内发布试卷进行练习（非特权用户需要先把该试卷的允许被搜索打开），暂不支持发布考试；
                  群主可以在“群练习管理”处查看群成员的练习数据，包括答题数量、答题时间和正确率。
                </li>
              </ul>
            </div>
          </div>
          <div class="trading_paper_right" v-show="show === 5">
            <div class="trading_paper_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">发布付费卷(电脑端)：</span>
            </div>
            <div class="trading_paper_text public_right_text">
              <ul>
                <li>左侧题集市页面，选择商户管理中心，点击“添加新付费卷”来发布，需要先在分享设置处把该试卷的允许被搜索打开。(<span class="public_span_blue">鼠标滑到图片查看大图</span>)</li>
                <li>设置该试卷的预览题数以及销售价格，点击发布即成功。注意付费卷不能够再逆转回普通卷，不能修改试题内容。</li>
                <li>
                  <img src="../../imgs/help_tutorial/trading_paper_img.png" alt="">
                </li>
              </ul>
            </div>
          </div>
          <div class="offline_subject_right" v-show="show === 6">
            <div class="offline_subject_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">离线刷题</span>
            </div>
            <div class="offline_subject_text public_right_text">
              <ul>
                <li>
                  <p>目前离线刷题功能支持在app上进行，小程序与网页暂不支持，且为特权功能。在app【我的-离线试卷】处，
                  </p>
                  <p>
                    右上角+号键添加离线试卷，每位用户最多添加5份试卷，支持在无网络的情况下也可以刷题练习。
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="chapter_exercises_right" v-show="show === 7">
            <div class="chapter_exercises_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">章节练习</span>
            </div>
            <div class="chapter_exercises_text public_right_text">
              <ul>
                <li>章节练习目前支持在安卓app上进行创建章节、新增试题以及刷题练习。
                  新增一套试卷后选择章节管理，点击右上角【添加章节】并做好命名，再返回试卷详情页面，
                  点击新增试题填写内容，页面下拉【选择章节】处选到刚才添加的章节，同时还可以选择该题目的难易度
                  ，这样就成功导入到章节了(<span class="public_span_blue">鼠标滑到图片查看大图</span>)</li>
                <li>
                  <div class="chapter_exercises_img">
                    <span><img src="../../imgs/help_tutorial/chapter_exercises_one.png" alt=""></span>
                    <span><img src="../../imgs/help_tutorial/chapter_exercises_two.png" alt=""></span>
                  </div>
                </li>
                <li>在app新增的章节试题可以在网页上进行章节练习，暂时不支持在网页上新增。</li>
              </ul>
            </div>
          </div>
          <div class="custom_applet_right" v-show="show === 8">
            <div class="custom_applet_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">定制小程序</span>
            </div>
            <div class="custom_applet_text public_right_text">
              <ul>
                <li>目前安卓用户可以使用定制小程序功能，该功能可以在分享试卷、
                  考试链接至微信小程序时展现专属小程序的图片、名称，具体操作教程如下：</li>
                <li>1、若您已注册有微信小程序，直接点击授权刷题神器定制跳转到授权页面，使用注册小程序时绑定的管理员微信扫描该二维码，
                  审核时长1~2个工作日，通过后即可使用定制小程序功能。</li>
                <li>2、若您未注册过微信小程序，登录微信公众平台选择小程序注册，填写相关信息；注意注册类目为教育>在线教育，上传小程序图片并填写小程序相关资料，
                  注册通过后，此时再点击“已有微信小程序”进行授权，
                  审核时长1~2个工作日，通过后即可使用定制小程序功能。</li>
              </ul>
            </div>
          </div>
          <div class="common_problem_right" v-show="show === 9">
            <div class="common_problem_title">
              <span class="public_span_one"></span>
              <span class="public_span_two">常见问题</span>
            </div>
            <div class="common_problem_text public_right_text">
              <ul>
                <li>1、怎么上传图片:</li>
                <li>在官网利用图片工具上传图片，会得到一段图片代码，把代码复制到相应的题干即可。
                  或者是直接将图片插入文档导入，注意尺寸不宜过大</li>
                <li>2、上传题库遇到敏感词怎么处理:</li>
                <li>可以将敏感词删除，或者用拼音替代、在敏感词中间用符号隔开。</li>
                <li>3、站内分享的试卷在哪里找到:</li>
                <li>分享设卷时分为站外分享和站内分享，站外分享指的是分享到微信或者QQ，站内分享则是分享到对方的刷题神器账号里，在“收藏试卷”中可以找到。</li>
                <li>4、如何购买付费卷:</li>
                <li>目前苹果用户不支持在app内购买试卷，可以登录官网www.shuatishenqi.com在左侧的题集市页面搜索购买，注意不可长按二维码识别，需要扫描二维码付款。</li>
                <li>5、通用码和临时码有什么区别:</li>
                <li>用户可以对自己上传的试卷设置访问密码，分为通用码和临时码，通用码可以使用多次，临时码只可以使用一次。</li>
              </ul>
            </div>
          </div>
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
    title_text_bc (data) {
      console.log(data)
      this.number = data
    },
    click_show (data) {
      // eslint-disable-next-line no-undef
      $('.' + data).stop().slideToggle()
      // eslint-disable-next-line no-undef
      // $('#' + data).toggleClass('public_title_text_bc')
    },
    // 创建群组改变图片
    group_change_img (data) {
      // eslint-disable-next-line no-undef
      $('#' + data).toggleClass('group_change_img')
      // eslint-disable-next-line no-undef
      $('.mask_ceng').toggle()
    },
    making_img (data) {
      // eslint-disable-next-line no-undef
      $('#' + data).toggleClass('making_test_change_img')
      // eslint-disable-next-line no-undef
      $('.mask_ceng').toggle()
    },
    exam_img (data) {
    // eslint-disable-next-line no-undef
      $('#' + data).toggleClass('form_exam_change_img')
      // eslint-disable-next-line no-undef
      $('.mask_ceng').toggle()
      // eslint-disable-next-line no-undef
      $('.aa').css({
        'display': 'none',
        'color': 'red'
      })
    }
    // compare_height () {
    // eslint-disable-next-line no-undef
    // var count = $('.helpBody_left').height() - 66
    // eslint-disable-next-line no-undef
    // $('.helpBody_right').height(count)
    // }
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
  // font-weight: 900;
}
.punlic_small_text{
  font-size: 14px;
}
.public_left_span{
  padding-left: 20px;
  font-weight: 900;
  display: inline-block;
  width: 100%;
}
.text_color {
  color: #ff8200 !important;
}
.public_title_text_bc{
  background:#ff8200 ;
  color: #fff;
}
.public_down_list li{
      padding-left: 20px;
      color: #ababab;
      font-size: 12px !important;
}
.public_right_text ul li{
    margin: 34px  0 0 20px;
    padding: 0 40px 0 0;
    font-weight: 500;
    font-size: 16px;
  }
.public_span_blue{
  color: rgb(108, 170, 228);
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
  margin-bottom: 40px;
  // height: 600px;
  // overflow: hidden;
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
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  display: none;
  z-index: 9;
}
.helpBody_left  {
  line-height: 50px;
  cursor: pointer;
}
.helpBody_left li:hover{
  transition: 0.5s;
  font-size: 18px;
}
.helpBody_right {
  min-height: 650px;
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
    .look_big_img{
      display: inline-block;
      text-align: center;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      width: 150px;
      background: rgb(108, 170, 228);
    }
//制造试卷

.making_test_text>ul>li:nth-child(7){
      position: absolute;
      z-index: 10;
    p{
      box-shadow:1px 1px 20px 1px #999;
      display: inline-block;
       width: 300px;
       height: 170px;
       transition: all 1s;
     img{
       width: 100%;
       height: 100%;
       display: inline-block;
         cursor: pointer;
     }
  }
}
 .making_test_change_img{
    p{
      position: fixed;
    display: inline-block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
     width: 1760px  !important;
     height: 877px  !important;
    }
  }
//组织考试

.form_exam_content{
    display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   .exam_content_left_text{
     width: 80%;
   }
   .exam_content_left_text>ul>li{
         margin: 56px 0 0 20px;
   }
   .exam_content_right_img>ul>li{
     position: relative;
     span{
       opacity: 0.4;
       font-size: 30px;
       position: absolute;
       top: 0;
       bottom: 0;
       left: 76px;
       margin: auto;
       width: 20px;
       height: 25px;
       line-height: 25px;
       color: #777;
       text-align:center;
     }
   }
   .exam_content_right_img{
     width: 20%;
     ul {
     margin-top: -34px;
     li{
       margin: 0 0 0 20px;
     }
     }
     p{
       z-index: 10;
       width: 168px;
       height: 82px;
     img{
       width: 100%;
       height: 100%;
          box-shadow:1px 1px 20px 1px #999;
         cursor: pointer;
     }
     }
   }
}
.form_exam_change_img{
  p{
    display: inline-block;
     width: 1267px !important;
     height: 624px  !important;
    position: fixed;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transition: all 1s;
  }
  span{
    display: none;
  }
}
//创建群组
.create_group_img{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  span{
  width: 200px;
  height: 300px;
  transition: all 0.5s;
  img{
    width: 100%;
    height: 100%;
    transition:all 1s;
    cursor: pointer;
   box-shadow:1px 1px 20px 1px #999;
  }
  }}
  .group_change_img{
    span{
      //  top: 0;
      position: relative;
       z-index: 10;
       width: 402px;
       height: 602px;
  }
  }
  //交易试卷
  .trading_paper_text ul li:nth-child(3){
    width: 900px;
    height: 380px;
    margin: 36px  auto 0;
    cursor: pointer;
    box-shadow: 1px 2px 20px 1px #999;
    padding: 0;
    img{
      width: 100%;
      height: 100%;
      transition:all 1s;
    }
  }
  //章节练习
    .chapter_exercises_img{
      display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 100%;
    margin: 20px auto;
    span{
      width: 200px;
      height: 330px;
      cursor: pointer;
      border: 1px solid rgb(196, 192, 192);
    img{
      width: 100%;
      height: 100%;
      transition: 0.5s;
    }
    img:hover{
      transform: scale(2,2);
      margin-top: 160px;
      box-shadow:1px 1px 20px 1px #999;
    }
    }
  }

  //常见问题
  .common_problem_text ul li {
    margin: 30px 0 0 20px;
  }
  .common_problem_text ul li:nth-child(even) {
    margin: 12px 0 0 20px;
  }
  @import url(../../views/Home/market.less);
</style>
