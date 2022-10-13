<template>
  <div class="right">
    <div class="title">数字身份</div>
    <div class="center">
    
      <div class="numIdentity">
        <span class="myNumTitle">我的数字身份</span>
        <div class="mainNumData">
          <img src="@/assets/images/num1.png" />
          <div class="user" v-if="true">
            <span class="numDataTitle">你好！{???????}</span>
            <span class="numData">{???????????????????????????????????}</span>
            <span class="userType">{????}</span>
          </div>
          <div class="user" v-else>
            <span class="numDatatitle">温馨提示：您还未创建数字身份，请 <span class="creat">立即创建</span></span>
            
          </div>
        </div>
        <el-popover
        class="rightContent"
        placement="bottom"
        ref="test"
        width="200"
        trigger="hover"
      >
        <p class="editTo hoverTo" >导出私钥</p>
        <p class="editTo hoverTo">修改安全密码</p>
      </el-popover>
      <span class="rightGo" v-popover:test>操作</span>
      </div>
    </div>
    <div class="userIdentity">
      <div class="userIdData">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="userDataAndLogin">
              <span class="userDataTitle">基本信息</span> 
                <ul class="userDataList">
                  <li>
                    <span class="name">账号</span>
                    <span class="nameData">{机构实名认证}</span>
                  </li>
                  <li>
                    <span class="name">账号ID</span>
                    <span class="nameData">{221}</span>
                  </li>
                  <li>
                    <span class="name">手机号</span>
                    <span class="nameData">{1231*****321}</span>
                  </li>
                  <li>
                    <span class="name">注册时间</span>
                    <span class="nameData">{2022-4-19 12：03：05}</span>
                  </li>
                  <li v-if="true">
                    <span class="name">认证状态</span>
                    <span class="nameData">{未认证}</span>
                  </li>
                  <li v-if="false">
                    <span class="name">认证状态</span>
                    <span class="nameData">{未认证}</span>
                    <span class="editId">立即认证</span>
                  </li>
                </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="userDataAndLogin">
              <span class="userDataTitle">基本信息</span> 
              <ul class="userDataList">
                <li>
                  <span class="name">登录密码</span>
                  <span class="nameData">{***}</span>
                  <span class="edit">修改</span>
                </li>
                <li>
                  <span class="name">手机号</span>
                  <span class="nameData">{1231***231}</span>
                  <span class="edit">绑定</span>
                </li>
                <li>
                  <span class="name">邮箱</span>
                  <span class="nameData">{1231***@qq.com}</span>
                  <span class="edit">绑定</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
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
@import "~@/assets/styles/public.scss";
.editTo{
  margin-bottom: 1.25rem;
margin-top: 1.25rem;
font-size: 1.125rem;
cursor: pointer;
font-family: PingFang SC-Bold, PingFang SC;
}
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

  .userIdData{
    margin-top: 2rem;


    .userDataAndLogin {
      background-color: #ffff;
      height: 18.75rem;
      padding: 1.25rem 1.875rem;
    }
    .userDataTitle {
      font-size: 1.375rem;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #333333;
  }
  ul.userDataList {
    list-style-type: none;
    padding: 0;
    li{
      margin-bottom: 1.5rem;
      .name {
        font-size: 1.125rem;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        width: 8.125rem;
        display: inline-block;
    }
    .nameData{
      font-size: 18px;
      font-family: PingFang SC-Bold,PingFang SC;
      color: #333;
      font-weight: 500;
    }
    .edit {
      margin-left: 20px;
      cursor: pointer;
      font-family: PingFang SC-Bold,PingFang SC;
      font-weight: 700;
      color: #2f88ff;
      font-size: 18px;
  }
    }

}

  }
  

}
</style>