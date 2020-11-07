<template>
  <div>
    <Header title="等级考试成绩"></Header>
    <NOdata v-if="this.gradesList.length == 0" title="暂无数据~"></NOdata>
    <div class="gradesScore content_" v-else>
      <div class="gradesScore_list" v-for="(list,index) in gradesList" :key="index">
        <div>
          <h4>{{list.courseName}}({{list.socialExaminationGradeName}})</h4>
          <p>考试时间：{{list.date}}</p>
        </div>
        <div @click="popup(list)" class="score-btn">
          <p>{{list.overallResult}}</p>
          <span>总成绩</span>
        </div>
      </div>
    </div>
    <van-popup v-model="popShow" id="popup">
        <h2>{{this.popList.courseName}}({{this.popList.socialExaminationGradeName}})</h2>
        <div>{{this.popList.overallResult}}</div>
        <p>笔试：<span>{{this.popList.writtenTestScore}}</span></p>
        <p>实践：<span>{{this.popList.practiceScore}}</span></p>
        <p>考级时间：<span>{{this.popList.date}}</span></p>
        <p>准考证号：<span>{{this.popList.admissionTicketNumber}}</span></p>
        <button @click="closePop()">确定</button>
    </van-popup>
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
        gradesList:[],
        popShow:false,
        popList:[]
      }
    },
    created(){
      this.getList()
    },
    methods:{
      async getList(){
        const res = await Api.socialTestScores()
        this.gradesList = res.data
      },
      popup(res){
        this.popShow = true;
        this.popList = res
      },
      closePop(){
        this.popShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  .gradesScore_list{display: flex;justify-content: space-between;align-items: center;background: @attendance-background-color-10;border-radius:5px;box-sizing: border-box;padding: 15px;margin-bottom: 20px;}
  .gradesScore_list>div>h4{color: @attendance-color-1;font-size: 16px;margin-bottom: 4px;}
  .gradesScore_list>div>P{color: @attendance-color-2;font-size: 12px;line-height: 18px;}
  .gradesScore_list>.score-btn{background: @attendance-background-color-13;border-radius:5px;color: @attendance-color-3;text-align: center;width: 70px;height: 45px;display: flex;flex-direction: column;align-items: center;justify-content: center;}
  .gradesScore_list>.score-btn>p{font-size: 18px;color: @attendance-color-3;margin-bottom: -2px;}
  .gradesScore_list>.score-btn>span{font-size: 10px;}
  #popup{box-sizing: border-box;padding: 20px;}
  #popup>h2{color: @attendance-color-1;font-size: 16px;line-height: 25px;text-align: center;font-weight: bold;}
  #popup>div{color: @attendance-background-color-1;font-size: 24px;font-weight: bold;text-align: center;padding-top: 10px;padding-bottom: 10px;}
  #popup>p{color: @attendance-color-2;font-size: 16px;line-height: 30px;}
  #popup>p>span{font-weight: bold;}
  #popup{width: 90%;border-radius: 5px;}
  #popup button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;border-radius: 3px;width: 100%;margin-top: 30px;}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/grades_score.vue