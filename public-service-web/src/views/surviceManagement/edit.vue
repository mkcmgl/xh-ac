<template>
    <div class="app-container">
        <el-button type="primary" style="float:right" @click="submit" :loading="btnLoading">提交</el-button>
        <div class="title">
            <span class="lastRouter" @click="toLast">服务管理</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">{{ creatFlag ? '新增' : '编辑' }}</span>
        </div>
        <el-form :model="form" label-width="160px" :rules="formRules" ref="form">
            <div class="infoBg">
                <h3 class="contentTitle">基本信息</h3>
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="服务名称" prop="serviceName">
                            <el-input v-model="form.serviceName" placeholder="请输入服务名称">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="描述" prop="description">
                            <el-input v-model="form.description" placeholder="请输入描述" type="textarea">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="排序" prop="sort">
                            <el-input-number v-model="form.sort" :min="1" :max="99999" label="排序" step-strictly></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="24">
                        <el-form-item label="服务分类" prop="typeId">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                @change="handleCheckAllChange">
                                全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="form.typeId" @change="handleCheckedTypeChange">
                                <el-checkbox v-for="item in typeList" :label="item.value" :key="item.value">{{
                                        item.lable
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="24">
                        <el-form-item label="服务图标" prop="icon" ref="iconChange">
                            <el-upload ref="iconPicture" action="#" list-type="picture-card" :auto-upload="false"
                                :on-remove="handleRemove" :limit="1" :on-change="handleSuccess"
                                :class="{ disabled: uploadDisabled1 }">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="24">
                        <el-form-item label="服务展示图片" prop="image" ref="imageChange">
                            <el-upload ref="imagePicture" action="#" list-type="picture-card" :auto-upload="false"
                                :on-remove="handleImageRemove" :limit="1" :on-change="handleImageSuccess"
                                :class="{ disabled: uploadDisabled2 }">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleImageRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

            </div>
            <div class="infoBg">
                <h3 class="contentTitle">版本信息</h3>
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="服务商名称" prop="serviceProvider">
                            <el-input v-model="form.serviceProvider" placeholder="请输入服务商名称">

                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="版本号" prop="version">
                            <el-input v-model="form.version" placeholder="请输入版本号">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="infoBg">
                <h3 class="contentTitle">交付信息</h3>
                <el-row style="margin-top:5px">
                    <el-col :span="8">
                        <el-form-item label="交互方式" prop="paymentType">
                            <el-radio v-model="form.paymentType" :label="1">SaaS交付</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="使用地址" prop="accessAddress">
                            <el-input v-model="form.accessAddress" placeholder="请输入使用地址">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="infoBg" style="margin-bottom:50px">
                <el-row style="margin-top:5px">
                    <el-col :span="24">
                        <el-form-item label="介绍" prop="introduction" label-width="50px">
                            <el-tiptap v-model="form.introduction" :extensions="extensions" lang="zh" ref="tiptap" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { judgeType } from '@/utils/public';
import { create, update } from '@/api/manageService/manageService.js'
import { ServiceDetail } from "@/api/publicService/publicService.js"
import { Editor, Toolbar } from '@wangeditor/editor'
import {
    ElementTiptap,
    // 需要的 extensions
    Doc,
    Text,
    Paragraph,
    Heading,
    Bold,
    Underline,
    Italic,
    Strike,
    ListItem,
    BulletList,
    OrderedList,
    Link,
    Image,
    CodeBlock,
    Blockquote,
    TodoItem,
    TodoList,
    TextAlign,
    FontSize,
    FontType,
    Fullscreen,
    TextHighlight,
    TextColor,
    FormatClear,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    History,
    TrailingNode,
    HardBreak,
    HorizontalRule,
    LineHeight,
    Indent
} from 'element-tiptap';
export default {
    components: { Editor, Toolbar },
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
        //验证富文本全是空格
        const equaltestToEmpty = (rule, value, callback) => {
            let text = this.$refs.tiptap.editor.state.doc.textContent
            if (/^\s+$/gi
                .test(text)) {
                callback(new Error('不能全输入空格'));
            } else {
                callback();
            }
        };
        //验证富文本长度
        const validataWordNumber = (rule, value, callback) => {
            let introLengh = this.$refs.tiptap.editor.state.doc.textContent.length
            if (introLengh > 10000) {
                callback(new Error('长度最大10000'));
            } else {
                callback();
            }
        };
        //验证富文本字节大小
        const validataWordLength = (rule, value, callback) => {
             var iLength = 0;  //记录字符的字节数
            for (var i = 0; i < value.length; i++)  //遍历字符串中的每个字符
            {
                if (value.charCodeAt(i) > 255)   //如果当前字符的编码大于255
                {
                    iLength += 2;    //所占字节数加2
                }
                else {
                    iLength += 1;   //否则所占字节数加1
                }
            }
             iLength;   //返回字符所占字节数
            if (iLength > 3145728) {
                callback(new Error('富文本过大,建议图片总大小在2m以下'));
            } else {
                callback();
            }
        };
        return {
            loading: true,
            uploadDisabled1: false,
            uploadDisabled2: false,
            btnLoading: false,
            form: {
                serviceName: '',
                description: '',
                typeId: [],
                serviceProvider: '',
                version: '',
                introduction: '',
                paymentType: 1,
                accessAddress: '',
                iconExtension: '',
                imageExtension: '',
                icon: null,
                image: null,
                sort: '',
                showId: '',
                serviceId: ''
            },
            iconData: null,
            imageData: null,
            formRules: {
                serviceName: [
                    { required: true, trigger: "blur", message: "服务名称" },
                    { max: 50, trigger: "blur", message: "长度最大50" },
                    { required: true, validator: equalToEmpty }
                ],
                description: [
                    { required: true, trigger: "blur", message: "请输入描述" },
                    { max: 200, trigger: "blur", message: "长度最大200" },
                    { required: true, validator: equalToEmpty }
                ],
                typeId: [
                    { required: true, trigger: "blur", message: "请选择类别" },

                ],
                serviceProvider: [
                    { required: true, trigger: "blur", message: "请输入服务商" },
                    { max: 20, trigger: "blur", message: "长度最大20" },
                    { required: true, validator: equalToEmpty }
                ],
                version: [
                    { required: true, trigger: "blur", message: "请输入版本" },
                    { max: 20, trigger: "blur", message: "长度最大20" },
                    { required: true, validator: equalToEmpty }
                ],
                sort: [
                    { required: true, trigger: "blur", message: "请选择排序" },
                ],
                introduction: [
                    { required: true, trigger: "blur", message: "请输入介绍" },
                    { required: true, validator: equalToEmpty }
                ],
                paymentType: [
                    { required: true, trigger: "blur", message: "请选择支付方式" },
                ],
                accessAddress: [
                    { required: true, trigger: "blur", message: "请输入地址" },
                    { max: 2083, trigger: "blur", message: "长度最大2083" },
                    { required: true, validator: equalToEmpty }
                ],
                icon: [
                    { required: true, trigger: "blur", message: "请选择服务图标" },
                ],
                image: [
                    { required: true, trigger: "blur", message: "请选择服务展示图片" },
                ],
                introduction: [
                    { required: true, trigger: "blur", message: "请输入介绍" },
                    { required: true, validator: validataWordNumber },
                    { required: true, validator: equaltestToEmpty },
                    { required: true, validator: validataWordLength },
                ]
            },
            fileList: [],
            checkAll: false,
            typeList: [
                { lable: '数字化资产', value: '1' },
                { lable: '供应链管理', value: '2' },
                { lable: '供应链金融', value: '3' },
                { lable: '电子政务', value: '4' },
                { lable: '防伪朔源', value: '5' },
                { lable: '采购招标', value: '6' },
                { lable: '公益慈善', value: '7' },
                { lable: '版权保护', value: '8' },
                { lable: '电子存证', value: '9' },
                { lable: '工具', value: '10' },
                { lable: '医疗健康', value: '11' },
                { lable: '其他', value: '12' },
            ],
            isIndeterminate: false,
            typeId: [],
            extensions: [
                new Doc(), // 必须项
                new Text(), // 必须项
                new Paragraph(), // 必须项
                new Heading({ level: 6 }), // 标题
                new Bold({ bubble: true }), // 加粗 bubble: true 在气泡菜单中渲染菜单按钮
                new Underline({ bubble: true, menubar: false }), // 下划线 bubble: true, menubar: false 在气泡菜单而不在菜单栏中渲染菜单按钮
                new Italic({ bubble: true }), // 斜体
                new Strike({ bubble: true }), // 删除线
                new ListItem(), // 使用列表必须项
                new BulletList({ bubble: true }), // 无序列表
                new OrderedList({ bubble: true }), // 有序列表
                // new Link(), // 链接
                new Image(), // 图片
                new CodeBlock({ bubble: true }), // 代码块
                new Blockquote(), // 引用
                new TodoItem(), // 任务列表必须项
                new TodoList(), // 任务列表
                new TextAlign({ bubble: true }), // 文本对齐方式
                new FontSize({ bubble: true }), // 字号
                new FontType({ bubble: true }), // 字体
                new Fullscreen(), // 全屏
                new TextHighlight({ bubble: true }), // 文本高亮
                new TextColor({ bubble: true }), // 文本颜色
                new FormatClear({ bubble: true }), // 清除格式
                new Table({ resizable: true }), // 表格
                new TableHeader(), // 表格必须项
                new TableCell(), // 表格必须项
                new TableRow(), // 表格必须项
                new History(), // 撤销
                new TrailingNode(), // 重做
                new HardBreak(), // 分割线
                new HorizontalRule(), // 行距
                new LineHeight(), // 增加缩进
                new Indent() // 减少缩进
            ],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            creatFlag: false,
            token: ''
        };
    },
    created() {
        this.token = getToken()
        if (this.$route.query) {
            this.ServiceId = this.$route.query.data
            if (this.ServiceId) {
                this.fetchData()
            } else {
                this.creatFlag = true
            }

        }
    },
    methods: {
        fetchData() {
            let data = {
                serviceId: this.ServiceId
            }
            ServiceDetail(data).then(res => {
                if (res.code == 200) {
                    let obj = res.data
                    this.$set(obj, 'icon', null)
                    this.$set(obj, 'image', null)
                    this.$set(obj, 'iconExtension', '')
                    this.$set(obj, 'imageExtension', '')
                    obj.typeId = obj.typeId.split(',')
                    let data1 = {
                        showId: res.data.showId,
                        type: 'icon'
                    }
                    let data2 = {
                        showId: res.data.showId,
                        type: 'image'
                    }
                    this.loadFile(data1).then(blob => {
                        //对返回的blob进行处理回显到上传组件里，格式和上传的时候保持一致
                        let file = new window.File([blob], 'iconImage', { type: blob.type })
                        const imageUrl = URL.createObjectURL(blob);
                        let fileData = {
                            rows: file,
                            url: imageUrl,
                            status: "ready",
                            size: file.size,
                            name: file.name,
                            percentage: 0,
                            uid: 1
                        }
                        let strArr = file.type.split('/')
                        obj.iconExtension = strArr[1]
                        obj.icon = file
                        this.$refs.iconPicture.uploadFiles.push(fileData)
                        this.form.icon = file
                        this.form.iconExtension = strArr[1]
                        this.uploadDisabled1 = true
                    })
                    this.loadFile(data2).then(blob => {
                        //对返回的blob进行处理回显到上传组件里，格式和上传的时候保持一致
                        let file = new window.File([blob], 'pictureImage', { type: blob.type })
                        const imageUrl = URL.createObjectURL(blob);
                        let fileData = {
                            rows: file,
                            url: imageUrl,
                            status: "ready",
                            size: file.size,
                            name: file.name,
                            percentage: 0,
                            uid: 1
                        }
                        let strArr = file.type.split('/')
                        obj.imageExtension = strArr[1]
                        obj.image = file
                        this.$refs.imagePicture.uploadFiles.push(fileData)
                        this.form.image = file
                        this.form.imageExtension = strArr[1]
                        this.uploadDisabled2 = true
                    })
                    Object.keys(obj).forEach(key => {
                        if (obj[key]) {
                            this.form[key] = obj[key]
                        }
                    })
                }
            })

        },
        //获取图标图片
        loadFile(data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_BASE_API + 'publicService/v1/getIconOrImage',
                    responseType: 'blob',
                    data,
                    headers: {
                        Accept: 'application/octet-stream',
                        Authorization: 'Bearer ' + this.token,   // 获取token
                    },
                }).then(res => {
                    let blob = new Blob([res.data], { type: res.data.type });
                    resolve(blob)
                }).catch(err => {
                    reject(error)
                })
            })

        },
        toLast() {
            this.$router.push({
                path: '/manageService/list'
            })
        },
        submit() {
            if (this.creatFlag) {
                this.form.serviceId = ''
            } else {
                this.form.serviceId = this.ServiceId
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.btnLoading = true
                    let formData = new FormData()
                    Object.keys(this.form).forEach(key => {
                        formData.append(key, this.form[key])
                    })
                    if (this.creatFlag) {
                        create(formData).then(res => {
                            if (res.code == 200) {
                                this.btnLoading = false
                                this.$router.go(-1)
                            }
                        }).catch(err => {
                            this.btnLoading = false
                        })
                    } else {
                        update(formData).then(res => {
                            if (res.code == 200) {
                                this.btnLoading = false
                                this.$router.push({
                                    path: '/manageService/list'
                                })
                            }
                        }).catch(err => {
                            this.btnLoading = false
                        })
                    }

                }

            });
        },
        //全选
        handleCheckAllChange(val) {
            this.form.typeId = val ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] : [];
            this.isIndeterminate = false;
        },
        handleCheckedTypeChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.form.typeId.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < 12;
        },
        //预览图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //移除服务图标
        handleRemove(file) {
            let uploadFiles = this.$refs.iconPicture.uploadFiles
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i]['url'] == file.url) {
                    uploadFiles.splice(i, 1)
                }
            }
            this.form.icon = null
            this.uploadDisabled1 = false
        },
        //图标上传处理
        handleSuccess(file) {
            let flag = judgeType(file.raw.type)
            if (!flag) {
                this.$message.error('上传文件只能是JPG、JPEG、PNG格式!');
                this.$refs.iconPicture.uploadFiles = []
                return
            }
            const isLt = file.size / 1024 < 200;
            if (!isLt) {
                this.$message.error(`上传文件大小不能超过 ${200} KB!`);
                this.$refs.iconPicture.uploadFiles = []
                return false;
            }
            let fileData = file.raw
            let strArr = fileData.type.split('/')
            this.form.imageExtension = strArr[1]
            this.form.icon = fileData
            this.uploadDisabled1 = true
            this.$refs.iconChange.clearValidate()
        },
        //移除服务图片
        handleImageRemove(file) {
            let uploadFiles = this.$refs.imagePicture.uploadFiles
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i]['url'] == file.url) {
                    uploadFiles.splice(i, 1)
                }
            }
            this.form.image = null
            this.uploadDisabled2 = false
        },
        //图片上传处理
        handleImageSuccess(file) {
            let flag = judgeType(file.raw.type)
            if (!flag) {
                this.$message.error('上传文件只能是JPG、JPEG、PNG格式!');
                this.$refs.imagePicture.uploadFiles = []
                return
            }
            const isLt = file.size / 1024 < 200;
            if (!isLt) {
                this.$message.error(`上传文件大小不能超过 ${200} KB!`);
                this.$refs.imagePicture.uploadFiles = []
                return false;
            }
            let fileData = file.raw
            let strArr = fileData.type.split('/')
            this.form.iconExtension = strArr[1]
            this.form.image = fileData
            this.uploadDisabled2 = true
            this.$refs.imageChange.clearValidate()
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";

.infoBg {
    padding: 15px 0 0 25px;
    background: #fff;
    border-radius: 4px 4px 4px 4px;
    margin: 20px auto;
}

.disabled {
    ::v-deep .el-upload--picture-card {
        display: none !important;
    }
}
</style>