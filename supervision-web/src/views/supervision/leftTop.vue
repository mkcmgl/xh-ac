<template>
    <div class="left-top">
        <h3>骨干链累计上链/接收交易<span>(单位:笔)</span></h3>
        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <template v-else>
                <div>
                    <echarts1-vue :echartData="echartData1"></echarts1-vue>
                </div>
                <div>
                    <echarts2-vue :echartData="echartData2"></echarts2-vue>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import echarts1Vue from '@/components/monitorEcharts/leftTop/echarts1.vue';
import echarts2Vue from '@/components/monitorEcharts/leftTop/echarts2.vue';
import { getAllTransaction } from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    components: {
        echarts1Vue,
        echarts2Vue
    },
    data() {
        return {
            echartData1: 0,
            echartData2: 0,
            loading: true
        };
    },
    created() {
        getAllTransaction().then(res => {
            if (res.code == 200) {
                this.echartData1 = res.data.up
                this.echartData2 = res.data.receive
                this.loading = false
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
    height: 196Px;
    display: flex;
    justify-content: center;
    div {
        width: 50%;
        height: 100%;
    }
}
</style>