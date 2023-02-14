<template>
    <div class="app-container">
        <div class="title">实名认证审核</div>
        <div class="searchWarp">
            <el-form :model="searchConditin"  ref="searchConditin" :rules="formRules" class="labelWidth">
                <el-row>
                    <el-col :span="6" :offset=0.5>
                        <el-form-item label="编号" prop="authId">
                            <el-input v-model="queryParams.authId" placeholder="请输入编号"  @input="clearSpecial($event, queryParams, 'authId')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请方" prop="did">
                            <el-input v-model="queryParams.did" placeholder="请输入/选择"
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
                        <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="resetCondition">重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="审核状态" prop="status">
                            <el-select v-model="queryParams.status" placeholder="请选择" :clearable="true"
                                style="width:100%">
                                <el-option v-for="item in authStatus" :key="item.value" :label="item.label"
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
                :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)" height="50vh">
                <el-table-column label="编号" align="left" prop="authId">
                    <template slot-scope="scope">
                        <span style="color:rgb(47,136,255);cursor:pointer" @click="toDetail(scope.row)">
                            {{ scope.row.authId }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="申请方BID" align="left" prop="did" :show-overflow-tooltip="true" />
                <el-table-column label="认证类型" align="left" prop="authType">
                    <template slot-scope="scope">
                        {{ scope.row.authType == 102 ? '企业认证' : '个人认证' }}
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" align="left" prop="applyDate" />
                <el-table-column label="审核状态" align="left" prop="status">
                    <template slot-scope="scope">
                        {{ scope.row.status == 0 ? '待审核' : scope.row.status == 1 ? '审核通过' : '审核驳回' }}
                    </template>
                </el-table-column>
                <el-table-column label="审核时间" align="left" prop="reviewDate" />
                <el-table-column label="操作" align="left" width="180">
                    <template slot-scope="scope">
                        <span class="viewDetail" @click="toDetail(scope.row)">查看</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"  @pagination="fetchdata"/>
        </div>

        <!-- 预览上传图片弹框 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex';
import { getTableData, review } from '@/api/businessManagement/authCheck.js'
import { encrypt } from '@/utils/jsencrypt';
import { resetForm } from '@/utils/ruoyi';
const temp = {
    authId: '',
    did: '',
    authType: '',
    status: '',
    pageNum: 1,
    pageSize: 10,
}
export default {
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
        return {
            token: '',
            dialogImageUrl: '',
            dialogVisible: false,
            queryParams: Object.assign({}, temp),
            searchConditin: {
                authId: '',
                did: '',
                authType: '',
                status: ''
            },
            tableData: [],
            // 遮罩层
            loading: true,
            // 分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,
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
            authStatus: [
                {
                    value: 0,
                    label: '待审核'
                },
                {
                    value: 1,
                    label: '审核通过'
                },
                {
                    value: 2,
                    label: '审核驳回'
                },
            ],
            formRules: {
                authId: [
                    {
                        max: 20,
                        message: "长度最大20位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                did: [
                    {
                        max: 100,
                        message: "长度最大100",
                        trigger: "blur",
                    }
                ]
            }
        };
    },
    created() {
        this.token = getToken()
        this.fetchdata()
    },
    methods: {
        fetchdata() {
            this.loading = true;
            getTableData(this.queryParams).then(res => {
                this.loading = false
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        searchData() {
            this.$refs.searchConditin.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    getTableData(this.queryParams).then(res => {
                        this.loading = false
                        this.tableData = res.rows;
                        this.total = res.total;
                    })
                }
            })
        },
        resetCondition() {
            this.queryParams=Object.assign({}, temp),
            this.fetchdata()
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
            form[text] = e.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        }
    },
};
</script>
<style scoped lang="scss">
//把label的宽度写到行内，在不同分辨率下会导致换行
.labelWidth {
  ::v-deep.el-form-item__label {
    width: 100px;
  }
  ::v-deep.el-form-item__content{
    margin-left: 100px;
  }
}
</style>