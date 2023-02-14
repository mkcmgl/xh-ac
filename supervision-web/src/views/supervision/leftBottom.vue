<template>
    <div class="left-bottom">
        <h3>子链行业分布<span>(单位:%)</span></h3>
        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <template v-else>
                <left-bottom-echart :echartData="echartData"></left-bottom-echart>
            <div class="total">
                <span class="totalTitle">总数:</span>
                <span class="ml10">{{total}}</span>
            </div>
            </template>
           
        </div>
    </div>
</template>

<script>
import leftBottomEchart from '@/components/monitorEcharts/leftBottom/echart.vue'
import { getIndustryPercent } from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    components: {
        leftBottomEchart
    },
    data() {
        return {
            echartData: null,
            total: 0,
            loading:true
        };
    },

    created() {
        getIndustryPercent().then(res => {
            if (res.code == 200) {
                if (res.code == 200) {
                    this.echartData = res.data
                    this.total = res.data.all
                    this.loading = false
                }
            }
        }).catch(error=>{
            this.loading = false
        })
    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 252Px;
    position: relative;

    .total {
        bottom: 25Px;
        right: 70Px;
        position: absolute;
        width: 92px;
        height: 15px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #F4FAF8;
        line-height: 15px;
    }

   
}
</style>