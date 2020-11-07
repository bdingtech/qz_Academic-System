<template>
  <div>
    <Header title="教材查询"></Header>
    <div class="content_ textbook_Details" style="padding: 10px 20px;box-sizing: border-box;">
      <h3>{{this.infoList.teachingMaterialName}}</h3>
      <p>ISBN书号：<span>{{this.infoList.isbn}}</span></p>
      <p>出版社：<span>{{this.infoList.publishingHouse}}</span></p>
      <p>作者：<span>{{this.infoList.author}}</span></p>
      <p>版次：<span>{{this.infoList.edition}}</span></p>
      <p>单价：<span>{{this.infoList.unitPrice}}元</span></p>
      <p style="margin-top: 20px;">课程名称：<span>{{this.infoList.courseName}}</span></p>
      <p>课程性质：<span>{{this.infoList.courseNature}}</span></p>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  export default {
    data(){
      return{
        infoList:[]
      }
    },
    created(){
      this.infoList = JSON.parse(this.$route.query.info)
    },
  }
</script>

<style lang="less">
  .textbook_Details h3{font-size:18px;color: @attendance-color-1;line-height: 25px;margin-bottom: 8px;}
  .textbook_Details p{font-size:14px;color: @attendance-color-2;line-height: 20px;margin-bottom: 8px;}
  .textbook_Details p span{font-weight: 700;}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Textbook/textbook_Details.vue