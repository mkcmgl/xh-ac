<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter">开通状态</span>
        </div>
       <div class="resultWarp">
            <div >
                <img src="@/assets/images/right.png" class="authResultImg"/>
                <p class="authResultText1">{{ reviewStatusData.reviewStatus == 0 ? '开通审核中' : reviewStatusData.reviewStatus == 1?'开通审核通过':'开通审核驳回' }}</p>
                <p class="authResultText2" @click="toMineService">查看我的服务</p>
            </div>
        </div>
    </div>
</template>

<script>
import { reviewStatus } from "@/api/publicService/publicService.js"
export default {
    name: "Job",
    data() {
        return {
            iconUrl: require('../../assets/images/contentEmpty.png'),
            ServiceId: '',
            dataInfo: {

            },
            getStatus: '',
            reviewStatusData: {}
        };
    },
    created() {
        if (this.$route.query) {
            this.ServiceId = this.$route.query.data
            this.fetchData()
        }
    },
    mounted() {
    },
    methods: {
        toMineService(){
            this.$router.push({
                path:'/myService/list'
            })
        },
        fetchData() { 
            let data = {
                serviceId: this.ServiceId
            }
            reviewStatus(data).then(res => { 
                // console.log(`output->res`,res)
                if (res.code == 200) { 
                    this.reviewStatusData=res.data
                }
            
            })
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";

</style>