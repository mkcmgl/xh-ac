<template>
    <div class="app-container">
        <el-row>
            <el-col :span="10">
                <div class="title">子链区块管理</div>
            </el-col>
        </el-row>

        <el-row class="searchConditionBycontent">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="出块节点" prop="outNodeName">
                            <el-input placeholder="请输入" v-model="queryParams.outNodeName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="同步时间" prop="blockSize">
                            <el-date-picker v-model="queryParams.timeRange" type="datetimerange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" @change="chooseTime"
                                value-format="yyyy-MM-dd HH:mm:ss" style="width:100%">
                            </el-date-picker>
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
            <el-table :data="tableList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList">
                <el-table-column label="blodld" prop="blobId" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.blobId ? scope.row.blobId : 0 }}
                    </template>
                </el-table-column>
                <el-table-column label="出块节点" prop="outNodeName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="区块高度" prop="blockHeight" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="区块交易数" prop="txNumber" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="数据网关地址" prop="gatewayNode" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="上链交易哈希" prop="txHash" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="同步时间" prop="syncTime" :show-overflow-tooltip="true">
                </el-table-column>
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
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { resetForm } from "../../../utils/ruoyi";
import { subchainBlockList } from "@/api/subChainManage/subchainBlock/index.js"
import { minxData } from '../../minxData/minxData'
const temp = {
    baseId: '',
    outNodeName: '',
    startTime: '',
    endTime: '',
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
        return {
            loading: true,
            tableList: [],
            checked1: true,
            tableRoleList: [],
            joinChainShow: false,
            withdrawShow: false,
            activeName: 'first',
            queryParams: Object.assign({}, temp),
            loading: false,
            dialogVisible: false,
            currentRow: null,
            formRules: {
                 outNodeName: [
                    { max: 128, message: "区块节点长度最大128", trigger: "blur" },
                    { validator: equalToEmpty, trigger: "blur" }
                ],
            },
            total: 0,
            addShow: false,
            addNodeForm: {
                baseId: '',
                nodeName: '',
                nodeAddress: '',
                connectAddress: '',
                nodeType: '',
                district: '',
                publicIp: '',
                syncTime: '',
                serverType: '',
                nodeType: '',
            },
            addNodeFormRules: {
                nodeName: [
                    { required: true, trigger: 'blur', message: "请输入节点名称" },
                    { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                nodeAddress: [
                    { required: true, trigger: 'blur', message: "请输入节点地址" },
                    { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                connectAddress: [
                    { required: true, trigger: 'blur', message: "请输入通信地址" },
                    { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                nodeType: [
                    { required: true, trigger: 'change', message: "请选择节点类型" },
                ],
                district: [
                    { required: true, trigger: 'blur', message: "请输入地址位置" },
                    { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                publicIp: [
                    { required: true, trigger: 'blur', message: "请输入节点ip" },
                    { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                syncTime: [
                    { required: true, trigger: 'change', message: "请选择申请时间" },
                ],
                serverType: [
                    { required: true, trigger: 'change', message: "请选择服务器类型" },
                ],
                nodeType: [
                    { required: true, trigger: 'change', message: "请输入节点类型" },
                ],
            }
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
        //获取全部子链数据
        getList() {
            this.loading = true;
            //全部子链数据
            if(this.subchainDetail){
                this.queryParams.baseId=this.subchainDetail.subchainId
            }
            subchainBlockList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.$nextTick(() => {
                        this.tableList = res.data.list
                        this.total = res.data.total
                    })

                }
            }).catch(err => {
                this.loading = false
            })
        },
        toDetail(e) {
            this.$router.push({
                path:'/subChainDataManage/subchainBlockDetail',
                query:{
                    id:e.blockHash
                }
            })
        },
        del(e) {
            
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