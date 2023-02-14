<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">子链节点管理</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">基本信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">节点名称</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.nodeName ? subBaseInfo.nodeName : '无' }}
                </el-col>
                <el-col :span="3" >
                    <span class="formTitle">节点地址</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ subBaseInfo.nodeAddress ? subBaseInfo.nodeAddress : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">通信地址</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    {{ subBaseInfo.connectAddress ? subBaseInfo.connectAddress : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">节点类型</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        <span v-if="subBaseInfo.nodeType == 0">业务节点</span>
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">地理位置</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.district ? subBaseInfo.district : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">节点IP</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.publicIp ? subBaseInfo.publicIp : '无' }}
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">申请时间</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.syncTime ? subBaseInfo.syncTime : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">所属骨干节点</span>
                </el-col>
                <el-col :span="9" class="formContent autoWarp">
                    <span>
                        {{ subBaseInfo.backboneNodeBid ? subBaseInfo.backboneNodeBid : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">建设机构</span>
                </el-col>
                <el-col :span="9"  class="formContent autoWarp">
                    {{ subBaseInfo.enterprises ? subBaseInfo.enterprises : '无' }}
                </el-col>
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">服务器信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">服务器类型</span>
                </el-col>
                <el-col :span="9">
                    <span v-if="subBaseInfo.serverType == 0">自建服务器</span>
                    <span v-if="subBaseInfo.serverType == 1">云服务</span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">云类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.cloudType ? subBaseInfo.cloudType : '无' }}
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
import { subchainNodeList } from "@/api/subChainManage/subchainNode/index.js"

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
            this.nodeAddress = this.$route.query.id
            let data = {
                baseId:'',
                nodeAddress: this.nodeAddress,
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
            subchainNodeList(data).then(res => {
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