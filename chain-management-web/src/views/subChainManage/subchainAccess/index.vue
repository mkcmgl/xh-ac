<template>
    <div class="app-container">
        <router-link to="/subchain/subchainAccessApply"  v-if="!checkRole(['backbone'])">
            <el-button type="primary" style="float:right">子链申请</el-button>
        </router-link>
        <div class="title">子链接入</div>
        <el-row class="tableBg">
            <el-table :data="tableList" v-loading="loading" @row-dblclick="chooseRow" height="60vh"
                :row-style="{ 'height': '40px' }" ref="tableList">
                <el-table-column label="链名称" prop="chainName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="链架构" prop="chainArch" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="链所属行业" prop="industry" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="AC号" prop="chainCode" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="链开放类型" prop="publicStatus" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.publicStatus == 0 ? '许可' : '开放' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" prop="requestTime" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="审批状态" prop="auditResult" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.auditResult == 0 ? '待审核' : scope.row.auditResult == 1 ? '通过' : '不通过'
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="syncTime" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span class="lw" @click="detail(scope.row)">详情</span>
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
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
import { subchainApplyList } from "@/api/subChainManage/subChainAccess/index.js"
import { mapState } from 'vuex';
const temp = {
    userId: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    name: "Job",
    computed: {
        ...mapState({
            userInfo: state => state.user.user,
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
            // 遮罩层
            loading: true,
            tableList: [],
            total: 0,
            queryParams: Object.assign({}, temp),
            loading: false,
            dialogVisible: false,
            detailContent: {
            },
            timeInter: null,
            formRules: {
                blockHeight: [
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                totalNodeCount: [
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                systemContractCount: [
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                txNumber: [
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
                ],
                accountCount: [
                    {
                        max: 100,
                        message: "长度最大100位",
                        trigger: "blur",
                    },
                    { validator: equalToNumber, trigger: "blur" },
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
        checkRole,
        //获取数据
        getList() {
            this.loading = true;
            this.queryParams.userId = this.userInfo.userId
            subchainApplyList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total
                }
            })
        },
        chooseRow(row) {
            this.dialogVisible = true
            let param = {
                apiKey: row.apiKey
            }
            chainStatusDetial(param).then(res => {
                if (res.code == 200) {
                    this.detailContent = res.data
                    this.dialogVisible = true
                }
            })
        },
        handleClose() {
            this.dialogVisible = false
        },
        detail(row) {
            this.$router.push({
                path: '/subchain/subchainAccessDetail',
                query: {
                    data: row.id
                }
            })
        }
    }
};
</script>
<style scoped lang="scss">

</style>