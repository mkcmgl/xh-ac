<template>
    <div class="app-container">
        <div class="title"><span class="lastRouter" @click="toLast">数字身份</span>
            <span class="currentRouter">/</span>
            <span class="currentRouter">导入数字身份</span>
        </div>
        <div class="warp">
            <div class="warpTitle">导入数字身份</div>
            <div class="creatWarp" @click="importByprivate">
                <div class="logo">
                    <img src="@/assets/images/importSiLogo.png"></img>
                </div>
                <div class="content">
                    <p class="name">导入iid</p>
                    <p class="describe">通过输入iid字符串进行导入</p>
                </div>
                <div class="right">
                    <!-- <router-link to="/accountCenter/importDid"> -->
                    <i class="el-icon-arrow-right"></i>
                    <!-- </router-link> -->
                </div>
            </div>
            <!-- 通过输入Keystore文件进行导入,暂时不显示 -->
            <!-- <div class="creatWarp" @click="importByprivate">
                <div class="logo">
                    <img src="../../assets/images/importSiLogo.png"></img>
                </div>
                <div class="content">
                    <p class="name">导入Keystore</p>
                    <p class="describe">通过输入Keystore文件进行导入</p>
                </div>
                <div class="right">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "importDid",
    data() {
        return {
        };
    },
    methods: {
        toLast() {
            this.$router.push({
                path: '/did'
            })
        },
        importByprivate() {
            this.$router.push({
                path: '/account/importPrivateKey',
            })
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
    width: 1610px;
    height: 85vh;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    margin: 20px auto;
    padding: 32px 32px 0 32px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: relative;

    .warpTitle {
        margin: 15px 0 0 30px;
        height: 22px;
        font-size: 16px;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #333333;
        line-height: 22px;
        position: absolute;
        top: 15px;
        left: 30px;
    }

    .creatWarp {
        cursor: pointer;
        width: 500px;
        height: 100px;
        background: #F0F6FF;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        display: flex;

        .logo {
            width: 65px;
            height: 100%;

            img {
                width: 45px;
                height: 45px;
                margin: 27px 0 0 20px;
            }
        }

        .content {
            flex: 1;
            height: 100%;

            .name {
                height: 22px;
                font-size: 16px;
                font-family: PingFang SC-Bold, PingFang SC;
                font-weight: bold;
                color: #333333;
                line-height: 22px;
                margin: 25px 0 6px 22px;
            }

            .describe {
                width: 374px;
                height: 20px;
                font-size: 14px;
                font-family: PingFang SC-常规体, PingFang SC;
                font-weight: normal;
                color: #666666;
                // line-height: 20px;
                margin: 0 0 0 25px;
            }

        }

        .right {
            width: 33px;
            height: 100%;
            padding-top: 43px;

            .el-icon-arrow-right {
                cursor: pointer;
            }
        }
    }
}

.creatWarp:hover {
    background-color: #2F88FF;

    .content {
        .name {
            color: white;
        }

        .describe {
            color: white;
        }
    }

}
</style>

