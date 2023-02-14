<template>
  <div class="register">
    <div class="registerLeft">
      <div class="registerLeftTitle">
        <p class="leftContent">区块链公共服务平台</p>
        <div class="line"></div>
      </div>
    </div>
    <div class="register-form">
      <p class="registerFormTitle">欢迎注册</p>
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="手机号注册" name="first">
          <div>
            <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
              <el-form-item prop="username">
                <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="请输入账号，5-20字符">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="registerForm.password" type="password" auto-complete="off"
                  placeholder="需同时包含数字、大小写字母及特殊字符（非空格）" @keyup.enter.native="handleRegister" show-password>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input v-model="registerForm.confirmPassword" type="password" auto-complete="off"
                  placeholder="请确认登录密码" @keyup.enter.native="handleRegister" show-password>
                </el-input>
              </el-form-item>
              <el-form-item prop="phoneNumber">
                <el-input v-model="registerForm.phoneNumber" auto-complete="off" placeholder="请输入手机号"
                  @keyup.enter.native="handleRegister">
                </el-input>
              </el-form-item>
              <el-form-item prop="code" v-if="captchaOnOff">
                <el-input v-model="registerForm.code" auto-complete="off" placeholder="验证码" style="width: 70%"
                  @keyup.enter.native="handleRegister">
                </el-input>
                <div class="register-code">
                  <img :src="codeUrl" @click="getCode" class="register-code-img" />
                </div>
              </el-form-item>
              <el-form-item prop="receiveCode">
                <el-input v-model="registerForm.receiveCode" auto-complete="off" placeholder="短信验证码" style="width: 70%"
                  @keyup.enter.native="handleLogin">
                </el-input>
                <div class="register-code">
                  <el-button class="sendBtn" @click="getPhoneCode" :disabled="sendMessage">{{ !sendMessage ? "获取短信验证码" :
                      messageTime
                  }}</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="second">
          <div>
            <el-form ref="emailRegisterForm" :model="emailRegisterForm" :rules="emailRegisterRules">
              <el-form-item prop="username">
                <el-input v-model="emailRegisterForm.username" type="text" auto-complete="off"
                  placeholder="请输入账号，5-20字符">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="emailRegisterForm.password" type="password" auto-complete="off"
                  placeholder="需同时包含数字、大小写字母及特殊字符（非空格）" @keyup.enter.native="handleRegister" show-password>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input v-model="emailRegisterForm.confirmPassword" type="password" auto-complete="off"
                  placeholder="请确认登录密码" @keyup.enter.native="handleRegister" show-password>
                </el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="emailRegisterForm.email" auto-complete="off" placeholder="请输入邮箱"
                  @keyup.enter.native="handleRegister">
                </el-input>
              </el-form-item>
              <el-form-item prop="code" v-if="captchaOnOff">
                <el-input v-model="emailRegisterForm.code" auto-complete="off" placeholder="验证码" style="width: 70%"
                  @keyup.enter.native="handleRegister">
                </el-input>
                <div class="register-code">
                  <img :src="codeUrl" @click="getCode" class="register-code-img" />
                </div>
              </el-form-item>
              <el-form-item prop="receiveCode">
                <el-input v-model="emailRegisterForm.receiveCode" auto-complete="off" placeholder="邮箱验证码"
                  style="width: 70%" @keyup.enter.native="handleLogin">
                </el-input>
                <div class="register-code">
                  <el-button class="sendBtn" @click="getMailCode" :disabled="sendMailMessage">
                    <span v-if="!inSend">{{
                        !sendMailMessage ? "获取邮箱验证码" : mailMessageTime
                    }}</span>
                    <span v-else>发送中</span>
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="BID注册" name="three">
          <div>
            <div class="notice">
              <p class="noticeContent">安全密码不同于登录密码，该密码用于加密您保护的私钥</p>
            </div>
            <el-form ref="bidRegisterForm" :model="bidRegisterForm" :rules="bidRegisterRules">
              <el-form-item prop="username">
                <el-input v-model="bidRegisterForm.username" type="text" auto-complete="off" placeholder="请输入账号，5-20字符">
                </el-input>
              </el-form-item>
              <el-form-item prop="securePassword">
                <el-input v-model="bidRegisterForm.securePassword" type="password" auto-complete="off"
                  placeholder="需同时包含数字、大小写字母及特殊字符（非空格）" @keyup.enter.native="handleRegister" show-password>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input v-model="bidRegisterForm.confirmPassword" type="password" auto-complete="off"
                  placeholder="请确认安全密码" @keyup.enter.native="handleRegister" show-password>
                </el-input>
              </el-form-item>
              <el-form-item prop="code" v-if="captchaOnOff">
                <el-input v-model="bidRegisterForm.code" auto-complete="off" placeholder="验证码" style="width: 70%"
                  @keyup.enter.native="handleRegister">
                </el-input>
                <div class="register-code">
                  <img :src="codeUrl" @click="getCode" class="register-code-img" />
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane> -->
      </el-tabs>
      <p class="readContent">
        点击"注册"按钮，即代表您已阅读并同意<span>《**服务协议》和《**隐私服务》</span>
      </p>
      <div>
        <el-button :loading="loading" size="medium" type="primary" style="width: 100%"
          @click.native.prevent="handleRegister">
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="text-align: right;margin-top: 15px;">
          <router-link class="link-type" :to="'/login'">登录已有账户</router-link>
        </div>
      </div>
    </div>
    <!-- bid注册成功弹框 -->
    <!-- 导出私钥 -->
    <el-dialog title="导出私钥" :visible.sync="exportKeyShow" width="28%" :before-close="closeKey" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <div class="notice1">
        <div class="noticeContent1">私钥导出后请在安全的环境中妥善保管，切勿保存至邮箱、网盘、微信收藏等;</div>
        <div class="noticeContent1">请勿分享私钥，请勿使用网络工具传输私钥;</div>
        <div class="noticeContent1">请勿丢失私钥，丢失后无法找回;</div>
      </div>
      <div>
        <span>私钥:</span>
        <span style="margin-left:10px">{{ privateKey }}</span>
        <span>
          <i class="el-icon-document-copy" style="color:#2F88FF;margin-left: 10px;cursor: pointer;"
            v-clipboard:copy="privateKey" v-clipboard:success="copyPrivateKey" v-clipboard:error="copyPrivateKey"></i>
        </span>
      </div>
      <div class="buttonline"></div>
      <div class="btnWarp">
        <el-button type="primary" @click="confirmExportKey">确认</el-button>
      </div>
    </el-dialog>
    <!--  底部  -->
    <!-- <div class="el-register-footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script>
