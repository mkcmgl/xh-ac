<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/> -->

    <div class="logo">
      <!-- <img src="@/assets/images/u1.png" /> -->
      <img src="@/assets/images/5402x.png" >
    </div>

    <div class="indexLogo">
      <img src="@/assets/images/168.png">
      <div>概览</div>
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" />
        
        <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip>

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>
      <div class="avatar-wrapper">
        <img src="@/assets/images/155.png" class="user-avatar">
        
      </div>
      <div class="userName">{name}</div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
    
        <el-dropdown-menu slot="dropdown" >
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'

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
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>

.avatar-wrapper{
      position: absolute;
    left: -65px;
  img{
    height: 2.1875rem;
  }
}







.navbar {
  height: 3.75rem;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 0.0625rem 0.25rem rgba(0,21,41,.08);
  .logo{

    img{
      width: 15.625rem;
      margin-left: 1.875rem;
      margin-top: 0.75rem;
    }
  }
  .indexLogo{
    margin-top: -2.25rem;
    margin-left: 21.875rem;
    img{
   width: 1.5625rem;
    }
    div{ 
      margin-top: -2.125rem;
      margin-left: 2.1875rem;
      font-size: 1.5rem;
      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;
      color: #666666;
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

    margin-top: -1.875rem;

    &:focus {
      outline: none;
    }
    .userName {
      position: relative;
      top: 6px;
      right: 20px;
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #707070;
    }

  }
}
</style>
