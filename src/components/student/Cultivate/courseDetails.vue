<template>
  <div>
    <Header title="课程详情"></Header>
    <div class="courseDetails content_">
      <h3>{{this.detailList.courseName}}</h3>
      <ul>
        <li>课号：{{this.detailList.courseCode}}</li>
        <li>属性：{{this.detailList.courseAttribute}}</li>
        <li>开设学期：{{this.detailList.openSemester}}</li>
        <li>学分：{{this.detailList.credit}}</li>
        <li>总学时：{{this.detailList.totalHours}}</li>
        <li v-if="this.detailList.classHourClassification">{{this.detailList.classHourClassification[0].name}}：{{this.detailList.classHourClassification[0].classHour}}</li>
        <li v-if="this.detailList.classHourClassification">{{this.detailList.classHourClassification[1].name}}：{{this.detailList.classHourClassification[1].classHour}}</li>
        <li v-if="this.detailList.classHourClassification">{{this.detailList.classHourClassification[2].name}}：{{this.detailList.classHourClassification[2].classHour}}</li>
        <li v-if="this.detailList.classHourClassification">{{this.detailList.classHourClassification[3].name}}：{{this.detailList.classHourClassification[3].classHour}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
  // import Header from '../header.vue'
  export default {
    data(){
      return{
        detailList:[]
      }
    },
    created(){
      this.detailList = JSON.parse(this.$route.query.data)
    },
    
  }

</script>

<style lang="less" scoped>
  .courseDetails h3{
    font-size: 18px;
    color: @attendance-color-1;
    line-height:30px;
  }
  .courseDetails ul li{
    font-size: 14px;
    color: @attendance-color-2;
    line-height:24px;
  }
</style>



// WEBPACK FOOTER //
// src/components/student/Cultivate/courseDetails.vue