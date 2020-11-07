<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import { Loading } from 'vant';
export default {
  name: 'App',
}
</script>

<style>
  /* @import url("assets/css/main.css");
  .arrow_link{background: url(../static/img/arrow.png)no-repeat center;width: 7px;height: 11px;background-size: 7px 11px;}
  *{font-family:PingFangSC;} */
</style>



// WEBPACK FOOTER //
// src/App.vue