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
                    let timeArr = []
                    let upArr = []
                    let receiveArr = []
                    val.receive.map(item => {
                        timeArr.push(item.key)
                        receiveArr.push(item.value)
                    })
                    val.up.map(item => {
                        upArr.push(item.value)
                    })
                    this.$nextTick(() => {
                        this.drawLiquidfill(timeArr, upArr, receiveArr)
                    })
                }
            },
            deep: true,
            immediate: true
        }
    },
    props: {
        echartData: {
            type: Object,
            default: () => null
        }
    },
    methods: {
        drawLiquidfill(timeArr, upArr, receiveArr) {
            const chart = this.$refs.hygrometer
            if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                    color: ['#8956FF', '#5ED6FF'],
                    legend: {
                        bottom: 10,
                        textStyle: {
                            fontSize: 10,
                            color: '#B6DAFD'
                        },
                        data: ['接收交易', '上链交易'],
                        //circle圆形,rect长方形,roundRect圆角长方形,triangle三角形,diamond菱形,pin不规则圆,arrow不规则三角形,none没有图标
                        // icon:'arrow'
                    },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor:'rgb(0,0,0,0.7)',
                        borderColor:'rgb(0,0,0,0.7)',
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    grid: {
                        left: 60,
                        right: 20,
                        top: 40,
                        bottom: 70
                    },
                    xAxis: [{
                        name: '',
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#5873A8',
                                fontSize: 14
                            },
                            color: "rgba(255,255,255)",
                        },
                        data: timeArr
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        interval: 50,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#283F6C',
                                type:'dashed'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} ',
                            color: '#fff',
                            textStyle: {
                                color: '#5873A8',
                                fontSize: 14
                            },
                        }
                    }],
                    series: [{
                        name: '接收交易',
                        type: 'line',
                        // 折线图变曲线图
                        smooth: true,
                        data: receiveArr,
                        symbolSize: 0,
                        // 区域面积样式
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 1,
                                            color: "rgb(10,34,66)", // 0% 处的颜色
                                        },
                                        {
                                            offset: 0,
                                            color: "#2C8AA9", // 100% 处的颜色
                                        },
                                    ],
                                },
                            },
                        }
                    },
                    {
                        name: '上链交易',
                        type: 'line',
                        smooth: true,
                        symbolSize: 0,
                        data: upArr,
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 1,
                                            color: "#20B8ED", // 0% 处的颜色
                                        },
                                        {
                                            offset: 0,
                                            color: "#8956FF", // 100% 处的颜色
                                        },
                                    ],
                                },
                            },
                        }
                    },
                    ]
                };
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
    position: relative;
    right: 10Px !important;
    top: 0 !important;
}
</style>