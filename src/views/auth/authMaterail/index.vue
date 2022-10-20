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
              <el-button @click="selectType(0)" :class="enterpriseClass">企业</el-button>
              <el-button @click="selectType(1)" :class="personalClass">个人</el-button>
            </el-form-item>
            <div v-show="authFormData.authType==0">
              <el-form-item label="机构名称" prop="orgName">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入机构名称" v-model="authFormData.orgName"></el-input>
              </el-form-item>
              <el-form-item label="机构简称" prop="org">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入机构简称" v-model="authFormData.org"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input @keyup.enter.native="handleAuthForm"  v-model="authFormData.creditCode" type="text" placeholder="请输入信用代码"></el-input>
              </el-form-item>
              <el-form-item label="营业执照">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-upload
                      multiple
                      :action="uploadFileUrl"
                      :before-upload="handleBeforeUpload"
                      list-type="picture-card"
                      :limit="limit"
                      :on-error="handleUploadError"
                      :on-exceed="handleExceed"
                      :on-success="(e1,e2)=>handleUploadSuccess(e1,e2,'qweqweqwe')"
                      :on-preview="handlePictureCardPreview"
                      :headers="headers"
                      :class="UploaderClass"
                      :on-remove="handleDelete"
                      ref="fileUpload"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-col>
                  <el-col :span="15">
                    <div class="el-upload__tip" v-if="showTip">
                      1、请上传
                      <template v-if="fileSize">
                        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                      </template>
                    </div>
                    <div class="el-upload__tip" v-if="showTip">
                      <template v-if="fileType">
                        2、格式为
                        <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                      </template>
                    </div>
                    <div class="el-upload__tip" v-if="showTip">
                      <template v-if="fileType">
                        3、上传的图片需清晰完整
                      </template>
                    </div>
                  </el-col>
                </el-row>
  
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
              <el-form-item label="地址" prop="address"></el-form-item>
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号" prop="contactPhone">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入联系人手机号"></el-input>
              </el-form-item>
              <el-form-item label="联系人邮箱" prop="contactEmail">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入联系人邮箱"></el-input>
              </el-form-item>
  
              <el-form-item label="授权书">
                <el-upload
                  class="upload-demo"
                  :action="uploadFileUrl"
                  :on-preview="handlePictureCardPreview"
                  :limit="limit"
                  :before-upload="handleBeforeUpload"
                  :on-exceed="handleExceed"
                  :on-success="uploadSuccess"
                  :on-remove="handleDelete"
                  :headers="headers"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </div>
            <div v-show="authFormData.authType==1">
              <el-form-item label="姓名" prop="realName">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入姓名" v-model="authFormData.realName"></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="idNumber">
                <el-input @keyup.enter.native="handleAuthForm" type="text" placeholder="请输入身份证" v-model="authFormData.idNumber"></el-input>
              </el-form-item>
              <el-form-item label="身份证头像面">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-upload
                      multiple
                      :action="uploadFileUrl"
                      :before-upload="handleBeforeUpload"
                      list-type="picture-card"
                      :limit="limit"
                      :on-error="handleUploadError"
                      :on-exceed="handleExceed"
                      :on-success="idPortraitUploadSuccess"
                      :on-preview="handlePictureCardPreview"
                      :headers="headers"
                      :class="UploaderClass"
                      :on-remove="handleDelete"
                      ref="fileUpload"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-col>
                  <el-col :span="15">
                    <div class="el-upload__tip" v-if="showTip">
                      1、请上传
                      <template v-if="fileSize">
                        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                      </template>
                    </div>
                    <div class="el-upload__tip" v-if="showTip">
                      <template v-if="fileType">
                        2、格式为
                        <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                      </template>
                    </div>
                    <div class="el-upload__tip" v-if="showTip">
                      <template v-if="fileType">
                        3、上传的图片需清晰完整
                      </template>
                    </div>
                  </el-col>
                </el-row>
  
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
              <el-form-item label="身身份证国徽面">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-upload
                      multiple
                      :action="uploadFileUrl"
                      :before-upload="handleBeforeUpload"
                      list-type="picture-card"
                      :limit="limit"
                      :on-error="handleUploadError"
                      :on-exceed="handleExceed"
                      :on-success="idEmblemUploadSuccess"
                      :on-preview="handlePictureCardPreview"
                      :headers="headers"
                      :class="UploaderClass"
                      :on-remove="handleDelete"
                      ref="fileUpload"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-col>
                  <el-col :span="15">
                    <div class="el-upload__tip" v-if="showTip">
                      1、请上传
                      <template v-if="fileSize">
                        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                      </template>
                    </div>
                    <div class="el-upload__tip" v-if="showTip">
                      <template v-if="fileType">
                        2、格式为
                        <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                      </template>
                    </div>
                    <div class="el-upload__tip" v-if="showTip">
                      <template v-if="fileType">
                        3、上传的图片需清晰完整
                      </template>
                    </div>
                  </el-col>
                </el-row>
  
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div :loading="loadingForm" class="next">提交认证</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "authMaterail",
  props: {
    // 值
    value: [String, Object, Array],
    // 数量限制
    limit: {
      type: Number,
      default: 1,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["jpg", "jpeg", "png"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {

      const validateContactPhone=(rule, value, callback)=>{
      if (value === "") {
        callback(new Error("请输入联系人手机号"));
      } else if (
        !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validateOrgName=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入机构名称"));
      } else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        callback(new Error("机构名称长度必须介于 1 和 20 之间"));
      } else {
        callback();
      }
    };
    const validateOrg=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入机构简称"));
      } else if (!/^[a-zA-Z0-9_-]{1,10}$/.test(value)) {
        callback(new Error("机构简称必须介于 1 和 10 之间"));
      } else {
        callback();
      }
    };
    const validateCreditCode=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入统一社会信用代码"));
        
      } else if (!/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(value)) {
        callback(new Error("请输入正确的统一社会信用代码"));
      } else {
        callback();
      }
    };
    const validateBusinessLicense=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请上传营业执照"));
      } else {
        callback();
      }
    };
    const validatorAddressDetail=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入详细地址"));
      } else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        callback(new Error("详细地址必须介于 1 和 20 之间"));
      } else {
        callback();
      }
    };
    const validateContactName=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入联系人姓名"));
      } else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        callback(new Error("联系人姓名长度必须介于 1 和 20 之间"));
      } else {
        callback();
      }
    };
    const validateContactEmail=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入联系人邮箱"));

      } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    const validateLa=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请上传授权书"));
      } else {
        callback();
      }
    };
    const validateRealName=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        callback(new Error("真实姓名长度必须介于 1 和 20 之间"));
      } else {
        callback();
      }
    };
    const validateIdNumber=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请输入身份证号码"));

      } else if (!/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(value)) {
        callback(new Error("机构名称长度必须介于 1 和 20 之间"));
      } else {
        callback();
      }
    };
    const validateIdPortrait=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请上传身份证人像面"));
      } else {
        callback();
      }
    };
    const validateIdEmblem=(rules,value,callback)=>{
      if (value === "") {
        callback(new Error("请上传身份证国像面"));
      } else {
        callback();
      }
    };
    return {
      authFormData:{
        authType:0,
        orgName:'',
        org:'',
        creditCode:'',
        //营业执照图片路径
        businessLicense:'',
        address:'',
        addressDetail:'',
        contactName:'',
        contactPhone:'',
        contactEmail:'',
        //授权书上传路径
        la:'',
        //真实姓名
        realName:'',
        idNumber:'',
        idPortrait:'',
        idEmblem:'',
      },
      authFormRules:{
          orgName:[{required: true,  validator:validateOrgName,trigger:'blur'}],
          org:[{required: true, validator:validateOrg,trigger:'blur'}],
          creditCode:[{required: true, validator:validateCreditCode,trigger:'blur'}],
          businessLicense:[{required: true, validator:validateBusinessLicense,trigger:'blur'}],
          addressDetail:[{required: true, validator:validatorAddressDetail,trigger:'blur'}],
          contactName:[{required: true, validator:validateContactName,trigger:'blur'}] ,
          contactPhone:[{require:true,validator:validateContactPhone,trigger:'blur'}],
          contactEmail:[{require:true,validator:validateContactEmail,trigger:'blur'}],
          la:[{require:true,validator:validateLa,trigger:'blur'}],
          realName:[{require:true,validator:validateRealName,trigger:'blur'}],
          idNumber:[{require:true,validator:validateIdNumber,trigger:'blur'}],
          idPortrait:[{require:true,validator:validateIdPortrait,trigger:'blur'}],
          idEmblem:[{require:true,validator:validateIdEmblem,trigger:'blur'}],
      },






      dialogVisible: false,
      dialogImageUrl: "",
      number: 0,
      uploadList: [],
      // baseUrl: process.env.VUE_APP_BASE_API,
      uploadFileUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileList: [],
      enterpriseClass:{
        selectTypeClass:true,
      },
      personalClass:{
        selectTypeClass:false,
      },
      fileUploader: true,
      displayType: false,
      idPortraitType:false,
      idEmblemType:false,
      loadingForm:false,
    };
  },

  mounted() {

  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
          console.log("// 首先将值转为数组");
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === "string") {
              item = { name: item, url: item };
            }
            item.uid = item.uid || new Date().getTime() + temp++;
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
      loading:false,
    },
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    UploaderClass() {
      return {
        fileUploader: this.fileUploader,
        idPortraitType: this.idPortraitType,
        idEmblemType: this.idEmblemType,
        displayType: this.displayType,
      };
    },
  },
  methods: {      

    //选择实名类型
    selectType(val){
      this.$refs.authForm.resetFields();
      if(val==0){
        this.authFormData.authType=val;
        this.enterpriseClass.selectTypeClass=true
        this.personalClass.selectTypeClass=false;

      }else if(val==1){
        this.authFormData.authType=val;
        this.enterpriseClass.selectTypeClass=false;
        this.personalClass.selectTypeClass=true;
      }
    },
    handleAuthForm() {
      this.$refs.authForm.validate((valid)=>{
        if(valid){
          const {
        authType,
        orgName,
        org,
        creditCode,
        addressDetail,
        contactName,
        contactPhone,
        contactEmail,

        //真实姓名
        realName,
        idNumber,
          }=this.authForm;
          this.loadingForm = true;
         switch(authType){
          case 0:
          break;
          case 1:
          break;
         } 
        }
      })
    },



    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$modal.msgError(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      // this.$modal.loading("正在上传文件，请稍候...");
      this.number++;
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传失败
    handleUploadError(err) {
      this.$modal.msgError("上传图片失败，请重试");
      //loding 全屏
      // this.$modal.closeLoading();
    },
    // 上传成功回调
    handleUploadSuccess(res, file,e3) {
      console.log(res, file,e3)
      if (res.code === 200) {
        console.log(res);
        this.authFormData.businessLicense=res.fileName;
        this.uploadList.push({ name: res.fileName, url: res.fileName });
        console.log("uploadedSuccessfully成共1");
        this.uploadedSuccessfully();
        this.displayType = true;
      } else {
        this.number--;
        // this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    //授权书上传成功
    uploadSuccess(res, file) {
      if (res.code === 200) {
        this.authFormData.la=res.fileName;
        console.log(this.authFormData.la)
        this.uploadList.push({ name: res.fileName, url: res.fileName });
        console.log("uploadedSuccessfully成共2");
        this.uploadedSuccessfully();
     
      } else {
        this.number--;
        // this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    //身份证头像面上传成功
    idPortraitUploadSuccess(res,file){
      if (res.code === 200) {
        this.authFormData.idPortrait=res.fileName;
        console.log(this.authFormData.idPortrait)
        this.uploadList.push({ name: res.fileName, url: res.fileName });
        console.log("uploadedSuccessfully成共3");
        this.uploadedSuccessfully();
        this.idPortraitType = true;
      } else {
        this.number--;
        // this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
        //身份证国徽面上传成功
    idEmblemUploadSuccess(res,file){
      if (res.code === 200) {
        this.authFormData.idEmblem=res.fileName;
        console.log(this.authFormData.idEmblem)
        this.uploadList.push({ name: res.fileName, url: res.fileName });
        console.log("uploadedSuccessfully成共3");
        this.uploadedSuccessfully();
        this.idEmblemType = true;
      } else {
        this.number--;
        // this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
      console.log("删除文件");
      this.displayType = false;
      this.$emit("input", this.listToString(this.fileList));
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.listToString(this.fileList));
        // this.$modal.closeLoading();
      }
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1);
      } else {
        return "";
      }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        strs += list[i].url + separator;
      }
      return strs != "" ? strs.substr(0, strs.length - 1) : "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";


.authForm {
  width: 50rem;
}
.selectTypeClass{
  
  background-color: #1890ff;
  color: #ffff;
}
.el-upload__tip {
  margin: 0;
  word-break: break-all;
}

.fileUploader {
  margin-bottom: 0.3125rem;
  ::v-deep .el-upload-list--picture-card {
    display: grid;
    li {
      width: 12.5rem;
      height: 12.5rem;
    }
  }
  ::v-deep .el-upload--picture-card{
    width: 12.5rem;
    height: 12.5rem;
    i{
      line-height: 12.5rem;
    }
  }
}
.displayType {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
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