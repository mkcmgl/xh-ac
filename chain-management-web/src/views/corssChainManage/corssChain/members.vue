<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">跨链通道管理</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">成员管理</span>
            <el-button type="primary" style="float:right" @click="dialogVisible = true">添加成员</el-button>
        </div>
        <el-row class="searchConditionBycontent1">
            <el-form label-position="right" class="labelWidth100" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="成员名称" prop="comment">
                            <el-input placeholder="请输入成员名称" v-model="queryParams.comment"></el-input>
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
            <el-table :data="tableList" v-loading="loading" ref="tableList">
                <el-table-column label="成员名称" prop="comment" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="成员账号" prop="memberAccountId" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="数据获取URL" prop="urlToGetData" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.urlToGetData }}</span>
                        <el-popover placement="right" width="400" trigger="click">
                            <div>
                                <el-input v-model="editUrlForm.urlToGetData" placeholder="请输入新的url"></el-input>
                                <p class="editUrlFormIntro">获取应用子链数据的API接口地址</p>
                                <div class="editBtn">
                                    <el-button icon="el-icon-check"  type="primary" size="mini" @click="editUrl(scope.row.memberAccountId)"></el-button>
                                </div>
                            </div>
                            <el-icon class="el-icon-edit editcolor" slot="reference"></el-icon>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="添加时间" prop="addTime" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <el-dialog title="添加成员" top="20vh" width="40%" :visible.sync="dialogVisible" :before-close="handleClose"
            show-close :append-to-body="true">
            <el-form :model="chainCrossForm" :rules="chainCrossFormRules" class="labelWidth120" ref="chainCrossForm">
                <el-form-item label="成员名称" prop="comment">
                    <el-input placeholder="请输入备注" v-model="chainCrossForm.comment"></el-input>
                </el-form-item>
                <el-form-item label="成员账号" prop="memberNickname">
                    <el-input placeholder="请输入业务类型，如电商、税务等" v-model="chainCrossForm.memberNickname"></el-input>
                </el-form-item>
                <el-form-item label="数据获取URL" prop="urlToGetData">
                    <el-input placeholder="请输入数据获取URL" v-model="chainCrossForm.urlToGetData"></el-input>
                </el-form-item>

            </el-form>
            <div class="dialogFooter">
                <el-button type="" @click="handleClose">取消</el-button>
                <el-button type="primary" @click="confirm">创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addMember, getChainCrossMemberList  ,modifyAPIUrl} from '@/api/corssChain/index.js'
const temp = {
    channelId: '',
    pageSize: 10,
    pageNum: 1,
    comment:''
}
export default {
    name: 'corssChain',

    data() {
        return {
            queryParams: Object.assign({}, temp),
            // 遮罩层
            loading: true,
            tableList: [

            ],
            total: 0,
            formRules: {
                comment: [{
                    max: 19,
                    message: "长度最大19位",
                    trigger: "blur",
                },
                ],
            },
            dialogVisible: false,
            chainCrossForm: {
                channeld:'',
                comment: '',
                memberNickname: '',
                urlToGetData: '',
            },
            chainCrossFormRules: {
                comment: [
                    {required: true, message: "请输入成员名称", trigger: "blur", }
                ],
                memberNickname: [
                    { required: true, message: "请输入系统内用户昵称", trigger: "blur", }
                ],
                urlToGetData: [
                    { required: true, message: "请输入数据获取URL", trigger: "blur", }
                ],
            },
            editUrlForm:{
                channeld:'',
                memberAccountId:'',
                urlToGetData:'',
            },
            channelId:'',
            editShow:false
        };
    },

    mounted() {
        this.getList()
        this.channelId = this.$route.query.id
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
            this.loading = false;
            this.queryParams.channelId = this.$route.query.id
            getChainCrossMemberList(this.queryParams).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.tableList = res.rows
                    this.total = res.total
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
            this.$refs.chainCrossForm.clearValidate()
            this.$refs.chainCrossForm.resetFields()
            this.dialogVisible = false
        },
        confirm() {
            this.chainCrossForm.channeld = this.channelId
            this.$refs.chainCrossForm.validate((valid) => {
                if (valid) {
                    addMember(this.chainCrossForm).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogVisible = false
                            this.getList()
                        }
                    })
                }
            })
        },
        toLast() {
            this.$router.go(-1)
        },
        editUrl(e){
            console.log(e)
            this.editUrlForm.memberAccountId = e
            this.editUrlForm.channeld = this.channelId
            modifyAPIUrl(this.editUrlForm).then(res=>{
                if(res.code==200){
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    })
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.labelWidth100 {
    ::v-deep.el-form-item__label {
        width: 100px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 100px;
    }
}

.labelWidth120 {
    ::v-deep.el-form-item__label {
        width: 120px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 120px;
    }
}

.searchConditionBycontent1 {
    width: 100%;
    background: #ffffff;
    padding-top: 40px;
    margin-top: 10px;
}

.dialogFooter {
    display: flex;
    justify-content: right;
}
.editcolor{
    color: #36b3df;
}
.editBtn{
    display: flex;
    justify-content: right;
    margin-top: 5px;
}
.editUrlFormIntro{
    font-size: 12px;
    margin-top: 4px;
    color: #ccc;
}
</style>
