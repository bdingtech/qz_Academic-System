<template>
  <div class="header">
    <div
      @click="type == '0' ? pushBack(route) : !casLogin === true ? back() : ''"
    >
      <i class="back" v-if="!casLogin"></i>
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "type", "route", "casLogin"],
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    pushBack(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped lang="less">
.header > div {
  display: flex;
  padding-left: 20px;
}
.header {
  display: flex;
  align-items: center;
  height: 50px;
  // background-color: @attendance-color-3;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // background-color: @attendance-color-3;
  z-index: 999;
}
.header h3 {
  line-height: 18px;
}
.header .back {
  width: 20px;
  height: 20px;
  margin: 0 10px 0 0px;
  // background: url(../../../static/img/back.png) no-repeat center center;
  background-size: 10px 18px;
}
</style>

// WEBPACK FOOTER // // src/components/common/header.vue
