<template>
  <div class="app-container">
    <div class="title">数字身份</div>
    <div class="first">
      <p class="firstTitle">我的数字身份</p>
      <div class="firstContent">
        <img src="@/assets/images/infoLogo.png" class="infoLogo"></img>
        <div class="detailContent" v-if="!userInfo.did">
          温馨提示：您还未创建数字身份，请 <span @click="creatShow = true">立即创建</span>
        </div>
        <div v-else class="detailContent1">
          <p class="userName">你好！{{ userInfo.userName }}</p>
          <p class="didId"><span class="formTitle firstSpan"></span>
            <span class="formTitle">{{ userInfo.did }}</span>
          </p>
          <span class="indentity">
            {{ userIdentity }}
          </span>
          <!-- <div class="indentity">骨干节点身份</div> -->
        </div>
      </div>
      <!-- <div class="oprate" v-if="userInfo.did">
        <el-popover placement="bottom" width="200" trigger="hover">
          <span slot="reference" class="edit">操作</span>
          <p class="detailOprate" @click="openExportKeyShow">导出私钥</p>
          暂时不显示
          <p>导出keystore</p>
          <p class="detailOprate" @click="openEditSecurePasswordShow">修改安全密码</p>
        </el-popover>
      </div> -->
    </div>
    <div class="second">
      <div class="second_left">
        <p class="firstTitle">基本信息</p>
        <ul class="userInfo">
          <li>
            <span class="formTitle firstSpan">账号</span>
            <span class="formContent">{{ userInfo.userName }}</span>
          </li>
          <li>
            <span class="formTitle firstSpan">账号ID</span>
            <span class="formContent">{{ userInfo.userId }}</span>
          </li>
          <li>
            <span class="formTitle firstSpan">手机号</span>
            <span class="formContent">{{ userInfo.phonenumber ? userInfo.phonenumber : '无' }}</span>
          </li>
          <li>
            <span class="formTitle firstSpan">注册时间</span>
            <span class="formContent">{{ userInfo.createTime }}</span>
          </li>
          <li v-if="!checkRole(['backbone'])">
            <span class="formTitle firstSpan">认证状态</span>
            <span class="indenStatus" v-if="userInfo.authStatus == 0 || !userInfo.authStatus">未认证</span>
            <span class="edit" v-if="userInfo.authStatus == 0 || !userInfo.authStatus" @click="toAuth">立即认证</span>
            <span class="hascertifi" v-if="userInfo.authStatus == 1">已认证</span>
            <span class="hascertifi" v-if="userInfo.authStatus == 2">认证中</span>
            <span class="hascertifi1" v-if="userInfo.authStatus == 3">认证未通过</span>
            <span class="edit" v-if="userInfo.authStatus == 2 || userInfo.authStatus == 3"
              @click="reviewAuth">去查看</span>
          </li>
        </ul>
      </div>
      <div class="second_right">
        <p class="firstTitle">登录方式</p>
        <ul class="userInfo">
          <li>
            <span class="formTitle firstSpan">登录密码</span>
            <span class="formContent">{{ userInfo.password ? '******' : '无' }}</span>
            <span class="edit" @click="openSetPasswordShow" v-if="!userInfo.password">设置</span>
            <span class="edit" @click="openEditPasswordShow" v-if="userInfo.password">修改</span>
          </li>
          <li>
            <span class="formTitle firstSpan">手机号</span>
            <span class="formContent">{{ userInfo.phonenumber ? userInfo.phonenumber : '无' }}</span>
            <span class="edit" @click="openEditNumberShow" v-if="!userInfo.phonenumber">绑定</span>
          </li>
          <li>
            <span class="formTitle firstSpan">邮箱</span>
            <span class="formContent">{{ userInfo.email ? userInfo.email : '无' }}</span>
            <span class="edit" @click="openEditEmailShow" v-if="!userInfo.email">绑定</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 创建数字身份方式弹框 -->
    <el-dialog title="选择方式" :visible.sync="creatShow" width="28%" :before-close="handleClose" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <div class="creatWarp" style="margin-bottom:15px" @click="creatDid">
        <div class="logo">
          <img src="@/assets/images/creatLogo.png"></img>
        </div>
        <div class="content">
          <p class="name">创建数字身份</p>
          <p class="describe">创建浪潮自主分布式数字身份</p>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- <div class="creatWarp" @click="importDid">
        <div class="logo">
          <img src="@/assets/images/importLogo.png"></img>
        </div>
        <div class="content">
          <p class="name">导入数字身份</p>
          <p class="describe">导入已有浪潮分布式数字身份</p>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div> -->
    </el-dialog>
    <!-- 设置密码弹框 -->
    <el-dialog title="设置登录密码" :visible.sync="setPasswordShow" width="28%" :before-close="handleSetWordClose" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <el-form ref="setWordForm" :model="setWordForm" :rules="setWordRules" label-position="left" class="labelWidth">
        <el-form-item prop="password" label="设置密码">
          <el-input v-model="setWordForm.password" type="password" auto-complete="off"
            placeholder="需同时包含数字、大小写字母及特殊字符（非空格）" @keyup.enter.native="confirmEditWord(1)" :show-password="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="setWordForm.confirmPassword" type="password" auto-complete="off" placeholder="请确认密码"
            @keyup.enter.native="confirmEditWord(0)" :show-password="true">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="buttonline"></div>
      <div class="btnWarp">
        <el-button @click="setPasswordShow = false">取消</el-button>
        <el-button type="primary" @click="confirmEditWord(0)">确认</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码弹框 -->
    <el-dialog title="修改登录密码" :visible.sync="editPasswordShow" width="28%" :before-close="handleEditWordClose"
      top="33vh" :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <el-form ref="editWordForm" :model="editWordForm" :rules="editWordRules" class="labelWidth" label-position="left">
        <el-form-item prop="currentPassword" label="当前密码">
          <el-input v-model="editWordForm.currentPassword" type="password" auto-complete="off" placeholder="当前密码"
            :show-password="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input v-model="editWordForm.password" type="password" auto-complete="off" placeholder="新密码"
            @keyup.enter.native="confirmEditWord(1)" :show-password="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="editWordForm.confirmPassword" type="password" auto-complete="off" placeholder="请确认密码"
            @keyup.enter.native="confirmEditWord(1)" :show-password="true">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="buttonline"></div>
      <div class="btnWarp">
        <el-button @click="editPasswordShow = false">取消</el-button>
        <el-button type="primary" @click="confirmEditWord(1)">确认</el-button>
      </div>
    </el-dialog>
    <!-- 绑定手机弹框 -->
    <el-dialog title="绑定手机号" :visible.sync="editNumberShow" width="28%" :before-close="handleEditNumberClose" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <el-form ref="loginNumberForm" :model="loginNumberForm" :rules="loginNumberRules" class="labelWidth"
        label-position="left">
        <el-form-item prop="phoneNumber" label="手机号">
          <el-input v-model="loginNumberForm.phoneNumber" auto-complete="off" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="receiveCode" label="短信验证码">
          <el-input v-model="loginNumberForm.receiveCode" auto-complete="off" placeholder="短信验证码" style="width: 63%"
            @keyup.enter.native="handleLogin">
          </el-input>
          <div class="register-code">
            <el-button class="sendBtn" @click="getPhoneCode" :disabled="sendMessage">{{ !sendMessage ? "短信验证码" :
                messageTime
            }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="buttonline"></div>
      <div class="btnWarp">
        <el-button @click="editNumberShow = false">取消</el-button>
        <el-button type="primary" @click="confirmEditWord(2)">确认</el-button>
      </div>
    </el-dialog>
    <!-- 绑定邮箱弹框 -->
    <el-dialog title="绑定邮箱" :visible.sync="editEmailShow" width="28%" :before-close="handleEditEmailClose" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <el-form ref="loginEmailForm" :model="loginEmailForm" :rules="loginEmailRules" class="labelWidth"
        label-position="left">
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="loginEmailForm.email" auto-complete="off" placeholder="请输入邮箱">
          </el-input>

        </el-form-item>
        <el-form-item prop="receiveCode" label="邮箱验证码">
          <el-input v-model="loginEmailForm.receiveCode" auto-complete="off" placeholder="请输入邮箱验证码" style="width: 63%"
            @keyup.enter.native="handleLogin">
          </el-input>
          <div class="register-code">
            <el-button class="sendBtn" @click="getMailCode" :disabled="sendMailMessage">
              <span v-if="!inSend">
                {{
                    !sendMailMessage ? "邮箱验证码" :
                      mailMessageTime
                }}
              </span>
              <span v-else>发送中</span>
            </el-button>

          </div>
        </el-form-item>
      </el-form>
      <div class="buttonline"></div>
      <div class="btnWarp">
        <el-button @click="editEmailShow = false">取消</el-button>
        <el-button type="primary" @click="confirmEditWord(4)">确认</el-button>
      </div>
    </el-dialog>
    <!-- 导出私钥 -->
    <el-dialog title="导出私钥" :visible.sync="exportKeyShow" width="28%" :before-close="handleExportKeyClose" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <el-form ref="exportKeyForm" :model="exportKeyForm" :rules="exportKeyRules" class="labelWidth"
        label-position="left" v-if="!privateKeyShow">
        <el-form-item prop="securePassword" label="安全密码">
          <el-input v-model="exportKeyForm.securePassword" auto-complete="off" placeholder="请输入安全密码" type="password">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="notice" v-if="privateKeyShow">
        <div class="noticeContent">私钥导出后请在安全的环境中妥善保管，切勿保存至邮箱、网盘、微信收藏等;</div>
        <div class="noticeContent">请勿分享私钥，请勿使用网络工具传输私钥;</div>
        <div class="noticeContent">请勿丢失私钥，丢失后无法找回;</div>
      </div>
      <div v-if="privateKeyShow">
        <span>私钥:</span>
        <span style="margin-left:10px">{{ privateKey }}</span>
        <span>
          <i class="el-icon-document-copy" style="color:#2F88FF;margin-left: 10px;cursor: pointer;"
            v-clipboard:copy="privateKey" v-clipboard:success="copyPrivateKey" v-clipboard:error="copyPrivateKey"></i>
        </span>
      </div>
      <div class="buttonline"></div>
      <div class="btnWarp" v-if="!privateKeyShow">
        <el-button @click="exportKeyShow = false">取消</el-button>
        <el-button type="primary" @click="confirmExportKey">确认</el-button>
      </div>
    </el-dialog>
    <!-- 修改安全密码弹框 -->
    <el-dialog title="修改安全密码" :visible.sync="editSecurePasswordShow" width="28%"
      :before-close="handleEditSecureWordClose" top="33vh" :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <el-form ref="editSecureWordForm" :model="editSecureWordForm" :rules="editSecureWordRules" class="labelWidth"
        label-position="left">
        <el-form-item prop="currentPassword" label="当前密码">
          <el-input v-model="editSecureWordForm.currentPassword" type="password" auto-complete="off" placeholder="当前密码"
            :show-password="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input v-model="editSecureWordForm.password" type="password" auto-complete="off" placeholder="新密码"
            @keyup.enter.native="confirmEditWord(3)" :show-password="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="editSecureWordForm.confirmPassword" type="password" auto-complete="off" placeholder="请确认密码"
            @keyup.enter.native="confirmEditWord(3)" :show-password="true">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="buttonline"></div>
      <div class="btnWarp">
        <el-button @click="handleEditSecureWordClose">取消</el-button>
        <el-button type="primary" @click="confirmEditWord(3)">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editLoginWord, editNumber, editEmail, exportPrivateKey, setPassword, importPrivateKey } from '@/api/digitalIdentity/digitalIdentity.js'
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
import { getToken, setToken, removeToken } from '@/utils/auth';
import { confirmType } from '@/api/realnameAuthentication/realnameAuthentication.js'
import {
  getPhoneCode,
  getEmailCode,
  getUserDigitalInfo
} from "@/api/login/login.js";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { mapState } from 'vuex';
import { resetForm } from '@/utils/ruoyi';
export default {
  name: "accountCenter",
  data() {
    const equalToEmpty = (rule, value, callback) => {
      if (/\s/g
        .test(value)) {
        callback(new Error('密码不能含有空格'));
      } else {
        callback();
      }

    };
    const equalToPassword = (rule, value, callback) => {
      if (this.editWordForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const equalToSecurePassword = (rule, value, callback) => {
      if (this.editSecureWordForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const equalToSetPassword = (rule, value, callback) => {
      if (this.setWordForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const testPassword = (rule, value, callback) => {
      if (!/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(value)) {
        callback(new Error('需同时包含数字、大小写字母及特殊字符（非空格）！'));
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
      userIdentity: '',
      creatShow: false,
      creatNumber: false,
      setPasswordShow: false,
      editPasswordShow: false,
      editNumberShow: false,
      editEmailShow: false,
      sendMessage: false,
      messageTime: '',
      editEmailShow: false,
      sendMailMessage: false,
      mailMessageTime: '',
      exportKeyShow: false,
      privateKeyShow: false,
      editSecurePasswordShow: false,
      privateKey: '',
      setWordForm: {
        password: '',
        currentPassword: '',
        //普通密码（normal）/安全密码（secure）,
        confirmPassword: '',
        type: 'normal'
      },
      editWordForm: {
        password: '',
        currentPassword: '',
        //普通密码（normal）/安全密码（secure）,
        confirmPassword: '',
        type: 'normal',
        userName: ''
      },
      loginNumberForm: {
        phoneNumber: '',
        receiveCode: '',
      },
      loginEmailForm: {
        email: '',
        receiveCode: '',
      },
      exportKeyForm: {
        securePassword: ''
      },
      editSecureWordForm: {
        password: '',
        currentPassword: '',
        //普通密码（normal）/安全密码（secure）,
        confirmPassword: '',
        type: 'secure'
      },
      loginNumberRules: {
        phoneNumber: [
          { required: true, trigger: "blur", message: "请输入手机号" },
          { validator: validatePhone, trigger: 'blur' }
        ],
        receiveCode: [{ required: true, trigger: "blur", message: "请输入手机验证码" },
        ],
      },
      loginEmailRules: {
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱" },
          { validator: validateEmail, trigger: 'blur' }
        ],
        receiveCode: [{ required: true, trigger: "blur", message: "请输入邮箱验证码" }],
      },
      editWordRules: {
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          {
            min: 6,
            max: 20,
            message: "用户密码长度必须介于 6 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: testPassword, trigger: "blur" },
          { required: true, validator: equalToEmpty, trigger: "blur" },
        ],
        currentPassword: [{ required: true, trigger: "blur", message: "请输入密码" }],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "change" },
        ],
      },
      setWordRules: {
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
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
          { required: true, validator: equalToSetPassword, trigger: "change" },
        ],
      },
      editSecureWordRules: {
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          {
            min: 6,
            max: 20,
            message: "用户密码长度必须介于 6 和 20 之间",
            trigger: "blur",
          },
          { required: true, validator: testPassword, trigger: "blur" },
          { required: true, validator: equalToEmpty, trigger: "blur" },
        ],
        currentPassword: [{ required: true, trigger: "blur", message: "请输入密码" }],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToSecurePassword, trigger: "change" },
        ],
      },
      exportKeyRules: {
        securePassword: [{ required: true, trigger: "blur", message: "请输入安全密码" }]
      },
      inSend: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      roles: state => state.user.roles
    })
  },
  mounted() {
    this.checkIndentity(this.roles)
  },
  methods: {
    checkRole,
    //判断当前登陆人的身份
    checkIndentity(e) {
      e.map(item => {
        switch (item) {
          case 'admin':
            this.userIdentity = this.userIdentity + ' 管理员'
            break;
          case 'common':
            this.userIdentity = this.userIdentity + ' 普通用户'
            break;
          case 'manager':
            this.userIdentity = this.userIdentity + ' 超级管理员'
            break;
          case 'organization':
            this.userIdentity = this.userIdentity + ' 企业用户'
            break;
          case 'backbone':
            this.userIdentity = this.userIdentity + ' 骨干链管理员'
            break;
          case 'subchain':
            this.userIdentity = this.userIdentity + ' 子链管理员'
            break;
            case 'person':
            this.userIdentity = this.userIdentity + ' 个人用户'
            break;
        }
      })

    },
    //更新用户信息
    updateUserInfo() {
      getUserDigitalInfo().then(res => {
        this.$store.dispatch('GetUserDigitalInfo')
      })
    },
    openSetPasswordShow() {
      resetForm(this, 'setWordForm')
      this.setPasswordShow = true
    },
    openEditPasswordShow() {
      resetForm(this, 'editWordForm')
      this.editPasswordShow = true
    },
    openEditEmailShow() {
      resetForm(this, 'loginEmailForm')
      this.editEmailShow = true
    },
    openEditNumberShow() {
      resetForm(this, 'loginNumberForm')
      this.editNumberShow = true
    },
    openExportKeyShow() {
      resetForm(this, 'exportKeyForm')
      this.exportKeyForm.securePassword = ''
      this.privateKeyShow = false
      this.exportKeyShow = true
    },
    openEditSecurePasswordShow() {
      resetForm(this, 'editSecureWordForm')
      this.editSecurePasswordShow = true
    },
    handleClose() {
      this.creatShow = false
    },
    handleSetWordClose() {
      this.setPasswordShow = false
    },
    handleEditWordClose() {
      this.editWordForm.password = ''
      this.editWordForm.currentPassword = ''
      this.editWordForm.confirmPassword = ''
      this.editPasswordShow = false
    },
    handleEditNumberClose() {
      this.editNumberShow = false
    },
    handleEditEmailClose() {
      this.editEmailShow = false
    },
    handleExportKeyClose() {
      this.exportKeyShow = false
    },
    handleEditSecureWordClose() {
      this.editSecureWordForm.password = ''
      this.editSecureWordForm.currentPassword = ''
      this.editSecureWordForm.confirmPassword = ''
      resetForm(this, 'editSecureWordForm')
      this.editSecurePasswordShow = false
    },
    //确认修改0:设置密码1:普通密码/2:绑定手机/3:安全密码/4:邮箱密码
    confirmEditWord(e) {
      switch (e) {
        case 0:
          let setData = {
            password: encrypt(this.setWordForm.password),
          }
          this.$refs.setWordForm.validate((valid) => {
            if (valid) {
              setPassword(setData)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    }
                    )
                    this.$store.dispatch('LogOut').then(() => {
                      location.href = process.env.NODE_ENV === "production" ? "/baas/account-center/" : "/baas/account-center/";
                      //这里做个定时器是为了在注销的时候页面不因为用户的角色改变导致页面变化
                      setTimeout(() => {
                        this.$store.commit('SET_TOKEN', '')
                        this.$store.commit('SET_ROLES', [])
                        this.$store.commit('SET_PERMISSIONS', [])
                      }, 500)
                      removeToken()
                    })
                  }
                })
                .catch(() => {
                });
            }
          });
          break;
        case 1:
          let data = {
            password: encrypt(this.editWordForm.password),
            currentPassword: encrypt(this.editWordForm.currentPassword),
            username: encrypt(this.userInfo.userName),
            type: 'normal'
          }
          this.$refs.editWordForm.validate((valid) => {
            if (valid) {
              editLoginWord(data)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    }
                    )
                    setTimeout(() => {
                      this.$store.dispatch('LogOut').then(() => {
                        // location.href = process.env.NODE_ENV === "production" ? "/baas-ac-prod-api/" : "/baas/account-center/";
                        location.href = process.env.NODE_ENV === "production" ? "/baas/account-center/" : "/baas/account-center/";
                        //这里做个定时器是为了在注销的时候页面不因为用户的角色改变导致页面变化
                        setTimeout(() => {
                          this.$store.commit('SET_TOKEN', '')
                          this.$store.commit('SET_ROLES', [])
                          this.$store.commit('SET_PERMISSIONS', [])
                        }, 500)
                        removeToken()
                      })
                    }, 200)
                  }
                })
                .catch(() => {
                });
            }
          });
          break;
        case 2:
          this.$refs.loginNumberForm.validate((valid) => {
            if (valid) {
              let phoneData = {
                phoneNumber: encrypt(this.loginNumberForm.phoneNumber),
                receiveCode: encrypt(this.loginNumberForm.receiveCode),
              }
              editNumber(phoneData)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({
                      message: '绑定成功',
                      type: 'success'
                    }
                    )
                    this.updateUserInfo()
                    this.editNumberShow = false
                  }
                })
                .catch(() => {
                });
            }
          });
        case 3:
          this.$refs.editSecureWordForm.validate((valid) => {
            if (valid) {
              let secureData = {
                password: encrypt(this.editSecureWordForm.password),
                currentPassword: encrypt(this.editSecureWordForm.currentPassword),
                type: 'secure',
                username: encrypt(this.userInfo.userName),
                did: encrypt(this.userInfo.did)
              }
              editLoginWord(secureData)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    }
                    )
                    this.editSecurePasswordShow = false
                  }
                })
                .catch(() => {
                });
            }
          });
          break;
        case 4:
          let emailData = {
            email: encrypt(this.loginEmailForm.email),
            receiveCode: encrypt(this.loginEmailForm.receiveCode),
          }
          this.$refs.loginEmailForm.validate((valid) => {
            if (valid) {
              editEmail(emailData)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({
                      message: '绑定成功',
                      type: 'success'
                    }
                    )
                    this.updateUserInfo()
                    this.editEmailShow = false
                  }
                })
                .catch(() => {

                });
            }
          });
          break;
      }

    },
    //获取手机验证码
    getPhoneCode() {
      let data = {
        phoneNumber: encrypt(this.loginNumberForm.phoneNumber),
        type: "register",
        isLogin: true
      };
      let beginTime = 60;
      let that = this;
      getPhoneCode(data).then((res) => {
        if (res.code == 200) {
          this.sendMessage = true;
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
      });
    },
    //获取邮箱验证码
    getMailCode() {
      let data = {
        email: encrypt(this.loginEmailForm.email),
        isLogin: true
      };
      let beginTime = 60;
      let that = this;
      this.inSend = true;
      this.sendMailMessage = true;
      getEmailCode(data).then((res) => {
        if (res.code == 200) {

          that.mailMessageTime = `${beginTime}秒后重发`;;
          this.inSend = false
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
      });
    },
    //导出私钥确定
    confirmExportKey() {
      let secureData = {
        securePassword: encrypt(this.exportKeyForm.securePassword),
        did: encrypt(this.userInfo.did)
      }
      this.$refs.exportKeyForm.validate((valid) => {
        if (valid) {
          exportPrivateKey(secureData)
            .then((res) => {
              if (res.code == 200) {
                this.privateKey = res.privateKey
                this.privateKeyShow = true
              }
            })
            .catch(() => {
            });
        }
      });
    },
    //复制私钥
    copyPrivateKey() {
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    toAuth() {
      if (this.userInfo.did) {
        this.$router.push({
          path: '/auth'
        })
      } else {
        this.$message({
          message: '请先创建数字身份',
          type: 'error',
          customClass: 'global-messageZindex'
        })
      }
    },
    reviewAuth() {
      this.$router.push({
        path: '/account/authResult'
      })
    },
    creatDid() {
      this.$router.push({
        path: '/account/creatDid'
      })
    },
    importDid() {
      // this.$router.push({
      //   path: '/account/imortDid'
      // })
      this.$router.push({
        path: '/account/importPrivateKey',
      })
    }
  },
};
</script>

<style scoped lang="scss">
.creatWarp {
  cursor: pointer;
}

.firstTitle {
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #333333;
  line-height: 22px;
  margin: 15px 0 0 30px;
}

.detailOprate {
  cursor: pointer;
}

.detailOprate:hover {
  color: #559EFF;
}

.first {
  width: 1610px;
  height: 150px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 20px auto;
  overflow: hidden;
  position: relative;

  .oprate {
    position: absolute;
    right: 30px;
    top: 30px;

  }


  .firstContent {
    height: 59px;
    margin: 25px 0 0 32px;

    .infoLogo {
      width: 50px;
      height: 59px;
      float: left;
    }

    .detailContent {
      float: left;
      height: 59px;
      line-height: 59px;
      font-size: 14px;
      font-family: PingFang SC-Bold, PingFang SC;
      color: #333333;
      margin-left: 20px;

      span {
        color: #2F88FF;
        font-weight: bold;
        cursor: pointer;
      }

    }

    .detailContent1 {
      float: left;

      .userName {
        height: 25px;
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 25px;
        margin: 0 30px;
      }

      .didId {
        margin: 0 30px;
      }

      .indentity {
        margin: 0 30px;
        display: inline-block;
        padding: 0 5px;
        height: 25px;
        background: rgb(229, 240, 252);
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: rgb(78, 143, 233);
        line-height: 25px;
        text-align: center;
      }
    }
  }

}

.second {
  width: 1610px;
  height: 256px;
  margin: auto;

  .second_left {
    width: 795px;
    min-height: 256px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    float: left;
  }

  .second_right {
    width: 795px;
    min-height: 256px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    float: right;
  }
}

.userInfo {
  margin-top: 22px;
  padding-left: 30px;
  list-style: none;

  .indenStatus {
    display: inline-block;
    width: 70px;
    height: 25px;
    background: #F4F3F7;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #333333;
    line-height: 25px;
    text-align: center;
  }

  .hascertifi {
    display: inline-block;
    width: 70px;
    height: 25px;
    background: #DDF5E9;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #4CB883;
    line-height: 25px;
    text-align: center;
  }

  .hascertifi1 {
    display: inline-block;
    height: 25px;
    padding: 0 5px;
    background: rgb(243, 90, 90);
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #fff;
    line-height: 25px;
    text-align: center;
  }

  li {
    margin-bottom: 14px;

    .firstSpan {
      display: inline-block;
      width: 110px;
    }

    .edit:hover {
      color: #559EFF;
    }
  }


}

.edit {
  display: inline-block;
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #2F88FF;
  line-height: 22px;
  cursor: pointer;
  margin-left: 12px;
}



.buttonline {
  width: 100%;
  height: 1px;
  background: #F4F3F7;
  opacity: 1;
  margin-top: 30px;
}

.btnWarp {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.register-code {
  width: 28%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }

  .sendBtn {
    width: 100%;
    border: 1px solid rgb(24, 144, 255);
    color: rgb(24, 144, 255);
    text-align: center;
  }
}

.notice {
  // height: 32px;
  background: #FFFBE6;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #FFE58F;
  margin-bottom: 22px;
  padding-left: 14px;

  .noticeContent {
    // line-height: 32px;
    font-size: 8Px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #E6A23C;
  }
}
//把label的宽度写到行内，在不同分辨率下会导致换行
.labelWidth {
  ::v-deep.el-form-item__label {
    width: 120px;
  }
  ::v-deep.el-form-item__content{
    margin-left: 120px;
  }
}
</style>

