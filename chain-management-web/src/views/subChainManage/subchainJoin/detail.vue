<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">加入子链</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">子链信息</h3>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">链名称</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.chainName ? subBaseInfo.chainName : '无' }}
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">AC号</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.chainCode ? subBaseInfo.chainCode : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="3">
                    <span class="formTitle">所属企业</span>
                </el-col>
                <el-col :span="9">
                    {{ subBaseInfo.enteprise ? subBaseInfo.enteprise : '无' }}
                </el-col>
                <!-- <el-col :span="3">
                    <span class="formTitle">所属行业</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ subBaseInfo.industry ? subBaseInfo.industry : '无' }}
                    </span>
                </el-col> -->
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">实时概况</h3>
            <el-row class="mt10">
                <el-col :span="4">
                    <el-image :src="runStatusUrl" class="picM mr5"></el-image>
                    <span class="formContent">运行状态</span>
                </el-col>
                <el-col :span="4">
                    <el-image :src="conNumUrl" class="picM mr5"></el-image>
                    <span class="formContent">共识/全部节点数</span>
                </el-col>
                <el-col :span="4">
                    <el-image :src="blockHeightUrl" class="picM mr5"></el-image>
                    <span class="formContent">区块高度</span>
                </el-col>
                <el-col :span="4">
                    <el-image :src="saleTotalUrl" class="picM mr5"></el-image>
                    <span class="formContent">总交易数</span>
                </el-col>
                <el-col :span="4">
                    <el-image :src="contractNumUrl" class="picM mr5"></el-image>
                    <span class="formContent">系统合约数</span>
                </el-col>
                <el-col :span="4">
                    <el-image :src="accountNumUrl" class="picM mr5"></el-image>
                    <span class="formContent">总账户数</span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-row>
                    <el-col :span="4">
                        <span class="realTimeInfo">
                            {{ subBaseInfo.runStatus ? subBaseInfo.runStatus : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <span class="realTimeInfo">
                            {{ `${subBaseInfo.validationNodeCount?subBaseInfo.validationNodeCount:'无'}/${subBaseInfo.totalNodeCount?subBaseInfo.totalNodeCount:'无'}` }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <span class="realTimeInfo">
                            {{ subBaseInfo.blockHeight ? subBaseInfo.blockHeight : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <span class="realTimeInfo">
                            {{ subBaseInfo.txNumber ? subBaseInfo.txNumber : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <span class="realTimeInfo">
                            {{ subBaseInfo.systemContractCount ? subBaseInfo.systemContractCount : '无' }}
                        </span>
                    </el-col>
                    <el-col :span="4">
                        <span class="realTimeInfo">
                            {{ subBaseInfo.accountCount ? subBaseInfo.accountCount : '无' }}
                        </span>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        <div class="auditDetail">
            <h3 class="contentTitle">每日交易发生量</h3>
            <el-row>
                <el-col :span="24"></el-col>
                <div ref="chart" style="width:100%;height:350px;position: relative;"></div>
            </el-row>
        </div>
        <el-row class="mulWarp">
            <el-col :span="12">
                <div class="auditDetail1 fl">
                    <h3 class="contentTitle">区块动态</h3>
                    <el-row>
                        <el-table :data="bolckData" v-loading="blockLoading" :row-style="{ 'height': '40px' }"
                            ref="tableList">
                            <el-table-column label="区块高度" prop="blockHeight" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column label="区块大小" prop="blockSize" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column label="区块交易数" prop="txNumber" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column label="区块创建时间" prop="syncTime" :show-overflow-tooltip="true">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="auditDetail1 fr">
                    <h3 class="contentTitle">合约动态</h3>
                    <el-row>
                        <el-table :data="contractData" v-loading="contractLoading" :row-style="{ 'height': '40px' }"
                            ref="tableList">
                            <el-table-column label="合约名称" prop="contractName" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column label="调用总数" prop="callTotalNumber" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column label="近一周调用数" prop="callRecentNumber" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column label="合约创建时间" prop="syncTime" :show-overflow-tooltip="true">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div class="auditDetail">
            <h3 class="contentTitle">节点动态</h3>
            <el-row>
                <el-table :data="nodeData" v-loading="nodeLoading" :row-style="{ 'height': '40px' }" ref="tableList">
                    <el-table-column label="节点名称" prop="nodeName" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="节点类型" prop="nodeType" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span v-if="scope.row.nodeType == 0">业务节点</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="节点所属企业" prop="enterprises" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="节点创建时间" prop="syncTime" :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { subchainBlockList } from "@/api/subChainManage/subchainBlock/index.js"
import { subchainNodeList } from "@/api/subChainManage/subchainNode/index.js"
import { subchainJoinDetailInfo, subchainJoinDetailTransaction, subchainJoinDetailContract } from "@/api/subChainManage/subChianJoin/index.js"
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
            runStatusUrl: require('@/assets/images/runStatus.png'),
            conNumUrl: require('@/assets/images/conNum.png'),
            blockHeightUrl: require('@/assets/images/blockHeight.png'),
            accountNumUrl: require('@/assets/images/accountNum.png'),
            contractNumUrl: require('@/assets/images/contractNum.png'),
            saleTotalUrl: require('@/assets/images/saleTotal.png'),
            subBaseInfo: {
                accountCount: "",
                apiKey: "",
                backboneNodeBid: "",
                blockHeight: "",
                chainCode: "",
                chainName: "",
                enteprise: "",
                gatewayNode: "",
                industry: "",
                normalContractCount: "",
                serviceNodeCount: "",
                syncTime: "",
                systemContractCount: "",
                totalNodeCount: "",
                tps: "",
                txNumber: "",
                validationNodeCount: "",
            },
            bolckData: [],
            blockLoading: false,
            contractData: [],
            contractLoading: false,
            nodeData: [],
            nodeLoading: false
        };
    },
    created() {
        if (this.$route.query.id) {
            this.subChainId = this.$route.query.id
            let data = {
                id: this.subChainId
            }
            let data1 = {
                baseId:this.subChainId,
                pageSize: 5,
                pageNum: 1,
            }
            this.fetchData(data)
            this.fetchTransaction(data)
            this.getBlockData(data1)
            this.getContarctData(data1)
            this.getNodeData(data1)
        }
    },
    methods: {
        //子链信息
        fetchData(data) {
            subchainJoinDetailInfo(data).then(res => {
                if (res.code == 200) {
                    this.subBaseInfo = res.data
                }
            })
        },
        //获取区块数据
        getBlockData(data) {
            this.blockLoading = true;
            //全部子链数据
            subchainBlockList(data).then(res => {
                if (res.code == 200) {
                    this.blockLoading = false
                    this.$nextTick(() => {
                        this.bolckData = res.data.list
                    })

                }
            }).catch(err => {
                this.blockLoading = false
            })
        },
        //获取合约数据
        getContarctData(data) {
            this.contractLoading = true;
            //全部子链数据
            subchainJoinDetailContract(data).then(res => {
                if (res.code == 200) {
                    this.contractLoading = false
                    this.$nextTick(() => {
                        this.contractData = res.data.list
                    })
                }
            }).catch(err => {
                this.contractLoading = false
            })
        },
        //获取节点数据
        getNodeData(data) {
            this.nodeLoading = true;
            //全部子链数据
            subchainNodeList(data).then(res => {
                if (res.code == 200) {
                    this.nodeLoading = false
                    this.$nextTick(() => {
                        this.nodeData = res.data.list
                    })
                }
            }).catch(err => {
                this.nodeLoading = false
            })
        },
        //每日交易量
        fetchTransaction(data) {
            let echartData = []
            let xData = []
            subchainJoinDetailTransaction(data).then(res => {
                if (res.code == 200) {
                    let dataList = res.data
                    dataList.map(item => {
                        echartData.push(item.value)
                        xData.push(item.key)
                    })
                    this.getEchartData(echartData, xData)
                }
            })
        },
        toLast() {
            this.$router.go(-1)
        },
        getEchartData(e, e1) {
            const chart = this.$refs.chart
            if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                    legend: {},
                    tooltip: {
                        name: '占比',
                        trigger: 'item',
                        formatter: '{b}  <br/> 交易量:{c}笔',
                        backgroundColor: '#FFFFFF',
                        textStyle: {
                            color: '#333333'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: e1
                    },
                    yAxis: {
                        name: '单位：笔',
                        type: 'value',
                        minInterval : 1,
                    },
                    itemStyle: {
                        normal: {

                        }
                    },
                    series: [
                        {
                            data: e,
                            type: 'line',
                            smooth: true,
                            color: "#4DB2FF",     //设定实线点的颜色
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    color: "#4DB2FF", //设置实线的颜色
                                },
                            },
                            areaStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 1,
                                                color: "#E9EEFB", // 0% 处的颜色
                                            },
                                            {
                                                offset: 0,
                                                color: "#CCECFC", // 100% 处的颜色
                                            },
                                        ],
                                    },
                                },
                            }
                        }
                    ]
                }
                myChart.setOption(option)
                window.addEventListener("resize", function () {
                    myChart.resize()
                })
            }
            this.$on('hook:destroyed', () => {
                window.removeEventListener("resize", function () {
                    myChart.resize();
                });
            })
        },
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

.mulWarp {
    margin: 10px auto;
    height: 330px;
}
</style>