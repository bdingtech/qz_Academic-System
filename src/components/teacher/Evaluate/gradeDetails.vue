<template>
  <div>
    <Header title="评价详情"></Header>
    <div class="content_ textbook_Details detail_box">
       <span class="contain-txt">{{this.teacherName}}</span>
       <span class="contain-txt1">教工号：{{this.teacherNumber}}</span>
       <span class="contain-txt1">所属学院：文史与法学学院</span>
    </div>

    <!-- 评价详情 -->
    <div class="eva-detail">
      <div v-for="(item,index) in radioList" :key="index">
        <p>{{index + 1}}/{{total}}</p>
        <p>{{item.targetName}}</p>
        <div style="display:flex;">
          <h1>选择：</h1>
          <template v-for="tItem in item.optionData">
            <h1 v-if="tItem.isCheck == '1'" :key="tItem.optionId">{{tItem.optionName}}</h1>
          </template>
        </div>
      </div>
      <div v-for="(item,index) in textList" :key="item.suggestTypeId">
        <p>{{index + textIndex}}/{{total}}</p>
        <p>{{item.suggestTypeName}}</p>
        <h1>建议：{{item.suggestContent}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import {Api} from '../../../utils/axios'
import { Toast } from 'vant'
  export default {
    data(){
      return{
        radioList:[],
        textList:[],
        total:'',
        textIndex:'',
        teacherName:'',
        teacherNumber:'',

      }
    },
    created(){
      this.teacherName = this.$route.query.teacherName;
      this.teacherNumber = this.$route.query.teacherNumber
      this.getList()
    },
	
    methods:{
      async getList(){
        const params = {
          batchId:this.$route.query.batchId,
          evaluationCategoriesId:this.$route.query.evaluationCategoriesId,
          courseId:this.$route.query.courseId,
          teacherId:this.$route.query.teacherId,
          noticeId:this.$route.query.noticeId,
          schoolClassificationId:this.$route.query.schoolClassificationId
        }
        const res = await Api.teachEvaluationIndex(params)
        for(let i = 0;i<res.data.targetData.length;i++){
          if(res.data.targetData[i].optionData){
            this.radioList = this.radioList.concat(res.data.targetData[i])
          }
        }
        this.textList = res.data.suggestData
        this.total = this.radioList.length + this.textList.length
        this.textIndex = this.radioList.length + 1
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
  .gradesScore_list>div>h4{color: @attendance-color-1;font-size: 14px;line-height: 22px; }
  .gradesScore_list>div>P{color: @attendance-color-2;font-size: 12px; line-height: 18px;}
  .gradesScore_list>button{background: @attendance-background-color-13;border-radius:5px;color: @attendance-color-3;padding:4px 17px;}
  .gradesScore_list>button>p{font-size: 18px;}
  .gradesScore_list>button>span{font-size: 10px;}
  #popup{box-sizing: border-box;padding: 20px;}
  #popup>h2{color: @attendance-color-1;font-size: 16px;line-height: 25px;text-align: center; font-weight: bold;}
  #popup>div{color: @attendance-background-color-1;font-size: 24px;font-weight: bold;text-align: center;padding-top: 10px;padding-bottom: 10px;}
  #popup>p{color: @attendance-color-2;font-size: 16px;line-height: 30px;}
  #popup>p>span{font-weight: bold;}
  #popup{width: 90%;border-radius: 5px;}
  #popup button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;border-radius: 3px;width: 100%;margin-top: 30px;}
  .textbook_Details h3{font-size:18px;color: @attendance-color-1;line-height: 28px;}
  .textbook_Details p{font-size:14px;color: @attendance-color-2;line-height: 25px;}
  .textbook_Details p span{font-weight: bold;}
  .eva-detail{padding: 40px 20px 0;color: @attendance-color-2;font-size: 14px;}
  .eva-detail h1{font-weight: 600;font-size: 15px;margin-top: 10px;margin-bottom: 20px;}
  .detail_box{
      width: 90%;
      margin-left: 5%;
  }
  .detail_box span{
      display: block;
  }
    .detail_box .contain-txt{
        color: @attendance-color-1;
        font-size: 18px;
        font-weight: 600;
        margin-top: 7px
    }
    .detail_box .contain-txt1{
        color: @attendance-color-2;
        font-size: 14px;
        margin-top: 8px

    }
</style>



// WEBPACK FOOTER //
// src/components/teacher/Evaluate/gradeDetails.vue