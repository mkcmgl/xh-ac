<template>
  <div class="right">
    <div class="title">实名认证审核</div>
    <!-- 搜索栏 -->
    <div class="top">
      <el-form
        :rules="searchRules"
        label-position="right"
        label-width="5.375rem"
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
                v-model="searchForm.applyType"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="(state, index) in searchForm.applyTypeData"
                  :key="index"
                  :label="state"
                  :value="state"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">搜索</el-button>
              <el-button type="none">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select
                v-model="searchForm.applyState"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="(state, index) in searchForm.applyStateData"
                  :key="index"
                  :label="state"
                  :value="state"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 显示列表 -->
    <div class="centerMain">
      <el-table :data="searchData" class="searchClass" style="width: 100%">
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
        applyType: "",
        applyTypeData: ["个人认证", "企业认证"],
        applyState: "",
        applyStateData: ["待审核", "审核通过", "审核驳回"],
      },
      searchRules: {
        number: "",
        applyUser: "",
        applyType: "",
        applyTypeData: {},
        applyState: "",
      },
    };
  },
  created() {
    this.getSearchData();
  },
  mounted() {},

  methods: {
    getSearchData() {
      const { pageNum, pageSize } = this;
      reviewList({ pageNum, pageSize }).then((res) => {
        console.log(res, "res");
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
        console.log(this.searchData);
        this.total = res.total;
      });
    },
    handleClick(row) {
      console.log(row);
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getSearchData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSearchData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";
.top {
  padding: 2rem 0;
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