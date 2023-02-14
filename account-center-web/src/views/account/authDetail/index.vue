<template>
    <div class="app-container">
        <el-button type="primary" style="float: right;margin-right: 30px;" v-if="authData.status == 0"
                @click="toAuth">审核</el-button>
        <div class="title">
            <span class="lastRouter" @click="toLast">实名认证审核</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="resultContent" v-if="authData.authType == '102'">
            <h3 class="contentTitle">基本信息</h3>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">认证类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.authType == 102 ? '企业认证' : '个人认证' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">认证状态</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.status == 0 ? '待审核' : authData.status == 1 ? '审核通过' : '审核驳回' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">申请方BID</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.did }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">申请时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.applyDate }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">机构名称</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.orgName ? authData.orgName : '无' }}
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
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">统一社会信用代码</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.creditCode ? authData.creditCode : '无' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">营业执照</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent" style="color:#2F88FF;cursor:pointer"
                        @click="reviewUrl(authData.businessLicense)">
                        {{ authData.businessLicense ? '点击查看图片' : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">地址</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.address ? authData.address : '无' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">详细地址</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.addressDetail ? authData.addressDetail : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px" v-if="authData.reviewDate">
                <el-col :span="3">
                    <span class="formTitle">审核时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.reviewDate ? authData.reviewDate : '无' }}
                    </span>
                </el-col>
            </el-row>

        </div>
        <div class="personal" v-if="authData.authType == '101'">
            <h3 class="contentTitle">基本信息</h3>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">认证类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.authType == 102 ? '企业认证' : '个人认证' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">认证状态</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.status == 0 ? '待审核' : authData.status == 1 ? '审核通过' : '审核驳回' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">申请方BID</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.did }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">申请时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.applyDate }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">真实姓名</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.realName ? authData.realName : '无' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">身份证号</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.idNumber ? authData.idNumber : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">身份证头像面</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent" style="color:#2F88FF;cursor:pointer"
                        @click="reviewUrl(authData.idPortrait)">
                        点击查看图片
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">身份证国徽面</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent" style="color:#2F88FF;cursor:pointer"
                        @click="reviewUrl(authData.idEmblem)">
                        点击查看图片
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px" v-if="authData.reviewDate">
                <el-col :span="3">
                    <span class="formTitle">审核时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.reviewDate ? authData.reviewDate : '无' }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="contactInfo" v-if="authData.authType == '102'">
            <h3 class="contentTitle">联系人信息</h3>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">联系人姓名</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.contactName ? authData.contactName : '无' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">联系人手机号</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.contactPhone ? authData.contactPhone : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">联系人邮箱</span>
                </el-col>
                <el-col :span="9">
                    <div class="formContent emainContent">
                        {{ authData.contactEmail ? authData.contactEmail : '无' }}
                    </div>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">授权书</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent" style="color:#2F88FF;cursor:pointer" @click="reviewUrl(authData.la)">
                        点击查看图片
                    </span>
                </el-col>
            </el-row>

        </div>
        <!--审核意见 -->
        <div class="contactInfo" v-if="authData.status == '1' || authData.status == '2'">
            <h3 class="contentTitle">审核意见</h3>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">审核结果</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.status == 1 ? '审核通过' : '审核驳回' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">审核时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.reviewDate ? authData.reviewDate : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px" v-if="authData.status == 2">
                <el-col :span="3">
                    <span class="formTitle">驳回原因</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.reviewOpinion ? authData.reviewOpinion : '无' }}
                    </span>
                </el-col>
            </el-row>

        </div>
        <!-- 审核 -->
        <el-dialog title="审核" :visible.sync="authShow" width="28%" :before-close="close" top="33vh"
            :append-to-body="true" z-index="99999">
            <div class="line"></div>
            <el-form ref="authForm" :model="authForm" :rules="authFormRules" label-width="110px" label-position="left"
                v-show="authType == '1'">
                <el-form-item label="审核意见">
                    <el-radio-group v-model="authType" @change="changeType">
                        <el-radio label="1">通过</el-radio>
                        <el-radio label="2">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-form ref="authForm1" :model="authForm1" :rules="authFormRules1" label-width="110px"
                label-position="left" v-show="authType == '2'">
                <el-form-item prop="status" label="审核意见">
                    <el-radio-group v-model="authType">
                        <el-radio label="1">通过</el-radio>
                        <el-radio label="2">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="reviewOpinion" label="驳回原因">
                    <el-input v-model="authForm1.reviewOpinion" type="textarea" :rows="2" placeholder="请输入驳回原因">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="buttonline"></div>
            <div class="btnWarp">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="toReview">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { resetForm } from '@/utils/ruoyi';
import { review } from '@/api/businessManagement/authCheck.js'
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
            seePictureUrl: process.env.VUE_APP_BASE_API,
            dialogImageUrl: '',
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
                did: '',
                authId: '',
                authType: '',
                status: '1',
                reviewOpinion: ''
            },
            authForm1: {
                did: '',
                authId: '',
                authType: '',
                status: '1',
                reviewOpinion: ''
            },
            authFormRules: {
                status: [{ trigger: "blur", message: "请选择通过与否" }],
            },
            authFormRules1: {
                status: [{ trigger: "blur", message: "请选择通过与否" }],
                reviewOpinion: [{ required: true, trigger: "blur", message: "请输入审核意见" },
                {
                    max: 255,
                    message: "审核意见长度最大255",
                    trigger: "blur",
                },
                ]
            },
            authType: '1'

        };
    },
    created() {
        this.token = getToken()
        if (this.$route.query.data) {
            let data = JSON.parse(this.$route.query.data)
            this.authData = { ...this.authData, ...data }
            console.log(this.authData)
        }
    },
    methods: {
        changeType(e) {
            this.authForm1.reviewOpinion = ''
        },
        toLast() {
            this.$router.go(-1)
        },
        //预览图片
        reviewUrl(url) {
            this.dialogImageUrl = `${this.seePictureUrl}${url}?Authorization=${this.token}`
            this.dialogImageUrl = encodeURI(this.dialogImageUrl).replace(/\#/g,'%23')
            this.dialogVisible = true

        },
        toAuth() {
            this.authShow = true
            resetForm(this, 'authForm')
            this.authForm.status = '1'
        },
        close() {
            this.authShow = false
        },
        //审核
        toReview() {
            let flag = this.authType
            switch (flag) {
                case '1':
                    this.$refs.authForm.validate((valid) => {
                        if (valid) {
                            this.authForm.did = this.authData.did
                            this.authForm.authId = this.authData.authId
                            this.authForm.authType = this.authData.authType
                            this.authForm.status = '1'
                            review(this.authForm).then(res => {
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
                case '2':
                    this.$refs.authForm1.validate((valid) => {
                        if (valid) {
                            this.authForm1.did = this.authData.did
                            this.authForm1.authId = this.authData.authId
                            this.authForm1.authType = this.authData.authType
                            this.authForm1.status = '2'
                            review(this.authForm1).then(res => {
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

        }
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
</style>