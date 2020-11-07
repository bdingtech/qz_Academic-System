<template>
  <div class="timetable1">
    <Header title="课程表" :casLogin="casLogin"></Header>
    <div class="timetable_top1">
      <van-field
        readonly
        clickable
        placeholder="周次"
        v-model="curWeek"
        @click="
          showPicker = true;
          change = false;
        "
      />
      <i class="week-arrow"></i>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
          :item-height="35"
          :default-index="defaultIndex"
        />
      </van-popup>
      <div class="time-right">
        <!-- 时间模式 -->
        <van-field
          readonly
          clickable
          placeholder=""
          v-model="timeMode"
          @click="modePicker = true"
        />
        <i class="week-arrow"></i>
        <van-popup v-model="modePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="modeColumns"
            @cancel="modePicker = false"
            @confirm="modeConfirm"
            :item-height="35"
            :default-index="defaultIndex1"
          />
        </van-popup>
        <div class="currentTime" @click="fn1(nowzc, undefined)">今</div>
      </div>
    </div>
    <div class="timetable_list">
      <div class="period">
        <div>{{ this.weekday }}<br />月</div>
        <ul>
          <li v-for="(item, index) in nodeList" :key="index">
            {{ item.nodeNumber }}
          </li>
        </ul>
      </div>
      <div class="table-right">
        <div class="week-nav">
          <ul>
            <li
              :style="
                curDay == '星期' + item.xqmc && nowzc == item.zc
                  ? 'background-color:#12DDD6'
                  : ''
              "
              v-for="(item, index) in dateWeekList"
              :key="index"
            >
              <span>周{{ item.xqmc }}</span>
              <p>{{ dateSub(item.mxrq) }}</p>
            </li>
          </ul>
        </div>
        <div class="course-content">
          <!-- 周日 -->
          <div class="course-form" id="Sunday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in SundayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 0)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
          <!-- 周一 -->
          <div class="course-form" id="monday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in mondayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 1)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
          <!-- 周二 -->
          <div class="course-form" id="Tuesday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in TuesdayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 0)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
          <!-- 周三 -->
          <div class="course-form" id="Wednesday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in WednesdayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 1)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
          <!-- 周四 -->
          <div class="course-form" id="Thursday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in ThursdayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 0)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
          <!-- 周五 -->
          <div class="course-form" id="Friday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in FridayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 1)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
          <!-- 周六 -->
          <div class="course-form" id="Saturday">
            <ul class="myul">
              <li
                ref="ranText"
                @click="courseDetail(item)"
                v-for="(item, index) in SaturdayList"
                :key="'info-' + index"
                :style="
                  item.courseName
                    ? 'top:' +
                      calcOpt(item.weekNoteDetail, 0) +
                      'height:' +
                      calcOpt(item.weekNoteDetail, 1) +
                      'background-color:' +
                      calcColor(index, 0)
                    : ''
                "
              >
                <span v-show="item.courseName"
                  >{{ item.courseName }} - {{ item.teacherName }} @
                  {{ item.classroomName }}</span
                >
                <span v-show="!item.courseName"></span>
                <p
                  v-if="item.buttonCode != 0"
                  v-text="item.buttonCode == 2 ? '进入课堂' : '创建课堂'"
                ></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="popShow" class="popup">
      <h2>
        {{ this.popList.courseName
        }}<i class="close-pop" @click="popShow = false"></i>
      </h2>
      <p>
        时间：<span
          >{{ this.infoWeek }}（{{ this.popList.startTime }}-{{
            this.popList.endTIme
          }}）</span
        >
      </p>
      <p>
        地点：<span>{{ this.popList.classroomName }}</span>
      </p>
      <p>
        教师：<span>{{ this.popList.teacherName }}</span>
      </p>
      <p v-if="this.popList.meetingData">
        课堂号：<span>{{ this.popList.meetingData.meetingNumber }}</span>
      </p>
      <p v-if="this.popList.meetingData">
        主持课堂密码：<span>{{
          this.popList.meetingData.controlPassword
        }}</span>
      </p>
      <p v-if="this.popList.meetingData">
        课堂密码：<span>{{ this.popList.meetingData.password }}</span>
      </p>
      <!-- <p v-if="this.popList.buttonCode == 2" class="link-item">课堂链接：<span>{{this.popList.meetingData.shareUrl ? this.popList.meetingData.shareUrl : '暂未开设云课堂'}}</span></p> -->
      <button @click="checkLive(popList)">
        {{
          this.popList.buttonCode == "1"
            ? "创建课堂"
            : this.popList.buttonCode == "0"
            ? "确定"
            : "进入课堂"
        }}
      </button>
    </van-popup>
  </div>
