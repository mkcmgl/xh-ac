<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/images/logotitle2.png" class="logoTitle"></img>
    </div>
    <div class="indexlogo">
      <img src="../../assets/images/indexLogo.png" class="Logoimg" @click="toIndex"></img>
    </div>
    <div class="indexlogo">
      <span class="indexTitle" @click="toIndex">概览</span>
    </div>
    <div class="indexlogo" style="margin-left:20px" v-if="showChange">
      <img src="../../assets/images/changeIdentityLogo.png" class="Logoimg" @click="changeIdentity"></img>
    </div>
    <div class="indexlogo" v-if="showChange">
      <span class="indexTitle" @click="changeIdentity">切换身份</span>
    </div>
    <div class="portrait">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/images/portrait.png" class="user-avatar">
          <!-- <i class="el-icon-caret-bottom" /> -->
          <span>{{  userInfo.userName  }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/did">
            <el-dropdown-item>
              账户中心
            </el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right-menu">
      <span class="round"></span>
      <router-link to="/did">
        <span class="rightTitle">数字身份</span>
      </router-link>
      <span class="round"></span>
      <span class="rightTitle" v-if="checkRole(['person', 'organization', 'common', 'backbone'])"
        @click="toPublic">公共服务</span>
      <span class="round" v-if="checkRole(['organization'])"></span>
      <span class="rightTitle" v-if="checkRole(['organization'])" @click="enterBusinessPublic">子链接入</span>
      <span class="round" v-if="checkRole(['organization'])"></span>
      <span class="rightTitle" v-if="checkRole(['organization'])" @click="toMir">注册标识</span>
    </div>
    <choose-identity :disableShow="changeIdentityShow" :isLogin='false' :showClose="true" :couldClose="true"
      @close="closeChange"></choose-identity>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
import { getToken, setToken, removeToken } from '@/utils/auth'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import { redirectPublic, redirectIdentity, redirect } from "@/api/enterOther/enterOther.js"
import chooseIdentity from '@/components/changeIdentity'
import { switchRole } from '@/api/login/login.js'
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
    chooseIdentity
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    ...mapState({
      userInfo: state => state.user.userInfo,
      roles: state => state.user.roles
    }),
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
  created() {
    switchRole().then(res => {
      if (!this.isEmpty(res.data)) {
        this.showChange = true
      }
    })
  },
  data() {
    return {
      changeIdentityShow: false,
      showChange: false,
    }
  },
  methods: {
    checkPermi,
    checkRole,
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    goTarget(href) {
      let windows = window
      windows.open(href, '_self', true);
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = process.env.NODE_ENV === "production" ? "/baas/account-center/" : "/baas/account-center/";
          //这里做个定时器是为了在注销的时候页面不因为用户的角色改变导致页面变化
          setTimeout(() => {
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_ROLES', [])
            this.$store.commit('SET_PERMISSIONS', [])
          }, 500)
          removeToken()
        })
      }).catch(() => { });
    },
    toIndex() {
      this.$router.push({
        path: '/index'
      })
    },
    enterBusinessPublic() {
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
        let url = process.env.NODE_ENV === "production" ? toUrl : ' http://10.180.13.238:81/login?data=' + data + ''
        this.goTarget(url)
      })
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
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://10.180.13.238:81/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    toMir() {
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
    changeIdentity() {
      this.changeIdentityShow = true
    },
    closeChange(val) {
      this.changeIdentityShow = val
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
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
}

.indexlogo {
  float: left;

  .Logoimg {
    width: 18px;
    height: 18px;
    margin-top: 21px;
    // cursor: pointer;
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

  .indexTitle:hover {
    color: #2F88FF;
  }
}
</style>
