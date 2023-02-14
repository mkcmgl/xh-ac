<template>
    <div>
        <el-dialog :visible.sync="disableShow" width="37%" top="15vh" :append-to-body="true" z-index="3333"
            :before-close="colse" title="用户维护" :center="true">
            <el-form ref="userForm" :model="userForm" class="labelWidth">
                <el-form-item prop="username" label="账号">
                    <el-input v-model="userForm.userName" type="text" auto-complete="off" placeholder="" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item prop="username" label="手机号">
                    <el-input v-model="userForm.phonenumber" type="text" auto-complete="off" placeholder="" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item prop="username" label="邮箱">
                    <el-input v-model="userForm.email" type="text" auto-complete="off" placeholder="" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item prop="username" label="BID">
                    <el-input v-model="userForm.did" type="text" auto-complete="off" placeholder="" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item  label="密码">
                    <el-row>
                        <el-col :span="17">
                            <el-input v-model="password" type="password" auto-complete="off" placeholder=""
                               :disabled="true">
                            </el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-button  type="primary" size="small" @click="openEditPasswordShow" style="width:100%">修改登录密码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="username" label="用户状态">
                    <el-radio-group v-model="userForm.status">
                        <el-radio :label="'0'">正常</el-radio>
                        <el-radio :label="'1'">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="username" label="用户类型">
                    <span>{{ userForm.authType == 102 ? '企业用户' : '个人用户' }}</span>
                </el-form-item>
                <el-form-item prop="username" :label="userForm.authType == 102 ? '企业名称' : '真实姓名'">
                    <span> {{ userForm.authType == 102 ? userForm.org : userForm.realName }}</span>
                </el-form-item>
            </el-form>
            <div class="btnWarp">
                <el-button @click="colse">取消</el-button>
                <el-button type="primary" @click="handleRegister">确认</el-button>
            </div>
        </el-dialog>
        <!-- 修改密码弹框 -->
        <el-dialog title="修改登录密码" :visible.sync="editPasswordShow" width="28%" :before-close="handleEditWordClose"
            top="33vh" :append-to-body="true" z-index="99999">
            <div class="line"></div>
            <el-form ref="editWordForm" :model="editWordForm" :rules="editWordRules" class="labelWidth"
                label-position="left">
                <el-form-item prop="currentPassword" label="当前密码">
                    <el-input v-model="editWordForm.currentPassword" type="password" auto-complete="off"
                        placeholder="当前密码" :show-password="true">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" label="新密码">
                    <el-input v-model="editWordForm.password" type="password" auto-complete="off" placeholder="新密码"
                        @keyup.enter.native="confirmEditWord()" :show-password="true">
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input v-model="editWordForm.confirmPassword" type="password" auto-complete="off"
                        placeholder="请确认密码" @keyup.enter.native="confirmEditWord()" :show-password="true">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="buttonline"></div>
            <div class="btnWarp">
                <el-button @click="editPasswordShow = false">取消</el-button>
                <el-button type="primary" @click="confirmEditWord()">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { resetForm } from '@/utils/ruoyi';
import { updatePassword, userMaintain } from '@/api/userManage/userManage.js'
export default {

    name: "AuthenticationResule",
    props: ['disable', 'userInfo'],
    computed: {

    },
    watch: {
        disable(val) {
            this.disableShow = val
            this.resetForm(this, 'userForm')
        },
        userInfo(val) {
            if (val) {
                this.userForm = JSON.parse(JSON.stringify(val))
            }
        }
    },
    created() {
    },
    data() {
        const equalToPassword = (rule, value, callback) => {
            if (this.editWordForm.password !== value) {
                callback(new Error("两次输入的密码不一致"));
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
        const testPassword = (rule, value, callback) => {
            if (!/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(value)) {
                callback(new Error('密码必须包含数字，大小写字母，特殊字符，长度6-20！'));
            } else {
                callback();
            }
        };
        return {
            disableShow: false,
            password:'******',
            userForm: {
                userName: "",
                phoneNumber: "",
                email:'',
                did:'',
                authType: '',
                org: '',
                realName: '',
            },
            editPasswordShow: false,
            editWordForm: {
                password: '',
                currentPassword: '',
                confirmPassword: '',
                userName: ''
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
                currentPassword: [{ required: true, trigger: "blur", message: "请输入密码" },],
                confirmPassword: [
                    { required: true, trigger: "blur", message: "请再次输入您的密码" },
                    { required: true, validator: equalToPassword, trigger: "change" },
                ],
            },
            dataInfo: null
        };
    },
    created() {
    },
    methods: {
        colse() {
            this.$emit('close', false)
        },
        handleRegister() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    let data = {
                        userName:encrypt(this.userForm.userName),
                        status:encrypt(this.userForm.status)
                    }
                    userMaintain(data)
                        .then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '维护成功',
                                    type: 'success'
                                });
                                this.$emit('close', false,true)
                            }
                        })
                        .catch(() => {
                        });
                }
            });
        },
        openEditPasswordShow() {
            resetForm(this, 'editWordForm')
            this.editPasswordShow = true
        },
        handleEditWordClose() {
            resetForm(this, 'editWordForm')
            this.editPasswordShow = false
        },
        //修改密码
        confirmEditWord() {
            let data = {
                password: encrypt(this.editWordForm.password),
                currentPassword: encrypt(this.editWordForm.currentPassword),
                userName: encrypt(this.userForm.userName),
            }
            this.$refs.editWordForm.validate((valid) => {
                if (valid) {
                    updatePassword(data)
                        .then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                }
                                )
                                this.editPasswordShow = false
                            }
                        })
                        .catch(() => {
                        });
                }
            });
        }

    }
};
</script>
<style scoped lang="scss">

.code-img {
    width: 100%;
    height: 40px;
    float: right;
}

.btnWarp {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.labelWidth {
  ::v-deep.el-form-item__label {
    width: 125px;
  }
  ::v-deep.el-form-item__content{
    margin-left: 125px;
  }
}
</style>