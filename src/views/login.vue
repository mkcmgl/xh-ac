<template>
  <el-row style="width: 100%; height: 100%">
    <el-col :span="12">
      <div class="left">
        <p class="name">星火·联网骨干节点</p>
        <div class="text"></div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="login">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <h3 class="login-title">用户登录</h3>
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            :stretch="true"
            class="tabs"
          >
            <el-tab-pane label="密码登录" name="first"></el-tab-pane>
            <el-tab-pane label="验证码登录" name="second"></el-tab-pane>
          </el-tabs>
          <div v-if="activeFirst">
            <el-form-item prop="username" class="input-form">
              <el-input
                v-model="loginForm.username"
                type="text"
                auto-complete="off"
                placeholder="请输入账号/手机号/邮箱"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="请输入登录密码"
                @keyup.enter.native="handleLogin"
              >
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
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img" />
              </div>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item prop="phone">
              <el-input
                v-model="loginForm.phone"
                type="text"
                auto-complete="off"
                placeholder="请输入手机号"
                style="width: 31.25rem"
              >
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
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img" />
              </div>
            </el-form-item>
            <el-form-item prop="smsCde" v-if="captchaEnabled">
              <el-input
                v-model="loginForm.smsCde"
                auto-complete="off"
                placeholder="请输入短信验证码"
                style="width: 63%"
                @keyup.enter.native="handleLogin"
              >
              </el-input>
              <el-button class="phoneCode" @click="sendSms" v-show="!isDisabled"
                >获取短信验证码</el-button
              >
              <el-button
                class="phoneCode"
                v-show="isDisabled"
                :disabled="true"
                >{{ text }}</el-button
              >
            </el-form-item>
          </div>
          <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
          <el-form-item style="width: 31.25rem; font-size: 1.125rem">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
              class="login"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
          <div class="footer">
            <a href="">BID登录</a>
            <router-link to="/register">没有账号?去注册</router-link>
          </div>
        </el-form>
        <!--  底部  -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getCodeImg, getCodeSms } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    var validatePhone = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (
        !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
  
      if (value === "") {
        callback(new Error("请输入您的账号"));
      } else if (!/^[a-zA-Z0-9_-]{5,20}$/.test(value)) {
        callback(new Error("用户账号长度必须介于 5 和 20 之间"));
      } else {
        callback();
      }
    };
    return {
      isDisabled: false,
      activeFirst: true,
      activeName: "first",
      text: "",
      time: "",
      codeUrl: "",
      count: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        phone: "",
        code: "",
        smsCde: "",
        uuid: "",
      },
      loginRules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        smsCde: [
          { required: true, trigger: "blur", message: "请输入短信验证码" },
        ],
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined,
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
    // this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    sendSms() {
      if (this.loginForm.phone == "") {
        this.$message.error("请输入手机号");
      } else if (
        !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
          this.loginForm.phone
        )
      ) {
        // this.$message.error("请输入正确的手机号");
      }else if(this.loginForm.code==''){return}
      
      else {
        getCodeSms(this.loginForm.code,this.loginForm.phone, "login",this.loginForm.uuid).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.isDisabled = false;
            console.log("asdads");
          }
        });
        const vm = this;
        const TIME_COUNT = 60;
        vm.count = TIME_COUNT;
        vm.isDisabled = true;
        vm.text = vm.count + "s后重新获取";
        vm.time = setInterval(() => {
          if (vm.count > 0 && vm.count <= TIME_COUNT) {
            vm.count--;
            vm.text = vm.count + "s后重新获取";
          } else {
            vm.isDisabled = false;
            clearTimeout(vm.time);
            vm.time = null;
          }
        }, 1000);
      }
    },

    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    //登录校验及发送登录接口
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
          this.$router.push({ path: this.redirect || "/" }).catch(() => {});
          }).catch(() => {
          this.loading = false;
          if (this.captchaEnabled) {
            this.getCode();
          }
          });
        }
      });
    },
    //切换登录方式
    handleClick(tab, event) {
      console.log(tab.name, event);

      this.$refs["loginForm"].resetFields();

      if (tab.name == "second") {
        this.activeFirst = false;
      }
      if (tab.name == "first") {
        this.activeFirst = true;
      }
    },
  },
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>

.login-code img {
  width: 100%;
  height: 3.375rem;
}
::v-deep .el-form-item__error {
  padding-top: 0.9375rem;
}
.tabs {
  width: 31.25rem;
  ::v-deep .el-tabs__nav.is-stretch > * {
    font-size: 1.125rem;
  }
}
.el-button--medium {
  height: 2.5rem;
  font-size: 1.125rem;
}
.inpur-form {
  width: 31.25rem;
}
.el-form-item {
  margin-bottom: 2.2rem;
}
.el-input--medium {
  ::v-deep .el-input__inner {
    height: 3.5rem;
  }
}

.phoneCode {
  width: 10rem;
  margin-left: 1.25rem;
  font-size: 0.9375rem;
  height: 3rem;
  border: 0.0625rem solid #2f88ff;
  color: #2f88ff;
}
.el-col-12 {
  height: 100%;
}
.footer {
  display: flex;
  justify-content: space-between;
  color: #2f88ff;
}

.login-title {
  font-size: 34px;
  color: #333333;
  font-weight: bold;
}
.name {
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
.text {
  width: 90px;
  border-top: 4px solid #ffffff;
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
.left {
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
    font-size: 1.125rem;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 18px;
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
