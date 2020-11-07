<template>
  <div>
    <Header title="成绩认定"></Header>
    <div class="score_confirm">
      <div>
        <h2 :style="this.infoList.auditStatus == '审核中' ? 'color:@attendance-background-color-1' :(this.infoList.auditStatus == '通过' ? 'color:#12DDD6' :'color:#F86969')">{{this.infoList.auditStatus}}</h2>
        <h4>{{this.infoList.courseName}}</h4>
        <p>课程代码：<span>{{this.infoList.courseCode}}</span> </p>
        <p>原始学期：<span>{{this.infoList.semester}}</span></p>
        <p>学分：<span>{{this.infoList.credit}}</span></p>
        <p>属性：<span>{{this.infoList.curriculumAttributes}}</span></p>
        <p style="margin-top: 20px;">替换课程：<span>{{this.infoList.substitutionCourseName}}</span></p>
        <p>课程代码：<span>{{this.infoList.substitutionCourseCode}}</span></p>
        <p>学年学期：<span>{{this.infoList.substitutionSemester}}</span></p>
        <p>学分：<span>{{this.infoList.substitutionCredit}}</span></p>
        <p>属性：<span>{{this.infoList.substitutionAttributes}}</span></p>
      </div>
    </div>
    <div class="send-button" v-if="this.infoList.auditStatus == '未送审'">
      <p>请确认信息无误后再提交</p>
      <button @click="sendApply()">送审</button>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import { Toast } from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        infoList:[],
      }
    },
    created(){
      this.getList()
    },
    methods:{
      async getList(){
        const params = {
          cjrd02id:this.$route.query.info
        }
        const res = await Api.getMyApplyDetailed(params)
        this.infoList = res.data[0]
      },
      async sendApply(){
        const params = {
          ywcode:'011',
          ywid:this.$route.query.info,
          userids:''
        }
        const res = await Api.submitCensorshipApi(params)
        if(res.data.code == '1'){
          Toast.success('送审成功~')
          this.$router.push('/student/score_apply')
        }
      }
    },

  }
</script>

<style lang="less" scoped>
  .score_confirm{padding: 10px 20px;box-sizing: border-box;}
  .score_confirm h2{font-size: 24px;padding-bottom: 10px;}
  .score_confirm h4{color: @attendance-color-1;font-size: 18px;padding: 10px 0;}
  .score_confirm p{color: @attendance-color-2;font-size: 14px;padding: 5px 0;}
  .score_confirm p span{font-weight: 700;}
  .send-button{position: absolute;width: 100%;bottom: 20px;padding: 0 20px;box-sizing: border-box;}
  .send-button button{background-color: @attendance-background-color-1;color: @attendance-color-3;border-radius: 4px;padding: 11px 0;width: 100%;}
  .send-button p{color: @attendance-color-2;font-size: 12px;margin-bottom: 5px;text-align: center;}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/score_confirm.vue