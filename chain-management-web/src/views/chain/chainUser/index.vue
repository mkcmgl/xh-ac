<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter">骨干链用户管理</span>
        </div>
        <el-row class="searchCondition">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="账号" prop="userId">
                            <el-input placeholder="请输入" v-model="queryParams.userId" @input="clearSpecial($event, queryParams, 'userId')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="用户类型">
                            <el-select v-model="queryParams.authType" placeholder="请选择" style="width:100%" :clearable="true" :filterable="true">
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
            <el-table :data="tableList" v-loading="loading" @row-dblclick="chooseRow">
                <el-table-column label="账号" prop="userId" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="用户BID" prop="did" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="用户类型" prop="authType" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                        <span v-if="scope.row.authType == 101"> 个人用户</span>
                        <span v-if="scope.row.authType == 102"> 企业用户</span>
                    </template>
                </el-table-column>
                <el-table-column label="真实姓名/机构名称" prop="realName" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authType == 101"> {{ scope.row.realName }}</span>
                        <span v-if="scope.row.authType == 102"> {{ scope.row.org }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="认证状态" prop="authStatus" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authStatus == 0 || !scope.row.authStatus">未认证</span>
                        <span v-if="scope.row.authStatus == 1">已认证</span>
                        <span v-if="scope.row.authStatus == 2">认证中</span>
                        <span v-if="scope.row.authStatus == 3">认证未通过</span>
                    </template>

                </el-table-column>
                <el-table-column label="注册时间" prop="createTime" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
    </div>
</template>

<script>
import { chainUserList, chainUserDetail } from "@/api/business/business.js"
const temp = {
    userId: '',
    authType: '',
    realName: '',
    org:'',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    TimeRanges: ''
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
            formRules: {
                userId: [{
                    max: 18,
                    message: "长度最大18位",
                    trigger: "blur",
                },{ validator: equalToNumber, trigger: "blur" }],
                realName: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }],
                org: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }],
            },
            value1: '',
            loading: false,
            detailShow: false,
            authType:[
                {text:'企业用户',value:102},
                {text:'个人用户',value:101}
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
            chainUserList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total
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
            this.$router.push({
                path: '/chain/chainUserDetail',
                query: {
                    data: row.userId
                }
            })
        },
        //清除特殊字符
        clearSpecial(e, form, text) {
            form[text] = e.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";
.labelWidth100{
    ::v-deep.el-form-item__label {
        width: 100px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 100px;
    }
}
</style>