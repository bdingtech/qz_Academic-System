<template>
  <div class="refer">
    <Header title='空闲教室查询'></Header>
    <div class="refer_container">
      <ul class="refer_top">
        <li @click="timePicker = true">{{date}}</li>
        <li @click="showPicker = true">{{time !== undefined ? timeText : start + '-' + end + '小节'}}</li>
        <li v-if="freeCampus != ''" @click="areaPicker = true">{{freeCampus}}</li>
        <li v-if="freeBuilding != ''" @click="buildPicker = true">{{freeBuilding}}</li>
        <li v-if="typeCode != ''" @click="buildTypePicker = true">{{typeCodeName}}</li>
      </ul>
      <h3 style="color: #212F6E;font-size: 18px;margin-top: 20px;">搜索结果</h3>
      <NOdata title="暂无空闲教室~" v-if="classroomList.length == 0 && isLoad"></NOdata>
      <template v-else>
        <div v-for="(item,index) in classroomList" :key="index" style="margin-bottom:30px;">
          <template v-for="cItem in item.classroomList">
            <div class="refer_result" :key="cItem.classroomId">
              <h3>{{item.teachingBuildingName}} {{cItem.classroomname}} {{cItem.classroomnumber}}</h3>
              <p>容量:{{cItem.seatnumber}}人</p>
            </div>
          </template>
        </div>
      </template>
    </div>
    <!-- 日期 -->
    <van-popup v-model="timePicker" position="bottom" class="date-pick-item">
      <van-datetime-picker show-toolbar v-model="currentDate" type="date" :min-date="startDate" :max-date="endDate"
        @cancel="timePicker = false" @confirm="timeConfirm" :item-height="itemHeight" />
    </van-popup>
    <!-- 节次 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="itemHeight" />
    </van-popup>
    <!-- 校区 -->
    <van-popup v-model="areaPicker" position="bottom">
      <van-picker show-toolbar :columns="campusList" @cancel="areaPicker = false" @confirm="areaSelect" :item-height="itemHeight" />
    </van-popup>
    <!-- 教学楼 -->
    <van-popup v-model="buildPicker" position="bottom">
      <van-picker show-toolbar :columns="buildingList" @cancel="buildPicker = false" @confirm="buildSelect"
        :item-height="itemHeight" />
    </van-popup>
    <!-- 教室类型 -->
    <van-popup v-model="buildTypePicker" position="bottom">
      <van-picker show-toolbar :columns="buildTypeList" @cancel="buildTypePicker = false" @confirm="buildTypeSelect"
        :item-height="itemHeight" />
    </van-popup>
  </div>
</template>
<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import {
    Api
  } from '../../../utils/axios'
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        classroomList: [],
        currentDate: new Date(),
        startDate: new Date(),
        endDate: '',
        //上一页面筛选条件
        time: '',
        timeText: '',
        date: '',
        start: '',
        end: '',
        build: '',
        campus: '',
        itemHeight: 35,
        freeCampus: '',
        freeBuilding: '',
        timePicker: false,
        showPicker: false,
        areaPicker: false,
        buildPicker: false,
        buildTypePicker: false,
        typeCode: '',
        typeCodeName: '',
        buildTypeList: [],
        campusList: [{
          values: [],
        }],
        buildingList: [{
          values: [],
        }],
        //节次
        columns: [{
            values: [],
            className: 'column1'
          },
          {
            values: [],
            className: 'column2',
            defaultIndex: 1
          }
        ],
        buildIdList: [],
        campusIdList: [],
        isLoad: false,
        typeCodeList: []
      }
    },
    methods: {
      buildTypeSelect(val, index) {
        this.buildTypePicker = false
        if (val == "全部") {
          this.typeCodeName = ""
          this.typeCode = ""
        } else {
          this.typeCodeName = val
          this.typeCode = this.typeCodeList[index - 1]
        }
        this.researchRoom()
      },
      async getType() {
        const params = {
          table: 'zzdjslx'
        }
        const res = await Api.getRoomType(params)
        this.buildTypeList.push("全部")
        res.data.forEach(item => {
          this.buildTypeList.push(item.dmmc)
          this.typeCodeList.push(item.dm)
          if (this.$route.query.rType != '') {
            if (this.$route.query.rType == item.dm) {
              this.typeCodeName = item.dmmc
            }
          }
        });
      },
      async researchRoom() {
        let type = this.$route.query.type
        let params = {}
        if (type == 0) {
          params = {
            'date': this.date,
            'nodeId': this.start + this.end,
            'buildingId': this.build,
            'campusId': this.campus,
            'jslx': this.typeCode
          }
        } else {
          params = {
            'date': this.date,
            'nodeId': this.time,
            'buildingId': this.build,
            'campusId': this.campus,
          }
        }
        const res = await Api.getIdleClassroom(params)
        this.classroomList = res.data
        this.isLoad = true
        if (res.data.length == 0) {
          Toast('未查询到空闲教室~')
        }
      },
      buildSelect(item, index) {
        this.buildPicker = false;
        this.freeBuilding = item.toString();
        this.build = this.buildIdList[index]
        this.researchRoom()
      },
      areaSelect(item, index) {
        this.areaPicker = false;
        this.freeCampus = item.toString();
        this.campus = this.campusIdList[index]
        this.researchRoom()
      },
      onConfirm(value) {
        let begin = Number(value[0].substr(1, value[0].length - 3));
        let over = Number(value[1].substr(1, value[0].length - 3));
        if (begin > over) {
          Toast.fail('开始节次不能大于结束节次')
        } else {
          this.showPicker = false;
          this.start = value[0].substr(1, value[0].length - 3);
          this.end = value[1].substr(1, value[0].length - 3);
          this.timeText = this.start + '-' + this.end + '小节';
          this.researchRoom()
        }
      },
      timeConfirm(res) {
        this.date = res.getFullYear() + '-' + (res.getMonth() + 1) + '-' + res.getDate()
        this.timePicker = false;
        this.researchRoom()
      },
      async getMinMaxDate() {
        const res = await Api.getGgjxzlDate()
        this.endDate = res.data[0].endDate;
        let end = this.endDate.match(/\d?(.\d+)/ig);
        this.endDate = new Date(end[0] + ',' + Number(end[1].substr(1, end[1].length)) + ',' + Number(end[2].substr(1,
          end[1].length)));
        if (this.endDate < new Date()) {
          this.startDate = this.endDate
        }
      },
      async getNode() {
        const res = await Api.getNodeList()
        let concatList = []
        for (let i = 0; i < res.data.length; i++) {
          concatList = concatList.concat("第" + res.data[i].nodeName + "小节")
          this.columns[0].values = concatList
          this.columns[1].values = concatList
        }
      },
      async getCampus() {
        const res = await Api.getCampusList()
        let concatList1 = []
        let concatList_1 = []
        res.data.forEach((item, index) => {
          concatList1[0] = '全部'
          concatList_1[0] = ''
          concatList1[index + 1] = item.campusName
          concatList_1[index + 1] = item.campusId
        });
        this.campusIdList = concatList_1
        this.campusList = concatList1
      },
      async getBuild() {
        let concatList2 = []
        let concatList_2 = []
        const res = await Api.getTchBuildingList()
        res.data.forEach((item, index) => {
          concatList2[0] = '全部'
          concatList_2[0] = ''
          concatList2[index + 1] = item.buildingName,
            concatList_2[index + 1] = item.buildingId
        });
        this.buildingList = concatList2
        this.buildIdList = concatList_2
      },
    },
    created() {
      this.time = this.$route.query.time
      this.timeText = this.$route.query.timeText
      this.date = this.$route.query.date
      this.start = this.$route.query.start
      this.end = this.$route.query.end
      this.build = this.$route.query.build
      this.campus = this.$route.query.campus
      this.typeCode = this.$route.query.rType
      this.freeBuilding = this.$route.query.bName
      this.freeCampus = this.$route.query.cName
      this.getMinMaxDate()
      this.researchRoom()
      //节次列表（下拉框）
      this.getNode()
      //校区列表
      this.getCampus()
      //教学楼列表
      this.getBuild()
      // 教室类型
      this.getType()
    },
  }
