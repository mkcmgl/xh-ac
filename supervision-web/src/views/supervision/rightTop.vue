<template>
    <div class="right-top">
        <h3>BID注册趋势<span>(单位:个)</span></h3>
        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <right-top-echart v-else :echartData="echartData"></right-top-echart>
        </div>
    </div>
</template>

<script>
import rightTopEchart from '@/components/monitorEcharts/rightTop/echart.vue'
import { getRecentRegister } from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    components: {
        rightTopEchart
    },
    data() {
        return {
            loading: true,
            echartData: null
        };
    },
    created() {
        getRecentRegister().then(res => {
            if (res.code == 200) {
                if (res.code == 200) {
                    this.echartData = res.data
                    this.loading = false
                }
            }
        }).catch(error => {
            this.loading = false
        })
    },

};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 238Px;
}
</style>