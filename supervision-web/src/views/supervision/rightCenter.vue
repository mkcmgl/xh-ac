<template>
    <div class="right-center">
        <h3>合约热度TOP10<span>(调用次数 单位:次)</span></h3>
        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <right-center-echart v-else :echartData="echartData"></right-center-echart>
        </div>
    </div>
</template>

<script>
import rightCenterEchart from '@/components/monitorEcharts/rightCenter/echart.vue'
import { getHotContract } from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    components: {
        rightCenterEchart
    },
    data() {
        return {
            loading: true,
            echartData: null
        };
    },
    created() {
        getHotContract().then(res => {
            if (res.code == 200) {
                if (res.code == 200) {
                    this.echartData = res.data
                    this.loading = false
                }
            }
        }).catch(error => {
            this.loading = false
        })
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 288Px;
    position: relative;
}
</style>