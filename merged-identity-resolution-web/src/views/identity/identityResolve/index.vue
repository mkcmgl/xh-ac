<template>
    <div class="app-container">
        <div class="title" v-show="content">
            融合标识解析
        </div>
        <div class="title" v-show="!content">
            <span class="lastRouter" @click="toLast">融合标识解析</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">解析结果</span>
        </div>
        <el-row class="searchCondition">
            <el-input placeholder="请输入标识符" suffix-icon="el-icon-search" v-model="input1" class="searchWarp"
                @change="search">
            </el-input>
        </el-row>
        <el-row :gutter="20" v-show="content" style="margin-top:90px">
            <el-col :span="6">
                <div class="item flag1">
                    <div class="itemTitle">
                        我的标识注册量
                    </div>
                    <p class="itemContent">
                        <span class="number">{{ dataList.registerTotalNum }}</span>
                        <span class="unit">个</span>
                    </p>
                </div>
                <div class="item flag2">
                    <div class="itemTitle">
                        近七日标识注册量
                    </div>
                    <p class="itemContent">
                        <span class="number">{{ dataList.registerRecentNum }}</span>
                        <span class="unit">个</span>
                    </p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="item flag3">
                    <div class="itemTitle">
                        我的标识解析量
                    </div>
                    <p class="itemContent">
                        <span class="number">{{ dataList.resolveTotalNum }}</span>
                        <span class="unit">个</span>
                    </p>
                </div>
                <div class="item flag4">
                    <div class="itemTitle">
                        近七日标识解析量
                    </div>
                    <p class="itemContent">
                        <span class="number">{{ dataList.resolveRecentNum }}</span>
                        <span class="unit">个</span>
                    </p>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="item1">
                    <div class="itemTitle">
                        标识注册量
                    </div>
                    <div ref="chart" style="width:100%;height:350px;position: relative;top: -60px;"></div>
                </div>
            </el-col>
        </el-row>
        <el-row v-show="searchContent" v-loading="loading">
            <el-col :span="24">
                <div class="searchContent">
                    <el-image :src="imgUrl" class="noContentImg"></el-image>
                    <p class="result">没有找到相关结果</p>
                    <p class="result">请重新输入正确的标识</p>
                </div>
            </el-col>
        </el-row>
        <el-row v-show="searchContent1" v-loading="loading">
            <el-col :span="24">
                <div class="searchContent">
                    {{ searchResult }}
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { indentityResolveStatistics, indentityResolveSearch } from "@/api/business/business.js"
import { mapState } from 'vuex';
export default {
    name: "Job",
    data() {
        return {
            loading: false,
            input1: '',
            biaoshizhucenumber: "123123123",
            content: true,
            searchContent: false,
            searchContent1: false,
            imgUrl: require('../../../assets/images/contentEmpty.png'),
            dataList: {
                registerTotalNum: ''
            },
            searchResult: null,
            userBid:''
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.chainUser,
        })
    },
    created() {
        this.userBid = this.userInfo.did
        this.fetchData()
    },
    mounted() {
    },
    methods: {
        fetchData() {
            let echartData = []
            let xData = []
            let params={
                userBid:this.userBid
            }
            indentityResolveStatistics(params).then(res => {
                if (res.code == 200) {
                    this.dataList = res.data
                    //遍历对象修改图表数据
                    Object.keys(this.dataList.recentMap).forEach((key) => {
                        echartData.push(this.dataList.recentMap[key])
                        xData.push(key)
                    })
                    
                    this.getEchartData(echartData, xData)
                }
            })
        },
        search(e) {
            if(e==undefined||e==null||e=='') return
            let length = e.length
            if (length > 100) {
                this.$message({
                    message: '搜索长度最多100',
                    type: 'warning'
                })
                return
            }
            let param = {
                bid: e
            }
            this.loading = true
            this.content = false
            this.searchContent1 = true
            indentityResolveSearch(param).then(res => {
                if (res.code == 200) {
                    this.searchResult = res.data
                    this.loading = false
                    if (this.searchResult) {
                        
                    } else {
                        this.searchContent1 = false
                        this.searchContent = true
                        this.loading = false
                    }
                } else {
                    this.searchContent1 = false
                    this.searchContent = true
                    this.loading = false
                }
            }).catch(() => {
                this.loading = false
                this.searchContent1 = false
                 this.searchContent = false
                this.content = true
                this.input1 = ''
            })

        },
        toLast() {
            this.searchContent = false
            this.searchContent1 = false
            this.content = true
            this.input1 = ''
            this.fetchData()
        },
        getEchartData(e, e1) {
            const chart = this.$refs.chart
            if (chart) {
                const myChart = this.$echarts.init(chart)
                const option = {
                    legend: {},
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: e1
                    },
                    yAxis: {
                        type: 'value',
                        minInterval : 1,
                    },
                    series: [
                        {
                            data: e,
                            type: 'line',
                            smooth: true,
                            color: "#4DB2FF",     //设定实线点的颜色
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    color: "#4DB2FF", //设置实线的颜色
                                },
                            },
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
                                                color: "#E9EEFB", // 0% 处的颜色
                                            },
                                            {
                                                offset: 0,
                                                color: "#CCECFC", // 100% 处的颜色
                                            },
                                        ],
                                    },
                                },
                            }
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
    }
};
</script>
<style scoped lang="scss">

.searchWarp {
    width: 30%;
    margin-left: 35%;
}

.item {
    width: 100%;
    height: 150px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    margin-bottom: 20px;
    overflow: hidden;

    .itemTitle {
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: #666666;
        line-height: 20px;
        margin: 20px 0 28px 30px;
    }

    .itemContent {
        margin: 0 30px;

        .number {
            display: inline-block;
            font-size: 30px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 42px;
        }

        .unit {
            display: inline-block;
            margin-left: 7px;
            height: 42px;
            font-size: 16px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 42px;
        }
    }
}

.flag1 {
    background-image: url('../../../assets/images/mirlogo1.png');
    background-position: 90% 60%;
    background-repeat: no-repeat;
    background-size: 35px 35px;
}

.flag2 {
    background-image: url('../../../assets/images/mirlogo3.png');
    background-position: 90% 60%;
    background-repeat: no-repeat;
    background-size: 35px 35px;
}

.flag3 {
    background-image: url('../../../assets/images/mirlogo2.png');
    background-position: 90% 60%;
    background-repeat: no-repeat;
    background-size: 35px 35px;
}

.flag4 {
    background-image: url('../../../assets/images/mirlogo4.png');
    background-position: 90% 60%;
    background-repeat: no-repeat;
    background-size: 35px 35px;
}

.item1 {
    width: 100%;
    height: 320px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    margin-bottom: 20px;
    overflow: hidden;

    .itemTitle {
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: #666666;
        line-height: 20px;
        margin: 20px 0 28px 30px;
    }
}

.searchContent {
    width: 100%;
    // background: #fff;
    height: 60vh;
    border-top: 1px solid rgb(239, 242, 247);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .noContentImg {
        display: block;
        width: 300px;
        height: 226px;
    }

    .result {
        margin: 0 0;
    }
}
</style>