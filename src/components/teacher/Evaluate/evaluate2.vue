<template>
  <div>
      <Header title="教学评价" type="0" route="/evaluate"></Header>
    <NOdata title="暂无教学评价~" v-if="evaluateList.length == 0?isShow3:''"></NOdata>
      <div class="grey-contain" v-for="(item,index) in evaluateList" :key="index">
        <div style="width:calc(100% - 80px);">
          <p class="contain-txt">{{item.teacherName}}</p>
          <span class="contain-txt1">教工号：{{item.teacherNumber}}</span>
          <div class="contain-txt1" v-if="item.institute ? isShow1 : ''">所属学院：{{item.institute}}</div>
        </div>
        <button @click="item.isSubmitCode == 0 ? goEvaluate(item) : '' " v-text="item.isSubmitCode == 0 ? '评价' : ''" v-if="isShow"></button>
        <div class="r_box" @click="item.isSubmitCode == 1 ? goCheck(item) : ''" v-else>
            <span class="number">{{item.overallScore}}</span>
            <span class="grade">总评分</span>
        </div>
      </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
import {Api} from '../../../utils/axios'
  export default {
    data(){
      return{
        evaluateList:[],
        isShow:true,
        isShow1:true,
        isShow3:true
      }
    },
    methods:{
      goCheck(e){
        this.$router.push({
          path:'/gradeDetails',
          query:{
            'batchId':e.batchId,
            'evaluationCategoriesId':e.evaluationCategoriesId,
            'courseId':e.courseId,
            'teacherId':e.teacherId,
            'noticeId':e.noticeId,
            'schoolClassificationId':e.schoolClassificationId,
            'teacherName':e.teacherName,
            'teacherNumber':e.teacherNumber

          }
        })
      },
      goEvaluate(e){
        this.$router.push({
          path:'/evaluate3',
          query:{
            'batchId':this.$route.query.batchId,
            'pj05id':this.$route.query.pj05id,
            'evaluationCategoriesId':e.evaluationCategoriesId,
            'courseId':e.courseId,
            'teacherId':e.teacherId,
            'noticeId':e.noticeId,
            'schoolClassificationId':e.schoolClassificationId
          }
        })
      },
      async getList(){
        const params = {
          batchId: this.$route.query.batchId,
          pj05id: this.$route.query.pj05id,
        }
        const res = await Api.teachTeachingEvaluationList(params)
        if(res.errorCode == 'fail'){
          Toast.fail(res.errorMessage)
        }else{
          this.evaluateList = res.data
        }
      }
    },
    created(){
      this.getList()
    },
	
  }
</script>


<style lang="less" scoped>
  .grey-contain button{background-color: @attendance-background-color-1;padding: 11px 19px;border-radius: 3px;color: @attendance-color-3;}
  .delay-btn{position: absolute;bottom: 20px;width: 100%;text-align: center;}
  .delay-btn button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;width: 90%;border-radius: 3px;}
  .r_box{
        width: 24%;
        height: 42px;
        float: right;
        background: url(../../../assets/images/bg_icon.png) center center no-repeat;
        background-size: 100%;
        /* margin: 20px 20px 0 0; */
        text-align: center;
    }
    .contain-txt{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .r_box span{
      display: block
    }
    .r_box .number{
        color: @attendance-color-3;
        font-size: 18px;
        margin-top: 3px
    }
    .r_box .grade{
        color: @attendance-color-3;
        font-size: 10px;
    }
</style>


// WEBPACK FOOTER //
// src/components/teacher/Evaluate/evaluate2.vue