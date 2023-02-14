<template>
    <div class="app-container">
        <el-button type="primary" style="float:right" @click="submit">提交</el-button>
        <div class="title">
            <span class="lastRouter" @click="toLast">BID标识模板</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">新增</span>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">基本信息</h3>
            <el-form :model="form" label-width="120px" :rules="formRules" ref="form">
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="模板名称" prop="templateName">
                            <el-input v-model="form.templateName" placeholder="请输入模板名称">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="描述" prop="description">
                            <el-input v-model="form.description" placeholder="请输入模板名称" type="textarea">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">数据属性</h3>
            <el-table :data="tableList" ref="tableList" max-height="500px">
                <el-table-column label="中文名称" prop="chineseName">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.chineseName" placeholder="请输入中文名称"
                            @input="chineseNameChange(scope.row, $event)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="英文名称" prop="englishName">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.englishName" placeholder="请输入英文名称"
                            @input="englishNameChange(scope.row, $event)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="数据类型" prop="dataType">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.dataType" placeholder="请选择数据类型" @change="chooseType(scope.row)">
                            <el-option label="字符串" value="1"></el-option>
                            <el-option label="数字" value="2"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="最小长度" prop="minimumLength">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.minimumLength" @change="minMum(scope.row, $event)"
                            :min="scope.row.min" :max="scope.row.max" label="请输入最小长度" style="width:90%" :step-strictly="true">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="最大长度" prop="maximumLength">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.maximumLength" @change="maxMum(scope.row, $event)"
                            :min="scope.row.min1" :max="scope.row.max1" label="请输入最大长度" style="width:90%" :step-strictly="true">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="minimumLength">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="deleteData(scope.$index)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="addData" @click="addData">
                <el-icon class="el-icon-plus"></el-icon>添加一行数据
            </div>
        </div>
    </div>
</template>

<script>
import { templateAdd } from '@/api/business/business.js'
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
        return {
            detailInfo: {
                templateName: '',
                description: '',
                properties: null
            },
            loading: true,
            tableList: [
                {
                    chineseName: '',
                    englishName: '',
                    dataType: '',
                    maximumLength: 1,
                    minimumLength: 1,
                    min: 1,
                    max: 199,
                    min1: 1,
                    max1: 200
                }
            ],
            form: {
                templateName: '',
                description: '',
                properties: null
            },
            formRules: {
                templateName: [
                    { required: true, trigger: "blur", message: "请输入模板名称" },
                    { required: true, validator: equalToEmpty, trigger: "blur" },
                    {max:50,trigger: "blur", message: "最大长度50"}
                ],
                description: [{ validator: equalToEmpty, trigger: "blur" },
                 {max:500,trigger: "blur", message: "最大长度500"}]
            },
            tableForm: {

            },

        };
    },
    created() {

    },
    methods: {
        toLast() {
            this.$router.go(-1)
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.properties = this.tableList
                }
                templateAdd(this.form).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '添加模板成功',
                            type: 'success'
                        })
                        this.toLast()
                    }
                })
            });
        },
        addData() {
            let data = {
                chineseName: '',
                englishName: '',
                dataType: '',
                maximumLength: 1,
                minimumLength: 1,
                min: 1,
                max: 199,
                min1: 1,
                max1: 200
            }
            this.tableList.push(data)
            this.$refs.tableList.doLayout()
        },
        deleteData(e) {
            if(this.tableList.length>1){
                this.tableList.splice(e, 1)
            }else{
                this.$message({
                    message:'至少填写一条数据',
                    type:'warning'
                })
            }
        },
        chineseNameChange(e, e1) {
            e.chineseName = e1.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
            if (e.chineseName.length > 50) {
                this.$message({
                    message: '中文名称长度最大50',
                    type: 'warning'
                })

                e.chineseName = e1.slice(0, 50)
            }
        },
        englishNameChange(e, e1) {
            let test1 = /^[0-9a-zA-Z_]{1,}$/
            if (test1.test(e1)) {

            } else {
                this.$message({
                    message: '只能输入英文数字下划线',
                    type: 'warning'
                })
                e.englishName = ''
            }
            if (e.englishName.length > 50) {
                this.$message({
                    message: '英文名称长度最大50',
                    type: 'warning'
                })
                e.englishName = e1.slice(0, 50)
            }
        },
        maxMum(e, e1) {
            if (e.dataType == undefined || e.dataType == null || e.dataType == '') {
                this.$message({
                    message: '请先选择数据类型',
                    type: 'warning'
                })
                e.maximumLength = ''
                return
            }
            if (e.minimumLength > e.maximumLength) {
                this.$message({
                    message: '最小长度必须小于或等于最大长度',
                    type: 'warning'
                })
                e.maximumLength = ''
            }
        },
        minMum(e, e1) {
            if (e.dataType == undefined || e.dataType == null || e.dataType == '') {
                this.$message({
                    message: '请先选择数据类型',
                    type: 'warning'
                })
                e.minimumLength = ''
                return
            }
            if (e.minimumLength >e.maximumLength) {
                this.$message({
                    message: '最小长度必须小于或等于最大长度',
                    type: 'warning'
                })
                e.minimumLength =''
            }
        },
        chooseType(e) {
            if (e.dataType == '1') {
                e.max = 199
                e.max1 = 200
            } else {
                e.max = 99998
                e.max1 = 99999
            }
        }
    }
};
</script>
<style scoped lang="scss">

.addData {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    border: 1px dashed rgb(237, 237, 237);
    line-height: 40px;
    text-align: center;
    color: rgb(153, 153, 153);
    font-size: 12px;
    cursor: pointer;
}
</style>