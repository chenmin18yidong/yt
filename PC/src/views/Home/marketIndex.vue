<template>
  <div>
    <div class="headers">
      <div class="top">
        <!-- <div id="userName" style="display: none;" ></div>
        <span class="logout" style="display: none;">退出</span>
        <a href="/index/paper_manager" target="_blank" title="进入试题系统"><div class="enter" id="enter" style="display: none;"><img src="@/imgs/home/ct_enter.png" alt=""> 进入试题系统</div></a> -->
        <a title="注册/登录"><div id="goLogin"> 注册/登录</div></a>
        <a ><div class="enter" id="goRegist">免费试用</div></a>
      </div>
      <div class="topBar">
        <div class="tabBar">
          <a href=""><img class="icon" src="/logo.png" alt=""></a>
          <a title="首页"><div>首页</div></a>
          <a title="搜题"><div >搜题</div></a>
          <a target="_blank" href="/" title="题集市"><div class="bar_Active">题集市</div></a>
          <a title="题库"><div>题库</div></a>
          <a title="APP"><div>APP</div></a>
          <a title="公司简介"><div>公司简介</div></a>
          <a title="帮助教程" target="_blank" @click="gohelp()" class="bar_Active"><div>帮助教程</div></a>
          <div class="search">
            <div class="search_Input">
              <input type="text" class="searchInput" v-model="text" placeholder="输入您想找的试题">
            </div>
            <div class="search_Btn" @click="goSearch">
              搜答案
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      text: ''
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    goSearch () {
      window.location.href = '/search/searchf.html?searchWords=' + this.text
    },
    goLogin () {
      window.location.href = '/login'
    },
    goUse () {
      window.location.href = '/login?register=1'
    },
    gohelp () {
      this.$router.push('/Help/help')
    }
  }
}
</script>
<style lang="less" scope>
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color: #222;
  &:hover{
    color: #222;
  }
}

.headers{
  width: 100%;
  background-color: #f3f3f3;
  .top{
    width: 1330px;
    padding: 7px 0;
    margin: auto;
    display: flex;
    text-align: right;
    justify-content : flex-end;
    font-size: 0.6rem;
    letter-spacing: 1px;
    position: relative;
    a{
      color: #666;
      &:hover{
         color: #666;
      }
    }
    div{
      padding: 2px;
      margin: 0 15px;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .companyName{
      position: absolute;
      left: 12.5vw;
      color: #333;
      letter-spacing: 1px;
    }
    .enter{
      background-color: #d5ffbb;
      color: #03a003;
      padding: 2px 10px;
      border-radius: 5px;
      img{
        width:1.2rem;
        margin-top: -1px;
        margin-right: 5px;
        float: left;
      }
    }
  }
  .topBar{
    width: 100%;
    background-color: #fff;
    padding: 30px 0 12px 0;
    .tabBar{
      width: 1330px;
      margin: auto;
      display: flex;
      font-size: 1rem;
      color: #000;
      position: relative;

      a{
        margin-right: 40px;
        div{
          min-width: 60px;
          text-align: center;
          cursor: pointer;
        }
        img{
          width: 125px;
          float: left;
          margin-top: -20px;
        }
      }
      .search{
        width: 364px;
        display: flex;
        border: 2px solid #ff6c00;
        border-radius: 3px;
        font-size: 0.8rem;
        overflow: hidden;
        line-height: 28px;
        color: #666;
        position: absolute;
        right: 0;
        top: -10px;
      }
      .search_Input{
        width: 100%;
        input{
          width: 90%;
          margin-left: 6%;
          border: none;
          outline: none;
        }
      }
      .search_Btn{
        width: 70px;
        text-align: center;
        color: #fff;
        background-color: #ff6c00;
        flex-shrink: 0;
        font-size: 0.6rem;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .bar_Active{
   font-weight: bold;
  }
}
</style>
