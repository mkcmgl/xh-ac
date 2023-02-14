<template>
    <div style="width: 100%; height: 100%;" ref="hygrometer" class="echartPotison"></div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    watch: {
        echartData: {
            handler(val) {
                if (val) {
                    
                   let timeArr=[]
                   let dataArr=[]
                   val.map(item=>{
                    timeArr.push(item.key)
                    dataArr.push(item.value)
                   })
                    this.$nextTick(() => {
                        this.drawLiquidfill(timeArr,dataArr)
                    })
                }
            },
            deep: true,
            immediate: true
        }
    },
    props: {
        echartData: {
            type: Array,
            default: () => null
        }
    },
    methods: {
        drawLiquidfill(time,data) {
            const chart = this.$refs.hygrometer
            if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                    xAxis: {
                        type: 'category',
                        data: time,
                        axisLabel: {
                            textStyle: {
                                color: '#5873A8',
                                fontSize: 14
                            },
                        }
                    },
                    yAxis: {
                        type: 'value',
                        min: 0,
                        interval: 50,
                        axisLabel: {
                            textStyle: {
                                color: '#5873A8',
                                fontSize: 14
                            },
                        },
                        splitLine:{
                            lineStyle:{
                                type:'dashed',
                                color:'#283F6C'
                            }
                           
                        }
                    },
                    series: [
                        {
                            data: data,
                            type: 'bar',
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            },
                            itemStyle: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#1591F6' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#0B2044' // 100% 处的颜色
                                    }],
                                }
                            },
                            barWidth: 14
                        }
                    ]
                }
                myChart.setOption(option)
                window.addEventListener("resize", function () {
                    myChart.resize()
                })
            }
            this.$on('hook:destroyed', () => {
                window.removeEventListener("resize", function () {
                    myChart.resize();
                });
            })
        },
    },
};
</script>
<style scoped lang="scss">
.echartPotison {
    right: 0 !important;
    top: 0 !important;
}
</style>