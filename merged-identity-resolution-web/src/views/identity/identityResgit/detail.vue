<template>
    <div class="app-container">
        <div class="title">
            <span class="lastRouter" @click="toLast">BID标识注册</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">详情</span>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">基本信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">标识名称</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.identityName ? '无' : dataInfo.identityName }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">标识体系</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.identitySystem ? '无' : dataInfo.identitySystem }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">标识符</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.bid ? '无' : dataInfo.bid }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">BID标识类型</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.identityType ? '无' : dataInfo.identityType }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">注册时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.createTime ? '无' : dataInfo.createTime }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">标识数据</h3>
            <el-row style="margin-top:5px" :span="3" v-for="(item,index) in dataInfo.dataList" :key="index">
                <el-col :span="3">
                    <span class="formTitle">{{item.dataName}}</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                       {{ item.dataNumber ? item.dataNumber:item.dataStr?item.dataStr:'无' }}
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="resultContent">
            <h3 class="contentTitle">上链信息</h3>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">交易时间</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ dataInfo.authType ? dataInfo.authType == 101 ? '个人认证' : '企业认证' : '无' }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">所在区块</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                         {{ dataInfo.authType ? dataInfo.authType == 101 ? '个人认证' : '企业认证' : '无' }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">交易哈希</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.realName ? '无' : dataInfo.realName }}
                    </span>
                </el-col>
                <el-col :span="3">
                    <span class="formTitle">区块哈希</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.reviewDate ? '无' : dataInfo.reviewDate }}
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:5px">
                <el-col :span="3">
                    <span class="formTitle">出块节点</span>
                </el-col>
                <el-col :span="9">
                    <span class="formContent">
                        {{ !dataInfo.realName ? '无' : dataInfo.realName }}
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Job",
    data() {
        return {
            dataInfo: {
                createTime: "",
                dataList: [],
                id: '',
                identityName: "",
                identitySystem: "",
                resolve: '',
                templateNo: "",
                userBid: ""
            }
        };
    },
    computed:{
        ...mapState({
            data1:state => state.identity.resolveDetail
        })
    },
    created() {
        if (this.data1) {
            this.dataInfo = this.data1
        }
    },
    methods: {
        toLast() {
            this.$router.go(-1)
            this.$store.dispatch('identity/setResolveDetail',null)
            sessionStorage.removeItem('resolveDetail')
        }
    }
};
</script>
<style scoped lang="scss">
</style>