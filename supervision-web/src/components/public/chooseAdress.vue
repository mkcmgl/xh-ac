<template>
    <el-row>
        <el-col :span="8">
            <el-select v-model="province" placeholder="请选择省市" clearable @change="chooseProvince" style="width:100%"
                filterable>
                <el-option v-for="item in provinceList" :key="item.cityName" :label="item.cityName"
                    :value="item.provinceCode">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-select v-model="city" placeholder="请选择地市" clearable style="width:100%" filterable @change="chooseCity">
                <el-option v-for="item in cityList" :key="item.regionCode" :label="item.cityName"
                    :value="item.regionCode">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-select v-model="area" placeholder="请选择区县" clearable style="width:100%" filterable @change="chooseArea">
                <el-option v-for="item in areaList" :key="item.countyCode" :label="item.countyName"
                    :value="item.countyCode">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>
import { getRegion } from "@/api/business/business.js"
export default {
    name: "chooseAdress",
    data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            province: '',
            city: '',
            area: '',
        };
    },
    created() {
        this.getAddressList()
    },
    methods: {
        //重置地区
        reset() {
            this.provinceList = []
            this.cityList = []
            this.areaList = []
            this.province = ''
            this.city = ''
            this.area = ''
            this.getAddressList()
        },
        //获取地区列表
        getAddressList(e) {
            let param = {
                code: e ? e : '-1'
            }
            getRegion(param).then(res => {
                this.provinceList = res.data
            })
        },
        search() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.province) {
                        let flag = this.queryParams.district
                        if (!flag) {
                            this.$message({
                                message: '请选择地市',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    this.getList()
                }
            })
        },
        chooseProvince(e) {
            if (e) {
                let param = {
                    code: e
                }
                this.cityList = []
                this.city = ''
                this.areaList = []
                this.area = ''
                this.$emit('input', this.area);
                getRegion(param).then(res => {
                    this.cityList = res.data
                })
            } else {
                this.cityList = []
                this.city = ''
                this.areaList = []
                this.area = ''
                this.$emit('input', this.area);
            }
        },
        chooseCity(e) {
            if (e) {
                let param = {
                    code: e
                }
                this.areaList = []
                this.area = ''
                this.$emit('input', this.area);
                getRegion(param).then(res => {
                    this.areaList = res.data
                })
            } else {
                this.areaList = []
                this.area = ''
                this.$emit('input', this.area);
            }
        },
        chooseArea(e) {
            this.area = e
            this.$emit('input', this.area);
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/styles/tableStyle.scss";
</style>