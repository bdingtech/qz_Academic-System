<template>
  <div>
    <Header title="空闲教室查询" :casLogin="casLogin"></Header>
    <div class="classroom">
      <ul class="pick_list">
        <li>
          <div class="flex_item"><i class="icon_classroom"></i><p>使用时间</p></div>
          <div class="pick-input">
            <input type="text" @click="timePicker = true" readonly v-model="date" placeholder="请选择(必选)">
            <i :class="date == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="timePicker" position="bottom" class="date-pick-item">
          <van-datetime-picker show-toolbar v-model="currentDate" type="date" :min-date="startDate" :max-date="endDate" @cancel="timePicker = false" @confirm="timeConfirm" :item-height="itemHeight" :swipe-duration="100"/>
        </van-popup>
        <li>
          <div class="flex_item"><i class="icon_classroom1"></i><p>起始节次</p></div>
          <div class="pick-input">
            <input type="text" @click="showPicker = true" readonly v-model="value" placeholder="请选择(必选)">
            <i :class="value == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="itemHeight"/>
        </van-popup>
        <li>
          <div class="flex_item"><i class="icon_classroom2"></i><p>校区</p></div>
          <div class="pick-input">
            <input type="text" @click="areaPicker = true" readonly v-model="value2" placeholder="非必选">
            <i :class="value2 == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="areaPicker" position="bottom">
          <van-picker show-toolbar :columns="campusList" @cancel="areaPicker = false" @confirm="areaSelect" :item-height="itemHeight"/>
        </van-popup>
        <li>
          <div class="flex_item"><i class="icon_classroom3"></i><p>教学楼</p></div>
          <div class="pick-input">
            <input type="text" @click="buildPicker = true" readonly v-model="value3" placeholder="非必选">
            <i :class="value3 == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="buildPicker" position="bottom">
          <van-picker show-toolbar :columns="buildingList" @cancel="buildPicker = false" @confirm="buildSelect" :item-height="itemHeight"/>
        </van-popup>
        <li>
          <div class="flex_item"><i class="icon_classroom4"></i><p>教室类型</p></div>
          <div class="pick-input">
            <input type="text" @click="buildTypePicker = true" readonly v-model="value4" placeholder="非必选">
            <i :class="value4 == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="buildTypePicker" position="bottom">
          <van-picker show-toolbar :columns="buildTypeList" @cancel="buildTypePicker = false" @confirm="buildTypeSelect" :item-height="itemHeight"/>
        </van-popup>
      </ul>
      <p class="kscx">快速查询</p>
      <ul class="kscx_menu">
        <li v-for="(item,index) in quickTime" :key="index" @click="pickQuik(item.code,item.time)">{{item.time}}</li>
      </ul>
      <div class="inquire">
        <button class="inquire_btn" @click="Inquire()">查询</button>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import { Toast } from 'vant';
  import { Api } from '../../../utils/axios'
  export default {
    data() {
      return {
        buildTypePicker:false,
        value4:'',
        buildTypeList:[],
        casLogin:sessionStorage.getItem('casLogin'),
        currentDate: new Date(),
        startDate:new Date(),
        endDate:'',
        areaPicker:false,
        buildPicker:false,
        date: '',
        itemHeight:35,
        nodeLIst: [],
        campusList: [{
          values:[],
          className:"campus-item"
        }],
        buildingList: [{
          values:[],
          className:"campus-item"
        }],
        value2: '',
        value3: '',
        buildingId: '',
        campusId: '',
        startNode:'',
        campusIdList:[],
        buildIdList:[],
        value: '',
        showPicker: false,
        timePicker:false,
        quickTime:[{
          time:'上午',
          code:'M'
        },{
          time:'下午',
          code:'A'
        },{
          time:'晚上',
          code:'E'
        },{
          time:'全天',
          code:'allday'
        }],
        columns: [{
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2',
          defaultIndex: 1
        }],
        start:'',
        end:'',
        typeCodeList:[],
        typeCode:''
      }
    },
    methods: {
      async getType(){
        const params = {
          table:'zzdjslx'
        }
        const res = await Api.getRoomType(params)
        this.buildTypeList.push("全部")
        res.data.forEach(item => {
          this.buildTypeList.push(item.dmmc)
          this.typeCodeList.push(item.dm)
        });
      },
      buildTypeSelect(val,index){
        this.buildTypePicker = false
        this.value4 = val
        if(val == "全部"){
          this.typeCode = ""
        }else{
          this.typeCode = this.typeCodeList[index - 1]
        }
      },
      async getMinMaxDate(){
        const res = await Api.getGgjxzlDate()
        this.endDate = res.data[0].endDate;
        let end = this.endDate.match(/\d?(.\d+)/ig);
        this.endDate = new Date(end[0] + ',' + Number(end[1].substr(1,end[1].length)) + ',' + Number(end[2].substr(1,end[1].length)));
        if(this.endDate < new Date()){
          this.startDate = this.endDate
        }
      },
      onConfirm(value) {
        this.start = value[0].substr(1,value[0].length - 3);
        this.end = value[1].substr(1,value[0].length - 3);
        let begin = Number(this.start);
        let over = Number(this.end);
        if(begin > over){
          Toast.fail('开始节次不能大于结束节次')
        }else{
          this.showPicker = false;
          this.value = this.start + '-' + this.end;
        }
      },
      timeConfirm(res){
        let calDate = res.getDate()
        if(res.getDate() < 10){
          calDate = '0' + res.getDate()
        }
        this.date = res.getFullYear() + '-' + (res.getMonth() + 1) + '-' + calDate
        this.timePicker = false;
      },
      areaSelect(item,index){
        this.areaPicker = false;
        this.value2 = item.toString();
        // if(item.toString() == '全部'){
        //   this.value2 = ''
        // }else{

        // }
        this.campusId = this.campusIdList[index]
        this.getBuild(this.campusId)
      },
      buildSelect(item,index){
        this.buildPicker = false;
        this.value3 = item.toString();
        // if(item.toString() == '全部'){
        //   this.value3 = ''
        // }else{

        // }
        this.buildingId = this.buildIdList[index]
      },
      // 点击查询
      Inquire() {
        if(this.date == '' || this.value == ''){
          Toast.fail('请选择使用时间和起始节次')
        }else{
          this.$router.push({
            path: '/student/classroom_refer',
            query: {
              'type':'0',
              'date': this.date,
              'start':this.start,
              'end':this.end,
              'build':this.buildingId,
              'campus':this.campusId,
              'bName':this.value3,
              'cName':this.value2,
              'rType':this.typeCode
            }
          });
        }
      },
      pickQuik(time,e){
        if(this.date == ''){
          Toast.fail('请选择使用时间')
        }else{
          this.$router.push({
            path: '/student/classroom_refer',
            query: {
              'type':'1',
              'time': time,
              'timeText':e,
              'date': this.date,
              'build':this.buildingId,
              'campus':this.campusId,
              'bName':this.value3,
              'cName':this.value2
            }
          });
        }
      },
      async getNode(){
        const res = await Api.getNodeList()
        let concatList = []
        for(let i = 0;i < res.data.length;i++){
          concatList = concatList.concat("第" + res.data[i].nodeName + "小节")
          this.columns[0].values = concatList
          this.columns[1].values = concatList
        }
      },
      async getCampus(){
        const res = await Api.getCampusList()
        let concatList1 = []
        let concatList_1 = []
        res.data.forEach((item,index) => {
          concatList1[0] = '全部'
          concatList_1[0] = ''
          concatList1[index + 1] = item.campusName
          concatList_1[index + 1] = item.campusId
        });
        this.campusIdList = concatList_1
        this.campusList = concatList1
      },
      async getBuild(e){
        const res = await Api.getTchBuildingList({
          xqid:e || ''
        })
        let concatList2 = []
        let concatList_2 = []
        res.data.forEach((item,index) => {
          concatList2[0] = '全部'
          concatList_2[0] = ''
          concatList2[index + 1] = item.buildingName,
          concatList_2[index + 1] = item.buildingId
        });
        this.buildingList = concatList2
        this.buildIdList = concatList_2
      }
    },
    created() {
      this.getMinMaxDate();
      //节次列表（下拉框）
      this.getNode()
      //校区列表
      this.getCampus()
      //教学楼列表
      this.getBuild()
      //教室类型
      this.getType()
    }
  }
