<template>
    <div class="app-container" v-loading="loading">
        <el-button type="primary" style="float:right" @click="toAuth" v-if="dataInfo.reviewStatus==0  ">审核</el-button>
        <div class="title">
            <span class="lastRouter" @click="toLast">接入审核</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">服务详情</span>
        </div>
        <el-row class="first">
            <el-col :span="2" style="height:100%" class="center">
                <el-image :src="iconUrl" class="iconImg"></el-image>
            </el-col>
            <el-col :span="19" style="height:100%">
                <h3 class="ServiceName">{{ dataInfo.serviceName }}</h3>
                <p class="describe">{{ dataInfo.description }}</p>
                <p class="serviceType">{{ dataInfo.typeName }}</p>
            </el-col>
        </el-row>
        <el-row class="second">
            <el-col :span="18" class="introduce">
                <el-tiptap v-model="dataInfo.introduction" :extensions="extensions" lang="zh" ref="tiptap"
                    :readonly="true" class="notice-content" />
            </el-col>
            <el-col :offset="1" :span="5" class="introduceElse" >

                <el-row>
                    <el-col :span="8" class="formTitle" style="margin-top:25px" :offset=1>服务商</el-col>
                    <el-col :span="15" style="margin-top:25px">
                        <span class="formContent">{{ dataInfo.serviceProvider }}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="formTitle" style="margin-top:14px" :offset=1>版本</el-col>
                    <el-col :span="15" style="margin-top:14px">
                        <span class="formContent">{{ dataInfo.version }}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="formTitle" style="margin-top:14px" :offset=1>审核状态</el-col>
                    <el-col :span="15" style="margin-top:14px">
                        <span class="formContent">{{
                            dataInfo.reviewStatus == 0 ? '待审核' : dataInfo.reviewStatus == 1 ?
                            '审核通过' : '审核驳回'
                            }}</span>
                    </el-col>
                </el-row>



                <el-row v-if="dataInfo.reviewStatus == 2">
                    <el-col :span="8" class="formTitle" style="margin-top:14px" :offset=1>驳回原因</el-col>
                    <el-col :span="15" style="margin-top:14px">
                        <span class="formContent">{{
                            dataInfo.reviewOpinion
                        }}</span>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>


        <!-- 审核 -->
        <el-dialog title="审核" :visible.sync="authShow" width="28%" :before-close="close" top="33vh"
            :append-to-body="true" z-index="99999">
            <div class="line"></div>
            <el-form ref="authFormRef" :model="authForm" :rules="authFormRules" label-width="110px"
                label-position="left" v-show="authType == '1'">
                <el-form-item label="审核意见">
                    <el-radio-group v-model="authType" @change="changeType">
                        <el-radio label="1">通过</el-radio>
                        <el-radio label="2">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-form ref="authFormRef1" :model="authForm1" :rules="authFormRules1" label-width="110px"
                label-position="left" v-show="authType == '2'">
                <el-form-item prop="reviewStatus" label="审核意见">
                    <el-radio-group v-model="authType">
                        <el-radio label="1">通过</el-radio>
                        <el-radio label="2">驳回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="reviewOpinion" label="驳回原因">
                    <el-input v-model="authForm1.reviewOpinion" type="textarea" :rows="2" placeholder="请输入驳回原因">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="buttonline"></div>
            <div class="btnWarp">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="toReview">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { ServiceDetail, getService, showUserServiceStatus } from "@/api/publicService/publicService.js"
