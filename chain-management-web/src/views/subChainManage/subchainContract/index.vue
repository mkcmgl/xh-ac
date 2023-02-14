<template>
    <div class="app-container">
        <el-row>
            <el-button type="primary" style="float:right" @click="addContract" v-if="!checkRole(['backbone'])">新增合约
            </el-button>
            <el-col :span="10">
                <div class="title">子链合约管理</div>
            </el-col>
        </el-row>

        <el-row class="searchConditionBycontent">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="合约类型" prop="contractType">
                            <el-select v-model="queryParams.contractType" placeholder="请选择节点类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in contractType"
                                    :key="index"></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合约版本" prop="contractVersion">
                            <el-input placeholder="请输入合约版本" v-model="queryParams.contractVersion"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间" prop="blockSize">
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
                ref="tableList" @current-change="handleCurrentChange" highlight-current-row>
                <el-table-column label="blodld" prop="blobId" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.blobId ? scope.row.blobId : 0 }}
                    </template>
                </el-table-column>
                <el-table-column label="合约类型" prop="contractType" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="合约版本" prop="contractVersion" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="上链交易哈希" prop="txHash" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="创建时间" prop="syncTime" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="操作" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span class="lw mr5" @click="toDetail(scope.row)">详情</span>
                        <span class="lw" @click="del(scope.row)" v-if="!checkRole(['person'])">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <!-- 新增节点弹框 -->
        <el-dialog top="20vh" width="792px" :visible.sync="addShow" :before-close="handleClose" show-close
            :append-to-body="true">
            <div class="line"></div>
            <h4 class="addTitle">基本信息</h4>
            <el-form :model="addContractForm" :rules="addContractFormRules" class="labelWidth130" ref="addContractForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合约名称" prop="contractName">
                            <el-input v-model="addContractForm.contractName" placeholder="请输入合约名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行业类型" prop="industry">
                            <el-select v-model="addContractForm.industry" placeholder="请选择行业类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value"
                                    v-for="(item, index) in industryTypeList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合约拥有人BID" prop="ownerAddress">
                            <el-input v-model="addContractForm.ownerAddress" placeholder="请输入合约拥有人BID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合约地址" prop="contractAddress">
                            <el-input v-model="addContractForm.contractAddress" placeholder="请输入合约地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合约类型" prop="contractType">
                            <el-select v-model="addContractForm.contractType" placeholder="请选择节点类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in contractType"
                                    :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h4 class="addTitle">合约详细信息</h4>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合约版本" prop="contractVersion">
                            <el-input v-model="addContractForm.contractVersion" placeholder="请输入合约版本"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合约引擎" prop="contractEngine">
                            <el-input v-model="addContractForm.contractEngine" placeholder="请输入合约引擎"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合约代码" prop="payload">
                            <el-input v-model="addContractForm.payload" placeholder="请输入合约代码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="mt20" style="overflow:hidden">
                <div>
                    <el-button type="primary" class="fr" @click="confirmaddContract">确定</el-button>
                    <el-button class="fr mr30" @click="handleClose">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog top="20vh" width="792px" :visible.sync="delShow" :before-close="delClose" show-close
            :append-to-body="true">
            <div class="line"></div>
            <p class="withdrawcontent">请再次确认删除当前合约，一旦删除将无法恢复。可以通过"新增合约"按钮进行合约新增</p>
            <div style="overflow:hidden" class="mt40">
                <el-button type="primary" class="fr" @click="agree">同意</el-button>
                <el-button class="fr mr30" @click="delClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { resetForm } from "../../../utils/ruoyi";
import { subchainContractList, subchainContractAdd, subchainContractDelete } from "@/api/subChainManage/subchainContract/index.js"
import { minxData } from '../../minxData/minxData'
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
const temp = {
    baseId: '',
    contractType: '',
    contractVersion: '',
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
            delShow: false,
            queryParams: Object.assign({}, temp),
            loading: false,
            dialogVisible: false,
            formRules: {
                contractVersion: [
                    { max: 100, message: "长度最大100", trigger: "blur" },
                    { validator: equalToEmpty, trigger: "blur" },
                ]
            },
            total: 0,
            addShow: false,
            addContractForm: {
                baseId: '',
                contractName: '',
                contractAddress: '',
                ownerAddress: '',
                contractType: '',
                industry: '',
                payload: '',
                contractEngine: '',
                contractVersion: ''
            },
            addContractFormRules: {
                contractName: [
                    { required: true, trigger: 'blur', message: "请输入合约名称" },
                    { max: 100, message: "合约名称长度最大128", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                contractAddress: [
                    { required: true, trigger: 'blur', message: "请输入合约地址" },
                    { max: 64, message: "合约地址长度最大64", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                ownerAddress: [
                    { required: true, trigger: 'blur', message: "请输入合约拥有人BID" },
                    { max: 64, message: "合约拥有人BID长度最大64", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                industry: [
                    { required: true, trigger: 'change', message: "请选择行业类型" },
                ],
                payload: [
                    { required: true, trigger: 'blur', message: "请输入合约代码" },
                    { max: 100, message: "合约代码长度最大100", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                contractEngine: [
                    { required: true, trigger: 'blur', message: "请输入合约引擎" },
                    { max: 16, message: "长度最大16", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                contractVersion: [
                    { required: true, trigger: 'blur', message: "请输入合约版本" },
                    { max: 16, message: "长度最大16", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                subchainId: 0
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
        checkRole,
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
            if (this.subchainDetail) {
                this.queryParams.baseId = this.subchainDetail.subchainId
            }
            subchainContractList(this.queryParams).then(res => {
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
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleClose() {
            this.addShow = false
            this.$refs.addContractForm.resetFields()
        },
        delClose() {
            this.delShow = false
        },
        addContract() {
            this.addShow = true
        },
        confirmaddContract() {
            this.$refs.addContractForm.validate(valid => {
                if (valid) {
                    this.addContractForm.baseId = this.subchainDetail.subchainId
                    subchainContractAdd(this.addContractForm).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            this.addShow = false
                            setTimeout(() => {
                                this.getList()
                            }, 1001);
                        }
                    })
                }
            })
        },
        toDetail(e) {
            this.$router.push({
                path: '/subChainDataManage/subchainContractDetail',
                query: {
                    id: e.contractAddress
                }
            })
        },
        del(e) {
            this.subchainId = e.id
            this.delShow = true
        },
        agree() {
            let data = {
                id: this.subchainId
            }
            subchainContractDelete(data).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.delShow = false
                    this.subchainId = ''
                    setTimeout(() => {
                        this.getList()
                    }, 1001);
                }
            })
        }
    },

}
</script>
<style scoped lang="scss">
.withdrawcontent {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #333333;
    margin: 40px 0 0 0;
}

.addTitle {
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
}

.labelWidth130 {
    ::v-deep.el-form-item__label {
        width: 130px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 130px;
    }
}

.labelWidth110 {
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}
</style>