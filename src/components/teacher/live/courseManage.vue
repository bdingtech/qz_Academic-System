<template>
  <div>
    <Header title="课堂管理" type="0" route="/homeIndex"></Header>
    <router-link class="course-item" v-for="(item,index) in list" :key="index" :to="item.path">
      <p>{{item.name}}</p>
      <i></i>
    </router-link>
  </div>
</template>
<script>
// import Header from '../header.vue'
export default {
  data(){
    return{
      list:[{
        name:'专家听课',
        path:'/teacher/expertLecture'
      }]
    }
  },
}
</script>
<style lang="less" scoped>
  .course-item{background-color: @attendance-background-color-10;border-radius: 5px;height: 82px;margin: 20px 20px 0;width: calc(100% - 40px);
    display: flex;align-items: center;color: @attendance-color-1;font-weight: 700;padding: 0 20px;box-sizing: border-box;position: relative;justify-content: space-between;}
    .course-item>i{background: url(../../../../static/img/arrow.png)no-repeat center;width: 7px;height: 11px;background-size: 7px 11px;}
  .course-item::after{position: absolute;width: 3px;height: 100%;content: '';background-color: @attendance-background-color-1;border-radius: 5px 0 0 5px;left: 0;}
</style>


// WEBPACK FOOTER //
// src/components/teacher/live/courseManage.vue