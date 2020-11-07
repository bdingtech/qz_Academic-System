<template>
  <div class="about">
    <Header title = "关于我们"></Header>
    <div class="about-img">
      <img src="../../../static/img/about.png" alt="">
      <p>智慧校园移动平台</p>
    </div>
    <p class="about-net">www.qzdatasoft.com</p>
  </div>
</template>

<script>
  // import Header from '../student/header.vue'
  export default{
    data(){
      return{

      }
    },
  }
</script>

<style scoped lang="less">
  .black-title{display: flex;align-items: center;}
  .black-title img{width: 30px;height: 30px;}
  .about-img{text-align: center;position: absolute;top: 45%;transform: translateY(-50%);width: 100%;}
  .about-img img{width: 50%;}
  .about-img p{color: @attendance-color-2;font-size: 14px;margin-top: 8px;}
  .about-net{color: @attendance-color-6;font-size: 14px;text-align: center;position: absolute;bottom: 70px;width: 100%;}
</style>






















// WEBPACK FOOTER //
// src/components/pages/About.vue