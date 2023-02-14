<template>
    <div class="right-bottom">
        <h3>服务热度TOP3</h3>

        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <div :class="{itemWarp:true,bottomLine:index==0||index==1}" v-for="(item,index) in dataList" :key="index">
                <div class="itemLogo ilBlock ">
                    <span :class="{logoPic:true,ilBlock:true, pic1:index==0,pic2:index==1,pic3:index==2}">
                       <el-image :src="`data:image/png;base64,${item.icon}`" style="width: 22px; height: 22px"></el-image>
                    </span>
                    <span
                        :class="{rank:true, ilBlock:true, top1:index==0,top2:index==1,top3:index==2}">TOP{{index+1}}</span>
                </div>
                <div class="itemContent ilBlock ">
                    <h4 class="contentTitle showOne">{{item.serviceName}}</h4>
                    <p class="contentProduce showOne">{{item.description}}</p>
                </div>
                <div class="itemUserNumber ilBlock">
                    <p class="personNum">{{item.userNum}}</p>
                    <p class="personWord">用户数</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getTopService } from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    data() {
        return {
            dataList: [],
            loading:true
        };
    },
    created() {
        getTopService().then(res => {
            if(res.code==200){
                this.dataList = res.data
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
    height: 294Px;
    padding: 0 30Px;

    .itemWarp {
        width: 100%;
        height: 81Px;
        display: flex;

    }

    .bottomLine {
        border-bottom: 1Px solid rgb(8,57,113);
    }

    .ilBlock {
        display: inline-block;
    }

    .itemLogo {
        width: 50Px;
        height: 81Px;
        position: relative;

        .logoPic {
            width: 50Px;
            height: 50Px;
            border-radius: 50%;
            position: absolute;
            top: 17Px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .pic1 {
            background-color: #6F6CFF;
        }

        .pic2 {
            background-color: #2B9CFC;
        }

        .pic3 {
            background-color: #1DA9CB;
        }

        .rank {
            width: 40Px;
            height: 18Px;
            border-radius: 9Px;
            position: absolute;
            top: 56Px;
            left: 5Px;
            color: #081735;
            line-height: 18Px;
            text-align: center;
            font-size: 12Px;
        }

        .top1 {
            background: #FFD74D;
        }

        .top2 {
            background: #D9E1FF;
        }

        .top3 {
            background: #AF8441;
        }
    }

    .itemContent {
        width: 325Px;
        height: 100%;

        .contentTitle {
            padding: 0;
            margin: 20Px 0 0 16Px;
            font-size: 16Px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #B6DAFD;
        }

        .contentProduce {
            padding: 0;
            margin: 4Px 0 0 16Px;
            font-size: 14Px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #B6DAFD;
            opacity: 0.5;
        }
    }

    .itemUserNumber {
        width: 42Px;
        height: 100%;

        .personNum {
            margin: 16Px 0 0 19Px;
            font-size: 22Px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #53E2FD;
        }

        .personWord {
            margin: 3Px 0 0 0;
            font-size: 14Px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #D9E1FF;
        }
    }
}
</style>