<template>
    <div class="app-container">
        <div class="title">
            <router-link to="/subchain/subchainAccess">
                <span class="lastRouter">子链接入</span>
            </router-link>
            <span class="currentRouter">/</span>
            <span class="currentRouter">子链申请</span>
        </div>
        <!-- 用户未完成前置条件的页面 -->
        <el-row>
            <el-col :span="24">
                <div class="header-step">
                    <div class="step-back">1</div>
                    <div class="border"></div>
                    <div class="step-back1">2</div>
                    <div class="border"></div>
                    <div class="step-back1">3</div>
                </div>
                <div class="text-step">
                    <div>填写链基本信息</div>
                    <div>填写链系统信息</div>
                    <div>填写链应用信息</div>
                </div>
            </el-col>
        </el-row>
        <el-form :model="form" :rules="formRules" class="tableBg labelWidth160" ref="form">
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="所属行业" prop="industry">
                        <el-select v-model="form.industry" placeholder="选择行业" style="width:100%">
                            <el-option :label="item.lable" :value="item.value" v-for="(item, index) in industryTypeList"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="链名称" prop="chainName">
                        <el-input v-model="form.chainName" placeholder="请输入链名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="链类型" prop="subChainType">
                        <el-select v-model="form.subChainType" placeholder="选择链类型" style="width:100%" filterable
                            clearable>
                            <el-option :label="item.lable" :value="item.value" v-for="(item, index) in chainType"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="链架构" prop="chainArch">
                        <el-select v-model="form.chainArch" placeholder="请选择链架构" style="width:100%" filterable
                            clearable>
                            <el-option :label="item.lable" :value="item.value" v-for="(item, index) in chainArchType"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="创世账户" prop="genesisAccount">
                        <el-input v-model="form.genesisAccount" placeholder="请输入创世账户bid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="创世账户Token总数" prop="genesisAmount">
                        <el-input v-model="form.genesisAmount" placeholder="请输入创世账户Token总数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="Token单位" prop="unit">
                        <el-input v-model="form.unit" placeholder="请输入Token单位"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="Token精度" prop="precise">
                        <el-input v-model="form.precise" placeholder="请输入Token精度"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="账户Token保留数" prop="baseReserve">
                        <el-input v-model="form.baseReserve" placeholder="请选择输入Token保留数"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="最低Gas单价" prop="feeGasPrice">
                        <el-input v-model="form.feeGasPrice" placeholder="请输入最低燃料单价"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="出块奖励" prop="rewardInitValue">
                        <el-input v-model="form.rewardInitValue" placeholder="请输入首次出块奖励"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="区块链口号" prop="genesisSlogan">
                        <el-input v-model="form.genesisSlogan" placeholder="请输入区块链口号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="区块链介绍" prop="description">
                        <el-input v-model="form.description" placeholder="请输入区块链介绍，用于平台公示子链介绍信息，限1024字符内"
                            type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item label="申请备注" prop="remark">
                        <el-input v-model="form.remark" placeholder="请输入备注信息，限1024字符内" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8" class="elRow">
                    <el-form-item>
                        <el-button type="primary" @click="toNext">下一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { minxData } from '../../../minxData/minxData'
