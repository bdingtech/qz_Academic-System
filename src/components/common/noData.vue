<template>
  <div class="no-data">
      <!-- <img src="../../../static/img/no_data.png"/> -->
      <span>{{title}}</span>
  </div>
</template>

<script>
export default{
  	props:{
      title:{
        type:String,
        default:'暂无数据'
      }
    },
  }
</script>

<style lang="less">
  .no-data{text-align: center;margin: 35% 0;}
  .no-data img{width: 130px;height: 130px;}
  // .no-data span{color: @attendance-color-2;font-size:15px;margin-top: 15px; display: block;}
</style>



// WEBPACK FOOTER //
// src/components/common/noData.vue