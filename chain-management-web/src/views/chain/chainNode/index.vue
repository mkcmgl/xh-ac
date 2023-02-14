<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter">骨干链节点管理</span>
        </div>
        <el-row class="searchCondition">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="节点名称" prop="nodeName">
                            <el-input placeholder="请输入" v-model="queryParams.nodeName" :clearable="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属企业">
                            <el-select v-model="queryParams.enterprises" placeholder="请选择" style="width:100%"
                                :clearable="true">
                                <el-option v-for="item in enterprisesList" :key="item.bid" :label="item.enterpriseName"
                                    :value="item.bid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="云类型">
                            <el-select v-model="queryParams.cloudType" placeholder="请选择" style="width:100%"
                                :clearable="true">
                                <el-option v-for="item in cloudTypeList" :key="item.value" :label="item.lable"
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
                    <el-col :span="12" :offset="0.5">
                        <el-form-item label="节点地址">
                            <el-row>
                                <el-col :span="12">
                                    <el-select v-model="province" placeholder="请选择省市" clearable @change="chooseProvince"
                                        style="width:100%" filterable>
                                        <el-option v-for="item in provinceList" :key="item.cityName"
                                            :label="item.cityName" :value="item.provinceCode">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-select v-model="queryParams.district" placeholder="请选择地市" clearable
                                        style="width:100%" filterable>
                                        <el-option v-for="item in cityList" :key="item.regionCode"
                                            :label="item.cityName" :value="item.regionCode">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>

                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="时间">
                            <el-date-picker v-model="queryParams.timeRange" type="datetimerange" range-separator="至"
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
                <el-table-column label="blodld" prop="blobId" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.blobId ? scope.row.blobId : 0 }}
                    </template>
                </el-table-column>
                <el-table-column label="节点名称" prop="nodeName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="节点bid" prop="nodeAddress" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="节点地址" prop="district" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="所属企业" prop="enterprises" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="p2p通信地址" prop="connectAddress" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="节点公网ip" prop="publicIp" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="云类型" prop="cloudType" :show-overflow-tooltip="true"></el-table-column>
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
import { chainNodeList, chainNodeDetail, getEnterprises, getRegion } from "@/api/business/business.js"
const temp = {
    nodeName: '',
    enterprises: '',
    cloudType: '',
    txNumber: '',
    district: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
    timeRange: ''
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
                nodeName: [{
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
            enterprisesList: [],
            provinceList: [],
            cityList: [],
            areaList: [],
            province: '',
            city: '',
            area: '',
            cloudTypeList: [
                { lable: '非公有云', value: '0' },
                { lable: '阿里云', value: '1' },
                { lable: '百度云', value: '2' },
                { lable: '金山云', value: '3' },
                { lable: '华为云', value: '4' },
                { lable: '亚马逊云', value: '5' },
                { lable: '微软云', value: '6' },
                { lable: '腾讯云', value: '7' },
                { lable: '京东云', value: '8' },
                { lable: '物理机', value: '9' },
                { lable: '其他云', value: '100' },
            ]
        };
    },
    created() {
        this.getList()
        this.getEnterpriseslList()
        this.getAddressList()
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
            this.province = ''
            this.getList()
        },
        //获取数据
        getList() {
            this.loading = true;
            chainNodeList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.data.list
                    this.total = res.data.total
                }
            })
        },
        //获取企业列表
        getEnterpriseslList() {
            getEnterprises().then(res => {
                this.enterprisesList = res.data
            })
        },
        //获取地区列表
        getAddressList(e) {
            let param = {
                code: e ? e : '-1'
            }
            getRegion(param).then(res => {
                this.provinceList = res.data
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
                    if (this.province) {
                        let flag = this.queryParams.district
                        if (!flag) {
                            this.$message({
                                message: '请选择地市',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    this.getList()
                }
            })
        },
        chooseRow(row) {
            let param = {
                nodeAddress: row.nodeAddress
            }
            chainNodeDetail(param).then(res => {
                this.detailContent = res.data
                this.dialogVisible = true
            })
        },
        handleClose() {
            this.dialogVisible = false
            this.detailContent = null
        },
        chooseProvince(e) {
            if (e) {
                let param = {
                    code: e
                }
                this.cityList = []
                this.queryParams.district = ''
                getRegion(param).then(res => {
                    this.cityList = res.data
                })
            } else {
                this.cityList = []
                this.queryParams.district = ''
            }

        },
        chooseCity() {

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