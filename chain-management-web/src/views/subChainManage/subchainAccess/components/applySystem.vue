<template>
    <div class="app-container">
        <div class="title">
            <router-link to="/subchain/subchainAccess">
                <span class="lastRouter">子链接入</span>
            </router-link>
            <span class="currentRouter">/</span>
            <span class="currentRouter">子链申请</span>
        </div>
        <el-row>
            <el-col :span="24">
                <div class="header-step">
                    <div class="step-back">1</div>
                    <div class="border"></div>
                    <div class="step-back">2</div>
                    <div class="border"></div>
                    <div class="step-back1">3</div>
                </div>
                <div class="text-step">
                    <div>填写链基本信息</div>
                    <div>填写链系统信息</div>
                    <div>填写链应用信息</div>
                </div>
            </el-col>
        </el-row>
        <el-form :model="form" :rules="formRules" class="tableBg labelWidth120"  ref="form">
            <el-row type="flex" justify="center">
                <el-col :span="15" class="elRow">
                    <el-form-item label="子链访问地址" prop="visitUrl">
                        <el-input v-model="form.visitUrl" placeholder="请输入子链访问地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="15" class="elRow">
                    <el-form-item label="链开放类型" prop="publicStatus">
                        <el-radio v-model="form.publicStatus" label="0">许可</el-radio>
                        <el-radio v-model="form.publicStatus" label="1">开放</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="15" class="elRow">
                    <el-form-item label="AC号" prop="chainCode">
                        <el-input v-model="form.chainCode" placeholder="请输入AC号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="15" class="elRow">
                    <el-form-item label="解析服务对象">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column label="类型" width="180">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.type" placeholder="请选择类型">
                                        <el-option label="IPV4" value="IPV4"></el-option>
                                        <el-option label="IPV6" value="IPV6"></el-option>
                                        <el-option label="URL" value="URL"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="网络信息" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.type == 'URL'">
                                        <el-input v-model="scope.row.address" placeholder="请输入URL" style="width:90%"
                                            @change="checkAddress(scope.row, $event)">
                                        </el-input>
                                    </div>
                                    <div v-else>
                                        <el-input v-model="scope.row.ip" placeholder="请输入IP" style="width:45%"
                                            @change="checkIp(scope.row, $event)">
                                        </el-input>
                                        <el-input v-model="scope.row.port" placeholder="请输入端口号" style="width:45%"
                                            @change="checkPort(scope.row, $event)">
                                        </el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark" placeholder="请输入备注" style="width:150px"
                                        @change="checkRemark(scope.row, $event)">
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="right" width="180">
                                <template slot-scope="scope">
                                    <span @click="delTableData(scope)" class="add">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-icon class="el-icon-plus add" @click="addTableData"></el-icon>
                        <span class="add" @click="addTableData">新增</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="6" class="elRow">
                    <el-form-item>
                        <el-button @click="toUp">上一步</el-button>
                        <el-button type="primary" @click="toNext">下一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { minxData } from '../../../minxData/minxData'