</template>

<script>
// // import Header from '../header.vue'
import { Toast } from "vant";
import { Api } from "../../../utils/axios";
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem("casLogin"),
      isAllow: "",
      timetable: [],
      random: "",
      random1: "",
      random2: "",
      random3: "",
      random4: "",
      random5: "",
      random6: "",
      infoWeek: "",
      popShow: false,
      popList: [],

      defaultIndex: 0,
      defaultIndex1: 0,
      curWeek: "",
      timeMode: "",
      showPicker: false,
      modePicker: false,
      modeColumns: [],
      modeIdColumns: [],
      timeModeId: "",
      columns: [
        {
          values: [],
          className: "column1",
        },
      ],
      zcList: [],
      zc: "",
      nowzc: "",
      curDay: "",
      allCourseList: [],
      mondayList: [],
      TuesdayList: [],
      WednesdayList: [],
      ThursdayList: [],
      FridayList: [],
      SaturdayList: [],
      SundayList: [],
      nodeList: [],
      weekday: "",
      isShow: true,
      arr1: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr2: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr3: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr4: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr5: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr11: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr13: [
        { a: "01" },
        { a: "02" },
        { a: "03" },
        { a: "04" },
        { a: "05" },
        { a: "06" },
        { a: "07" },
        { a: "08" },
        { a: "09" },
        { a: "10" },
        { a: "11" },
        { a: "12" },
      ],
      arr6: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      arr7: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      arr8: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      arr9: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      arr10: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      arr12: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      arr14: [
        { a: "02" },
        { a: "04" },
        { a: "06" },
        { a: "08" },
        { a: "10" },
        { a: "12" },
      ],
      dateWeekList: [],
      colorList: ["#FF8282", "#EE7BFF", "#FFBB79", "#FF87B3", "#86B5FF"],
      colorList1: [
        "rgba(118,107,255,.7)",
        "#757DA3",
        "rgba(255,84,147,.4)",
        "#B3B9D0",
        "rgba(95,222,255,.7)",
      ],
      updateUrl: "",
      change: true,
    };
  },
  methods: {
    calcColor(index, type) {
      // let num = parseInt(Math.random()*5)
      let num = Math.abs(index - 2);
      let num1 = Math.abs(index - 4);
      if (this.change) {
        if (type == 0) {
          return this.colorList[num];
        } else {
          return this.colorList1[num1];
        }
      }
    },
    modeConfirm(val, index) {
      this.modePicker = false;
      this.timeMode = val;
      this.timeModeId = this.modeIdColumns[index];
      this.fn1(this.zc, this.modeIdColumns[index]);
    },
    async timeModeTap() {
      const res = await Api.getTimeMode();
      if (res.data.length > 0) {
        res.data.forEach((item, index) => {
          if (item.mrms == 1) {
            this.timeMode = item.kbjcmsmc;
            this.defaultIndex1 = index;
            this.timeModeId = item.kbjcmsid;
          }
          this.modeColumns.push(item.kbjcmsmc);
          this.modeIdColumns.push(item.kbjcmsid);
        });
      }
    },
    async checkLive(e) {
      this.popShow = false;
      if (e.buttonCode == 2) {
        if (this.isAllow) {
          window.location.href = this.updateUrl;
        } else {
          Toast.fail("该门课程暂未开设云课堂");
        }
      } else if (e.buttonCode == 1) {
        const params = {
          coursePlanId: e.coursePlanId,
          courseName: e.courseName,
          startTime: e.startTime,
          endTIme: e.endTIme,
          peopleNumber: e.peopleNumber,
        };
        const res = await Api.teachCreatMeetingV2(params);
        if (res.code == "0") {
          Toast.fail(res.Msg);
        } else {
          Toast.success(res.Msg);
          this.loadClass();
        }
      }
    },
    async courseDetail(info) {
      this.change = false;
      switch (info.weekDay) {
        case "1":
          this.infoWeek = "周一";
          break;
        case "2":
          this.infoWeek = "周二";
          break;
        case "3":
          this.infoWeek = "周三";
          break;
        case "4":
          this.infoWeek = "周四";
          break;
        case "5":
          this.infoWeek = "周五";
          break;
        case "6":
          this.infoWeek = "周六";
          break;
        case "7":
          this.infoWeek = "周日";
          break;
        default:
          break;
      }
      this.popShow = true;
      this.popList = info;
      this.infoWeek = this.infoWeek + "，" + this.popList.weekNoteDetail;
      const params = {
        coursePlanId: info.coursePlanId,
      };
      const res = await Api.isYxMeetingV2Api(params);
      this.isAllow = res.data.result;
      if (res.data.result) {
        this.updateUrl = res.data.meetingData.shareUrl;
        this.popList.meetingData = res.data.meetingData;
      }
    },
    dateSub(res) {
      return Number(res.substr(-2, 2));
    },
    calcOpt(val, type) {
      let num = Number(val.substr(1, 2)) - 1;
      //top
      if (type == 0) {
        return num * 70 + "px;";
        //height
      } else {
        if (val.length == 11) {
          return 209 + "px;";
        } else if (val.length == 3) {
          return 69 + "px;";
        } else if (val.length == 15) {
          return 279 + "px;";
        } else if (val.length == 7) {
          return 139 + "px;";
        }
      }
    },
    async onConfirm(value, index) {
      this.change = true;
      this.allCourseList = [];
      this.mondayList = [];
      this.TuesdayList = [];
      this.WednesdayList = [];
      this.ThursdayList = [];
      this.FridayList = [];
      this.SaturdayList = [];
      this.SundayList = [];

      let mondayList = [];
      let TuesdayList = [];
      let WednesdayList = [];
      let ThursdayList = [];
      let FridayList = [];
      let SaturdayList = [];
      let SundayList = [];
      this.curWeek = value.toString();

      this.zc = this.zcList[index];
      this.showPicker = false;
      const params = {
        week: this.zc,
        kbjcmsid: this.timeModeId,
      };
      const res = await Api.teachCourseSchedule(params);
      if (res.data.length == 0) {
        Toast.fail(res.Msg);
      } else {
        if (res.data[0].courses.length == 0) {
          Toast.fail(res.Msg);
        }
        this.dateWeekList = res.data[0].date;
        this.nodeList = res.data[0].nodes;
        this.weekday = Number(res.data[0].date[0].mxrq.substr(5, 2));
        this.curDay = res.data[0].topInfo[0].weekday;
        this.allCourseList = res.data[0].courses;
        for (var i in this.allCourseList) {
          //周一
          if (this.allCourseList[i].weekDay == "1") {
            mondayList.push(this.allCourseList[i]);
          }
          //周二
          if (this.allCourseList[i].weekDay == "2") {
            TuesdayList.push(this.allCourseList[i]);
          }
          //周三
          if (this.allCourseList[i].weekDay == "3") {
            WednesdayList.push(this.allCourseList[i]);
          }
          //周四
          if (this.allCourseList[i].weekDay == "4") {
            ThursdayList.push(this.allCourseList[i]);
          }
          //周五
          if (this.allCourseList[i].weekDay == "5") {
            FridayList.push(this.allCourseList[i]);
          }
          //周六
          if (this.allCourseList[i].weekDay == "6") {
            SaturdayList.push(this.allCourseList[i]);
          }
          //周日
          if (this.allCourseList[i].weekDay == "7") {
            SundayList.push(this.allCourseList[i]);
          }
        }
        let calStart = res.data[0].date[0].xqmc;
        if (calStart == "日") {
          this.mondayList = mondayList;
          this.TuesdayList = TuesdayList;
          this.WednesdayList = WednesdayList;
          this.ThursdayList = ThursdayList;
          this.FridayList = FridayList;
          this.SaturdayList = SaturdayList;
          this.SundayList = SundayList;
        } else if (calStart == "一") {
          this.mondayList = TuesdayList;
          this.TuesdayList = WednesdayList;
          this.WednesdayList = ThursdayList;
          this.ThursdayList = FridayList;
          this.FridayList = SaturdayList;
          this.SaturdayList = SundayList;
          this.SundayList = mondayList;
        } else if (calStart == "二") {
          this.mondayList = WednesdayList;
          this.TuesdayList = ThursdayList;
          this.WednesdayList = FridayList;
          this.ThursdayList = SaturdayList;
          this.FridayList = SundayList;
          this.SaturdayList = mondayList;
          this.SundayList = TuesdayList;
        } else if (calStart == "三") {
          this.mondayList = ThursdayList;
          this.TuesdayList = FridayList;
          this.WednesdayList = SaturdayList;
          this.ThursdayList = SundayList;
          this.FridayList = mondayList;
          this.SaturdayList = TuesdayList;
          this.SundayList = WednesdayList;
        } else if (calStart == "四") {
          this.mondayList = FridayList;
          this.TuesdayList = SaturdayList;
          this.WednesdayList = SundayList;
          this.ThursdayList = mondayList;
          this.FridayList = TuesdayList;
          this.SaturdayList = WednesdayList;
          this.SundayList = ThursdayList;
        } else if (calStart == "五") {
          this.mondayList = SaturdayList;
          this.TuesdayList = SundayList;
          this.WednesdayList = mondayList;
          this.ThursdayList = TuesdayList;
          this.FridayList = WednesdayList;
          this.SaturdayList = ThursdayList;
          this.SundayList = FridayList;
        } else if (calStart == "六") {
          this.mondayList = SundayList;
          this.TuesdayList = mondayList;
          this.WednesdayList = TuesdayList;
          this.ThursdayList = WednesdayList;
          this.FridayList = ThursdayList;
          this.SaturdayList = FridayList;
          this.SundayList = SaturdayList;
        }
      }
    },
    async fn1(val, e) {
      this.allCourseList = [];
      this.mondayList = [];
      this.TuesdayList = [];
      this.WednesdayList = [];
      this.ThursdayList = [];
      this.FridayList = [];
      this.SaturdayList = [];
      this.SundayList = [];

      let mondayList = [];
      let TuesdayList = [];
      let WednesdayList = [];
      let ThursdayList = [];
      let FridayList = [];
      let SaturdayList = [];
      let SundayList = [];
      const params = {
        week: val,
        kbjcmsid: e ? e : "",
      };
      const res = await Api.teachCourseSchedule(params);
      if (res.data.length == 0) {
        Toast.fail(res.Msg);
        return;
      } else {
        if (res.data[0].courses && res.data[0].courses.length == 0) {
          Toast.fail(res.Msg);
          return;
        }
      }
      this.nodeList = res.data[0].nodes;
      this.curWeek = "第" + val + "周";
      this.weekday = res.data[0].topInfo[0].today.slice(5, 7);
      this.curDay = res.data[0].topInfo[0].weekday;
      this.allCourseList = res.data[0].courses;
      this.dateWeekList = res.data[0].date;
      for (var i in this.allCourseList) {
        //周一
        if (this.allCourseList[i].weekDay == "1") {
          mondayList.push(this.allCourseList[i]);
        }
        //周二
        if (this.allCourseList[i].weekDay == "2") {
          TuesdayList.push(this.allCourseList[i]);
        }
        //周三
        if (this.allCourseList[i].weekDay == "3") {
          WednesdayList.push(this.allCourseList[i]);
        }
        //周四
        if (this.allCourseList[i].weekDay == "4") {
          ThursdayList.push(this.allCourseList[i]);
        }
        //周五
        if (this.allCourseList[i].weekDay == "5") {
          FridayList.push(this.allCourseList[i]);
        }
        //周六
        if (this.allCourseList[i].weekDay == "6") {
          SaturdayList.push(this.allCourseList[i]);
        }
        //周日
        if (this.allCourseList[i].weekDay == "7") {
          SundayList.push(this.allCourseList[i]);
        }
      }
      let calStart = res.data[0].date[0].xqmc;
      if (calStart == "日") {
        this.mondayList = mondayList;
        this.TuesdayList = TuesdayList;
        this.WednesdayList = WednesdayList;
        this.ThursdayList = ThursdayList;
        this.FridayList = FridayList;
        this.SaturdayList = SaturdayList;
        this.SundayList = SundayList;
      } else if (calStart == "一") {
        this.mondayList = TuesdayList;
        this.TuesdayList = WednesdayList;
        this.WednesdayList = ThursdayList;
        this.ThursdayList = FridayList;
        this.FridayList = SaturdayList;
        this.SaturdayList = SundayList;
        this.SundayList = mondayList;
      } else if (calStart == "二") {
        this.mondayList = WednesdayList;
        this.TuesdayList = ThursdayList;
        this.WednesdayList = FridayList;
        this.ThursdayList = SaturdayList;
        this.FridayList = SundayList;
        this.SaturdayList = mondayList;
        this.SundayList = TuesdayList;
      } else if (calStart == "三") {
        this.mondayList = ThursdayList;
        this.TuesdayList = FridayList;
        this.WednesdayList = SaturdayList;
        this.ThursdayList = SundayList;
        this.FridayList = mondayList;
        this.SaturdayList = TuesdayList;
        this.SundayList = WednesdayList;
      } else if (calStart == "四") {
        this.mondayList = FridayList;
        this.TuesdayList = SaturdayList;
        this.WednesdayList = SundayList;
        this.ThursdayList = mondayList;
        this.FridayList = TuesdayList;
        this.SaturdayList = WednesdayList;
        this.SundayList = ThursdayList;
      } else if (calStart == "五") {
        this.mondayList = SaturdayList;
        this.TuesdayList = SundayList;
        this.WednesdayList = mondayList;
        this.ThursdayList = TuesdayList;
        this.FridayList = WednesdayList;
        this.SaturdayList = ThursdayList;
        this.SundayList = FridayList;
      } else if (calStart == "六") {
        this.mondayList = SundayList;
        this.TuesdayList = mondayList;
        this.WednesdayList = TuesdayList;
        this.ThursdayList = WednesdayList;
        this.FridayList = ThursdayList;
        this.SaturdayList = FridayList;
        this.SundayList = SaturdayList;
      }
    },
    classList2(arr, newArr) {
      for (let i in arr) {
        let abc = arr[i];
        for (let n in newArr) {
          if (newArr[n].a == abc.weekNoteDetail.slice(-2)) {
            newArr[n] = abc;
          }
        }
      }
      return newArr;
    },
    async loadClass() {
      const params = {
        week: "",
      };
      const res = await Api.teachCourseSchedule(params);
      if (res.data.length == 0) {
        Toast.fail(res.Msg);
        if (res.code == "0") {
          Toast.fail(res.Msg);
          setTimeout(() => {
            // this.$router.replace('/homeIndex')
          }, 2000);
        }
      } else {
        if (res.data[0].courses.length == 0) {
          Toast.fail(res.Msg);
        }
        this.nodeList = res.data[0].nodes;
        this.curWeek = "第" + res.data[0].topInfo[0].week + "周";
        this.nowzc = res.data[0].topInfo[0].week;
        this.defaultIndex = Number(res.data[0].topInfo[0].week) - 1;
        this.weekday = res.data[0].topInfo[0].today.slice(5, 7);
        this.curDay = res.data[0].topInfo[0].weekday;
        this.allCourseList = res.data[0].courses;
        this.dateWeekList = res.data[0].date;

        let mondayList = [];
        let TuesdayList = [];
        let WednesdayList = [];
        let ThursdayList = [];
        let FridayList = [];
        let SaturdayList = [];
        let SundayList = [];
        for (var i in this.allCourseList) {
          //周一
          if (this.allCourseList[i].weekDay == "1") {
            mondayList.push(this.allCourseList[i]);
          }
          //周二
          if (this.allCourseList[i].weekDay == "2") {
            TuesdayList.push(this.allCourseList[i]);
          }
          //周三
          if (this.allCourseList[i].weekDay == "3") {
            WednesdayList.push(this.allCourseList[i]);
          }
          //周四
          if (this.allCourseList[i].weekDay == "4") {
            ThursdayList.push(this.allCourseList[i]);
          }
          //周五
          if (this.allCourseList[i].weekDay == "5") {
            FridayList.push(this.allCourseList[i]);
          }
          //周六
          if (this.allCourseList[i].weekDay == "6") {
            SaturdayList.push(this.allCourseList[i]);
          }
          //周日
          if (this.allCourseList[i].weekDay == "7") {
            SundayList.push(this.allCourseList[i]);
          }
        }
        let calStart = res.data[0].date[0].xqmc;
        if (calStart == "日") {
          this.mondayList = mondayList;
          this.TuesdayList = TuesdayList;
          this.WednesdayList = WednesdayList;
          this.ThursdayList = ThursdayList;
          this.FridayList = FridayList;
          this.SaturdayList = SaturdayList;
          this.SundayList = SundayList;
        } else if (calStart == "一") {
          this.mondayList = TuesdayList;
          this.TuesdayList = WednesdayList;
          this.WednesdayList = ThursdayList;
          this.ThursdayList = FridayList;
          this.FridayList = SaturdayList;
          this.SaturdayList = SundayList;
          this.SundayList = mondayList;
        } else if (calStart == "二") {
          this.mondayList = WednesdayList;
          this.TuesdayList = ThursdayList;
          this.WednesdayList = FridayList;
          this.ThursdayList = SaturdayList;
          this.FridayList = SundayList;
          this.SaturdayList = mondayList;
          this.SundayList = TuesdayList;
        } else if (calStart == "三") {
          this.mondayList = ThursdayList;
          this.TuesdayList = FridayList;
          this.WednesdayList = SaturdayList;
          this.ThursdayList = SundayList;
          this.FridayList = mondayList;
          this.SaturdayList = TuesdayList;
          this.SundayList = WednesdayList;
        } else if (calStart == "四") {
          this.mondayList = FridayList;
          this.TuesdayList = SaturdayList;
          this.WednesdayList = SundayList;
          this.ThursdayList = mondayList;
          this.FridayList = TuesdayList;
          this.SaturdayList = WednesdayList;
          this.SundayList = ThursdayList;
        } else if (calStart == "五") {
          this.mondayList = SaturdayList;
          this.TuesdayList = SundayList;
          this.WednesdayList = mondayList;
          this.ThursdayList = TuesdayList;
          this.FridayList = WednesdayList;
          this.SaturdayList = ThursdayList;
          this.SundayList = FridayList;
        } else if (calStart == "六") {
          this.mondayList = SundayList;
          this.TuesdayList = mondayList;
          this.WednesdayList = TuesdayList;
          this.ThursdayList = WednesdayList;
          this.FridayList = ThursdayList;
          this.SaturdayList = FridayList;
          this.SundayList = SaturdayList;
        }
      }
    },
    classList3(arr, newArr) {
      for (let i in arr) {
        let abc = arr[i];
        let Num;
        for (let n in newArr) {
          if (abc.weekNoteDetail.length == "3") {
            Num = abc.weekNoteDetail.slice(-2);
            if (newArr[n].a == Num) {
              newArr[n] = abc;
            }
          }
        }
      }
      return newArr;
    },
    async getWeek() {
      let concatList1 = [];
      let concatList2 = [];
      const params = {
        semester: "",
      };
      const res = await Api.getTeachingWeek(params);
      for (let i = 0; i < res.data.length; i++) {
        concatList1 = concatList1.concat("第" + res.data[i].week + "周");
        concatList2 = concatList2.concat(res.data[i].week);
      }
      this.columns[0].values = concatList1;
      this.zcList = concatList2;
    },
  },
  created() {
    this.loadClass();
    //教学周次
    this.getWeek();
    this.timeModeTap();
  },
  mounted() {
    setTimeout(() => {
      if (this.$refs.ranText) {
        for (let i = 0; i < this.$refs.ranText.length; i++) {
          if (
            this.$refs.ranText[i].children &&
            this.$refs.ranText[i].children.length == 3
          ) {
            this.$refs.ranText[i].children[2].style.color = this.$refs.ranText[
              i
            ].style.backgroundColor;
          }
        }
      }
    }, 250);
  },
};
</script>

