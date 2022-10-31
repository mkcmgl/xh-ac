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
      <el-table :data="searchData" class="searchClass">
        <el-table-column label="编号" prop="number" width="12rem">
        </el-table-column>
        <el-table-column label="申请方BID" prop="applyUserBid" width="12rem">
        </el-table-column>
        <el-table-column label="认证类型" prop="applyType" width="12rem">
        </el-table-column>
        <el-table-column label="申请时间" prop="applyState" width="12rem">
        </el-table-column>
        <el-table-column label="审核状态" prop="applyTime" width="12rem">
        </el-table-column>
        <el-table-column label="审核时间" prop="statetype" width="12rem">
        </el-table-column>
        <el-table-column label="操作" prop="handle" width="12rem">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "authReview",

  data() {
    return {
      searchData: [
        {
          number: "",
          applyUserBid: "",
          applyType: "",
          applyState: "",
          applyTime: "",
          statetype: "",
          handle: "",
        },
      ],

      searchForm: {
        number: "",
        applyUser: "",
        applyType: "",
        applyTypeData: {},
        applyState: "",
        applyStateData: {},
      },
      searchRules: {
        number: "",
        applyUser: "",
        applyType: "",
        applyTypeData: {},
        applyState: "",
        applyStateData: {},
      },
    };
  },

  mounted() {},

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
  }

  .el-pagination {
    text-align: right;
  }
}
</style>