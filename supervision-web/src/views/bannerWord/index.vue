<template>
    <div class="app-container">
        <el-row>
            <el-col :span="10">
                <div class="title"><span class="lastRouter" @click="toLast">违禁词管理</span>
                    <!-- <span class="currentRouter" v-show="searchContent">/</span>
                    <span class="currentRouter" v-show="searchContent">详情</span> -->
                </div>
            </el-col>
            <el-col :span="14">
                <el-button type="primary" class="fr mr10" @click="add">新增</el-button>
                <el-button class="fr mr10" @click="delMul">删除</el-button>
            </el-col>
        </el-row>
        <el-row class="serviceStatus" v-if="noticeshow">
            <el-col :span="1" class="serviceStatusIcon">
                <el-icon class="el-icon-circle-check" style="color:rgb(68,136,93)"></el-icon>
            </el-col>
            <el-col :span="23" class="serviceStatusWord">
                您可以查询星火·链网违禁字典，同时支持违禁词新增、编辑
                <span class="fr" style="cursor:pointer" @click="noticeshow=false">
                    <el-icon class="el-icon-close" style="color:rgb(68,136,93)"></el-icon>
                </span>
            </el-col>
        </el-row>
        <el-row>
            <el-form :model="queryParams" :rules="formRules" ref="form" @submit.native.prevent>
                <el-form-item label="" prop="word">
                    <el-input placeholder="违禁词" suffix-icon="el-icon-search" v-model="queryParams.word"
                        class="searchWarp" @change="search">
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="tableBg" v-show="!searchContent">
            <el-table :data="tableList" v-loading="loading" height="60vh" :row-style="{ 'height': '40px' }"
                ref="tableList" @selection-change="handleSelectionChange" @row-dblclick="chooseRow">
                <el-table-column type="selection" width="80">
                </el-table-column>
                <el-table-column label="敏感词" prop="word" :show-overflow-tooltip="true" align="center">
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" :show-overflow-tooltip="true" align="center">
                </el-table-column>
                <el-table-column label="来源" prop="xinghuoFlag" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        {{scope.row.xinghuoFlag==1?'平台提供':'自行添加'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        <span class="lw" @click="del(scope.row)">删除</span>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-row>
        <el-row class="pagination" v-show="!searchContent">
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-row>
        <el-row v-show="searchContent">
            <el-col :span="24">
                <div class="searchContent">
                    <el-image :src="imgUrl" class="noContentImg"></el-image>
                    <span class="emptyWord">空空如也<span style="color:rgb(70,166,255);cursor:pointer"
                            @click="add">去创建</span></span>
                </div>
            </el-col>
        </el-row>
        <!-- 删除弹框 -->
        <el-dialog top="20vh" width="23%" :visible.sync="delShow" :before-close="delClose" show-close
            :append-to-body="true" title="删除提示">
            <div class="line"></div>
            <p class="withdrawcontent">确定要删除所选违禁词</p>
            <div style="overflow:hidden" class="mt40">
                <el-button type="primary" class="fr" @click="agree">确定</el-button>
                <el-button class="fr mr30" @click="delClose">取消</el-button>
            </div>
        </el-dialog>
        <!-- 新增弹框 -->
        <el-dialog top="20vh" width="23%" :visible.sync="addShow" :before-close="addClose" show-close
            :append-to-body="true" title="新增">
            <div class="line"></div>
            <el-form :model="addForm" ref="addForm" :rules="addFormRules" class="labelWidth90" v-if="addShow">
                <el-form-item label="违禁词" prop="bandWord">
                    <el-input v-model="addForm.bandWord" placeholder="请输入违禁词" type="textarea"></el-input>
                    <p class="notice formTitle">多个违禁词请用英文逗号分开</p>
                </el-form-item>
            </el-form>
            <div style="overflow:hidden" class="mt40">
                <el-button type="primary" class="fr" @click="addConfirm">确定</el-button>
                <el-button class="fr mr30" @click="addClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { minxData } from '../minxData/minxData'
import { banWordList, banWordAdd, banWordDel } from '@/api/banword/index.js'
const temp = {
    word: '',
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
        const checkHasEmoji = (rule, value, callback) => {
            if(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(value)){
                callback(new Error('请输入正确的字符'));
            }else{
                callback(); 
            }
        }
        return {
            loading: true,
            tableList: [],
            queryParams: Object.assign({}, temp),
            loading: false,
            formRules: {
                word: [
                    { max: 200, message: "违禁词长度最大200", trigger: "blur" },
                    { validator: equalToEmpty, trigger: "blur" },
                    { validator: checkHasEmoji, trigger: "blur" },
                ],
            },
            total: 0,
            noticeshow: true,
            delShow: false,
            addShow: false,
            addForm: {
                bandWord: ''
            },
            addFormRules: {
                bandWord: [
                    { required: true, message: '请输入违禁词', trigger: "blur" },
                    { max: 200, message: "违禁词长度最大200", trigger: "blur" },
                    { validator: equalToEmpty, trigger: "blur" },
                    { validator: checkHasEmoji, trigger: "blur" },
                ]
            },
            delWordList: [],
            searchContent: false,
            imgUrl: require('../../assets/images/contentEmpty.png'),
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
        getList() {
            let {pageSize,pageNum} = this.queryParams
            let data={
                word:this.queryParams.word
            }
            banWordList(pageNum,pageSize,data).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    this.$nextTick(() => {
                        this.tableList = res.rows
                        this.total = res.total
                        if (this.total == 0) {
                            this.searchContent = true
                        } else {
                            this.searchContent = false
                        }
                    })

                }
            }).catch(err => {
                this.loading = false
            })
        },
        toDetail(e) {
            this.$router.push({
                path: '/subchain/subchainBlockDetail',
                query: {
                    id: e.blockHash
                }
            })
        },
        delMul() {
            if (this.delWordList.length == 0) {
                this.$message({
                    message: '请先选择一条违禁词',
                    type: 'warning'
                })
            } else {
                this.delShow = true
            }
        },
        chooseRow(row) {
            this.$refs.tableList.toggleRowSelection(row)
        },
        handleSelectionChange(e) {
            this.delWordList = []
            if (e.length != 0) {
                e.map(item => {
                    this.delWordList.push(item.id)
                })
            }
        },
        delClose() {
            this.delShow = false
        },
        agree() {
            //删除单条和多条时
            let delArr = this.delWordList
            banWordDel(delArr).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.delShow = false
                    this.getList()
                }
            })

        },
        add() {
            this.addShow = true
            this.$nextTick(() => {
                this.$refs.addForm.clearValidate()
            })
        },
        addClose() {
            this.addForm.bandWord = ''
            this.addShow = false
        },
        addConfirm() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    banWordAdd(this.addForm.bandWord).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            this.getList()
                            this.addShow = false
                            this.addForm.bandWord = ''
                        }
                    })

                }
            })

        },
        toLast() {
            this.queryParams.word = ''
            this.getList()
            this.searchContent = false
        }
    },

}
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
    .el-dialog__header {
        padding-top: 35px;
    }

    .el-dialog__body {
        margin: 0;
        padding: 0 25px 25px 25px;
    }
}

.serviceStatus {
    height: 50px;
    margin: 20px auto;
    border: 1px solid rgb(188, 233, 210);
    background-color: rgb(244, 251, 247);
    line-height: 50px;
}

.serviceStatusIcon {
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 28px;
}

.serviceStatusWord {
    height: 100%;
    line-height: 50px;
    text-align: left;
    font-size: 18px;
    font-family: '微软雅黑';
}

.searchWarp {
    width: 30%;
    margin-left: 35%;
}

.labelWidth90 {
    margin-top: 30px;

    ::v-deep.el-form-item__label {
        width: 90px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 90px;
    }
}

.notice {
    margin: 0;
}

.searchContent {
    width: 100%;
    // background: #fff;
    height: 62vh;
    border-top: 1px solid rgb(239, 242, 247);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .noContentImg {
        display: block;
        width: 300px;
        height: 226px;
    }

    .result {
        margin: 0 0;
    }

    .emptyWord {
        font-size: 18px;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: #333333;
    }
}
</style>