<template>
  <div>
    <router-view></router-view>
    <v-tabbar></v-tabbar>
  </div>
</template>

<script>
  import vTabbar from './Tabbar'
  export default {
    data(){
      return{

      }
    },
    components:{
      vTabbar:vTabbar
    }
  }
</script>

<style>
</style>



// WEBPACK FOOTER //
// src/components/common/Index.vue