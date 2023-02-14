<template>
    <div class="left-center">
        <h3>骨干链上链/接收交易趋势<span>(单位:笔)</span></h3>
        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <left-center-echart :echartData="echartData" v-else></left-center-echart>
        </div>
    </div>
</template>

<script>
import leftCenterEchart from '@/components/monitorEcharts/leftCenter/echart.vue'
import {getRecentTransaction} from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    components: {
        leftCenterEchart
    },
    data() {
        return {
            echartData:null,
            loading:true
        };
    },
    created(){
        getRecentTransaction().then(res=>{
            if(res.code==200){
                if(res.code==200){
                    this.echartData = res.data
                    this.loading = false
                }
            }
        }).catch(error=>{
            this.loading = false
        })
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 288Px;
}
</style>