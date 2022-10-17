<template>
    <div class="right">
        <div class="title">实名认证</div>

        <div class="top">
            <div class="topNum">
                <div class="first">
                    <img src="@/assets/images/a170.png" alt="">
                    <span class="back">1</span>
                
                    <div class="dscMiddle">授权数字身份标识</div>
                </div>
                <i class="middle"></i>
                <div class="first">
                    <img src="@/assets/images/auth169.png" alt="">
                    <span class="back">2</span>
                    <div class="dscMiddle">填写申请材料</div>
                </div>
                <i class="middle"></i>
                <div class="first">
                    <img src="@/assets/images/auth169.png" alt="">
                    <span class="back">3</span>
                    <div class="dscMiddle">完成认证申请</div>
                </div>
            </div>
            <div class="dec">
           
 
            </div>
        </div>
       
        <div class="centerMain"></div>
    </div>
</template>

<script>
export default {
    name: 'auth',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public.scss";

.top{
    padding-left: 14.75rem;
    padding-top: 3.125rem;
    padding-right: 14.75rem;
    .topNum{
        display: flex;
        justify-content: space-between;
        .first{
     
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
            color: #FFFFFF;
            display: block;
        }
        .dscMiddle {
            margin-top: -1.25rem;
        }
        .middle {
            display: block;
            height: 3.75rem;
            width: 12.5rem;
            border-bottom: 0.1875rem solid #dfecf7 ;
            padding: 1rem 0;
        }
    }

}


</style>