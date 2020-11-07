<template>
  <div>
    <Header title="课程签到"></Header>
    <div class="detail">
      <h4>{{decodeURIComponent(detailList[3])}}</h4>
      <p><i class="icon1"></i><span>教师：</span>{{decodeURIComponent(detailList[4])}}</p>
      <p><i class="icon2"></i><span>教室：</span>{{decodeURIComponent(detailList[5])}}</p>
      <p><i class="icon3"></i><span>本课时间：</span>{{decodeURIComponent(detailList[9])}}节，{{detailList[6]}} -
        {{detailList[7]}}</p>
      <p><i class="icon4"></i><span>教学周：</span>第{{detailList[8]}}周</p>
    </div>
    <div class="stu-info">
      <input type="text" v-model="studentNum" placeholder="请输入你的学号">
    </div>
    <button class="sign-btn" @click="signTap()">签到</button>
  </div>
</template>
<script>
  // import Header from '../header.vue'
  import {
    Toast
  } from 'vant'
  import {
    Api
  } from '../../../utils/axios'
  export default {
    data() {
      return {
        detailList: [],
        studentNum: ''
      }
    },
    created() {
      this.detailList = this.$route.query.course.split(",")
    },
    methods: {
      signTap() {
        if (this.studentNum == '') {
          Toast.fail("请填写学号")
        } else {
          this.saveTap()
        }
      },
      async saveTap() {
        const params = {
          jx0408id: this.detailList[0],
          zc: this.$route.query.week,
          xq: this.detailList[1],
          jc: this.detailList[2],
          xh: this.studentNum,
          isdqrq: this.$route.query.isdqrq
        }
        const res = await Api.checkWorkAttendanceSaveXsqd(params)
        if (res.code == "0") {
          Toast.fail(res.Msg)
        } else {
          Toast.success(res.Msg)
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .detail {
    padding: 8px 20px;
    color: @attendance-color-1;
    position: relative;
  }

  .qr-area {
    position: absolute;
    width: 100px;
    height: 49px;
    background: url(../../../../static/img/qr_code.png)no-repeat center;
    background-size: 100%;
    right: 16px;
    top: 51px;
  }

  .detail>h4 {
    font-size: 24px;
    margin-bottom: 21px;
  }

  .detail>p {
    display: flex;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .detail>p>span {
    font-weight: 400;
    color: @attendance-color-2;
  }

  .detail i {
    width: 22px;
    height: 23px;
    margin-right: 8px;
  }

  .detail i.icon1 {
    background: url(../../../assets/images/icon_people2.png)no-repeat center;
    background-size: 22px 23px;
  }

  .detail i.icon2 {
    background: url(../../../assets/images/address_icon2.png)no-repeat center;
    background-size: 22px 23px;
  }

  .detail i.icon3 {
    background: url(../../../assets/images/time_icon2.png)no-repeat center;
    background-size: 22px 23px;
  }

  .detail i.icon4 {
    background: url(../../../assets/images/date_icon2.png)no-repeat center;
    background-size: 22px 23px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .stu-info {
    margin: 0px 20px;
  }

  .stu-info>input {
    background-color: @attendance-background-color-6;
    width: 100%;
    padding: 11px 13px;
    box-sizing: border-box;
    border-radius: 3px;
    color: @attendance-color-1;
  }

  .sign-btn {
    background-color: @attendance-background-color-1;
    padding: 11px 13px;
    box-sizing: border-box;
    border-radius: 3px;
    color: @attendance-color-3;
    width: calc(100% - 40px);
    position: relative;
    left: 20px;
    /* top: calc(100vh - 400px); */
    top: 150px;
  }

  .sign-btn:active {
    background-color: rgba(116, 105, 248, .8);
  }
</style>



// WEBPACK FOOTER //
// src/components/student/Attendance/attendanceRate.vue