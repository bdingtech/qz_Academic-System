<template>
  <div>
    <Header title="选课中心"></Header>
    <div class="pick-info">
      <div>
        <p class="pick-txt">{{this.pickInfo.data1}}</p>
        <p class="pick-txt1">学年学期：{{this.pickInfo.data2}}</p>
        <p class="pick-txt1">选课时间：{{this.pickInfo.data3}}</p>
      </div>
    </div>
    <div>
      <a class="grey-contain" v-for="(item,index) in pickList" :key="index" @click="goDetail(item.classificationCode)">
        <p>{{item.classificationName}}</p>
        <i class="arrow_link"></i>
      </a>
    </div>
    <div class="pick-buttons">
      <router-link class="delay-btn2" :to="{path:'/student/creditStatistics',query:{data:this.$route.query.data4}}" tag="button">
        我的学分统计
      </router-link>
      <button @click="pickRecordTap()" class="delay-btn1">
        我的选课记录
      </button>
    </div>

  </div>
</template>

<script>
// import Header from '../header.vue'
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
  export default{
    data(){
      return{
        pickInfo:[],
        pickList:[],
        dataList:[],
      }
    },
    created(){
      this.pickInfo = this.$route.query;
      this.getList()
    },
    methods:{
      async getList(){
        const params = {
          rotationId:this.$route.query.data4
        }
        const res = await Api.selectWxinitXscache(params)
        if(res.data.errorCode == 'fail'){
          Toast(res.data.errorMessage)
          this.$router.replace('/student/pickClass')
        }
        this.pickList = res.data.classificationList
        this.dataList = res.data;
        if(res.data.data == ''){
          Toast(res.data.errorMessage)
        }
      },
      pickRecordTap(){
        this.$router.push({
          path:'/student/pickRecord',
          query:{
            'data':this.$route.query.data4,
            'session':this.dataList.sessionTime,
            'course':this.dataList.courseQualification,
            'exit':this.$route.query.data5
          }
        })
      },
      goDetail(res){
        this.$router.push({
          path:'/student/pickDetail',
          query:{
            data:res,
            data1:this.$route.query.data4,
            data2:this.dataList.compulsoryGrades,
            data3:this.dataList.compulsorySemester,
            data4:this.dataList.compulsorySelection,
            data5:this.dataList.selectionGrades,
            data6:this.dataList.departmentCurriculum,
            data7:this.dataList.courseQualification,
            session:this.dataList.sessionTime
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .grey-contain{position: relative;}
  .grey-contain::after{position: absolute;width: 3px;height: 100%;left: 0;border-radius: 5px 0 0 5px;content: '';background-color: @attendance-background-color-1 ;}
  .grey-contain p{font-weight: 600;}
  .pick-info{padding:20px 20px 10px;}
  .pick-info p{margin-bottom: 8px;}
  .pick-info .pick-txt{color: @attendance-color-1;font-size: 18px;font-weight: 600;}
  .pick-info .pick-txt1{color: @attendance-color-2;font-size: 14px;}
  .pick-buttons{position: fixed;bottom: 0px;width: 100%;text-align: center;font-size: 14px;display: flex;justify-content: space-between;background-color: @attendance-color-3;padding: 0 20px;box-sizing: border-box;}
  .pick-buttons .delay-btn2,.pick-buttons .delay-btn1{width: calc(50% - 10px);margin: 20px 0;}
  .pick-buttons .delay-btn2{background-color: @attendance-background-color-7;color: @attendance-background-color-1 ;padding: 11px 0;border-radius: 3px;}
  .pick-buttons .delay-btn1{background-color: @attendance-background-color-1 ;color: @attendance-color-3;padding: 11px 0;border-radius: 3px;}
  .grey-contain:last-child{margin-bottom: 90px;}
</style>



// WEBPACK FOOTER //
// src/components/student/pickClass/pickCenter.vue