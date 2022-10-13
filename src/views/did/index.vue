<template>
  <div class="right">
    <div class="title">数字身份</div>
    <div class="center">
    
      <div class="numIdentity">
        <span class="myNumTitle">我的数字身份</span>
        <div class="mainNumData">
          <img src="@/assets/images/num1.png" />
          <div class="user">
            <span class="numDataTitle">你好！{???????}</span>
            <span class="numData">{???????????????????????????????????}</span>
            <span class="userType">{????}</span>
          </div>
        </div>
        <el-popover
        class="rightGo"
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">操作</el-button>
      </el-popover>
 
      </div>
      <div class="userIdentity"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Did",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>

.right {
  margin-left: 20rem;
  padding: 1.25rem 1.875rem;
  .title {
    font-size: 1.75rem;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
}
  .center{
    position: relative;
    span.myNumTitle {
      font-size: 1.375rem;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #333333;
    }
    .mainNumData{
      height: 100%;
      img {
        float: left;
        height: 5rem;
        margin-top: 2rem;
      }
      .user {
        /* margin-left: 112px; */
        /* display: block; */
        float: left;
        margin-top: 1.625rem;
        margin-left: 2.5rem;
       .numDataTitle{
          display: inline-block;
          font-size: 1.35rem;
          font-family: PingFang SC-Heavy, PingFang SC;
          font-weight: 800;
          color: #333333;
          /* margin-top: 26px; */
          /* margin-left: 40px; */
      }
      .numData {
        /* margin-top: 6px; */
        display: block;
        font-family: PingFang SC-Regular,PingFang SC;
        font-weight: 400;
        color: #999;
        font-size: 1rem;
        margin-top: 0.5rem;
      }
      .userType {
          display: inline-block;
          padding: 0 0.416667rem;
          height: 2.083333rem;
          background: #e5f0fc;
          border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
          opacity: 1;
          font-size: 1.166667rem;
          font-family: PingFang SC-常规体,PingFang SC;
          font-weight: 400;
          color: #4e8fe9;
          line-height: 2.083333rem;
          text-align: center;
          margin-top: 0.5rem;
      }
 }
  }
  .numIdentity {
    background-color: #ffff;
    padding: 1.125rem 1.875rem;
    height: 12.5rem;
    margin-top: 2rem;
  }



  span.numDataTitle {
    display: inline-block;
    font-size: 18px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
  }
  .rightGo {
    position: absolute;
    right: 30px;
    top: 25px;
    font-size: 1.166667rem;
    font-family: PingFang SC-Bold,PingFang SC;
    font-weight: 700;
    color: #2f88ff;
}
}
}
</style>