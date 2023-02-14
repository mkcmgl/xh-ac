<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter" @click="toLast">子链接入</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
            <el-button type="primary" size="mini" style="float:right" @click="authShow = true"
                v-if="audit.auditResult == 0&&checkRole(['backbone'])">审批</el-button>
        </div>
        <div class="resultContent1">
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">申请时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !audit.requestTime ? '---' : audit.requestTime }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">审核状态</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        <span>{{ audit.auditResult == 0 ? '待审核' : audit.auditResult == 1 ? '通过' : '不通过'
                        }}</span>
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px" v-if="audit.auditResult==2">
                <el-col :span="3">
                    <span class="formTitle">审核意见</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !audit.auditReason ? '---' : audit.auditReason }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px" v-if="apiKey&&apiSecret">
                <el-col :span="3">
                    <span class="formTitle">apiKey</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ apiKey }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">apiSecret</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        <span>{{ apiSecrett}}</span>
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent1">
            <h3 class="contentTitle">链基本信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">链名称</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.chainName ? '---' : baseInfo.chainName }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">链所属行业</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.industry ? '---' : baseInfo.industry }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">链类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.subChainType ? '---' : baseInfo.subChainType == 0 ? '子链' : '骨干链' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">链架构</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.chainArch ? '---' : baseInfo.chainArch }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">创世账户</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ !baseInfo.genesisAccount ? '---' : baseInfo.genesisAccount }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">创世账户Token总数</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ !baseInfo.genesisAmount ? '---' : baseInfo.genesisAmount }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">Token单位</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.unit ? '---' : baseInfo.unit }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">Token精度</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.precise ? '---' : baseInfo.precise }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">账户Token保留数</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.baseReserve ? '---' : baseInfo.baseReserve }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">最低Gas单价</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.feeGasPrice ? '---' : baseInfo.feeGasPrice }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">出块奖励</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.rewardInitValue ? '---' : baseInfo.rewardInitValue }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">区块链口号</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.genesisSlogan ? '---' : baseInfo.genesisSlogan }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">链介绍</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent autoWarp">
                        {{ !baseInfo.remark ? '---' : baseInfo.remark }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">申请备注</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !baseInfo.remark ? '---' : baseInfo.remark }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent1">
            <h3 class="contentTitle">链系统信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">子链访问地址</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent alink">
                        <a target="_blank" :href='`//${systemInfo.visitUrl}`'>
                            {{ systemInfo.visitUrl ? systemInfo.visitUrl : '---' }}
                        </a>
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">链开放类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        <span v-if="systemInfo.publicStatus == 0">许可</span>
                        <span v-if="systemInfo.publicStatus == 1">开放</span>
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">AC号</span>
                </el-col>
                <el-col :span="9">
                    {{ !systemInfo.chainCode ? '---' : systemInfo.chainCode }}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="ipvTableList" :v-loading="loading">
                        <el-table-column label="类型" prop="type"></el-table-column>
                        <el-table-column label="网络信息">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == 'url'">
                                    {{ scope.row.address }}
                                </span>
                                <span v-else>
                                    {{ scope.row.ip + ':' + scope.row.port }}
                                </span>

                            </template>

                        </el-table-column>
                        <el-table-column label=" 备注" prop="remark">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent1">
            <h3 class="contentTitle">链应用信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">应用名称</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !applicationInfo.applicationName ? '---' : applicationInfo.applicationName }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">应用方向</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !applicationInfo.direction ? '---' : applicationInfo.direction }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">开发状态</span>
                </el-col>
                <el-col :span="9" class="formContent">
                    {{ !applicationInfo.devState == 0 ? '已开发' : '未开发' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">建设周期</span>
                </el-col>
                <el-col :span="9" class="formContent">
                    {{ !applicationInfo.constructionPeriod ? '---' : applicationInfo.constructionPeriod }}
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">预计发布时间</span>
                </el-col>
                <el-col :span="9" class="formContent">
                    {{ applicationInfo.publishTime ? applicationInfo.publishTime : '---' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">建设文档</span>
                </el-col>
                <el-col :span="9">
                    <p v-for="(item, index) in uploadFileList" :key="index" class="lw fileUpload"
                        @click="downLoadFile(item.url)">
                        {{ item.name }}
                    </p>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">应用简介</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    {{ applicationInfo.introduction ? applicationInfo.introduction : '---' }}
                </el-col>
            </el-row>
        </div>
        <div class="resultContent1">
            <h3 class="contentTitle">上链信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="1" class="circleWarp">
                    <span class="cirlce"></span>
                </el-col>
                <el-col :span="5">
                    <span class="formContent">
                        {{ !audit.auditTime ? '---' : audit.auditTime }}
                    </span>
                </el-col>
                <el-col :span="5">
                    <span class="formContent">
                        审核子链
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="2" :offset="1">
                    <span class="formTitle">交易哈希</span>
                </el-col>
                <el-col :span="5" :offset="1">
                    <span class="formContent">
                        {{ !audit.upTxHash ? '---' : audit.upTxHash }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="1" class="circleWarp">
                    <span class="cirlce"></span>
                </el-col>
                <el-col :span="5">
                    <span class="formContent">
                        {{ !audit.requestTime ? '---' : audit.requestTime }}
                    </span>
                </el-col>
                <el-col :span="5">
                    <span class="formContent">
                        申请子链
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="2" :offset="1">
                    <span class="formTitle">交易哈希</span>
                </el-col>
                <el-col :span="5" :offset="1">
                    <span class="formContent">
                        {{ !audit.requestTxHash ? '---' : audit.requestTxHash }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <auth-dialog :show="authShow" @close="closeAuth" @confirm="confirm"></auth-dialog>
    </div>
</template>

<script>
import { checkRole } from "@/utils/permission"; // 权限判断函数
import { subchainApplyDetail, auth } from "@/api/subChainManage/subChainAccess/index.js"
import authDialog from '@/components/common/authDialog.vue'
export default {
    components: { authDialog },
    name: "Job",
    data() {
        return {
            loading: true,
            baseInfo: {
                chainName: '',
                industry: '',
                subChainType: '',
                chainArch: '',
                genesisAccount: '',
                genesisAmount: '',
                unit: '',
                precise: '',
                baseReserve: '',
                feeGasPrice: '',
                rewardInitValue: '',
                genesisSlogan: '',
                gatewayNode: '',
                gatewayCross: '',
                remark: '',
            },
            systemInfo: {
                visitUrl: '',
                publicStatus: '',
                chainCode: '',
                ipv4List: null,
                ipv6List: null,
                urlList: null
            },
            applicationInfo: {
                applicationName: '',
                direction: '',
                introduction: '',
                devState: '',
                documentUrl: '',
                constructionPeriod: '',
                publishTime: '',
            },
            audit: {
                upTxHash: '',
                requestTxHash: '',
                auditResult: '',
                blob: '',
                auditTime: '',
            },
            ipvTableList: [],
            uploadFileList: [],
            authShow: false,
            apiKey:'',
            apiSecret:''
        };
    },
    created() {
        this.getDetail()
    },
    methods: {
        checkRole,
        getDetail() {
            if (this.$route.query.data) {
                let param = {
                    id: this.$route.query.data
                }
                subchainApplyDetail(param).then(res => {
                    if (res.code == 200) {
                        this.baseInfo = res.data.base
                        this.systemInfo = res.data.system
                        this.applicationInfo = res.data.application
                        this.apiKey = res.data.apiKey
                        this.apiSecret = res.data.apiSecret
                        this.audit = res.data.audit
                        this.ipvTableList = []
                        if ((this.systemInfo.ipv4List ?? '') !== '') {
                            this.systemInfo.ipv4List = JSON.parse(this.systemInfo.ipv4List)
                            this.changeTableData(this.systemInfo.ipv4List, 'ipv4')

                        }
                        if ((this.systemInfo.ipv6List ?? '') !== '') {
                            this.systemInfo.ipv6List = JSON.parse(this.systemInfo.ipv6List)
                            this.changeTableData(this.systemInfo.ipv6List, 'ipv6')
                        }
                        if ((this.systemInfo.urlList ?? '') !== '') {
                            this.systemInfo.urlList = JSON.parse(this.systemInfo.urlList)
                            this.changeTableData(this.systemInfo.urlList, 'url')
                        }
                        this.dealFile(this.applicationInfo.documentUrl)
                    }
                })
            }
        },
        toLast() {
            this.$router.go(-1)
        },
        //处理可下载的文件
        dealFile(e) {
            this.uploadFileList = []
            let fileList = e.split(',')
            fileList.map(item => {
                let splitArr = item.split('/')
                let str = splitArr[splitArr.length - 1]
                let fileName = str.split('_')[0]
                let obj = {
                    url: item,
                    name: fileName
                }
                this.uploadFileList.push(obj)
            })
        },
        //将josn转为table数据
        changeTableData(data, flag) {
            if (flag == 'ipv4') {
                data.map(item => {
                    this.$set(item, 'type', 'ipv4')
                    this.ipvTableList.push(item)
                })
            } else if (flag == 'ipv6') {
                data.map(item => {
                    this.$set(item, 'type', 'ipv6')
                    this.ipvTableList.push(item)
                })
            } else {
                data.map(item => {
                    this.$set(item, 'type', 'url')
                    this.ipvTableList.push(item)
                })
            }
            this.loading = false
        },
        downLoadFile(e) {
            this.$download.resource(e);
        },
        closeAuth() {
            this.authShow = false
        },
        confirm(e, e1) {
            let data = {
                auditResult: 1,
                baseId: this.$route.query.data,
                auditReason: '',
                userId:this.audit.userId
            }
            if (e == 'pass') {
                data.auditResult = 1
            } else {
                data.auditResult= 2
                data.auditReason = e1
            }
            auth(data).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '审核成功',
                        type: 'success'
                    })
                    this.getDetail()
                } else {
                    this.$message({
                        message: '审核失败',
                        type: 'error'
                    })
                }
                this.authShow = false
            })
        }
    }
};
</script>
<style scoped lang="scss">
.alink {
    color: #2F88FF;
    cursor: pointer;
}

.alink:hover {
    color: #559EFF;
}

.cirlce {
    display: block;
    width: 8px;
    height: 8px;
    background: #DCDEE2;
    opacity: 1;
    border-radius: 50%;
}

.circleWarp {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fileUpload {
    margin: 0;
}
</style>