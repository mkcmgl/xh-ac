<template>
    <div class="app-container">
        <el-row>
            <el-button type="primary" style="float:right" @click="addNode"  v-if="!checkRole(['backbone'])">新增节点</el-button>
            <el-col :span="10">
                <div class="title">子链节点管理</div>
            </el-col>
        </el-row>
        <el-row class="searchConditionBycontent">
            <el-form label-position="right" class="labelWidth110" :model="queryParams" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="节点名称" prop="nodeName">
                            <el-input placeholder="请输入" v-model="queryParams.nodeName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="节点类型" prop="nodeType">
                            <el-select v-model="queryParams.nodeType" placeholder="请选择节点类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in nodeType"
                                    :key="index"></el-option>
                            </el-select>
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
                <el-row>
                    <el-col :span="6" :offset="0.5">
                        <el-form-item label="服务器类型" prop="serverType">
                            <el-select v-model="queryParams.serverType" placeholder="请选择服务器类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in serverType"
                                    :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="云类型" prop="cloudType">
                            <el-select v-model="queryParams.cloudType" placeholder="请选择云类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in cloudType"
                                    :key="index"></el-option>
                            </el-select>
                        </el-form-item>
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
                <el-table-column label="节点名称" prop="nodeName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="节点类型" prop="nodeType" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.nodeType == 0">业务节点</span>
                    </template>
                </el-table-column>
                <el-table-column label="服务器类型" prop="serverType" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.serverType == 0">自建服务器</span>
                        <span v-if="scope.row.serverType == 1">云服务</span>
                    </template>
                </el-table-column>
                <el-table-column label="云类型" prop="cloudType" :show-overflow-tooltip="true">
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
        <el-dialog top="20vh" width="60%" :visible.sync="addShow" :before-close="handleClose" show-close
            :append-to-body="true">
            <div class="line"></div>
            <h4 class="addTitle">基本信息</h4>
            <el-form :model="addNodeForm" :rules="addNodeFormRules" ref="addNodeForm" class="labelWidth130">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="节点名称" prop="nodeName">
                            <el-input v-model="addNodeForm.nodeName" placeholder="请输入节点名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="节点地址" prop="nodeAddress">
                            <el-input v-model="addNodeForm.nodeAddress" placeholder="请输入节点地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="通信地址" prop="connectAddress">
                            <el-input v-model="addNodeForm.connectAddress" placeholder="请输入通信地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="节点类型" prop="nodeType">
                            <el-select v-model="addNodeForm.nodeType" placeholder="请选择节点类型" filterable clearable  style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in nodeType"
                                    :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="地址位置" prop="district">
                            <choose-adress v-model="addNodeForm.district" ref="chooseAddress"></choose-adress>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="节点IP" prop="publicIp">
                            <el-input v-model="addNodeForm.publicIp" placeholder="请输入节点IP"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="申请时间" prop="syncTime">
                            <el-date-picker v-model="addNodeForm.syncTime" type="datetime" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss"  style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h4 class="addTitle">服务类型</h4>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="服务器类型" prop="serverType">
                            <el-select v-model="addNodeForm.serverType" placeholder="请选择服务器类型" filterable clearable  style="width:100%"> 
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in serverType"
                                    :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="云类型" prop="cloudType">
                            <el-select v-model="addNodeForm.cloudType" placeholder="请选择云类型" filterable clearable
                                style="width:100%">
                                <el-option :label="item.lable" :value="item.value" v-for="(item, index) in cloudType"
                                    :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="mt20" style="overflow:hidden">
                <div>
                    <el-button type="primary" class="fr" @click="confirmAddNode">确定</el-button>
                    <el-button class="fr mr30" @click="handleClose">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 删除节点弹框 -->
        <el-dialog top="20vh" width="792px" :visible.sync="delShow" :before-close="delClose" show-close
            :append-to-body="true">
            <div class="line"></div>
            <p class="withdrawcontent">请再次确认删除当前节点，一旦删除将无法恢复。可以通过"新增节点"按钮进行节点新增</p>
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
import { subchainNodeList, subchainNodeAdd, subchainNodeDel } from "@/api/subChainManage/subchainNode/index.js"
import { minxData } from '../../minxData/minxData'
import chooseAdress from '../../../components/public/chooseAdress.vue';
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
const temp = {
    baseId: '',
    nodeName: '',
    cloudType: '',
    serverType: '',
    nodeType: '',
    startTime: '',
    endTime: '',
    pageSize: 10,
    pageNum: 1,
}
export default {
    components: { chooseAdress },
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
            subchainId: '',
            queryParams: Object.assign({}, temp),
            loading: false,
            formRules: {
                nodeName: [
                    { max: 128, message: "节点名称最大128", trigger: "blur" },
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
                cloudType: '',
            },
            addNodeFormRules: {
                nodeName: [
                    { required: true, trigger: 'blur', message: "请输入节点名称" },
                    { max: 100, message: "节点名称最大128", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                nodeAddress: [
                    { required: true, trigger: 'blur', message: "请输入节点地址" },
                    { min: 32, max: 57, message: "节点长度必须介于 32 和 57 之间", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                connectAddress: [
                    { required: true, trigger: 'blur', message: "请输入通信地址" },
                    {  max: 100, message: "通信地址长度最大100", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                nodeType: [
                    { required: true, trigger: 'change', message: "请选择节点类型" },
                ],
                district: [
                    { required: true, trigger: 'change', message: "地址位置请具体到区县" },
                ],
                publicIp: [
                    { required: true, trigger: 'blur', message: "请输入节点ip" },
                    {  max: 100, message: "节点ip长度最大100", trigger: "blur" },
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
                cloudType:[
                { required: true, trigger: 'change', message: "请选择云类型" },
                ]
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
            if(this.subchainDetail){
                this.queryParams.baseId=this.subchainDetail.subchainId
            }
            subchainNodeList(this.queryParams).then(res => {
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
        handleClose() {
            this.addShow = false
            this.$refs.chooseAddress.reset()
            this.$refs.addNodeForm.resetFields()
        },
        addNode() {
            this.addShow = true
            this.$nextTick(() => {
                this.$refs.addNodeForm.resetFields()
            })
        },
        confirmAddNode() {
            this.$refs.addNodeForm.validate(valid => {
                if (valid) {
                    this.addNodeForm.baseId = this.subchainDetail.subchainId
                    subchainNodeAdd(this.addNodeForm).then(res => {
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
                path: '/subChainDataManage/subchainNodeDetail',
                query: {
                    id: e.nodeAddress
                }
            })
        },
        del(e) {
            this.subchainId = e.id
            this.delShow = true
        },
        delClose() {
            this.delShow = false
        },
        agree() {
            let data = {
                id: this.subchainId
            }
            subchainNodeDel(data).then(res => {
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
.labelWidth130{
    ::v-deep.el-form-item__label {
        width: 130px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 130px;
    }
}
.labelWidth110{
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}
</style>