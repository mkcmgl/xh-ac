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
                    <div class="step-back">3</div>
                </div>
                <div class="text-step">
                    <div>填写链基本信息</div>
                    <div>填写链系统信息</div>
                    <div>填写链应用信息</div>
                </div>
            </el-col>
        </el-row>
        <el-form :model="form" :rules="formRules" class="tableBg labelWidth110"  ref="form">
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="应用名称" prop="applicationName">
                        <el-input v-model="form.applicationName" placeholder="请输入应用名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="应用方向" prop="direction">
                        <el-select v-model="form.direction" placeholder="选择应用方向" style="width:100%">
                            <el-option :label="item.lable" :value="item.value"
                                v-for="(item, index) in applicationDirection" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="应用简介" prop="introduction">
                        <el-input v-model="form.introduction" placeholder="请输入应用简介，限1024字符内" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="开发状态" prop="devState">
                        <el-radio v-model="form.devState" label="0">规划中</el-radio>
                        <el-radio v-model="form.devState" label="1">已开发</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="建设文档" prop="devState">
                        <FileUpload v-model="form.documentUrl" :limit="upLoadLimit" :fileSize="10"></FileUpload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="建设周期" prop="constructionPeriod">
                        <el-input v-model="form.constructionPeriod" placeholder="请输入建设周期" style="width:95%"></el-input><span class="fr">月</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="12" class="elRow">
                    <el-form-item label="发布时间" prop="publishTime">
                        <el-date-picker v-model="form.publishTime" type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
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
import FileUpload from '../../../../components/FileUpload/index.vue';
export default {
    name: "accountCenter",
    mixins: [minxData],
    components: { FileUpload },
    data() {
        //验证全是空格
        const equalToEmpty = (rule, value, callback) => {
            if (/^\s+$/gi
                .test(value)) {
                callback(new Error("不能全输入空格"));
            }
            else {
                callback();
            }
        };
        //验证正整数
        const equalToNumber = (rule, value, callback) => {
            if (!/^\+?[1-9]\d*$/
                .test(value)) {
                callback(new Error('请输入正整数'));
            } else {
                callback();
            }
        };
        return {
            hasPerimiss: false,
            creatShow: false,
            form: {
                applicationName: "",
                direction: "",
                introduction: "",
                devState: "0",
                documentUrl: "",
                constructionPeriod: "",
                publishTime: "",
            },
            formRules: {
                applicationName: [
                    { required: true, trigger: 'blur', message: "请输入应用名称" },
                    { max: 100, message: "应用名称长度最大为100", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                direction: [
                    { required: true, trigger: 'change', message: "请选择应用方向" },
                ],
                introduction: [
                    { required: true, trigger: 'blur', message: "请输入应用简介" },
                    { max: 1024, message: "应用简介长度最大为1024", trigger: "blur" },
                ],
                devState: [
                    { required: true, trigger: 'change', message: "请选择开发状态" },
                ],
                documentUrl: [
                    { required: true, trigger: 'change', message: "请上传建设文档" },
                ],
                constructionPeriod: [
                    { required: true, trigger: 'blur', message: "请输入建设周期" },
                    { required: true, validator: equalToNumber, trigger: "blur" }
                ],
                publishTime: [
                    { required: true, trigger: 'change', message: "请选择发布时间" },
                ],
            },
            tableData: [{
                ip: "",
                port: "",
                remark: "",
                type: "",
            }],
            upLoadLimit: 5
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
        window.APPLICA_FORM = this.form;
    },
    methods: {
        handleClose() {
            this.creatShow = false;
        },
        toUp() {
            this.$emit("up");
        },
        toNext() {
            this.$refs.form.validate(valid => {
                if (valid) {
                   this.$emit('next',this.form) 
                }
            });
        },
        addTableData() {
            let obj = {
                ip: "",
                port: "",
                remark: "",
                type: "",
            };
            this.tableData.push(obj);
        },
        delTableData(e) {
            this.tableData.splice(e, 1);
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
.labelWidth110{
    ::v-deep.el-form-item__label {
        width: 110px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 110px;
    }
}
</style>

