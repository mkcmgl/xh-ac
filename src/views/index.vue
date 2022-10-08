<template>
<div class="back">
  <div class="home-left">
    <div class="title">总览</div>

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
              <span class="num">5</span>
              <span class="text2">公共服务接入数</span>
              <span class="num">5</span>
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
      <el-button class="button-center" type="primary">立刻进入</el-button>
    </div>
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
              <span class="num">5</span>
              <span class="text2">公共服务接入数</span>
              <span class="num">5</span>
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
      <el-button class="button-center" type="primary">立刻进入</el-button>
    </div>
    <div class="leftWap">
      <div class="wapTop">
        <div class="leftTop">公共服务管理平台</div>
        <div class="rightTop">提供公共服务及服务共享功能</div>
      </div>
      <div class="wapCenter">
        <el-row>
          <el-col :span="8">
            <div class="cernter-left">
              <span class="text1">子链接入数</span>
              <span class="num">5</span>
              <span class="text2">公共服务接入数</span>
              <span class="num">5</span>
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
      <el-button class="button-center" type="primary">立刻进入</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.button-center{
  position: absolute;
  right: 1.25rem;
  top:1.875rem;
  width: 6.5625rem;
  height: 2.5rem;
  padding: 0;
  font-size: 12Px;
  border-radius: .333333rem .333333rem .333333rem .333333rem;
  font-family: PingFang SC-Regular,PingFang SC;
}
.leftWap {
  width: 110rem;
  height: 11.5rem;
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
  height: 1.375rem;

  margin-top: 0.9375rem;
  padding-left: 1.125rem;
  border-left: 0.5rem solid #2f88ff;
}
.leftTop {
  font-size: 16px;
  font-weight: 800;
  color: #333333;
  line-height: 22px;
  display: inline-block;
}
.rightTop {
  margin-left: 3.125rem;
  font-size: 0.875rem;
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
    font-size: 0.875rem;
    color: #333333;
    font-weight: normal;
    line-height: 3.125rem;
    margin-left: 2rem;
    vertical-align: super;
  }
  .num {
    display: inline-block;
    height: 3.125rem;
    font-size: 30px;
    font-weight: bold;
    color: #333333;
    line-height: 3.125rem;
    margin-left: 1.25rem;
  }
  .text2 {
    display: inline-block;
    height: 3.125rem;
    margin-left: 6.25rem;
    font-size: 0.875rem;
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

