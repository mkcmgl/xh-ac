<template>
  <div class="login">
    <div class="loginLeft">
      <p class="leftContent">区块链公共服务平台</p>
      <div class="line"></div>
    </div>
    <div class="login-form" v-show="!bidLogin">
      <p class="loginFormTitle">用户登录</p>
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" style="fontSize:16px">
        <el-tab-pane label="密码登录" name="first" > </el-tab-pane>
        <el-tab-pane label="验证码登录" name="second"></el-tab-pane>
      </el-tabs>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" v-show="!numberLogin">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入账号/手机号/邮箱">

          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入登录密码"
            @keyup.enter.native="handleLogin">

          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaOnOff">
          <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" style="width: 63%"
            @keyup.enter.native="handleLogin">

          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
      </el-form>
      <el-form ref="mailLoginForm" :model="mailLoginForm" :rules="mailLoginRules" v-show="numberLogin">
        <el-form-item prop="phoneNumber">
          <el-input v-model="mailLoginForm.phoneNumber" type="text" auto-complete="off" placeholder="请输入手机号">

          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaOnOff">
          <el-input v-model="mailLoginForm.code" auto-complete="off" placeholder="请输入验证码" style="width: 63%"
            @keyup.enter.native="handleLogin">

          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
        <el-form-item prop="receiveCode">
          <el-input v-model="mailLoginForm.receiveCode" auto-complete="off" placeholder="短信验证码" style="width: 63%"
            @keyup.enter.native="handleLogin">

          </el-input>
          <div class="login-code">
            <el-button class="sendBtn" @click="getPhoneCode" :disabled="sendMessage">{{
                !sendMessage ? "获取短信验证码" : messageTime
            }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-button :loading="loading" size="medium" type="primary" style="width: 100%"
        @click.native.prevent="handleLogin">
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
      <!-- <div style="float: left; margin-top: 15px">
        <p class="leftLoginType" @click="toBidLogin">BID登录</p>
      </div> -->
      <div style="float: right; margin-top: 15px">
        <router-link class="link-type" :to="'/register'">没有账号？注册</router-link>
      </div>
    </div>
    <div v-show="bidLogin" class="login-form">
      <p class="loginFormTitle">用户登录</p>
      <el-form ref="bidLoginForm" :model="bidLoginForm" :rules="bidLoginRules">
        <el-form-item prop="privateKey">
          <el-input v-model="bidLoginForm.privateKey" type="text" auto-complete="off" placeholder="请输入私钥">

          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="bidLoginForm.code" auto-complete="off" placeholder="请输入验证码" style="width: 63%"
            @keyup.enter.native="handleLogin">
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
      </el-form>
      <el-button :loading="loading" size="medium" type="primary" style="width: 100%"
        @click.native.prevent="handleLogin">
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
      <div style="float: left;  margin-top: 15px">
        <p class="leftLoginType" @click="changeLogin">切换其他登录方法</p>
      </div>
      <div style="float: right; margin-top: 15px">
        <router-link class="link-type" :to="'/register'">没有账号？注册</router-link>
      </div>
    </div>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script>
import { getCodeImg, getPhoneCode } from "@/api/login/login.js";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import data from './system/dict/data.vue';

export default {
  components: { data },
  name: "Login",
  data() {
    const equalToNameEmpty = (rule, value, callback) => {
      if (/\s/g
        .test(value)) {
        callback(new Error('账户不能含有空格'));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      //使用正则表达式进行验证手机号码
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号格式！'));
      } else {
        callback();
      }
    };
    const equalTocode = (rule, value, callback) => {
      let inputCode = value.toUpperCase()
      let testCode = this.mailLoginForm.testCode.toUpperCase()
      if (inputCode !== testCode) {
        callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
        passwordLogin: true,
        certifyLogin: false,
        testCode: ''
      },
      messageTime: "",
      sendMessage: false,
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
          {
            min: 5,
            max: 20,
            message: "用户账号长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
           { required: true, validator: equalToNameEmpty, trigger: "blur" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      mailCodeUrl: "",
      mailLoginForm: {
        phoneNumber: "",
        code: "",
        uuid: "",
        receiveCode: "",
      },
      mailLoginRules: {
        phoneNumber: [
          { required: true, trigger: "blur", message: "请输入手机号码" },
          { validator: validatePhone, trigger: 'blur' }
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" },
        ],
        receiveCode: [
          { required: true, trigger: "blur", message: "请输入手机验证码" },
        ],
      },
      bidLoginForm: {
        privateKey: '',
        code: '',
        uuid: ''
      },
      bidLoginRules: {
        privateKey: [
          { required: true, trigger: "blur", message: "请输入私钥" },
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: true,
      redirect: undefined,
      activeName: "first",
      numberLogin: false,
      sendMessage: false,
      messageTime: "",
      //登录类型 0密码账号登录 1手机号登录 2BID登录
      loginType: 0,
      bidLogin: false
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;

      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          switch (this.loginType) {
            case 0:
              this.loginForm.uuid = res.uuid;
              break;
            case 1:
              this.mailLoginForm.uuid = res.uuid;
              this.mailLoginForm.testCode = res.imageCode
              break;
            case 2:
              this.bidLoginForm.uuid = res.uuid;
          }
        }
      });
    },
    handleLogin() {
      switch (this.loginType) {
        case 0:
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              this.$store
                .dispatch("passwordLogin", this.loginForm)
                .then(() => {
                  // this.$router.push({ path: this.redirect || "/" })
                  this.$router.push({ path:'/changeIdentity' })
                    .catch(() => { });
                })
                .catch(() => {
                  this.loading = false;
                  if (this.captchaOnOff) {
                    this.getCode();
                  }
                });
            }
          });
          break;
        case 1:
          this.$refs.mailLoginForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              this.$store
                .dispatch("phoneLogin", this.mailLoginForm)
                .then(() => {
                  this.$router.push({ path:'/changeIdentity' })
                    .catch(() => { });
                })
                .catch(() => {
                  this.loading = false;
                  if (this.captchaOnOff) {
                    this.getCode();
                  }
                });
            }
          });
          break;
        case 2:
          this.$refs.bidLoginForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              this.$store
                .dispatch("bidLogin", this.bidLoginForm)
                .then(() => {
                  this.$router.push({ path:'/changeIdentity' })
                    .catch(() => { });
                })
                .catch(() => {
                  this.loading = false;
                  if (this.captchaOnOff) {
                    this.getCode();
                  }
                });
            }
          });
      }
    },
    handleClick(e) {
      if (e.index == 0) {
        this.loginType = 0;
        this.numberLogin = false;
        this.getCode();
        this.resetForm(this, 'loginForm')
        this.resetForm(this, 'mailLoginForm')
        this.loginForm.password = ''
        this.loginForm.username = ''
        this.loginForm.code = ''
      } else {
        this.loginType = 1;
        this.numberLogin = true;
        this.getCode();
        this.resetForm(this, 'mailLoginForm')
         this.resetForm(this, 'loginForm')
      }
    },
    //获取手机登陆码
    getPhoneCode() {
      let that = this;
      let data = {
        phoneNumber: encrypt(this.mailLoginForm.phoneNumber),
        code: this.mailLoginForm.code,
        uuid: this.mailLoginForm.uuid,
        type: "login",
      };
      let beginTime = 60;
      getPhoneCode(data).then((res) => {
        if (res.code == 200) {
          that.sendMessage = true;
          that.messageTime = `${beginTime}秒后重发`;
          let sendMesTime = setInterval(function () {
            if (beginTime > 0) {
              beginTime--;
              that.messageTime = `${beginTime}秒后重发`;
            } else {
              clearInterval(sendMesTime);
              that.messageTime = "";
              that.sendMessage = false;
            }
          }, 1000);
        }
      }).catch(() => {
        this.getCode()
      });
    },
    //BID登陆
    toBidLogin() {
      this.resetForm(this, 'bidLoginForm')
      this.loginType = 2
      this.getCode()
      this.bidLogin = true
      this.numberLogin = false
      this.bidLoginForm.privateKey = ''
      this.bidLoginForm.code = ''
    },
    //账号手机号登陆
    changeLogin() {
      this.resetForm(this, 'loginForm')
      this.loginType = 0
      this.getCode()
      this.activeName = 'first'
      this.bidLogin = false
      this.numberLogin = false
      this.loginForm.password = ''
      this.loginForm.username = ''
      this.loginForm.code = ''
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  position: relative;

  .loginLeft {
    width: 50%;
    height: 100%;
    background-image: url("../assets/images/loginBg2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;

    .leftContent {
      width: 520px;
      height: 77px;
      line-height: 77px;
      margin: 184px auto 0;
      font-family: PingFang SC-Heavy;
      font-size: 55px;
      color: #fff;
    }

    .line {
      width: 90px;
      margin: 38px auto 0;
      border-top: 4px solid #fff;
    }
  }
}


.login-form {
  position: absolute;
  right: 290px;
  top: 300px;
  border-radius: 6px;
  background: #ffffff;
  width: 380px;

  // padding: 25px 25px 5px 25px;
  .loginFormTitle {
    width: 136px;
    height: 48px;
    line-height: 48px;
    font-size: 34px;
    font-family: PingFang SC-Bold;
    color: #333333;
    text-align: left;
    font-weight: bold;
  }

  .el-input {
    height: 40px;

    input {
      height: 40px;
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
  font-size: 12px;
  text-align: center;
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
  width: 100%;
}

.sendBtn {
  width: 100%;
  border: 1px solid rgb(24, 144, 255);
  color: rgb(24, 144, 255);
  font-size: 12px;
  text-align: center;
  padding: inherit;
  height: 35px;
}

.leftLoginType,
.leftLoginType:focus {
  color: #2F88FF;
  margin: 0 0;
  cursor: pointer;
  height: 54px;
  font-size: 15px;

  &:hover {
    color: rgb(32, 160, 255);
  }
}
/* 修改输入框placeHolder字体大小 */
::v-deep input::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size: 12px;
}
</style>
