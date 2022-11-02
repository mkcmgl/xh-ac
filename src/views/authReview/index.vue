<template>
  <div class="right">
    <div class="title">实名认证审核</div>
    <!-- 搜索栏 -->
    <div class="top">
      <el-form
        :rules="searchRules"
        label-position="right"
        label-width="9rem"
        class="authForm"
        ref="searchRef"
        :model="searchForm"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="编号">
              <el-input
                v-model="searchForm.number"
                type=" text"
                @keyup.enter.native="handleSearchForm"
                placeholder="请输入编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请方">
              <el-input
                v-model="searchForm.applyUser"
                type=" text"
                @keyup.enter.native="handleSearchForm"
                placeholder="请输入申请方"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="认证类型">
              <el-select
                v-model="searchForm.authType"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="(state, index) in searchForm.authTypeData"
                  :key="index"
                  :label="state.name"
                  :value="state.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="toSearch">搜索</el-button>
              <el-button type="none" @click="toClear">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select
                v-model="searchForm.status"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="(state, index) in searchForm.statusData"
                  :key="index"
                  :label="state.name"
                  :value="state.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 显示列表 -->
    <div class="centerMain">
      <el-table
        :data="searchData"
        class="searchClass"
        style="width: 100%"
        height="40rem"
      >
        <el-table-column label="编号" prop="authId" width="12rem">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >{{ scope.row.authId }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="申请方BID" prop="did" width="12rem">
        </el-table-column>
        <el-table-column label="认证类型" prop="authType" width="12rem">
        </el-table-column>
        <el-table-column label="申请时间" prop="applyDate" width="12rem">
        </el-table-column>
        <el-table-column label="审核状态" prop="status" width="12rem">
        </el-table-column>
        <el-table-column label="审核时间" prop="reviewDate" width="12rem">
        </el-table-column>
        <el-table-column label="操作" width="12rem">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reviewList } from "@/api/did";
export default {
  name: "authReview",

  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      searchData: [
        // {
        //   address: "",
        //   addressDetail: "",
        //   applyDate: "",
        //   authId: "",
        //   authType: "",
        //   businessLicense: "",
        //   contactEmail: "",
        //   contactName: "",
        //   contactPhone: "",
        //   creditCode: "",
        //   did: "",
        //   idEmblem: "",
        //   idNumber: "",
        //   idPortrait: "",
        //   la: "",
        //   org: "",
        //   orgName: "",
        //   realName: "",
        //   reviewDate: "",
        //   reviewOpinion: "",
        //   status: "",
        //   userId: "",
        // },
      ],

      searchForm: {
        number: "",
        applyUser: "",
        authType: "",
        authTypeData: [
          { name: "个人认证", type: "101" },
          { name: "企业认证", type: "102" },
        ],
        status: "",
        statusData: [
          { name: "待审核", type: "0" },
          { name: "审核通过", type: "1" },
          { name: "审核驳回", type: "2" },
        ],
      },
      searchRules: {
        number: "",
        applyUser: "",
        authType: "",
        status: "",
      },
    };
  },
  created() {
    this.getSearchData();
  },
  mounted() {},

  methods: {
    //获取审核列表
    getSearchData(authId, did, authType, status) {
      const { pageNum, pageSize } = this;
      reviewList({
        authId,
        did,
        authType,
        status,
        pageNum,
        pageSize,
      }).then((res) => {
        console.log(res, "res");
        this.searchData = [];
        res.rows.forEach((item) => {
          item.authType = item.authType == 101 ? "个人认证" : "企业认证";
          if (item.status == 0) {
            item.status = "待审核";
          } else if (item.status == 0) {
            item.status = "审核通过";
          } else {
            item.status = "审核驳回";
          }

          this.searchData.push(item);
        });
        this.total = res.total;
      });
    },
    handleClick(row) {
      const {
        address,
        addressDetail,
        applyDate,
        authId,
        authType,
        businessLicense,
        contactEmail,
        contactName,
        contactPhone,
        creditCode,
        did,
        idEmblem,
        idNumber,
        idPortrait,
        la,
        org,
        orgName,
        realName,
        reviewDate,
        reviewOpinion,
        status,
        userId,
      } = row;
      this.$router.push({
        path: "authReview/authDetail",
        query: {
          address,
          addressDetail,
          applyDate,
          authId,
          authType,
          businessLicense,
          contactEmail,
          contactName,
          contactPhone,
          creditCode,
          did,
          idEmblem,
          idNumber,
          idPortrait,
          la,
          org,
          orgName,
          realName,
          reviewDate,
          reviewOpinion,
          status,
          userId,
        },
      });
    },
    //改变一页显示数量
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSearchData();
    },
    //改变页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSearchData();
    },
    //搜索
    toSearch() {
      const { number, applyUser, authType, status } = this.searchForm;
      this.getSearchData(number, applyUser, authType, status);
    },
    //重置
    toClear() {
      // this.$refs.searchRef.resetFields();
      Object.assign(this._data.searchForm, this.$options.data().searchForm);
      this.getSearchData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";
::v-deep .cell {
  white-space: nowrap;
}
::v-deep .el-table__empty-block {
  text-align: center;
  width: 100% !important;
  height: 10% !important;
  font-size: 1.2rem;
}
.top {
  padding-top: 2rem;
  margin-top: 2rem;
  background-color: #ffff;
}
.centerMain {
  background-color: #ffff;
  margin-top: 2rem;
  padding: 2rem 2rem;
  .searchClass {
    ::v-deep .el-table__header {
      width: 100% !important;
    }
    ::v-deep .el-table__body {
      width: 100% !important;
    }
  }

  .el-pagination {
    text-align: right;
  }
}
</style>