<template>
    <div class="app-container">
        <el-button type="primary" style="float:right" @click="submit">提交</el-button>
        <div class="title">
            <span class="lastRouter" @click="toLast">BID标识注册</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">新增</span>
        </div>
        <div class="resgitAddBg">
            <h3 class="contentTitle">基本信息</h3>
            <el-form :model="form" label-width="120px" :rules="formRules" ref="form">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="标识体系" prop="identitySystem">
                            <el-input v-model="form.identitySystem" placeholder="标识体系" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="用户身份BID" prop="userBid">
                            <el-input v-model="bid" placeholder="用户BID" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="BID标识类型" prop="identityType">
                            <el-select v-model="form.identityType" placeholder="请选择标识类型" style="width:100%"
                                :filterable="true" :clearable="true">
                                <el-option v-for="(item, index) in bidTypeList" :key="index" :label="item.lable"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="标识名称" prop="identityName">
                            <el-input v-model="form.identityName" placeholder="请输入标识名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="标识模板" prop="templateNo">
                            <el-select v-model="form.properties" placeholder="请选择标识类型" style="width:100%"
                                value-key="properties" @change="chooseTemplate">
                                <el-option v-for="(item, index) in templateList" :key="index" :label="item.templateName"
                                    :value="item.properties"></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <div @click="addTemplate" class="addTemplate">
                            去创建
                        </div>
                    </el-col>
                </el-row>
                <h3 class="contentTitle">标识数据</h3>
                <el-row v-for="(item, index) in form.dataList" :key="index">
                    <el-col :span="8">
                        <el-form-item :label="item.chineseName" :prop="`dataList[${index}].dataStr`"
                            v-if="item.dataType == '1'" :rules="item.rule.dataStr">
                            <el-input v-model="item.dataStr"></el-input>
                            <p class="notice">
                                字符串,最小长度为{{ item.minimumLength }},最大长度为{{ item.maximumLength }}</p>
                        </el-form-item>
                        <el-form-item :label="item.chineseName" :prop="`dataList[${index}].dataNumber`"
                            v-if="item.dataType == '2'" :rules="item.rule.dataNumber">
                            <el-input-number v-model="item.dataNumber" :min="item.minimumLength"
                                :max="item.maximumLength" label="请输入最小长度" style="width:100%" :step-strictly="true">
                            </el-input-number>
                            <p class="notice">
                                数值,最小为{{ item.minimumLength }}最大为{{ item.maximumLength }}</p>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { templateList, identityRegisterAdd } from "@/api/business/business.js"
import { mapState } from 'vuex';
export default {
    name: "Job",
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
        let equalTohanzi = (rule, value, callback) => {
            if (/[\u4E00-\u9FA5]/g.test(value)) {
                callback(new Error('请勿输入汉字！'));
            } else {
                callback();
            }
        };
        return {
            form: {
                identitySystem: 'BID',
                userBid: '',
                identityName: '',
                identityType: '',
                templateNo: '',
                dataList: [],
            },
            formRules: {
                identitySystem: [{ required: true }],
                // userBid: [{ required: true, trigger: "blur", message: "请输入用户BID" },
                // { required: true, validator: equalTohanzi, trigger: "blur" }],
                identityName: [{ required: true, trigger: "blur", message: "请输入标识名称" },
                {required:true,max:100,trigger:"blur",message:'长度最大100'},
                { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                identityType: [{ required: true, trigger: "blur", message: "请选择标识类型" }],
                templateNo: [{ required: true, trigger: "blur", message: "请选择模板标识" }],
            },
            bidTypeList: [
                { lable: '人', value: 101 },
                { lable: '企业', value: 102 },
                { lable: '节点', value: 103 },
                { lable: '智能设备', value: 104 },
                { lable: '智能合约', value: 105 },
                { lable: '图片', value: 201 },
                { lable: '视频', value: 202 },
                { lable: '文档', value: 203 },
                { lable: '资源数据', value: 204 },
                { lable: '凭证', value: 205 },
                { lable: 'AC号', value: 206 },
                { lable: '其他', value: 999 },
            ],
            templateList: [],
            bid:''
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.chainUser,
        })
    },
    created() {
        this.getTemplateList()
        if(this.userInfo){
            if(this.userInfo.did){
                this.bid = this.userInfo.did
            }
        }
    },
    methods: {
        getTemplateList() {
            templateList().then(res => {
                if (res.code == 200) {
                    this.templateList = res.rows
                }
            })
        },
        toLast() {
            this.$router.go(-1)
        },
        chooseTemplate(e) {
             //验证全是空格
        const equalToEmpty = (rule, value, callback) => {
            if (/^\s+$/gi
                .test(value)) {
                callback(new Error('不能全输入空格'));
            } else {
                callback();
            }
        };
            this.form.dataList = []
            e.map(item => {
                let obj = {
                    dataName: item.chineseName,
                    dataNumber: '',
                    dataStr: '',
                    chineseName: item.chineseName,
                    minimumLength: item.minimumLength,
                    maximumLength: item.maximumLength,
                    dataType: item.dataType,
                    rule: {
                        dataStr: [{ required: true, trigger: "blur", message: "请输入字符串" },
                        {
                            min: item.minimumLength,
                            max: item.maximumLength,
                            message: `字符串长度必须介于${item.minimumLength}和${item.maximumLength}之间`,
                            trigger: "blur",
                        },
                        { required: true, validator: equalToEmpty, trigger: "blur" }],
                        dataNumber: [
                            { required: true, trigger: "blur", message: "请输入数值", },
                        ]
                    }
                }
                this.form.templateNo = e.templateNo
                this.form.dataList.push(obj)
            })
            this.form.templateNo = e[0].templateNo
        },
        submit() {
            this.form.userBid = this.bid
            this.$refs.form.validate((valid) => {
                if (valid) {
                    identityRegisterAdd(this.form).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '添加BID标识注册成功',
                                type: 'success'
                            })
                            this.toLast()
                        }
                    })
                }
            });
        },
        addTemplate() {
            this.$router.push({
                path: '/identity/indentityTemplateAdd'
            })
        }
    }
};
</script>
<style scoped lang="scss">

.addTemplate {
    font-size: 12px;
    color: rgb(91, 152, 244);
    cursor: pointer;
    line-height: 40px;
    margin-left: 20px;
}

.notice {
    margin: 0;
    font-size: 12px;
    color: rgb(192, 196, 204);
}
</style>