import {
  getCodeImg,
  phoneRegister,
  getPhoneCode,
  getEmailCode,
  emailRegister,
  bidRegister,
} from "@/api/login/login.js";
import { encrypt, decrypt } from "@/utils/jsencrypt";
export default {
  name: "Register",
  data() {
    const equalToNameEmpty = (rule, value, callback) => {
      if (/\s/g
        .test(value)) {
        callback(new Error('账户不能含有空格'));
      } else {
        callback();
      }
    };
    const equalToEmpty = (rule, value, callback) => {
      if (/\s/g
        .test(value)) {
        callback(new Error('密码不能含有空格'));
      } else {
        callback();
      }
    };
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const emailEqualToPassword = (rule, value, callback) => {
      if (this.emailRegisterForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const bidEqualToPassword = (rule, value, callback) => {
      if (this.bidRegisterForm.securePassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const testPassword = (rule, value, callback) => {
      if (!/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(value)) {
        callback(new Error('密码必须包含数字，大小写字母，特殊字符，长度6-20！'));
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
    let validateEmail = (rule, value, callback) => {
      if (!/^([a-z0-9A-Z]+[-|_|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/.test(value)) {
        callback(new Error('请输入正确的邮箱格式！'));
      } else {
        callback();
      }
    };
    return {
      exportKeyShow: false,
      privateKey: '',
      codeUrl: "",
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: "",
        phoneNumber: "",
        receiveCode: "",
        testCode: ''
      },
      emailRegisterForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: "",
        receiveCode: "",
        email: "",
        testCode: ''
      },
      bidRegisterForm: {
        username: "",
        securePassword: "",
        confirmPassword: "",
        code: "",
        uuid: "",
      },
      activeName: "first",
      registerRules: {
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
          {
            min: 6,
            max: 20,
            message: "用户密码长度必须介于 6 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: testPassword, trigger: "blur" },
          { required: true, validator: equalToEmpty, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "change" },
        ],
        phoneNumber: [
          { required: true, trigger: "blur", message: "请输入手机号" },
          { validator: validatePhone, trigger: 'blur' }
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" },
        ],
        receiveCode: [
          { required: true, trigger: "blur", message: "请输入短信验证码" },
        ],
      },
      emailRegisterRules: {
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
          {
            min: 6,
            max: 20,
            message: "用户密码长度必须介于 6 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: testPassword, trigger: "blur" },
          { required: true, validator: equalToEmpty, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: emailEqualToPassword, trigger: "change" },
        ],
        email: [{ required: true, trigger: "blur", message: "请输入邮箱" },
        { validator: validateEmail, trigger: 'blur' }
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        receiveCode: [
          { required: true, trigger: "blur", message: "请输入邮箱验证码" },
        ],
      },
      bidRegisterRules: {
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
        securePassword: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          {
            min: 6,
            max: 20,
            message: "用户密码长度必须介于 6 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: testPassword, trigger: "blur" },
          { required: true, validator: equalToEmpty, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: bidEqualToPassword, trigger: "change" },
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      captchaOnOff: true,
      sendMessage: false,
      messageTime: "",
      sendMailMessage: false,
      mailMessageTime: "",
      //注册类型 0手机 1邮箱 2BID
      registerType: 0,
      inSend:false
    };
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
          switch (this.registerType) {
            case 0:
              this.registerForm.uuid = res.uuid;
              this.registerForm.testCode = res.imageCode
              break;
            case 1:
              this.emailRegisterForm.uuid = res.uuid;
              this.emailRegisterForm.testCode = res.imageCode
              break;
            case 2:
              this.bidRegisterForm.uuid = res.uuid;
          }
          this.codeUrl = "data:image/gif;base64," + res.img;
        }
      });
    },
    //注册，根据type不同走不通接口
    handleRegister() {
      switch (this.registerType) {
        case 0:
          this.$refs.registerForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              let phoneData = {
                username: encrypt(this.registerForm.username),
                password: encrypt(this.registerForm.password),
                code: this.registerForm.code,
                uuid: this.registerForm.uuid,
                phoneNumber: encrypt(this.registerForm.phoneNumber),
                receiveCode: encrypt(this.registerForm.receiveCode),
              }
              phoneRegister(phoneData)
                .then((res) => {
                  if (res.code == 200) {
                    this.registerMethod(this.registerForm);
                  }
                })
                .catch(() => {
                  this.loading = false;
                  this.getCode();
                });
            }
          });
          break;
        case 1:
          this.$refs.emailRegisterForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              let emailData = {
                username: encrypt(this.emailRegisterForm.username),
                password: encrypt(this.emailRegisterForm.password),
                code: this.emailRegisterForm.code,
                uuid: this.emailRegisterForm.uuid,
                email: encrypt(this.emailRegisterForm.email),
                receiveCode: encrypt(this.emailRegisterForm.receiveCode),
              }
              emailRegister(emailData)
                .then((res) => {
                  if (res.code == 200) {
                    this.registerMethod(this.emailRegisterForm);
                  }
                })
                .catch(() => {
                  this.loading = false;
                  this.getCode();
                });
            }
          });
          break;
        case 2:
          this.$refs.bidRegisterForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              let bidData = {
                username: encrypt(this.bidRegisterForm.username),
                securePassword: encrypt(this.bidRegisterForm.securePassword),
                code: this.bidRegisterForm.code,
                uuid: this.bidRegisterForm.uuid
              }
              bidRegister(bidData)
                .then((res) => {
                  if (res.code == 200) {
                    this.privateKey = res.privateKey
                    this.registerMethodBid(this.bidRegisterForm);
                  }
                })
                .catch(() => {
                  this.loading = false;
                  this.getCode();
                });
            }
          });
      }
    },
   
    //注册方法
    registerMethod(form) {
      const username = form.username;
      this.$alert(
        "<font color='rgb(19,206,102)'>恭喜你，您的账号 " + username + " 注册成功！</font>",
        "系统提示",
        {
          dangerouslyUseHTMLString: true,
          type: "success",
        }
      )
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => { 
          this.$router.push("/login");
        });
    },
    registerMethodBid(form) {
      const username = form.username;
      this.$alert(
        "<font color='rgb(19,206,102)'>恭喜你，您的账号 " + username + " 注册成功！</font>",
        "系统提示",
        {
          dangerouslyUseHTMLString: true,
          type: "success",
        }
      )
        .then(() => {
          this.exportKeyShow = true
        })
        .catch(() => { 
           this.exportKeyShow = true
        });
    },
    //复制私钥
    copyPrivateKey() {
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    confirmExportKey() {
      this.$router.push("/login");
    },
    closeKey() {
      this.exportKeyShow = false
      this.$router.push("/login");
    },
    handleClick(e) {
      switch (e.index) {
        case "0":
          this.resetForm(this, 'registerForm')
          this.registerType = 0;
          break;
        case "1":
          this.resetForm(this, 'emailRegisterForm')
          this.registerType = 1;
          break;
        case "2":
          this.resetForm(this, 'bidRegisterForm')
          this.registerType = 2;
          break;
      }
      this.getCode();
    },
    //获取手机验证码
    getPhoneCode() {
      let that = this;
      let data = {
        phoneNumber: encrypt(this.registerForm.phoneNumber),
        type: "register",
        code: this.registerForm.code,
        uuid: this.registerForm.uuid,
      };
      let beginTime = 60;
      getPhoneCode(data).then((res) => {
        if (res.code == 200) {
          this.sendMessage = true;
          that.messageTime = `${beginTime}秒后重发`;;
          let sendMesTime = setInterval(function () {
            if (beginTime > 0) {
              beginTime--;
              that.messageTime = `${beginTime}秒后重发`;;
            } else {
              clearInterval(sendMesTime);
              that.messageTime = "";
              that.sendMessage = false;
            }
          }, 1000);
        }
      }).catch(() => {
        this.getCode()
      });;

    },
    //获取邮箱验证码
    getMailCode() {
      let that = this;
      this.inSend =true
      // 通過校驗後的操作
      let data = {
        email: encrypt(this.emailRegisterForm.email),
        code: this.emailRegisterForm.code,
        uuid: this.emailRegisterForm.uuid,
      };
      let beginTime = 60;
       this.sendMailMessage = true;
      getEmailCode(data).then((res) => {
        if (res.code == 200) {
          this.inSend = false
          that.mailMessageTime = `${beginTime}秒后重发`;;
          let sendMesTime = setInterval(function () {
            if (beginTime > 0) {
              beginTime--;
              that.mailMessageTime = `${beginTime}秒后重发`;;
            } else {
              clearInterval(sendMesTime);
              that.mailMessageTime = "";
              that.sendMailMessage = false;
            }
          }, 1000);
        }
      }).catch(() => {
        this.inSend = false;
        this.sendMailMessage = false;
        this.getCode()
      });

    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/font.scss";
@import "~@/assets/styles/public.scss";

.register {
  height: 100%;
  position: relative;

  .registerLeft {
    width: 30%;
    height: 100%;
    background-image: url("../assets/images/registerBg.png");
    background-size: 100% 100%;
    overflow: hidden;

    .registerLeftTitle {
      margin: 184px 0 0 10%;
      white-space: nowrap
    }

    .leftContent {
      height: 77px;
      line-height: 77px;
      font-family: PingFang SC-Heavy;
      font-size: 50px;
      color: #fff;
    }

    .line {
      width: 90px;
      margin: 38px 0 0 0;
      border-top: 4px solid #fff;
    }
  }
}

.buttonline {
  width: 100%;
  height: 1px;
  background: #F4F3F7;
  opacity: 1;
  margin-top: 30px;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  position: absolute;
  top: 20%;
  right: 25%;
  background: #ffffff;
  width: 25%;
  height: 574px;

  .registerFormTitle {
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

  .notice {
    height: 32px;
    background: #FFFBE6;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #FFE58F;
    margin-bottom: 22px;
    padding-left: 14px;

    .noticeContent {
      line-height: 32px;
      font-size: 8Px;
      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;
      color: #E6A23C;
      margin: 0 auto;
    }
  }
}

.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.register-code {
  width: 28%;
  height: 38px;
  float: right;

  .sendBtn {
    width: 100%;
    white-space: nowrap;
  }

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-register-footer {
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

.register-code-img {
  height: 38px;
  width: 100%;
}

.sendBtn {
  width: 150px;
  border: 1px solid rgb(24, 144, 255);
  color: rgb(24, 144, 255);
  padding: inherit;
  height: 35px;
}

.readContent {
  margin: 0 auto;
  text-align: center;
  font-size: 8Px;
  margin-bottom: 15px;
  margin-top: 25px;
  color: #707070;

  span {
    color: #2F88FF;
    cursor: pointer
  }
}

.notice1 {
  // height: 32px;
  background: #FFFBE6;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #FFE58F;
  margin-bottom: 22px;
  padding-left: 14px;

  .noticeContent1 {
    // line-height: 32px;
    font-size: 8Px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #E6A23C;
  }
}

.register-form {
  .registerFormTitle {
    >.el-form-item {
      margin-bottom: 10px;
    }
  }
}
/* 修改输入框placeHolder字体大小 */
::v-deep input::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size: 12px;
}
</style>
