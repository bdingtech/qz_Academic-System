<template>
  <div class="timetable">
    <Header title="课程表" :casLogin="casLogin"></Header>
    <div class="timetable_top">
      <van-field readonly clickable :value="curWeek" placeholder="周次" @click="showPicker = true;change = false"/>
      <i class="week-arrow"></i>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="35" :default-index="defaultIndex"/>
      </van-popup>
      <div class="time-right-stu">
        <!-- 时间模式 -->
        <van-field readonly clickable placeholder="" v-model="timeMode" @click="modePicker = true"/>
        <i class="week-arrow"></i>
        <van-popup v-model="modePicker" position="bottom">
          <van-picker show-toolbar :columns="modeColumns" @cancel="modePicker = false;change = false" @confirm="modeConfirm" :item-height="35" :default-index="defaultIndex1"/>
        </van-popup>
        <div class="currentTime" @click="loadCourse()">今</div>
      </div>
    </div>
    <div class="timetable_list">
      <div class="period">
        <div>{{this.curMonth}}<br>月</div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
        </ul>
      </div>
      <div class="table-right" id="tableRight">
        <div class="week-nav">
          <ul>
            <li :style="curDay == item.xqmc && curWeek == stillWeek ? 'background-color:#12DDD6' : ''" v-for="(item,index) in dateWeekList" :key="index">
              <span>周{{item.xqmc}}</span>
              <p>{{dateSub(item.mxrq)}}</p>
            </li>
          </ul>
        </div>
        <div class="course-content">
          <!-- 周日 -->
          <div class="course-form" id="Sunday">
            <ul class="double-item">
              <template v-for="(item,index) in SundayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,0) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,7)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in SundayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,0)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,7)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
          <!-- 周一 -->
          <div class="course-form" id="monday">
            <ul class="double-item">
              <template v-for="(item,index) in mondayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,1) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,1)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in mondayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'margin-top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,1)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,1)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
          <!-- 周二 -->
          <div class="course-form" id="Tuesday">
            <ul class="double-item">
              <template v-for="(item,index) in TuesdayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,0) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,2)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in TuesdayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,0)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,2)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
          <!-- 周三 -->
          <div class="course-form" id="Wednesday">
            <ul class="double-item">
              <template v-for="(item,index) in WednesdayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,1) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,3)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in WednesdayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,1)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,3)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
          <!-- 周四 -->
          <div class="course-form" id="Thursday">
            <ul class="double-item">
              <template v-for="(item,index) in ThursdayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,0) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,4)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in ThursdayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,0)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,4)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
          <!-- 周五 -->
          <div class="course-form" id="Friday">
            <ul class="double-item">
              <template v-for="(item,index) in FridayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,1) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,5)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in FridayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,1)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,5)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
          <!-- 周六 -->
          <div class="course-form" id="Saturday">
            <ul class="double-item">
              <template v-for="(item,index) in SaturdayList">
                <li ref="ranText" :style="item.courseName ? 'background-color:' + calcColor(index,0) : ''" :class="item.courseName == undefined ? '' : 'course-color'" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,6)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
            <ul class="single-item">
              <template v-for="(item,index) in SaturdayList1">
                <li ref="ranText" :class="item.courseName == undefined ? '' : 'course-color upShow'" :style="'top:' + calcOpt(item.classTime,0) + 'height:' + calcOpt(item.classTime,1) + 'background-color:' + calcColor(index,0,111)" :key="index" v-if="item" @click="item.courseName == undefined || item.courseName == ''  ? '' : courseDetail(item,6)">
                  {{item.courseName == undefined ? '' : item.courseName + '-' + item.teacherName + '@' + item.location}}
                  <p v-if="item.buttonCode != 0 && item.buttonCode" v-text="item.buttonCode == 2 ? '进入课堂' : '暂未开设'"></p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="popShow" class="popup">
      <h2>{{this.popList.courseName}}<i class="close-pop" @click="popShow = false"></i></h2>
      <p>时间：<span>{{this.infoWeek}}（{{this.popList.startTime}}-{{this.popList.endTIme}}）</span></p>
      <p>地点：<span>{{this.popList.location}}</span></p>
      <p>教师：<span>{{this.popList.teacherName}}</span></p>
      <p>教学周：<span>第{{this.popList.classWeek}}周</span></p>
      <p v-if="this.popList.meetingData">课堂号：<span>{{this.popList.meetingData.meetingNumber}}</span></p>
      <p v-if="this.popList.meetingData">课堂密码：<span>{{this.popList.meetingData.password}}</span></p>
      <!-- <p v-if="this.popList.buttonCode == '2'">课堂链接：<span :class="this.popList.meetingData ? 'link-item' : ''">{{this.popList.meetingData ? this.popList.meetingData.shareUrl : '暂未开设课堂'}}</span></p> -->
      <button @click="checkLive(popList)">{{this.popList.buttonCode == '0' ? '确定' : '进入课堂'}}</button>
    </van-popup>
  </div>
