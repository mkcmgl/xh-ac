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
            ref="ruleForm"
            label-position="left"
            label-width="9.375rem"
            class="ruleForm"
          >
            <el-form-item label="注册类型" prop="name">
              <el-button>企业</el-button>
              <el-button>个人</el-button>
            </el-form-item>
            <el-form-item label="机构名称" prop="name">
              <el-input placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构简称" prop="name">
              <el-input placeholder="请输入机构简称"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="name">
              <el-input placeholder="请输入信用代码"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" prop="name">
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
                    :on-success="handleUploadSuccess"
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
                  <div class="el-upload__tip"  v-if="showTip">
                    <template v-if="fileType">
                      2、格式为
                      <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                    </template>
                  </div>
                  <div class="el-upload__tip"  v-if="showTip">
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
          </el-form>
        </div>
        <div class="next">提交认证</div>
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
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      number: 0,
      uploadList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadFileUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileList: [],

      fileUploader: true,
      displayType: false,
    };
  },

  mounted() {},
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
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
        displayType: this.displayType,
      };
    },
  },
  methods: {
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
      this.$modal.loading("正在上传文件，请稍候...");
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
      this.$modal.closeLoading();
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.uploadList.push({ name: res.fileName, url: res.fileName });
        this.uploadedSuccessfully();
        this.displayType = true;
      } else {
        this.number--;
        this.$modal.closeLoading();
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
        this.$modal.closeLoading();
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
.ruleForm {
  width: 50rem;
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
      width: 100%;
      height: 100%;
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
  height: 46rem;
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