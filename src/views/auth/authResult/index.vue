<template>
  <div class="right">
    <div class="title">实名认证</div>

    <div class="top">
      <div class="topNum">
        <div class="first">
          <img src="@/assets/images/a170.png" alt="" />
          <span class="back">1</span>

          <div class="dscMiddle">授权数字身份标识</div>
        </div>
        <i class="middle"></i>
        <div class="first">
          <img src="@/assets/images/a170.png" alt="" />
          <span class="back">2</span>
          <div class="dscMiddle">填写申请材料</div>
        </div>
        <i class="middle"></i>
        <div class="first">
          <img src="@/assets/images/a170.png" alt="" />
          <span class="back">3</span>
          <div class="dscMiddle">完成认证申请</div>
        </div>
      </div>
    </div>

    <div class="mainTitle">
      <img
        style="margin: auto; display: block; height: 6.25rem"
        src="@/assets/images/iconWarning.png"
        alt=""
      />
      <h1 style="margin: 1.5rem auto 1rem auto; display: table">
        认证申请提交成功
      </h1>
      <span
        style="
          margin: auto;
          display: table;
          font-family: PingFang SC-常规体, PingFang SC;
          font-weight: 400;
          color: #999;
        "
        >您已提交认证申请，请耐心等待审核结果</span
      >
    </div>
    <div class="idData">
      <div class="centerTitle">数字身份信息</div>
      <div class="data">
        <el-row>
          <el-col :span="2"><span class="dscTitle">数字身份主体</span></el-col>
          <el-col :span="10"
            ><span class="dscData">{{ userData.userName }}</span></el-col
          >
          <el-col :span="2"> <span class="dscTitle">数字身份标识</span></el-col>
          <el-col :span="10">
            <span class="dscData">{{ userData.did }}</span></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="idData">
      <div class="centerTitle">认证信息</div>
      <div class="authData">
        <div v-if="authData.authType == '101'">
          <el-row>
            <el-col :span="2"><span class="dscTitle">认证类型</span></el-col>
            <el-col :span="10"><span class="dscData">个人认证</span></el-col>
            <el-col :span="2"> <span class="dscTitle">申请时间</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.applyDate }}</span></el-col
            >
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"><span class="dscTitle">真实姓名</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.realName }}</span></el-col
            >
            <el-col :span="2"> <span class="dscTitle">身份证号</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.idNumber }}</span></el-col
            >
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"
              ><span class="dscTitle">身份证头像面</span></el-col
            >
            <el-col :span="10"
              ><span class="dscPoint" @click="showImg('idEmblem')"
                >点击查看图片</span
              ></el-col
            >
            <el-col :span="2">
              <span class="dscTitle">身份证国徽面</span></el-col
            >
            <el-col :span="10"
              ><span class="dscPoint" @click="showImg('idPortrait')"
                >点击查看图片</span
              ></el-col
            >
          </el-row>
        </div>
        <div v-if="authData.authType == '102'">
          <el-row>
            <el-col :span="2"><span class="dscTitle">认证类型</span></el-col>
            <el-col :span="10"><span class="dscData">企业认证</span></el-col>
            <el-col :span="2"> <span class="dscTitle">申请时间</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.applyDate }}</span></el-col
            >
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"><span class="dscTitle">机构名称</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.orgName }}</span></el-col
            >
            <el-col :span="2"> <span class="dscTitle">机构简称</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.org }}</span></el-col
            >
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"
              ><span class="dscTitle">统一社会信用代码</span></el-col
            >
            <el-col :span="10"
              ><span class="dscData">{{ authData.creditCode }}</span></el-col
            >
            <el-col :span="2"> <span class="dscTitle">营业执照</span></el-col>
            <el-col :span="10"
              ><span class="dscPoint" @click="showImg('businessLicense')"
                >点击查看图片</span
              ></el-col
            >
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"><span class="dscTitle">地址</span></el-col>
            <el-col :span="10"
              ><span class="dscData">**省**市**区</span></el-col
            >
            <el-col :span="2"> <span class="dscTitle">详细地址</span></el-col>
            <el-col :span="10"><span class="dscData">*****</span></el-col>
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"><span class="dscTitle">联系人邮箱</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.contactEmail }}</span></el-col
            >
            <el-col :span="2">
              <span class="dscTitle">联系人手机号</span></el-col
            >
            <el-col :span="10"
              ><span class="dscData">{{ authData.contactPhone }}</span></el-col
            >
          </el-row>
          <el-row style="margin-top: 1rem">
            <el-col :span="2"><span class="dscTitle">通过时间</span></el-col>
            <el-col :span="10"
              ><span class="dscData">{{ authData.reviewDate }}</span></el-col
            >
            <el-col :span="2"> <span class="dscTitle">授权书</span></el-col>
            <el-col :span="10"
              ><span class="dscPoint" @click="showImg('la')"
                >点击查看图片</span
              ></el-col
            >
          </el-row>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { decrypt } from "@/utils/jsencrypt";
