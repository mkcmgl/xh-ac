<template>
    <div class="center-bottom">
        <h3>子链动态</h3>
        <div class="content">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <center-bottom-echart :tableData="tableData" v-else></center-bottom-echart>
        </div>
    </div>
</template>

<script>
import centerBottomEchart from '@/components/monitorEcharts/centerBottom/echart.vue'
import {getSubchainList} from '@/api/echartData/index.js'
export default {
    name: 'SupervisionWebLeftTop',
    components: {
        centerBottomEchart
    },
    data() {
        return {
            tableData:null,
            loading:true
        };
    },
    created(){
        getSubchainList().then(res=>{
            if(res.code==200){
                if(res.code==200){
                    this.$nextTick(()=>{
                        let data = res.data
                        let chainIndex = data.findIndex(item=>{
                            return item.flag=='1'
                        })
                        if(chainIndex!=-1){
                            data.splice(chainIndex,1)
                        }
                        this.tableData = data
                        this.loading = false
                    })
                }
            }
        }).catch(error=>{
            this.loading = false
        })
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 249Px;
}
</style>