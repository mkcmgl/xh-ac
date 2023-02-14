<template>
    <el-dialog :title="isLogin ? '选择登录角色' : '切换身份'" :visible.sync="chooseShow" width="28%" top="25vh"
        :append-to-body="true" z-index="99999" :show-close="showClose" :close-on-press-escape="showClose"
        :close-on-click-modal="showClose" :before-close="close">
        <div class="line"></div>
        <div class="warpHeight">
            <div class="creatWarp" style="margin-bottom:15px" v-for="(item, index) in identityList" :key="index"
                @click="chooseIdentity(item)">
                <div class="logo">
                    <img src="@/assets/images/interpriseLogo.png" v-if="item.roleName == '企业用户'"></img>
                    <img src="@/assets/images/subchainLogo.png"
                        v-if="item.roleName == '子链用户' || item.roleName == '子链管理员'"></img>
                    <img src="@/assets/images/personLogo.png" v-if="item.roleName == '个人用户'"></img>
                </div>
                <div class="content">
                    <p class="name"><span class="mr5">{{item.roleName}}</span>{{item.did }}</p>
                    <p class="describe">{{ item.name }}</p>
                </div>
                <div class="right">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div v-if="hasIdentity">
                <span>'暂无身份可切换'</span>
            </div>
        </div>

    </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { switchRole, chooserole } from '@/api/login/login.js'
import router from '../../router'
import { removeOrtherToken } from '@/utils/auth'
export default {
    name: "changeIdentity",
    props: {
        showClose: {
            default: false,
            type: Boolean
        },
        disableShow: {
            default: false,
            type: Boolean
        },
        isLogin: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            changeIdentity: false,
            chooseShow: false,
            identityList: [],
            hasIdentity: false
        };
    },
    watch: {
        disableShow: function (val) {
            this.chooseShow = val
            if (val) {
                this.getChangeList()
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            roles: state => state.user.roles,
            hasChangeIdentity: state => state.user.hasChangeIdentity
        })
    },
    created() {

    },
    mounted() {
    },
    methods: {
        getChangeList() {
            switchRole().then(res => {
                if (this.isEmpty(res.data)) {
                    if (this.isLogin) {
                        this.$router.push({ path: '/' })
                    } else {
                        this.hasIdentity = true
                    }
                } else {
                    this.identityList = res.data
                }
            })
        },
        chooseIdentity(item) {
            let acsn = item.acsn
            chooserole(acsn).then(res => {
                if (res.code == 200) {
                    this.$store.commit('SET_ROLES', [])
                    this.$store.commit('SET_PERMISSIONS', [])
                    removeOrtherToken()
                    if (this.$route.path == '/index') {
                        this.$store.dispatch('GetInfo').then(() => {
                            this.$store.dispatch('GetUserDigitalInfo')
                            this.$store.dispatch('GenerateRoutes').then(accessRoutes => {
                                // 根据roles权限生成可访问的路由表
                                router.addRoutes(accessRoutes) // 动态添加可访问路由表
                            })
                        }).catch(err => {
                            this.$store.dispatch('LogOut').then(() => {
                                this.$store.commit('SET_TOKEN', '')
                                this.$store.commit('SET_ROLES', [])
                                this.$store.commit('SET_PERMISSIONS', [])
                                removeToken()
                                Message.error(err)
                                next({ path: '/' ,replace:true})
                            })
                        })
                    }
                    this.$router.push({ path: '/index',replace:true })
                    this.close()
                }
            })
        },
        close() {
            this.$emit('close', false)
        }
    },
};
</script>

<style scoped lang="scss">
.name {
    overflow: hidden;
}

.creatWarp {
    cursor: pointer;
}
.warpHeight{
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

