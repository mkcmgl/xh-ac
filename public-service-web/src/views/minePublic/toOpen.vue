<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">我的服务</span>
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
            <el-col :span="3" style="height:100%" class="center">
                <el-button type="primary" @click="getService">{{ getStatus == 0 || 2 ? '获取' : '使用' }}</el-button>
            </el-col>
        </el-row>
        <el-row class="second">
            <el-col :span="19" class="introduce">
                <div v-html="dataInfo.introduction" id="introductionWarp"></div>
            </el-col>
            <el-col :offset="1" :span="4" class="introduceElse">
                <el-row>
                    <el-col :span="8" class="formTitle" style="margin-top:25px" :offset=1>服务商</el-col>
                    <el-col :span="15" class="formContent" style="margin-top:25px">{{ dataInfo.serviceProvider }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="formTitle" style="margin-top:14px" :offset=1>版本</el-col>
                    <el-col :span="15" class="formContent" style="margin-top:14px">{{ dataInfo.version }}</el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ServiceDetail, getService, showUserServiceStatus } from "@/api/publicService/publicService.js"
export default {
    name: "Job",
    data() {
        return {
            iconUrl: require('../../assets/images/contentEmpty.png'),
            ServiceId: '',
            dataInfo: {

            },
            getStatus: ''
        };
    },
    created() {
        if (this.$route.query) {
            this.ServiceId = this.$route.query.data
            this.fetchData()
            this.fetchUserStatus()
        }
    },
    mounted() {
    },
    methods: {
        fetchData() {
            let data = {
                serviceId: this.ServiceId
            }
            ServiceDetail(data).then(res => {
                if (res.code == 200) {
                    this.dataInfo = res.data
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
        getService() {
            if (this.getStatus == '0' || '2') {
                let data = {
                    serviceId: this.ServiceId
                }
                getService(data).then(res => {
                    if(res.code==200){
                        this.$router.push({
                            path:'/publicService/success'
                        })
                    }
                })
            }

        },
        toLast() {
            this.$router.push({
                path:'/public/minePublic'
            })
        },
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";

.first {
    width: 95%;
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
    width: 95%;
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
    height: 106px;
    border-radius: 4px 4px 4px 4px;
    background: #FFFFFF;
}

#introductionWarp {
    text-align:center &>>>p {
        margin: 0 0 !important;
        text-align: center !important;
    }
}
</style>