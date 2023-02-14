<template>
  <div class="app-container home">
    <div class="title">总览</div>
    <div class="warp">
      <div class="left">
        <div class="leftWarp">
          <div class="leftTopItem">
            <div class="leftTopTitle">
              主链系统
            </div>
            <div class="leftTopDescribe">
              提供子链、公共服务等生态接入运营管理功能
            </div>
          </div>
          <div class="leftBottom">
            <div class="leftBottom1">
              <span class="text1 text">子链接入数</span>
              <span class="textNum1">{{ childLinkNum ? childLinkNum : '0' }}</span>
              <span class="text2 text">公共服务接入数</span>
              <span class="textNum2">{{ publicServiceLinkNum ? publicServiceLinkNum : '0' }}</span>
              <span class="lines"></span>
            </div>
            <div class="leftBottom2">
              <span class="useIntro">使用指引</span>
              <span class="colorNum colorNum1">01</span>
              <span class="text text3">创建数字身份</span>
              <span class="colorNum colorNum2">02</span>
              <span class="text text3">实名认证</span>
              <span class="colorNum colorNum2">03</span>
              <span class="text text3">子链/公共服务接入</span>
            </div>
          </div>
          <el-button type="" class="enterBtn" @click="enterBusinessPublic">立即进入</el-button>
        </div>
        <div class="leftWarp" v-if="checkRole(['common', 'person', 'organization'])">
          <div class="leftTopItem">
            <div class="leftTopTitle">
              融合标识管理平台
            </div>
            <div class="leftTopDescribe">
              提供对新型分布式标识和工业互联网标识的融合管理
            </div>
          </div>
          <div class="leftBottom">
            <div class="leftBottom1">
              <span class="text1 text">标识注册量</span>
              <span class="textNum1">{{ registerTotalNum ? registerTotalNum : '0' }}</span>
              <span class="text2 text">标识解析量</span>
              <span class="textNum2">{{ resolveTotalNum ? resolveTotalNum : '0' }}</span>
              <span class="lines"></span>
            </div>
            <div class="leftBottom2" v-if="!checkRole(['backbone'])">
              <span class="useIntro">使用指引</span>
              <span class="colorNum colorNum1">01</span>
              <span class="text text3">创建标识数据模板</span>
              <span class="colorNum colorNum2">02</span>
              <span class="text text3">标识数据注册</span>
              <span class="colorNum colorNum2">03</span>
              <span class="text text3">标识数据解析</span>
            </div>

          </div>
          <el-button type="" class="enterBtn" @click="enterFusionmarking">立即进入</el-button>
        </div>
        <div class="leftWarp hasPic" v-if="checkRole(['common', 'person', 'organization', 'backbone'])">
          <div class="leftTopItem">
            <div class="leftTopTitle">
              公共服务管理平台
            </div>
            <div class="leftTopDescribe">
              提供公共服务及服务共享功能
            </div>
          </div>
          <div class="leftBottomItem">
            <div class="leftBottomDetal bass">
              <el-image :src="bassBg1" class="surviceBg1"></el-image>
              <el-image :src="bassBg2" class="surviceBg2"></el-image>
              <p class="leftBottomDetalTitle">BaaS服务</p>
              <p class="leftBottomDetalDes">提供一站式区块链服务</p>
            </div>
            <div class="leftBottomDetal number">
              <el-image :src="numberBg1" class="surviceBg1"></el-image>
              <el-image :src="numberBg2" class="surviceBg2"></el-image>
              <p class="leftBottomDetalTitle">分布式数字身份</p>
              <p class="leftBottomDetalDes">实现分布式数字证书签发</p>
              <div class="waitOnline" style="background: #8B6BCC;">待上线</div>
            </div>
            <div class="leftBottomDetal save">
              <el-image :src="saveBg1" class="surviceBg1"></el-image>
              <el-image :src="saveBg2" class="surviceBg2"></el-image>
              <p class="leftBottomDetalTitle">通用存证服务</p>
              <p class="leftBottomDetalDes">电子数据可信化保存</p>
              <div class="waitOnline" style="background: #527DF1;">待上线</div>
            </div>
            <div class="leftBottomDetal nft">
              <el-image :src="nftBg1" class="surviceBg1"></el-image>
              <el-image :src="nftBg2" class="surviceBg2"></el-image>
              <p class="leftBottomDetalTitle">NFT服务</p>
              <p class="leftBottomDetalDes">实现NFT铸造、管理</p>
              <div class="waitOnline" style="background: #43B2CD;">待上线</div>
            </div>
          </div>
          <el-button type="" class="enterBtn" @click="enterPublic">立即进入</el-button>
        </div>
        <div class="leftWarp survice" v-if="checkRole(['backbone'])">
          <div class="leftTopItem">
            <div class="leftTopTitle">
              监测监管服务平台
            </div>
            <div class="leftTopDescribe">
              平台运行情况持续检测监管
            </div>
          </div>
          <div class="surviceLeftBottom">
            <div class="surviceLeftBottomItem" @click="enterMonitor('monitor')">
              <el-image :src="runMonitorBg1" class="monitorBg1"></el-image>
              <el-image :src="runMonitorBg2" class="monitorBg2"></el-image>
              <div class="surviceContent">平台运行检测</div>
            </div>
            <div class="surviceLeftBottomItem" @click="enterMonitor('login')">
              <el-image :src="monitorSurBg1" class="monitorBg1"></el-image>
              <el-image :src="monitorSurBg2" class="monitorBg2"></el-image>
              <div class="surviceContent">监管服务管理</div>
            </div>
          </div>
          <el-button type="" class="enterBtn" @click="enterMonitor('login')">立即进入</el-button>
        </div>
      </div>
      <div class="right">
        <p class="userName">你好！{{ userInfo.userName }}</p>
        <ul class="userInfo">
          <li>
            <span class="userInfoTitle formTitle">数字身份</span>
            <span class="userInfoDetail" v-if="userInfo.did">{{ userInfo.did }}</span>
            <span class="noData" v-if="!userInfo.did">未创建</span>
            <span class="create" v-if="!userInfo.did" @click="openCreatDid">立即创建</span>
          </li>
          <li v-if="!checkRole(['backbone'])">
            <span class="userInfoTitle formTitle">实名认证</span>
            <span class="hascertifi" v-if="userInfo.authStatus == 1">已认证</span>
            <span class="hascertifi" v-if="userInfo.authStatus == 2">认证中</span>
            <span class="hascertifi1" v-if="userInfo.authStatus == 3">认证未通过</span>
            <span class="noData" v-if="userInfo.authStatus == 0 || !userInfo.authStatus">未认证</span>
            <span class="create" v-if="userInfo.authStatus == 0 || !userInfo.authStatus" @click="toAuth">立即认证</span>
          </li>
          <li>
            <span class="userInfoTitle formTitle">最近登录</span>
            <span class="userInfoDetail">{{ userInfo.loginDate }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 创建数字身份方式弹框 -->
    <el-dialog title="选择方式" :visible.sync="creatShow" width="28%" :before-close="handleClose" top="33vh"
      :append-to-body="true" z-index="99999">
      <div class="line"></div>
      <div class="creatWarp" style="margin-bottom:15px" @click="creatDid">
        <div class="logo">
          <img src="@/assets/images/creatLogo.png"></img>
        </div>
        <div class="content">
          <p class="name">创建数字身份</p>
          <p class="describe">创建浪潮自主分布式数字身份</p>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- <div class="creatWarp" @click="importDid">
        <div class="logo">
          <img src="@/assets/images/importLogo.png"></img>
        </div>
        <div class="content">
          <p class="name">导入数字身份</p>
          <p class="describe">导入已有浪潮分布式数字身份</p>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { redirect, redirectIdentity, redirectPublic, redirectSpv } from "@/api/enterOther/enterOther.js"
import { checkPermi, checkRole } from "@/utils/permission"; // 权限判断函数
import { confirmType } from '@/api/realnameAuthentication/realnameAuthentication.js'
import { getInfo } from "@/api/user/user.js";
import { getIndexData } from "@/api/indexData/indexData.js"
import { mapState } from 'vuex';
import { removeToken } from '@/utils/auth.js'
import { env } from "process";
import { removeOrtherToken } from '@/utils/auth'
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.2",
      bassBg1: require('../assets/images/bassBg1.png'),
      bassBg2: require('../assets/images/bassbg2.png'),
      numberBg1: require('../assets/images/numberBg1.png'),
      numberBg2: require('../assets/images/numberBg2.png'),
      saveBg1: require('../assets/images/saveBg1.png'),
      saveBg2: require('../assets/images/saveBg2.png'),
      nftBg1: require('../assets/images/nftBg1.png'),
      nftBg2: require('../assets/images/nftBg2.png'),
      runMonitorBg1: require('../assets/images/runMonitorBg1.png'),
      runMonitorBg2: require('../assets/images/runMonitorBg2.png'),
      monitorSurBg1: require('../assets/images/monitorSurBg1.png'),
      monitorSurBg2: require('../assets/images/monitorSurBg2.png'),
      lastLoginTime: '2022-6-28 14:22:11',
      registerTotalNum: '',
      resolveTotalNum: '',
      childLinkNum: '',
      publicServiceLinkNum: '',
      creatShow: false,
      changeIdentity: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      roles: state => state.user.roles,
    })
  },
  created() {
    getIndexData().then(res => {
      if (res.code == 200) {
        this.childLinkNum = res.data.childLinkNum
        this.publicServiceLinkNum = res.data.publicServiceLinkNum
        this.resolveTotalNum = res.data.resolveTotalNum
        this.registerTotalNum = res.data.registerTotalNum
      }
    })

  },
  mounted() {
  },
  methods: {
    checkPermi,
    checkRole,
    goTarget(href) {
      removeOrtherToken()
      let windows = window
      windows.open(href, '_self', true);
    },
    goTargetNew(href) {
      let windows = window
      removeOrtherToken()
      windows.open(href, '_blank');
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
        let url = process.env.NODE_ENV === "production" ? toUrl : 'http://192.168.186.180:82/login?data=' + data + ''
        this.goTarget(url)
      })
    },
    enterFusionmarking() {
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
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://10.180.13.238:81/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    enterPublic() {
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
          let url = process.env.NODE_ENV === "production" ? toUrl : '  http://10.180.13.15:81/login?data=' + data + ''
          this.goTarget(url)
        })
      }
    },
    enterMonitor(e) {
      redirectSpv().then(res => {
        let data = res.data.code
        let toUrl = `${res.data.redirectUri}?data=${data}&&router=${e}`
        if (e == 'monitor') {
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://10.180.13.238:82/login?data=' + data + '&&router=' + e
          this.goTargetNew(url)
        } else {
          let url = process.env.NODE_ENV === "production" ? toUrl : 'http://10.180.13.238:82/login?data=' + data + '&&router=' + e
          this.goTarget(url)
        }
      })
    },
    toAuth() {
      if (this.userInfo.did) {
        this.$router.push({
          path: '/auth'
        })
      } else {
        this.$message({
          message: '请先创建数字身份',
          type: 'error'
        })
      }
    },
    openCreatDid() {
      this.creatShow = true
    },
    handleClose() {
      this.creatShow = false
    },
    creatDid() {
      this.$router.push({
        path: '/account/creatDid'
      })
    },
    importDid() {
      // this.$router.push({
      //   path: '/account/imortDid/'
      // })
      this.$router.push({
        path: '/account/importPrivateKey',
      })
    }
  },
};
</script>

