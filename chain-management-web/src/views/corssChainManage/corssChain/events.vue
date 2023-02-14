<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">跨链通道管理</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">交易事件</span>
        </div>
        <el-row class="searchConditionBycontent1">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="创建者名称" prop="operator">
                            <el-input placeholder="请输入创建者名称" v-model="queryParams.operator"></el-input>
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
                <el-table-column label="创建者名称" prop="operator" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="发生时间" prop="eventTime" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="业务数据hash" prop="dataHash" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="子链交易hash" prop="txHashOnSubChain">
                </el-table-column>
                <el-table-column label="主链交易hash" prop="txHashOfMain">
                    <template slot-scope="scope">
                        <span>{{ scope.row.txHashOfMain }}</span><span class="lw"
                            @click="auth(scope.row.txHashOfMain)">校验</span>
                    </template></el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <el-dialog :visible="centerDialogVisible" width="30%" center close-on-click-modal :before-close="closeDialog">
            <div class="flex-box">
                <i :class="authResult ? 'el-icon-success' : 'el-icon-error'"></i>
                <span class="msg">{{ authResult?'校验通过': '校验失败' }}</span>
            </div>
            <el-form :model="checkResult" ref="checkResult" class="labelWidth150" disabled>
                <el-form-item label="原始业务数据：" prop="desc">
                    <el-input type="textarea" v-model="checkResult.originData"></el-input>
                </el-form-item>
                <el-form-item label="原始业务数据hash：" prop="name">
                    <el-input v-model="checkResult.originDataHash"></el-input>
                </el-form-item>
                <el-form-item label="主链业务数据hash：" prop="name">
                    <el-input v-model="checkResult.dataHash"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { testChainCrossEvents, getChainCrossEventsList } from '@/api/corssChain/index.js'
const temp = {
    channelId: '',
    pageSize: 10,
    pageNum: 1,
    operator: '',
    businessId: ''
}
export default {
    name: 'corssChain',

    data() {
        return {
            authResult: false,
            centerDialogVisible: false,
            checkResult: {
                originData: '',
                originDataHash: '',
                dataHash: '',
            },
            queryParams: Object.assign({}, temp),
            // 遮罩层
            loading: true,
            tableList: [
                {

                }
            ],
            total: 0,
            formRules: {
                operator: [{
                    max: 19,
                    message: "长度最大19位",
                    trigger: "blur",
                },
                ],
            },
            dialogVisible: false,
            chainCrossForm: {
                comment: '',
                memberNickname: '',
                urlToGetData: '',
            },
            chainCrossFormRules: {
                comment: [
                    { message: "请输入备注", trigger: "blur", }
                ],
                memberNickname: [
                    { required: true, message: "请输入系统内用户昵称", trigger: "blur", }
                ],
                urlToGetData: [
                    { required: true, message: "请输入数据获取URL", trigger: "blur", }
                ],
            },
            channelId: ''
        };
    },

    mounted() {
        this.getList()
        this.channelId = this.$route.query.id
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
            this.queryParams.businessId = this.$route.query.businessId
            getChainCrossEventsList(this.queryParams).then(res => {
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
            this.$refs.form.chainCrossForm((valid) => {
                if (valid) {
                    addMember().then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogVisible = false
                            this.getList()
                        }
                    })
                }
            })
        },
        toLast() {
            this.$router.go(-1)
        },
        closeDialog() {
            this.centerDialogVisible = false;
        },
        auth(e) {
            let params = {
                txHashOfMain: e,
                channelId: this.channelId
            }
            testChainCrossEvents(params).then(res => {
                if (res.code == 200) {
                    res.data && (this.checkResult = res.data);
                    let str = this.checkResult.dataHash
                    let str1 = this.checkResult.originDataHash
                    if (str == str1) {
                        this.authResult = true
                    }else{
                        this.authResult = false
                    }
                    this.centerDialogVisible = true;
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
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

.labelWidth150 {
    ::v-deep.el-form-item__label {
        width: 150px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 150px;
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

.flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.msg {
    font-size: 14px;
    margin-left: 14px;
}

::v-deep.el-icon-success {
    color: #28c469;
    font-size: 40px;
}

::v-deep.el-icon-error {
    color: rgb(236, 65, 65);
    font-size: 40px;
}
</style>
