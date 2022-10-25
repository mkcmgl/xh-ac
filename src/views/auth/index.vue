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
          <img src="@/assets/images/auth169.png" alt="" />
          <span class="back">2</span>
          <div class="dscMiddle">填写申请材料</div>
        </div>
        <i class="middle"></i>
        <div class="first">
          <img src="@/assets/images/auth169.png" alt="" />
          <span class="back">3</span>
          <div class="dscMiddle">完成认证申请</div>
        </div>
      </div>
    </div>

    <div class="centerMain">
      <div class="centerTitle">请确认并授权您的数字身份标识</div>
      <div class="centerDsc">
        认证通过后，该标识将写入身份凭证文件中并永久留存，同时您可作为发证方将该标识写入可验证凭证文件中
      </div>
      <div class="centerNum">
        <div class="centerDid">
          {{ userData.did }}
        </div>
      </div>
      <div class="centerNextDsc">
        点击“下一步”按钮，即代表您已知晓并同意将该数字身份标识写入凭证文件中
      </div>
      <div class="centerNext">
        <div class="next" @click="toAuthMaterail">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
export default {
  name: "auth",

  data() {
    return {
      authStatus: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(store.state.user.userData.authStatus);
    console.log(to);
    if (store.state.user.userData.authStatus != 0 && to.fullPath == "/auth") {
      next("/auth/authResult");
    } else {
      next();
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      userData: (state) => state.user.userData,
    }),
  },
  methods: {
    toAuthMaterail() {
      this.$router.push("/auth/authMaterail");
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
.centerMain {
  background: #ffff;
  height: 46rem;
  margin: 3.125rem 0.625rem 0 0.625rem;
  text-align: center;
  .centerTitle {
    font-size: 1.75rem;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    padding-top: 3.125rem;
    padding-bottom: 1.25rem;
  }
  .centerDsc {
    font-size: 1.125rem;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .centerNum {
    padding: 5.5rem 0;
    .centerDid {
      display: inline;
      background: #f0f7fd;
      padding: 1.625rem;
      font-size: 1.5rem;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #2f88ff;
      border-radius: 0.3333rem;
    }
  }
  .centerNextDsc {
    font-size: 1.125rem;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .centerNext {
    display: flex;
    justify-content: center;
    padding-top: 0.625rem;
    .next {
      font-size: 1.125rem;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      padding: 0.625rem 0;
      height: 2.8125rem;
      width: 16.25rem;
      background: #2f88ff;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>