import { mapState } from "vuex";
import { authGetInfo } from "@/api/did";
import store from "@/store";
import { deepClone } from "@/utils";
export default {
  name: "authResult",

  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      authData: {},
      authDscData: {},
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      store.state.user.userData.authStatus == 0 &&
      to.fullPath == "/auth/authResult"
    ) {
      next("/auth");
    } else {
      next();
    }
  },
  mounted() {
    this.getInfoData();
  },
  computed: {
    ...mapState({
      userData: (state) => state.user.userData,
    }),
  },
  watch: {},
  methods: {
    selectData(dsc, value) {
      const slctDsc = decrypt(dsc);
      const len = slctDsc.length;
      switch (value) {
        case "realName":
          this.authData[value] = slctDsc;
          slctDsc.toString().substring(0, 3) +
            "***" +
            slctDsc.toString().substring(len - 2, len);

        case "idNumber":
          this.authData[value] =
            slctDsc.toString().substring(0, 3) +
            "***" +
            slctDsc.toString().substring(len - 2, len);
          break;
        case "email":
          this.authData[value] =
            slctDsc.toString().substring(0, 3) +
            "***" +
            slctDsc.toString().substring(len - 7, len);
          break;
        case "phone":
          this.authData[value] =
            slctDsc.toString().substring(0, 3) +
            "***" +
            slctDsc.toString().substring(len - 3, len);
          break;
        default:
          break;
      }
    },

    getInfoData() {
      authGetInfo(this.userData.did).then((res) => {
        const resData = res.data;

        if (resData.realName) {
          const name = decrypt(resData.realName);
          if (name) {
            const len = name.length;
            resData.realName =
              name.substring(0, 3) + "***" + name.substring(len - 2, len);
          }
        }
        if (resData.contactEmail) {
          const email = decrypt(resData.contactEmail);
          if (email) {
            const len = email.length;
            resData.contactEmail =
              email.substring(0, 3) + "****" + email.substring(len - 7, len);
          }
        }
        if (resData.idNumber) {
          const number = decrypt(resData.idNumber);
          if (number) {
            const len = number.length;
            resData.idNumber =
              number.substring(0, 3) +
              "********" +
              number.substring(len - 2, len);
          }
        }
        if (resData.contactPhone) {
          const phone = decrypt(resData.contactPhone);
          if (phone) {
            const len = phone.length;
            resData.contactPhone =
              phone.substring(0, 3) + "****" + phone.substring(len - 3, len);
          }
        }
        this.authData = resData;
      });
    },

    showImg(value) {
      this.dialogImageUrl = this.baseUrl + this.authData[value];
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";
.top {
  padding-left: 14.75rem;
  padding-top: 3.125rem;
  padding-right: 14.75rem;
  .topNum {
    display: flex;
    justify-content: space-between;
    .first {
      position: relative;
      justify-content: space-between;
      text-align: center;
    }
    .first img {
      height: 6.25rem;
    }
    .first .back {
      position: relative;
      top: -4.625rem;
      font-size: 2rem;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      display: block;
    }
    .dscMiddle {
      margin-top: -1.25rem;
    }
    .middle {
      display: block;
      height: 3.75rem;
      width: 12.5rem;
      border-bottom: 0.1875rem solid #dfecf7;
      padding: 1rem 0;
    }
  }
}
.mainTitle {
  background: #ffff;
  margin: 3.125rem 0.625rem 0 0.625rem;
  padding: 1.25rem 2.5rem;
  height: 100%;
  font-size: 1.333333rem;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #333;
  line-height: 1.833333rem;
}
.idData {
  background: #ffff;
  margin: 3.125rem 0.625rem 0 0.625rem;
  padding: 1.25rem 2.5rem;
  height: 100%;
}
.centerTitle {
  height: 1.833333rem;
  font-size: 1.333333rem;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #333;
  line-height: 1.833333rem;
  margin: 0 0;
}
.data {
  height: 3rem;
  margin-top: 0.5rem;
}
.dscTitle {
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #999;
  font-size: 1.125rem;
}
.dscData {
  font-family: PingFang SC-Bold, PingFang SC;
  color: #333;
  font-weight: 500;
  font-size: 1.125rem;
}
.authData {
  height: 14rem;
  margin-top: 0.5rem;
}
.dscPoint {
  font-family: PingFang SC-Bold, PingFang SC;
  color: #409eff;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
}
</style>