</script>

<style lang="less" scoped >
  .refer .refer_container {
    box-sizing: border-box;
    padding: 20px 15px;
  }

  .refer .refer_top {
    overflow: hidden;
  }

  .refer_result h3 {
    color: @attendance-color-1;
    font-size: 16px;
  }

  .refer .refer_top li {
    float: left;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    background: @attendance-background-color-7;
    color: @attendance-background-color-1;
    border-radius: 3px;
    margin-right: 15px;
    margin-bottom: 25px;
  }

  .refer .refer_result {
    background: rgba(248, 248, 248, 1);
    border-radius: 5px;
    padding: 18px 20px;
    line-height: 22px;
    margin-top: 25px;
  }

  .refer .refer_result p {
    font-size: 12px;
    color: @attendance-color-2;
    line-height: 17px;
    margin-top: 5px;
  }

  .refer .van-ellipsis.van-picker-column__item.van-picker-column__item--selected {
    color: @attendance-color-1;
    font-weight: 600;
  }

  .refer .date-pick-item.van-popup.van-popup--bottom .van-picker-column {
    position: relative;
    color: @attendance-color-1;
  }

  .refer .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column:first-child::after {
    position: absolute;
    content: "年";
    width: auto;
    height: auto;
    top: 50%;
    right: 10px;
    z-index: 9;
    transform: translate(-50%, -50%);
    font-weight: 600;
  }

  .refer .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column:nth-child(2)::after {
    position: absolute;
    content: "月";
    width: auto;
    height: auto;
    top: 50%;
    right: 10px;
    z-index: 9;
    transform: translate(-50%, -50%);
    font-weight: 600;
  }

  .refer .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column:nth-child(3)::after {
    position: absolute;
    content: "日";
    width: auto;
    height: auto;
    top: 50%;
    right: 10px;
    z-index: 9;
    transform: translate(-50%, -50%);
    font-weight: 600;
  }

  .refer .van-picker-column.column1::after {
    position: absolute;
    content: "到";
    width: auto;
    height: auto;
    top: 50%;
    left: 100%;
    z-index: 9;
    transform: translate(-50%, -50%);
    font-weight: 600;
    color: @attendance-color-1;
  }

  .refer .van-picker-column.column2::after {
    position: absolute;
    content: "到";
    width: auto;
    height: auto;
    top: 50%;
    left: 0%;
    z-index: 9;
    transform: translate(-50%, -50%);
    font-weight: 600;
    color: @attendance-color-1;
  }

  .refer .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column::before {
    position: absolute;
    content: "";
    width: 50px;
    height: 35px;
    top: 50%;
    left: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
    border-top: 1px solid @attendance-background-color-2;
    border-bottom: 1px solid @attendance-background-color-2;
  }

  .refer .van-popup.van-popup--bottom .van-picker .van-picker-column {
    position: relative;
  }

  .refer .van-popup.van-popup--bottom .van-picker .van-picker-column::before {
    position: absolute;
    content: "";
    width: 100px;
    height: 35px;
    top: 50%;
    left: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
    border-top: 1px solid @attendance-background-color-2;
    border-bottom: 1px solid @attendance-background-color-2;
  }
</style>



// WEBPACK FOOTER //
// src/components/student/Classroom/classroom_refer.vue