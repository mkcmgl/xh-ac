<template>
    <div class="app-container">
        <div class="title" v-show="content">
            公共服务
        </div>
        <div class="title" v-show="!content">
            <span class="lastRouter" @click="toLast">公共服务</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">搜索结果</span>
        </div>
        <el-row>
            <el-input placeholder="请输入服务名称" suffix-icon="el-icon-search" v-model="serviceName" class="searchWarp"
                @change="search">
            </el-input>
        </el-row>
        <el-row class="publicType">
            <el-col :span="24">
                <div class="typeListWarp">
                    <span>所属分类：</span>
                    <span v-for="(item, index) in typeList" :key="index"
                        :class="item.choied ? 'detailTypeChoied' : 'detailTypeNochoied'"
                        @click="choosType(index, item)">
                        {{ item.typeName }}
                    </span>
                </div>
            </el-col>
        </el-row>
        <div class="serviceList" v-show="searchContent" v-loading="loading">
            <div v-for="(item, index) in showLst" :key="index" class="serviceItem">
                <el-image :src="item.imgUrl" class="serviceItemImg">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <div class="serviceItemContent">
                    <el-image :src="item.icon" class="serviceItemIcon"></el-image>
                    <p class="serviceItemTitle">{{ item.serviceName }}</p>
                    <p class="serviceItemDescription">{{ item.description }}</p>
                    <div class="getService" @click="toDtail(item)">
                        获取
                    </div>
                </div>
            </div>
            <i class="serviceItem1" >
            </i>
            <i class="serviceItem1" >
            </i>
            <i class="serviceItem1" >
            </i>
            <i class="serviceItem1" >
            </i>
        </div>
        <el-row v-show="!searchContent" v-loading="loading">
            <el-col :span="24">
                <div class="searchContent">
                    <el-image :src="imgUrl" class="noContentImg"></el-image>
                    <span class="emptyWord">空空如也</span>
                </div>
            </el-col>
        </el-row>
        <el-row>

        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
import { serviceTypeList, serviceList, getIconOrImage } from "@/api/publicService/publicService.js"
import { loadFile } from '@/utils/public.js'
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
            imgUrl: require('../../assets/images/contentEmpty.png'),
            dataList: {
                registerTotalNum: ''
            },
            searchResult: null,
            typeList: [{ typeName: '全部' }],
            serviceListAll: [
            ],
            serviceName: '',
            typeId: '',
            showLst: []
        };
    },
    created() {
        this.fetchData()
        this.fetchDetailService()
    },
    mounted() {
    },
    watch: {
        serviceListAll: {
            handler: function (newval, oldVal) {
                let flag = this.judgePic(newval)
                if (flag) {
                    this.showLst = newval
                    this.loading = false
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        fetchData() {
            serviceTypeList().then(res => {
                if (res.code == 200) {
                    this.typeList = this.typeList.concat(res.data)
                    //分类列表每个添加一个choied属性来控制class名
                    this.typeList.forEach(item => {
                        this.$set(item, 'choied', false)
                    })
                    this.typeList[0].choied = true
                }
            })
        },
        search(e) {
            let length = e.length
            if (length > 100) {
                this.$message({
                    message: '搜索长度最多100',
                    type: 'warning'
                })
                return
            }
            let data = {
                serviceName: this.serviceName,
                typeId: this.typeId,
            }
            this.fetchDetailService(data)
        },
        toLast() {
            this.searchContent = false
            this.searchContent1 = false
            this.content = true
            this.input1 = ''
            this.fetchData()
        },
        //选择分类
        choosType(index, item) {
            this.typeList.map(item => {
                item.choied = false
            })
            this.typeList[index].choied = true
            // this.$set(this.typeList[index], 'choied', true)
            this.typeId = item.typeId
            this.fetchDetailService()
            this.$forceUpdate()
        },
        fetchDetailService() {
            let data = {
                serviceName: this.serviceName,
                typeId: this.typeId,
            }
            this.loading = true
            this.searchContent = true
            serviceList(data).then(res => {
                if (res.data.length == 0) {
                    this.serviceListAll = []
                    this.loading = false
                    this.searchContent = false
                } else {
                    let typeList = res.data
                    typeList.forEach(item => {
                        let data1 = {
                            showId: item.showId,
                            type: 'icon'
                        }
                        let data2 = {
                            showId: item.showId,
                            type: 'image'
                        }
                        //获取服务后需要去获取服务的图标和图片，后端传回来的是数据流，需要写一个axiso去处理数据流
                        loadFile(data1).then(res1 => {
                            this.$nextTick(() => {
                                this.$set(item, 'icon', res1)
                            });
                        })
                        //获取图片
                        loadFile(data2).then(res2 => {
                            this.$nextTick(() => {
                                this.$set(item, 'imgUrl', res2)
                            })
                        })
                    }
                    )
                    this.serviceListAll = typeList

                }
            }).catch(() => {
                this.serviceListAll = []
                this.loading = false
                this.searchContent = false
            })
        },
        //判断图片是否加载完毕
        judgePic(data) {
            let flag = data.every(item => {
                return item.icon != undefined && item.icon != null && item.icon != '' && item.imgUrl != undefined && item.imgUrl != null && item.imgUrl != ''
            })
            return flag
        },
        toDtail(item) {
            this.$router.push({
                path: '/publicService/detail',
                query: {
                    data: item.serviceId
                }
            })
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";

.searchWarp {
    width: 30%;
    margin-left: 35%;
}

.publicType {
    height: 90px;
    margin: 70px auto 0;
    background: #fff;
}

.typeListWarp {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    height: 90px;

    span {
        display: inline-block;
        height: 32px;
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 32px;
        padding: 0 3px;
        overflow: hidden;
    }

    .detailTypeNochoied:hover {
        color: #559EFF;
        cursor: pointer;
    }

    .detailTypeChoied {
        background-color: #2F88FF;
        color: #fff;
        border-radius: 2px;
    }

}



.searchContent {
    width: 100%;
    // background: #fff;
    height: 62vh;
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

.serviceList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px auto 0;
}

.serviceItem {
    width: 24%;
    height: 318px;
    margin-top: 10px;
}

.serviceItem1{
    width: 24%;
    margin-top: 10px;
}

.serviceItemImg {
    width: 100%;
    height: 218px;
}

.serviceItemContent {
    width: 100%;
    height: 100px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
}

.serviceItemIcon {
    position: absolute;
    width: 44px;
    height: 44px;
    top: 20%;
    left: 4%;
}

p {
    margin: 0;
}

.serviceItemTitle {
    width: 75%;
    font-size: 18px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 700;
    color: #333333;
    margin-left: 25%;
    margin-top: 20px;
    overflow: hidden;
    /*超出隐藏*/
    text-overflow: ellipsis;
    /*隐藏后添加省略号*/
    white-space: nowrap;
    /*强制不换行*/

}

.serviceItemDescription {
    margin-left: 25%;
    margin-top: 10px;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #333333;
    width: 50%;
    overflow: hidden;
    display: -webkit-box;
    overflow: hidden;
    /*超出隐藏*/
    text-overflow: ellipsis;
    /*隐藏后添加省略号*/
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; //想显示几行
}

.getService {
    width: 70px;
    height: 30px;
    background: #2F88FF;
    border-radius: 15px 15px 15px 15px;
    opacity: 1;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 30px;
    text-align: center;
    position: absolute;
    right: 5%;
    bottom: 29px;
    cursor: pointer;
}

.getService:hover {
    background: #559EFF;
}
</style>