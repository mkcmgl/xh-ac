<template>
    <div class="app-container">
        <el-row>
            <el-col :span="10">
                <div class="title">监管处置列表</div>
            </el-col>
        </el-row>
        <el-row class="searchConditionBycontent">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="8" >
                        <el-form-item label="违规类型" prop="type">
                            <el-select v-model="queryParams.type" placeholder="请选择违规类型" :clearable="true" style="width:100%">
                              <el-option label="违禁词" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="处理状态" prop="stastus" >
                            <el-select v-model="queryParams.stastus" placeholder="请选择处理状态" :clearable="true" style="width:100%">
                              <el-option label="已处理" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList" @selection-change="handleSelectionChange">
                <el-table-column label="违规类型" prop="banword" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                           {{scope.row.type=='0'?'违禁词':'--'}}
                    </template>
                </el-table-column>
                <el-table-column label="违规主体BID" prop="did" :show-overflow-tooltip="true" align="center">
                </el-table-column>
                <el-table-column label="处理状态" prop="time" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                           {{scope.row.status=='1'?'已处理':'未处理'}}
                    </template>
                </el-table-column>
                <el-table-column label="处理时间" prop="createTime" :show-overflow-tooltip="true" align="center">
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
import { resetForm } from "../../utils/ruoyi";
import { minxData } from '../minxData/minxData'
import { handleList } from '@/api/banword/index.js'
const temp = {
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: "Job",
    mixins: [minxData],
    computed: {
        ...mapState({
            userInfo: state => state.user.user,
        })
    },
    data() {
        //验证全是空格
        const equalToEmpty = (rule, value, callback) => {
            if (/^\s+$/gi
                .test(value)) {
                callback(new Error('不能全输入空格'));
            } else {
                callback();
            }
        };
        return {
            loading: true,
            tableList: [],
            queryParams: Object.assign({}, temp),
            loading: false,
            formRules: {
                word: [
                    { max: 200, message: "违禁词长度最大200", trigger: "blur" },
                    { validator: equalToEmpty, trigger: "blur" }
                ],
            },
            total: 0,
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
        getList() {
            handleList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.$nextTick(() => {
                        this.tableList = res.rows
                        this.total = res.total
                    })

                }
            }).catch(err => {
                this.loading = false
            })
        },
        del(e) {
            this.delShow = true
        },
        handleSelectionChange(e) {
        },
        delClose() {
            this.delShow = false
        },
        agree() {
            this.$message({
                message: '删除成功',
                type: 'success'
            })
            this.delShow = false
            this.getList()
        },
        add() {
            this.addShow = true
        },
        addClose() {
            this.addShow = false
        },
        addConfirm() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    })
                    this.addShow = false
                    this.addForm.bandWord = ''
                }
            })

        }
    },

}
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
    .el-dialog__header {
        padding-top: 35px;
    }

    .el-dialog__body {
        margin: 0;
        padding: 0 25px 25px 25px;
    }
}

.serviceStatus {
    height: 50px;
    margin: 20px auto;
    border: 1px solid rgb(188, 233, 210);
    background-color: rgb(244, 251, 247);
    line-height: 50px;
}

.serviceStatusIcon {
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 28px;
}

.serviceStatusWord {
    height: 100%;
    line-height: 50px;
    text-align: left;
    font-size: 18px;
    font-family: '微软雅黑';
}

.searchWarp {
    width: 30%;
    margin-left: 35%;
}

.notice {
    margin: 0;
}
.labelWidth110{
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}
</style>