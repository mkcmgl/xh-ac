<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter">骨干链区块管理</span>
        </div>
        <el-row class="searchCondition">
            <el-form label-position="right"  class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="区块高度" prop="blockHeight">
                            <el-input placeholder="请输入" v-model="queryParams.blockHeight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="出块节点名称" prop="outNodeName">
                            <el-input placeholder="请输入" v-model="queryParams.outNodeName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="区块大小" prop="blockSize">
                            <el-input placeholder="请输入" v-model="queryParams.blockSize"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="时间">
                            <el-date-picker v-model="queryParams.TimeRanges" type="datetimerange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" @change="chooseTime"
                                value-format="yyyy-MM-dd HH:mm:ss" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" @row-dblclick="chooseRow" ref="tableList">
                <el-table-column label="blodld" prop="blobId" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.blobId ? scope.row.blobId : 0 }}
                    </template>
                </el-table-column>
                <el-table-column label="区块高度" prop="blockHeight" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="出块节点地址区块" prop="outNodeAddress" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="出块节点名称" prop="outNodeName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="交易数量" prop="txNumber" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="区块大小" prop="blockSize" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="区块哈希" prop="blockHash" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="时间" prop="syncTime" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <el-dialog title="详情" top="20vh" width="40%" :visible.sync="dialogVisible" :before-close="handleClose"
            show-close :append-to-body="true">
            <div class="detailContent">
                {{  detailContent  }}
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { chainBlockList, chainBlockDetail } from "@/api/business/business.js"
const temp = {
    blockHeight: '',
    outNodeName: '',
    blockSize: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    TimeRanges: ''
}
export default {
    name: "Job",
    data() {
        const equalToNumber = (rule, value, callback) => {
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
            formRules: {
                blockHeight: [{
                    max: 19,
                    message: "长度最大19位",
                    trigger: "blur",

                },
                { validator: equalToNumber, trigger: "blur" },],
                outNodeName: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }],
                blockSize: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                },
                { validator: equalToNumber, trigger: "blur" },],
            },
            value1: '',
            loading: false,
            detailShow: false,
            dialogVisible: false,
            detailContent: null

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
            this.$refs.form.clearValidate()
            this.queryParams = Object.assign({}, temp)
            this.getList()
        },
        //获取数据
        getList() {
            this.loading = true;
            chainBlockList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.data.list
                    this.total = res.data.total
                }
            })

        },
        //时间范围
        chooseTime(e) {
            //清空时间的时候e为null
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

            let param = {
                blockHash: row.blockHash
            }
            chainBlockDetail(param).then(res => {
                this.detailContent = res.data
                this.dialogVisible = true
            })
        },
        handleClose() {
            this.dialogVisible = false
            this.detailContent = null
        }
    }
};
</script>
<style scoped lang="scss">
    
.labelWidth100{
    ::v-deep.el-form-item__label {
        width: 100px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 100px;
    }
}
</style>