<template>
    <div class="app-container">
        <el-row>
            <el-col :span="10">
                <div class="title">加入子链</div>
            </el-col>
            <el-col :span="4">
                <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                    <el-tab-pane label="全部子链" name="first" v-if="allSubchainShow"></el-tab-pane>
                    <el-tab-pane label="加入的子链" name="second"></el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" style="float:right" @click="JoinChian" v-if="activeName == 'first'">加入子链
                </el-button>
                <el-button type="primary" style="float:right" @click="subchianDetail" v-else>子链详情</el-button>
            </el-col>
        </el-row>
        <el-row class="searchConditionBycontent">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="链名称" prop="chainName">
                            <el-input placeholder="请输入链名称" v-model="queryParams.chainName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="AC号" prop="chainCode">
                            <el-input placeholder="请输入AC号" v-model="queryParams.chainCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属企业" prop="enterprise">
                            <el-select v-model="queryParams.enterprise" placeholder="请选择企业" style="width:100%"
                                :clearable="true">
                                <el-option v-for="item in enterprisesList" :key="item.bid" :label="item.enterpriseName"
                                    :value="item.enterpriseName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" class="btnWarp">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
                <el-row v-show="activeName == 'second'">
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="审批状态" prop="auditResult">
                            <el-select v-model="queryParams.auditResult" placeholder="请选择审批状态" style="width:100%">
                                <el-option label="待审核" value="0"></el-option>
                                <el-option label="驳回" value="1"></el-option>
                                <el-option label="通过" value="2"></el-option>
                                <el-option label="已加入" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请人" prop="applicant">
                            <el-input placeholder="请输入申请人" v-model="queryParams.applicant"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请机构" prop="org">
                            <el-input placeholder="请输入申请人" v-model="queryParams.org"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList" v-show="activeName == 'first'" @current-change="handleCurrentChange"
                highlight-current-row>
                <el-table-column label="链名称" prop="chainName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="链所属行业" prop="industry" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="AC号" prop="chainCode" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="所属企业" prop="enterprise" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="链开放类型" prop="publicStatus" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.publicStatus == 0 ? '许可' : '开放' }}
                    </template>
                </el-table-column>
                <el-table-column label="链状态" prop="runStatus" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="创建时间" prop="applyTime" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <el-table :data="tableRoleList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList" v-show="activeName == 'second'" @current-change="handleCurrentRoleChange"
                highlight-current-row>
                <el-table-column label="链名称" prop="chainName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="申请人/申请机构" prop="applicant" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.applicant?scope.row.applicant:scope.row.org}}
                    </template>

                </el-table-column>
                <el-table-column label="AC号" prop="chainCode" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="所属企业" prop="enterprise" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="链开放类型" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.publicStatus == 0 ? '许可' : '开放' }}
                    </template>
                </el-table-column>
                <el-table-column label="审批状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.auditResult == 0">待审核</span>
                        <span v-if="scope.row.auditResult == 1">驳回</span>
                        <span v-if="scope.row.auditResult == 2">通过</span>
                        <span v-if="scope.row.auditResult == 3">已加入</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" prop="applyTime" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="操作" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.auditResult == 0&&!checkRole(['subchain'])" class="lw mr5"
                            @click="withdrawApply(scope.row)">撤回申请</span>
                        <span class="lw" @click="toAuditDetail(scope.row)">申请详情</span>
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
        <!-- 加入子链弹框 -->
        <el-dialog top="20vh" width="540px" :visible.sync="joinChainShow" :before-close="joinChainClose" show-close
            :append-to-body="true" v-if="currentRow != null">
            <h3 class="chainTitle">同意授权{{ currentRow.chainName }}查看您的部分信息，具体信息如下:</h3>
            <div class="mt20" style="overflow:hidden">
                <el-checkbox v-model="checked1" disabled style="margin-right:0px"></el-checkbox>
                <span class="mr30">主体数字身份bid</span>
                <el-checkbox v-model="checked1" disabled style="margin-right:0px"></el-checkbox>
                <span>主体实名认证信息</span>
                <el-form :model="joinForm" ref='joinForm' :rules="joinFormRules" class="mt20 labelWidth100">
                    <el-form-item label="申请理由" prop="applyReason">
                        <el-input v-model="joinForm.applyReason" placeholder="请输入申请理由" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="申请角色" prop="applyRole">
                        <el-select v-model="joinForm.applyRole" placeholder="请选择申请人">
                            <el-option label="子链用户" value="105"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div>
                    <el-button type="primary" class="fr" @click="agreeJoin">同意授权</el-button>
                    <el-button class="fr mr30" @click="joinChainClose">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 撤回子链申请弹框 -->
        <el-dialog title="撤回子链加入申请" top="20vh" width="540px" :visible.sync="withdrawShow"
            :before-close="withdrawApplyClose" show-close :append-to-body="true" center>
            <div class="line"></div>
            <p class="withdrawcontent">请再次确认撤回加入子链申请，一旦撤回将无法恢复。如需再次加入，请重新提交加入子链申请。</p>
            <div style="overflow:hidden" class="mt40">
                <el-button type="primary" class="fr" @click="agreeWithdraw">同意</el-button>
                <el-button class="fr mr30" @click="withdrawApplyClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { subchainJoinList, subchainJoinRoleList, subchainJoinApply, subchainJoinQuash } from "@/api/subChainManage/subChianJoin/index.js"
