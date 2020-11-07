<template>
  <div>
    <Header title="教学进度"></Header>
    <div class="syllabus_top">
      <div class="sem-drop">
        <div @click="semPicker = true"><p>{{semester}}</p><i></i></div>
      </div>
       <!-- :close-on-click-overlay="false" -->
      <van-popup v-model="semPicker" position="bottom">
        <van-picker show-toolbar :columns="option1" @cancel="semPicker = false" @confirm="semesterChoose" :swipe-duration="500" :item-height="35"/>
      </van-popup>
    </div>
    <NOdata title="暂无教学进度~" v-if="this.syllabusList.length == 0 && isLoad"></NOdata>
    <div class="syllabus" v-else>
      <div v-for="(list,index) in syllabusList" :key="index" class="syllabus_list">
        <p>第<span>{{index + 1}}</span>周</p>
        <ul>
        	<li :class="index < 6 ? 'syllabus2' : (index >= 6 && index < 12 ?'syllabus1' :'syllabus3')"><i></i>{{list.ProgressName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import { Toast } from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        syllabusList:[],
        semPicker:false,
        value1: 0,
        semester:'学年学期',
        option1: [{
          text:'学年学期',
          value:0,
          index:''
        }],
        isLoad:false
      }
    },
    created(){
      this.getTerm()
      this.getSemList()
      this.getProgress()
    },
    methods:{
      async getProgress(e){
        const params = {
          'semester':!e ? '' : e.text == '学年学期' ? '' : e.text
        }
        const res = await Api.getTeachingProgress(params)
        this.syllabusList = res.data;
        this.isLoad = true;
      },
      async getSemList(){
        let concatList = []
        const res = await Api.getSemesterList()
        res.data.forEach((item,index) => {
          concatList[index] = {
            text:item.semesterName,
            value:index + 1,
            index:item.semesterId
          }
        });
        this.option1 = this.option1.concat(concatList)
      },
      async getTerm(){
        const res = await Api.getCurrentTerm()
        this.semester = res.data[0].semesterId
      },
      semesterChoose(e,val){
        this.semPicker = false
        this.semester = e.text
        this.getProgress(e)
      }
    },
  }
</script>

<style lang="less" scoped>
  .syllabus1{background-color: @attendance-background-color-4;}
  .syllabus2{background-color: @attendance-background-color-9;}
  .syllabus3{background-color: @attendance-background-color-11;}
  .syllabus{padding-left: 20px;}
  .syllabus_top .sem-drop>div{display: flex;align-items: center;color: @attendance-color-2;font-size: 14px;}
  .syllabus_top .sem-drop>div i{background: url(../../../../static/img/Triangle.png)no-repeat center;width: 10px;height: 10px;background-size: 10px 8px;margin-left: 5px;}
  .syllabus_top{width: 100%;height: 50px;display: flex;justify-content: center;align-items: center;border-bottom: 1px solid @attendance-border-color-6;}
  .syllabus_list{height: 84px;display: flex;align-items: center;}
  .syllabus_list p{width: 15%;color: @attendance-color-2;font-size: 12px;}
  .syllabus_list p span{font-size: 16px;font-weight: bold;}
  .syllabus_list ul{width: 85%;height: 84px;padding: 10px 0;box-sizing: border-box;border-bottom: 1px solid @attendance-background-color-2;}
  .syllabus_list ul li{display: flex;align-items: center;height: 64px;line-height: 64px;font-size: 14px;color: @attendance-color-3;border-radius:5px 0px 0px 5px;}
  .syllabus_list ul li i{width: 8px;height: 8px;border-radius: 50%;background: @attendance-color-3;margin: 0 10px;}
  .syllabus_top .van-popup{max-height: 40%;}
  .syllabus_top .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}/*box-shadow:0px -2px 2px 0px rgba(223,223,223,0.5);*/
  .syllabus_top .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}

  .syllabus_top .van-picker__columns::before{width: 150px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .syllabus_top .van-picker__columns::after{width: 150px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}

</style>



// WEBPACK FOOTER //
// src/components/student/Cultivate/syllabus.vue