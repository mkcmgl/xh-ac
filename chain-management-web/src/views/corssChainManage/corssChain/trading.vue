<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">跨链通道管理</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">交易查询</span>
        </div>
        <el-row class="searchConditionBycontent1">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="交易ID" prop="businessId">
                            <el-input placeholder="请输入交易ID" v-model="queryParams.businessId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" ref="tableList">
                <el-table-column label="交易ID" prop="businessId" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="交易方名称" prop="userName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="发生时间" prop="eventTime" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="总交易数据" prop="totalTxs" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span @click="toEvents(scope.row.businessId)" class="lw">{{scope.row.totalTxs}}</span>
                    </template>
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
import { getChainCrossTradingList } from '@/api/corssChain/index.js'
const temp = {
    businessId:'',
    channelId: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: 'corssChain',

    data() {
        return {
            queryParams: Object.assign({}, temp),
            // 遮罩层
            loading: true,
            tableList: [],
            total: 0,
            formRules: {
                business_id: [{
                    max: 19,
                    message: "长度最大19位",
                    trigger: "blur",

                },
                ],
            },
            dialogVisible: false,
            channelId:''
        };
    },

    mounted() {
        this.channelId = this.$route.query.id
        this.getList()
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
            this.loading = false;
            this.queryParams.channelId = this.$route.query.id
            getChainCrossTradingList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total
                }
            })
        },
        search() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.getList()
                }
            })
        },
        toLast() {
            this.$router.go(-1)
        },
        toEvents(businessId){
            this.$router.push({
                path:'/corssChainManage/events',
                query:{
                    id:this.channelId,
                    businessId,
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.labelWidth100 {
    ::v-deep.el-form-item__label {
        width: 100px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 100px;
    }
}

.searchConditionBycontent1 {
    width: 100%;
    background: #ffffff;
    padding-top: 40px;
    margin-top: 10px;
}

.dialogFooter {
    display: flex;
    justify-content: right;
}

.dialogFooter {
    display: flex;
    justify-content: right;
}
</style>
