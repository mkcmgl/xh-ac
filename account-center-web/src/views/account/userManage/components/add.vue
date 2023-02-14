<template>
    <div>
        <el-dialog :visible.sync="disableShow" width="33%" top="15vh" :append-to-body="true" z-index="3333"
            :before-close="colse">
            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                <el-tab-pane label="手机号新增" name="first">
                    <div>
                        <el-form ref="registerForm" :model="registerForm" :rules="registerRules">

                            <el-form-item prop="username">
                                <el-input v-model="registerForm.username" type="text" auto-complete="off"
                                    placeholder="请输入账号，5-20字符">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="registerForm.password" type="password" auto-complete="off"
                                    placeholder="需同时包含数字、大小写字母及特殊字符（非空格）" @keyup.enter.native="handleRegister"
                                    show-password>
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
                            <el-form-item prop="code">
                                <el-row style="height:30px">
                                    <el-col :span="17">
                                        <el-input v-model="registerForm.code" auto-complete="off" placeholder="验证码"
                                            @keyup.enter.native="handleRegister">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="6" :offset="1">
                                        <img :src="codeUrl" @click="getCode" class="code-img" />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="receiveCode">
                                <el-row>
                                    <el-col :span="17">
                                        <el-input v-model="registerForm.receiveCode" auto-complete="off"
                                            placeholder="短信验证码" @keyup.enter.native="handleLogin">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="6" :offset="1">
                                        <el-button style="width:100%" size="small" @click="getPhoneCode" :disabled="sendMessage"
                                            type="primary">{{
                                                    !sendMessage ? "获取短信验证码" :
                                                        messageTime
                                            }}</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="roleId" label="角色设置">
                                <el-radio-group v-model="registerForm.roleId" @change="changePhoneRule">
                                    <el-radio :label="'104'">子链管理员</el-radio>
                                    <el-radio :label="'101'">子链用户</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="subchainName" label="子链名称">
                                <el-row>
                                    <el-col :span="14">
                                        <el-select v-model="registerForm.subChainList" multiple placeholder="请选择"
                                            value-key="subchainName" @change="choosePhoneSubchain" style="width:100%">
                                            <el-option v-for="item in subChainList" :key="item.subchainId"
                                                :label="item.subchainName" :value="item">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>

                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="邮箱新增" name="second">
                    <div>
                        <el-form ref="emailRegisterForm" :model="emailRegisterForm" :rules="emailRegisterRules">
                            <el-form-item prop="username">
                                <el-input v-model="emailRegisterForm.username" type="text" auto-complete="off"
                                    placeholder="请输入账号，5-20字符">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="emailRegisterForm.password" type="password" auto-complete="off"
                                    placeholder="需同时包含数字、大小写字母及特殊字符（非空格）" @keyup.enter.native="handleRegister"
                                    show-password>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="confirmPassword">
                                <el-input v-model="emailRegisterForm.confirmPassword" type="password"
                                    auto-complete="off" placeholder="请确认登录密码" @keyup.enter.native="handleRegister"
                                    show-password>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="email">
                                <el-input v-model="emailRegisterForm.email" auto-complete="off" placeholder="请输入邮箱"
                                    @keyup.enter.native="handleRegister">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-row>
                                    <el-col :span="17">
                                        <el-input v-model="emailRegisterForm.code" auto-complete="off" placeholder="验证码"
                                            @keyup.enter.native="handleRegister">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="6" :offset="1"> <img :src="codeUrl" @click="getCode" class="code-img" /></el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="receiveCode">
                                <el-row>
                                    <el-col :span="17">
                                        <el-input v-model="emailRegisterForm.receiveCode" auto-complete="off"
                                            placeholder="邮箱验证码" @keyup.enter.native="handleLogin">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="6" :offset="1"> 
                                        <el-button style="width:100%" size="small" @click="getMailCode" :disabled="sendMailMessage"
                                            type="primary">
                                            <span v-if="!inSend">{{
                                                    !sendMailMessage ? "获取邮箱验证码" : mailMessageTime
                                            }}</span>
                                            <span v-else>发送中</span>
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="roleId" label="角色设置">
                                <el-radio-group v-model="emailRegisterForm.roleId" @change="changeMailRule">
                                    <el-radio :label="'104'">子链管理员</el-radio>
                                    <el-radio :label="'101'">子链用户</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="subchainName" label="子链名称">
                                <el-row>
                                  <el-col :span="14">
                                  <el-select v-model="emailRegisterForm.subChainList" multiple placeholder="请选择"
                                    value-key="subchainName" @change="chooseEmailSubchain" style="width:100%">
                                    <el-option v-for="item in subChainList" :key="item.subchainId"
                                        :label="item.subchainName" :value="item">
                                    </el-option>
                                </el-select></el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <div class="btnWarp">
                    <el-button @click="colse">取消</el-button>
                    <el-button type="primary" @click="handleRegister">确认</el-button>
                </div>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { jiami, jiemi } from '@/utils/jiami'
