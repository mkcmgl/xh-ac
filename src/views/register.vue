<template>
  <div class="register">
    <div class="register-left">
      <div class="name">星火·联网骨干节点</div>
      <div class="text"></div>
    </div>
    <div class="register-right">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
      >
        <h3 class="title">欢迎注册</h3>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          :stretch="true"
          class="tabs"
        >
          <el-tab-pane label="手机号注册" name="first"></el-tab-pane>
          <el-tab-pane label="邮箱注册" name="second"></el-tab-pane>
          <el-tab-pane label="BID注册" name="third"></el-tab-pane>
        </el-tabs>
        <div v-if="activeNume == 1">
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              type="text"
              auto-complete="off"
              placeholder="请输入账号，5-20字符"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              show-password
              auto-complete="off"
              placeholder="包含数字、大小写字母、符号(非空格)"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              auto-complete="off"
              show-password
              placeholder="请确认登录密码"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="phone">
            <el-input
              v-model="registerForm.phone"
              type="text"
              auto-complete="off"
              placeholder="请输入手机号"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaEnabled">
            <el-input
              v-model="registerForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              style="width: 63%"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
            <div class="register-code">
              <img :src="codeUrl" @click="getCode" class="register-code-img" />
            </div>
          </el-form-item>
          <el-form-item
            prop="smsCode"
            v-if="captchaEnabled"
            style="width: 100%"
          >

            <el-row>
              <el-col :span="15">
                <el-input
                v-model="registerForm.smsCode"
                auto-complete="off"
                placeholder="请输入短信验证码"
                
              >
              </el-input>
              </el-col>
              <el-col :span="9">
                <el-button
                class="button"
                @click="sendCode('phone')"
                v-show="!isDisabled"
                >发送短信验证码</el-button
              >
              <el-button class="button" disabled v-show="isDisabled">{{
                text
              }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div v-if="activeNume == 2">
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              type="text"
              auto-complete="off"
              placeholder="请输入账号，5-20字符"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              auto-complete="off"
              show-password
              placeholder="包含数字、大小写字母、符号(非空格)"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              show-password
              auto-complete="off"
              placeholder="请确认登录密码"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              type="text"
              auto-complete="off"
              placeholder="请输入邮箱"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="email" v-if="captchaEnabled">
            <el-input
              v-model="registerForm.email"
              auto-complete="off"
              placeholder="请输入验证码"
              style="width: 63%"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
            <div class="register-code">
              <img :src="codeUrl" @click="getCode" class="register-code-img" />
            </div>
          </el-form-item>
          <el-form-item
            prop="emailCode"
            v-if="captchaEnabled"
            style="width: 100%"
          >
          <el-row>
            <el-col :span="15">  <el-input
              v-model="registerForm.emailCode"
              auto-complete="off"
              placeholder="请输入邮箱验证码"
              style="width: 100%"
            >
            </el-input></el-col>
            <el-col :span="9"><el-button
              class="button"
              @click="sendCode('email')"
              v-show="!isDisabled"
              >发送邮箱验证码</el-button
            >
            <el-button class="button" disabled v-show="isDisabled">{{
              text
            }}</el-button></el-col>
          </el-row>
          </el-form-item>
        </div>
        <div v-if="activeNume == 3">
          <div class="header-warning">
            <p>安全密码不同于登录密码，该密码用于加密您保护的私钥</p>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              type="text"
              auto-complete="off"
              placeholder="请输入账号，5-20字符"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              auto-complete="off"
              show-password
              placeholder="包含数字、大小写字母、符号(非空格)"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              auto-complete="off"
              show-password
              placeholder="请确认安全登录密码"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="code" v-if="captchaEnabled">
            <el-input
              v-model="registerForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              style="width: 63%"
              @keyup.enter.native="handleRegister"
            >
            </el-input>
            <div class="register-code">
              <img :src="codeUrl" @click="getCode" class="register-code-img" />
            </div>
          </el-form-item>
        </div>
        <p class="footer">
          点击"注册"按钮，即代表您已阅读并同意 <a href="#">《**服务协议》</a>和
          <a href="#">《**隐私服务》</a>
        </p>
        <el-form-item style="width: 100%" class="register-footer">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleRegister"
          >
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>

          <el-dialog
            title="导出私钥"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <div class="privatetop">
              <div>
                私钥导出后请在安全的环境中妥善保管，切勿保存至邮箱、网盘、微信收藏等;
              </div>
              <div>请勿分享私钥，请勿使用网络工具传输私钥;</div>
              <div>请勿丢失私钥，丢失后无法找回;</div>
            </div>
            <div>
              私钥：{{ privateKey }}
              <i class="el-icon-document-copy"></i>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="handleClose"
                class="privateButton"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <div style="float: right">
            <router-link class="link-type" :to="'/login'"
              >登录已有账户</router-link
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getCodeImg,
  register,
  getCodeSms,
  getCodeEmail,
  registerEamil,
  registerBid,
} from "@/api/login";
import { encrypt } from "../utils/jsencrypt";

