<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/> -->

    <div class="logo">
      <!-- <img src="@/assets/images/u1.png" /> -->
      <img src="@/assets/images/5402x.png" />
    </div>

    <div class="indexLogo hoverTo">
      <img src="@/assets/images/168.png" />
      <div >概览</div>
    </div>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
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

      <!-- <div class="userName">{name}</div> -->
      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
    
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
      </el-dropdown> -->
      <div class="dropdown">
        <el-dropdown trigger="click">
          <div class="right-name">
            <div class="avatar-wrapper">
              <img src="@/assets/images/155.png" class="user-avatar" />
            </div>
            <span class="el-dropdown-link"> {{userData.userName}} </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
  <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
  <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
  <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
  <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item> -->
            <router-link to="/user/profile">
              <el-dropdown-item>账户中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="selectList">
      <span class="dian"></span>
      <span class="rightTitle hoverTo">数字身份</span>
      <span class="dian"></span>
      <span class="rightTitle hoverTo">公共服务</span>
      <span class="dian "></span>
      <span class="rightTitle hoverTo">子链接入</span>
      <span class="dian"></span>
      <span class="rightTitle hoverTo">注册标识</span>
    </div>
  </div>
</template>

<script>
import { mapGetters ,mapState} from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";

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
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    ...mapState({
      userData:state=>state.user.userData
    }),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";
.avatar-wrapper {
  margin-top: 0.75rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.833333rem;
  img {
    height: 2.2875rem;
  }
}
.el-dropdown-link {
  font-size: 1.125rem;
}
.dropdown {
  float: left;
  height: 100%;
  line-height: 2.45rem;
}
.el-dropdown {
  margin-right: 1.25rem;
}

.navbar {
  .selectList {
    height: 100%;
    line-height: 3.9rem;
    float: right;
    .dian{
      border-radius: 50%;
    background-color: #caced3;
    margin-right: 0.625rem;
    width: 0.375rem;
    height: 0.375rem;
    display: inline-block;
    }
    .rightTitle {
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      margin-right: 2.5rem;
    }
  }

  height: 3.75rem;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 21, 41, 0.08);
  .logo {
    img {
      width: 15.625rem;
      margin-left: 1.875rem;
      margin-top: 0.75rem;
      float: left;
    }
  }
  .indexLogo {
    img {
      width: 1.5625rem;
      margin-top: 1.05rem;
      margin-left: 5rem;
      float: left;
    }
    div {
      font-size: 1.5rem;
      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;

      float: left;
      height: 3.5rem;
      line-height: 3.5rem;
      margin-left: 0.625rem;
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
