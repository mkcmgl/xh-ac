<template>
    <div class="center-top">
        <ul class="infoPic">
            <li :class="item.class" v-for="(item,index) in infoPic" :key="index">
                <h4>{{item.name}}</h4>
                <p>{{numberTo3(item.value)}}</p>
            </li>
        </ul>
        <div class="mapchart">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <template v-else>
                <center-top-echart :echartData="echartData"></center-top-echart>
            <div class="notice1">
                <span class="logo"></span><span class="content">骨干链运营机构</span>
            </div>
            <div class="notice2">
                <span class="logo"></span><span class="content">子链运营机构</span>
            </div>
            </template>
           
        </div>
    </div>
</template>

<script>
import centerTopEchart from '@/components/monitorEcharts/centerTop/echart.vue'
import { backboneChainDetail, getSubchainList } from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebCenterTop',
    components: {
        centerTopEchart
    },
    data() {
        return {
            infoPic: [
                { class: 'blockHeight', value: '', name: '最新区块高度', key: 'blockHeight' },
                { class: 'saleTotal', value: '', name: '交易总数', key: 'txNum' },
                { class: 'bidTotal', value: '', name: 'BID总数', key: 'registerTotalNum' },
                { class: 'accountTotal', value: '', name: '账户总数', key: 'accountNum' },
                { class: 'subchainTotal', value: '', name: '子链总数', key: 'bottomChainNum' },
                { class: 'nodeTotal', value: '', name: '节点总数', key: 'nodeNum' },
            ],
            echartData: null,
            loading:true
        };
    },
    created() {
        backboneChainDetail().then(res => {
            if (res.code == 200) {
                //根据数据的key值替换infoPic里的value
                this.infoPic.map(item => {
                    Object.keys(res.data).map(key1 => {
                        if (item.key == key1) {
                            item.value = res.data[key1]
                        }
                    })
                })
            }
        })
        this.getAllSubChainInfo()
    },
    methods: {
        getAllSubChainInfo() {
            getSubchainList().then(res => {
                if (res.code == 200) {
                    this.echartData = res.data
                    this.loading = false
                }
            }).catch(error=>{
                this.loading = false
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.infoPic {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    
    li {
        width: 132Px;
        height: 62Px;
        margin: 0;
        padding: 0;
        text-align: center;
        list-style: none;

        h4 {
            margin: 9Px 0;
            padding: 0;
            width: 100%;
            font-size: 13Px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #E0EFFA;
        }

        p {
            margin: 0;
            padding: 0;
            font-size: 18Px;
            font-family: Microsoft YaHei;
            font-weight: 400;
        }
    }
}

.blockHeight {
    background-image: url('../../assets/images/blockHeightBg.png');
    color: #8ADAF8;
}

.saleTotal {
    background-image: url('../../assets/images/saleTotalBg.png');
    color: #A9F6F6;
}

.bidTotal {
    background-image: url('../../assets/images/bidTotalBg.png');
    color: #8ADAF8;
}

.accountTotal {
    background-image: url('../../assets/images/accountTotalBg.png');
    color: #DBC7FC
}

.subchainTotal {
    background-image: url('../../assets/images/subchainTotalBg.png');
    color: #F9F9BE
}

.nodeTotal {
    background-image: url('../../assets/images/nodeTotalBg.png');
    color: #A9F6F6
}

.mapchart {
    width: 100%;
    height: 568Px;
    position: relative;
}

.notice1 {
    position: absolute;
    bottom: 30Px;
    left: 30Px;

    .logo {
        display: inline-block;
        width: 26Px;
        height: 26Px;
        background-image: url('../../assets/images/chainLogo.png');
        vertical-align: middle;
    }

    .content {
        display: inline-block;
        height: 26Px;
        font-size: 16Px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #B6DAFD;
        margin-left: 10Px;
        line-height: 26Px;
    }
}

.notice2 {
    position: absolute;
    bottom: 30Px;
    left: 190Px;

    .logo {
        display: inline-block;
        width: 26Px;
        height: 26Px;
        background-image: url('../../assets/images/subchainLogo.png');
        vertical-align: middle;
    }

    .content {
        display: inline-block;
        height: 26Px;
        font-size: 16Px;
        margin-left: 10Px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 26Px;
        color: #B6DAFD;
    }
}
</style>