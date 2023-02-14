<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">BID标识模板</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="resultContent1">
            <h3 class="contentTitle">基本信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">模板名称</span>
                </el-col>
                <el-col :span="21">
                    <span class="formContent">
                        {{ !detailInfo.templateName ? '无' : detailInfo.templateName }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">描述</span>
                </el-col>
                <el-col :span="21">
                    <span class="formContent">
                        {{ !detailInfo.description ? '无' : detailInfo.description }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="templateDetailTable">
            <h3 class="contentTitle">数据属性</h3>
            <el-table :data="tableList" v-loading="loading" ref="tableList" max-height="60vh">
                <el-table-column label="中文名称" prop="chineseName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="英文名称" prop="englishName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="数据类型" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.dataType == 1 ? '字符串' : '数字' }}
                    </template>
                </el-table-column>
                <el-table-column label="最小长度" prop="minimumLength" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="最大长度" prop="maximumLength" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Job",
    data() {
        return {
            detailInfo: {
                templateName: '',
                description: '',
                properties: null
            },
            loading: true,
            tableList: []
        };
    },
    computed: {
        ...mapState({
            data1: state => state.identity.templateDetail
        })
    },
    created() {
        if (this.data1) {
            this.detailInfo = this.data1
            this.tableList = this.detailInfo.properties
            this.loading = false
        }
    },
    methods: {
        toLast() {
            this.$router.go(-1)
            this.$store.dispatch('identity/settemplateDetail', null)
            sessionStorage.removeItem('templateDetail')
        }
    }
};
</script>
<style scoped lang="scss">
</style>