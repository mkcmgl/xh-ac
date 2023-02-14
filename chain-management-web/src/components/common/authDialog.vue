<template>
    <el-dialog title="审核" :visible.sync="authShow" width="28%" :before-close="close" top="33vh" :append-to-body="true"
        z-index="99999">
        <div class="line"></div>
        <el-form ref="authForm" :model="authForm" :rules="authFormRules" label-width="110px" label-position="left"
            v-show="authType == '1'">
            <el-form-item label="审核意见">
                <el-radio-group v-model="authType" @change="changeType">
                    <el-radio label="1">通过</el-radio>
                    <el-radio label="2">驳回</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form ref="authForm1" :model="authForm1" :rules="authFormRules1" label-width="110px" label-position="left"
            v-show="authType == '2'">
            <el-form-item prop="status" label="审核意见">
                <el-radio-group v-model="authType">
                    <el-radio label="1">通过</el-radio>
                    <el-radio label="2">驳回</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="reviewOpinion" label="驳回原因">
                <el-input v-model="authForm1.reviewOpinion" type="textarea" :rows="2" placeholder="请输入驳回原因">
                </el-input>
            </el-form-item>
        </el-form>
        <div class="buttonline"></div>
        <div class="btnWarp">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="toReview">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'ChainManagementWebAuthDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show: {
            handler: function (val) {
                this.authShow = val
            }
        }
    },
    data() {
        return {
            authShow: false,
            authForm: {

            },
            authForm1: {
                reviewOpinion: ''
            },
            authFormRules: {
                status: [{ trigger: "blur", message: "请选择通过与否" }],
            },
            authFormRules1: {
                status: [{ trigger: "blur", message: "请选择通过与否" }],
                reviewOpinion: [{ required: true, trigger: "blur", message: "请输入审核意见" },
                {
                    max: 255,
                    message: "审核意见长度最大255",
                    trigger: "blur",
                },
                ]
            },
            authType: '1'
        };
    },

    mounted() {

    },

    methods: {
        close() {
            this.authForm1.reviewOpinion = ''
            this.authType = '1'
            this.$emit('close')
            this.$refs.authForm1.clearValidate()
        },
        toReview() {
            let flag = this.authType
            switch (flag) {
                case '1':

                    this.$refs.authForm.validate((valid) => {
                        if (valid) {
                            this.$emit('confirm', 'pass')
                        }
                    })
                    break;
                case '2':
                    this.$refs.authForm1.validate((valid) => {
                        if (valid) {
                            this.$emit('confirm', 'refuse', this.authForm1.reviewOpinion)
                        }
                    })
            }
        },
        changeType() {
            this.authForm1.reviewOpinion = ''
            this.$refs.authForm1.clearValidate()
        }
    },
};
</script>

<style lang="scss" scoped>

</style>