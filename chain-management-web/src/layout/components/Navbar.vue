<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/images/logotitle2.png" class="logoTitle"></img>
      <!-- <img src="../../assets/images/logoTitle.png" class="logoTitle"></img> -->
    </div>
    <div class="indexlogo">
      <img src="../../assets/images/indexLogo.png" class="Logoimg" @click="toIndex"></img>
    </div>
    <div class="indexlogo">
      <span class="indexTitle" @click="toIndex">概览</span>
    </div>
    <div class="portrait">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/images/portrait.png" class="user-avatar">
          <span>{{ user.name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link>
            <el-dropdown-item>账户中心</el-dropdown-item>
          </router-link> -->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right-menu">
      <span class="round"></span>
      <span class="rightTitle" @click="toDid">数字身份</span>
      <span class="round"></span>
      <span class="rightTitle" v-if="checkRole(['common', 'person', 'organization','backbone'])" @click="toPublic">公共服务</span>
      <!-- <span class="round" v-if="checkRole(['organization'])"></span> -->
      <!-- <span class="rightTitle" v-if="checkRole(['organization'])">子链接入</span> -->
      <span class="round" v-if="checkRole(['organization'])"></span>
      <span class="rightTitle" v-if="checkRole(['organization'])" @click="toMir">注册标识</span>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import { redirectIdentity, redirectPublic } from '@/api/login.js'
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    checkRole,
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    async logout() {
      let windows = window
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          let url = process.env.NODE_ENV === "production" ? 'http://10.221.19.217/baas/account-center/login' : 'http://192.168.0.104:80/login'
          windows.open(url, '_self');
        })
      }).catch(() => { });
    },
    toIndex() {
      let url = process.env.NODE_ENV === "production" ? 'http://10.221.19.217/baas/account-center/index' : 'http://localhost:81/baas/account-center/index'
      window.open(url, '_self');
    },
    toDid() {
      let url = process.env.NODE_ENV === "production" ? 'http://10.221.19.217/baas/account-center/did' :  'http://10.180.13.238:80/baas/account-center/did'
      window.open(url, '_self');
    },
    toPublic() {
      let roleArr = this.user.roles
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
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://localhost:81/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    toMir() {
      let roleArr = this.user.roles
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
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://localhost:81/baas/account-center/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    goTarget(href) {
      let windows = window
      windows.open(href, '_self', true);
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .portrait {
    float: right;
    height: 100%;
    line-height: 60px;

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 28px;
          height: 28px;
          margin-top: 17px;
          display: inline-block;
          vertical-align: top;
          margin-right: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .logoTitle {
    width: 191px;
    height: 30px;
    float: left;
    margin: 15px 61px 15px 15px
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
}



// new
.indexlogo {
  float: left;

  .Logoimg {
    width: 18px;
    height: 18px;
    margin-top: 21px;
    cursor: pointer;
    vertical-align: baseline;
  }

  .indexTitle {
    font-size: 18px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #666666;
    line-height: 60px;
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
  }
}

.right-menu {
  float: right;
  height: 100%;
  // line-height: 60px;
  overflow: hidden;

  .rightTitle {
    height: 20px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #707070;
    line-height: 20px;
    margin-right: 40px;
    margin-top: 21px;
    display: inline-block;
    vertical-align: sub;
    cursor: pointer;
  }

  .rightTitle:hover {
    color: #559EFF;
  }

  .round {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #CACED3;
    margin-top: 29px;
    margin-right: 8px;

  }


}
</style>
