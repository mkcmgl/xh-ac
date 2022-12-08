<template>
  <div class="back">
    <div class="title">总览</div>
    <div class="home-left">
      <div class="leftWap">
        <div class="wapTop">
          <div class="leftTop">业务运营管理平台</div>
          <div class="rightTop">提供子链、公共服务等生态接入运营管理功能</div>
        </div>
        <div class="wapCenter">
          <el-row>
            <el-col :span="8">
              <div class="cernter-left">
                <span class="text1">子链接入数</span>
                <span class="num">{{ data.childLinkNum }}</span>
                <span class="text2">公共服务接入数</span>
                <span class="num">{{ data.publicServiceLinkNum }}</span>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="cernter-right">
                <span class="user">使用指南</span>
                <span class="number">01</span>
                <span class="text">创建数字身份</span>
                <span class="number">02</span>
                <span class="text">实名认证</span>
                <span class="number">03</span>
                <span class="text">子链/公共服务接入</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-button class="button-center" type="primary" @click="toSso"
          >立刻进入</el-button
        >
      </div>
      <div class="leftWap">
        <div class="wapTop">
          <div class="leftTop">融合标识管理平台</div>
          <div class="rightTop">
            提供对新型分布式标识和工业互联网标识的融合管理
          </div>
        </div>
        <div class="wapCenter">
          <el-row>
            <el-col :span="8">
              <div class="cernter-left">
                <span class="text1">标识注册量</span>
                <span class="num">{{ data.registerTotalNum }}</span>
                <span class="text2">标识解析量</span>
                <span class="num">{{ data.resolveTotalNum }}</span>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="cernter-right">
                <span class="user">使用指南</span>
                <span class="number">01</span>
                <span class="text">创建标识数据模板</span>
                <span class="number">02</span>
                <span class="text">标识数据注册</span>
                <span class="number">03</span>
                <span class="text">标识数据解析</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-button class="button-center" type="primary">立刻进入</el-button>
      </div>
      <div class="leftWap">
        <div class="wapTop">
          <div class="leftTop">公共服务管理平台</div>
          <div class="rightTop">提供公共服务及服务共享功能</div>
        </div>
        <div class="wapCenter">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple1">
                <div class="rightImg">
                  <img src="@/assets/images/548.png" class="img" />
                </div>
                <div class="leftImg">
                  <img src="@/assets/images/7.png" class="img" />
                </div>
                <span class="spanTitle">BaaS服务</span>
                <span class="spanFooter">提供一站式区块链服务</span>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple2">
                <div class="rightImg">
                  <img src="@/assets/images/549.png" class="img" />
                </div>
                <div class="leftImg">
                  <img src="@/assets/images/6.png" class="img" />
                </div>
                <span class="spanTitle">分布式数字身份</span>
                <span class="spanFooter">实现分布式数字证书签发</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple3">
                <div class="rightImg">
                  <img src="@/assets/images/567.png" class="img" />
                </div>
                <div class="leftImg">
                  <img src="@/assets/images/5.png" class="img" />
                </div>
                <span class="spanTitle">通用存证服务</span>
                <span class="spanFooter">电子数据可信化保存</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple4">
                <div class="rightImg">
                  <img src="@/assets/images/550.png" class="img" />
                </div>
                <div class="leftImg">
                  <img src="@/assets/images/4.png" class="img" />
                </div>
                <span class="spanTitle">NFT服务</span>
                <span class="spanFooter">实现NFT铸造、管理</span>
              </div></el-col
            >
          </el-row>
        </div>
        <el-button class="button-center" type="primary">立刻进入</el-button>
      </div>
      <div v-show="true" class="leftWap">
        <div class="wapTop">
          <div class="leftTop">监测监管服务平台</div>
          <div class="rightTop">平台运行情况持续检测监管</div>
        </div>
        <div class="wapCenter">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple footer" @click="goScreen">
                <div class="rightImg">
                  <img src="@/assets/images/551.png" class="img" />
                </div>
                <div class="leftImg">
                  <img src="@/assets/images/3.png" class="img" />
                </div>
                <span class="spanTitle">BaaS服务</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple footer">
                <div class="rightImg">
                  <img src="@/assets/images/552.png" class="img" />
                </div>
                <div class="leftImg">
                  <img src="@/assets/images/m4.png" class="img" />
                </div>
                <span class="spanTitle">分布式数字身份</span>
                <span class="spanFooter">实现分布式数字证书签发</span>
              </div></el-col
            >
          </el-row>
        </div>
        <el-button class="button-center" type="primary">立刻进入</el-button>
      </div>
    </div>
    <div class="home-right">
      <div>
        <img src="@/assets/images/u1.png" />
      </div>

      <span class="name">你好！{{ userData.userName }}</span>

      <ul class="userInfo">
        <li>
          <span class="userInfoTitle">数字身份</span>
          <span class="userInfoData didtrue" v-if="userData.did">{{
            userData.did
          }}</span>
          <span class="userInfoData didfalse" v-else>未创建</span>
          <span class="toIdentity" v-if="!userData.did">立即创建</span>
        </li>
        <li>
          <span class="userInfoTitle">实名认证</span>
          <span class="userInfoData true" v-show="authColor">{{
            getauthData
          }}</span>
          <span class="userInfoData false" v-show="!authColor">{{
            getauthData
          }}</span>
          <span class="userGoAuth" v-show="!authColor" @click="toAuth"
            >立刻认证</span
          >
        </li>
        <li>
          <span class="userInfoTitle">最近登录</span>
          <span class="userInfoData">{{ userData.createTime }}</span>
        </li>
      </ul>

      <!-- <div class="userInfo">
      

      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getData, redirect, getTop ,getOpToken,redirectSpv} from "@/api/did";
