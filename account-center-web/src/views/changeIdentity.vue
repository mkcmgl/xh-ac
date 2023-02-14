<template>
  <div class="app-container">
    <el-dialog title="选择登录角色" :visible.sync="chooseShow" width="28%" top="25vh" :append-to-body="true" z-index="99999"
      :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <div class="line"></div>
      <div class="warpHeight">
        <div :class="item.checked?'choiedCreatWarp':'creatWarp'" style="margin-bottom:15px"
          v-for="(item, index) in identityList" :key="index" @click="chooseIdentity(item)">
          <div class="logo">
            <img src="@/assets/images/interpriseLogo.png" v-if="item.roleName == '企业用户'"></img>
            <img src="@/assets/images/subchainLogo.png"
              v-if="item.roleName == '子链用户' || item.roleName == '子链管理员'"></img>
            <img src="@/assets/images/personLogo.png" v-if="item.roleName == '个人用户'"></img>
          </div>
          <div class="content">
            <p class="name"><span class="mr5">{{item.roleName}}</span>{{item.did }}</p>
            <p class="describe">{{ item.name }}</p>
          </div>
          <div class="right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { switchRole, chooserole } from '@/api/login/login.js'
export default {
  name: "changeIdentity",
  data() {
    return {
      changeIdentity: false,
      chooseShow: false,
      identityList: []
    };
  },
  created() {
    switchRole().then(res => {
      if (res.data == undefined || res.data == '' || res.data == null) {
        sessionStorage.setItem('hasChangeIdentity', true)
        this.$router.push({ path: '/' })
      } else {
        this.chooseShow = true
        this.identityList = res.data

      }
    })
  },
  mounted() {
  },
  methods: {
    chooseIdentity(item) {
      let acsn = item.acsn
      chooserole(acsn).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem('hasChangeIdentity', true)
          this.$router.push({ path: '/' })
          this.chooseShow = false
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
.name {
  overflow: hidden;
}

.creatWarp {
  cursor: pointer;
}

.choiedCreatWarp {
  background-color: #2F88FF;

  .name {
    color: white;
  }

  .describe {
    color: white;
  }
}
.warpHeight{
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

