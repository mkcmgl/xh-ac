<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter" @click="toLast">骨干链管理用户列表</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">基本信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">账号</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !userInfo.userId ? '---' : userInfo.userId }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">用户BID</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !userInfo.did ? '---' : userInfo.did }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">手机号</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !userInfo.phonenumber ? '---' : userInfo.phonenumber }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">注册时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !userInfo.createTime ? '---' : userInfo.createTime }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">邮箱</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !userInfo.email ? '---' : userInfo.email }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">认证信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">用户类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ userInfo.authType ? userInfo.authType == 101 ? '个人认证' : '企业认证' : '---' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">认证状态</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        <span v-if="userInfo.authStatus == 0 || !userInfo.authStatus">未认证</span>
                        <span v-if="userInfo.authStatus == 1">已认证</span>
                        <span v-if="userInfo.authStatus == 2">认证中</span>
                        <span v-if="userInfo.authStatus == 3">认证未通过</span>
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">{{ userInfo.authType == 101 ? '真实姓名' : '企业名称' }}</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent" v-if="userInfo.authType == 101">
                        {{ !userInfo.realName ? '---' : userInfo.realName }}
                    </span>
                    <span class="formContent" v-if="userInfo.authType == 102">
                        {{ !userInfo.org ? '---' : userInfo.org }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">认证审核时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !userInfo.reviewDate ? '---' : userInfo.reviewDate }}
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { chainUserDetail } from "@/api/business/business.js"

export default {
    name: "Job",
    data() {
        return {
            userInfo: {
                phonenumber: '',
                email: '',
                createTime: '',
                authStatus: '',
                realName: '',
                reviewDate: '',
                authType: '',
                did: '',
                userId: ''
            }
        };
    },
    created() {
        if (this.$route.query.data) {
            let param = {
                userId: this.$route.query.data
            }
            chainUserDetail(param).then(res => {
                if (res.code == 200) {
                    this.userInfo = res.data
                }
            })
        }
    },
    methods: {
        toLast() {
            this.$router.go(-1)
        }
    }
};
</script>
<style scoped lang="scss">
</style>