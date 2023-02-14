<template>
    <div class="app-container">
        <div class="title">
            跨链通道管理
            <el-button type="primary" style="float:right" @click="dialogVisible = true">创建跨链通道</el-button>
        </div>
        <el-row class="searchConditionBycontent1">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="通道名称" prop="channelName">
                            <el-input placeholder="请输入" v-model="queryParams.channelName"></el-input>
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
                <el-table-column label="通道名称" prop="name" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="通道ID" prop="id" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约地址" prop="contractAddress" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约创建者地址" prop="creator" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" prop="blockSize" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span class="lw" style="margin:0 5px" @click="toMember(scope.row.id)">成员</span>
                        <span class="lw" style="margin:0 5px" @click="toTrading(scope.row.id)">交易查询</span>
                    </template>
                </el-table-column>
                <el-table-column label="业务类型" prop="businessType" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <el-dialog title="创建跨链通道" top="20vh" width="40%" :visible.sync="dialogVisible" :before-close="handleClose"
            show-close :append-to-body="true">
            <el-form :model="chainCrossForm" :rules="chainCrossFormRules" class="labelWidth120" ref="chainCrossForm">
                <el-form-item label="通道名称" prop="channelName">
                    <el-input placeholder="请输入通道名称" v-model="chainCrossForm.channelName"></el-input>
                </el-form-item>
                <el-form-item label="成员名称" prop="comment">
                    <el-input placeholder="请输入成员名称" v-model="chainCrossForm.comment"></el-input>
                </el-form-item>
                <el-form-item label="数据获取URL" prop="urlToGetData">
                    <el-input placeholder="请输入数据获取URL" v-model="chainCrossForm.urlToGetData"></el-input>
                </el-form-item>
                <el-form-item label="业务类型" prop="businessType">
                    <el-input placeholder="请输入业务类型，如电商、税务等" v-model="chainCrossForm.businessType"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialogFooter">
                <el-button type="" @click="handleClose">取消</el-button>
                <el-button type="primary" @click="confirm">创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { chainCrossList, creatChainCross } from '@/api/corssChain/index.js'
const temp = {
    channelName: '',
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
                channelName: [
                    { max: 19, message: "长度最大19位", trigger: "blur", }
                ],
            },
            dialogVisible: false,
            chainCrossForm: {
                businessType: '',
                comment: '',
                channelName: '',
                urlToGetData: '',
            },
            chainCrossFormRules: {
                businessType: [
                    { required: true, message: "请输入业务类型", trigger: "blur", }
                ],
                comment: [
                    { required: true, message: "请输入成员名称", trigger: "blur", }
                ],
                channelName: [
                    { required: true, message: "请输入通道名称", trigger: "blur", }
                ],
                urlToGetData: [
                    { required: true, message: "请输入数据获取URL", trigger: "blur", }
                ],
            }
        };
    },

    mounted() {
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
            chainCrossList(this.queryParams).then(res => {
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
        handleClose() {
            this.$refs.chainCrossForm.clearValidate()
            this.$refs.chainCrossForm.resetFields()
            this.dialogVisible = false
        },
        confirm() {
            this.$refs.chainCrossForm.validate((valid) => {
                if (valid) {
                    creatChainCross(this.chainCrossForm).then(res => {
                        if (res.code == 200) {
                            this.dialogVisible = false
                            this.getList()
                        }
                    })
                }
            })
        },
        toMember(id) {
            this.$router.push({
                path: '/corssChainManage/members',
                query: {
                    id
                }
            })
        },
        toTrading(id) {
            this.$router.push({
                path: '/corssChainManage/trading',
                query: {
                    id
                }
            })
        },
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

.labelWidth120 {
    ::v-deep.el-form-item__label {
        width: 120px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 120px;
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
</style>
