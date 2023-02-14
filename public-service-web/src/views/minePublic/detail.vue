<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">我的服务</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">服务详情</span>
        </div>
        <el-row class="serviceStatus" v-if="serviceInfo.openStatus != 3">
            <el-col :span="1" class="serviceStatusIcon">
                <el-icon class="el-icon-circle-check" style="color:rgb(68,136,93)"></el-icon>
            </el-col>
            <el-col :span="23" class="serviceStatusWord">
               {{ serviceInfo.openStatus == 0 ? '未开通' : serviceInfo.openStatus == 1 ? '已开通' : '审核中'}}
            </el-col>
        </el-row>
        <el-row class="serviceError" v-if="serviceInfo.openStatus == 3">
            <el-col :span="1" class="serviceStatusIcon">
                <el-icon class="el-icon-circle-close" style="color:rgb(206,57,48)"></el-icon>
            </el-col>
            <el-col :span="23" class="serviceStatusWord">
                服务开通失败,您可以<span class="toOther" @click="toDtail">重新开通</span>
            </el-col>
        </el-row>
        <div class="contactInfo" v-if="serviceInfo.openStatus == 1">
            <h3 class="contentTitle">服务信息</h3>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">服务名称</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ serviceInfo.serviceName }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">开通时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ serviceInfo.openDate }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="3">
                    <span class="formTitle">免登地址</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent toOther" @click="toOther">
                        {{ serviceInfo.accessAddress }}
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { redirectService } from "@/api/login.js"
import { myServiceDetail } from "../../api/mineService/mineService";
export default {
    name: "Job",
    data() {
        return {
            serviceInfo: {},
            serviceId: ''
        };
    },
    created() {
        if (this.$route.query) {
            this.serviceId = this.$route.query.data
            let data={
                serviceId:this.serviceId
            }
            myServiceDetail(data).then(res => {
                // console.log(`output->res`,res)
                if (res.code == 200) {
                    this.$nextTick(() => {
                        this.serviceInfo = res.data
                    })
                }
            })
        }
    },
    mounted() {
    },
    methods: {
        toLast() {
            this.$router.go(-1)
        },
        toDtail() {
            this.$router.push({
                path: '/publicService/detail',
                query: {
                    data: this.serviceId
                }
            })
        },
        toOther() {
            redirectService(this.serviceId).then(res => {
                if (res.code == 200) {
                    let url = res.data.redirectUri
                    let code = res.data.code
                    let toUrl = `//${url}?code=${code}`
                    window.open(toUrl)
                }
            })
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";


.contactInfo {
    height: 130px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 20px auto;
    padding: 15px 0 0 25px;
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

.serviceError {
    width: 95%;
    height: 50px;
    margin: 20px auto;
    border: 1px solid rgb(247, 207, 207);
    background-color: rgb(254, 259, 259);
    line-height: 50px;
}

.serviceErrorIcon {}
</style>