export default {
  name: "Register",

  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的账号"));
      } else if (!/^[a-zA-Z0-9_-]{5,20}$/.test(value)) {
        callback(new Error("用户账号长度必须介于 5 和 20 之间"));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入您的密码"));
      } else if (
        !/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(
          value
        )
      ) {
        callback(
          new Error("密码必须包含数字，大小写字母，特殊字符，长度6-20！")
        );
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
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
    const validatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输您的手机号"));
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
    const validateEmail = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输您的邮箱"));
      } else if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      privateKey: "",
      dialogVisible: false,
      activeNume: 1,
      activeName: "first",
      codeUrl: "",
      count: "",
      time: "",
      text: "",
      isDisabled: false,
      registerForm: {
        username: "",
        password: "",
        uuid: "",
        code: "",
        confirmPassword: "",
        phone: "",
        smsCode: "",
        email: "",
        emailCode: "",
      },
      registerRules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        smsCode: [
          { required: true, trigger: "blur", message: "请输入短信验证码" },
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        emailCode: [
          { required: true, trigger: "blur", message: "请输入邮箱验证码" },
        ],
      },
      loading: false,
      captchaEnabled: true,
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.registerForm.uuid = res.uuid;
        }
      });
    },
    handleClick(tab, event) {
      this.$refs["registerForm"].resetFields();
      if (tab.name == "second") {
        this.activeNume = 2;
      }
      if (tab.name == "third") {
        this.activeNume = 3;
      }
      if (tab.name == "first") {
        this.activeNume = 1;
      }
    },
    sendCode(type) {
      const vm = this;
      console.log(type);
      if (type == "phone") {
        if (vm.registerForm.phone == "") {
          vm.$message.error("请输入手机号");
        } else if (
          !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
            vm.registerForm.phone
          )
        ) {
          // vm.$message.error("请输入正确的手机号");
        } else if (vm.registerForm.code == "") {
          vm.$message.error("图形验证码错误");
        } else {
          getCodeSms(
            vm.registerForm.code,
            vm.registerForm.phone,
            "register",
            vm.registerForm.uuid
          ).then((res) => {
            console.log(res);
            if (res.code == 200) {
              vm.isDisabled = false;
              console.log("asdads");
            }
          });
        }
      } else if (type == "email") {
        if (vm.registerForm.email == "") {
          vm.$message.error("请输入邮箱号");
        } else if (
          !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            vm.registerForm.email
          )
        ) {
          //  vm.$message.error("请输入正确的邮箱");
        } else if (vm.registerForm.code == "") {
          vm.$message.error("图形验证码错误");
        } else {
          getCodeEmail(vm.email, "register").then((res) => {
            console.log(res);
            if (res.code == 200) {
              vm.isDisabled = false;
              console.log("asdads");
            }
          });
        }
        const TIME_COUNT = 60;
        vm.count = TIME_COUNT;
        vm.isDisabled = true;
        vm.text = vm.count + "s后重新获取 ";
        vm.time = setInterval(() => {
          if (vm.count > 0 && vm.count <= TIME_COUNT) {
            vm.count--;
            vm.text = vm.count + "s后重新获取 ";
          } else {
            vm.isDisabled = false;
            clearInterval(vm.time);
            vm.time = null;
          }
        }, 1000);
      }
    },

    //注册校验及注册接口发送
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const { username, password, uuid, code, smsCode, phone, email } =
            this.registerForm;
          this.loading = true;
          switch (this.activeNume) {
            case 1:
              register({
                username: encrypt(username),
                password: encrypt(password),
                uuid,
                code,
                receiveCode: encrypt(smsCode),
                phoneNumber: encrypt(phone),
              })
                .then((res) => {
                  // const username = this.registerForm.username;
                  console.log(res);
                  this.$alert(
                    "<font color='red'>恭喜你，您的账号 " +
                      username +
                      " 注册成功！</font>",
                    "系统提示",
                    {
                      dangerouslyUseHTMLString: true,
                      type: "success",
                    }
                  )
                    .then(() => {
                      this.$router.push("/login");
                    })
                    .catch(() => {});
                })
                .catch((res) => {
                  this.loading = false;
                  if (this.captchaEnabled) {
                    this.getCode();
                  }
                });
              break;
            case 2:
              registerEamil({
                username: encrypt(username),
                passwodr: encrypt(password),
                uuid,
                code,
                receiveCode: encrypt(emailCode),
                email: encrypt(email),
              })
                .then((res) => {
                  console.log(res);
                  this.$alert(
                    "<font color='red'>恭喜你，您的账号 " +
                      username +
                      " 注册成功！</font>",
                    "系统提示",
                    {
                      dangerouslyUseHTMLString: true,
                      type: "success",
                    }
                  )
                    .then(() => {
                      this.$router.push("/login");
                    })
                    .catch(() => {});
                })
                .catch((res) => {
                  this.loading = false;
                  if (this.captchaEnabled) {
                    this.getCode();
                  }
                });
              break;
            case 3:
              registerBid({
                username: encrypt(username),
                securePassword: encrypt(password),
                uuid,
                code,
              })
                .then((res) => {
                  // const username = this.registerForm.username;

                  this.privateKey = res.privateKey;
                  console.log(res);
                  this.$confirm(
                    "恭喜你，您的账号" + username + " 注册成功！",
                    "提示",

                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "success",
                      showCancelButton: false,
                    }
                  )
                    .then(() => {
                      console.log(this.dialogVisible);
                      this.dialogVisible = true;
                    })
                    .catch(() => {
                      console.log(this.dialogVisible);
                      this.dialogVisible = true;
                    });
                })
                .catch((res) => {
                  this.loading = false;
                  if (this.captchaEnabled) {
                    this.getCode();
                  }
                });
              break;
          }
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$router.push("login");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-dialog__footer {
  display: flex;
  justify-content: center;
}
.el-icon-document-copy {
  color: #2f88ff;
  cursor: pointer;
}

