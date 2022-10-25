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
          <img src="@/assets/images/auth169.png" alt="" />
          <span class="back">3</span>
          <div class="dscMiddle">完成认证申请</div>
        </div>
      </div>
    </div>

    <div class="centerMain">
      <div class="main">
        <div class="mainTitle">基本信息</div>
        <div class="centerNext">
          <el-form
            ref="authForm"
            :model="authFormData"
            :rules="authFormRules"
            label-position="left"
            label-width="9.375rem"
            class="authForm"
          >
            <el-form-item label="注册类型" prop="authType">
              <el-button @click="selectType(102)" :class="enterpriseClass"
                >企业</el-button
              >
              <el-button @click="selectType(101)" :class="personalClass"
                >个人</el-button
              >
            </el-form-item>
            <div v-if="authFormData.authType == 102">
              <el-form-item label="机构名称" prop="orgName">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入机构名称"
                  v-model="authFormData.orgName"
                ></el-input>
              </el-form-item>
              <el-form-item label="机构简称" prop="org">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入机构简称"
                  v-model="authFormData.org"
                ></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  v-model="authFormData.creditCode"
                  type="text"
                  placeholder="请输入信用代码"
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照" prop="businessLicense">
                <!-- " -->
                <IdUpload
                  v-model="authFormData.businessLicense"
                  ref="businessImg"
                ></IdUpload>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-row>
                  <el-col :span="8">
                    <el-select
                      v-model="optionsV"
                      @change="changeValue"
                      value-key="regionCode"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.regionName"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="8">
                    <el-select
                      v-model="cityCode"
                      value-key="regionCode"
                      clearable
                      @change="changeCity"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in city"
                        :key="index"
                        :label="item.regionName"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      value-key="regionCode"
                      v-model="areaCode"
                      clearable
                      @change="changeArea"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in area"
                        :key="index"
                        :label="item.regionName"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入地址"
                  v-model="authFormData.addressDetail"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入联系人姓名"
                  v-model="authFormData.contactName"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号" prop="contactPhone">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  v-model="authFormData.contactPhone"
                  placeholder="请输入联系人手机号"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人邮箱" prop="contactEmail">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入联系人邮箱"
                  v-model="authFormData.contactEmail"
                ></el-input>
              </el-form-item>

              <el-form-item label="授权书" prop="la">
                <FileUpload
                  listType="picture"
                  :fileType="['png', 'jpg', 'jpeg']"
                  :limit="1"
                  ref="fileGrant"
                  v-model="authFormData.la"
                ></FileUpload>

                <!-- <el-upload
                  class="upload-demo"
                  :action="uploadFileUrl"
                  :on-preview="handlePictureCardPreview"
                  :limit="limit"
                  :before-upload="handleBeforeUpload"
                  :on-exceed="handleExceed"
                  :on-success="(e1,e2)=>handleUploadSuccess(e1,e2,'2')"
                  :on-remove="(e1)=>handleDelete(e1,'2')"
                  :headers="headers"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload> -->
              </el-form-item>
            </div>
            <div v-if="authFormData.authType == 101">
              <el-form-item label="姓名" prop="realName">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入姓名"
                  v-model="authFormData.realName"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="idNumber">
                <el-input
                  @keyup.enter.native="handleAuthForm"
                  type="text"
                  placeholder="请输入身份证"
                  v-model="authFormData.idNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证头像面" prop="idPortrait">
                <!-- type="idPortrait" -->

                <IdUpload
                  ref="idPortraitRef"
                  v-model="authFormData.idPortrait"
                ></IdUpload>
              </el-form-item>
              <el-form-item label="身份证国徽面" prop="idEmblem">
                <!-- type="idEmblem"  -->
                <IdUpload
                  ref="idEmblemRef"
                  v-model="authFormData.idEmblem"
                ></IdUpload>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div :loading="loadingForm" class="next" @click="handleAuthForm">
          <span v-if="!loadingForm">提交认证</span>
          <span v-else>正在提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProvince, getCity, getArea, uploadDocument } from "@/api/did";
