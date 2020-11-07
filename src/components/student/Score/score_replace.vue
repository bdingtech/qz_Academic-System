<template>
  <div>
    <Header title="成绩认定" type="0" route="/student/score_Affirmation"></Header>
    <div class="score_replace">
      <!-- <div class="score_replace_course">
        <h4>{{this.topInfo.COURSENAME}}</h4>
        <p>课程代码：{{this.topInfo.COURSECODE}}</p>
        <p>学分：{{this.topInfo.CREDIT}}</p>
        <p>属性：{{this.topInfo.COURSEATTRIBUTE}}</p>
      </div> -->
      <h3 style="color: @attendance-background-color-1;font-size: 18px;">请选择替代课程<small>（可多选）</small></h3>
      <div class="course_list" v-for="(item,index) in courseList" :key="index" @click="canSelect(item.CANCHECK)">
        <div>
          <h4>{{item.COURSENAME}}</h4>
          <p class="course_list_item">课程代码:{{item.COURSECODE}}</p>
          <div class="course_list_item">
            <span>学分: <small>{{item.CREDIT}}</small></span>
            <span>属性: <small>{{item.COURSEATTRIBUTE}}</small></span>
          </div>
        </div>
        <el-checkbox v-model="item.checked" v-if="item.CANCHECK == 1"></el-checkbox>
      </div>
    </div>
    <div class="submit_btn">
      <button @click="courseSubmit()">下一步</button>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import {Toast} from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        topInfo:'',
        valueList:'',
        courseList:[]
      }
    },
    created(){
      this.topInfo = this.$route.query.data;
      this.getList()
    },
    methods:{
      async getList(){
        const res = await Api.alterNativeCourses()
        this.courseList = res.data;
        if(res.data.length == 0){
          Toast(res.Msg);
        }
      },
      async submit(){
        const params = {
          cj0708ids:this.topInfo,
          jx02kczkcids:this.valueList
        }
        const res = await Api.alterNativeCoursesSave(params)
        if(res.code == '1'){
          this.$router.push('/student/submit_success')
        }else{
          Toast(res.Msg)
        }
      },
      canSelect(val){
        if(val == '0'){
          Toast.fail('当前课程不可选')
        }
      },
      courseSubmit(){
        for(let i = 0;i < this.courseList.length;i++){
          if(this.courseList[i].checked){
            this.valueList +=  this.courseList[i].JX02KCZKCID + ',';
          }
        }
        this.valueList = this.valueList.substring(0,this.valueList.length-1);
        if(this.valueList !== ''){
          this.submit()
        }else{
          Toast.fail('至少选择一门课程')
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .score_replace{
    padding:10px 20px;
    box-sizing: border-box;
    overflow: auto;
    margin-bottom: 70px;
  }
  .score_replace .score_replace_course{
    margin-bottom: 30px;
  }
  .score_replace .score_replace_course>h4{
    color: @attendance-color-1;
    font-size: 18px;
    line-height: 30px;
  }
  .score_replace .score_replace_course>p{
    color: @attendance-color-2 ;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
  }
  .score_replace .course_list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: @attendance-background-color-10;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 20px;
    height: 82px;
  }
  .score_replace .course_list .course_list_item{
    color: @attendance-color-2 ;
    font-size: 12px;
    line-height: 17px;
  }
  .score_replace .course_list h4{color: @attendance-color-1;font-size: 16px;line-height:22px;margin-bottom:4px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .score_replace .course_list p{margin-bottom: 2px;}
  .score_replace .course_list .course_list_item small{
    color: red;
    font-size: 10px;
  }
  .score_replace .course_list .course_list_item span{
    margin-right: 25px;
  }
  .score_replace .el-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  .score_replace .el-checkbox__inner::after{
    left: 6px;
    top: 3px;
  }
  .score_replace .el-checkbox__input.is-checked .el-checkbox__inner{
    background: @attendance-background-color-1;
    border-color:@attendance-background-color-1;
  }
  .submit_btn button{background: @attendance-background-color-1;height:44px;color: @attendance-color-3;border-radius:3px;margin: 10px 20px 20px;}
  .submit_btn{text-align: center;position: fixed;bottom: 0px;z-index: 99;width: 100%;display: grid;background-color: @attendance-color-3}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/score_replace.vue