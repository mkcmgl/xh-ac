<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="sidebar-top" v-if="!sidebar.hide">
      账户中心
      <el-popover placement="left-start" trigger="click" class="fixHeard">
        <div class="changeBussiness">
          切换其他业务
        </div>
        <div class="showContent changeLogo1" @click="toBussniness">
          主链系统
        </div>
        <div class="showContent changeLogo2" @click="toPublic"
          v-if="checkRole(['common', 'person', 'organization', 'backbone'])">
          公共服务管理平台
        </div>
        <div class="showContent changeLogo3" @click="toMergedIdentity"
          v-if="checkRole(['common', 'person', 'organization'])">
          融合标识管理平台
        </div>
        <div class="showContent changeLogo4" v-if="checkRole(['backbone'])" @click="toSpv">
          监测监管服务平台
        </div>
        <img src="../assets/images/icon.png" slot="reference" style="cursor:pointer"></img>
      </el-popover>
    </div>
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{ sidebarHide: sidebar.hide }" class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { redirect, redirectIdentity, redirectPublic,redirectSpv } from "@/api/enterOther/enterOther.js"
import { removeToken,removeOrtherToken } from '@/utils/auth.js'
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar } from './components'
import { confirmType } from '@/api/realnameAuthentication/realnameAuthentication.js'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      fixedHeader: state => state.settings.fixedHeader,
      roles: state => state.user.roles
    }),
    classObj() {
      return {
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    },
    variables() {
      return variables;
    }
  },
  created() {
    let val = this.$route
    if (val.name == 'Index') {
      this.sidebar.hide = true
    } else {
      this.sidebar.hide = false
    }
  },
  watch: {
    $route(val) {
      if (val.name == 'Index') {
        this.sidebar.hide = true
      } else {
        this.sidebar.hide = false
      }
    }
  },
  methods: {
    checkRole,
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    goTarget(href) {
      let windows = window
      windows.open(href, '_self');
    },
    toBussniness() {
      let roleArr = this.roles
      if (roleArr.includes('common')) {
        this.$message({
          message: '认证为企业用户即可使用该功能',
          type: 'warning',
          customClass: 'global-messageZindex'
        })
      } else if (roleArr.includes('person')) {
        //判断是个人用户还是子链用户,>0是子链，可以进op
        confirmType().then(res => {
          if (res.code == 200) {
            if (res.data > 0) {
              this.toOp()
            } else {
              this.$message({
                message: '升级为企业用户即可使用该功能。升级企业功能暂未上线',
                type: 'warning',
                customClass: 'global-messageZindex'
              })
            }
          }
        })
      } else {
        this.toOp()
      }
    },
    toOp() {
      let params = {
        clientId: 'op'
      }
      redirect(params).then(res => {
        let data = res.data.code
        let toUrl = `${res.data.redirectUri}?data=${data}`
        let url = process.env.NODE_ENV === "production" ? toUrl : 'http://192.168.1.103:81/login?data=' + data + ''
        this.goTarget(url)
      })
    },
    toMergedIdentity() {
      let roleArr = this.roles
      if (roleArr.includes('common')) {
        this.$message({
          message: '认证为企业用户即可使用该功能',
          type: 'warning',
          customClass: 'global-messageZindex'
        })
      } else if (roleArr.includes('person')) {
        this.$message({
          message: '升级为企业用户即可使用该功能。升级企业功能暂未上线',
          type: 'warning',
          customClass: 'global-messageZindex'
        })
      } else {
        let params = {
          clientId: 'mir'
        }
        redirectIdentity(params).then(res => {
          let data = res.data.code
          let toUrl = `${res.data.redirectUri}?data=${data}`
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://192.168.1.103:82/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    toPublic() {
      let roleArr = this.roles
      if (roleArr.includes('common')) {
        this.$message({
          message: '请完成实名认证',
          type: 'warning',
          customClass: 'global-messageZindex'
        })
      } else {
        let params = {
          clientId: 'ps'
        }
        redirectPublic(params).then(res => {
          let data = res.data.code
          let toUrl = `${res.data.redirectUri}?data=${data}`
          let url = process.env.NODE_ENV === "production" ? toUrl : ' http://10.180.13.238:81/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    toSpv(router){
      removeOrtherToken()
      redirectSpv().then(res => {
        let data = res.data.code
        let toUrl = `${res.data.redirectUri}?data=${data}&&router=${router}`
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://10.180.13.238:81/login?data=' + data+ '&&router='+router
          this.goTarget(url)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 60;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}

.fixHeard {
  z-index: 9999;
  float: right;
  margin-right: 10px;

}

.changeBussiness {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #333333;
  line-height: 20px;
  margin-bottom: 10px;
}

.showContent {
  width: 264px;
  height: 50px;
  margin-bottom: 10px;
  background: #F0F6FF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  z-index: 9999999;
  cursor: pointer;
  background-size: 28px 28px;
  background-position: 20px 11px;
  background-repeat: no-repeat;
  font-size: 14px;
  font-family: PingFang SC-常规体, PingFang SC;
  font-weight: normal;
  color: #333333;
  line-height: 50px;
  padding-left: 58px;
}

.changeLogo1 {
  background-image: url('../assets/images/Businessoperations1.png');
}

.changeLogo2 {
  background-image: url('../assets/images/publicservice1.png');
}

.changeLogo3 {
  background-image: url('../assets/images/Fusionmarking1.png');
}

.changeLogo4 {
  background-image: url('../assets/images/Supervisionservice1.png');
}

.changeLogo1:hover {
  background: #2C89EB;
  background-image: url('../assets/images/Businessoperations2.png');
  background-size: 28px 28px;
  background-position: 20px 11px;
  background-repeat: no-repeat;
  color: #FFFFFF;
}

.changeLogo2:hover {
  background: #2C89EB;
  background-image: url('../assets/images/publicservice2.png');
  background-size: 28px 28px;
  background-position: 20px 11px;
  background-repeat: no-repeat;
  color: #FFFFFF;
}

.changeLogo3:hover {
  background: #2C89EB;
  background-size: 28px 28px;
  background-position: 20px 11px;
  background-repeat: no-repeat;
  background-image: url('../assets/images/Fusionmarking2.png');
  color: #FFFFFF;
}

.changeLogo4:hover {
  background: #2C89EB;
  background-size: 28px 28px;
  background-position: 20px 11px;
  background-repeat: no-repeat;
  background-image: url('../assets/images/Supervisionservice2.png');
  color: #FFFFFF;
}

.icon-show {
  width: 30px;
  height: 30px;
  font-size: 12px;
  color: #333;
}
</style>