import { review } from "@/api/access/access.js"
import { changeTypeName, loadFile } from '@/utils/public.js'
import { Editor, Toolbar } from '@wangeditor/editor'
import { resetForm } from '@/utils/ruoyi';

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
    name: "requestDetail",
    data() {
        return {
            iconUrl: require('../../assets/images/contentEmpty.png'),
            ServiceId: '',
            dataInfo: {

            },
            loading: true,
            authShow: false,
            getStatus: '',
            authForm: {
                userId: '',
                serviceId: '',
                reviewStatus: '1',
                reviewOpinion: '',
            },
            authForm1: {
                userId: '',
                serviceId: '',
                reviewStatus: '2',
                reviewOpinion: '',

            },
            authFormRules: {
                reviewStatus: [{ trigger: "blur", message: "请选择通过与否" }],
            },
            authFormRules1: {
                reviewStatus: [{ trigger: "blur", message: "请选择通过与否" }],
                reviewOpinion: [{ required: true, trigger: "blur", message: "请输入审核意见" },
                {
                    max: 100,
                    message: "审核意见长度最大100",
                    triggevr: "blur",
                },
                ]
            },
            authType: '1',
            extensions: [
                new Doc(), // 必须项
                new Text(), // 必须项
                new Paragraph(), // 必须项
                new Heading({ level: 6 }), // 标题
                new Bold({}), // 加粗   在气泡菜单中渲染菜单按钮
                new Underline({ menubar: false }), // 下划线  , menubar: false 在气泡菜单而不在菜单栏中渲染菜单按钮
                new Italic({}), // 斜体
                new Strike({}), // 删除线
                new ListItem(), // 使用列表必须项
                new BulletList({}), // 无序列表
                new OrderedList({}), // 有序列表
                new Link(), // 链接
                new Image(), // 图片
                new CodeBlock({}), // 代码块
                new Blockquote(), // 引用
                new TodoItem(), // 任务列表必须项
                new TodoList(), // 任务列表
                new TextAlign({}), // 文本对齐方式
                new FontSize({}), // 字号
                new FontType({}), // 字体
                new Fullscreen(), // 全屏
                new TextHighlight({}), // 文本高亮
                new TextColor({}), // 文本颜色
                new FormatClear({}), // 清除格式
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
            authData: {
                applyDate: '',
                openStatus: '',
                reviewData: '',
                reviewStatus: '',
                serviceId: Number,
                serviceName: '',
                userId: Number,
                userName: '',
            },


        };
    },
    created() {
        if (this.$route.query) {
            this.ServiceId = this.$route.query.serviceId
            this.authData.userId = this.$route.query.applyBy
            this.authData.serviceId = this.ServiceId

            // let dataList = this.$route.query.data
            // this.authData = { ...this.authData, ...dataList }
            // this.ServiceId = this.authData.serviceId
            this.fetchData()
            // this.fetchUserStatus()
        }

    },
    mounted() {
        this.$refs.tiptap.editor.options.editable = false
    },
    methods: {
        fetchData() {
            let data = {
                serviceId: this.ServiceId
            }
            this.loading=true
            ServiceDetail(data).then(res => {
                if (res.code == 200) {
                    // console.log(res)
                    this.dataInfo = res.data
                    let name = changeTypeName(this.dataInfo)
                    this.$set(this.dataInfo, 'typeName', name)
                    let data1 = {
                        showId: this.dataInfo.showId,
                        type: 'icon'
                    }
                    loadFile(data1).then(res => {
                        this.iconUrl = res
                    })
                    this.loading=false
                }
            })

        },
        //判断用户是否获取过服务
        fetchUserStatus() {
            let data = {
                serviceId: this.ServiceId
            }
            showUserServiceStatus(data).then(res => {
                this.getStatus = res.data.openStatus
            })
        },
        //获取图标
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
                    let blob = new Blob([res.data], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(blob);
                    resolve(imageUrl)
                }).catch(err => {
                    reject(error)
                })
            })

        },
        toLast() {
            this.$router.go(-1)
        },
        // toEdit() {
        //     this.$router.push({
        //         path: '/requestService/addService',
        //         query: {
        //             data: this.ServiceId
        //         }
        //     })
        // },
        toAuth() {
            this.authShow = true
            this.$refs.authFormRef?.resetFields();
            this.$refs.authFormRef1?.resetFields();
            this.authForm.reviewStatus = '1'
        },

        close() {

            this.authType = "1"
            this.authShow = false
        },
        changeType(e) {
            this.authForm1.reviewOpinion = ''
        },
        //审核
        toReview() {
            let flag = this.authType
            switch (flag) {
                case '1':
                    this.$refs.authFormRef.validate((valid) => {
                        if (valid) {
                            this.authForm.userId = this.authData.userId
                            this.authForm.serviceId = this.authData.serviceId
                            this.authForm.reviewStatus = '1'
                            review(this.authForm).then(res => {
                                // console.log(res)
                                if (res.code == 200) {
                                    this.$message({
                                        message: '审核成功',
                                        type: 'success',
                                        customClass: 'global-messageZindex'
                                    })
                                    this.$router.go(-1)
                                }
                            })
                        }
                    })
                    break;
                case '2':
                    this.$refs.authFormRef1.validate((valid) => {
                        if (valid) {
                            this.authForm1.userId = this.authData.userId
                            this.authForm1.serviceId = this.authData.serviceId
                            this.authForm1.reviewStatus = '2'
                            review(this.authForm1).then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                        message: '审核成功',
                                        type: 'success',
                                        customClass: 'global-messageZindex'
                                    })
                                    this.$router.go(-1)
                                }
                            })
                        }
                    })
            }
        }


    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";

.first {
    height: 140px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 0 auto;
}

.iconImg {
    width: 70px;
    height: 70px;
}

.iconPosition {
    text-align: center;
}

.ServiceName {
    height: 25px;
    font-size: 18px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 25px;
    margin-top: 33px;
}

.describe {
    margin-top: 5px;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #333333;
}

.serviceType {
    margin-top: 5px;
    font-size: 12px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #999999;
}

.second {
    height: 60vh;
    opacity: 1;
    margin: 20px auto;
}

.introduce {
    height: 100%;
    border-radius: 4px 4px 4px 4px;
    background: #FFFFFF;
}

.introduceElse {
    border-radius: 4px 4px 4px 4px;
    background: #FFFFFF;
}

#introductionWarp {
    text-align:center &>>>p {
        margin: 0 0 !important;
        text-align: center !important;
    }
}

.el-tiptap-editor {
    ::v-deep.el-tiptap-editor__menu-bar {
        display: none !important;
    }

    ::v-deep.el-tiptap-editor__footer {
        display: none !important;
    }

    ::v-deep.el-tiptap-editor__menu-bubble {
        display: none;
    }

}

::v-deep.el-popover {
    display: none !important;

    .el-tiptap-image-popper {
        display: none !important;
        ;
    }
}

::v-deep.el-tiptap-image-popper {
    display: none !important;
}

::v-deep.el-popper::v-deep.image-bubble-menu {
    display: none !important;
}

::v-deep.el-popover::v-deep.image-bubble-menu {
    display: none !important;
}
</style>