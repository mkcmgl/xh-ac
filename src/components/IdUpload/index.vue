<template>
  <div>
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
          :on-success="(e1, e2) => handleUploadSuccess(e1, e2, '1')"
          :on-preview="handlePictureCardPreview"
          :headers="headers"
          :class="UploaderClass"
          :on-remove="(e1) => handleDelete(e1, '1')"
          :file-list="fileList"
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
          <template v-if="fileType"> 3、上传的图片需清晰完整 </template>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "IdUpload",
  props: {
    // type:{
    //   type: String,
    //   default: '',
    // },

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

      displayType: false,
    };
  },
  watch: {
    // value: {
    //   handler(val) {
    //     if (val) {
    //       let temp = 1;
    //       // 首先将值转为数组
    //       console.log("// 首先将值转为数组",val);
    //       const list = Array.isArray(val) ? val : this.value.split(",");
    //       // 然后将数组转为对象数组
    //       console.log('list',list)
    //       this.fileList = list.map((item) => {
    //         console.log('item',item)
    //         if (typeof item === "string") {
    //           item = { name: item, url: item };
    //           console.log('item2',item)
    //         }
    //         item.uid = item.uid || new Date().getTime() + temp++;
    //         console.log('item23',item)
    //         return item;
    //       });
    //     } else {
    //       this.fileList = [];
    //       return [];
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    //   loading:false,
    // },
  },
  created() {},
  mounted() {},
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    UploaderClass() {
      return {
        // fileUploader: this.fileUploader,

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
    handleUploadSuccess(res, file) {
      console.log(res, file);
      // console.log(this.type,'type')

      // this.$emit('fileName',res)
      // this.authFormData.businessLicense=res.fileName;
      if (res.code === 200) {
        this.displayType = true;
        //   this.uploadList.push({ name: res.fileName, url: res.fileName });
        //   // console.log("uploadedSuccessfully成共1");
        this.$emit("input", res.fileName);
        // this.$emit("displayType",true)
        this.uploadList.push(file);
        this.uploadedSuccessfully();
      } else {
        console.log("上传文件返回code不为200");
        this.number--;
        // this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },

    // 删除文件
    handleDelete(index, e3) {
      this.displayType = false;
      this.fileList = [];
      console.log(this.fileList);
      console.log("删除文件");
      // this.$emit("input", this.listToString(this.fileList));
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        console.log(this.fileList);
        this.uploadList = [];
        this.number = 0;
        // this.$emit("input", this.listToString( this.fileList));

        // this.$emit("input", this.listToString( this.fileList[0].response.fileName));
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
.fileUploader {
  margin-bottom: 0.3125rem;
  ::v-deep .el-upload-list--picture-card {
    display: grid;
    li {
      width: 12.5rem;
      height: 12.5rem;
    }
  }
  ::v-deep .el-upload--picture-card {
    width: 12.5rem;
    height: 12.5rem;
    i {
      line-height: 12.5rem;
    }
  }
}
.displayType {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>