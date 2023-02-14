<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">子链区块管理</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">基本信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">AC号</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.chainCode ? subBaseInfo.chainCode : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">数据网关地址</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ subBaseInfo.gatewayNode ? subBaseInfo.gatewayNode : '无' }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">区块头信息列表</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">区块高度</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.blockHeight ? subBaseInfo.blockHeight : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">出块节点地址</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ subBaseInfo.outNodeAddress ? subBaseInfo.outNodeAddress : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">出块节点</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.outNodeName ? subBaseInfo.outNodeName : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">区块交易数</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.txNumber ? subBaseInfo.txNumber : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">区块hash</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    {{ subBaseInfo.blockHash ? subBaseInfo.blockHash : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">区块生成时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.syncTime ? subBaseInfo.syncTime : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">区块大小</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.blockSize ? subBaseInfo.blockSize : '无' }}
                </el-col>
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">扩展字段</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">通道名称</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.channelName ? subBaseInfo.channelName : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">平行链名称</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.chainName ? subBaseInfo.chainName : '无' }}
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { subchainBlockList } from "@/api/subChainManage/subchainBlock/index.js"

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
            subChainId: '',
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
            this.subChainId = this.$route.query.id
            let data = {
                baseId: '',
                blockHash: this.subChainId,
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
            subchainBlockList(data).then(res => {
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