</script>
<style lang="less">
.classroom .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}
.classroom .van-action-sheet{color: @attendance-color-1;}
.classroom { padding: 5px 20px;box-sizing: border-box;}
.flex_item {display: flex;align-items: center; }
.pick_list>li {height: 50px;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid @attendance-border-color-6;}
.classroom .el-input__inner {background: none;border: 0;text-align: right;padding-right: 40px;}
.classroom .el-input--small .el-input__inner {padding: 0;}
.classroom .pick_list {color: @attendance-color-1; box-sizing: border-box;}
.classroom .el-select {width: 150px;}
.classroom .pick_list li .flex_item>i{width: 25px;height: 25px;margin-right: 10px;}
.classroom .pick_list li .icon_classroom {background: url(../../../../static/img/class_a.png) no-repeat center;background-size: 25px 25px;}
.classroom .pick_list li .icon_classroom4 {background: url('../../../assets/images/icon_teacher2.png') no-repeat center;background-size: 25px 25px;}
.classroom .pick-input>i{width: 25px;height: 13px;}
.pick-arrow{background: url(../../../../static/img/arrow_r.png) no-repeat center;background-size: 13px 13px;}
.pick-active{background: url(../../../../static/img/arrow.png) no-repeat center;background-size: 8px 12px;}
.classroom .pick_list li .icon_classroom1 {background: url(../../../../static/img/class_b.png) no-repeat center;background-size: 25px 25px;}
.classroom .pick_list li .icon_classroom2 {background: url(../../../../static/img/class_c.png) no-repeat center;background-size: 25px 25px;}
.classroom .pick_list li .icon_classroom3 { background: url(../../../../static/img/class_d.png) no-repeat center;background-size: 25px 25px;}
.classroom .kscx {text-align: center;color: @attendance-background-color-2;margin: 20px 0;}
.classroom .kscx_menu {display: flex;justify-content: space-between;}
.classroom .kscx_menu li {font-weight: 500;font-size: 14px; width: 68px;height: 30px;line-height: 30px;text-align: center;color: @attendance-background-color-1;background: rgba(236, 237, 253, 1);border-radius: 15px;}
.classroom .inquire {width: 100%;position: absolute;bottom: 20px;left: 0;box-sizing: border-box;padding: 0 20px;}
.classroom .inquire_btn {width: 100%;height: 44px;background: rgba(116, 105, 248, 1);border-radius: 3px;font-size: 16px;font-weight: 500;color: @attendance-color-3;}
.classroom .el-input__prefix{left: 87%;}
.classroom .el-icon-circle-close:before{content: ''}
.pick_list li .pick-input{font-size: 16px;font-weight: 600;display: flex;align-items: center;justify-content: flex-end;width: 55%;}
.pick_list li .pick-input>input{text-align: right;padding-right: 2px;width: 85%;}
.pick_list li .pick-input>input::placeholder{color:@attendance-background-color-2;font-weight: 400;}
.classroom .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}
.el-date-table td.today span{color: @attendance-background-color-1;color: @attendance-color-2;}
.el-date-table td.current:not(.disabled) span{background-color: @attendance-color-1;}
.classroom .van-picker__columns{position: relative;}
.classroom .van-picker-column.column1::after{position: absolute;content: "到";width: auto;height: auto;top: 50%;left: 100%;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}
.classroom .van-picker-column.column2::after{position: absolute;content: "到";width: auto;height: auto;top: 50%;left: 0%;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}

