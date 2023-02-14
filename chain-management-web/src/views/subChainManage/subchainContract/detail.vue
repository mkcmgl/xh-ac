<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">加入子链</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">基本信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">合约名称</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.contractName ? subBaseInfo.contractName : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">行业类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.industry ? subBaseInfo.industry : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">合约拥有人BID</span>
                </el-col>
                <el-col :span="9"  class="formContent autoWarp">
                    {{ subBaseInfo.ownerAddress ? subBaseInfo.ownerAddress : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">合约地址</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ subBaseInfo.contractAddress ? subBaseInfo.contractAddress : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">合约类型</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.contractType ? subBaseInfo.contractType : '无' }}
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">创建时间</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.syncTime ? subBaseInfo.syncTime : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">所属骨干节点</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp" >
                    <span >
                        {{ subBaseInfo.backboneNodeBid ? subBaseInfo.backboneNodeBid : '无' }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">合约详细信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">合约版本</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.contractVersion ? subBaseInfo.contractVersion : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">合约引擎</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.contractEngine ? subBaseInfo.contractEngine : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">合约代码</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.payload ? subBaseInfo.payload : '无' }}
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { subchainContractList } from "@/api/subChainManage/subchainContract/index.js"

export default {
    name: "authChechDetail",
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            subchainDetail: state => state.user.subchainDetail,
        })
    },
    data() {
        return {
            contractAddress: '',
            subBaseInfo: {
                apiKey: '',
                baseId: '',
                blobId: '',
                blockHash: '',
                blockHeight: '',
                blockSize: '',
                chainCode: '',
                chainName: '',
                channelName: '',
                endTime: '',
                gatewayNode: '',
                outNodeAddress: '',
                outNodeName: '',
                startTime: '',
                syncTime: '',
                txHash: '',
                txNumber: '',
            }
        };
    },
    created() {
        if (this.$route.query.id) {
            this.contractAddress = this.$route.query.id
            let data = {
                baseId: '',
                contractAddress: this.contractAddress,
                pageSize: 1,
                pageNum: 1,
            }
            if(this.subchainDetail){
                data.baseId=this.subchainDetail.subchainId
            }
            this.fetchData(data)
        }
    },
    methods: {
        //子链信息
        fetchData(data) {
            subchainContractList(data).then(res => {
                if (res.code == 200) {
                    this.subBaseInfo = res.data.list[0]
                }
            })
        },
        toLast() {
            this.$router.go(-1)
        }
    }
};
</script>
<style scoped lang="scss">
.contentTitle {
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 22px;
    margin: 0 0;
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

.realTimeInfo {
    display: inline-block;
    width: 100%;
    font-size: 26px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
}
</style>