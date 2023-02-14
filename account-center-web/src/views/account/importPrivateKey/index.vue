<template>
  <div class="app-container">
    <div class="title"><span class="lastRouter" @click="toLast">数字身份</span>
      <span class="currentRouter">/</span>
      <!-- <span class="currentRouter">导入私钥</span> -->
      <span class="currentRouter">导入数字身份</span>
    </div>
    <div class="warp">
      <div class="formWarp">
        <!-- <el-form ref="bidCreatForm" :model="bidCreatForm" :rules="bidCreatRules" class="labelWidth" label-position="left">
         <el-form-item prop="privateKey" label="私钥明文字符串">
                <el-input v-model="bidCreatForm.privateKey" type="text" auto-complete="off"
                  placeholder="请输入私钥明文字符串" @keyup.enter.native="handleCreat" style="width: 70%">
                </el-input>
              </el-form-item>
              <el-form-item prop="securePassword" label="设置安全密码">
                <el-input v-model="bidCreatForm.securePassword" type="password" auto-complete="off"
                  placeholder="请输入安全密码，6-20字符，需包含数字、大小写字母，字符" @keyup.enter.native="handleCreat" style="width: 70%">
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword" label="确认安全密码">
                <el-input v-model="bidCreatForm.confirmPassword" type="password" auto-complete="off"
                  placeholder="请确认安全密码" @keyup.enter.native="handleCreat" style="width: 70%">
                </el-input>
              </el-form-item>
        </el-form> -->
        <el-form ref="iidForm" :model="iidForm" :rules="iidRules" class="labelWidth" label-position="left">
          <el-form-item prop="iid" label="iid">
            <el-input v-model="iidForm.iid" type="text" auto-complete="off" placeholder="请输入iid"
              @keyup.enter.native="handleCreat" style="width: 70%">
            </el-input>
          </el-form-item>
          <el-form-item prop="didDocument" label="iid文档">
            <el-input v-model="iidForm.didDocument" type="text" auto-complete="off" placeholder="请输入iid文档"
              @keyup.enter.native="handleCreat" style="width: 70%">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="creatBtn">
        <el-button type="primary" @click="handleCreatDid">导入数字身份</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { importPrivateKey, importDid } from '@/api/digitalIdentity/digitalIdentity.js'
import { encrypt } from '@/utils/jsencrypt';
export default {
  name: "importPrivateKey",
  data() {
    const bidEqualToPassword = (rule, value, callback) => {
      if (this.bidCreatForm.securePassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      };
    };
    const isJson = (rule, value, callback) => {
        var obj = JSON.parse(value);
        if (typeof obj == 'object' && obj) {
          callback();
        } else {
          callback(new Error("请输入正确的JSON格式"));
        }
      }
    return {
      bidCreatForm: {
        securePassword: "",
        confirmPassword: "",
        privateKey: ''
      },
      bidCreatRules: {
        securePassword: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          {
            min: 6,
            max: 20,
            message: "用户密码长度必须介于 6 和 20 之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: bidEqualToPassword, trigger: "change" },
        ],
        privateKey: [{ required: true, trigger: "blur", message: "请输入私钥明文字符串" },]
      },
      iidForm: {
        iid: '',
        didDocument: ''
      },
      iidRules: {
        iid: [
          { required: true, trigger: "blur", message: "请输入iid",type: 'string'},
          { max: 63,message: "iid长度最长63位",trigger: "blur"},
          // { required: true, validator: isJson, trigger: "blur" },
        ],
        didDocument: [
          { required: true, trigger: "blur", message: "请输入did文档" },
          { max: 1000,message: "did文档长度最长1000位",trigger: "blur"},
        ]
      }

    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    })
  },
  methods: {
    toLast() {
      this.$router.push({
        path: '/did'
      })
    },
    handleCreat() {
      this.$refs.bidCreatForm.validate((valid) => {
        // this.bidCreatForm.securePassword = encrypt(this.bidCreatForm.securePassword)
        let data = {
          privateKey: encrypt(this.bidCreatForm.privateKey),
          securePassword: encrypt(this.bidCreatForm.securePassword)
        }
        if (valid) {
          this.loading = true;
          importPrivateKey(data)
            .then((res) => {
              if (res.code == 200) {
                this.registerMethod(this.bidCreatForm);
              }
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    },
    handleCreatDid() {
      this.$refs.iidForm.validate((valid) => {
        // this.bidCreatForm.securePassword = encrypt(this.bidCreatForm.securePassword)
        let data = {
          iid: this.iidForm.iid,
          didDocument: this.iidForm.didDocument
        }
        if (valid) {
          this.loading = true;
          importDid(data)
            .then((res) => {
              if (res.code == 200) {
                this.registerMethod();
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    //注册方法
    registerMethod() {
      this.$alert(
        "<font color='rgb(19,206,102)'>恭喜你，数字身份创建成功！</font>",
        "系统提示",
        {
          dangerouslyUseHTMLString: true,
          type: "success",
        }
      )
        .then(() => {
          this.$store.dispatch('GetUserDigitalInfo')
          this.$router.push({
            path: '/did'
          })
        })
        .catch(() => {
          this.$store.dispatch('GetUserDigitalInfo')
          this.$router.push({
            path: '/did'
          })
        });
    },
  },
};
</script>

<style scoped lang="scss">
.lastRouter {
  cursor: pointer;
}

.currentRouter {
  margin-left: 10px;
  font-weight: normal;
  color: #666666;
}

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

//把label的宽度写到行内，在不同分辨率下会导致换行
.labelWidth {
  ::v-deep.el-form-item__label {
    width: 125px;
  }

  ::v-deep.el-form-item__content {
    margin-left: 125px;
  }
}
</style>

