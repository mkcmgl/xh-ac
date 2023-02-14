<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter">骨干链合约管理</span>
        </div>
        <el-row class="searchCondition">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="合约名称" prop="contractName">
                            <el-input placeholder="请输入" v-model="queryParams.contractName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属行业">
                            <el-select v-model="queryParams.industry" placeholder="请选择" style="width:100%"
                                :clearable="true" :filterable="true">
                                <el-option v-for="item in industryTypeList" :key="item.value" :label="item.lable"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合约类型">
                            <el-select v-model="queryParams.contractType" placeholder="请选择" style="width:100%"
                                :clearable="true" :filterable="true">
                                <el-option v-for="item in contractTypeList" :key="item.value" :label="item.lable"
                                    :value="item.value">
                                </el-option>
                            </el-select>
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
            <el-table :data="tableList" v-loading="loading" @row-dblclick="chooseRow" height="60vh"
                :row-style="{ 'height': '40px' }">
                <el-table-column label="blodld" prop="blodId" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.blobId ? scope.row.blobId : 0 }}
                    </template>
                </el-table-column>
                <el-table-column label="合约名称" prop="contractName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约拥有人bid" prop="ownerAddress" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约类型" prop="contractType" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="所属行业" prop="industry" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约引擎" prop="contractEngine" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约版本" prop="contractVersion" :show-overflow-tooltip="true"></el-table-column>
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
                {{  detailContent  }}
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { chainContractList, chainContractDetail } from "@/api/business/business.js"
const temp = {
    contractName: '',
    industry: '',
    contractType: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    TimeRanges: ''
}
export default {
    name: "Job",
    data() {
        return {
            // 遮罩层
            loading: true,
            tableList: [],
            total: 0,
            queryParams: Object.assign({}, temp),
            formRules: {
                contractName: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }],
            },
            value1: '',
            loading: false,
            detailShow: false,
            dialogVisible: false,
            detailContent: null,
            contractTypeList: [
                {
                    lable: '普通合约',
                    value: '0'
                },
                {
                    lable: '主子链管理系统合约',
                    value: '1'
                },
                {
                    lable: 'DPOS系统合约',
                    value: '2'
                },
                {
                    lable: '部署系统合约',
                    value: '3'
                }, {
                    lable: '认证系统合约',
                    value: '4'
                }
                , {
                    lable: '隐私保护系统合约',
                    value: '5'
                },
                {
                    lable: '跨链系统合约',
                    value: '6'
                },
                {
                    lable: 'BID注册合约',
                    value: '7'
                }
            ],
            industryTypeList: [
                { lable: '农、林、牧、渔业', value: 'A' },
                { lable: '采矿业', value: 'B' },
                { lable: '制造业', value: 'C' },
                { lable: '电力、热力、燃气及水生产和供应业', value: 'D' },
                { lable: '建筑业', value: 'E' },
                { lable: '批发和零售业', value: 'F' },
                { lable: '交通运输、仓储和邮政业', value: 'G' },
                { lable: '住宿和餐饮业住宿和餐饮业', value: 'H' },
                { lable: '信息传输、软件和信息技术服务业', value: 'I' },
                { lable: '金融业', value: 'J' },
                { lable: '房地产业', value: 'K' },
                { lable: '租赁和商务服务业', value: 'L' },
                { lable: '科学研究和技术服务业', value: 'M' },
                { lable: '水利、环境和公共设施管理业', value: 'N' },
                { lable: '居民服务、修理和其他服务业', value: 'O' },
                { lable: '教育', value: 'P' },
                { lable: '卫生和社会工作', value: 'Q' },
                { lable: '文化、体育和娱乐业', value: 'R' },
                { lable: '公共管理、社会保障和社会组织', value: 'S' },
                { lable: '国际组织', value: 'Y' },
            ]
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
            chainContractList(this.queryParams).then(res => {
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
            let param = {
                contractAddress: row.contractAddress
            }
            chainContractDetail(param).then(res => {
                if (res.code == 200) {
                    this.detailContent = res.data
                    this.dialogVisible = true
                }
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