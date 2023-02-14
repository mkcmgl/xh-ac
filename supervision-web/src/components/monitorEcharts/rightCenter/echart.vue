<template>
    <div style="width: 100%; height: 130%;" ref="hygrometer" class="echartPotison"></div>
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

                    let nameArr = []
                    let dataArr = []
                    val.map(item => {
                        if (item.name) {
                            nameArr.push(item.name)
                        } else {
                            nameArr.push('无')
                        }
                        dataArr.push(item.value)
                    })
                    this.$nextTick(() => {
                        this.drawLiquidfill(nameArr, dataArr)
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
        drawLiquidfill(name, data) {
            const chart = this.$refs.hygrometer
            if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                    grid: {
                        left: 90
                    },
                    yAxis: {
                        type: 'category',
                        data: name,
                        axisLabel: {
                            textStyle: {
                                color: '#B6DAFD',
                                fontSize: 14
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        inverse: true,
                    },
                    xAxis: {
                        type: 'value',
                        min: 0,
                        show: false,
                        
                    },
                    series: [
                        {
                            data: data,
                            type: 'bar',
                            label: {
                                show: true,
                                position: 'right',
                                color: '#fff',
                            },
                            itemStyle: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(12,31,60)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgb(95,196,205)' // 100% 处的颜色
                                    }],
                                }
                            },
                            barWidth: 9,
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
    position:absolute;
    right: 0 !important;
    top: -30Px !important;
}
</style>