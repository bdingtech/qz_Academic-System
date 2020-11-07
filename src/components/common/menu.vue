<template>
  <div class="menu-box" @click="routeLink">
    <p>{{title}}</p>
    <i></i>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:""
    },
    route:{
      type:String,
      default:""
    },
    query:{
      type:Object,
      default:() => {}
    }
  },
  data(){
    return{

    }
  },
  methods:{
    routeLink(){
      this.$router.push({
        path:this.route,
        query:this.query
      })
    }
  }
}
</script>
<style scoped lang="less">
.menu-box{
  background-color: @attendance-background-color-10;
  border-radius:5px;
  height:82px;
  margin: 0px 20px 20px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.menu-box::after{
  position: absolute;
  top: 0;
  left: 0;
  background-color: @attendance-background-color-1;
  width: 3px;
  height: 100%;
  content: "";
  border-radius: 5px 0 0 5px;
}
.menu-box p{
  color: @attendance-color-1;
  font-weight: 600;
}
.menu-box i{
  background: url('../../../static/img/arrow.png')no-repeat center;
  width: 9px;
  height: 13px;
  background-size: 100%;
}
</style>


// WEBPACK FOOTER //
// src/components/common/menu.vue