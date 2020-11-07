<template>
  <div>
    <Header title="随堂考试申请" :casLogin="true" ></Header>
    <div class="sub_succeed">
      <div style="color: #757DA3;font-size: 24px;line-height: 35px;">申请已提交</div>
      <p style="color: #757DA3;font-size: 16px;line-height: 22px;">您的提交已送达管理端，请等待通知。</p>
      <div class="icon_succeed"></div>
    </div>
    <div class="sub_succeed_foot">
      <button class="back_btn" @click="back()">知道了</button>
    </div>
    <div class="tips">点击“知道了”返回</div>
  </div>
</template>

<script>
// import Header from '../../header.vue'
export default {
	
  methods: {
    back() {
      this.$router.push({ name: 'classList' });
    }
  }

}
</script>


<style lang="less" scoped>
.sub_succeed {
  padding: 3px 40px;
  box-sizing: border-box;
}
.sub_succeed .icon_succeed {
  width: 120px;
  height: 120px;
  background: url(../../../../../static/img/succeed.png) no-repeat center center;
  background-size: contain;
  margin: 60px auto;
}
.back_btn {
  width: 100%;
  height: 44px;
  background: rgba(116, 105, 248, 1);
  border-radius: 3px;
  color: @attendance-color-3;
  font-size: 16px;
}
.sub_succeed_foot {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
}
.tips {
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: @attendance-color-2;
  margin-top: -55px;
}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Examination/classroom-test/applySuccess.vue