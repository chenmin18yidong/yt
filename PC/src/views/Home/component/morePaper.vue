<template>
  <div>
    <div class="cover" v-if="loading">
      <a-spin/>
    </div>
    <dl class="morePaper">
      <dd class="paper" v-for="(item,idx) in paperList" :key="'paper'+idx">
        <div class="paper_top" @click="goDetial(item.PaperID)">
          <div class="mpaperInfo">
            <div class="paperName">{{ item.PaperTitle }}</div>
            <div class="paperBrief">{{ item.Introduction }}</div>
            <div class="paperOwner">
              <span>{{ item.UserName||'stsq_'+item.UserID }}</span><span>{{ formatDate(new Date(item.OperateTime),'yyyy-MM-dd hh:mm') }}</span>
            </div>
          </div>
          <div class="testNum">{{ item.TestNum }}题</div>
        </div>
        <div class="paper_bot">
          <span>4.5分</span><span><img src="@/imgs/index_market/sold.png" alt=""> 已售{{ item.SellerCount }}</span>
          <div class="bot_right">
            <span class="prise">￥<span>{{ item.Price }}</span></span>
            <span class="goBuy Btn" @click="goBuy(idx)">购买</span>
          </div>
        </div>
      </dd>
    </dl>
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
</template>
<script>
import { morePaper } from '@/api/marketApi'
import { formatDate } from '@/utils/utils'
import { PAPERID } from '@/store/mutation-types'
export default {
  props: {
    authorID: {
      type: Number,
      default: 0
    }
  },
  inject: ['reload'],
  data: function () {
    return {
      loading: false,
      total: 0,
      currentpage: 1,
      pagesize: 9,
      paperList: [],
      formatDate,
      showQrcode: false,
      outTradeNo: '',
      paperPayNow: {},
      imgUrl: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      morePaper(this.authorID, this.currentpage, this.pagesize).then(res => {
        this.total = res.TotalNumber
        this.paperList = res.PaperList
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    // 分页变化
    onPageChange (page, pageSize) {
      // console.log(page, pageSize)
      this.currentpage = page
      this.getData()
    },
    // 去试卷详情
    goDetial (paperID) {
      this.$ls.set(PAPERID, paperID)
      this.reload()
    },

    // 购买点击
    goBuy () {
      const host = window.location.host
      window.open('http://' + host + '/login?redirect=' + decodeURIComponent('/market/detial'), '_blank')
    }

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
.pageGation{
  text-align: right;
  overflow: hidden;
  margin: 0 15px 15px 0;
}
.morePaper{
  padding: 5px 0px 5px 5px;
  overflow: hidden;
  .paper{
    background-color: #fff;
    box-shadow: 0 0 3px #ddd;
    width: calc(33.333% - 15px);
    margin: 0 15px 15px 0;
    float: left;
    border-radius: 3px;
    .paper_top{
      padding: 15px;
      border-bottom: 1px solid#f0f0f0;
      position: relative;
      .mpaperInfo{
        width: 85%;
        overflow: hidden;
        .paperName{
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .paperBrief{
          font-size: 0.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 2px 0 10px 0;
        }
        .paperOwner{
          font-size: 0.6em;
          color: #999;
          span{
            margin-right: 15px;
          }
        }
      }
      .testNum{
        position: absolute;
        top: 15px;
        right: 15px;
        height: 24px;
        line-height: 24px;
        padding: 0px 10px;
        background-color: #f6ede0;
        color: #9b7950;
        font-size: 0.6em;
        border-radius: 20px;
      }
    }
    .paper_bot{
      padding: 10px;
      span{
        margin-right: 10px;
        color: #fd9607;
        font-size: 0.8em;
        img{
          height: 14px;
          margin-top: -3px;
        }
      }
      .bot_right{
        float: right;
        margin-top: -7px;
        .prise{
          color: red;
          span{
            font-size: 1.4rem;
            font-weight: bold;
            color: red;
          }
        }
        .Btn{
          color: #fff;
          padding: 3px 15px;
          border-radius: 20px;
        }
        .doTest{
          background-color: #4977fc;
        }
        .goBuy{
          background-color: #fd9607;
        }
      }
    }
  }
}
</style>