import { getEnterprises } from "@/api/business/business.js"
import { unwatchFile } from "fs";
import { mapState } from 'vuex';
import { resetForm } from "../../../utils/ruoyi";
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
const temp = {
    chainName: '',
    chainCode: '',
    enterprise: '',
    auditResult: '',
    applicant: '',
    org: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: "Job",
    computed: {
        ...mapState({
            userInfo: state => state.user.user,
            roles: state => state.user.roles,
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
        const equalToAC = (rule, value, callback) => {
            if (value != '') {
                if (!/^[a-z0-9]{4}$/
                    .test(value)) {
                    callback(new Error('请输入正确的ac号格式'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            // 遮罩层
            joinForm: {
                applyReason: '',
                applyRole: '105',
                baseId: '',
                applyId: ''
            },
            joinFormRules: {
                applyReason: [
                    { required: true, trigger: 'blur', message: "请输入申请原因" },
                    { required: true, trigger: 'blur', validator: equalToEmpty },
                    { required: true, trigger: 'blur', max: 100, message: '原因长度最大100' },
                ],
                applyRole: [{ required: true, trigger: 'change', message: "请选择申请人" }],
            },
            loading: true,
            tableList: [],
            checked1: true,
            tableRoleList: [],
            joinChainShow: false,
            withdrawShow: false,
            activeName: 'first',
            total: 0,
            queryParams: Object.assign({}, temp),
            loading: false,
            dialogVisible: false,
            detailContent: {
            },
            timeInter: null,
            formRules: {
                chainName: [
                    { required: false, trigger: 'blur', validator: equalToEmpty },
                    { required: false, trigger: 'blur', max: 30, message: '链名称最大30' }
                ],
                chainCode: [
                    { required: false, trigger: 'blur', validator: equalToAC },
                ],
                applicant: [
                    { required: false, trigger: 'blur', validator: equalToEmpty },
                    { required: false, trigger: 'blur', max: 30, message: '申请人长度最大100' }
                ],
                org: [
                    { required: false, trigger: 'blur', validator: equalToEmpty },
                    { required: false, trigger: 'blur', max: 30, message: '机构名称长度最大100' }
                ],
            },
            currentRow: null,
            withdrawCurrentRow: null,
            currentRoleRow: null,
            allSubchainShow: true,
            enterprisesList: []
        };
    },
    created() {
        if (this.roles.includes('subchain')) {
            this.allSubchainShow = false
            this.activeName = 'second'
        }
        this.getEnterpriseslList()
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
        //获取企业列表
        getEnterpriseslList() {
            getEnterprises().then(res => {
                this.enterprisesList = res.data
            })
        },
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
        //获取全部子链数据
        getList() {
            this.loading = true;
            if (this.activeName == 'first') {
                //全部子链数据
                subchainJoinList(this.queryParams).then(res => {
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
            } else {
                //加入的子链数据
                subchainJoinRoleList(this.queryParams).then(res => {
                    if (res.code == 200) {
                        this.loading = false
                        this.$nextTick(() => {
                            this.tableRoleList = res.rows
                            this.total = res.total
                        })

                    }
                }).catch(err => {
                    this.loading = false
                })
            }

        },
        handleClick(e) {
            this.queryParams = Object.assign({}, temp),
                this.getList()
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleCurrentRoleChange(val) {
            this.currentRoleRow = val;
        },
        withdrawApply(e) {
            this.withdrawShow = true
            this.withdrawCurrentRow = e
        },
        handleClose() {
            this.dialogVisible = false
        },
        withdrawApplyClose() {
            this.withdrawShow = false
            this.withdrawCurrentRow = null
        },
        joinChainClose() {
            this.joinChainShow = false
        },
        detail(row) {
            this.$router.push({
                path: '/subchain/subchainAccessDetail',
                query: {
                    data: row.id
                }
            })
        },
        //加入子链，点击判断是否选择了表格中某行
        JoinChian() {
            if (this.currentRow == null) {
                this.$message({
                    message: '请单击选择一条子链',
                    type: 'warning'
                })
            } else {
                this.joinForm = {
                    applyReason: '',
                    applyRole: '105',
                    baseId: '',
                    applyId: ''
                },
                    this.joinChainShow = true
            }
        },
        agreeJoin() {
            this.$refs.joinForm.validate(valid => {
                if (valid) {
                    let data = {
                        baseId: this.currentRow.id,
                        applyId: this.userInfo.userId,
                        applyReason: this.joinForm.applyReason,
                        applyRole: this.joinForm.applyRole
                    }
                    subchainJoinApply(data).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '授权成功',
                                type: 'success'
                            })
                            this.joinChainShow = false
                        }
                    })
                }
            })
        },
        agreeWithdraw() {
            let data = {
                id: this.withdrawCurrentRow.id
            }
            subchainJoinQuash(data).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '撤回成功',
                        type: 'success'
                    })
                    this.withdrawApplyClose()
                    this.getList()
                }
            })
        },
        toAuditDetail(e) {
            this.$router.push({
                path: '/subchain/subchainJoinAuditDetail',
                query: {
                    id: e.id
                }
            })
        },
        //子链详情
        subchianDetail() {
            if (this.currentRoleRow == null) {
                this.$message({
                    message: '请单击选择一条子链',
                    type: 'warning'
                })
            } else {
                if (this.currentRoleRow == 0 || this.currentRoleRow == 0) {
                    this.$message({
                        message: '请选择一条通过或已加入的子链',
                        type: 'warning'
                    })
                } else {
                    this.$router.push({
                        path: '/subchain/subchainJoinDetail',
                        query: { id: this.currentRoleRow.baseId }
                    })
                    this.currentRoleRow == null
                }

            }
        }
    }
};
</script>
<style scoped lang="scss">
.chainTitle {
    margin: 0;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 22px;
}

.labelWidth110 {
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}

.labelWidth100 {
    ::v-deep.el-form-item__label {
        width: 100px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 100px;
    }
}
</style>