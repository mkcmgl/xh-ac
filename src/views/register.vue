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
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true" class="tabs">
          <el-tab-pane label="手机号注册" name="first"></el-tab-pane>
          <el-tab-pane label="邮箱注册" name="second"></el-tab-pane>
          <el-tab-pane label="BID注册" name="third"></el-tab-pane>
        </el-tabs>
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
            placeholder="请输入登录密码，6-20字符，包含数字、大小写字母、符号"
            @keyup.enter.native="handleRegister"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="请确认登录密码"
            @keyup.enter.native="handleRegister"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="prop">
          <el-input
            type="password"
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
        <el-form-item prop="code" v-if="captchaEnabled" style="width: 100%">
          <el-input
            auto-complete="off"
            placeholder="请输入短信验证码"
            style="width: 63%"
          >
          </el-input>
          <el-button type="primary" class="button">发送验证码</el-button>

        </el-form-item>
        <p class="footer">点击"注册"按钮，即代表您已阅读并同意
          <a href="#">《**服务协议》</a>和
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
import { getCodeImg, register } from "@/api/login";

export default {
  name: "Register",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      codeUrl: "",
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: "",
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
          {
            min: 2,
            max: 20,
            message: "用户账号长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
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
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then((res) => {
              const username = this.registerForm.username;
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
            .catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs{
    ::v-deep .el-tabs__nav.is-stretch > *{
      font-size: 1.125rem;
      :active{
        color: #2F88FF;
      }

    }
  }
  .register-footer span{
    font-size: 1.125rem;
  }
  .el-input--medium{
    ::v-deep .el-input__inner{
      height: 2.5rem;
    }
  }
 
  .footer{
    font-size: 0.875rem;
    text-align: center;
    color: #707070 ;
    a{
      color: #2F88FF;
    }
  }
  .button{
    width: 11.25rem;
    margin-left: 1.25rem;
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
  padding: 25px 25px 5px 25px;
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
</style>
