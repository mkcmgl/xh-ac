<template>
    <div class="app-container">
        <el-button type="primary" style="float: right;margin-right: 30px;" v-if="authData.auditResult == 0&&checkRole(['subchain'])"
            @click="toAuth">
            审核</el-button>
        <div class="title">
            <span class="lastRouter" @click="toLast">加入子链</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">审批信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">审批状态</span>
                </el-col>
                <el-col :span="9">
                    <span v-if="authData.auditResult == 0" class="formContent">待审核</span>
                    <span v-if="authData.auditResult == 1" class="formContent">驳回</span>
                    <span v-if="authData.auditResult == 2" class="formContent">通过</span>
                    <span v-if="authData.auditResult == 3" class="formContent">已加入</span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle" v-if="authData.auditResult != 0">审核时间</span>
                </el-col>
                <el-col :span="9" v-if="authData.auditResult != 0">
                    <span class="formContent">
                        {{ authData.auditTime ? authData.auditTime : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10" v-if="authData.auditResult == 1">
                <el-col :span="3">
                    <span class="formTitle">驳回原因</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent break">
                        {{ authData.remark ? authData.remark : '无' }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">用户类型</h3>
            <div v-if="authData.authType == 102">
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">申请人</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.applicant ? authData.applicant : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="3">
                        <span class="formTitle">认证类型</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.authType == 102 ? '企业认证' : '个人认证' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">主体数字身份bid</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.did ? authData.did : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="3">
                        <span class="formTitle">机构简称</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.org ? authData.org : '无' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">机构名称</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.orgName ? authData.orgName : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="3">
                        <span class="formTitle">地址</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.address ? authData.address : '无' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">统一社会信用代码</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.creditCode ? authData.creditCode : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="3">
                        <span class="formTitle">联系人姓名</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.contactName ? authData.contactName : '无' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">详细地址</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.addressDetail ? authData.addressDetail : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="3">
                        <span class="formTitle">联系人邮箱</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.contactEmail ? authData.contactEmail : '无' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">联系人手机号</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.contactPhone ? authData.contactPhone : '无' }}
                        </span>
                    </el-col>
                </el-row>
            </div>
            <div v-else>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">申请人</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.userId ? authData.userId : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="3" class="formTitle">
                        <span >主体数字身份bid</span>
                    </el-col>
                    <el-col :span="9" class="formContent autoWarp">
                        <span >
                            {{ authData.did ? authData.did : '无' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">认证类型</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.authType == 102 ? '企业认证' : '个人认证' }}
                        </span>
                    </el-col>
                    <el-col :span="3">
                        <span class="formTitle">真实姓名</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.realName ? authData.realName : '无' }}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <span class="formTitle">身份证号</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.idNumber ? authData.idNumber : '无' }}
                        </span>
                    </el-col>
                </el-row>
            </div>

        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">申请信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">申请加入链名</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.chainName ? authData.chainName : '' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">申请角色</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.applyRole=='105' ? '子链用户' : '子链用户' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">申请理由</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.applyReason ? authData.applyReason : '无' }}
                    </span>
                </el-col>

            </el-row>
        </div>
        <!-- 审核 -->
        <el-dialog title="审核" :visible.sync="authShow" width="28%" :before-close="close" top="33vh"
            :append-to-body="true" z-index="99999">
            <div class="line"></div>
            <el-form ref="authForm" :model="authForm" :rules="authFormRules" label-width="110px" label-position="left"
                v-show="authType == '2'">
                <el-form-item label="审核意见">
                    <el-radio-group v-model="authType" @change="changeType">
                        <el-radio label="2">通过</el-radio>
                        <el-radio label="1">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-form ref="authForm1" :model="authForm1" :rules="authFormRules1" label-width="110px"
                label-position="left" v-show="authType == '1'">
                <el-form-item prop="auditResult" label="审核意见">
                    <el-radio-group v-model="authType">
                        <el-radio label="2">通过</el-radio>
                        <el-radio label="1">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="remark" label="驳回原因">
                    <el-input v-model="authForm1.remark" type="textarea" :rows="2" placeholder="请输入驳回原因">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="buttonline"></div>
            <div class="btnWarp">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="toReview">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { subchainJoinAuditDetail,subchainJoinAudit } from "@/api/subChainManage/subChianJoin/index.js"
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
export default {
    name: "authChechDetail",
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    data() {
        return {
            token: '',
            dialogVisible: false,
            authData: {
                userId: '',
                did: '',
                authType: '0',
                orgName: '',
                org: '',
                creditCode: '',
                businessLicense: '',
                address: '',
                addressDetail: '',
                contactName: '',
                contactPhone: '',
                contactEmail: '',
                la: '',
                realName: '',
                idNumber: '',
                idPortrait: '',
                idEmblem: '',
                applyDate: '',
                status: '',
                reviewOpinion: '',
                reviewDate: ''
            },
            authShow: false,
            authForm: {
                id: '',
                auditResult: '2',
                remark: '',
            },
            authForm1: {
                id: '',
                auditResult: '1',
                remark: ''
            },
            authFormRules: {
                auditResult: [{ trigger: "blur", message: "请选择通过与否" }],
            },
            authFormRules1: {
                auditResult: [{ trigger: "blur", message: "请选择通过与否" }],
                remark: [{ required: true, trigger: "blur", message: "请输入审核意见" },
                {
                    max: 255,
                    message: "审核意见长度最大255",
                    trigger: "blur",
                },
                ]
            },
            authType: '2'

        };
    },
    created() {
        if (this.$route.query.id) {
            let data = {
                id: this.$route.query.id
            }
            subchainJoinAuditDetail(data).then(res => {
                if (res.code == 200) {
                    this.authData = res.data
                    this.authData.contactPhone = decrypt(this.authData.contactPhone)
                    this.authData.idNumber = decrypt(this.authData.idNumber)
                    this.replaceSecret(this.authData)
                }
            })
        }
    },
    methods: {
        checkRole,
        changeType(e) {
            this.authForm1.remark = ''
        },
        toLast() {
            this.$router.go(-1)
        },
        toAuth() {
            this.authShow = true
            this.resetForm('authForm')
            this.authType='2'
            this.authForm.auditResult = '2'
        },
        close() {
            this.authShow = false
        },
        //审核
        toReview() {
            let flag = this.authType
            switch (flag) {
                case '2':
                    this.$refs.authForm.validate((valid) => {
                        if (valid) {
                            this.authForm.id = this.authData.id
                            this.authForm.auditResult = '2'
                            subchainJoinAudit(this.authForm).then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                        message: '审核成功',
                                        type: 'success',
                                        customClass: 'global-messageZindex'
                                    })
                                    this.$router.go(-1)
                                }
                            })
                        }
                    })
                    break;
                case '1':
                    this.$refs.authForm1.validate((valid) => {
                        if (valid) {
                            this.authForm1.id = this.authData.id
                            this.authForm1.auditResult = '1'
                            subchainJoinAudit(this.authForm1).then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                        message: '审核成功',
                                        type: 'success',
                                        customClass: 'global-messageZindex'
                                    })
                                    this.$router.go(-1)
                                }
                            })
                        }
                    })
            }

        },
        //对敏感信息进行*替代
        replaceSecret(data) {
            //身份证号
            if (data.idNumber) {
                let newStr = data.idNumber.slice(2, 15)
                data.idNumber = data.idNumber.replace(newStr, '**********')
            }

            //联系人手机号
            if (data.contactPhone) {
                let newStr = data.contactPhone.slice(3, 7)
                data.contactPhone = data.contactPhone.replace(newStr, '****')
            }

        },
    },
};
</script>
<style scoped lang="scss">
.resultContent {
    width: 1610px;
    height: 230px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 20px auto;
    padding: 15px 0 0 25px;
}

.contentTitle {
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 22px;
    margin: 0 0;
}

.contactInfo {
    width: 1610px;
    height: 130px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 20px auto;
    padding: 15px 0 0 25px;
}

.personal {
    width: 1610px;
    height: 212px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 20px auto;
    padding: 15px 0 0 25px;
}

.emainContent {
    display: block;
    width: 100%;
    word-break: break-all;
}

::v-deep .el-dialog {
    .el-dialog__header {
        padding-top: 35px;
    }

    .el-dialog__body {
        margin: 0;
        padding: 0 25px 25px 25px;
    }

    .el-dialog__header {
        padding-top: 17px;
    }
}
.break{
    word-break: break-all;
}
</style>