</template>

<script>
  // // import Header from './header.vue'
  import { Toast } from 'vant';
  import { Api } from '../../utils/axios'
  export default {
	  data(){
      return{
        casLogin:sessionStorage.getItem('casLogin'),
        isAllow:'',
        timetable:[],
        curWeek: '',
        timeMode:'',
        modePicker: false,
        showPicker: false,
        defaultIndex:0,
        defaultIndex1:0,
        columns: [],
        modeColumns: [],
        curDay:'',
        popShow:false,
        popList:[{
          classNum:'',
          classTime:'',
          classWeek:'',
          classWeekDetails:'',
          courseName:'',
          endTIme:'',
          jx0408id:'',
          location:'',
          startTime:'',
          teacherName:'',
          weekday:''
        }],
        allCourseList:'',
        mondayList:[],
        TuesdayList:[],
        WednesdayList:[],
        ThursdayList:[],
        FridayList:[],
        SaturdayList:[],
        SundayList:[],
        // 单节
        mondayList1:[],
        TuesdayList1:[],
        WednesdayList1:[],
        ThursdayList1:[],
        FridayList1:[],
        SaturdayList1:[],
        SundayList1:[],
        weekPick:'',
        stillWeek:'',
        infoWeek:'',
        curMonth:'',
        dateWeekList:[],
        colorList:["#FF8282","#EE7BFF","#FFBB79","#FF87B3","#86B5FF"],
        // colorList1:["#EE7BFF","#FF87B3","#86B5FF","#FFBB79","#FF8282"],
        colorList1:["rgba(118,107,255,.7)","#757DA3","rgba(255,84,147,.4)","#B3B9D0","rgba(95,222,255,.7)"],
        updateUrl:'',
        change:true,
        timeModeId:'',
        modeIdColumns:[],
      }
    },
    created(){
      this.loadCourse();
      this.timeModeTap()
    },
    methods:{
      calcColor(index,type,e){
        if(this.change){
          // let num = parseInt(Math.random()*5)
          let num = Math.abs(index - 2)
          let num1 = Math.abs(index - 4)
          if(type == 0){
            return this.colorList[num1]
          }else{
            return this.colorList1[num]
          }
        }
      },
      modeConfirm(val,index){
        this.modePicker = false
        this.timeMode = val
        this.timeModeId = this.modeIdColumns[index]
        this.loadCourse(this.modeIdColumns[index])
      },
      checkLive(e){
        this.popShow = false;
        if(e.buttonCode == 2){
          if(e.meetingData && e.meetingData.shareUrl != ''){
            if(this.isAllow){
              window.location.href = this.updateUrl
            }else{
              Toast.fail("该门课程暂未开设云课堂");
            }
          }else{
            Toast.fail("该门课程暂未开设云课堂");
          }
        }
      },
      calcOpt(val,type){
        let num = Number(val.substr(1,2))-1;
        //top
        if(type == 0){
          return num*65.5 + 'px;'
        //height
        }else{
          let multiple = (Number(val.length) - 1)/2
          return 65.5*multiple + 'px;'
        }
      },
      dateSub(res){
        return Number(res.substr(-2,2))
      },
      async getTeaWeek(){
        const res = await Api.getTeachingWeek()
        let concatList = [];
        this.columns = []
        res.data.forEach((item,index) => {
          concatList[index] = {
            text: "第" + item.week + "周",
            value:index + 1
          }
        });
        this.columns = this.columns.concat(concatList);
      },
      async timeModeTap(){
        const res = await Api.getTimeMode()
        res.data.forEach((item,index) => {
          if(item.mrms == 1){
            this.timeMode = item.kbjcmsmc
            this.defaultIndex1 = index
            this.timeModeId = item.kbjcmsid
          }
          this.modeColumns.push(item.kbjcmsmc)
          this.modeIdColumns.push(item.kbjcmsid)
        });
      },
      async curriculum(val,e){
        const params = {
          week:val ? val : '',
          kbjcmsid:e ? e : ''
        }
        const res = await Api.stuCurriculum(params)
        this.dateWeekList = res.data[0].date;
        if(res.data.length != 0){
          this.curWeek = "第" + res.data[0].week + "周";
          this.stillWeek = "第" + res.data[0].week + "周";
          this.curDay = res.data[0].weekday;
          this.allCourseList = res.data[0].item;
          this.defaultIndex = Number(res.data[0].week) - 1
          this.curMonth = Number(res.data[0].date[0].mxrq.substr(5,2))
          if(res.data[0].item.length == 0){
            Toast.fail(res.Msg);
          }else{
            let mondayList1 = []
            let TuesdayList1 = []
            let WednesdayList1 = []
            let ThursdayList1 = []
            let FridayList1 = []
            let SaturdayList1 = []
            let SundayList1 = []
            //当前周次全部课程
            for(let i = 0;i < this.allCourseList.length;i++){
              let whichDay = this.allCourseList[i].classTime.substr(0,1)
              if(whichDay == '1'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.mondayList.push(this.allCourseList[i])
                // }else{
                //   mondayList1.push(this.allCourseList[i])
                // }
                mondayList1.push(this.allCourseList[i])
              }else if(whichDay == '2'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.TuesdayList.push(this.allCourseList[i])
                // }else{
                //   TuesdayList1.push(this.allCourseList[i])
                // }
                TuesdayList1.push(this.allCourseList[i])
              }else if(whichDay == '3'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.WednesdayList.push(this.allCourseList[i])
                // }else{
                //   WednesdayList1.push(this.allCourseList[i])
                // }
                WednesdayList1.push(this.allCourseList[i])
              }else if(whichDay == '4'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.ThursdayList.push(this.allCourseList[i])
                // }else{
                //   ThursdayList1.push(this.allCourseList[i])
                // }
                ThursdayList1.push(this.allCourseList[i])
              }else if(whichDay == '5'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.FridayList.push(this.allCourseList[i])
                // }else{
                //   FridayList1.push(this.allCourseList[i])
                // }
                FridayList1.push(this.allCourseList[i])
              }else if(whichDay == '6'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.SaturdayList.push(this.allCourseList[i])
                // }else{
                //   SaturdayList1.push(this.allCourseList[i])
                // }
                SaturdayList1.push(this.allCourseList[i])
              }else if(whichDay == '7'){
                // if(this.allCourseList[i].classTime.length == 5){
                //   this.SundayList.push(this.allCourseList[i])
                // }else{
                //   SundayList1.push(this.allCourseList[i])
                // }
                SundayList1.push(this.allCourseList[i])
              }
            }
              let mondayList = [];
              let TuesdayList = [];
              let WednesdayList = [];
              let ThursdayList = [];
              let FridayList = [];
              let SaturdayList = [];
              let SundayList = [];
              for(let x = 0;x < 6;x++){
                mondayList[x] = {}
                TuesdayList[x] = {}
                WednesdayList[x] = {}
                ThursdayList[x] = {}
                FridayList[x] = {}
                SaturdayList[x] = {}
                SundayList[x] = {}
              }
              if(this.mondayList.length > 0){
                for(let y = 0;y < this.mondayList.length;y++){
                  let mIndex = (Number(this.mondayList[y].classTime.substr(1,2)) - 1)/2
                  mondayList[mIndex] = this.mondayList[y]
                }
              }
              if(this.TuesdayList.length > 0){
                for(let y = 0;y < this.TuesdayList.length;y++){
                  let tIndex = (Number(this.TuesdayList[y].classTime.substr(1,2)) - 1)/2
                  TuesdayList[tIndex] = this.TuesdayList[y]
                }
              }
              if(this.WednesdayList.length > 0){
                for(let y = 0;y < this.WednesdayList.length;y++){
                  let wIndex = (Number(this.WednesdayList[y].classTime.substr(1,2)) - 1)/2
                  WednesdayList[wIndex] = this.WednesdayList[y]
                }
              }
              if(this.ThursdayList.length > 0){
                for(let y = 0;y < this.ThursdayList.length;y++){
                  let hIndex = (Number(this.ThursdayList[y].classTime.substr(1,2)) - 1)/2
                  ThursdayList[hIndex] = this.ThursdayList[y]
                }
              }
              if(this.FridayList.length > 0){
                for(let y = 0;y < this.FridayList.length;y++){
                  let fIndex = (Number(this.FridayList[y].classTime.substr(1,2)) - 1)/2
                  FridayList[fIndex] = this.FridayList[y]
                }
              }
              if(this.SaturdayList.length > 0){
                for(let y = 0;y < this.SaturdayList.length;y++){
                  let sIndex = (Number(this.SaturdayList[y].classTime.substr(1,2)) - 1)/2
                  SaturdayList[sIndex] = this.SaturdayList[y]
                }
              }
              if(this.SundayList.length > 0){
                for(let y = 0;y < this.SundayList.length;y++){
                  let uIndex = (Number(this.SundayList[y].classTime.substr(1,2)) - 1)/2
                  SundayList[uIndex] = this.SundayList[y]
                }
              }
              if(res.data[0].date[0].xqmc == '日'){
                this.mondayList = mondayList
                this.TuesdayList = TuesdayList
                this.WednesdayList = WednesdayList
                this.ThursdayList = ThursdayList
                this.FridayList = FridayList
                this.SaturdayList = SaturdayList
                this.SundayList = SundayList

                this.mondayList1 = mondayList1
                this.TuesdayList1 = TuesdayList1
                this.WednesdayList1 = WednesdayList1
                this.ThursdayList1 = ThursdayList1
                this.FridayList1 = FridayList1
                this.SaturdayList1 = SaturdayList1
                this.SundayList1 = SundayList1
              }else if(res.data[0].date[0].xqmc == '一'){
                this.mondayList = TuesdayList
                this.TuesdayList = WednesdayList
                this.WednesdayList = ThursdayList
                this.ThursdayList = FridayList
                this.FridayList = SaturdayList
                this.SaturdayList = SundayList
                this.SundayList = mondayList

                this.mondayList1 = TuesdayList1
                this.TuesdayList1 = WednesdayList1
                this.WednesdayList1 = ThursdayList1
                this.ThursdayList1 = FridayList1
                this.FridayList1 = SaturdayList1
                this.SaturdayList1 = SundayList1
                this.SundayList1 = mondayList1
              }else if(res.data[0].date[0].xqmc == '二'){
                this.mondayList = WednesdayList
                this.TuesdayList = ThursdayList
                this.WednesdayList = FridayList
                this.ThursdayList = SaturdayList
                this.FridayList = SundayList
                this.SaturdayList = mondayList
                this.SundayList = TuesdayList

                this.mondayList1 = WednesdayList1
                this.TuesdayList1 = ThursdayList1
                this.WednesdayList1 = FridayList1
                this.ThursdayList1 = SaturdayList1
                this.FridayList1 = SundayList1
                this.SaturdayList1 = mondayList1
                this.SundayList1 = TuesdayList1
              }else if(res.data[0].date[0].xqmc == '三'){
                this.mondayList = ThursdayList
                this.TuesdayList = FridayList
                this.WednesdayList = SaturdayList
                this.ThursdayList = SundayList
                this.FridayList = mondayList
                this.SaturdayList = TuesdayList
                this.SundayList = WednesdayList

                this.mondayList1 = ThursdayList1
                this.TuesdayList1 = FridayList1
                this.WednesdayList1 = SaturdayList1
                this.ThursdayList1 = SundayList1
                this.FridayList1 = mondayList1
                this.SaturdayList1 = TuesdayList1
                this.SundayList1 = WednesdayList1
              }else if(res.data[0].date[0].xqmc == '四'){
                this.mondayList = FridayList
                this.TuesdayList = SaturdayList
                this.WednesdayList = SundayList
                this.ThursdayList = mondayList
                this.FridayList = TuesdayList
                this.SaturdayList = WednesdayList
                this.SundayList = ThursdayList

                this.mondayList1 = FridayList1
                this.TuesdayList1 = SaturdayList1
                this.WednesdayList1 = SundayList1
                this.ThursdayList1 = mondayList1
                this.FridayList1 = TuesdayList1
                this.SaturdayList1 = WednesdayList1
                this.SundayList1 = ThursdayList1
              }else if(res.data[0].date[0].xqmc == '五'){
                this.mondayList = SaturdayList
                this.TuesdayList = SundayList
                this.WednesdayList = mondayList
                this.ThursdayList = TuesdayList
                this.FridayList = WednesdayList
                this.SaturdayList = ThursdayList
                this.SundayList = FridayList

                this.mondayList1 = SaturdayList1
                this.TuesdayList1 = SundayList1
                this.WednesdayList1 = mondayList1
                this.ThursdayList1 = TuesdayList1
                this.FridayList1 = WednesdayList1
                this.SaturdayList1 = ThursdayList1
                this.SundayList1 = FridayList1
              }else if(res.data[0].date[0].xqmc == '六'){
                this.mondayList = SundayList
                this.TuesdayList = mondayList
                this.WednesdayList = TuesdayList
                this.ThursdayList = WednesdayList
                this.FridayList = ThursdayList
                this.SaturdayList = FridayList
                this.SundayList = SaturdayList

                this.mondayList1 = SundayList1
                this.TuesdayList1 = mondayList1
                this.WednesdayList1 = TuesdayList1
                this.ThursdayList1 = WednesdayList1
                this.FridayList1 = ThursdayList1
                this.SaturdayList1 = FridayList1
                this.SundayList1 = SaturdayList1
              }
          }
        }else{
          Toast.fail(res.Msg);
        }
      },
      loadCourse(e){
        this.change = true;
        this.mondayList = []
        this.TuesdayList = []
        this.WednesdayList = []
        this.ThursdayList = []
        this.FridayList = []
        this.SaturdayList = []
        this.SundayList = []
        this.allCourseList = []

        this.mondayList1 = []
        this.TuesdayList1 = []
        this.WednesdayList1 = []
        this.ThursdayList1 = []
        this.FridayList1 = []
        this.SaturdayList1 = []
        this.SundayList1 = []

        let mondayList1 = [];
        let TuesdayList1 = []
        let WednesdayList1 = []
        let ThursdayList1 = []
        let FridayList1 = []
        let SaturdayList1 = []
        let SundayList1 = []
        this.getTeaWeek()
        // 课程表
        let defaultIndex = ''
        if(e) {
          defaultIndex = this.defaultIndex + 1
        }else {
          defaultIndex = ''
        }
        this.curriculum(defaultIndex,e)
      },
      courseDetail(info,val){
        let day = Number(info.classTime.substr(0,1))
        this.change = false;
        switch (day) {
          case 1:
            this.infoWeek = '周一'
            break;
          case 2:
            this.infoWeek = '周二'
            break;
          case 3:
            this.infoWeek = '周三'
            break;
          case 4:
            this.infoWeek = '周四'
            break;
          case 5:
            this.infoWeek = '周五'
            break;
          case 6:
            this.infoWeek = '周六'
            break;
          case 7:
            this.infoWeek = '周日'
            break;
          default:
            break;
        }
        this.popShow = true;
        this.popList = info;
        this.infoWeek = this.infoWeek + "，" + this.popList.classTime.substr(1,this.popList.classTime.length) + "节";
        this.getMeeting(info)
      },
      async getMeeting(e){
        const params = {
          coursePlanId:e.jx0408id
        }
        const res = await Api.isYxMeetingV2Api(params)
        this.isAllow = res.data.result;
        if(res.data.result){
          this.updateUrl = res.data.meetingData.shareUrl;
          this.popList.meetingData = res.data.meetingData;
        }
      },
      onConfirm(value,index) {
        this.change = true;
        this.weekPick = value.text
        this.showPicker = false;
        this.courseTable(index + 1)
        this.curWeek = value.text;
        this.defaultIndex = index;
      },
      courseTable(val){
        this.mondayList = []
        this.TuesdayList = []
        this.WednesdayList = []
        this.ThursdayList = []
        this.FridayList = []
        this.SaturdayList = []
        this.SundayList = []
        this.mondayList1 = []
        this.TuesdayList1 = []
        this.WednesdayList1 = []
        this.ThursdayList1 = []
        this.FridayList1 = []
        this.SaturdayList1 = []
        this.SundayList1 = []
        this.allCourseList1 = []

        let mondayList1 = []
        let TuesdayList1 = []
        let WednesdayList1 = []
        let ThursdayList1 = []
        let FridayList1 = []
        let SaturdayList1 = []
        let SundayList1 = []
        let allCourseList1 = []
        this.getCurriculum(val)
      },
      async getCurriculum(val){
        const params = {
          week:val,
          kbjcmsid:this.timeModeId
        }
        const res = await Api.stuCurriculum(params)
        this.dateWeekList = res.data[0].date;
        if(res.data.length != 0){
          this.allCourseList = res.data[0].item;
          this.curMonth = Number(res.data[0].date[0].mxrq.substr(5,2))
          if(res.data[0].item.length == 0){
            Toast.fail('当前周次暂无课表信息~');
          }else{
            let mondayList1 = []
            let TuesdayList1 = []
            let WednesdayList1 = []
            let ThursdayList1 = []
            let FridayList1 = []
            let SaturdayList1 = []
            let SundayList1 = []
            //当前周次全部课程
          for(let i = 0;i < this.allCourseList.length;i++){
            let whichDay = this.allCourseList[i].classTime.substr(0,1)
            if(whichDay == '1'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.mondayList.push(this.allCourseList[i])
              // }else{
              //   mondayList1.push(this.allCourseList[i])
              // }
              mondayList1.push(this.allCourseList[i])
            }else if(whichDay == '2'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.TuesdayList.push(this.allCourseList[i])
              //   console.log(this.TuesdayList);
              // }else{
              //   TuesdayList1.push(this.allCourseList[i])
              // }
              TuesdayList1.push(this.allCourseList[i])
            }else if(whichDay == '3'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.WednesdayList.push(this.allCourseList[i])
              // }else{
              //   WednesdayList1.push(this.allCourseList[i])
              // }
              WednesdayList1.push(this.allCourseList[i])
            }else if(whichDay == '4'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.ThursdayList.push(this.allCourseList[i])
              // }else{
              //   ThursdayList1.push(this.allCourseList[i])
              // }
              ThursdayList1.push(this.allCourseList[i])
            }else if(whichDay == '5'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.FridayList.push(this.allCourseList[i])
              // }else{
              //   FridayList1.push(this.allCourseList[i])
              // }
              FridayList1.push(this.allCourseList[i])
            }else if(whichDay == '6'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.SaturdayList.push(this.allCourseList[i])
              // }else{
              //   SaturdayList1.push(this.allCourseList[i])
              // }
              SaturdayList1.push(this.allCourseList[i])
            }else if(whichDay == '7'){
              // if(this.allCourseList[i].classTime.length == 5){
              //   this.SundayList.push(this.allCourseList[i])
              // }else{
              //   SundayList1.push(this.allCourseList[i])
              // }
              SundayList1.push(this.allCourseList[i])
            }
          }
            let mondayList = [];
            let TuesdayList = [];
            let WednesdayList = [];
            let ThursdayList = [];
            let FridayList = [];
            let SaturdayList = [];
            let SundayList = [];
            for(let x = 0;x < 6;x++){
              mondayList[x] = {}
              TuesdayList[x] = {}
              WednesdayList[x] = {}
              ThursdayList[x] = {}
              FridayList[x] = {}
              SaturdayList[x] = {}
              SundayList[x] = {}
            }
            if(this.mondayList.length > 0){
              for(let y = 0;y < this.mondayList.length;y++){
                let mIndex = (Number(this.mondayList[y].classTime.substr(1,2)) - 1)/2
                mondayList[mIndex] = this.mondayList[y]
              }
            }
            if(this.TuesdayList.length > 0){
              for(let y = 0;y < this.TuesdayList.length;y++){
                let tIndex = (Number(this.TuesdayList[y].classTime.substr(1,2)) - 1)/2
                TuesdayList[tIndex] = this.TuesdayList[y]
              }
            }
            if(this.WednesdayList.length > 0){
              for(let y = 0;y < this.WednesdayList.length;y++){
                let wIndex = (Number(this.WednesdayList[y].classTime.substr(1,2)) - 1)/2
                WednesdayList[wIndex] = this.WednesdayList[y]
              }
            }
            if(this.ThursdayList.length > 0){
              for(let y = 0;y < this.ThursdayList.length;y++){
                let hIndex = (Number(this.ThursdayList[y].classTime.substr(1,2)) - 1)/2
                ThursdayList[hIndex] = this.ThursdayList[y]
              }
            }
            if(this.FridayList.length > 0){
              for(let y = 0;y < this.FridayList.length;y++){
                let fIndex = (Number(this.FridayList[y].classTime.substr(1,2)) - 1)/2
                FridayList[fIndex] = this.FridayList[y]
              }
            }
            if(this.SaturdayList.length > 0){
              for(let y = 0;y < this.SaturdayList.length;y++){
                let sIndex = (Number(this.SaturdayList[y].classTime.substr(1,2)) - 1)/2
                SaturdayList[sIndex] = this.SaturdayList[y]
              }
            }
            if(this.SundayList.length > 0){
              for(let y = 0;y < this.SundayList.length;y++){
                let uIndex = (Number(this.SundayList[y].classTime.substr(1,2)) - 1)/2
                SundayList[uIndex] = this.SundayList[y]
              }
            }
            if(res.data[0].date[0].xqmc == '日'){
              this.mondayList = mondayList
              this.TuesdayList = TuesdayList
              this.WednesdayList = WednesdayList
              this.ThursdayList = ThursdayList
              this.FridayList = FridayList
              this.SaturdayList = SaturdayList
              this.SundayList = SundayList

              this.mondayList1 = mondayList1
              this.TuesdayList1 = TuesdayList1
              this.WednesdayList1 = WednesdayList1
              this.ThursdayList1 = ThursdayList1
              this.FridayList1 = FridayList1
              this.SaturdayList1 = SaturdayList1
              this.SundayList1 = SundayList1
            }else if(res.data[0].date[0].xqmc == '一'){
              this.mondayList = TuesdayList
              this.TuesdayList = WednesdayList
              this.WednesdayList = ThursdayList
              this.ThursdayList = FridayList
              this.FridayList = SaturdayList
              this.SaturdayList = SundayList
              this.SundayList = mondayList

              this.mondayList1 = TuesdayList1
              this.TuesdayList1 = WednesdayList1
              this.WednesdayList1 = ThursdayList1
              this.ThursdayList1 = FridayList1
              this.FridayList1 = SaturdayList1
              this.SaturdayList1 = SundayList1
              this.SundayList1 = mondayList1
            }else if(res.data[0].date[0].xqmc == '二'){
              this.mondayList = WednesdayList
              this.TuesdayList = ThursdayList
              this.WednesdayList = FridayList
              this.ThursdayList = SaturdayList
              this.FridayList = SundayList
              this.SaturdayList = mondayList
              this.SundayList = TuesdayList

              this.mondayList1 = WednesdayList1
              this.TuesdayList1 = ThursdayList1
              this.WednesdayList1 = FridayList1
              this.ThursdayList1 = SaturdayList1
              this.FridayList1 = SundayList1
              this.SaturdayList1 = mondayList1
              this.SundayList1 = TuesdayList1
            }else if(res.data[0].date[0].xqmc == '三'){
              this.mondayList = ThursdayList
              this.TuesdayList = FridayList
              this.WednesdayList = SaturdayList
              this.ThursdayList = SundayList
              this.FridayList = mondayList
              this.SaturdayList = TuesdayList
              this.SundayList = WednesdayList

              this.mondayList1 = ThursdayList1
              this.TuesdayList1 = FridayList1
              this.WednesdayList1 = SaturdayList1
              this.ThursdayList1 = SundayList1
              this.FridayList1 = mondayList1
              this.SaturdayList1 = TuesdayList1
              this.SundayList1 = WednesdayList1
            }else if(res.data[0].date[0].xqmc == '四'){
              this.mondayList = FridayList
              this.TuesdayList = SaturdayList
              this.WednesdayList = SundayList
              this.ThursdayList = mondayList
              this.FridayList = TuesdayList
              this.SaturdayList = WednesdayList
              this.SundayList = ThursdayList

              this.mondayList1 = FridayList1
              this.TuesdayList1 = SaturdayList1
              this.WednesdayList1 = SundayList1
              this.ThursdayList1 = mondayList1
              this.FridayList1 = TuesdayList1
              this.SaturdayList1 = WednesdayList1
              this.SundayList1 = ThursdayList1
            }else if(res.data[0].date[0].xqmc == '五'){
              this.mondayList = SaturdayList
              this.TuesdayList = SundayList
              this.WednesdayList = mondayList
              this.ThursdayList = TuesdayList
              this.FridayList = WednesdayList
              this.SaturdayList = ThursdayList
              this.SundayList = FridayList

              this.mondayList1 = SaturdayList1
              this.TuesdayList1 = SundayList1
              this.WednesdayList1 = mondayList1
              this.ThursdayList1 = TuesdayList1
              this.FridayList1 = WednesdayList1
              this.SaturdayList1 = ThursdayList1
              this.SundayList1 = FridayList1
            }else if(res.data[0].date[0].xqmc == '六'){
              this.mondayList = SundayList
              this.TuesdayList = mondayList
              this.WednesdayList = TuesdayList
              this.ThursdayList = WednesdayList
              this.FridayList = ThursdayList
              this.SaturdayList = FridayList
              this.SundayList = SaturdayList

              this.mondayList1 = SundayList1
              this.TuesdayList1 = mondayList1
              this.WednesdayList1 = TuesdayList1
              this.ThursdayList1 = WednesdayList1
              this.FridayList1 = ThursdayList1
              this.SaturdayList1 = FridayList1
              this.SundayList1 = SaturdayList1
            }
          }
        }else{
          Toast.fail(res.Msg);
        }
      }
    },
    mounted(){
      setTimeout(() => {
        if(this.$refs.ranText){
          for(let i = 0;i < this.$refs.ranText.length;i++){
            if(this.$refs.ranText[i].children && this.$refs.ranText[i].children.length == 1){
              this.$refs.ranText[i].children[0].style.color = this.$refs.ranText[i].style.backgroundColor
            }
          }
        }
      },500)
    },
  }
