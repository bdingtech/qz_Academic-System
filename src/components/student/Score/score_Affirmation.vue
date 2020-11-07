<template>
  <div class="score_Affirmation">
      <Header title="成绩认定" type="0" route="/student/score"></Header>
      <div class="score_content">
        <h4 style="color: @attendance-color-1;font-size: 16px;">已修课程</h4>
        <NOdata v-if="this.courseList.length == 0 && isLoad" title="暂无数据~"></NOdata>
        <div class="course_list" v-else>
          <a v-for="(item,index) in courseList" :key="index" @click="canSelect(item.CANCHECK)">
            <div style="width:85%;">
              <h4>{{item.COURSENAME}}</h4>
              <p style="font-size: 12px;margin-bottom:2px;line-height:17px;">课程代码：{{item.COURSECODE}}</p>
              <div style="font-size: 12px;line-height:17px;">
                <span>学分：<small>{{item.CREDIT}}</small></span>
                <span>属性：<small>{{item.COURSEATTRIBUTE}}</small></span>
              </div>
            </div>
            <el-checkbox v-model="item.checked" v-if="item.CANCHECK == 1"></el-checkbox>
          </a>
        </div>
      </div>
      <div class="score_foot">
        <button class="score_btn" @click="Check()">已申请认定</button>
        <button class="next_btn" @click="goDetail()">下一步</button>
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
      return {
        courseList:[],
        valueList:[],
        isLoad:false
      }
    },
    created(){
      this.getList()
    },
    methods:{
      async getList(){
        const res = await Api.achievementRecognition()
        if(res.code == "0"){
          Toast(res.Msg);
          this.$router.replace('/student/score_apply');
        }
        this.courseList = res.data;
        this.isLoad = true;
      },
      Check(){
        this.$router.push('/student/score_apply')
      },
      canSelect(val){
        if(val == '0'){
          Toast.fail('当前课程不可选')
        }
      },
      goDetail(){
        for(let i = 0;i < this.courseList.length;i++){
          if(this.courseList[i].checked){
            this.valueList +=  this.courseList[i].CJ0708ID + ',';
          }
        }
        if(this.valueList.length == 0){
          Toast.fail('请选择要替换的课程')
        }else{
          this.valueList = this.valueList.substring(0,this.valueList.length-1)
          this.$router.push({
            path:'/student/score_replace',
            query:{
              'data':this.valueList,
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .score_foot .next_btn{background-color: @attendance-background-color-1;color: @attendance-color-3;height: 44px;width:calc(50% - 10px);border-radius: 4px;}
  .score_Affirmation .score_content{padding: 15px;}
  .score_Affirmation  .course_list{margin-bottom: 75px;}
  .score_Affirmation  .course_list a{border-radius: 5px; width: 100%;display: flex;justify-content: space-between;align-items: center;background: @attendance-background-color-10;padding:10px 20px;
    box-sizing: border-box;color:@attendance-color-2 ;margin-top: 20px;}
  .score_Affirmation  .course_list a h4{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: @attendance-color-1;margin-bottom: 4px;font-size: 16px;line-height: 22px;}
  .score_Affirmation  .course_list a small{color: red;margin-right: 23px;font-size: 12px;}
  .score_Affirmation  .course_list a .icon_right{height: 15px;width: 15px; background: url(../../../../static/img/arrow.png) center center no-repeat;background-size: contain;}
  .score_Affirmation .score_foot{width: 100%;display: flex;justify-content: space-between;position: fixed;bottom: 0px;z-index: 9;background-color: @attendance-color-3;padding: 0 19px;box-sizing: border-box;}
  .score_Affirmation .score_foot .score_btn{width:calc(50% - 10px);height:44px;background:rgba(236,237,253,1);border-radius:4px;font-size:16px;font-family:PingFangSC;
    font-weight:600;color:@attendance-background-color-1;}
  .score_Affirmation .score_foot button{margin:20px 0;}
  .score_Affirmation .el-checkbox__inner{width: 18px;height: 18px;border-radius: 50%;border: 2px solid @attendance-border-color-4}
  .score_Affirmation .el-checkbox__inner::after{left: 5px;top: 2px;border-width: 2px;}
  .score_Affirmation .el-checkbox__input.is-checked .el-checkbox__inner{background: @attendance-background-color-1;border-color:@attendance-background-color-1;}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/score_Affirmation.vue