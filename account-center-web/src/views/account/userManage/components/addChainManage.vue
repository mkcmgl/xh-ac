<template>
    <div>
        <el-dialog :visible.sync="disableShow" width="28%" top="15vh" :append-to-body="true" z-index="3333"
            :before-close="colse" title="添加子链管理员" :center="true">
            <el-form ref="userForm" :model="userForm" :rules="userFormRules" class="labelWidth" label-position="right">
                <el-form-item prop="did" label="成员BID">
                    <el-row>
                        <el-col :span="17">
                            <el-input v-model="userForm.did" type="text" auto-complete="off" placeholder="请输入成员BID">
                            </el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-button type="primary" @click="testUser">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="" v-if="authResultShow">
                    <el-row>
                        <el-col :span="17">
                            <el-image :src="protraitUrl" class="protrait"></el-image>
                            <span class="realName">{{ queryInfo.authType == 102 ? queryInfo.org : queryInfo.realName
                            }}</span>
                            <el-image :src="isAuthUrl" class="protrait"></el-image>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="17">
                            <span>
                                BID:
                            </span>
                            <span>
                                {{ queryInfo.did }}
                            </span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="roleId" label="角色设置">
                    <el-radio v-model="userForm.roleId" label="104">子链管理员</el-radio>
                </el-form-item>
                <el-form-item prop="subchainName" label="子链名称">
                    <el-row>
                        <el-col :span="17">
                            <el-select v-model="userForm.subchainName" multiple placeholder="请选择"
                                value-key="subchainName" @change="chooseSubchain">
                                <el-option v-for="item in subChainList" :key="item.subchainId"
                                    :label="item.subchainName" :value="item">
                                </el-option>
                            </el-select>

                        </el-col>
                    </el-row>

                </el-form-item>
            </el-form>
            <div class="btnWarp">
                <el-button @click="colse">取消</el-button>
                <el-button type="primary" @click="handleRegister">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { encrypt } from '@/utils/jsencrypt';
import { jiami, jiemi } from '@/utils/jiami'
import { resetForm } from '@/utils/ruoyi';
import { findUserByBid, addSubChainManager, subChainList } from '@/api/userManage/userManage.js'
export default {
    name: "AuthenticationResule",
    props: ['disable'],
    watch: {
        disable(val) {
            this.disableShow = val
            this.resetForm(this, 'userForm')
            this.queryInfo = null;
            this.authResultShow = false
            this.userForm.subchainName = []
            if (val) {
                this.getSubChainList()
            }
        }
    },
    data() {
        return {
            disableShow: false,
            userForm: {
                did: '',
                roleId: '104',
                subchainName: []
            },
            subChainList: [],
            queryInfo: null,
            protraitUrl: require('@/assets/images/addChainPro.png'),
            isAuthUrl: require('@/assets/images/isAuth.png'),
            authResultShow: false,
            userFormRules: {
                did: [
                    { required: true, trigger: "blur", message: "请输入用户bid" },
                    {
                        max: 100,
                        message: "长度最大100",
                        trigger: "blur",
                    },
                ],
                subchainName: [
                    { required: true, trigger: "blur", message: "请至少选择一条子链" },
                ]
            }
        };
    },

    methods: {
        //获取子链列表
        getSubChainList() {
            subChainList().then(res => {
                if (res.code == 200) {
                    this.subChainList = res.data
                }
            })
        },
        colse() {
            this.$emit('close', false)
        },
        testUser() {
            if(!this.userForm.did){
               this.$message({
                message:'请输入成员BID',
                type:'warning'
               })
               return
            }
            let param = {
                did: this.userForm.did
            }
            findUserByBid(param).then(res => {
                if (res.code == 200) {
                    if (res.data.authStatus == 1) {
                        this.queryInfo = res.data
                        this.authResultShow = true
                    } else {
                        this.$message({
                            message: '该用户未完成实名认证',
                            type: 'warning'
                        });
                    }

                }
            })
        },
        handleRegister() {
            if (this.userForm.roleId == '101') {
                let flag = this.userForm.subchainName.length
                if (flag == 0) {
                    this.$message({
                        message: '子链用户请至少选择一条子链',
                        type: 'warning'
                    })
                    return
                }
            }
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    let data = {
                        did: encrypt(this.userForm.did),
                        subchain: jiami(JSON.stringify(this.userForm.subchainName)),
                        roleId: encrypt(this.userForm.roleId)
                    }
                    addSubChainManager(data)
                        .then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '邀请成功',
                                    type: 'success'
                                });
                                this.$emit('close',false, true)
                            }
                        })
                        .catch(() => {
                        });
                }
            });
        },
        chooseSubchain(e) {
            if (e.length != 0) {
                this.userForm.subchainName = []
                e.map(item => {
                    let obj = {
                        acsn: item.acsn,
                        subchainId: item.subchainId,
                        subchainName: item.subchainName
                    }
                    this.userForm.subchainName.push(obj)
                })
            } else {
                this.userForm.subchainName = []
            }
        }
    }
};
</script>
<style scoped lang="scss">
.code-img {
    width: 100%;
    height: 40px;
    float: right;
}

.btnWarp {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.protrait {
    width: 14px;
    height: 14px;
}

.realName {
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    margin: 0 5px;
}
.labelWidth {
  ::v-deep.el-form-item__label {
    width: 125px;
  }
  ::v-deep.el-form-item__content{
    margin-left: 125px;
  }
}
</style>