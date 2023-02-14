<template>
    <div class="app-container">
        <el-row>
            <el-col :span="10">
                <div class="title">子链用户管理</div>
            </el-col>
        </el-row>
        <el-row class="searchCondition">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="账号" prop="applyId">
                            <el-input placeholder="请输入" v-model="queryParams.applyId"
                                @input="clearSpecial($event, queryParams, 'applyId')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="用户类型">
                            <el-select v-model="queryParams.authType" placeholder="请选择" style="width:100%"
                                :clearable="true" :filterable="true">
                                <el-option v-for="item in authType" :key="item.value" :label="item.text"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="真实姓名" prop="realName">
                            <el-input placeholder="请输入" v-model="queryParams.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="机构名称" prop="org">
                            <el-input placeholder="请输入" v-model="queryParams.org"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="时间" :offset="0.5">
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
            <el-table :data="tableList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList">
                <el-table-column label="账号" prop="applyId" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="用户BID" prop="did" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="用户类型" prop="authType" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.authType == 102 ? '企业用户' : '个人用户' }}
                    </template>
                </el-table-column>
                <el-table-column label="真实姓名/机构名称" prop="txNumber" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.authType == 102 ? scope.row.org : scope.row.realName }}
                    </template>
                </el-table-column>
                <el-table-column label="联系电话" prop="phonenumber" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="注册时间" prop="applyTime" :show-overflow-tooltip="true">
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
import { resetForm } from "../../../utils/ruoyi";
import { subchainUserList } from "@/api/subChainManage/subChainUser/index.js"
import { minxData } from '../../minxData/minxData'
const temp = {
    baseId: '',
    applyId: '',
    authType: '',
    realName: '',
    org: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: "Job",
    mixins: [minxData],
    computed: {
        ...mapState({
            userInfo: state => state.user.user,
            subchainDetail: state => state.user.subchainDetail,
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
        const equalToNumber = (rule, value, callback) => {
            if (/[^\d]/g
                .test(value)) {
                callback(new Error('只能输入数字'));
            } else {
                callback();
            }
        };
        return {
            loading: true,
            tableList: [],
            queryParams: Object.assign({}, temp),
            loading: false,
            total: 0,
            formRules: {
                applyId: [{
                    max: 18,
                    message: "长度最大18位",
                    trigger: "blur",
                }, { validator: equalToNumber, trigger: "blur" },
                { validator: equalToEmpty, trigger: "blur" }],
                realName: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }, { validator: equalToEmpty, trigger: "blur" }],
                org: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }, { validator: equalToEmpty, trigger: "blur" }],
            },
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
        chooseTime(e) {
            if (e == null) {
                this.queryParams.startTime = ''
                this.queryParams.endTime = ''
            } else {
                this.queryParams.startTime = e[0]
                this.queryParams.endTime = e[1]
            }
        },
        //获取全部子链用户
        getList() {
            this.loading = true;
            //全部子链用户
            if(this.subchainDetail){
                this.queryParams.baseId=this.subchainDetail.subchainId
            }
            subchainUserList(this.queryParams).then(res => {
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
        clearSpecial(e, form, text) {
            form[text] = e.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        }
    },
}
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