<style lang="less" scoped>
.timetable1 .link-item {
  text-decoration: underline;
  word-break: break-all;
}
.timetable1 .popup i.close-pop {
  background: url(../../../../static/img/close.png) no-repeat center;
  position: absolute;
  right: 0;
  top: -10px;
  background-size: 20px 20px;
  width: 20px;
  height: 20px;
  padding: 10px;
}
.timetable1 .van-picker__columns::before {
  width: 140px;
  height: 1px;
  background-color: @attendance-background-color-2;
  content: "";
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
}
.timetable1 .van-picker__columns::after {
  width: 140px;
  height: 1px;
  background-color: @attendance-background-color-2;
  content: "";
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
}
.timetable1 .van-popup.van-popup--center {
  box-sizing: border-box;
  padding: 20px;
  width: 90%;
  border-radius: 5px;
}
.timetable1 .van-popup.van-popup--center > h2 {
  color: @attendance-color-1;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
}
.timetable1 .van-popup.van-popup--center > div {
  color: @attendance-background-color-1;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.timetable1 .van-popup.van-popup--center > p {
  color: @attendance-color-2;
  font-size: 16px;
  line-height: 30px;
}
.timetable1 .popup button {
  background-color: @attendance-background-color-7;
  color: @attendance-background-color-1;
  padding: 11px 0;
  border-radius: 3px;
  width: 100%;
  margin-top: 50px;
}
.timetable1 .van-popup.van-popup--center > p > span {
  font-weight: bold;
}
.timetable1 .timetable_top1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: @attendance-background-color-1;
  padding: 10px 15px;
}
.timetable1 .timetable_top1 select {
  color: @attendance-color-3;
  border: 0;
  background: none;
  outline: none;
}
.timetable1 .timetable_top1 .currentTime {
  width: 25px;
  height: 25px;
  line-height: 25px;
  color: @attendance-color-3;
  font-size: 14px;
  text-align: center;
  border-radius: 50%;
  background: @attendance-background-color-8;
}
.timetable1 .timetable_list {
  display: flex;
  background-color: @attendance-background-color-6;
}
.timetable1 .timetable_list .period > div {
  border: 1px solid @attendance-border-color-5;
  border-bottom: 0;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  box-shadow: 1px 1px 4px 0px rgba(62, 53, 167, 0.26);
  background: @attendance-border-color-5;
  color: @attendance-color-3;
  box-shadow: 1px 1px 4px 0px rgba(62, 53, 167, 0.26);
  height: 60px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timetable1 .timetable_list .period ul li {
  height: 70px;
  text-align: center;
  line-height: 70px;
}
.timetable1 .el-tabs__nav .is-top {
  background: @attendance-border-color-5;
  color: @attendance-color-3;
}
.timetable1 .table_list ul li {
  width: 62px;
  height: 115px;
  background: @attendance-background-color-9;
  color: @attendance-color-3;
  box-sizing: border-box;
  padding: 5px;
  font-size: 12px;
  border-radius: 2px;
}
.timetable1 .timetable_top1 .van-cell {
  background-color: @attendance-background-color-1;
  color: @attendance-color-3;
  padding: 0;
  width: 15%;
}
.timetable1 .timetable_top1 .van-field__body .van-field__control {
  color: @attendance-color-3 !important;
}
.timetable1 .timetable_top1 .van-cell:not(:last-child)::after {
  border-bottom: 0;
}
.timetable1 .week-arrow {
  background: url(../../../../static/img/week.png) no-repeat center;
  width: 7px;
  height: 4px;
  background-size: 7px 4px;
  position: absolute;
  left: 70px;
}
.timetable1
  .timetable1
  .timetable_top1
  .van-ellipsis.van-picker-column__item.van-picker-column__item--selected {
  color: @attendance-color-1;
  font-weight: 600;
}
.timetable1 .table-right {
  flex: 1;
  overflow-x: scroll;
}
.timetable1 .table-right .week-nav ul li {
  flex-direction: column;
  height: 60px;
  background-color: @attendance-border-color-5;
  color: @attendance-color-3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}
.timetable1 .table-right .week-nav ul li > p {
  font-size: 14px;
  margin-top: 3px;
}
.timetable1 .table-right .week-nav ul {
  display: flex;
  border-bottom: 1px solid @attendance-color-3;
  min-width: 435px;
  max-width: 100%;
}
.timetable1 .el-tabs__nav {
  width: 100%;
}
.timetable1 .period ul li {
  color: @attendance-color-2;
}
.timetable1 .course-content {
  display: flex;
  min-width: 435px;
  max-width: 100%;
}
.timetable1 .course-form {
  width: 15%;
  position: relative;
}
.timetable1 .course-form ul {
  display: flex;
  flex-direction: column;
}
.timetable1 .course-form .myul {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  border-right: 1px solid @attendance-color-3;
}
.timetable1 .course-form .myul li {
  overflow: hidden;
  width: calc(100% - 1px);
  position: relative;
  height: 139px;
  color: @attendance-color-3;
  font-size: 12px;
  padding: 8px 4px;
  margin-bottom: 1px;
  border-radius: 4px;
  position: absolute;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* -webkit-line-clamp: 8; */
  box-sizing: border-box;
  margin-right: 1px;
}
.timetable1 .course-form .myul li > p {
  border-radius: 9px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  text-align: center;
  padding: 2px 0;
  position: absolute;
  bottom: 4px;
  left: 2px;
  width: calc(100% - 4px);
  box-sizing: border-box;
  line-height: 14px;
}
.timetable1 .pos_item {
  position: absolute;
  top: 0;
  left: -9px;
}
.timetable1 .pos_item li {
  width: 58px;
  height: 65px;
  color: @attendance-color-3;
  margin-bottom: 1px;
  border-radius: 4px 4px 4px 4px;
  font-size: 12px;
  padding: 4px;
}
/* 时间模式 */
.time-right {
  display: flex;
  justify-content: flex-end;
  position: relative;
}
.time-right .van-cell {
  width: calc(80% - 25px) !important;
}
.time-right .van-field__control {
  text-align: right;
  padding-right: 25px;
}
.time-right i.week-arrow {
  right: 35px;
  left: unset;
  height: 100%;
}
</style>

// WEBPACK FOOTER // // src/components/teacher/Class/surfaces.vue
