<template>
  <div>
      <Header title="评价记录"></Header>
      <NOdata v-if="this.evaluateList.length == 0" title="暂无评价记录~"></NOdata>
      <div v-else class="eva-body">
        <div class="grey-contain" v-for="(item,index) in evaluateList" :key="index">
          <div style="width:65%;">
            <p class="contain-txt">{{item.courseName}}</p>
            <span class="contain-txt1">上课方式：{{item.teachingMethods}}</span>
            <div class="contain-txt1">授课教师：<span style="color: #F86969;">{{item.teacherName}}</span></div>
          </div>
          <div class="history" v-if="item.isSubmitCode == 1" @click="goCheck(item.evaluationCategoriesId,item.courseId,item.teacherId,item.noticeId,item.schoolClassificationId,item.courseName,item.courseNumber,item.teacherName)">
            <h1>{{item.overallScore}}</h1>
            <p>总评分</p>
          </div>
          <button @click="goEvaluate(item.evaluationCategoriesId,item.courseId,item.teacherId,item.noticeId,item.schoolClassificationId)" v-else>评价</button>
        </div>
      </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import { Toast } from 'vant'
  import {Api} from '../../../utils/axios'
  export default {
    data(){
      return{
        evaluateList:[]
      }
    },
    methods:{
      goCheck(id1,id2,id3,id4,id5,info1,info2,info3){
        this.$router.push({
          path:'/student/evaluateHistory',
          query:{
            'id0':this.$route.query.pj0502id,
            'id1':id1,
            'id2':id2,
            'id3':id3,
            'id4':id4,
            'id5':id5,
            'info1':info1,
            'info2':info2,
            'info3':info3
          }
        })
      },
      goEvaluate(id1,id2,id3,id4,id5){
        this.$router.push({
          path:'/student/detailEvaluate',
          query:{
            'id0':this.$route.query.pj0502id,
            'id1':id1,
            'id2':id2,
            'id3':id3,
            'id4':id4,
            'id5':id5
          }
        })
      },
      async getEvaluation(){
        const params = {
          'pj01id': this.$route.query.pj01id,
          'batchId': this.$route.query.pj0502id,
          'pj05id': this.$route.query.pj05id,
          'issubmit':'1'
        }
        const res = await Api.getTeachEvaluation(params)
        this.evaluateList = res.data
      }
    },
    created(){
      this.getEvaluation()
    },
  }
</script>

<style lang="less" scoped>
.grey-contain p{font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .grey-contain button{background-color: @attendance-background-color-1;border-radius: 3px;color: @attendance-color-3;height: 45px;width: 70px;}
  .delay-btn{position: absolute;bottom: 20px;width: 100%;text-align: center;}
  .delay-btn button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;width: 90%;border-radius: 3px;}
  .history{border-radius: 3px;background-color: @attendance-background-color-13;color: @attendance-color-3;height: 45px;width: 70px;display: flex;flex-direction: column;align-items: center;justify-content: center;}
  .history h1{font-size: 16px;font-weight: 500;}
  .history p{font-size: 10px;font-weight: 300;line-height: 13px;}
  .eva-body{margin-bottom: 90px;}
  .history-btn{position: fixed;bottom: 0;width: 100%;background-color: @attendance-color-3;text-align: center;padding: 0 20px;box-sizing: border-box;}
  .history-btn button{width: 100%;background-color: @attendance-background-color-7;color: @attendance-background-color-1;margin:20px 0;border-radius: 3px;padding: 11px 0}
</style>



// WEBPACK FOOTER //
// src/components/student/Evaluate/teachEva.vue