<template>
    <div style="width: 100%; height: 100%" ref="hygrometer"></div>
</template>
<script>
export default {
    // props:{
    //     echartData:{
    //         type:'number',
    //         default:0
    //     }
    // },
    data() { 
        return {

        }
    },
    watch: {
        echartData: {
            handler(val) {
                this.$nextTick(() => {
                    this.drawLiquidfill(val)
                })
            },
            deep: true,
            immediate: true
        }
    },
    props: {
        echartData: {
            type: Number,
            default: () => 0
        }
    },
    methods: {
        drawLiquidfill(data) {
            let data1 = data
            const chart = this.$refs.hygrometer
            if (chart) {
                const myChart = this.$echarts.init(chart)
                
            const option = {
                    title: {
                        text: "累计接收交易",
                        left: "15%",
                        bottom: 0,
                        textStyle: {
                            color: "#B6DAFD",
                            fontWeight: "400",
                            fontSize: 14,
                        },
                    },
                    series: [
                        {
                            type: 'liquidFill',
                            radius: '65%',
                            center: ['35%', '50%'],
                            color: [
                                {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#446bf5',
                                        },
                                        {
                                            offset: 1,
                                            color: '#2ca3e2',
                                        },
                                    ],
                                    globalCoord: false,
                                },
                            ],
                            data: [{
                                value: 0.5,
                                label: {
                                    show: true,
                                    formatter:`${this.numberTo3(data1)}`,
                                    fontSize:'32Px',
                                    fontWeight:'bolder',
                                    color:'#fff'
                                }
                            }, {
                                value: 0.5,
                                label: {
                                    show: false,
                                }
                            }], // data个数代表波浪数
                            backgroundStyle: {
                                borderWidth: 1,
                                color: 'RGBA(51, 66, 127, 0.7)',
                            },
                            outline: {
                                // show: false
                                borderDistance: 5,
                                itemStyle: {
                                    borderWidth: 4,
                                    borderColor: '#283870',
                                },
                            },
                        },
                    ],
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