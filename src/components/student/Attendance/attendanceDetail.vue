<template>
  <div class="attendance-dtl">
    <Header title="课程详情"></Header>
    <div class="detail">
      <h4>{{detailList.kcjc}}</h4>
      <p><i class="icon1"></i><span>教师：</span>{{detailList.jsxm}}</p>
      <p><i class="icon2"></i><span>教室：</span>{{detailList.jsmc}}</p>
      <p><i class="icon3"></i><span style="min-width:80px;">本课时间：</span>{{detailList.jc}}节，{{detailList.kssj}} -
        {{detailList.jssj}}</p>
      <p><i class="icon4"></i><span>教学周：</span>第{{detailList.kkzc}}周</p>
      <div class="qr-area" @click="checkQr()"></div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="到课详情">
        <div>
          <el-table :data="attendanceList" stripe @cell-click="handle">
            <el-table-column prop="studentName" label="姓名" width="100" sortable>
              <template slot-scope="scope">
                <span style="color:#212F6E;">{{ scope.row.studentName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="studentNumber" label="学号" sortable>
              <template slot-scope="scope">
                <span style="color:#212F6E;">{{ scope.row.studentNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="attendanceResult" label="状态" sortable>
              <template slot-scope="scope">
                <div style="display:flex;align-items:center;justify-content: space-between;">
                  <span :style="'font-weight:600;' + 'color:' + clacResult(scope.row.attendanceResult)">{{ scope.row.attendanceResult == '' ? '未签到' : scope.row.attendanceResult }}</span>
                  <p class="check-attendance" @click="editCheck(scope.row)"></p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 二维码 -->
    <van-overlay :show="codeArea" @click="codeArea = false">
      <div class="wrapper" id="qrcode" ref="qrcode"></div>
    </van-overlay>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="35"
        :default-index="defaultIndex" />
    </van-popup>
  </div>
</template>
<script>
  // import Header from '../header'
  import QRCode from "qrcodejs2"
  import {
    Toast
  } from 'vant'
  export default {
    data() {
      return {
        detailList: [],
        codeArea: false,
        active: 1,
        attendanceList: [],
        defaultIndex: 0,
        showPicker: false,
        columns: [],
        idList: [],
        attendanceResult: '',
        studentId: '',
        week: '',
        qrcodeUrl: '',
      }
    },
    created() {
      this.detailList = JSON.parse(this.$route.query.list)
      this.courseList = this.detailList.jx0408id + ',' +
        this.detailList.xq + ',' +
        this.detailList.jc + ',' +
        encodeURIComponent(this.detailList.kcjc) + ',' +
        encodeURIComponent(this.detailList.jsxm) + ',' +
        encodeURIComponent(this.detailList.jsmc) + ',' +
        this.detailList.kssj + ',' +
        this.detailList.jssj + ',' +
        this.detailList.kkzc + ',' +
        this.week
      this.week = this.$route.query.week
      this.getList()
      this.getStatus()
    },
    mounted() {},
    methods: {
      handle() {

      },
      getQrCode() {
        let qrcode = new QRCode("qrcode", {
          width: 250,
          height: 250,
          text: this.qrcodeUrl + "/index.html#/student/attendance?course=" + this.courseList + "&week=" + this.week, //
          // colorDark : "#000000",
          // colorLight : "#ffffff",
          correctLevel: QRCode.CorrectLevel.Q
        });
      },
      editCheck(e) {
        this.showPicker = true
        this.studentId = e.studentId
      },
      onConfirm(e, i) {
        this.showPicker = false
        this.attendanceResult = this.idList[i]
        this.$axios({
          method: 'post',
          url: '/checkWorkAttendance/saveXskq',
          params: {
            jx0408id: this.detailList.jx0408id,
            zc: this.week,
            xq: this.detailList.xq,
            jc: this.detailList.jc,
            attendanceResult: this.attendanceResult,
            studentId: this.studentId
          }
        }).then(res => {
          this.getList()
          if (res.data.code == '0') {
            Toast.fail(res.data.Msg)
          } else {
            Toast.success(res.data.Msg)
          }
        }).catch(err => {

        })
      },
      clacResult(e) {
        if (e == "正常" || e == "到课") {
          return "#12DDD6"
        } else if (e == '') {
          return "#212F6E"
        } else {
          return "#F86969"
        }
      },
      getList() {
        this.$axios({
          method: 'post',
          url: '/checkWorkAttendance/getKqxs',
          params: {
            jx0408id: this.detailList.jx0408id,
            zc: this.week,
            xq: this.detailList.xq,
            jc: this.detailList.jc
          }
        }).then(res => {
          this.attendanceList = res.data.data
          this.qrcodeUrl = res.data.foreUrl
          this.$nextTick(function() {
            document.querySelector('#qrcode').innerHTML = ''
            this.getQrCode()
          })

        }).catch(err => {

        })
      },
      getStatus() {
        this.$axios({
          method: 'post',
          url: '/checkWorkAttendance/zzdkqbj'
        }).then(res => {
          res.data.data.forEach((item, index) => {
            this.columns[index] = item.dmmc
            this.idList[index] = item.dm
          });
        }).catch(err => {

        })
      },
      checkQr() {
        this.codeArea = true
      }
    }
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
    width: fit-content;
    position: relative;
  }

  .detail>h4::after {
    height: 11px;
    content: '';
    position: absolute;
    background-color: @attendance-background-color-5;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }

  .detail>p {
    display: flex;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 23px;
  }

  .detail>p>span {
    font-weight: 400;
    color: @attendance-color-2;
    flex-wrap: nowrap;
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

  .wrapper>img {
    padding: 10px;
    background-color: @attendance-color-3;
  }

  .check-attendance {
    background: url(../../../../static/img/edit.png)no-repeat center;
    width: 16px;
    height: 16px;
    background-size: 100%;
  }

  .attendance-dtl .van-popup.van-popup--bottom {
    border-radius: 5px 5px 0 0;
  }

  /* box-shadow:0px -2px 2px 0px rgba(223,223,223,0.5); */
  .attendance-dtl .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }

  .attendance-dtl .van-picker__columns::before {
    width: 120px;
    height: 1px;
    background-color: @attendance-background-color-2;
    content: '';
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%)
  }

  .attendance-dtl .van-picker__columns::after {
    width: 120px;
    height: 1px;
    background-color: @attendance-background-color-2;
    content: '';
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%)
  }

  .attendance-dtl .van-ellipsis.van-picker-column__item.van-picker-column__item--selected {
    color: @attendance-color-1;
    font-weight: 600;
  }
</style>



// WEBPACK FOOTER //
// src/components/student/Attendance/attendanceDetail.vue