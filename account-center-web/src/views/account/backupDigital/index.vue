<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter" @click="toLast">数字身份</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">备份数字身份</span>
        </div>
        <div class="notice">
            <i class="el-icon-warning"></i>
            您可以选择保存私钥的方式来进行数字身份的备份。
            <!-- 保存Keystore文件或 -->
        </div>
        <div class="warp">
            <div class="saveTitle">保存私钥</div>
            <div class="line"></div>
            <div class="content">
                <p>私钥导出后请在安全的环境中妥善保管，切勿保存至邮箱、网盘、微信收藏等；</p>
                <p>请勿分享私钥，请勿使用网络工具传输私钥；</p>
                <p>请勿丢失私钥，丢失后无法找回。</p>
            </div>
            <div class="private">
                <span class="pirvateKey">{{ privateKey }}</span>
                <span class="copy" v-clipboard:copy="privateKey" v-clipboard:success="copyPrivateKey"
                    v-clipboard:error="copyPrivateKey">复制私钥</span>
            </div>
        </div>
        <div class="complete" @click="toLast">备份完成</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "backupDigital",
    data() {
        const bidEqualToPassword = (rule, value, callback) => {
            if (this.bidCreatForm.securePassword !== value) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };
        return {
            privateKey: ''
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    created() {
        if (this.$route.query.privateKey) {
            this.privateKey = this.$route.query.privateKey
        }
    },
    methods: {
        toLast() {
            this.$router.push({
                path: '/did'
            })
        },
        //复制私钥
        copyPrivateKey() {
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        }

    },
};
</script>

<style scoped lang="scss">
.lastRouter {
    cursor: pointer;
}

.currentRouter {
    margin-left: 10px;
    font-weight: normal;
    color: #666666;
}

.warp {
    width: 795px;
    min-height: 291px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 20px auto;
    padding: 15px 30px 30px 30px;

    .content {
        margin-top: 34px;

        p {
            font-size: 14px;
            font-family: PingFang SC-常规体, PingFang SC;
            font-weight: normal;
            color: #666666;
            line-height: 30px;
            margin: 8px 0;
        }
    }

    .private {
        margin-top: 58px;
        .pirvateKey {
            display: inline-block;
            min-height: 40px;
            background: #F0F7FD;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 800;
            color: #333333;
            text-align: left;
            width: 83%;
            vertical-align: middle;
            word-wrap: break-word;
            padding: 5px;
        }

        .copy {
            display: inline-block;
            height: 40px;
            font-size: 14px;
            font-family: PingFang SC-常规体, PingFang SC;
            font-weight: normal;
            color: #2F88FF;
            line-height: 40px;
            cursor: pointer;
            margin-left: 20px;
        }
    }

}

.line {
    width: 100%;
    height: 1px;
    background: #F4F3F7;
    opacity: 1;
    position: relative;
    top: 13px;
}

.notice {
    height: 40px;
    background: #FFFBE6;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #FFE58F;
    padding-left: 15px;
    color: #E6A23C;
    line-height: 40px;
    width: 1610px;
    margin: 24px auto 0;
    overflow: hidden;

}

.creatBtn {
    width: 100%;
}

.saveTitle {
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 22px;
}

.complete {
    margin: 60px auto;
    cursor: pointer;
    width: 280px;
    height: 40px;
    background: #2F88FF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    font-size: 14px;
    font-family: PingFang SC-常规体, PingFang SC;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 40px;
    text-align: center;
}
</style>

