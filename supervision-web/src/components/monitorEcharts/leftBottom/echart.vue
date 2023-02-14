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
                    let data = this.dealData(val.count)
                    this.$nextTick(() => {
                        this.drawLiquidfill(val.all, data)
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
        //处理数据
        dealData(arr) {
            let newArr = []
            arr.map(item => {
                let obj = {
                    value: item.value,
                    name: item.key
                }
                newArr.push(obj)
            })
            return newArr
        },
        drawLiquidfill(all, data) {
            const chart = this.$refs.hygrometer
            if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                    legend: {
                        top: 'middle',
                        orient: 'vertical',
                        right: '20',
                        width: 200,
                        textStyle: {
                            color: '#fff',
                            width: 100,
                            overflow: 'breakAll',
                            lineHeight: 16
                        },
                        selectedMode: false
                    },
                    color:['#3F87FB', '#DBC63D', '#34DEBE', '#7753EE', '#28C8FC'],
                    series: [
                        {
                            name: 'Nightingale Chart',
                            type: 'pie',
                            radius: [40, 80],
                            center: ['45%', '50%'],
                            right: '100',
                            roseType: 'area',
                            data: data,
                            colorBy:'data',
                            label: {
                                show: true,
                                formatter: (e) => {
                                    let str = e.percent + '%'
                                    return str
                                },
                                fontSize: '12Px',
                                fontWeight: 'bolder',
                                color: '#fff'
                            }
                        },
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