.classroom .pick_list .date-pick-item.van-popup.van-popup--bottom .van-picker-column{position: relative;}
.classroom .pick_list .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column:first-child::after{position: absolute;content: "年";width: auto;height: auto;top: 50%;right: 10px;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}
.classroom .pick_list .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column:nth-child(2)::after{position: absolute;content: "月";width: auto;height: auto;top: 50%;right: 10px;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}
.classroom .pick_list .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column:nth-child(3)::after{position: absolute;content: "日";width: auto;height: auto;top: 50%;right: 10px;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}
.classroom .pick_list .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column::before{position: absolute;content: "";width: 50px;height: 35px;top: 50%;left: 50%;z-index: 9;transform: translate(-50%,-50%);border-top:1px solid @attendance-background-color-2;border-bottom: 1px solid @attendance-background-color-2;}
.classroom .pick_list .van-popup.van-popup--bottom .van-picker .van-picker-column{position: relative;}
.classroom .pick_list .van-popup.van-popup--bottom .van-picker .van-picker-column::before{position: absolute;content: "";width: 100px;height: 35px;top: 50%;left: 50%;z-index: 9;transform: translate(-50%,-50%);border-top:1px solid @attendance-background-color-2;border-bottom: 1px solid @attendance-background-color-2;}

.classroom .pick_list .date-pick-item.van-popup.van-popup--bottom .van-picker-column__item{margin: 0 30%;}
</style>



// WEBPACK FOOTER //
// src/components/student/Classroom/classroom.vue