<template>
  <div class="attend-cal">
    <Header title="教学周历" :casLogin="casLogin"></Header>
    <div class="calendar-main">
      <h4 @click="monthPick = true">{{Number(curMonth)}}月<i class="month-arrow"></i></h4>
      <div class="cal-body">
        <ul>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
        <div style="width:100%;position:relative;min-height:45px;overflow:hidden;">
          <ul :class="isCollapse ? 'hidden active' : 'hidden'" ref="container">
            <li v-for="(eItem,index) in noneList" :key="index" style="color:#DFE0E6;">{{eItem}}</li>
            <li v-for="item in dateList" :key="item.rq" @click="getTimetable(item.zc,item.xqid,item.isdqrq)">
              <p :class="calcClass(item.iskb,item.isdqrq)" ref="pTap" @click="addActive($event,item)">{{ Number(item.rq.substr(8,2)) }}</p>
            </li>
            <li v-for="aItem in afterList" :key="aItem.id" style="color:#DFE0E6;">{{aItem.date}}</li>
          </ul>
        </div>
        <transition name='fade' appear>
          <div class="cal-foot" v-if="!isCollapse">
            <p class="mark1"></p>已上课
            <p class="mark2"></p>有排课
          </div>
        </transition>
      </div>
    </div>
    <!-- 折叠 -->
    <div class="cal-collapse" @click="collapseTap()"><p></p></div>
    <!-- list -->
    <NOdata v-if="courseList.length == 0 && isLoad" title="暂无数据~"></NOdata>
    <div v-else>
      <div class="cal-item" v-for="(item,index) in courseList" :key="item.str1">
        <p>{{index + 1}}</p>
        <div class="item-right">
          <div :class="item.issk == 1 ? 'item-info' : 'item-info1'" :style="'background-color:' + calcColor()" @click="checkDtl(item)">
            <p>{{item.kcjc}}</p>
            <ul>
              <li>{{item.kssj}} - {{item.jssj}}</li>
              <li>{{item.jsmc}}</li>
              <li v-if="item.issk == '0' || item.issk == '2'">{{item.signnumber}}/{{item.peoplenumber}}到</li>
              <li v-else>{{item.peoplenumber}}应到</li>
            </ul>
            <!-- 百分比 -->
            <div class="circle-rate" v-if="item.issk == '2'">
              <van-circle
                v-model="currentRate"
                :stroke-width="100"
                :rate="calcRate(item.signnumber,item.peoplenumber)"
                :speed="100"
                :text="text"
                layer-color="#C7C3FC"
                size="42px"
                stroke-linecap="butt"
                color="#7469F8"
              />
            </div>
            <div class="circle-rate"  v-if="item.issk == '0'">
              <img src="../../../../static/img/time.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="monthPick" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="monthPick = false" @confirm="onConfirm" :item-height="35" :default-index="defaultIndex"/>
    </van-popup>
  </div>
