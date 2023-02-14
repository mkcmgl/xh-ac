<template>
    <div class="app-container">
        <el-button type="primary" class="btnStyle1" @click="openChainManage"  v-hasPermi="['account:userManage:invite']">邀请</el-button>
        <!-- <el-button type="primary" class="btnStyle" @click="openMaintain">维护</el-button> -->
        <el-button type="primary" class="btnStyle" @click="openAdd"  v-hasPermi="['account:userManage:add']">新增</el-button>
        <div class="title">用户管理</div>
        <div class="searchWarp">
            <el-form :model="queryParams" class="labelWidth" ref="form" :rules="formRules">
                <el-row>
                    <el-col :span="6" :offset=0.5>
                        <el-form-item label="账户" prop="userName">
                            <el-input v-model="queryParams.userName" placeholder="请输入账户"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请方" prop="applicant">
                            <el-input v-model="queryParams.applicant" placeholder="请输入申请方名称"
                                @input="clearSpecial($event, queryParams, 'did')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="认证类型" prop="authType">
                            <el-select v-model="queryParams.authType" placeholder="请选择" :clearable="true"
                                style="width:100%">
                                <el-option v-for="item in authType" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="reset">重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="用户状态" prop="status">
                            <el-select v-model="queryParams.status" placeholder="请选择" :clearable="true"
                                style="width:100%">
                                <el-option v-for="item in status" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </div>
        <div class="dataWarp">
            <el-table v-loading="loading" ref="table"
                :data="tableList" height="50vh">
                <el-table-column label="账户" align="left" prop="userName">
                </el-table-column>
                <el-table-column label="手机号" align="left" prop="phonenumber" :show-overflow-tooltip="true" />
                <el-table-column label="邮箱" align="left" prop="email" :show-overflow-tooltip="true" />
                <el-table-column label="数字身份" align="left" prop="did" :show-overflow-tooltip="true" />
                <el-table-column label="用户类型" align="left" prop="authType">
                    <template slot-scope="scope">
                        {{ scope.row.authType ?scope.row.authType == 102 ? '企业用户' : '个人用户' : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="申请方" align="left" prop="applyDate">
                    <template slot-scope="scope">
                        {{ scope.row.authType == 102 ? scope.row.org : scope.row.realName }}
                    </template>
                </el-table-column>
                <el-table-column label="注册时间" align="left" prop="createTime" :show-overflow-tooltip="true" />
                <el-table-column label="用户状态" align="left" prop="status">
                    <template slot-scope="scope">
                        {{ scope.row.status == 0 ? '正常' : '禁用' }}
                    </template>
                </el-table-column>
                  <el-table-column label="操作" align="left">
                    <template slot-scope="scope">
                        <span class="lw" @click="openMaintain(scope.row)">维护</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"  @pagination="getList" key=""/>
        </div>
        <add-dialog :disable="addShow" @close="closeAddshow">
        </add-dialog>
        <maintain-dialog :disable="maintainShow" @close="closeMaintaishow" :userInfo="maintainInfo"></maintain-dialog>
        <add-chain-manage :disable="chainManageShow" @close="closeChainManageShow"></add-chain-manage>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { resetForm } from '@/utils/ruoyi';
import { userList } from '@/api/userManage/userManage.js'
import addDialog from './components/add.vue'
import maintainDialog from './components/mainTain.vue'
import addChainManage from './components/addChainManage.vue'
const temp = {
    userName: '',
    applicant: '',
    authType: '',
    status: '',
    pageNum: 1,
    pageSize: 10,
}
export default {
    components: { addDialog, maintainDialog, addChainManage },
    name: "AuthenticationResule",
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    data() {
        const equalToNumber = (rule, value, callback) => {
            if (/[^\d]/g
                .test(value)) {
                callback(new Error('只能输入数字'));
            } else {
                callback();
            }
        };
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
            tableList: [],
            queryParams: Object.assign({}, temp),
            // 遮罩层
            loading: true,
            // 分页信息
            total: 0,
            offset: 2,
            authType: [
                {
                    value: 101,
                    label: '个人认证'
                },
                {
                    value: 102,
                    label: '企业认证'
                },
            ],
            status: [
                {
                    value: 0,
                    label: '正常'
                },
                {
                    value: 1,
                    label: '禁用'
                }
            ],
            formRules: {
                userName: [
                    {
                        max: 20,
                        message: "长度最大20位",
                        trigger: "blur",
                    },
                     { validator: equalToEmpty, trigger: "blur" }
                ],
                applicant: [
                    {
                        max: 100,
                        message: "长度最大100",
                        trigger: "blur",
                    },
                     { validator: equalToEmpty, trigger: "blur" }
                ]
            },
            addShow: false,
            maintainShow: false,
            chainManageShow: false,
            maintainInfo:null
        };
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            this.loading = true;
            userList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total
                }
            }).catch(() => {
                this.loading = false
            })

        },
        reset() {
            this.$refs.form.clearValidate()
            this.queryParams = Object.assign({}, temp)
            this.getList()
        },
        search() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.getList()
                }
            })
        },
        toDetail(data) {
            this.$router.push({
                path: '/account/authDetail',
                query: {
                    data: JSON.stringify(data)
                }
            })
        },
        //清除特殊字符
        clearSpecial(e, form, text) {
            form[text] = e.replace(/[`～*~!@#$%^&*()_\-+=<>?"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        },
        openAdd() {
            this.addShow = true
        },
        openMaintain(e) {
            this.maintainInfo = e
            this.maintainShow = true
        },
        openChainManage() {
            this.chainManageShow = true
        },
        closeAddshow(e) {
            this.addShow = e
        },
        closeMaintaishow(e,e1) {
            this.maintainShow = e
            if(e1){
                this.getList()
            }
        },
        closeChainManageShow(e,e1) {
            this.chainManageShow = e
            if(e1){
                this.getList()
            }
        }
    },
};
</script>
<style scoped lang="scss">

.btnStyle {
    margin-right: 10px;
    float: right;
}
.btnStyle1 {
    margin-right: 30px;
    float: right;
}
.labelWidth {
  ::v-deep.el-form-item__label {
    width:100px;
  }
  ::v-deep.el-form-item__content{
    margin-left: 100px;
  }
}
</style>