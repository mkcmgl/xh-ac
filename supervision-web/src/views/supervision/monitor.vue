<template>
    <div>
        <div id="index" ref="appRef">
            <div class="bg">
                <vue-particles color="#086796" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
                    :particleSize="3" linesColor="#64cdff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                    :linesDistance="100" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                    clickMode="push" class="particlesBg">
                </vue-particles>
                <div class="host-body">
                    <div class="hearder">
                        <span class="timeDay">{{day}}</span>
                        <span class="timeWeek">{{week}}</span>
                        <span class="timeMin">{{time}}</span>
                    </div>
                    <div class="main">
                        <div class="left">
                            <left-top></left-top>
                            <left-center></left-center>
                            <left-bottom></left-bottom>
                        </div>
                        <div class="center">
                            <center-top></center-top>
                            <center-bottom></center-bottom>
                        </div>
                        <div class="right">
                            <right-top></right-top>
                            <right-center></right-center>
                            <right-bottom></right-bottom>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import drawMixin from "@/utils/drawMixin";
import leftTop from './leftTop.vue'
import leftCenter from './leftCenter.vue'
import LeftCenter from './leftCenter.vue'
import LeftBottom from './leftBottom.vue'
import rightTop from './rightTop.vue'
import RightTop from "./rightTop.vue";
import RightCenter from "./rightCenter.vue";
import rightBottom from "./rightBottom.vue";
import RightBottom from "./rightBottom.vue";
import centerBottom from './centerBottom.vue'
import CenterBottom from "./centerBottom.vue";
import CenterTop from "./centerTop.vue";
export default {
    mixins: [drawMixin],
    data() {
        return {
            loading: true,
            time: '',
            day: '',
            week: '',
            timeInter: null
        }
    },
    components: {
        leftTop,
        leftCenter,
        LeftCenter,
        LeftBottom,
        rightTop,
        RightTop,
        RightCenter,
        rightBottom,
        RightBottom,
        centerBottom,
        CenterBottom,
        CenterTop
    },
    mounted() {
        this.timeInter = setInterval(() => {
            this.showDay()
            this.showWeek()
            this.showtime()
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timeInter)
    },
    methods: {
        showDay() {
            var myDate = new Date();
            var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var myToday = myDate.getDate(); //获取当前日(1-31)
            let str = myYear + '年' + this.fillZero(myMonth) + '月' + this.fillZero(myToday) + '日'
            this.day = str
        },
        showWeek() {
            var myDate = new Date();
            var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            this.week = week[myDay]
        },
        showtime() {
            var myDate = new Date();
            var myHour = myDate.getHours(); //获取当前小时数(0-23)
            var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
            var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
            let str = this.fillZero(myHour) + ':' + this.fillZero(myMinute) + ':' + this.fillZero(mySecond)
            this.time = str
        },
        fillZero(str) {
            var realNum;
            if (str < 10) {
                realNum = '0' + str;
            } else {
                realNum = str;
            }
            return realNum;
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/styles/monitor.scss';
.particlesBg{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>
  