<template>
    <div class="app-container">
        <div class="title">实名认证</div>
        <div class="header-step">
            <div class="step-back">1</div>
            <div class="border"></div>
            <div class="step-back">2</div>
            <div class="border"></div>
            <div class="step-back1">3</div>
        </div>
        <div class="text-step">
            <div>授权数字身份标识</div>
            <div>填写申请材料</div>
            <div>完成认证申请</div>
        </div>
        <div class="warp">
            <div style="width:100%">
                <h5 class="itemTitle">基本信息</h5>
                <div class="content">
                    <el-form ref="industryForm" :model="industryForm" :rules="industryRules" label-position="left"
                        v-show="authType == 0" class="labelWidth">
                        <el-form-item label="注册类型" prop="authType">
                            <el-tag :effect="authType == 0 ? 'dark' : 'plain'" @click="chooseType(0)"
                                style="cursor:pointer">
                                企业</el-tag>
                            <el-tag :effect="authType == 1 ? 'dark' : 'plain'" @click="chooseType(1)"
                                style="cursor:pointer">
                                个人</el-tag>
                        </el-form-item>
                        <el-form-item label="机构名称" prop="orgName">
                            <el-input v-model="industryForm.orgName" placeholder="请输入机构名称" type="text"
                                @input="clearSpecial($event, industryForm, 'orgName')"></el-input>
                            <p class="noticeEdit">认证审核通过后，名称不能修改</p>
                        </el-form-item>
                        <el-form-item label="机构简称" prop="org">
                            <el-input v-model="industryForm.org" placeholder="请输入机构简称"
                                @input="clearSpecial($event, industryForm, 'org')"></el-input>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码" prop="creditCode">
                            <el-input v-model="industryForm.creditCode" placeholder="请输入信用代码"
                                @input="clearSpecial($event, industryForm, 'creditCode')"></el-input>
                        </el-form-item>
                        <el-form-item label="营业执照" prop="businessLicense" ref="businessLicense">
                            <el-row>
                                <el-col :span="8">
                                    <el-upload ref='uploadBusinessLicense' :action="uploadUrl"
                                        :before-upload="handleBeforeUpload" :on-success="UploadLicenseSuccess"
                                        list-type="picture-card" :limit="limitNum"
                                        :on-preview="handlePictureCardPreview" :on-remove="handleRemoveLicense"
                                        :headers="{
                                            'Authorization': 'Bearer ' + token
                                        }" :class="{ disabled: uploadDisabled2 }">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-col>
                                <el-col :span="16">
                                    <p class="formTitle">1、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                                    <p class="formTitle">2、图片不得超过5M</p>
                                    <p class="formTitle">3、上传的图片需清晰完整</p>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                            <el-row>
                                <el-col :span="8">
                                    <el-select v-model="province" placeholder="请选择省市" filterable
                                        @change="chooseProvince" value-key="regionName">
                                        <el-option v-for="item in provinceList" :key="item.regionName"
                                            :label="item.regionName" :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select v-model="city" placeholder="请选择地市" filterable value-key="regionName"
                                        @change="chooseCity">
                                        <el-option v-for="item in cityList" :key="item.regionName"
                                            :label="item.regionName" :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select v-model="area" placeholder="请选择区县" filterable>
                                        <el-option v-for="item in areaList" :key="item.regionName"
                                            :label="item.regionName" :value="item.regionName">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="addressDetail">
                            <el-input v-model="industryForm.addressDetail" placeholder="请输入地址"
                                @input="clearSpecial($event, industryForm, 'addressDetail')"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人姓名" prop="contactName">
                            <el-input v-model="industryForm.contactName" placeholder="请输入联系人姓名"
                                @input="clearSpecial($event, industryForm, 'contactName')"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人手机号" prop="contactPhone">
                            <el-input v-model="industryForm.contactPhone" placeholder="请输入联系人手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人邮箱" prop="contactEmail">
                            <el-input v-model="industryForm.contactEmail" placeholder="请输入联系人邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="授权书" prop="la" ref="laForm">
                            <el-upload ref='uploadLa' class="upload-demo" :action="uploadUrl" :file-list="fileList"
                                :on-remove="handleRemoveLa" :before-upload="handleBeforeUpload"
                                :on-success="UploadLaSuccess" :headers="{ 'Authorization': 'Bearer ' + token }"
                                :limit="limitNum" list-type="picture">
                                <el-button size="small" type="primary">上传授权书</el-button>
                                <div slot="tip" class="el-upload__tip">
                                    <p class="formTitle">1、请上传加盖公章的授权书扫描件</p>
                                    <p class="formTitle">2、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                                    <p class="formTitle">3、图片不得超过5M</p>
                                    <p class="formTitle">4、上传的图片需清晰完整</p>
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <el-form ref="peosonalForm" :model="peosonalForm" :rules="peosonalRules" class="labelWidth125"
                        label-position="left" v-show="authType == 1">
                        <el-form-item label="注册类型">
                            <el-tag :effect="authType == 0 ? 'dark' : 'plain'" @click="chooseType(0)"
                                style="cursor:pointer" v-if="!onlyPerson">
                                企业</el-tag>
                            <el-tag :effect="authType == 1 ? 'dark' : 'plain'" @click="chooseType(1)"
                                style="cursor:pointer">
                                个人</el-tag>
                        </el-form-item>
                        <el-form-item label="姓名" prop="realName">
                            <el-input v-model="peosonalForm.realName" placeholder="请输入姓名" type="text"
                                @input="clearSpecial($event, peosonalForm, 'realName')"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证" prop="idNumber">
                            <el-input v-model="peosonalForm.idNumber" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证头像面" prop="idPortrait" ref="idPortrait">
                            <el-row>
                                <el-col :span="8">
                                    <el-upload ref='uploadIdPortrait' :action="uploadUrl"
                                        :before-upload="handleBeforeUpload" :on-success="UploadidPortraitSuccess"
                                        list-type="picture-card" :limit="limitNum"
                                        :on-preview="handlePictureCardPreview" :on-remove="handleRemovePortrait"
                                        :headers="{
                                            'Authorization': 'Bearer ' + token
                                        }" :class="{ disabled: uploadDisabled }">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-col>
                                <el-col :span="16">
                                    <p class="formTitle">1、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                                    <p class="formTitle">2、图片不得超过5M</p>
                                    <p class="formTitle">3、上传的图片需清晰完整</p>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="身份证国徽面" prop="idEmblem" ref="idEmblem">
                            <el-row>
                                <el-col :span="8">
                                    <el-upload ref='uploadIdEmblem' :action="uploadUrl"
                                        :before-upload="handleBeforeUpload" :on-success="UploadidEmblemSuccess"
                                        list-type="picture-card" :limit="limitNum"
                                        :on-preview="handlePictureCardPreview" :on-remove="handleRemoveEmblem" :headers="{
                                            'Authorization': 'Bearer ' + token
                                        }" :class="{ disabled: uploadDisabled1 }">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-col>
                                <el-col :span="16">
                                    <p class="formTitle">1、支持的图片格式包括 JPG、JPEG 和 PNG</p>
                                    <p class="formTitle">2、图片不得超过5M</p>
                                    <p class="formTitle">3、上传的图片需清晰完整</p>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
                    <div class="submit" @click="submit">提交认证</div>
                </div>
            </div>
        </div>

        <!-- 预览上传图片弹框 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { getProvince, getCity, getArea, uploadDocument, confirmType } from '@/api/realnameAuthentication/realnameAuthentication.js'
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
import { equal } from 'assert';
import { resetForm } from '../../../utils/ruoyi';
export default {
    name: "realNameAuthenticationSecond",
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            roles: state => state.user.roles,
        })
    },
    //防止用户认证过从网址输入地址直接跳转到材料上传页面
    beforeRouteEnter(to, from, next) {
        if (from.path != '/auth') {
            next({
                path: '/auth'
            })
        } else {
            next()
        }
    },
    data() {
        //验证全是空格
        const equalToEmpty = (rule, value, callback) => {
            if (/^\s+$/gi
                .test(value)) {
                callback(new Error('不能全输入空格'));
            } else {
                callback();
            }
        };
        const equalToid = (rule, value, callback) => {
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                .test(value)) {
                callback(new Error('请输入正确的身份证号'));
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
        let validatecreditCode = (rule, value, callback) => {
            //使用正则表达式进行社会码
            if (!/^[A-Za-z0-9]+$/.test(value)) {
                callback(new Error('请输入正确的统一社会信用代码！'));
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
            token: '',
            uploadUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
            selectProvince: "",
            selectCity: "",
            selectArea: "",
            loading: false,
            authType: 0,
            limitNum: 1,
            industryForm: {
                userId: '',
                did: '',
                authType: 102,
                orgName: '',
                org: '',
                creditCode: '',
                businessLicense: '',
                address: '',
                addressDetail: '',
                contactName: '',
                contactPhone: '',
                contactEmail: '',
                la: ''
            },
            peosonalForm: {
                userId: '',
                did: '',
                authType: 101,
                realName: '',
                idNumber: '',
                idPortrait: '',
                idEmblem: ''
            },
            industryRules: {
                authType: [{ required: true }],
                orgName: [{ required: true, trigger: 'blur', message: "请输入机构名称" },
                { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
                { required: true, validator: equalToEmpty, trigger: "blur" }],
                org: [{ required: true, trigger: 'blur', message: "请输入机构简称" },
                { min: 2, max: 10, message: "机构简称长度必须介于 2 和 10 之间", trigger: "blur" },
                { required: true, validator: equalToEmpty, trigger: "blur" }],
                creditCode: [{ required: true, trigger: 'blur', message: "请输入信用代码" },
                { required: true, validator: validatecreditCode, trigger: "blur" },
                { min: 18, max: 18, message: "长度为18位", trigger: "blur" },],
                businessLicense: [{ required: true, message: "请输入营业执照" }],
                address: [{ required: true, message: "请输入地址" }],
                addressDetail: [{ required: true, trigger: 'blur', message: "请输入详细地址" },
                { min: 2, max: 200, message: "详细地址必须介于 2 和 200 之间", trigger: "blur" },
                { required: true, validator: equalToEmpty, trigger: "blur" }],
                contactName: [{ required: true, trigger: 'blur', message: "请输入联系人姓名" },
                { min: 1, max: 100, message: "联系人姓名必须介于 1 和 100 之间", trigger: "blur" },
                { required: true, validator: equalToEmpty, trigger: "blur" }],
                contactPhone: [{ required: true, trigger: 'blur', message: "请输入联系人电话" }, { required: true, validator: validatePhone, trigger: "blur" }],
                contactEmail: [{ required: true, trigger: 'blur', message: "请输入联系人邮箱" }, { required: true, validator: validateEmail, trigger: "blur" },
                { min: 1, max: 100, message: "邮箱长度最大100", trigger: "blur" }],
                la: [{ required: true, message: "请输入授权书" }]
            },
            peosonalRules: {
                authType: [{ required: true }],
                realName: [{ required: true, trigger: 'blur', message: "请输入姓名" },
                { min: 1, max: 20, message: "姓名长度 1 和 20 之间", trigger: "blur" },
                { required: true, validator: equalToEmpty, trigger: "blur" }],
                idNumber: [{ required: true, trigger: 'blur', message: "请输入身份证" },
                { required: true, validator: equalToid, trigger: "blur" }],
                idPortrait: [{ required: true, message: "请输入身份证头像面" }],
                idEmblem: [{ required: true, message: "请输入身份证国徽面" }]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileSize: 5,
            provinceList: [],
            cityList: [],
            areaList: [],
            province: '',
            city: '',
            area: '',
            fileList: [],
            uploadDisabled: false,
            uploadDisabled1: false,
            uploadDisabled2: false,
            onlyPerson: false
        };
    },
    created() {
        this.getProvince()
        this.token = getToken()
        // if (this.roles.includes('subchain')) {
        //     this.chooseType(1)
        // }
        this.judgeType()
    },
    methods: {
        checkRole,
        judgeType() {
            confirmType().then(res => {
                if (res.code == 200) {
                    if (res.data > 0) {
                        this.onlyPerson = true
                        this.chooseType(1)
                    } else {
                        if (this.roles.includes('subchain')) {
                            this.onlyPerson = true
                            this.chooseType(1)
                        }
                    }
                }
            })
        },
        chooseType(e) {
            this.authType = e
            if (e == 0) {
                resetForm(this, 'industryForm')
                this.$refs.uploadIdPortrait.clearFiles();
                this.$refs.uploadIdEmblem.clearFiles();
                this.uploadDisabled = false
                this.uploadDisabled1 = false
                this.uploadDisabled2 = false
            } else {
                resetForm(this, 'peosonalForm')
                this.$nextTick(() => {
                    this.$refs.uploadBusinessLicense.clearFiles();
                    this.$refs.uploadLa.clearFiles();
                })
                this.uploadDisabled = false
                this.uploadDisabled1 = false
                this.uploadDisabled2 = false
            }
        },
        //获取省级市
        getProvince() {
            getProvince().then(res => {
                this.provinceList = res
            })
        },
        //选择省后请求市区
        chooseProvince(e) {
            this.province = e.regionName
            this.industryForm.address = this.province
            let param = {
                parentCode: e.regionCode
            }
            this.cityList = []
            this.areaList = []
            this.city = ''
            this.area = ''
            getCity(param).then(res => {
                this.cityList = res
            })
        },
        //选择市区后请求县
        chooseCity(e) {
            this.city = e.regionName
            this.industryForm.address = this.province + this.city
            let param = {
                parentCode: e.regionCode
            }
            this.areaList = []
            this.area = ''
            getArea(param).then(res => {
                this.areaList = res
            })
        },

        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 上传前校检格式和大小
        handleBeforeUpload(file) {
            // 校检文件大小
            if (this.fileSize) {
                const isLt = file.size / 1024 / 1024 < this.fileSize;
                if (!isLt) {
                    this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
                    return false;
                }
            }
            // 校检文件类型
            let flag = false
            if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
                flag = true
            }
            if (!flag) {
                this.$message.error('上传文件只能是JPG、JPEG、PNG格式!');
                return false
            }
            return true;
        },
        //营业执照上传成功
        UploadLicenseSuccess(res, file) {
            if (res.code == 200) {
                this.industryForm.businessLicense = res.fileName
                this.uploadDisabled2 = true;
                this.$refs.businessLicense.clearValidate()
            }
        },
        //授权书上传成功
        UploadLaSuccess(res, file) {
            if (res.code == 200) {
                this.industryForm.la = res.fileName
                this.$refs.laForm.clearValidate()
            }
        },
        //身份证头像上传成功
        UploadidPortraitSuccess(res, file) {
            if (res.code == 200) {
                this.peosonalForm.idPortrait = res.fileName
                this.uploadDisabled = true;
                this.$refs.idPortrait.clearValidate()
            }
        },
        //身份证国徽上传成功
        UploadidEmblemSuccess(res, file) {
            if (res.code == 200) {
                this.peosonalForm.idEmblem = res.fileName
                this.uploadDisabled1 = true;
                this.$refs.idEmblem.clearValidate()
            }
        },
        //移除营业执照
        handleRemoveLicense(file, fileList) {
            this.industryForm.businessLicense = ''
            this.uploadDisabled2 = false
        },
        //移除授权书
        handleRemoveLa(file, fileList) {
            this.industryForm.la = ''
        },
        //移除身份证头像
        handleRemovePortrait(file, fileList) {
            this.peosonalForm.idPortrait = ''
            this.uploadDisabled = false
        },
        //移除身份证国徽
        handleRemoveEmblem(file, fileList) {
            this.peosonalForm.idEmblem = ''
            this.uploadDisabled1 = false
        },
        handleRemove(file, fileList) {
        },
        submit() {
            let type = this.authType
            switch (type) {

                case 0:
                    this.industryForm.address = this.province + this.city + this.area
                    this.industryForm.userId = this.userInfo.userId
                    this.industryForm.did = this.userInfo.did
                    this.$refs.industryForm.validate((valid) => {
                        if (valid) {
                            this.successSubmit(this, this.industryForm)
                        }
                    })
                    break;
                case 1:
                    this.peosonalForm.userId = this.userInfo.userId
                    this.peosonalForm.did = this.userInfo.did
                    this.$refs.peosonalForm.validate((valid) => {
                        if (valid) {
                            this.successSubmit(this, this.peosonalForm)
                        }
                    })
            }

        },
        successSubmit(that, data) {
            uploadDocument(data).then(res => {
                if (res.code == 200) {
                    that.$message({
                        message: '上传成功',
                        type: 'success',
                        customClass: 'global-messageZindex'
                    })
                    this.$store.dispatch('GetUserDigitalInfo')
                    this.$router.push({
                        path: '/account/authResult'
                    })
                }
            })
        },
        //清除特殊字符
        clearSpecial(e, form, text) {
            form[text] = e.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        }
    },
};
</script>
<style scoped lang="scss">
.border {
    width: 180px;
    height: 2px;
    background: #dfecf7;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
}

.text-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 235px auto 222px;
}

.header-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 252px;
    margin-right: 252px;
    margin-top: 30px;

    .step-back {
        background-image: url("../../../assets/images/step.png");
        width: 60px;
        height: 69px;
        background-size: 60px 69px;
        font-size: 28px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .step-back1 {
        background-size: 60px 69px;
        background-image: url("../../../assets/images/unstep.png");
        width: 60px;
        height: 69px;
        font-size: 28px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.warp {
    width: 1610px;
    min-height: 60vh;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 50px auto 0px;
    overflow: hidden;
    padding-bottom: 30px;

    .itemTitle {
        height: 22px;
        font-size: 16px;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #333333;
        line-height: 22px;
        margin: 15px 0 0 25px
    }

    .content {
        width: 700px;
        margin: 0 auto;
    }

    .choied {
        background: #2F88FF;
    }

    .nochoied {
        background: #fff;
    }
}

.submit {
    width: 300px;
    height: 35px;
    background: #2F88FF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 50px auto 0px;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
}

.noticeEdit {
    margin: 0 0;
    color: rgb(192, 201, 219);
    font-size: 12px;
}

.disabled {
    ::v-deep .el-upload--picture-card {
        display: none !important;
    }
}

.labelWidth {
    ::v-deep.el-form-item__label {
        width: 150px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 150px;
    }
}

.labelWidth125 {
    ::v-deep.el-form-item__label {
        width: 125px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 125px;
    }
}
</style>