import { encrypt } from '@/utils/jsencrypt';
export default {
    name: "accountCenter",
    mixins: [minxData],
    data() {
        //验证全是空格
        const equalToEmpty = (rule, value, callback) => {
            if (/^\s+$/gi
                .test(value)) {
                callback(new Error('不能全输入空格'));
            } else {
                callback();
            }
        };
        //验证正整数
        const equalToNumber = (rule, value, callback) => {
            if (value) {
                if (!/^\+?[1-9]\d*$/
                    .test(value)) {
                    callback(new Error('请输入正整数'));
                } else {
                    callback();
                }
            }
            else {
                callback();
            }
        };

        return {
            hasPerimiss: false,
            creatShow: false,
            form: {
                industry: '',
                chainName: '',
                subChainType: '',
                chainArch: '',
                genesisAccount: '',
                genesisAmount: '',
                unit: '',
                precise: '',
                baseReserve: '',
                feeGasPrice: '',
                rewardInitValue: '',
                genesisSlogan: '',
                description: '',
                remark: '',
            },
            formRules: {
                industry: [{ required: true, trigger: 'change', message: "请选择所属行业" }],
                chainName: [
                    { required: true, trigger: 'blur', message: '请输入链名称' },
                    { max: 30, message: "链名称最大为30", trigger: "blur" },
                    { required: true, validator: equalToEmpty, trigger: "blur" }
                ],
                subChainType: [{ required: true, trigger: 'change', message: '请选择链类型' }],
                chainArch: [{ required: true, trigger: 'change', message: '请选择链架构' }],
                description: [{ required: true, trigger: 'blur', message: '请输入区块链介绍' },
                { max: 1024, required: true, trigger: 'blur', message: '长度最大1024' },
                { required: true, validator: equalToEmpty, trigger: "blur" }],
                genesisAccount: [
                    { max: 64, trigger: 'blur', message: '创世账户长度最大64' },
                    { validator: equalToEmpty, trigger: "blur" }
                ],
                genesisAmount: [
                    { trigger: 'blur', message: '请输入创世账户token总数' },
                    { max: 30, trigger: 'blur', message: '创世账户token总数长度最大30' },
                    { validator: equalToNumber, trigger: "blur" }
                ],
                unit: [
                    { trigger: 'blur', message: '请输入token单位长度' },
                    { max: 30, trigger: 'blur', message: 'token单位长度最大30' },
                ],
                precise: [
                    { trigger: 'blur', message: '请输入Token精度' },
                    { max: 30, trigger: 'blur', message: 'token精度长度最大30' },
                    { validator: equalToNumber, trigger: "blur" }
                ],
                baseReserve: [
                    { trigger: 'blur', message: '请输入token保留数' },
                    { max: 30, trigger: 'blur', message: 'token保留数长度最大30' },
                    { validator: equalToNumber, trigger: "blur" }
                ],
                feeGasPrice: [
                    { trigger: 'blur', message: '请输入最低Gas单价' },
                    { max: 30, trigger: 'blur', message: '最低Gas单价长度最大30' },
                    { validator: equalToNumber, trigger: "blur" }
                ],
                rewardInitValue: [
                    { trigger: 'blur', message: '请输入首次出块奖励' },
                    { max: 30, trigger: 'blur', message: '首次出块奖励长度最大30' },
                    { validator: equalToNumber, trigger: "blur" }
                ],
                genesisSlogan: [
                    { trigger: 'blur', message: '请输入区块链口号' },
                    { max: 1024, trigger: 'blur', message: '区块链口号长度最大1024' },
                    { validator: equalToEmpty, trigger: "blur" }
                ],
                remark: [
                    { required: true, trigger: 'blur', message: '请输入备注' },
                    { required: true, max: 1024, trigger: 'blur', message: '备注长度最大1024' },
                    { validator: equalToEmpty, trigger: "blur" }
                ],
            },
            chainType: [
                { lable: '子链', value: 0 },
            ],
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    beforeCreate() {

    },
    created() {
    },
    mounted() {
        window.BASE_FORM = this.form
    },
    methods: {
        handleClose() {
            this.creatShow = false
        },
        toNext() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('next', this.form)
                }
            })
        },
        demoInfo() {
            BASE_FORM.industry = 'A';
            BASE_FORM.chainName = '测试脚本'
            BASE_FORM.subChainType = 0
            BASE_FORM.chainArch = '10000'
            BASE_FORM.genesisAccount = 'aasdq4123qweaa'
            BASE_FORM.genesisAmount = '1000'
            BASE_FORM.unit = 'g'
            BASE_FORM.precise = '100'
            BASE_FORM. baseReserve = '200'
            BASE_FORM.feeGasPrice = '100'
            BASE_FORM.rewardInitValue = '123'
            BASE_FORM. genesisSlogan = '世界和平'
            BASE_FORM.description = '为了世界和平的区块链'
            BASE_FORM.remark = '测试脚本备注'
        }
    },
};
</script>

<style scoped lang="scss">
.border {
    width: 180px;
    height: 2px;
    background: #dfecf7;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
}

.text-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 235px auto 222px;
}

.header-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 252px;
    margin-right: 252px;

    .step-back {
        background-image: url("../../../../assets/images/step.png");
        background-size: 60px 69px;
        width: 60px;
        height: 69px;
        font-size: 28px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .step-back1 {
        background-image: url("../../../../assets/images/unstep.png");
        background-size: 60px 69px;
        width: 60px;
        height: 69px;
        font-size: 28px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.elRow {
    margin-top: 5px;
}

.labelWidth160 {
    ::v-deep.el-form-item__label {
        font-size: 12px !important;
        width: 160px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 160px;
    }
}
</style>

