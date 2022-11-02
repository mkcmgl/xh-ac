<template>
  <div class="right">
    <el-button
      type="primary"
      style="float: right"
      @click="reviewVisible = true"
      v-if="this.row.reviewOpinion == null"
      >审核</el-button
    >
    <div class="title">
      <router-link to="/authReview">实名认证审核</router-link>
      <span class="dsc">/</span>
      <span class="dsc">详情</span>
    </div>
    <div class="top">
      <span class="infoTitle">基本信息</span>
      <div v-if="this.row.authType == '个人认证'" class="center">
        <ul class="userInfo">
          <li>
            <span class="userInfoTitle">认证类型</span>
            <span class="userInfoData">{{ row.authType }}</span>
          </li>
          <li>
            <span class="userInfoTitle">申请方BID</span>
            <span class="userInfoData">{{ row.did }}</span>
          </li>
          <li>
            <span class="userInfoTitle">真实姓名</span>
            <span class="userInfoData">{{ row.realName }}</span>
          </li>
          <li>
            <span class="userInfoTitle">身份证头像面</span>
            <el-button
              style="padding: 0"
              type="text"
              class="userInfoData"
              @click="showImg('idPortrait')"
              >点击查看图片</el-button
            >
          </li>
        </ul>
        <ul class="userInfo right">
          <li>
            <span class="userInfoTitle">认证状态</span>
            <span class="userInfoData">{{ row.status }}</span>
          </li>
          <li>
            <span class="userInfoTitle">申请时间</span>
            <span class="userInfoData">{{ row.applyDate }}</span>
          </li>
          <li>
            <span class="userInfoTitle">身份证号</span>
            <span class="userInfoData">{{ row.idNumber }}</span>
          </li>
          <li>
            <span class="userInfoTitle">身份证国徽面</span>

            <el-button
              style="padding: 0"
              type="text"
              class="userInfoData"
              @click="showImg('idEmblem')"
              >点击查看图片</el-button
            >
          </li>
        </ul>
      </div>
      <div v-else class="center">
        <ul class="userInfo">
          <li>
            <span class="userInfoTitle">认证类型</span>
            <span class="userInfoData">{{ row.authType }}</span>
          </li>
          <li>
            <span class="userInfoTitle">申请方BID</span>
            <span class="userInfoData">{{ row.did }}</span>
          </li>
          <li>
            <span class="userInfoTitle">机构名称</span>
            <span class="userInfoData">{{ row.orgName }}</span>
          </li>
          <li>
            <span class="userInfoTitle">统一社会信用代码</span>
            <span class="userInfoData">{{ row.orgName }}</span>
          </li>
          <li>
            <span class="userInfoTitle">地址</span>
            <span class="userInfoData">{{ row.address }}</span>
          </li>
          <li>
            <span class="userInfoTitle">审核时间</span>
            <span class="userInfoData">{{ row.reviewDate }}</span>
          </li>
        </ul>
        <ul class="userInfo right">
          <li>
            <span class="userInfoTitle">认证状态</span>
            <span class="userInfoData">{{ row.status }}</span>
          </li>
          <li>
            <span class="userInfoTitle">申请时间</span>
            <span class="userInfoData">{{ row.applyDate }}</span>
          </li>
          <li>
            <span class="userInfoTitle">机构简称</span>
            <span class="userInfoData">{{ row.org }}</span>
          </li>
          <li>
            <span class="userInfoTitle">营业执照</span>

            <el-button
              style="padding: 0"
              type="text"
              class="userInfoData"
              @click="showImg('businessLicense')"
              >点击查看图片</el-button
            >
          </li>
          <li>
            <span class="userInfoTitle">详细地址</span>
            <span class="userInfoData">{{ row.addressDetail }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="contact" v-if="this.row.authType == '企业认证'">
      <span class="infoTitle">联系人信息</span>
      <div class="center">
        <ul class="userInfo">
          <li>
            <span class="userInfoTitle">联系人姓名</span>
            <span class="userInfoData">{{ row.contactName }}</span>
          </li>
          <li>
            <span class="userInfoTitle">联系人邮箱</span>
            <span class="userInfoData">{{ row.contactEmail }}</span>
          </li>
        </ul>
        <ul class="userInfo right">
          <li>
            <span class="userInfoTitle">联系人手机号</span>
            <span class="userInfoData">{{ row.contactPhone }}</span>
          </li>

          <li>
            <span class="userInfoTitle">授权书</span>

            <el-button
              style="padding: 0"
              type="text"
              class="userInfoData"
              @click="showImg('la')"
              >点击查看图片</el-button
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="review" v-if="this.row.reviewOpinion != null">
      <span class="infoTitle">审核意见</span>
      <div class="center">
        <ul class="userInfo">
          <li>
            <span class="userInfoTitle">审核结果</span>
            <span class="userInfoData">{{ row.status }}</span>
          </li>
        </ul>
        <ul class="userInfo right">
          <li>
            <span class="userInfoTitle">审核时间</span>
            <span class="userInfoData">{{ row.reviewDate }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 显示图片 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <!-- 审核意见 -->
    <el-dialog
      :visible.sync="reviewVisible"
      title="审核"
      center
      width="26%"
      :before-close="clearReviewData"
    >
      <!-- class="reviewClass" -->
      <!-- <span
        style="
          vertical-align: middle;
          text-align: left;
          width: 6.875rem;
          float: left;
          color: #606266;
          padding: 0 1rem 0 0;
          box-sizing: border-box;
        "
        >审核意见</span
      > -->
      <i
        style="
          width: 100%;
          border-bottom: 0.0625rem solid #f4f3f7;
          position: relative;
          top: -1.5rem;
          display: block;
        "
      ></i>

      <el-form
        :model="reviewData"
        label-width="6.875rem"
        class="reviewClass"
        :rules="reviewRules"
        ref="reviewRef"
      >
        <el-form-item label="审核意见" prop="radio">
          <el-radio-group v-model="reviewData.radio" @change="radioChange">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因" v-if="reviewData.radio == 2" prop="why">
          <el-input
            v-model="reviewData.why"
            type="textarea"
            placeholder="请输入驳回原因"
            @keyup.enter.native="handleRadio"
          ></el-input>
        </el-form-item>
      </el-form>
      <i
        style="
          width: 100%;
          border-bottom: 0.0625rem solid #f4f3f7;
          position: relative;
          top: 1.6rem;
          display: block;
        "
      ></i>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reviewVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRadio">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { review } from "@/api/did";
import { validSpace, validLength } from "@/utils/validate";
export default {
  name: "authDetail",

  data() {
    return {
      row: {},
      baseUrl: process.env.VUE_APP_BASE_API,
      dialogImageUrl: "",
      dialogVisible: false,
      reviewVisible: false,
      reviewData: {
        radio: 1,
        why: "",
      },
      reviewRules: {
        why: [
          { required: true, trigger: "blur", message: "请输入驳回原因" },
          { required: true, validator: validSpace, trigger: "blur" },
          { required: true, validator: validLength, trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    //获取route信息
    getData() {
      this.row = this.$route.query;
      console.log(this.row, "1");
    },
    // 显示图片
    showImg(value) {
      this.dialogImageUrl = this.baseUrl + this.row[value];
      this.dialogVisible = true;
    },
    //清除数据
    clearReviewData() {
      // this.$nextTick(() => {
      this.$refs.reviewRef.resetFields();
      // });
      // Object.assign(this._data.reviewData, this.$options.data().reviewData);
      this.reviewVisible = false;
    },
    radioChange(value) {
      if (value == 1) {
        this.reviewData.why = "";
        // Object.assign(this._data.reviewData, this.$options.data().reviewData);
      }
    },
    //审核
    handleRadio() {
      const { did, authId, authType, status, reviewOpinion } = this.row;
      const authTypeNum = authType == "个人认证" ? "101" : "102";

      const statusNum =
        status == "待审核" ? "0" : status == "审核通过" ? "1" : "2";
      console.log(did, authId, authTypeNum, statusNum, reviewOpinion);
      review({
        did,
        authId,
        authType: authTypeNum,
        status: statusNum,
        reviewOpinion,
      }).then((res) => {
        this.reviewVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";
::v-deep .el-form-item__label {
  text-align: left;
}
.dsc {
  margin-left: 0.833333rem;
  font-weight: 400;
  color: #666;
}
.top {
  padding-top: 1rem;
  height: 20rem;
  margin-top: 2rem;
  background-color: #ffff;
}
.center {
  display: flex;
  justify-content: space-between;
}
.contact {
  padding-top: 1rem;
  height: 10rem;
  margin-top: 2rem;
  background-color: #ffff;
}
.review {
  padding-top: 1rem;
  height: 10rem;
  margin-top: 2rem;
  background-color: #ffff;
}
.el-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  border-radius: 0.25rem;
}

.infoTitle {
  font-size: 1.5rem;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #333333;
  display: block;
  margin-left: 2.5rem;
}
.userInfo {
  list-style-type: none;
  margin-top: 1rem;
  width: 50%;
  li {
    margin-bottom: 1rem;
  }
  .userInfoTitle {
    margin-right: 2.25rem;
    font-size: 1.125rem;
    display: inline-block;
    width: 25%;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #999999;
  }
  .userInfoData {
    font-size: 1.125rem;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;

    word-break: break-all;
  }
}
</style>