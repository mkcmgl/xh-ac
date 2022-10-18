<template>
  <div class="right">
    <div class="title">数字身份</div>
    <div class="center">
      <div class="numIdentity">
        <span class="myNumTitle">我的数字身份</span>
        <div class="mainNumData">
          <img src="@/assets/images/num1.png" />
          <div class="user" v-if="userData.did != null">
            <span class="numDataTitle">你好！{{ userData.userName }}</span>
            <span class="numData">{{ userData.did }}</span>
            <span class="userType">{{switchRoles}}</span>
            
          </div>
          <div class="user" v-else>
            <span class="numDatatitle"
              >温馨提示：您还未创建数字身份，请
              <span class="creat" @click="showDialog('choiseMackId', 6)"
                >立即创建</span
              ></span
            >
          </div>
        </div>
        <el-popover
          class="rightContent"
          placement="bottom"
          ref="test"
          width="200"
          trigger="hover"
        >
          <p class="editTo hoverTo" @click="showDialog('key', 3)">导出私钥</p>
          <p class="editTo hoverTo" @click="showDialog('psw', 0)">
            修改安全密码
          </p>
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
                  <span class="nameData">{{ userData.userName }}</span>
                </li>
                <li>
                  <span class="name">账号ID</span>
                  <span class="nameData">{{ userData.userId }}</span>
                </li>
                <li>
                  <span class="name">手机号</span>
                  <span class="nameData">{{ phoneNumber }}</span>
                </li>
                <li>
                  <span class="name">注册时间</span>
                  <span class="nameData">{{ userData.createTime }}</span>
                </li>
                <li>
                  <span class="name">认证状态</span>
                  <div
                    v-if="userData.authStatus == 1 || userData.authStatus == 2"
                    style="display: inline"
                  >
                    <span class="nameData nameTrueBack">{{
                      authStatusDsc
                    }}</span>
                  </div>
                  <div v-else style="display: inline">
                    <span class="nameData nameFaleBack">{{
                      authStatusDsc
                    }}</span>
                    <span
                      class="edit"
                      v-if="userData.authStatus"
                      @click="toAuth"
                      >立刻认证</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="userDataAndLogin">
              <span class="userDataTitle">登录方式</span>
              <ul class="userDataList">
                <li>
                  <span class="name">登录密码</span>
                  <div
                  v-if="userData.password==''"
                  style="display: inline"
                  >
                  <span class="nameData">无</span>
                  <span class="edit" @click="showDialog('psw', 1)">设置</span>
                </div>
                <div v-else  style="display: inline">
                  <span class="nameData">******</span>
                  <span class="edit" @click="showDialog('psw', 11)">修改</span>
                </div>
                  
                </li>
                <li>
                  <span class="name">手机号</span>
                  <div
                  v-if="userData.phonenumber==''"
                  style="display: inline"
                  >
                  <span class="nameData">无</span>
                  <span class="edit" @click="showDialog('phone', 3)">绑定</span>
                </div>
                <div v-else  style="display: inline">
                  <span class="nameData">{{phoneNumber}}</span>
                  <span class="edit" @click="showDialog('phone', 33)">修改</span>
                </div>

                </li>
                <li>
                  <span class="name">邮箱</span>
                  <div
                  v-if="userData.email==''"
                  style="display: inline"
                  >
                  <span class="nameData">无</span>
                  <span class="edit" @click="showDialog('email', 4)">绑定</span>
                </div>
                <div v-else  style="display: inline">
                  <span class="nameData">{{emaillNumber}}</span>
                  <span class="edit" @click="showDialog('email', 44)">修改</span>
                </div>

                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      v-if="showType == 'key'"
      title="导出私钥"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="keyTitle"
    >
      <el-form label-position="left" label-width="10rem" class="export-key">
        <el-form-item
          label="安全密码"
          :rules="[
            { required: true, message: '年龄不能为空' },
            { type: 'number', message: '年龄必须为数字值' },
          ]"
          class="test"
        >
          <el-input placeholder="请输入安全密码"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="showType == 'psw'"
      title="修改安全密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="keyTitle"
    >
      <el-form label-position="left" label-width="10rem" class="export-key">
        <el-form-item
          label="当前密码"
          :rules="[{ required: true, message: '当前密码' }]"
          class="test"
        >
          <el-input placeholder="请输入当前密码"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          :rules="[{ required: true, message: '新密码' }]"
          class="test"
        >
          <el-input placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :rules="[{ required: true, message: '确认密码' }]"
          class="test"
        >
          <el-input placeholder="请输入确认密码"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="showType == 'phone'"
      title="绑定手机号"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="keyTitle"
    >
      <el-form label-position="left" label-width="10rem" class="export-key">
        <el-form-item
          label="手机号"
          :rules="[{ required: true, message: '手机号' }]"
        >
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item
          label="短信验证码"
          :rules="[{ required: true, message: '短信验证码' }]"
        >
          <el-input placeholder="请输入短信验证码" class="phoneCode"></el-input>
          <el-button class="getPhoneCode">短信验证码</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="showType == 'email'"
      title="绑定邮箱"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="keyTitle"
    >
      <el-form label-position="left" label-width="10rem" class="export-key">
        <el-form-item
          label="邮箱号"
          :rules="[{ required: true, message: '邮箱号' }]"
        >
          <el-input placeholder="请输入邮箱号"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱验证码"
          :rules="[{ required: true, message: '邮箱验证码' }]"
        >
          <el-input placeholder="请输入邮箱验证码" class="phoneCode"></el-input>
          <el-button class="getPhoneCode">邮箱验证码</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="showType == 'choiseMackId'"
      title="选择方式"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="keyTitle"
    >
      <div class="mackId">
        <img src="@/assets/images/did553.png" />
        <div class="choiseList">
          <span class="mackDidTitle">创建数字身份</span>
          <span class="mackDidData">创建基于该星火·链网骨干节点的数字身份</span>
        </div>
        <i class="leftIcon el-icon-arrow-right"></i>
      </div>
      <div class="mackId">
        <img src="@/assets/images/did553.png" />
        <div class="choiseList">
          <span class="mackDidTitle">导入数字身份</span>
          <span class="mackDidData"
            >已有基于该星火·链网骨干节点的数字身份，通过导入私钥、Keystore恢复数字身份</span
          >
        </div>
        <i class="leftIcon el-icon-arrow-right"></i>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { encrypt,decrypt } from "@/utils/jsencrypt";