import {  setToken } from '@/utils/auth'
export default {
  name: "index",
  data() {
    return {
      authColor: false,
      data: {},
    };
  },
  created() {
    console.log("getNumeData");
    this.getNumeData();
  },
  computed: {
    ...mapState({
      userData: (state) => state.user.userData,
    }),
    getauthData() {
      if (this.userData.authStatus == 1) {
        this.authColor = true;
        return "已认证";
      } else if (this.userData.authStatus == 2) {
        this.authColor = true;
        return "认证中";
      } else if (this.userData.authStatus == 0) {
        this.authColor = false;
        return "未认证";
      } else {
        this.authColor = false;
        return "认证未通过";
      }
    },
  },
  methods: {
    getNumeData() {
      getData().then((res) => {
        this.data = res.data;
        console.log(this.data);
      });
    },
    toAuth() {
      this.$router.push("/auth");
    },
    toSso() {
      const clientId = "op";
      redirect({ clientId: clientId }).then((res) => {
        console.log(res);
        getOpToken({code:res.data.code}).then((ress)=>{
          console.log(ress)
          this.$store.dispatch('OpSetToken', ress.msg)
        })


        let test = "";
        test = res.data.redirectUri;
        const index = res.data.redirectUri.indexOf("scbp/");
        const toAdress = test.substring(index + 5);
        this.$router.push({
          path: toAdress,
          query: { data: res.data.code },
        });
      });
    },
    goScreen() {
      console.log("goScreen");
      const clientId = "spv";
      redirectSpv({ clientId }).then((res) => {
        console.log(res);
        getTop({ code: res.data.code }).then((ress) => {
          console.log(ress);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.back {
  padding-top: 3.75rem;
}

span.userInfoData.true {
  background-color: #ddf5e9;
  color: #4cb883;
  padding: 0.3125rem 1.125rem;
  border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
}
span.userInfoData.false {
  background-color: #f4f3f7;
  padding: 0.3125rem 1.125rem;
  border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
}
span.userGoAuth {
  margin-left: 1.25rem;
  font-size: 1.25rem;
  font-family: PingFang SC-常规体, PingFang SC;
  font-weight: normal;
  color: #2f88ff;
}
span.userInfoData.didfalse {
  background-color: #f4f3f7;
  padding: 0.3125rem 0px;
  border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
  width: 5.5rem;
  text-align: center;
  display: inline-block;
}
span.toIdentity {
  margin-left: 1.25rem;
  font-size: 1.25rem;
  font-family: PingFang SC-常规体, PingFang SC;
  font-weight: normal;
  color: #2f88ff;
}
.home-right {
  width: 43.75rem;
  background: #fff;
  margin-right: 1.875rem;
  float: right;
  img {
    margin-top: 1.875rem;
    margin-left: 1.875rem;
    height: 5rem;
  }
  .name {
    font-size: 1.5rem;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    display: block;
    margin-top: -3.6875rem;
    margin-left: 8.8125rem;
  }

  .userInfo {
    list-style-type: none;
    margin-top: 2.5rem;
    li {
      margin-bottom: 2rem;
    }
    .userInfoTitle {
      margin-right: 2.25rem;
      font-size: 1.125rem;

      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;
      color: #999999;
    }
    .userInfoData {
      font-size: 1.125rem;
      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;

      word-break: break-all;
    }
  }
}
.home-left {
  float: left;
}

.rightImg {
  position: absolute;
  top: 1.875rem;
  left: 2.625rem;
  .img {
    height: 3.125rem;
  }
}
.leftImg {
  position: absolute;
  top: 1rem;
  left: 22rem;
  .img {
    height: 5.125rem;
  }
}
.wapCenter {
  margin-top: 2rem;
}

.el-row {
  margin-right: 0.7rem !important;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.spanTitle {
  font-size: 1.375rem;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #ffffff;
  display: inline-block;
  margin-top: 1.5rem;
  margin-left: 6.25rem;
}
.spanFooter {
  font-size: 1.125rem;
  font-family: PingFang SC-常规体, PingFang SC;
  font-weight: normal;
  color: #fff;
  display: inline-block;
  margin-top: 0.3rem;
  margin-left: 6.25rem;
}
.grid-content.bg-purple.footer {
  background: #f5f8ff;
  .spanTitle {
    font-size: 1.375rem;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333;
    display: inline-block;
    margin-top: 2.5rem;
    margin-left: 7.5rem;
  }

  .rightImg {
    position: absolute;
    top: 1.4rem;
    left: 2.625rem;
    .img {
      height: 4.125rem;
    }
  }
  .leftImg {
    position: absolute;
    top: 1rem;
    left: 42rem;
    .img {
      height: 5.125rem;
    }
  }
}
.bg-purple1 {
  background: linear-gradient(137deg, #50a5fa, #5ea1fb 26%, #85c6ff);
}
.bg-purple2 {
  background: linear-gradient(156deg, #a485e3 0%, #b394f1 100%);
}
.bg-purple3 {
  background: linear-gradient(137deg, #6e94fb 0%, #85a6ff 100%);
}
.bg-purple4 {
  background: linear-gradient(138deg, #6bc1e1 0%, #85dddd 100%);
  .leftImg {
    left: 20rem;
  }
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 6.875rem;
  position: relative;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.button-center {
  position: absolute;
  right: 1.25rem;
  top: 0.875rem;
  width: 6.5625rem;
  height: 2.5rem;
  padding: 0;
  font-size: 12px;
  border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
  font-family: PingFang SC-Regular, PingFang SC;
}
.leftWap {
  width: 110rem;
  height: 12.5rem;
  position: relative;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 0.0625rem solid rgb(232, 232, 232, 0.5);
  margin-left: 2.4375rem;
  padding-left: 2.125rem;
  margin-bottom: 1.5625rem;
}
.wapTop {
  height: 1.875rem;

  margin-top: 0.9375rem;
  padding-left: 1.125rem;
  border-left: 0.36rem solid #2f88ff;
}
.leftTop {
  font-size: 1.5rem;
  font-weight: 800;
  color: #333333;
  line-height: 22px;
  display: inline-block;
}
.rightTop {
  margin-left: 3.125rem;
  font-size: 1.2rem;
  font-weight: normal;
  color: #999999;
  line-height: 22px;
  display: inline-block;
}

.cernter-left {
  margin-top: 2.475rem;
  height: 3.125rem;
  overflow: hidden;
  border-right: 0.125rem solid #ebebeb;
  .text1 {
    display: inline-block;
    height: 3.125rem;
    font-size: 1.25rem;
    color: #333333;
    font-weight: normal;
    line-height: 3.125rem;
    margin-left: 2rem;
    vertical-align: super;
  }
  .num {
    display: inline-block;
    height: 3.125rem;
    font-size: 2.8125rem;
    font-weight: bold;
    color: #333333;
    line-height: 3.125rem;
    margin-left: 1.25rem;
  }
  .text2 {
    display: inline-block;
    height: 3.125rem;
    margin-left: 6.25rem;
    font-size: 1.25rem;
    font-weight: normal;
    color: #333333;
    line-height: 3.125rem;
    vertical-align: super;
  }
}

.cernter-right {
  margin-left: 6.25rem;
  margin-top: 2.475rem;
  height: 4.125rem;
  overflow: hidden;
  .user {
    display: inline-block;
    padding-right: 0.833333rem;
    height: 2.5rem;
    border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
    border: 0.083333rem solid #dadada;
    background: url(~@/assets/images/481.png);
    background-repeat: no-repeat;
    background-size: 1.8rem;
    background-position: 0.2rem 0.3rem;
    padding-left: 2.75rem;
    line-height: 2.5rem;
    font-size: 1.166667rem;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 600;
    color: #666;
  }
  .number {
    display: inline-block;
    margin-left: 1.875rem;
    font-size: 2.375rem;
    font-weight: 800;
    color: #accfff;
    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: top;
    font-family: PingFang SC-Heavy, PingFang SC;
  }
  .text {
    margin-left: 0.4375rem;
    font-size: 1.166667rem;
    line-height: 2.5rem;
    height: 2.5rem;
    font-weight: normal;
    color: #333333;
  }
}

.title {
  width: 44px;
  height: 30px;
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  line-height: 0px;
  margin-top: 3.125rem;
  margin-left: 3.125rem;
}
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

