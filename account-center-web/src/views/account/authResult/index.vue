<template>
    <div class="app-container">
        <div class="title">实名认证</div>
        <div class="header-step">
            <div class="step-back">1</div>
            <div class="border"></div>
            <div class="step-back">2</div>
            <div class="border"></div>
            <div class="step-back">3</div>
        </div>
        <div class="text-step">
            <div>授权数字身份标识</div>
            <div>填写申请材料</div>
            <div>完成认证申请</div>
        </div>
        <div class="resultWarp">
            <div v-if="authStatus == 0">
                <img src="@/assets/images/right.png" class="authResultImg"></img>
                <p class="authResultText1">认证申请提交成功</p>
                <p class="authResultText2">您已提交认证申请，请耐心等待审核结果</p>
            </div>
            <div v-if="authStatus == 1">
                <img src="@/assets/images/right.png" class="authResultImg"></img>
                <p class="authResultText1">认证成功</p>
                <p class="authResultText2">您已经通过实名认证</p>
            </div>
            <div v-if="authStatus == 2">
                <img src="@/assets/images/error.png" class="authResultImg"></img>
                <p class="authResultText1">认证失败</p>
                <p class="authResultText2">你提交的认证申请未通过审核 未通过原因：{{ authData.reviewOpinion }}
                    <router-link to="/auth">
                        <el-button type="primary" plain>重新认证
                        </el-button>
                    </router-link>

                </p>
            </div>
        </div>
        <div class="digitalInfo">
            <h3 class="contentTitle">数字身份信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">数字身份主体</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ userInfo.userName }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">数字身份标识</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ userInfo.did }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">认证信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">认证类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ authData.authType == 102 ? '企业认证' : '个人认证' }}
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
            <div v-if="authData.authType == 102">
                <el-row style="margin-top:5px">
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
                <el-row style="margin-top:5px">
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
                <el-row style="margin-top:5px">
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
                <el-row style="margin-top:5px">
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
                <el-row style="margin-top:5px">
                    <el-col :span="3">
                        <span class="formTitle">联系人邮箱</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent emailContent">
                            {{ authData.contactEmail ? authData.contactEmail : '无' }}
                        </span>
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
                <el-row style="margin-top:5px" v-if="authData.status == 1">
                    <el-col :span="3">
                        <span class="formTitle">通过时间</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.reviewDate ? authData.reviewDate : '无' }}
                        </span>
                    </el-col>

                </el-row>
            </div>
            <div v-else>
                <el-row style="margin-top:5px">
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
                <el-row style="margin-top:5px">
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
                <el-row style="margin-top:5px" v-if="authData.status == 1">
                    <el-col :span="3">
                        <span class="formTitle">通过时间</span>
                    </el-col>
                    <el-col :span="9">
                        <span class="formContent">
                            {{ authData.reviewDate ? authData.reviewDate : '无' }}
                        </span>
                    </el-col>

                </el-row>
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
import { getInfo } from '@/api/realnameAuthentication/realnameAuthentication.js'
import { encrypt, decrypt } from '@/utils/jsencrypt';
export default {
    name: "AuthenticationResule",
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    data() {
        return {
            token: '',
            uploadUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
            seePictureUrl: process.env.VUE_APP_BASE_API,
            authStatus: 0,
            authType: 0,
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
            }
        };
    },
    created() {
        this.token = getToken()
        this.getResult()
    },
    methods: {
        //获取认证信息
        getResult() {
            let params = {
                did: encrypt(this.userInfo.did)
            }
            getInfo(params).then(res => {
                if (res.code == 200) {
                    this.authData = { ...this.authData, ...res.data }
                    this.authStatus = this.authData.status
                    if (this.authData.realName) {
                        this.authData.realName = decrypt(this.authData.realName)
                    }
                    if (this.authData.idNumber) {
                        this.authData.idNumber = decrypt(this.authData.idNumber)
                    }
                    if (this.authData.contactName) {
                        this.authData.contactName = decrypt(this.authData.contactName)
                    }
                    if (this.authData.contactPhone) {
                        this.authData.contactPhone = decrypt(this.authData.contactPhone)
                    }
                    if (this.authData.contactEmail) {
                        this.authData.contactEmail = decrypt(this.authData.contactEmail)
                    }
                    this.replaceSecret(this.authData)
                }
            })
        },
        //对敏感信息进行*替代
        replaceSecret(data) {
            //真实姓名
            if (data.realName) {
                let newStr = data.realName.slice(1, data.realName.length)
                data.realName = data.realName.replace(newStr, '**')
            }
            //身份证号
            if (data.idNumber) {
                let newStr = data.idNumber.slice(2, 15)
                data.idNumber = data.idNumber.replace(newStr, '**********')
            }
            //联系人姓名
            if (data.contactName) {
                let newStr = data.contactName.slice(1, data.contactName.length)
                data.contactName = data.contactName.replace(newStr, '**')
            }
            //联系人手机号
            if (data.contactPhone) {
                let newStr = data.contactPhone.slice(3, 7)
                data.contactPhone = data.contactPhone.replace(newStr, '****')
            }
            //联系人详细地址
            if (data.addressDetail) {
                data.addressDetail = '*****'
            }
            //联系人邮箱
            if (data.contactEmail) {
                let newStr = data.contactEmail.slice(3, -4)
                data.contactEmail = data.contactEmail.replace(newStr, '****')
            }
            //联系人地址
            if (data.address) {
                data.address = '**省**市**区'
            }
        },
        reviewUrl(url) {
            this.dialogImageUrl = `${this.seePictureUrl}${url}?Authorization=${this.token}`
            this.dialogImageUrl = encodeURI(this.dialogImageUrl).replace(/\#/g, '%23')
            this.dialogVisible = true
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
}

.resultWarp {
    width: 1610px;
    height: 250px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 50px auto 20px;
    overflow: hidden;

    .authResultImg {
        width: 80px;
        height: 80px;
        display: block;
        margin: 46px auto 21px;

    }

    .authResultText1 {
        font-size: 24px;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: #333333;
        line-height: 24px;
        text-align: center;
        margin: 0 0;
    }

    .authResultText2 {
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: #999999;
        line-height: 20px;
        margin: 7px auto 0;
        text-align: center;
    }
}

.digitalInfo {
    width: 1610px;
    height: 120px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 0px auto 20px;
    padding: 15px 0 0 25px;
}

.resultContent {
    width: 1610px;
    min-height: 212px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 0 auto;
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

.emailContent {
    display: inline-block;
    width: 100%;

}
</style>