.privatetop {
  background-color: rgb(255, 251, 230);
  border: 0.0625rem solid rgb(255, 229, 143);
  padding-left: 0.625rem;
  margin-bottom: 1.125rem;
  div {
    font-size: 0.5rem;
    font-weight: 400;
    color: #e6a23c;
    line-height: 1.125rem;
  }
}
.header-warning {
  height: 2rem;
  line-height: 2rem;
  background-color: #fffbe6;
  border: 0.0625rem solid #ffe58f;
  color: #e6a23c;
  font-weight: normal;
  font-size: 0.875rem;
  margin-bottom: 1.375rem;
}
.register-code img {
  width: 100%;
  height: 3.375rem;
}
.tabs {
  ::v-deep .el-tabs__nav.is-stretch > * {
    font-size: 1.125rem;
    :active {
      color: #2f88ff;
    }
  }
}
.register-footer span {
  font-size: 1.125rem;
}
.el-input--medium {
  ::v-deep .el-input__inner {
    height: 3.5rem;
  }
}
::v-deep .el-form-item__error {
  padding-top: 0.9375rem;
}
.el-form-item {
  margin-bottom: 2.2rem;
}
.footer {
  font-size: 0.875rem;
  text-align: center;
  color: #707070;
  a {
    color: #2f88ff;
  }
}

.button {
  width: 100%;
  height: 3.2rem;
  margin-left: 1.25rem;
  font-size: 0.9375rem;
  padding: inherit;
  border: 0.0625rem solid #2f88ff;
  color: #2f88ff;
}
.register-left {
  width: 30%;
  height: 100%;
  background-image: url("../assets/images/register-background.png");
  background-size: 100%;
  .name {
    color: #fff;
    font-size: 3.125rem;
    margin-top: 11.5rem;
    text-align: center;
  }
  .text {
    margin-top: 2.8125rem;
    margin-left: 10.9375rem;
    border-top: 0.1875rem solid #ffffff;
    width: 5.625rem;
  }
}
.register-right {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.title {
  width: 8.5rem;
  margin: 0px 0 1.875rem 0;
  height: 3rem;
  font-size: 2.125rem;
  font-weight: bold;
  color: rgb(51, 51, 51);
}

.register-form {
  margin: auto;
  border-radius: 6px;
  background: #ffffff;
  width: 37.5rem;

  .el-input {
    height: 8px;
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
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 38px;
  float: right;
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
}
::v-deep .el-input__suffix {
  top: 0.625rem !important;
}
</style>