import { encrypt } from '@/utils/jsencrypt';
export default {
    name: "accountCenter",
    mixins: [minxData],
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
            if (!/^[a-z0-9]{4}$/
                .test(value)) {
                callback(new Error('请输入正确的ac号格式'));
            } else {
                callback();
            }
        };
        return {
            hasPerimiss: false,
            creatShow: false,
            form: {
                visitUrl: '',
                publicStatus: '0',
                chainCode: '',
                ipv4List: '',
                ipv6List: '',
                urlList: ''
            },
            formRules: {
                visitUrl: [
                    { required: true, trigger: 'blur', message: "请输入子链访问地址" },
                    { max: 256, message: "子链访问地址最大为256", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                publicStatus: [
                    { required: true, trigger: 'change', message: "请选择链开放类型" },
                ],
                chainCode: [
                    { required: true, trigger: 'blur', message: "请输入AC号" },
                    { required: true, validator: equalToAC, trigger: "blur" }
                ]
            },
            tableData: [],
            ipv4List: [],
            ipv6List: [],
            urlList: []
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    beforeCreate() {

    },
    created() {
    },
    mounted() {
        window.SYSTEM_FORM = this.form;
        window.SYSTEM_URLTABLE = this.tableData
    },
    methods: {
        handleClose() {
            this.creatShow = false
        },
        toUp() {
            this.$emit('up')
        },
        toNext() {
            let flag = this.checkTableData()
            if (!flag) {
                this.$message({
                    message: '请输入完整的服务对象信息',
                    type: 'warning'
                })
                return
            } else {
                if (this.ipv4List.length != 0) {
                    let ipv4list = this.detalIpUrl(this.ipv4List, 'ipv4')
                    this.form.ipv4List = JSON.stringify(ipv4list)
                }
                if (this.ipv6List.length != 0) {
                    let ipv6list = this.detalIpUrl(this.ipv4List, 'ipv6')
                    this.form.ipv6List = JSON.stringify(ipv6list)
                }
                if (this.urlList.length != 0) {
                    let urlList = this.detalIpUrl(this.urlList, 'url')
                    this.form.urlList = JSON.stringify(urlList)
                }
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('next', this.form)
                }
            })
        },
        detalIpUrl(e, type) {
            if (type == 'ipv4' || type == 'ipv6') {
                let arr = []
                e.map(item => {
                    let obj = {
                        ip: item.ip,
                        port: item.port,
                        remark: item.remark
                    }
                    arr.push(obj)
                })
                return arr
            } else {
                let arr = []
                e.map(item => {
                    let obj = {
                        address: item.address,
                        remark: item.remark
                    }
                    arr.push(obj)

                })
                return arr
            }
        },
        checkTableData() {
            let flag = this.tableData.every(item => {
                if (item.type == 'IPV4' || item.type == 'IPV6') {
                    return item.type != '' && item.ip != '' && item.port != ''
                } else {
                    return item.type != '' && item.address != ''
                }
            })
            if (flag) {
                this.ipv4List = []
                this.ipv6List = []
                this.urlList = []
                this.tableData.map(item => {
                    if (item.type == 'IPV4') {
                        this.ipv4List.push(item)
                    }
                    if (item.type == 'IPV6') {
                        this.ipv6List.push(item)
                    }
                    if (item.type == 'URL') {
                        this.urlList.push(item)
                    }
                })
            }
            return flag
        },
        addTableData() {
            let obj = {
                ip: "",
                port: "",
                remark: "",
                type: "IPV4",
                address: ''
            }
            this.tableData.push(obj)
        },
        delTableData(e) {
            this.tableData.splice(e.$index, 1)
        },
        checkAddress(e, e1) {
            if (! /^(((ht|f)tps?):\/\/)([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\//.test(e1)) {
                this.$message({
                    message: '请输入正确的URL格式',
                    type: 'warning'
                })
                e.address = ''
            }

        },
        checkIp(e, e1) {
            if (e.type == 'IPV4') {
                if (!/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(e1)) {
                    this.$message({
                        message: '请输入正确的IPV4格式',
                        type: 'warning'
                    })
                    e.ip = ''
                }
            } else {
                if (!/(^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$)|(^\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$)/i
                    .test(e1)) {
                    this.$message({
                        message: '请输入正确的IPV6格式',
                        type: 'warning'
                    })
                    e.ip = ''
                }
            }
        },
        checkPort(e, e1) {
            if (!(/^[1-9]\d*$/.test(e1) && 1 <= 1 * e1 && 1 * e1 <= 65535)) {
                this.$message({
                    message: '请输入正确的端口格式',
                    type: 'warning'
                })
                e.port = ''
            }
        },
        checkRemark(e, e1) {
            if (/^\s+$/gi.test(e1)) {
                this.$message({
                    message: '请勿输入全空格',
                    type: 'warning'
                })
                e.remark = ''
            }
            if (e1.length > 100) {
                this.$message({
                    message: '备注长度最大100',
                    type: 'warning'
                })
                e.remark.slice(0, 100)
            }
        }
    },
};
</script>

<style scoped lang="scss">
.border {
    width: 180px;
    height: 2px;
    background: #dfecf7;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
}

.text-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 235px auto 222px;
}

.header-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 252px;
    margin-right: 252px;

    .step-back {
        background-image: url("../../../../assets/images/step.png");
        background-size: 60px 69px;
        width: 60px;
        height: 69px;
        font-size: 28px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .step-back1 {
        background-image: url("../../../../assets/images/unstep.png");
        background-size: 60px 69px;
        width: 60px;
        height: 69px;
        font-size: 28px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.elRow {
    margin-top: 5px;
}

.add {
    color: #2F88FF;
    cursor: pointer;
    margin-right: 10px;
}

.add:hover {
    color: #559EFF;
}
.labelWidth120{
    ::v-deep.el-form-item__label {
        width: 120px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 120px;
    }
}
</style>

