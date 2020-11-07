<template>
  <div>
      <Header title="教学评价" type="0" route="/student/evaluate" ></Header>
      <NOdata v-if="this.evaluateList.length == 0" :title="warning"></NOdata>
      <div v-else class="eva-body">
        <div class="grey-contain" v-for="(item,index) in evaluateList" :key="index">
          <div style="width:65%;">
            <h4 class="contain-txt">{{item.courseName}}</h4>
            <p class="contain-txt1">课程编号：{{item.courseNumber}}</p>
            <div class="contain-txt1">授课教师：<span style="color: #F86969;">{{item.teacherName}}</span></div>
          </div>
          <div class="history" v-if="item.isSubmitCode == 1" @click="goCheck(item.evaluationCategoriesId,item.courseId,item.teacherId,item.noticeId,item.schoolClassificationId,item.courseName,item.courseNumber,item.teacherName)">
            <h1>{{item.overallScore}}</h1>
            <p>总评分</p>
          </div>
          <button @click="goEvaluate(item.evaluationCategoriesId,item.courseId,item.teacherId,item.noticeId,item.schoolClassificationId)" v-else>评价</button>
        </div>
      </div>
      <div class="history-btn">
        <button @click="checkHis()">查看我的评价记录</button>
      </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import {Api} from '../../../utils/axios'
  import { Toast } from 'vant'
  export default {
    data(){
      return{
        evaluateList:[],
        warning:''
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
        // this.$router.push({
        //   path:'/student/detailEvaluate',
        //   query:{
        //     'id0':this.$route.query.pj0502id,
        //     'id1':id1,
        //     'id2':id2,
        //     'id3':id3,
        //     'id4':id4,
        //     'id5':id5
        //   }
        // })
        this.$router.push({
          path:'/student/detailEvaluate',
          query:{
            'id0':this.$route.query.pj0502id,
            'id1':id1,
            'id2':id2,
            'id3':id3,
            'id4':id4,
            'id5':id5,
            'pj01id':this.$route.query.pj01id,
            'pj05id':this.$route.query.pj05id,
            'pj0502id':this.$route.query.pj0502id
          }
        })
      },
      checkHis(){
        this.$router.push({
          path:'/student/teachEva',
          query:{
            'pj01id':this.$route.query.pj01id,
            'pj0502id':this.$route.query.pj0502id,
            'pj05id':this.$route.query.pj05id,
          }
        })
      },
      async getEvaluation(){
        const params = {
          'pj01id': this.$route.query.pj01id,
          'batchId': this.$route.query.pj0502id,
          'pj05id': this.$route.query.pj05id,
          'issubmit':'0'
        }
        const res = await Api.getTeachEvaluation(params)
        this.evaluateList = res.data
        if(res.stateTime == '0'){
          this.warning = '暂无评价数据'
        }else if(res.stateTime == '1'){
          this.warning = '评价已完成'
        }
      }
    },
    created(){
      this.$store.state.evaOptCheck = []
      this.getEvaluation()
    },
  }
</script>

<style lang="less" scoped>
.grey-contain{display: flex;align-items: center;}
.grey-contain h4{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 22px;}
  .grey-contain button{background-color: @attendance-background-color-1;border-radius: 3px;color: @attendance-color-3;height: 45px;width: 70px;}
  .grey-contain .contain-txt1{line-height: 17px;}
  .grey-contain  p{margin-bottom: 2px;}
  .delay-btn{position: absolute;bottom: 20px;width: 100%;text-align: center;}
  .delay-btn button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;width: 90%;border-radius: 3px;}
  .history{border-radius: 3px;background-color: @attendance-background-color-13;color: @attendance-color-3;height: 45px;width: 70px;display: flex;flex-direction: column;align-items: center;justify-content: center;}
  .history h1{font-size: 16px;font-weight: 400;}
  .history p{font-size: 10px;}
  .eva-body{margin-bottom: 90px;}
  .history-btn{position: fixed;bottom: 0;width: 100%;background-color: @attendance-color-3;text-align: center;padding: 0 20px;box-sizing: border-box;}
  .history-btn button{width: 100%;background-color: @attendance-background-color-7;color: @attendance-background-color-1;margin:20px 0;border-radius: 3px;padding: 11px 0}
</style>



// WEBPACK FOOTER //
// src/components/student/Evaluate/teachEvaluate.vue