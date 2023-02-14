<template>
    <div class="app-container">
        <el-button type="primary" style="float:right" @click="toAdd">新增</el-button>
        <div class="title">
            <div>
                接入服务
            </div>
        </div>
        <el-row class="searchCondition1">
            <el-form label-position="right" label-width="110px" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="服务名称" prop="serviceName">
                            <el-input placeholder="请输入服务名称" v-model="queryParams.serviceName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="服务分类" prop="typeId">
                            <el-select v-model="queryParams.typeId" placeholder="请选择服务类别" :clearable="true"
                                :filterable="true">
                                <el-option v-for="(item, index) in typeList" :key="index" :label="item.lable"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset" size="small">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg1">
            <el-table :data="tableList" v-loading="loading" ref="tableList" min-height="550px"
                :row-style="{ height: '40px' }">
                <el-table-column label="服务名称" prop="serviceName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="服务分类" prop="typeName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="申请时间" prop="applyDate" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="审核时间" prop="reviewDate" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="审核状态"  :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                            {{
                            scope.row.reviewStatus
                            == 0 ? '待审核' : scope.row.reviewStatus
                            == 1 ? '审核通过' : '审核驳回'
                            }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span class="toOther mr10" @click="toDetail(scope.row)">详情</span>
                        <span class="toOther" v-if="scope.row.reviewStatus==2" aria-disabled="true" @click="toEdit(scope.row)">编辑</span>
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
// import { showServiceStatusList } from "@/api/mineService/mineService.js"
import { serviceAddList } from "@/api/access/access.js"
import { changeTypeName } from '@/utils/public.js'
const temp = {
    serviceName: '',
    typeId: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: "requestList",
    data() {
        return {
            // 遮罩层
            loading: true,
            tableList: [],
            total: 0,
            queryParams: Object.assign({}, temp),
            formRules: {
                serviceName: [{
                    max: 100,
                    message: "长度最大100位",
                    trigger: "blur",
                }
                ],
            },
            value1: '',
            loading: false,
            detailShow: false,
            dialogVisible: false,
            detailContent: null,
            typeList: [
                { lable: '数字化资产', value: '1' },
                { lable: '供应链管理', value: '2' },
                { lable: '供应链金融', value: '3' },
                { lable: '电子政务', value: '4' },
                { lable: '防伪朔源', value: '5' },
                { lable: '采购招标', value: '6' },
                { lable: '公益慈善', value: '7' },
                { lable: '版权保护', value: '8' },
                { lable: '电子存证', value: '9' },
                { lable: '工具', value: '10' },
                { lable: '医疗健康', value: '11' },
                { lable: '其他', value: '12' },
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
    watch: {
        tableList: function (val) {
            val?.map(item => {
                let name = changeTypeName(item)
                this.$set(item, 'typeName', name)
            })
        }
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
            serviceAddList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total? res.total:0
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
            this.dialogVisible = false
            this.detailContent = null
        },
        toDetail(item) {
            this.$router.push({
                path: '/requestService/detail',
                query: {
                    data: item.serviceId
                }
            })
        },
        toAdd() {
            this.$router.push(
                {
                    path: '/requestService/addService',
                }
            )
        },
        toEdit(item) {
            this.$router.push({
                path: '/requestService/addService',
                query: {
                    data: item.serviceId
                }
            })
        },
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";
</style>