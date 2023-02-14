<template>
    <div class="app-container">
        <div class="title">
            <div>
                开通审核
            </div>
        </div>
        <div class="searchCondition1">
            <el-form :model="searchConditin" ref="searchConditin" :rules="formRules" label-width="110px">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="用户编号" prop="authId">
                            <el-input v-model="queryParams.userId" placeholder="请输入编号"
                                @input="clearSpecial($event, queryParams, 'userId')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">

                        <el-form-item label="审核状态" prop="did">
                            <el-select v-model="queryParams.serviceId" placeholder="请选择审核状态" :clearable="true"
                                :filterable="true">
                                <el-option v-for="(item, index) in typeList" :key="index" :label="item.lable"
                                    :value="item.value"></el-option>
                            </el-select>
                            <!-- <el-input v-model="queryParams.serviceId" placeholder="请输入/选择"
                                @input="clearSpecial($event, queryParams, 'serviceId')"></el-input> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <!-- <el-col :span="6">
                        <el-form-item label="认证类型" prop="authType">
                            <el-select v-model="queryParams.authType" placeholder="请选择" :clearable="true"
                                style="width:100%">
                                <el-option v-for="item in authType" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="5">
                        <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
                        <el-button plain icon="el-icon-refresh-left" @click="resetCondition">重置</el-button>
                    </el-col>
                </el-row>
                <!-- <el-row>
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
                </el-row> -->
            </el-form>

        </div>
        <div class="dataWarp">
            <el-table v-loading="loading" ref="table"
                :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)" height="50vh">
                <el-table-column label="用户编号" align="left" prop="authId">
                    <template slot-scope="scope">
                        <span style="color:rgb(47,136,255);cursor:pointer" @click="toDetail(scope.row)">
                            <!-- {{ scope.row.authId }} -->
                            {{ scope.row.applyBy }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="服务名称" align="left" prop="serviceName" :show-overflow-tooltip="true" />
                <!-- <el-table-column label="认证类型" align="left" prop="authType">
                    <template slot-scope="scope">
                        {{ scope.row.authType == 102 ? '企业认证' : '个人认证' }}
                    </template>
                </el-table-column> -->
                <el-table-column label="申请时间" align="left" prop="applyDate" />
                <el-table-column label="审核状态" align="left" prop="status">
                    <template slot-scope="scope">
                        {{
                            scope.row.reviewStatus
                                == 0 ? '待审核' : scope.row.reviewStatus
                                    == 1 ? '审核通过' : '审核驳回'
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="审核时间" align="left" prop="reviewDate" />
                <el-table-column label="操作" align="left" width="180">
                    <template slot-scope="scope">
                        <span class="toOther" @click="toDetail(scope.row)">详情</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="fetchdata" />
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
import { getReviewList } from '@/api/access/access.js'
import { showServiceStatusList } from "@/api/mineService/mineService.js"
import { encrypt } from '@/utils/jsencrypt';
import { resetForm } from '@/utils/ruoyi';
import axios from 'axios'
const temp = {
    pageSize: 10,
    pageNum: 1,
    userId: '',
    serviceId: '',

    // reviewStatus: '',
    // reviewOpinion: '',

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

            /**
 * 用户编号
 */
            //             private Integer user_id;
            //             /**
            //              * 用户名
            //              */
            //             private Integer user_name;
            //             /**
            //              * 服务编号
            //              */
            //             private Integer service_id;
            //             /**
            //              * 服务名称
            //              */
            //             private Integer service_name;
            //             /**
            //              * 开通状态（0：未开通；1：已开通；2：开通中；3：开通失败）
            //              */
            //             private String open_status;
            //             /**
            //              * 审核状态（0：待审核；1：通过；2：驳回）
            //              */
            //             private String examine_status;
            // /**
            //  * 申请时间
            //  */
            // @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            //         private Date apply_date;
            //         /**
            //          * 开通时间
            //          */
            //         @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            //         private Date open_date;




            token: '',
            dialogImageUrl: '',
            dialogVisible: false,
            queryParams: Object.assign({}, temp),
            searchConditin: {
                userId: '',
                serviceId: '',
            },
            tableData: [],
            // 遮罩层
            loading: true,
            // 分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,
            offset: 2,

            // authStatus: [
            //     {
            //         value: 0,
            //         label: '待审核'
            //     },
            //     {
            //         value: 1,
            //         label: '审核通过'
            //     },
            //     {
            //         value: 2,
            //         label: '审核驳回'
            //     },
            // ],
            formRules: {
                userId: [
                    {
                        max: 20,
                        message: "长度最大20位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                serviceId: [
                    {
                        max: 100,
                        message: "长度最大100",
                        trigger: "blur",
                    }
                ]
            },
            typeList: [
                { lable: '待审核', value: '0' },
                { lable: '审核通过', value: '1' },
                { lable: '审核驳回', value: '2' },

            ]

        };
    },
    created() {
        this.token = getToken()
        this.fetchdata()
    },
    methods: {
        getList(data) {
            axios.post(`http://10.180.13.250:13014/openingReview/v1/reviewList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`).then(res => {
                // console.log(res)
                this.loading = false
                this.tableData = res.data.rows;
                this.total = res.data.total;
            })
        },
        fetchdata() {
            this.loading = true;
            // console.log(`output->this.queryParams`,this.queryParams)
            // this.getList(this.queryParams)

            getReviewList(this.queryParams).then(res => {
                // console.log(`output->res`, res)
                this.loading = false
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        searchData() {
            this.$refs.searchConditin.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // console.log(`output->this.queryParams`, this.queryParams)
                    // this.getList(this.queryParams)
                    getReviewList(this.queryParams).then(res => {
                        // console.log(`output->res`, res)
                        this.loading = false
                        this.tableData = res.rows;
                        this.total = res.total;
                    })
                }
            })
        },
        resetCondition() {
            this.queryParams = Object.assign({}, temp),
                this.fetchdata()
        },
        toDetail(data) {
            // console.log(`output->datadetail`, data)
            this.$router.push({
                path: '/accessReview/detail',
                query: {
                    serviceId: data.serviceId,
                    applyBy: data.applyBy,
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
@import "~@/assets/styles/tableStyle.scss";
</style>
<!-- 
//把label的宽度写到行内，在不同分辨率下会导致换行

    .labelWidth {
    ::v-deep.el-form-item__label {
        width: 100px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 100px;
    }
} -->