</script>

<style lang="less">
.timetable .popup i.close-pop{background: url(../../../static/img/close.png)no-repeat center;position: absolute;right: 0;top: -10px;background-size:20px 20px;width: 20px;height: 20px;padding: 10px;}
.timetable .link-item{text-decoration: underline;word-break: break-all;}
.timetable .upShow{z-index: 2;border-left: 1px solid @attendance-color-3;}
.timetable .single-item,.double-item,.triangle-item{position: absolute;top: 0;left: 0;width: 100%;}
.timetable .single-item,.triangle-item{top: 1px;}
  .timetable .van-popup.van-popup--center{box-sizing: border-box;padding: 20px;}
  .timetable .van-popup.van-popup--center>h2{color: @attendance-color-1;font-size: 16px;text-align: center;font-weight: bold;margin-bottom: 20px;position: relative;}
  .timetable .van-popup.van-popup--center>div{color: @attendance-background-color-1;font-size: 24px;font-weight: bold;text-align: center;padding-top: 10px;padding-bottom: 10px;}
  .timetable .van-popup.van-popup--center>p{color:@attendance-color-2;font-size: 16px;line-height: 30px;font-weight: 300;}
  .timetable .popup button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;border-radius: 3px;width: 100%;margin-top: 50px;}
  .timetable .van-popup.van-popup--center>p>span{font-weight: 600;}
  .timetable .timetable_top{display: flex;justify-content: space-between;align-items: center;background: @attendance-background-color-1;padding: 10px 15px;}
  .timetable .timetable_top select{color: @attendance-color-3;border: 0;background: none;outline: none;}
  .timetable .timetable_top .currentTime{width: 25px;height: 25px;line-height: 25px;color: @attendance-color-3;font-size: 12px;text-align: center;border-radius: 50%;background: @attendance-background-color-8;}
  .timetable .timetable_list{display: flex;background-color:@attendance-background-color-6;}
  .timetable .timetable_list .period{position: relative;}
  .timetable .timetable_list .period>div{position: absolute;top: 0;left: 0;border: 1px solid @attendance-border-color-5;border-bottom: 0;box-sizing: border-box;font-size: 14px;text-align: center;box-shadow:3px 3px 4px 0px rgba(62,53,167,0.26);background: @attendance-border-color-5;color: @attendance-color-3;height: 60px;width: 45px;display: flex;align-items: center;justify-content: center;}
  .timetable .timetable_list .period ul{margin-top: 60px;}
  .timetable .timetable_list .period ul li{height: 65.5px;text-align: center;line-height: 65.5px;width: 45px;}
  .timetable .el-tabs__nav .is-top{background: @attendance-border-color-5;color: @attendance-color-3 !important;}
  .timetable .timetable_list .el-tabs__nav .is-top{background: @attendance-border-color-5;color: @attendance-color-3;}
  .table_list ul li{width: 62px;height: 115px;background: @attendance-background-color-9;color: @attendance-color-3;box-sizing: border-box;padding:5px; font-size: 12px;border-radius: 2px;}
  .timetable .timetable_top .van-cell{background-color: @attendance-background-color-1;color: @attendance-color-3;padding: 0;width: 15%;}
  .timetable .timetable_top .van-field__control{color: @attendance-color-3;}
  .timetable .timetable_top .van-picker-column__item{margin: 0 30%;}
  .timetable .timetable_top .van-cell:not(:last-child)::after{border-bottom: 0;}
  .timetable .week-arrow{background: url(../../../static/img/week.png)no-repeat center;width: 7px;height: 4px;background-size: 7px 4px;position: absolute;left: 70px;}
  .timetable .timetable_top .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}
  .timetable .table-right{flex: 1;overflow-x:scroll;}
  .timetable .table-right .week-nav ul li>p{font-size: 14px;margin-top: 3px}
  .timetable .table-right .week-nav ul li{flex-direction: column; height: 60px;background-color: @attendance-border-color-5;color: @attendance-color-3;display: flex;justify-content: center;align-items: center;width:15%;}
  .timetable .table-right .week-nav ul{min-width:435px;display: flex;max-width: 100%;}
  .timetable .el-tabs__nav{width: 100%;}
  .timetable .period ul li{color:@attendance-color-2;}
  .timetable .course-content{display: flex;min-width: 435px;max-width: 100%;}
  .timetable .course-content .course-form{width:15%;position: relative;}
  .timetable .course-content .course-form ul{display: flex;flex-direction: column;}
  .timetable .course-content .course-form ul li{color: @attendance-color-3;font-size: 12px;padding: 4px;border-radius: 3px;word-wrap:break-word;position: relative;box-sizing: border-box;}
  .timetable .course-content .course-form ul li>p{border-radius: 9px;background-color: rgba(255,255,255,.5);font-size: 10px;text-align: center;padding: 2px 0;position: absolute;bottom: 4px;left: 2px;width: calc(100% - 4px);box-sizing: border-box;line-height: 14px;}
  .timetable .course-form ul.double-item li{
    height: 131px;border-left: 1px solid @attendance-color-3;
    border-top: 1px solid @attendance-color-3;z-index: 1;overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
  }
  .timetable .course-form ul.single-item{position: relative;}
  .timetable .course-form ul.single-item li{overflow: hidden;text-overflow: ellipsis;position: absolute;width: 100%;box-sizing: border-box;}
  .timetable .course-form ul.single-item li.upShow:nth-child(odd){border-bottom: 1px solid @attendance-color-3;}
  .timetable .course-form ul.single-item li.upShow:nth-child(2n){border-bottom: 0.5px solid @attendance-color-3;}
  .timetable .van-popup--center{width: 90%;border-radius: 5px;}
.timetable .timetable_top input::placeholder{color: @attendance-color-3;}
  .timetable .timetable_top .van-picker__columns::before{width: 120px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .timetable .timetable_top .van-picker__columns::after{width: 120px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  /* 时间模式 */
  .time-right-stu{display: flex;justify-content: flex-end;position: relative;}
  .time-right-stu .van-cell{width: calc(80% - 25px) !important;}
  .time-right-stu .van-field__control{text-align: right;padding-right: 25px;}
  .time-right-stu i.week-arrow{right: 35px;left: unset;height: 100%;}

</style>



// WEBPACK FOOTER //
// src/components/student/timetable.vue