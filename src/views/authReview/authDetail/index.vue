<template>
  <div class="right">
    <el-button type="primary" style="float: right">审核</el-button>
    <div class="title">
      <router-link to="/authReview">实名认证审核</router-link>
      <span class="dsc">/</span>
      <span class="dsc">详情</span>
    </div>
    <div class="top">
      <span class="infoTitle">基本信息</span>
      <div class="center">
        <ul class="userInfo">
          <li>
            <span class="userInfoTitle">认证类型</span>
            <span class="userInfoData">12313</span>
          </li>
          <li>
            <span class="userInfoTitle">申请方BID</span>
            <span class="userInfoData">123132</span>
          </li>
          <li>
            <span class="userInfoTitle">真实姓名</span>
            <span class="userInfoData"></span>
          </li>
          <li>
            <span class="userInfoTitle">身份证头像面</span>
            <span class="userInfoData"></span>
          </li>
        </ul>
        <ul class="userInfo right">
          <li>
            <span class="userInfoTitle">认证类型</span>
            <span class="userInfoData"></span>
          </li>
          <li>
            <span class="userInfoTitle">申请方BID</span>
            <span class="userInfoData">12313</span>
          </li>
          <li>
            <span class="userInfoTitle">真实姓名</span>
            <span class="userInfoData">123123</span>
          </li>
          <li>
            <span class="userInfoTitle">身份证头像面</span>
            <span class="userInfoData"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "authDetail",

  data() {
    return {
      row: {},
    };
  },
  created() {
    this.getData();
  },
  mounted() {},

  methods: {
    getData() {
      this.row = this.$route.query.row;
      console.log(this.row);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";
.dsc {
  margin-left: 0.833333rem;
  font-weight: 400;
  color: #666;
}
.top {
  padding-top: 1rem;
  height: 20rem;
  margin-top: 2rem;
  background-color: #ffff;
}
.el-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  border-radius: 0.25rem;
}

.infoTitle {
  font-size: 1.5rem;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #333333;
  display: block;
  margin-left: 2.5rem;
}
.userInfo {
  list-style-type: none;
  margin-top: 1rem;
  width: 50%;
  li {
    margin-bottom: 1rem;
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

  .center {
    display: flex;
    justify-content: space-between;
  }
}
</style>