<style scoped lang="scss">
//将message的提示框位于遮罩层的上方
.creatWarp {
  cursor: pointer;
}

.home {
  .title {
    width: 210px;
    height: 30px;
    font-size: 22px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 30px;
    padding-left: 30px;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style-type: none;
  }

  .warp {
    margin-left: 30px;
    overflow: hidden;


    .left {
      margin-right: 20px;
      width: 1350px;
      float: left;

      .leftWarp {
        width: 1350px;
        height: 150px;
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        margin-top: 20px;
        padding-top: 12px;
        position: relative;

        .enterBtn {
          position: absolute;
          width: 80px;
          height: 30px;
          line-height: 30px;
          top: 20px;
          right: 30px;
          background: #2F88FF;
          color: #fff;
          font-size: 12Px;
          padding: 0 0;
          border-radius: 4px 4px 4px 4px;
          font-family: PingFang SC-Regular, PingFang SC;
        }

        .enterBtn:hover {
          background: #559EFF;
        }

        .leftTopItem {
          height: 22px;
          border-left: 4px solid #2F88FF;
          margin-left: 30px;

          .leftTopTitle {
            display: inline-block;
            margin-left: 10px;
            height: 22px;
            font-size: 16px;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 800;
            color: #333333;
            line-height: 22px;
          }

          .leftTopDescribe {
            margin-left: 20px;
            display: inline-block;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-常规体, PingFang SC;
            font-weight: normal;
            color: #999999;
            line-height: 20px;
          }


        }

        .leftBottom {
          height: 113px;
          position: relative;

          .leftBottom1 {
            height: 100%;
            width: 489px;
            float: left;
            overflow: hidden;
          }

          .leftBottom2 {
            height: 100%;
            width: 859px;
            float: right;
            overflow: hidden;
          }

          .text {
            margin-top: 53px;
            display: inline-block;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-常规体, PingFang SC;
            font-weight: normal;
            color: #333333;
            line-height: 20px;

          }

          .text1 {
            margin-left: 45px;
          }

          .textNum1 {
            display: inline-block;
            margin-top: 41px;
            margin-left: 20px;
            height: 42px;
            font-size: 30px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 42px;
            vertical-align: sub;
          }

          .text2 {
            margin-left: 100px;
          }

          .textNum2 {
            display: inline-block;
            margin-top: 41px;
            margin-left: 20px;
            height: 42px;
            font-size: 30px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #333333;
            vertical-align: sub;
          }

          .lines {
            display: inline-block;
            position: absolute;
            left: 489px;
            top: 33px;
            width: 2px;
            height: 50px;
            background: #EBEBEB;
            opacity: 1;
          }

          .useIntro {
            display: inline-block;
            margin-top: 49px;
            margin-left: 110px;
            // width: 125px;
            padding-right: 10px;
            height: 30px;
            border-radius: 15px 15px 15px 15px;
            border: 1px solid #DADADA;
            background: url('../assets/images/useguide.png') no-repeat;
            background-size: 14px 14px;
            background-position: 12px 8px;
            padding-left: 33px;
            line-height: 30px;
            font-size: 14px;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 600;
            color: #666666;
          }

          .colorNum {
            height: 30px;
            font-size: 22px;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 800;
            color: #ACCFFF;
            line-height: 30px;
            display: inline-block;
            vertical-align: top;
            margin-top: 51px;
          }

          .colorNum1 {
            margin-left: 30px;
          }

          .colorNum2 {
            margin-left: 40px;
          }

          .text3 {
            margin-left: 7px;
          }
        }

        .leftBottomItem {
          padding-left: 30px;
          margin-top: 30px;

          .leftBottomDetal {
            display: inline-block;
            width: 310px;
            height: 100px;
            border-radius: 4px 4px 4px 4px;
            margin-right: 17px;
            overflow: hidden;
            position: relative;
            cursor: pointer;

            .waitOnline {
              height: 21px;
              padding: 0 5px;
              border-radius: 0px 4px 0px 4px;
              opacity: 1;
              font-size: calc(100vw * 12 / 1920);
              font-family: PingFang SC-常规体, PingFang SC;
              font-weight: normal;
              color: #FFFFFF;
              line-height: 21px;
              text-align: center;
              position: absolute;
              right: 0;
              top: 0;
            }

            .leftBottomDetalTitle {
              margin: 25px 0 0 91px;
              height: 24px;
              font-size: 17px;
              font-family: PingFang SC-Heavy, PingFang SC;
              font-weight: 800;
              color: #FFFFFF;
              line-height: 24px;
            }

            .leftBottomDetalDes {
              margin: 4px 0 0 91px;
              height: 18px;
              font-size: 14px;
              font-family: PingFang SC-常规体, PingFang SC;
              font-weight: normal;
              font-weight: 100;
              color: #FFFFFF;
              line-height: 18px;
            }

            .surviceBg1 {
              width: 32px;
              height: 38px;
              position: absolute;
              top: 31px;
              left: 36px;
            }

            .surviceBg2 {
              width: 50px;
              height: 60px;
              position: absolute;
              top: 31px;
              right: 0px;
              top: 28px
            }
          }

          .bass {
            background: linear-gradient(137deg, #50A5FA 0%, #5EA1FB 26%, #85C6FF 100%);
            margin-right: 17px;
          }

          .number {
            background: linear-gradient(156deg, #A485E3 0%, #B394F1 100%);
            margin-right: 17px;
          }

          .save {
            background: linear-gradient(137deg, #6E94FB 0%, #85A6FF 100%);
            margin-right: 17px;
          }

          .nft {
            background: linear-gradient(138deg, #6BC1E1 0%, #85DDDD 100%);
          }
        }
      }

      .hasPic {
        height: 207px;
      }

      .survice {
        height: 197px;

        .surviceLeftBottom {
          margin-top: 30px;
          padding-left: 30px;

          .surviceLeftBottomItem {
            position: relative;
            display: inline-block;
            width: 635px;
            height: 90px;
            background: #F5F8FF;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            border: 1px solid #EAEEF5;
            margin-right: 20px;
            position: relative;
            cursor: pointer;

            .monitorBg1 {
              width: 50px;
              height: 50px;
              position: absolute;
              top: 19px;
              left: 28px;
            }

            .monitorBg2 {
              width: 80px;
              height: 60px;
              position: absolute;
              right: 30px;
              top: 25px
            }

            .surviceContent {
              margin-top: 34px;
              margin-left: 86px;
              height: 22px;
              font-size: 16px;
              font-family: PingFang SC-Heavy, PingFang SC;
              font-weight: 800;
              color: #333333;
              line-height: 22px;
            }
          }
        }


      }
    }

    .right {
      width: 490px;
      min-height: 239px;
      background: #FFFFFF;
      border-radius: 4px 4px 4px 4px;
      float: left;
      margin-top: 20px;
      background-image: url('../assets/images/infoLogo.png');
      background-size: 50px 59px;
      background-repeat: no-repeat;
      background-position: 30px 30px;

      .userName {
        height: 25px;
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 25px;
        margin: 48px 0 0 116px;
      }

      .userInfo {
        margin-top: 22px;
        padding-left: 30px;

        li {
          margin-bottom: 14px;
        }

        .userInfoTitle {
          height: 25px;
          line-height: 25px;
        }

        .hascertifi {
          display: inline-block;
          width: 70px;
          height: 25px;
          background: #DDF5E9;
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          margin-left: 30px;
          font-size: 14px;
          font-family: PingFang SC-常规体, PingFang SC;
          font-weight: normal;
          color: #4CB883;
          line-height: 25px;
          text-align: center;
        }

        .hascertifi1 {
          display: inline-block;
          height: 25px;
          padding: 0 5px;
          background: rgb(243, 90, 90);
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          margin-left: 30px;
          font-size: 14px;
          font-family: PingFang SC-常规体, PingFang SC;
          font-weight: normal;
          color: #fff;
          line-height: 25px;
          text-align: center;
        }

        .noData {
          display: inline-block;
          width: 70px;
          height: 25px;
          background: #F4F3F7;
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC-常规体, PingFang SC;
          font-weight: normal;
          color: #333333;
          line-height: 25px;
          text-align: center;
          margin-left: 30px;
        }

        .create {
          display: inline-block;
          height: 25px;
          font-size: 14px;
          font-family: PingFang SC-常规体, PingFang SC;
          font-weight: normal;
          color: #2F88FF;
          line-height: 25px;
          margin-left: 15px;
          cursor: pointer;
        }

        .userInfoDetail {
          font-size: 14px;
          font-family: PingFang SC-常规体, PingFang SC;
          font-weight: normal;
          color: #333333;
          line-height: 20px;
          margin-left: 30px;
          width: 330px;
          display: inline-block;
          overflow-wrap: break-word;
          vertical-align: middle
        }

      }
    }
  }
}
</style>

