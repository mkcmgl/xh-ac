<template>
    <div class="app-container">
        <el-button type="primary" style="float:right" @click="toAdd">新增</el-button>
        <div class="title">
            <div>
                BID标识模板
            </div>
        </div>
        <el-row class="searchCondition1">
            <el-form label-position="right" label-width="110px" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="模板名称" prop="templateName">
                            <el-input placeholder="请输入" v-model="queryParams.templateName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset" size="small">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg1">
            <el-table :data="tableList" v-loading="loading" @row-dblclick="chooseRow" ref="tableList">
                <el-table-column label="编号" prop="templateNo" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="模板名称" prop="templateName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" :show-overflow-tooltip="true">
                   <template slot-scope="scope">
                      <span class="lw" @click="toDetail(scope.row)">详情</span>
                   </template>
                </el-table-column>
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
import { templateList } from "@/api/business/business.js"
const temp = {
    templateName:'',
    pageSize: 10,
    pageNum: 1,
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
                templateName: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",

                },
                ],
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
            templateList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total
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
        },
        toDetail(data){
             this.$store.dispatch('identity/settemplateDetail',data)
            this.$router.push(
                {
                    path:'/identity/indentityTemplateDetail',
                    
                }
            )
        },
        toAdd(){
            this.$router.push(
                {
                    path:'/identity/indentityTemplateAdd'
                }
            )
        }
    }
};
</script>
<style scoped lang="scss">
</style>