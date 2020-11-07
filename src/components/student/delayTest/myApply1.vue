<template>
  <div>
    <Header title="我的缓考申请"></Header>
    <div class="my-apply1">
      <p class="apply-ttl" :style="this.applyDetail.auditStatus == '通过' ? 'color: #12DDD6;' : 'color:#F86969;'">{{this.applyDetail.auditStatus}}</p>
      <p class="apply-sub">{{this.applyDetail.courseName}}</p>
      <div class="info-text">
        <p>审核人：{{this.applyDetail.shr}}</p>
        <p>申请时间：{{this.applyDetail.applicationTime}}</p>
        <div class="reason">
          <p>缓考原因：</p>
          <p class="reason-txt">{{this.applyDetail.reason}}</p>
        </div>
        <p>学时：{{this.applyDetail.period}}</p>
        <p>学分：{{this.applyDetail.credit}}</p>
        <p>课号：{{this.applyDetail.courseCode}}</p>
        <p>学年学期：{{this.applyDetail.semester}}</p>
        <p>课程性质：{{this.applyDetail.courseNature}}</p>
        <p>考试方式：{{this.applyDetail.examinationNature}}</p>
        <p>成绩标识：{{this.applyDetail.achievementMark}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  export default{
    data(){
      return{
        applyDetail:[]
      }
    },
    created(){
      this.applyDetail = JSON.parse(this.$route.query.data)
    },
  }
</script>

<style lang="less" scoped>
  .my-apply1{padding: 20px;}
  .apply-ttl{font-size: 24px;font-weight: 700;}
  .apply-sub{font-size: 18px;color: @attendance-color-1;font-weight: 700;margin: 20px 0;}
  .my-apply1 .reason{display: flex;}
  .reason-txt{flex: 1;}
  .my-apply1 .info-text{font-size: 14px;color: @attendance-color-2;line-height: 25px;}
</style>



// WEBPACK FOOTER //
// src/components/student/delayTest/myApply1.vue