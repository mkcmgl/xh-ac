<template>
    <dv-scroll-board class="dv-scr-board" :config="config" />
</template>
<script>
export default {
    data() {
        return {
            config: {
                header: ['<span style="color:#53E2FD;">子链名称</span>', '<span style="color:#53E2FD;">子链类型</span>',
                    '<span style="color:#53E2FD;">区块高度</span>', '<span style="color:#53E2FD;">交易数量</span>',
                    '<span style="color:#53E2FD;">节点数量</span>', '<span style="color:#53E2FD;">合约数量</span>',
                    '<span style="color:#53E2FD;">运行状态</span>'],
                data: [],
                rowNum: 5, //表格行数
                headerHeight: 35,
                headerBGC: 'rgb(9,24,54)', //表头
                oddRowBGC: 'rgb(9,33,71)', //奇数行
                evenRowBGC: 'rgb(9,24,54)', //偶数行
                index: false,
                // columnWidth: [5],
                align: ['center']
            }
        }
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        tableData: {
            handler(val) {
                let dataArr = []
                //将数据按固定的key重新排序再装进数组
                let keys = ['name', 'type', 'blockHeight', 'txNum', 'nodeNum', 'contractNum', 'runStatus']
                val.map(item => {
                    let getArr = {}//接收新顺序
                    keys.forEach(item1 => {
                        Object.keys(item).forEach(key => {
                            if (item1 === key) {
                                getArr[key] = item[key]
                            }
                        });
                    });
                    dataArr.push(getArr)
                })
                //将排列好的数据转成可以展示的数据
                let newArr = []
                dataArr.map(item => {
                    let arr = []
                    Object.keys(item).map((keys => {
                        if(item[keys]!=1){
                            let str = `<span style="color:#B6DAFD;">${item[keys]}</span>`
                            arr.push(str)
                        }
                        
                    }))
                    newArr.push(arr)
                })
                this.$nextTick(() => {
                    this.config.data = newArr
                })
            },
            deep: true,
            immediate: true
        }
    },
    
    methods: {

    },
};
</script>
<style scoped lang="scss">
.dv-scr-board{
    border:1Px solid transparent
}
</style>