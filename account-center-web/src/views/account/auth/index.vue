<template>
  <div class="app-container">
    <div class="title">实名认证</div>
    <!-- 用户未完成前置条件的页面 -->
    <div class="noPermissions" v-if="!userInfo.did">
      <img src="../../../assets/images/warn.png" class="warnIcon"></img>
      <p class="sorry">抱歉！您无权访问</p>
      <p class="toDo">请完成<span @click="creatShow = true">数字身份创建</span></p>
    </div>
    <div v-else>
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
            <div>授权数字身份标识</div>
            <div>填写申请材料</div>
            <div>完成认证申请</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="warp">
            <div class="header">
              <span class="header1">请确认并授权您的数字身份标识</span>
            </div>
            <div class="desc">
              认证通过后，该标识将写入身份凭证文件中并永久留存，同时您可作为发证方将该标识写入可验证凭证文件中
            </div>
            <div style="display: flex; justify-content: center">
              <div class="iid-content px-2">{{ userInfo.did }}</div>
            </div>
            <div class="desc1">
              点击“下一步”按钮，即代表您已知晓并同意将该数字身份标识写入凭证文件中
            </div>
            <div style="display: flex; justify-content: center;    margin-top: 22px; padding-bottom: 88px;">
              <div class="step-btn" @click="goSecond">下一步</div>
            </div>
          </div>
        </el-col>
      </el-row>
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
          <router-link to="/account/creatDid">
            <i class="el-icon-arrow-right"></i>
          </router-link>
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
          <router-link to="/account/importDid">
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { getInfo } from '@/api/realnameAuthentication/realnameAuthentication.js'
import { getInfoDigital } from '@/api/digitalIdentity/digitalIdentity.js'
export default {
  name: "accountCenter",
  data() {
    return {
      hasPerimiss: false,
      creatShow: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    })
  },
  //路由进来前判断是否申请过实名认证，根据结果直接跳转到认证结果页面
  beforeRouteEnter(to,from,next) {
    if (from.path!='/account/authResult') {
      getInfoDigital().then(res => {
        if (res.code == 200) {
          if (res.data.authStatus != 0 && res.data.authStatus != null) {
            next({
              path:'/account/authResult'
            })
          }else{
            next()
          }
        }else{
          next()
        }
      })
    }else{
      next()
    }
  },
  methods: {
    getResult() {
      getInfoDigital().then(res => {
        if (res.code == 200) {
          if (res.data.authStatus != 0 && res.data.authStatus != null) {
            this.$router.push({
              path: '/account/authResult'
            })
          }
        }
      })
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
      //   path: '/account/imortDid'
      // })
      this.$router.push({
        path: '/account/importPrivateKey',
      })
    },
    goSecond() {
      this.$router.push({
        path: "/account/authMaterail",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.creatWarp {
  cursor: pointer;
}

.noPermissions {
  width: 1610px;
  height: 85vh;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 20px auto 0;
  overflow: hidden;

  .warnIcon {
    width: 80px;
    height: 80px;
    display: block;
    margin: 309px auto 0px;
  }

  .sorry {
    height: 42px;
    font-size: 30px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #333333;
    line-height: 42px;
    margin: 19px 0 0 6px;
    text-align: center;
  }

  .toDo {
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #999999;
    line-height: 22px;
    margin: 0 0;
    text-align: center;

    span {
      color: #2F88FF;
      cursor: pointer;
    }
  }
}

.shang {
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DCDEE2;
  width: 115px;
  height: 40px;
  display: flex;
  justify-content: center;
  /* text-align: center; */
  line-height: 34px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #666666;
}

.xia {
  margin-left: 15px;
  width: 250px;
  height: 40px;
  background: #2F88FF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 35px;
  display: flex;
  /* justify-items: center; */
  justify-content: center;
}

.avatar-uploader {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 260px;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 260px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

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
    background-image: url("../../../assets/images/step.png");
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
    background-image: url("../../../assets/images/unstep.png");
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

.second-header {
  margin-left: 168px;
  padding-top: 50px;
  font-size: 22px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 0px;
}

.warp {
  width: 1610px;
  height: 747px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  margin: 57px auto 0px;

  .header {
    display: flex;
    justify-content: center;
    //   padding: 90px 25px;
    padding-top: 90px;
    padding-bottom: 20px;
    height: 60px;

    .header1 {
      // height: 25px;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      line-height: 0px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    }
  }
}

.desc {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #333333;
  line-height: 55px;
}

.desc1 {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #999999;
  line-height: 0px;
}

.iid-content {
  width: fit-content;
  height: 60px;
  background: #f0f7fd;
  border-radius: 4px 4px 4px 4px;
  padding: 10px;
  opacity: 1;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #2f88ff;
  line-height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 60px;
}

.step-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 40px;
  background: #2f88ff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 0px;
  cursor: pointer;
}

.left-title {
  //   width: 44px;
  height: 30px;
  font-size: 22px;
  font-weight: 540;
  color: #333333;
  margin-bottom: 20px;
}

.app-container {
  // padding: 0 30px;
}
</style>

