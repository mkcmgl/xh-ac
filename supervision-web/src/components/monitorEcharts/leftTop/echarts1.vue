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
                        text: "累计上链交易",
                        left: "45%",
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
                            center: ['65%', '50%'],
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
                                            color: '#2aa1e3',
                                        },
                                        {
                                            offset: 1,
                                            color: '#08bbc9',
                                        },
                                    ],
                                    globalCoord: false,
                                },
                            ],
                            data: [{
                                value: 0.7,
                                label: {
                                    show: true,
                                    formatter: `${this.numberTo3(data1)}`,
                                    fontSize: '32Px',
                                    fontWeight: 'bolder'
                                }
                            }, {
                                value: 0.7,
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
<style scoped lang="scss">
.echartPotison {
    right: 0 !important;
    top: 0 !important;
}
</style>