import { getToken } from "@/utils/auth";
import { mapState } from "vuex";
export default {
  name: "authMaterail",

  data() {
    const validateOrgName = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入机构名称"));
      } else if (1 < value.lenght && value.lenght < 20) {
        callback(new Error("请输入正确的机构名称，长度必须介于 1 和 20 之间"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.orgName = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateOrg = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入机构简称"));
      } else if (1 < value.lenght && value.lenght < 10) {
        callback(new Error("请输入正确的机构简称，长度必须介于 1 和 10 之间"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.org = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateCreditCode = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入统一社会信用代码"));
      } else if (
        !/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(value)
      ) {
        callback(new Error("请输入正确的统一社会信用代码"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.creditCode = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateBusinessLicense = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请上传营业执照"));
      } else {
        callback();
      }
    };
    const validateAddress = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请选择地址"));
      } else {
        callback();
      }
    };
    const validatorAddressDetail = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入详细地址"));
      } else if (1 < value.lenght && value.lenght < 20) {
        callback(new Error("详细地址必须介于 1 和 20 之间"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.addressDetail = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateContactName = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系人姓名"));
      } else if (1 < value.lenght && value.lenght < 20) {
        callback(new Error("联系人姓名长度必须介于 1 和 20 之间"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.contactName = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateContactPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系人手机号"));
      } else if (
        !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的手机号"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.contactPhone = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateContactEmail = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系人邮箱"));
      } else if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的邮箱"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.contactEmail = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateLa = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请上传授权书"));
      } else {
        callback();
      }
    };
    const validateRealName = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else if (1 < value.lenght && value.lenght < 20) {
        callback(new Error("真实姓名长度必须介于 1 和 20 之间"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.realName = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateIdNumber = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号码"));
      } else if (
        !/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的身份证号码"));
      } else if (/\s+/g.test(value)) {
        this.authFormData.idNumber = value.replace(/\s+/g, "");
      } else {
        callback();
      }
    };
    const validateIdPortrait = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请上传身份证人像面"));
      } else {
        callback();
      }
    };
    const validateIdEmblem = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请上传身份证国像面"));
      } else {
        callback();
      }
    };
    return {
      authFormData: {
        authType: 102,
        orgName: "",
        org: "",
        creditCode: "",
        //营业执照图片路径
        businessLicense: "",
        //详细地址
        address: "",
        addressDetail: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        //授权书上传路径
        la: [],
        //真实姓名
        realName: "",
        idNumber: "",
        idPortrait: "",
        idEmblem: "",
      },
      authFormRules: {
        authType: [{ required: true }],
        orgName: [
          { required: true, validator: validateOrgName, trigger: "blur" },
        ],
        org: [{ required: true, validator: validateOrg, trigger: "blur" }],
        creditCode: [
          { required: true, validator: validateCreditCode, trigger: "blur" },
        ],
        businessLicense: [
          {
            required: true,
            validator: validateBusinessLicense,
            trigger: "blur",
          },
        ],
        address: [
          { required: true, validator: validateAddress, trigger: "blur" },
        ],
        addressDetail: [
          {
            required: true,
            validator: validatorAddressDetail,
            trigger: "blur",
          },
        ],
        contactName: [
          { required: true, validator: validateContactName, trigger: "blur" },
        ],
        contactPhone: [
          { required: true, validator: validateContactPhone, trigger: "blur" },
        ],
        contactEmail: [
          { required: true, validator: validateContactEmail, trigger: "blur" },
        ],
        la: [{ required: true, validator: validateLa, trigger: "blur" }],
        realName: [
          { required: true, validator: validateRealName, trigger: "blur" },
        ],
        idNumber: [
          { required: true, validator: validateIdNumber, trigger: "blur" },
        ],
        idPortrait: [
          { required: true, validator: validateIdPortrait, trigger: "blur" },
        ],
        idEmblem: [
          { required: true, validator: validateIdEmblem, trigger: "blur" },
        ],
      },

      enterpriseClass: {
        selectTypeClass: true,
      },
      personalClass: {
        selectTypeClass: false,
      },

      fileUploader: true,
      loadingForm: false,

      //省份列表
      options: [],
      //地市列表
      city: [],
      //区县列表
      area: [],
      //省份
      optionsV: {},
      //地市
      cityCode: {},
      //区县
      areaCode: {},
      optionsName: "",
      cityName: "",
      areaName: "",
    };
  },

  mounted() {
    this.getProvinceData();
  },

  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    //图片加号是否显示

    //did
    ...mapState({
      userDid: (state) => state.user.userData.did,
      userId: (state) => state.user.userData.userId,
    }),
  },
  watch: {
    //监听地址第一层 省份
    optionsV: {
      handler(val) {
        if (val) {
          this.optionsChangeData(val.regionCode);
        }
      },
    },
    //监听地址第2层 地市
    cityCode: {
      handler(cityCode) {
        if (cityCode) {
          this.area = [];
          this.cityChangeData(cityCode.regionCode);
        }
      },
    },
    orgName: {
      handler(orgName) {
        if (/\s+/g.test(orgName)) {
          console(orgName);
        }
      },
    },
  },
  methods: {
    //获取省份
    getProvinceData() {
      getProvince().then((res) => {
        console.log(res);
        res.forEach((item) => {
          this.options.push(item);
        });
      });
    },
    //选择了省份 显示地市数据
    optionsChangeData(value) {
      console.log(value);
      getCity({ parentCode: value }).then((res) => {
        res.forEach((item) => {
          this.city.push(item);
        });
      });
    },
    //选择了地市 显示区县数据
    cityChangeData(value) {
      console.log(value);
      getArea({ parentCode: value }).then((res) => {
        res.forEach((item) => {
          this.area.push(item);
        });
      });
    },

    //图片地址参数
    // getFileName(event){
    //   this.authFormData.businessLicense=event.fileName
    // },

    //选择实名类型
    selectType(val) {
      this.$refs.authForm.resetFields();

      if (val == 102) {
        this.authFormData.authType = val;
        this.enterpriseClass.selectTypeClass = true;
        this.personalClass.selectTypeClass = false;

        this.$nextTick(() => {
          this.$refs.businessImg.handleDelete();
          this.$refs.fileGrant.handleDelete();
        });
      } else if (val == 101) {
        this.authFormData.authType = val;
        this.enterpriseClass.selectTypeClass = false;
        this.personalClass.selectTypeClass = true;

        this.$nextTick(() => {
          this.$refs.idPortraitRef.handleDelete();
          this.$refs.idEmblemRef.handleDelete();
        });
      }
    },
    changeValue(event) {
      this.city = [];
      this.area = [];
      this.cityCode = "";
      this.areaCode = "";
      this.cityName = "";
      this.areaName = "";
      if (event == "") {
        return (this.optionsName = "");
      } else {
        return (this.optionsName = event.regionName);
      }
    },
    changeCity(event) {
      this.area = [];
      this.areaCode = "";
      this.areaName = "";

      if (event == "") {
        return (this.cityName = "");
      } else {
        this.cityName = event.regionName;
      }
    },
    changeArea(event) {
      if (event == "") {
        return (this.areaName = "");
      } else {
        this.areaName = event.regionName;
        this.authFormData.address =
          this.optionsName + this.cityName + this.areaName;
      }
    },
    //提交及校验
    handleAuthForm() {
      this.$refs.authForm.validate((valid) => {
        console.log("01");
        console.log(valid);
        if (valid) {
          const {
            authType,
            orgName,
            org,
            creditCode,
            //营业执照图片路径
            businessLicense,
            //地址
            address,
            //详细地址
            addressDetail,
            contactName,
            contactPhone,
            contactEmail,
            //授权书上传路径
            la,
            //真实姓名
            realName,
            idNumber,
            idPortrait,
            idEmblem,
          } = this.authFormData;
          this.loadingForm = true;

          console.log(this.authFormData.authType);
          switch (authType) {
            case 102:
              uploadDocument({
                userId: this.userId,
                did: this.userDid,
                authType,
                orgName,
                org,
                creditCode,
                //营业执照图片路径
                businessLicense,
                //地址
                address,
                //详细地址
                addressDetail,
                contactName,
                contactPhone,
                contactEmail,
                //授权书上传路径
                la,
              }).then((res) => {
                console.log(res, "res");
                this.$router.push("/auth/authResult");
              });
              break;
            case 101:
              uploadDocument({
                userId: this.userId,
                did: this.userDid,
                authType,
                //真实姓名
                realName,
                idNumber,
                idPortrait,
                idEmblem,
              }).then((res) => {
                console.log(res, "res");
                this.$router.push("/auth/authResult");
              });
              break;
            default:
              break;
          }
        }
      });
    },
  },
};
// .fileUploader {
//   margin-bottom: 0.3125rem;
//   ::v-deep .el-upload-list--picture-card {
//     display: grid;
//     li {
//       width: 12.5rem;
//       height: 12.5rem;
//     }
//   }
//   ::v-deep .el-upload--picture-card {
//     width: 12.5rem;
//     height: 12.5rem;
//     i {
//       line-height: 12.5rem;
//     }
//   }
// }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";

.authForm {
  width: 50rem;
}
.selectTypeClass {
  background-color: #1890ff;
  color: #ffff;
}
.el-upload__tip {
  margin: 0;
  word-break: break-all;
}

.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
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

  margin: 3.125rem 0.625rem 0 0.625rem;
  .main {
    width: 100%;
    height: 100%;
    padding: 1.25rem 2.5rem;
  }
  .mainTitle {
    height: 1.833333rem;
    font-size: 1.333333rem;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333;
    line-height: 1.833333rem;
  }
  .centerNext {
    display: flex;
    justify-content: center;
    padding-top: 0.625rem;
  }
  .next {
    font-size: 1.125rem;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding: 0.625rem 0;
    height: 2.8125rem;
    width: 20.25rem;
    background: #2f88ff;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    margin: auto;
  }
}
</style>