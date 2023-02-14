<template>
    <div class="app-container">
        <el-row>
            <el-col :span="10">
                <div class="title">子链状态</div>
            </el-col>
        </el-row>
        <el-row class="searchCondition">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="节点总数" prop="totalNodeCount">
                            <el-input v-model="queryParams.totalNodeCount" placeholder="请输入节点总数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总交易数" prop="txNumber">
                            <el-input v-model="queryParams.txNumber" placeholder="请输入总交易数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="系统合约数" prop="systemContractCount">
                            <el-input placeholder="请输入系统合约数" v-model="queryParams.systemContractCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="总账户数" prop="accountCount">
                            <el-input placeholder="请输入总账户数" v-model="queryParams.accountCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="平均tps" :offset="0.5" prop="tps">
                            <el-input placeholder="请输入平均tps" v-model="queryParams.tps"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList">
                <el-table-column label="区块高度" prop="blockHeight" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="参与共识节点数" prop="validationNodeCount" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="节点总数" prop="totalNodeCount" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="系统合约数" prop="systemContractCount" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="普通合约数" prop="normalContractCount" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="业务节点数" prop="serviceNodeCount" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="总交易数" prop="txNumber" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="总账户数" prop="accountCount" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="平均tps" prop="tps" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="数据网关地址" prop="gatewayNode" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="同步时间" prop="syncTime" width="200" >
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { subchainStatusList } from "@/api/subChainManage/subchainStatus/index.js"
const temp = {
    baseId: '',
    totalNodeCount: '',
    txNumber: '',
    systemContractCount: '',
    accountCount: '',
    tps: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: "Job",
    computed: {
        ...mapState({
            userInfo: state => state.user.user,
            subchainDetail: state => state.user.subchainDetail,
        })
    },
    data() {
        //验证正整数
        const equalToNumber = (rule, value, callback) => {
            if (value) {
                if (!/^\+?[1-9]\d*$/
                    .test(value)) {
                    callback(new Error('请输入正整数'));
                } else {
                    callback();
                }
            }else{
                callback();
            }
        };
        return {
            loading: true,
            tableList: [],
            queryParams: Object.assign({}, temp),
            loading: false,
            dialogVisible: false,
            total:0,
            formRules: {
                totalNodeCount: [
                    { max: 20, message: "长度最大20位", trigger: "blur" },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                txNumber: [
                    { required: false,max: 20, message: "长度最大20位", trigger: "blur" },
                    {required: false, validator: equalToNumber, trigger: "blur" },
                ],
                systemContractCount: [
                    { required: false,max: 20, message: "长度最大20位", trigger: "blur" },
                    { required: false,validator: equalToNumber, trigger: "blur" },
                ],
                accountCount: [
                    { required: false,max: 20, message: "长度最大20位", trigger: "blur" },
                    { required: false,validator: equalToNumber, trigger: "blur" },
                ],
                tps: [
                    { required: false,max: 20, message: "长度最大20位", trigger: "blur" },
                    { required: false,validator: equalToNumber, trigger: "blur" },
                ]
            }
        };
    },
    created() {
        this.getList()
        //每间隔五分钟查询一次数据
        this.timeInter = setInterval(() => {
            this.getList()
        }, 1000 * 60 * 5)
    },
    destroyed() {
        //清除定时器
        clearInterval(this.timeInter)
    },
    methods: {
        search() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.getList()
                }
            })
        },
        //重置表单
        reset() {
            this.$refs.form.clearValidate()
            this.queryParams = Object.assign({}, temp)
            this.getList()
        },
        //获取全部子链数据
        getList() {
            this.loading = true;
            //全部子链数据
            if (this.subchainDetail) {
                this.queryParams.baseId = this.subchainDetail.subchainId
            }
            subchainStatusList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.$nextTick(() => {
                        this.tableList = res.data.list
                        this.total = res.data.total
                    })

                }
            }).catch(err => {
                this.loading = false
            })
        },
    },

}
</script>
<style scoped lang="scss">
.chainTitle {
    margin: 0;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 22px;
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

.withdrawcontent {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    margin: 40px 0 0 0;
}

.labelWidth110 {
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}
</style>