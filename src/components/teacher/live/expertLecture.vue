<template>
  <div>
    <Header title="专家听课" type="0" route="/teacher/courseManage"></Header>
    <div class="classroom">
      <ul class="pick_list">
        <li>
          <div class="flex_item"><p>学年学期</p></div>
          <div class="pick-input">
            <input type="text" @click="timePicker = true" readonly v-model="date" placeholder="请点击选择">
            <i :class="date == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="timePicker" position="bottom" class="date-pick-item">
          <van-picker show-toolbar :columns="semColumns" @cancel="timePicker = false" @confirm="semConfirm" :item-height="itemHeight"/>
        </van-popup>
        <li>
          <div class="flex_item"><p>课程类别</p></div>
          <div class="pick-input">
            <input type="text" @click="showPicker = true" readonly v-model="value" placeholder="请点击选择">
            <i :class="value == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="itemHeight"/>
        </van-popup>
        <li>
          <div class="flex_item"><p>批次</p></div>
          <div class="pick-input">
            <input type="text" @click="areaPicker = true" readonly v-model="value2" placeholder="请点击选择">
            <i :class="value2 == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="areaPicker" position="bottom">
          <van-picker show-toolbar :columns="campusList" @cancel="areaPicker = false" @confirm="areaSelect" :item-height="itemHeight"/>
        </van-popup>
        <li>
          <div class="flex_item"><p>周次</p></div>
          <div class="pick-input">
            <input type="text" @click="buildPicker = true" readonly v-model="value3" placeholder="请点击选择(必选)">
            <i :class="value3 == '' ? 'pick-arrow' : 'pick-active'"></i>
          </div>
        </li>
        <van-popup v-model="buildPicker" position="bottom">
          <van-picker show-toolbar :columns="buildingList" @cancel="buildPicker = false" @confirm="buildSelect" :item-height="itemHeight"/>
        </van-popup>
      </ul>
      <div class="inquire">
        <button class="inquire_btn" @click="Inquire()">查询</button>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import {Api} from '../../../utils/axios'
import { Toast } from 'vant';
  export default {
    data() {
      return {
        semColumns:[],
        endDate:'',
        semPicker:false,
        areaPicker:false,
        buildPicker:false,
        date: '',
        itemHeight:35,
        nodeLIst: [],
        campusList: [],
        buildingList: [],
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
        columns: [],
        start:'',
        end:'',
        classType:[],
        pcIdList:[],
        pcId:'',
        typeId:'',
        weekId:''
      }
    },
    methods: {
      async getMinMaxDate(){
        // 起止日期
        const res = await Api.getGgjxzlDate()
        this.endDate = res.data[0].endDate;
        let end = this.endDate.match(/\d?(.\d+)/ig);
        this.endDate = new Date(end[0] + ',' + Number(end[1].substr(1,end[1].length)) + ',' + Number(end[2].substr(1,end[1].length)));
      },
      semConfirm(e){
        this.date = e;
        this.timePicker = false;
      },
      // 课程类别
      onConfirm(e,index) {
        this.value = e;
        this.showPicker = false;
        this.typeId = this.classType[index];
      },
      //批次
      areaSelect(item,index){
        this.areaPicker = false;
        this.value2 = item.toString();
        this.pcId = this.pcIdList[index]
      },
      //周次
      buildSelect(item,index){
        this.buildPicker = false;
        this.value3 = item.toString();
        this.weekId = index + 1;
      },
      // 点击查询
      Inquire() {
        if(this.value3 == ''){
          Toast.fail('请选择周次')
        }else{
          this.$router.push({
            path: '/teacher/lectureResult',
            query: {
              'semester':this.date,
              'type': this.typeId,
              'pc':this.pcId,
              'zc':this.weekId,
            }
          });
        }
      },
      async getSem(){
        const res = await Api.supervisorGetxnxq()
        res.data.forEach((item,index) => {
          this.semColumns.push(item.XNXQ01ID);
          if(item.ISDQXQ && item.ISDQXQ == '1'){
            this.date = item.XNXQMC;
          }
        });
      },
      async getType(){
        const res = await Api.supervisorGettk01()
        res.data.forEach((item,index) => {
          this.columns.push(item.TKDLMC);
          this.classType.push(item.TK01ID)
        })
      },
      async getTimes(){
        const res = await Api.supervisorGettkpc()
        res.data.forEach((item,index) => {
          this.campusList.push(item.TKPCMC);
          this.pcIdList.push(item.TK05ID)
        });
      }
    },
    created() {
      this.getMinMaxDate();
      // 学年学期
      this.getSem()
      //课程类别
      this.getType()
      //批次
      this.getTimes()
      //周次
      for(let i = 0;i < 30;i++){
        this.buildingList.push('第' + (i + 1) + '周')
      }
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
.classroom .pick-input>i{width: 25px;height: 13px;}
.pick-arrow{background: url(../../../../static/img/arrow_r.png) no-repeat center;background-size: 13px 13px;}
.pick-active{background: url(../../../../static/img/arrow.png) no-repeat center;background-size: 8px 12px;}
.classroom .kscx {text-align: center;color: @attendance-background-color-2;margin: 20px 0;}
.classroom .kscx_menu {display: flex;justify-content: space-between;}
.classroom .kscx_menu li {font-weight: 500;font-size: 14px; width: 68px;height: 30px;line-height: 30px;text-align: center;color: @attendance-background-color-1;background: rgba(236, 237, 253, 1);border-radius: 15px;}
.classroom .inquire {width: 100%;position: absolute;bottom: 20px;left: 0;box-sizing: border-box;padding: 0 20px;}
.classroom .inquire_btn {width: 100%;height: 44px;background: rgba(116, 105, 248, 1);border-radius: 3px;font-size: 16px;font-weight: 500;color: @attendance-color-3;}
.classroom .el-input__prefix{left: 87%;}
.classroom .el-icon-circle-close:before{content: ''}
.pick_list li .pick-input{font-size: 16px;font-weight: 600;display: flex;align-items: center;justify-content: flex-end;width: 55%;}
.pick_list li .pick-input>input{text-align: right;padding-right: 2px;width: 85%;text-overflow: ellipsis;}
.pick_list li .pick-input>input::placeholder{color:@attendance-background-color-2;font-weight: 400;}
.classroom .van-picker__cancel, .van-picker__confirm{color: @attendance-color-1}
.classroom .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}
.el-date-table td.today span{color: @attendance-background-color-1;color: @attendance-color-2;}
.el-date-table td.current:not(.disabled) span{background-color: @attendance-color-1;}
.classroom .van-picker__columns{position: relative;}
.classroom .van-picker-column.column1::after{position: absolute;content: "到";width: auto;height: auto;top: 50%;left: 100%;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}
.classroom .van-picker-column.column2::after{position: absolute;content: "到";width: auto;height: auto;top: 50%;left: 0%;z-index: 9;transform: translate(-50%,-50%);font-weight: 600;}

.classroom .van-picker__cancel{color:rgba(0,0,0,0);background: url(../../../../static/img/close.png)no-repeat center;position: absolute;background-size: 25px 25px;width: 25px;height: 25px;left: 0;padding: 16px;}
.classroom .van-picker__confirm{color:rgba(0,0,0,0);background: url(../../../../static/img/confirm.png)no-repeat center;position: absolute;background-size: 25px 25px;width: 25px;height: 25px;right: 0;padding: 16px;}
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
// src/components/teacher/live/expertLecture.vue