<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter">骨干链状态管理</span>
        </div>
        <el-row class="searchCondition">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="区块高度" prop="blockHeight">
                            <el-input placeholder="请输入" v-model="queryParams.blockHeight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="节点总数"  prop="totalNodeCount">
                            <el-input placeholder="请输入" v-model="queryParams.totalNodeCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="系统合约数"  prop="systemContractCount">
                            <el-input placeholder="请输入" v-model="queryParams.systemContractCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="交易总数" prop="txNumber">
                            <el-input placeholder="请输入" v-model="queryParams.txNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总账户数"  prop="accountCount">
                            <el-input placeholder="请输入" v-model="queryParams.accountCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="时间">
                            <el-date-picker v-model="queryParams.timeRange" type="datetimerange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" @change="chooseTime"
                                value-format="yyyy-MM-dd HH:mm:ss" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" @row-dblclick="chooseRow" height="60vh"
                :row-style="{ 'height': '40px' }" ref="tableList">
                <el-table-column label="blodld" prop="blobId" :show-overflow-tooltip="true">
                   <template slot-scope="scope">
                       {{scope.row.blobId?scope.row.blobId:0}}
                   </template>
                </el-table-column>
                <el-table-column label="区块高度" prop="blockHeight" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="参与共识的节点数" prop="validationNodeCount" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="节点总数" prop="totalNodeCount" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="普通合约数" prop="normalContractCount" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="业务节点数" prop="serviceNodeCount" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="总交易数" prop="txNumber" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="总账户数" prop="accountCount" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="平均TPS" prop="tps" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="上链时间" prop="syncTime" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <el-dialog title="详情" top="20vh" width="40%" :visible.sync="dialogVisible" :before-close="handleClose"
            show-close :append-to-body="true">
            <div class="detailContent">
                {{ detailContent }}
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { chainStatusList, chainStatusDetial } from "@/api/business/business.js"
const temp = {
    blockHeight: '',
    totalNodeCount: '',
    systemContractCount: '',
    txNumber: '',
    accountCount: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    timeRange: '',

}
export default {
    name: "Job",
    data() {
          const equalToNumber= (rule, value, callback) => {
      if (/[^\d]/g
        .test(value)) {
        callback(new Error('只能输入数字'));
      } else {
        callback();
      }
    };
        return {
            // 遮罩层
            loading: true,
            tableList: [],
            total: 0,
            queryParams: Object.assign({}, temp),
            loading: false,
            dialogVisible: false,
            detailContent: {
            },
            timeInter: null,
            formRules:{
                blockHeight:[
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                     { validator: equalToNumber, trigger: "blur" },
                ],
                totalNodeCount:[
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                     { validator: equalToNumber, trigger: "blur" },
                ],
                systemContractCount:[
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                     { validator: equalToNumber, trigger: "blur" },
                ],
                txNumber:[
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                     { validator: equalToNumber, trigger: "blur" },
                ],
                accountCount:[
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                     { validator: equalToNumber, trigger: "blur" },
                ],
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
        //重置表单
        reset() {
            this.queryParams = Object.assign({}, temp)
            this.$refs.form.clearValidate()
            this.getList()
        },
        //获取数据
        getList() {
            this.loading = true;
            chainStatusList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.data.list
                    this.total = res.data.total
                }
            })
        },
        chooseTime(e) {
            if (e == null) {
                this.queryParams.startTime = ''
                this.queryParams.endTime = ''
            } else {
                this.queryParams.startTime = e[0]
                this.queryParams.endTime = e[1]
            }
        },
        search() {
            this.$refs.form.validate((valid) => {
            if (valid) {
             this.getList()
            }
          })
        },
        chooseRow(row) {
            this.dialogVisible = true
            let param = {
                apiKey: row.apiKey
            }
            chainStatusDetial(param).then(res => {
                if (res.code == 200) {
                    this.detailContent = res.data
                    this.dialogVisible = true
                }
            })
        },
        handleClose() {
            this.dialogVisible = false
        }
    }
};
</script>
<style scoped lang="scss">
    .labelWidth110{
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}
</style>