</template>
<script>
import { Api } from '../../../utils/axios'
export default {
  data(){
    return{
      casLogin:sessionStorage.getItem('casLogin'),
      dateList:[],
      noneList:[],
      afterList:[],
      curMonth:'',
      courseList:[],
      colorList:["rgba(116,105,248,.7)","rgba(255,84,147,.7)","rgba(231,67,255,.7)","rgba(255,159,65,.7)"],
      week:'',
      monthPick:false,
      columns:[],
      defaultIndex:0,
      isCollapse:false,
      currentRate:0,
      isdqrq:"",
      isLoad:false,
      currentNum:'',
    }
  },
  created(){
    this.getWeekList()
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + '%'
    }
  },
  methods:{
    calcRate(e,a){
      return parseInt(e * 100/a)
    },
    addActive(e,info){
      this.currentNum = e.target.offsetTop
      let original = e.target.className
      this.$refs.pTap.forEach((item,index) => {
        if(this.$refs.pTap[index].className == 'p-active'){
          this.$refs.pTap[index].className = ''
        }else{
          this.$refs.pTap[index].className = this.$refs.pTap[index].className.substr(0,10)
        }
      });
      if(original == "" || original == "p-active"){
        e.target.className = "p-active"
      }else{
        e.target.className = original + " p-active"
      }
    },
    onConfirm(e,index) {
      this.monthPick = false
      this.courseList = []
      this.loadCalendar(e)
    },
    collapseTap(){
      this.isCollapse = !this.isCollapse
      this.$refs.container.style.top ='-' + Number(this.currentNum - 10) + 'px'
    },
    checkDtl(e) {
      this.$router.push({
        path:'/teacher/attendanceDetail',
        query:{
          'list':JSON.stringify(e),
          'week':this.week,
          'isdqrq':this.isdqrq
        }
      })
    },
    calcColor(){
      return this.colorList[parseInt(Math.random()*4)]
    },
    calcClass(k,d){
      if(k == 1 && d == 1){
        return 'have-class'
      }else if(k == 1 && d == 2){
        return 'class-done'
      }else if(k == 1 && d == 0){
        return 'note-mark'
      }else if(k == 0 && d == 0){
        return 'p-active'
      }
    },
    async loadCalendar(e) {
      const params = {
        'yf':e ? e : ''
      }
      const res = await Api.checkWorkAttendanceCal(params)
      this.dateList = res.data
      this.isLoad = true
      this.curMonth = res.data[0].rq.substr(5,2)
      this.beforeCal(res.data)
      this.afterCal(res.data)
    },
    beforeCal(e) {
      this.noneList = []
      let length = 0
      if(e[0].xqid == 0){
        length = 6
      }else{
        length = e[0].xqid - 1
      }
      let year = Number(e[0].rq.substr(0,4)) 
      let month = Number(e[0].rq.substr(5,2)) - 1
      let maxDate = 0
      if(month == 0 || month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        maxDate = 32
      }else if(month == 2){
        if(year%4 == 0 && year&100 != 0||year%400 == 0){
          maxDate = 30
        }else{
          maxDate = 29
        }
      }else{
        maxDate = 31
      }
      let concatList = []
      for(let k = maxDate - length;k<maxDate;k++){
        concatList.push(k)
      }
      for(let i = 0;i < length;i++){
        this.noneList[i] = concatList[i]
      }
    },
    afterCal(e){
      this.afterList = []
      let num = 0
      if(e[e.length - 1].xqid == 0){
        num = 0
      }else{
        num = 7 - e[e.length - 1].xqid
      }
      for(let i = 0;i < num;i++){
        this.afterList[i] = {
          'date':i + 1,
          'id':'a'+i
        }
      }
    },
    async getWeekList(){
      const res = await Api.getTeachWeekCal()
      res.data.forEach(item => {
        this.columns.push(item.seted)
      });
      this.loadCalendar(res.data[0].seted)
    },
    async getTimetable(e,h,val){
      const params = {
        'zc':e,
        'xq':h,
        'isdqrq':val
      }
      const res = await Api.checkWorkAttendanceCourse(params)
      this.isdqrq = val
      this.week = e
      this.courseList = res.data
    }
  },
}
</script>
<style lang="less" scoped>
  .calendar-main{padding: 0 10px;}
  .calendar-main>h4{color: #212F6E;font-size: 18px;margin: 10px;display: flex;align-items: center;width: fit-content;}
  .cal-body>ul{display: flex;color: #757DA3;}
  .cal-body>ul>li{width: 14%;text-align: center;}
  .cal-body>div>ul{display: flex;flex-wrap: wrap;margin-top: 10px;}
  .cal-body>div>ul>li{margin-bottom: 5px; width: 14%;height: 35px;line-height: 33px;color: #212F6E;font-weight: bold;display: flex;align-items: center;justify-content: center;text-align: center;;}
  .note-mark{background-color: #7469F8;color: #ffffff !important;border-radius: 50%;width: 35px;position: relative;}
  .class-done{border-radius: 50%;width: 35px;border: 1px solid #7469F8;height: 35px;box-sizing: border-box;}
  .have-class{position: relative;}
  .have-class::after{position: absolute;width: 6px;height: 6px;border-radius: 50%;background-color: #7469F8;content: '';bottom: 3px;left: 50%;margin-left: -3px;}
  .note-mark::after{position: absolute;width: 6px;height: 6px;border-radius: 50%;background-color: #ffffff;content: '';bottom: 3px;left: 50%;margin-left: -3px;}
  .cal-foot{display: flex;align-items: center;color: #212F6E;font-size: 14px;margin: 10px 10px 0px;}
  p.mark1{width: 12px;height: 12px;border-radius: 50%;border: 1px solid #7469F8;margin-right: 12px;}
  p.mark2{width: 6px;height: 6px;border-radius: 50%;background-color: #7469F8;margin:0 12px 0 20px;}
  .cal-collapse{height: 18px;background-color: #DFE0E6;display: flex;align-items: center;justify-content: center;margin-top: 16px;}
  .cal-collapse>p{width: 12%;height: 6px;border-radius: 3px;background-color: rgba(255,255,255,.8);}
  .cal-item{display: flex;}
  .item-right{padding: 8px 0;flex: 1;border-bottom: 1px solid #DFE0E6;}
  .cal-item>p{width: 10%;line-height: 78px;text-align: center;color: #757DA3;font-weight: 600;}
  .item-info{color: #ffffff;height: 61px;border-radius: 5px 0 0 5px;padding: 8px 20px;box-sizing: border-box;position: relative;}
  .item-info1{color: #757DA3;height: 61px;border-radius: 5px 0 0 5px;padding: 8px 20px;box-sizing: border-box;background-color: #F6F6F6 !important;}
  .item-info>ul,.item-info1>ul{display: flex;font-size: 12px;line-height: 17px;font-weight: 300;}
  .item-info>ul>li,.item-info1>ul>li{
    margin-right: 23px;
    max-width: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-info>p,.item-info1>p{line-height: 20px;margin-bottom: 8px;position: relative;padding-left: 2px;font-weight: 600;}
  .item-info1>p{color: #212F6E;}
  .item-info>p::before,.item-info1>p::before{position: absolute;width: 6px;height: 6px;border-radius: 50%;content: "";left: -12px;top: 50%;margin-top: -3px;}
  .item-info>p::before{background-color: #ffffff;}
  .item-info1>p::before{background-color: #212F6E;}
  .attend-cal .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}/* box-shadow:0px -2px 2px 0px rgba(223,223,223,0.5); */
  .attend-cal .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{border-width: 0;}
  .attend-cal .van-picker__cancel{color:rgba(0,0,0,0);background: url(../../../../static/img/close.png)no-repeat center;position: absolute;background-size: 25px 25px;width: 25px;height: 25px;left: 0;margin: 10px;}
  .attend-cal .van-picker__confirm{color:rgba(0,0,0,0);background: url(../../../../static/img/confirm.png)no-repeat center;position: absolute;background-size: 25px 25px;width: 25px;height: 25px;right: 0;margin: 10px;}
  .attend-cal .van-picker__columns::before{width: 120px;height: 1px;background-color: #DFE0E6;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .attend-cal .van-picker__columns::after{width: 120px;height: 1px;background-color: #DFE0E6;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .attend-cal .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: #212F6E;font-weight: 600;}
  .hidden{
    width: 100%;
  }
  .hidden.active{
    overflow-y: hidden;
    transition: top .2s linear .2s;
    position: absolute;
  }
  .circle-rate{position: absolute;right: 20px;top: 50%;transform: translateY(-50%);}
  .item-info1{position: relative;}
  .circle-rate .van-circle__text{font-size: 10px;color: #212F6E;font-weight: bold;}
  .circle-rate img{width: 35px;}
  .calendar-main i.month-arrow{
    background: url(../../../../static/img/Triangle.png)no-repeat center;
    background-size: 100%;
    width: 8px;
    height: 10px;
    margin-left: 8px;
  }
  .cal-body>div>ul>li>p{width: 35px;height: 35px;}
  .p-active{background-color: #7469F8;color: #fff;border-radius: 50%;}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Attendance/attendance.vue