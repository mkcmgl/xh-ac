<template>
  <div class="app-container">
    <div class="title">
      <span class="lastRouter" @click="toLast">数字身份</span>
      <span class="currentRouter">/</span>
      <span class="currentRouter">创建数字身份</span>
    </div>
    <div class="warp">
      <!-- <div class="notice">
        <div class="noticeContent">安全密码用于加密保护您的私钥，安全密码无法找回，请你妥善保管</div>
      </div>
      <div class="formWarp">
        <el-form ref="bidCreatForm" :model="bidCreatForm" :rules="bidCreatRules" class="labelWidth">
          <el-form-item prop="securePassword" label="设置安全密码">
            <el-input v-model="bidCreatForm.securePassword" type="password" auto-complete="off"
              placeholder="请输入安全密码，6-20字符，需包含数字、大小写字母，字符" @keyup.enter.native="handleRegister" style="width: 63%"
              show-password>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认安全密码">
            <el-input v-model="bidCreatForm.confirmPassword" type="password" auto-complete="off" placeholder="请确认安全密码"
              @keyup.enter.native="handleRegister" style="width: 63%" show-password>
            </el-input>
          </el-form-item>
        </el-form>
      </div> -->
      <div class="creatBtn">
        <el-button type="primary" @click="handleRegister">创建数字身份</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { createDid, subchainList } from '@/api/digitalIdentity/digitalIdentity.js'
export default {
  name: "creatNumber",
  data() {
    const bidEqualToPassword = (rule, value, callback) => {
      if (this.bidCreatForm.securePassword !== value) {
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
    return {
      bidCreatForm: {
        securePassword: "",
        confirmPassword: "",
        acsn: ''
      },
      bidCreatRules: {
        securePassword: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: testPassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: bidEqualToPassword, trigger: "change" },
        ],
      },
      privateKey: '',
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      roles: state => state.user.roles,
    })
  },

  methods: {

    toLast() {
      this.$router.push({
        path: '/did'
      })
    },
    handleRegister() {
      // this.$refs.bidCreatForm.validate((valid) => {
      //   let data = {
      //     securePassword: encrypt(this.bidCreatForm.securePassword),
      //   }
      //   if (valid) {
      //     this.loading = true;
      //     createDid(data)
      //       .then((res) => {
      //         if (res.code == 200) {
      //           this.registerMethod(this.bidCreatForm);
      //           this.privateKey = res.privateKey
      //         }
      //       })
      //       .catch(() => {
      //         this.loading = false;
      //       });
      //   }
      // });
      this.loading = true;
      let data = {
        securePassword: '',
      }
      createDid(data)
        .then((res) => {
          if (res.code == 200) {
            this.registerMethod(this.bidCreatForm);
            this.privateKey = res.privateKey
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    registerMethod(form) {
      // const username = form.username;
      this.$alert(
        "<font color='rgb(19,206,102)'>恭喜你，数字身份创建成功！</font>",
        {
          dangerouslyUseHTMLString: true,
          type: "success",
        }
      )
        .then(() => {
          this.$store.dispatch('GetUserDigitalInfo')
          this.$router.push({
            path: '/index',

          })
        })
        .catch(() => {
          this.$store.dispatch('GetUserDigitalInfo')
          this.$router.push({
            path: '/index',
          })
        });
    },
  },
};
</script>

<style scoped lang="scss">
.warp {
  width: 1610px;
  height: 85vh;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 20px auto;
  padding: 32px 32px 0 32px;
  overflow: hidden;

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
    }
  }
}

.formWarp {
  width: 50%;
}

.creatBtn {
  width: 100%;
}

.labelWidth {
  ::v-deep.el-form-item__label {
    width: 120px;
  }

  ::v-deep.el-form-item__content {
    margin-left: 120px;
  }
}
</style>