export default {
  name: "Did",

  data() {
    return {
      dialogVisible: false,
      showType: "",
      type: -1,
    };
  },

  mounted() {},
  computed: {
    ...mapState({
      userData: (state) => state.user.userData,
      roles:(state)=>state.user.roles,
    }),
    phoneNumber() {
      const phone =decrypt(this.userData.phonenumber)
      const phoneX= phone.substring(0,3) + "****" + phone.substring(8);
      return phoneX;
    },
    emaillNumber(){
      const email =decrypt(this.userData.email)
      const emailX= email.substring(0,3) + "****" + email.substring(email.lenght-10);
      return emailX; 
    },
    authStatusDsc() {
      if (this.userData.authStatus == 1) {
        return "已认证";
      } else if (this.userData.authStatus == 2) {
        return "认证中";
      } else if (this.userData.authStatus == 3) {
        return "未通过认证";
      } else {
        return "未认证";
      }
    },
    switchRoles(){
      const roleName =this.roles[0]
 
      switch (roleName) {
        case 'organization':
          return '企业用户';
        case 'admin':
          return '管理员';
          case 'common':
          return '普通角色';
          case 'manager':
          return '超级管理员';
          case 'person':
          return '个人用户';
          case 'backbone':
          return '骨干链管理员';
          case 'subchain':
          return '子链管理员';
      
        default:
          break;
      }
    }
  },
  methods: {
    showDialog(value, type) {
      this.dialogVisible = true;
      this.showType = value;
      console.log(this.type);
      this.type = type;
      console.log(this.type);
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    toAuth() {
      this.$router.push("/auth");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";

.leftIcon {
  float: right;
  margin-top: 2.6rem;
  margin-right: 10px;
  font-size: 1.25rem;
}

.mackId {
  background: #f0f6ff;
  border-radius: 4px 4px 4px 4px;
  height: 6.25rem;
  margin-bottom: 1rem;
  img {
    float: left;
    height: 3.75rem;
    margin-left: 1.25rem;
    margin-top: 1.25rem;
  }
  .choiseList {
    float: left;
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    width: 80%;
    .mackDidTitle {
      display: block;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      font-size: 1.125rem;
    }
    .mackDidData {
      font-size: 1rem;
      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;
      color: #666666;
      margin-top: 0.625rem;
      display: block;
      word-break: break-all;
    }
  }
}
.mackId:hover {
  background: rgb(85, 165, 255);
}
.phoneCode {
  width: 66%;
}
.creat {
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #2f88ff;
}
.getPhoneCode {
  border: 0.083333rem solid #1890ff;
  color: #1890ff;
  width: 24%;
  margin-left: 10%;
  height: 3rem;
  font-size: 1.125rem;
}

::v-deep .el-dialog__title {
  font-size: 1.5rem;
  line-height: 1.5rem;
  border-buttom: 0.0625rem;
}
::v-deep .el-form-item__label {
  font-size: 1.25rem;
  line-height: 2.875rem;
  height: 2.875rem;
}
::v-deep .el-input__inner {
  height: 3rem;
  font-size: 1.125rem;
}
::v-deep .dialog-footer.dialog-footer {
  display: flex;
  justify-content: space-around;
  .el-button--medium {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    border-radius: 0.25rem;
  }
}

.getPhoneCode {
  border: 0.083333rem solid #1890ff;
  color: #1890ff;
}
.editTo {
  margin-bottom: 1.25rem;
  margin-top: 1.25rem;
  font-size: 1.125rem;
  cursor: pointer;
  font-family: PingFang SC-Bold, PingFang SC;
}
.right {
  .title {
    font-size: 1.75rem;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
  }
  .center {
    position: relative;
    span.myNumTitle {
      font-size: 1.375rem;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #333333;
    }

    .mainNumData {
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
        margin-top: 3.625rem;
        margin-left: 2.5rem;
        .numDataTitle {
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
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999;
          font-size: 1rem;
        }
        .userType {
          display: inline-block;
          padding: 0 0.416667rem;
          height: 2.083333rem;
          background: #e5f0fc;
          border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
          opacity: 1;
          font-size: 1.166667rem;
          font-family: PingFang SC-常规体, PingFang SC;
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
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: 700;
      color: #2f88ff;
    }
  }

  .userIdData {
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
      li {
        margin-bottom: 1.5rem;
        .name {
          font-size: 1.125rem;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          width: 8.125rem;
          display: inline-block;
        }
        .nameData {
          font-size: 18px;
          font-family: PingFang SC-Bold, PingFang SC;
          color: #333;
          font-weight: 500;
        }
        .nameTrueBack {
          background-color: #ddf5e9;
          color: #4cb883;
          padding: 0.3125rem 1.125rem;
          border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
        }
        .nameFalseBack {
          background-color: #f4f3f7;
          padding: 0.3125rem 1.125rem;
          border-radius: 0.333333rem 0.333333rem 0.333333rem 0.333333rem;
        }

        .edit {
          margin-left: 20px;
          cursor: pointer;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: 700;
          color: #2f88ff;
          font-size: 18px;
        }
      }
    }
  }
}
</style>