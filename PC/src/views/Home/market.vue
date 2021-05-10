<template>
  <div>
    <div class="topPic">
      <div class="freeUse">
        <div class="freeUse_Input">
          <input type="text" class="tel1" placeholder="输入手机号码" v-model="tel">
        </div>
        <div class="freeUse_Btn" @click="goRegister">
          马上进驻
        </div>
      </div>
    </div>
    <div class="bot">
      <div class="botCt">
        <div class="lable">
          <div class="title">题库分类</div>
          <ul class="lableList">
            <li
              :class="[activeLable===''?'active':'']"
              @click="getallLable">
              全部
            </li>
            <li
              :class="[item.LabelID===activeLable?'active':'']"
              v-for="(item,fidx) in lable"
              :key="'fstL'+item.LabelID"
              @click="setLable(fidx)">
              {{ item.LabelName }}
            </li>
          </ul>
        </div>
        <div class="sort">
          <div :class="[sortType==1?'sortTitle active':'sortTitle']" @click="sortPaper(1)">最新</div>
          <div :class="[sortType==2?'sortTitle active':'sortTitle']" @click="sortPaper(2)">销量</div>
          <div :class="[sortType==3?'sortTitle active':'sortTitle']" @click="sortPaper(3)">评分</div>
          <div class="top_input">
            <a-select default-value="搜全部" style="width: 110px" @change="handleChange">
              <a-select-option value="all">
                搜全部
              </a-select-option>
              <a-select-option value="lable">
                搜本分类
              </a-select-option>
            </a-select>
            <a-input-search
              allowClear
              v-model="keyword"
              placeholder="搜索您感兴趣的试卷"
              style="width: 380px;margin-left:5px;"
              @search="getpayPaperList" />
          </div>
        </div>
        <dl class="paperList" v-if="total">
          <dd v-for="(item,idx) in paperList" :key="'paper'+idx">
            <div class="left" @click="goDetial(item.PaperID)">
              <div class="paperTitle">{{ item.PaperTitle }}</div>
              <div class="paperBrief">{{ item.Introduction }}</div>
              <div class="paperInfo">
                <span>分类：{{ item.lableName }}</span> <span>题量：{{ item.TestNum }}</span> <span>作者：{{ item.UserName||'stsq_'+item.UserID }}</span>
              </div>
            </div>
            <div class="right">
              <div class="priceCt">
                <div class="price"><span>￥</span>{{ item.Price }}</div>
                <div class="sellInfo">
                  <div>销量：{{ item.SellerCount }}</div>
                  <div>评分：{{ item.AvgScore?item.AvgScore.toFixed(1):0 }}</div>
                </div>
              </div>
              <div class="btnCt">
                <a-tag @click="goBuy(idx)" style="width:105px;text-align:center;height:35px;line-height:35px;border-radius:5px;font-size:1rem;" color="#ff6c00" >购买</a-tag>
                <a-tag @click="goPreViewTest(item.PaperID)" style="width:105px;text-align:center;height:35px;line-height:35px;border-radius:5px;font-size:1rem;margin-right:0;" color="#1477ff">预览试题</a-tag>
              </div>
            </div>
          </dd>
        </dl>
        <div class="noPaperTips" v-else>
          Oops~~没搜到您要找的试卷，换个关键词试试
        </div>
        <div class="pagination">
          <a-pagination
            show-quick-jumper
            :show-total="total => `共 ${Math.ceil(total/10)} 页`"
            :page-size="10"
            :total="total"
            :current="currentpage"
            @change="onPageChange"
          />
        </div>
      </div>
    </div>

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

            <a @click="openYSxieyi">隐私协议</a> <a @click="openFWxieyi">用户权限</a>
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

    <!-- <div class="marketC">
      <div class="top_input">
        <a-select default-value="搜全部" style="width: 110px" @change="handleChange">
          <a-select-option value="all">
            搜全部
          </a-select-option>
          <a-select-option value="lable">
            搜本分类
          </a-select-option>
        </a-select>
        <a-input-search
          allowClear
          v-model="keyword"
          placeholder="搜索您感兴趣的试卷"
          style="width: 380px;margin-left:5px;"
          @search="getpayPaperList" />
      </div>
      <div class="mindle_select">
        <div class="leftOne">分类 </div>
        <div class="rightS">
          <div >
            <ul class="first_lable">
              <li
                v-for="(item,fidx) in lable"
                :key="'fstL'+item.LabelID"
                @click="setSecondLable(fidx)"
                :class="[item.LabelID===secondLable.LabelID?'first_lable_active':'']">
                {{ item.LabelName }}
              </li>
            </ul>
            <div v-if="secondLable.Childs&&secondLable.Childs.length" class="second_lable">
              <ul class="second_select">
                <li
                  v-for="(sItem,sidx) in secondLable.Childs"
                  :key="'scdL'+sItem.LabelID"
                  @click="setThirdLable(sidx)"
                  :class="[sItem.LabelID===thirdLable.LabelID?'second_lable_active':'']">
                  {{ sItem.LabelName }}
                </li>
              </ul>
              <div v-if="thirdLable.Childs&&thirdLable.Childs.length" class="third_lable">
                <ul>
                  <li
                    v-for="(tItem,tidx) in thirdLable.Childs"
                    :key="'tcdL'+tItem.LabelID"
                    @click="setThirdSelect(tidx)"
                    :class="[tItem.LabelID===thirdLableSelect.LabelID?'third_lable_active':'']">
                    {{ tItem.LabelName }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bot_paper">
        <div class="sort_bar">
          <div class="sortTitle">排序</div>
          <div @click="sortPaper(1)">销量排序</div>
          <div @click="sortPaper(2)">评分排序</div>
          <div @click="sortPaper(3)">最新试卷</div>
        </div>
        <div class="paperCt">
          <template v-if="total">
            <div v-for="(item,idx) in paperList" :key="'paper'+idx" class="paper">
              <div class="paper_top" @click="goDetial(item.PaperID)">
                <div class="paperInfo">
                  <div class="paperName">{{ item.PaperTitle }}</div>
                  <div class="paperBrief">{{ item.Introduction }}</div>
                  <div class="paperOwner">
                    <span>{{ item.UserName||'stsq_'+item.UserID }}</span><span>{{ formatDate(new Date(item.OperateTime),'yyyy-MM-dd hh:mm') }}</span>
                  </div>
                </div>
                <div class="testNum">{{ item.TestNum }}题</div>
              </div>
              <div class="paper_bot">
                <span>{{ item.AvgScore?item.AvgScore.toFixed(1):0 }}分</span>
                <span><img src="@/imgs/index_market/sold.png" alt="">已售{{ item.SellerCount }}</span>
                <div class="bot_right">
                  <span class="prise">￥<span>{{ item.Price }}</span></span>
                  <span class="goBuy Btn" @click="goBuy(idx)">购买</span>
                </div>
              </div>
            </div>
          </template>
          <div class="noPaperTips" v-else>
            Oops~~没搜到您要找的试卷，换个关键词试试
          </div>
        </div>
        <div v-if="total" class="pageGation">
          <a-pagination
            show-quick-jumper
            :page-size="9"
            :total="total"
            :current="currentpage"
            @change="onPageChange"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { allLabel, searchPayPaperPC } from '@/api/marketApi'
import { PAPERID } from '@/store/mutation-types'
import { formatDate } from '@/utils/utils'
export default {
  data: function () {
    return {
      lable: [],
      secondLable: {},
      thirdLable: {},
      thirdLableSelect: {},
      // 搜索条件
      searchType: 'all', // all 或lable 有keyword时才判断
      choiselabelID: '', // 3,4
      activeLable: '',
      keyword: '',
      sortType: 1, // 排序 1销售数 2平均分数 3最新试卷
      currentpage: 1,
      pagesize: 10,
      total: 10,
      // 搜索结果
      paperList: [],
      formatDate,

      loading: false,
      showQrcode: false,
      selectPayType: false,
      payType: '',
      outTradeNo: '',
      paperPayNow: {},
      imgUrl: '',
      tel: ''
    }
  },
  created () {
    allLabel().then(res => {
      this.lable = res
    })
    this.getpayPaperList()
  },
  methods: {
    // 查询集市试卷列表
    getpayPaperList () {
      this.loading = true
      let param = {
        labelID: this.choiselabelID,
        keyword: this.keyword,
        page: this.currentpage,
        pagesize: this.pagesize,
        sort: this.sortType
      }
      if (this.keyword) { // 有搜索词需要判断是否按分类搜索
        if (this.searchType === 'all') { // 搜所有分类
          param = {
            keyword: this.keyword,
            page: this.currentpage,
            pagesize: this.pagesize,
            sort: this.sortType
          }
          this.secondLable = {}
          this.thirdLable = {}
          this.thirdLableSelect = {}
        }
      }
      searchPayPaperPC(param).then(res => {
        this.paperList = []

        for (let i = 0; i < res.PaperList.length; i++) {
          if (res.PaperList[i].LabelID) {
            res.PaperList[i]['lableName'] = this.getLableName(res.PaperList[i].LabelID) || ''
          }
        }
        this.paperList = res.PaperList
        this.total = res.TotalNumber
        this.loading = false
      }, () => {
        this.paperList = []
        this.total = 0
        this.loading = false
      })
    },
    getLableName (LabelID) {
      const name = []
      for (let i = 0; i < this.lable.length; i++) {
        const first = this.lable[i]
        if (first.LabelID === LabelID) {
          name.unshift(first.LabelName)
          return name.join(' > ')
        } else {
          if (first.Childs.length) {
            for (let j = 0; j < first.Childs.length; j++) {
              const second = first.Childs[j]
              if (second.LabelID === LabelID) {
                name.unshift(first.LabelName)
                name.unshift(second.LabelName)
                return name.join(' > ')
              } else {
                if (second.Childs.length) {
                  for (let k = 0; k < second.Childs.length; k++) {
                    const third = second.Childs[k]
                    if (third.LabelID === LabelID) {
                      name.unshift(first.LabelName)
                      name.unshift(second.LabelName)
                      name.unshift(third.LabelName)
                      return name.join(' > ')
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    getallLable () {
      this.activeLable = ''
      this.choiselabelID = ''
      this.getpayPaperList()
    },
    setLable (idx) {
      const secondLable = this.lable[idx]
      if (secondLable.Childs.length) {
        const lableIDArr = []
        this.getAllChildsLableID(secondLable.Childs, lableIDArr)
        this.choiselabelID = lableIDArr.join(',')
      } else {
        this.choiselabelID = secondLable.LabelID
      }
      this.activeLable = secondLable.LabelID
      this.getpayPaperList()
    },
    // 设置二级分类
    // setSecondLable (fidx) {
    //   this.secondLable = {}
    //   this.thirdLable = {}
    //   this.thirdLableSelect = {}
    //   if (this.searchType === 'all') { // 搜所有分类
    //     this.keyword = ''
    //   }
    //   this.secondLable = this.lable[fidx]
    //   if (this.secondLable.Childs.length) {
    //     const lableIDArr = []
    //     this.getAllChildsLableID(this.secondLable.Childs, lableIDArr)
    //     this.choiselabelID = lableIDArr.join(',')
    //   } else {
    //     this.choiselabelID = this.secondLable.LabelID
    //   }
    //   this.getpayPaperList()
    // },
    // // 设置三级分类
    // setThirdLable (sidx) {
    //   this.thirdLable = {}
    //   this.thirdLableSelect = {}
    //   this.thirdLable = this.secondLable.Childs[sidx]
    //   if (this.thirdLable.Childs.length) {
    //     const lableIDArr = []
    //     this.getAllChildsLableID(this.thirdLable.Childs, lableIDArr)
    //     this.choiselabelID = lableIDArr.join(',')
    //   } else {
    //     this.choiselabelID = this.thirdLable.LabelID
    //   }
    //   this.getpayPaperList()
    // },
    // // 三级分类点击
    // setThirdSelect (tidx) {
    //   this.thirdLableSelect = {}
    //   this.thirdLableSelect = this.thirdLable.Childs[tidx]
    //   this.choiselabelID = this.thirdLableSelect.LabelID
    //   this.getpayPaperList()
    // },
    // 递归出所有分类子级的ID
    getAllChildsLableID (lableArr, result) {
      for (let i = 0; i < lableArr.length; i++) {
        if (lableArr[i].Childs.length) {
          this.getAllChildsLableID(lableArr[i].Childs, result)
        } else {
          result.push(lableArr[i].LabelID)
        }
      }
    },
    // 搜索类型变化
    handleChange (type) {
      this.searchType = type
    },
    sortPaper (sortType) {
      this.sortType = sortType
      this.getpayPaperList()
    },
    // 分页变化
    onPageChange (page, pageSize) {
      this.currentpage = page
      this.getpayPaperList()
    },
    // 去试卷详情
    goDetial (paperID) {
      this.$ls.set(PAPERID, paperID)
      this.$router.push('/home/market_detial')
    },
    // 去预览试卷
    goPreViewTest (paperID) {
      this.$ls.set(PAPERID, paperID)
      this.$router.push('/home/market_detial?preview=1')
    },
    // 购买点击
    goBuy () {
      const host = window.location.host
      window.open('http://' + host + '/login?redirect=' + decodeURIComponent('/index/market'), '_blank')
    },
    goRegister () {
      const host = window.location.host
      window.open('http://' + host + '/login?register=1&tel=' + this.tel, '_blank')
    },
    openFWxieyi () {
      var iWidth = window.screen.width * 0.7
      var iHeight = window.screen.height * 0.8
      const myWindow = window.open('http://iosstsq.tibosi.com/html/userAgrm.html', '', 'height=' + iHeight + ',width=' + iWidth)
      myWindow.focus()
    },
    openYSxieyi () {
      var iWidth = window.screen.width * 0.7
      var iHeight = window.screen.height * 0.8
      const myWindow = window.open('http://iosstsq.tibosi.com/html/userPrivacyAgrm.html', '', 'height=' + iHeight + ',width=' + iWidth)
      myWindow.focus()
    }
  }
}
</script>
<style lang="less" scoped>
  @import url(./market.less);
</style>
