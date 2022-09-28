<template>
  
  <el-row style="width: 100%;height: 100%;">
    <el-col :span="12">
     <div class="left">
      <p class="name">星火·联网骨干节点</p>
      <div class="text"></div>
     </div>
    
    </el-col>
    <el-col :span="12">
      <div class="login">
       
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <h3 class="login-title">用户登录</h3>
          <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true" style="width:31.25rem;">
            <el-tab-pane label="密码登录" name="first"></el-tab-pane>
            <el-tab-pane label="验证码登录" name="second"></el-tab-pane>

          </el-tabs>

          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="请输入账号/手机号/邮箱"
              style="width:31.25rem;"
            >
              <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="请输入登录密码"
              @keyup.enter.native="handleLogin"
              style="width:31.25rem;"
            >
              <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaEnabled">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              style="width: 63%"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img"/>
            </div>
          </el-form-item>
          <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
          <el-form-item   style="width:31.25rem;">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
          <div class="footer">
            <a href="">BID登录</a>
            <a href="">没有账号?去注册</a>
          </div>
        </el-form>
        <!--  底部  -->
        
      </div>
    </el-col>
  </el-row>


</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      activeName:'first',
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // this.getCode();
    // this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          // this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          // }).catch(() => {
            this.loading = false;
            // if (this.captchaEnabled) {
            //   this.getCode();
            // }
          // });
        }
      });
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.el-col-12{
  height: 100%;
}
.footer{
  display: flex;
  justify-content:space-between;
  color: #2F88FF;
}

.el-tabs__item{
  font-size: 1.125rem;
}
.login-title{
  font-size: 34px;
  color: #333333 ;
  font-weight: bold;
}
.name{
  //position: relative;
  //left: 235px;
  //right: 235px;
  //top: 184px;
  margin-top: 11.5rem;
  text-align: center;
  padding: 0;
  font-size: 3.4375rem;
color: #ffffff;
}
.text{
  width: 90px;
  border-top: 4px solid #FFFFFF;;
  border-block-color: #fff;
 
  margin: 38px auto;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100%;
  width: 31.25rem;

}
.left{
  height: 100%;
  width: 100%;
  background-image: url(~@/assets/images/login-background.png);
  background-size: 100% 100%;
  overflow: hidden;

}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;

  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
