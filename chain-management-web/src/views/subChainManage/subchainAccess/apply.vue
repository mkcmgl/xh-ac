<template>
    <div>
        <apply-base-vue v-show="baseShow" @next="toSystem"></apply-base-vue>
        <apply-system-vue v-show="systemShow" @up="toBase" @next="toApplication"></apply-system-vue>
        <apply-application-vue v-show="applicationShow" @up="upToSystem" @next="submit"></apply-application-vue>
        <el-dialog title="身份验证" :visible.sync="confirmSercure" width="28%" :before-close="handleExportKeyClose"
            top="33vh" :append-to-body="true" z-index="99999">
            <div class="line"></div>
            <p>请输入{{ this.chainUser.did }}对应的数字身份安全密码</p>
            <el-form ref="exportKeyForm" :model="exportKeyForm" :rules="exportKeyRules" class="labelWidth120"
                label-position="left"  @submit.native.prevent>
                <el-form-item prop="securePassword" label="安全密码">
                    <el-input v-model="exportKeyForm.securePassword" auto-complete="off" placeholder="请输入安全密码"
                        type="password">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="btnWarp">
                <el-button @click="handleExportKeyClose">取消</el-button>
                <el-button type="primary" @click="confirmSecure">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import applyBaseVue from './components/applyBase.vue';
import applySystemVue from './components/applySystem.vue';
import applyApplicationVue from './components/applyApplication.vue';
import { subchainApply, verifyPwd } from '@/api/subChainManage/subChainAccess/index.js'
import { encrypt } from '../../../utils/jsencrypt';
export default {
    components: { applyBaseVue, applySystemVue, applyApplicationVue },
    data() {
        return {
            baseShow: true,
            systemShow: false,
            applicationShow: false,
            base: null,
            system: null,
            application: null,
            confirmSercure: false,
            exportKeyForm: {
                securePassword: ''
            },
            exportKeyRules: {
                securePassword: [{ required: true, trigger: "blur", message: "请输入安全密码" }]
            },
        }
    },
    computed: {
        ...mapState({
            chainUser: state => state.user.chainUser,
        })
    },
    methods: {
        toSystem(e) {
            this.base = e
            this.baseShow = false
            this.systemShow = true
        },
        toBase() {
            this.baseShow = true
            this.systemShow = false
        },
        toApplication(e) {
            this.system = e
            this.systemShow = false
            this.applicationShow = true
        },
        upToSystem() {
            this.systemShow = true
            this.applicationShow = false
        },
        submit(e) {
            this.application = e
            // this.confirmSercure = true
            this.confirmAdd()
        },
        // confirmSecure() {
        //     let secureData = {
        //         pwd: encrypt(this.exportKeyForm.securePassword),
        //         did: this.chainUser.did
        //     }
        //     this.$refs.exportKeyForm.validate((valid) => {
        //         if (valid) {
        //             verifyPwd(secureData)
        //                 .then((res) => {
        //                     if (res.code == 200) {
        //                         this.confirmAdd()
        //                     }
        //                 })
        //                 .catch(() => {
        //                 });
        //         }
        //     });

        // },
        confirmAdd() {
            let data = {
                base: this.base,
                system: this.system,
                application: this.application
            }
            subchainApply(data).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    })
                    this.confirmSercure = false
                    this.$router.push({
                        path: '/subchain/subchainAccess'
                    })
                }

            })
        },
        handleExportKeyClose() {
            this.confirmSercure = false
            this.exportKeyForm.securePassword = ''
        }
    }
}
</script>


<style lang="scss" scoped>
.btnWarp {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
}
.labelWidth120{
    ::v-deep.el-form-item__label {
        width: 120px;
    }

    ::v-deep.el-form-item__content {
        margin-left: 120px;
    }
}
</style>