import { resetForm } from '@/utils/ruoyi';
import { subChainList, addUserByPhone, addUserByEmail } from '@/api/userManage/userManage.js'
import {
    getCodeImg,
    getPhoneCode,
    getEmailCode,
} from "@/api/login/login.js";
const temp = {
    userName: '',
    applicant: '',
    authType: '',
    status: '',
    pageSize: 10,
    pageNum: 1,
}

export default {

    name: "AuthenticationResule",
    props: ['disable'],
    computed: {

    },
    watch: {
        disable(val) {
            this.disableShow = val
            this.resetForm(this, 'registerForm')
            this.resetForm(this, 'emailRegisterForm')
            this.registerForm.subChainList = []
            this.registerForm.subChainName = []
            this.emailRegisterForm.subChainList = []
            this.emailRegisterForm.subChainName = []
            if (val) {
                this.activeName = 'first'
                this.getCode()
                this.getSubChainList()
            }
        }
    },
    data() {
        const equalToNumber = (rule, value, callback) => {
            if (/[^\d]/g
                .test(value)) {
                callback(new Error('只能输入数字'));
            } else {
                callback();
            }
        };
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
            disableShow: false,
            activeName: 'first',
            registerForm: {
                username: "",
                password: "",
                confirmPassword: "",
                code: "",
                uuid: "",
                phoneNumber: "",
                receiveCode: "",
                testCode: '',
                roleId: '',
                subchainName: [],
                subChainList: []
            },
            emailRegisterForm: {
                username: "",
                password: "",
                confirmPassword: "",
                code: "",
                uuid: "",
                receiveCode: "",
                email: "",
                testCode: '',
                roleId: '',
                subchainName: [],
                subChainList: []
            },
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
                roleId: [
                    { required: true, trigger: "blur", message: "请选择角色" },
                ]
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
                roleId: [
                    { required: true, trigger: "blur", message: "请选择角色" },
                ],
            },
            codeUrl: '',
            sendMailMessage: false,
            inSend: false,
            sendMessage: false,
            messageTime: '',
            mailMessageTime: '',
            subChainList: [],
            registerType: 0
        };
    },
    created() {

    },
    methods: {
        //获取子链列表
        getSubChainList() {
            subChainList().then(res => {
                if (res.code == 200) {
                    this.subChainList = res.data
                }
            })
        },
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
        colse() {
            this.$emit('close', false)
        },
        handleClick(e) {
            switch (e.index) {
                case "0":
                    this.resetForm(this, 'registerForm')
                    this.registerForm.subChainList = []
                    this.registerForm.subChainName = []
                    this.emailRegisterForm.subChainList = []
                    this.emailRegisterForm.subChainName = []
                    this.registerType = 0;
                    break;
                case "1":
                    this.resetForm(this, 'emailRegisterForm')
                    this.registerForm.subChainList = []
                    this.registerForm.subChainName = []
                    this.emailRegisterForm.subChainList = []
                    this.emailRegisterForm.subChainName = []
                    this.registerType = 1;
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
            this.inSend = true
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
        handleRegister() {
            switch (this.registerType) {
                case 0:
                    this.$refs.registerForm.validate((valid) => {
                        if (valid) {
                            if (this.registerForm.roleId == 101) {
                                let flag = this.registerForm.subchainName
                                if (flag.length == 0) {
                                    this.$message({
                                        message: '请至少选择一条子链',
                                        type: 'warning'
                                    })
                                    return
                                }
                            }
                            let phoneData = {
                                username: encrypt(this.registerForm.username),
                                password: encrypt(this.registerForm.password),
                                code: this.registerForm.code,
                                uuid: this.registerForm.uuid,
                                phoneNumber: encrypt(this.registerForm.phoneNumber),
                                receiveCode: encrypt(this.registerForm.receiveCode),
                                roleId: encrypt(this.registerForm.roleId),
                                subchain: jiami(JSON.stringify(this.registerForm.subchainName)),
                            }
                            addUserByPhone(phoneData)
                                .then((res) => {
                                    if (res.code == 200) {
                                        this.$message({
                                            message: '新增成功',
                                            type: 'success'
                                        });
                                        this.colse()
                                    }
                                })
                                .catch(() => {
                                    this.getCode();
                                });
                        }
                    });
                    break;
                case 1:
                    this.$refs.emailRegisterForm.validate((valid) => {
                        if (valid) {
                            if (this.emailRegisterForm.roleId == 101) {
                                let flag = this.emailRegisterForm.subchainName
                                if (flag.length == 0) {
                                    this.$message({
                                        message: '请至少选择一条子链',
                                        type: 'warning'
                                    })
                                    return
                                }
                            }
                            let emailData = {
                                username: encrypt(this.emailRegisterForm.username),
                                password: encrypt(this.emailRegisterForm.password),
                                code: this.emailRegisterForm.code,
                                uuid: this.emailRegisterForm.uuid,
                                email: encrypt(this.emailRegisterForm.email),
                                receiveCode: encrypt(this.emailRegisterForm.receiveCode),
                                roleId: encrypt(this.emailRegisterForm.roleId),
                                subchain: jiami(JSON.stringify(this.emailRegisterForm.subchainName)),
                            }
                            addUserByEmail(emailData)
                                .then((res) => {
                                    if (res.code == 200) {
                                        this.$message({
                                            message: '新增成功',
                                            type: 'success'
                                        });
                                        this.colse()
                                    }
                                })
                                .catch(() => {
                                    this.getCode();
                                });
                        }
                    });
                    break;
            }
        },
        choosePhoneSubchain(e) {
            if (e.length != 0) {
                this.registerForm.subchainName = []
                e.map(item => {
                    let obj = {
                        acsn: item.acsn,
                        subchainId: item.subchainId,
                        subchainName: item.subchainName
                    }
                    this.registerForm.subchainName.push(obj)
                })
            } else {
                this.registerForm.subchainName = []
            }
        },
        chooseEmailSubchain(e) {
            if (e.length != 0) {
                this.emailRegisterForm.subchainName = []
                e.map(item => {
                    let obj = {
                        acsn: item.acsn,
                        subchainId: item.subchainId,
                        subchainName: item.subchainName
                    }
                    this.emailRegisterForm.subchainName.push(obj)
                })
            } else {
                this.emailRegisterForm.subchainName = []
            }
        },
        changePhoneRule(e) {
            // if(e==101){
            //     let subchainName=[
            //         { required: true, trigger: "blur", message: "请选择子链名称" },
            //     ]
            //     this.$set(this.registerRules,'subchainName',subchainName)
            // }else{
            //     this.$set(this.registerRules,'subchainName',null)
            // }
        },
        changeMailRule(e) {
            // if(e==101){
            //     let subchainName=[
            //         { required: true, trigger: "blur", message: "请选择子链名称" },
            //     ]
            //     this.$set(this.emailRegisterRules,'subchainName',subchainName)
            // }else{
            //     this.$set(this.emailRegisterRules,'subchainName',null)
            // }
        }
    },
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
</style>