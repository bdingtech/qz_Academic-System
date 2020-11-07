<template>
  <div class="stop-item">
    <Header title="停课申请"></Header>
    <div class="P_boxs">
      <p>{{item.courseName}}</p>
      <p>
        周次：
        <span>{{item.week}}</span>
      </p>
      <p>
        时间：
        <span>{{item.weekNote}}</span>
      </p>
      <p>
        地点：
        <span>{{item.classRoom}}</span>
      </p>
      <p>
        <span class="fl_span">班级：</span>
        <span class="technology">{{item.className}}</span>
      </p>
    </div>
    <div class="stop">
      <span class="my_sp">
        <div class="flex_item">
          <i>
            <img src="../../../assets/images/content_icon2.png" alt class="my_img" />
          </i>
          <span>停课周次</span>
        </div>
        <div>
          <input
            type="text"
            @click="showPicker1 = true"
            readonly
            v-model="valuess"
            class="pick-input"
            placeholder="请选择"
          />
          <span :class="valuess == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
        </div>
      </span>
      <span class="my_sp">
        <div class="flex_item">
          <i>
            <img src="../../../assets/images/icon_people2.png" alt class="my_img" />
          </i>
          <span>审核人</span>
        </div>
        <div>
          <input
            type="text"
            @click="showPicker2 = true"
            readonly
            v-model="values"
            class="pick-input"
            placeholder="请选择"
          />
          <span :class="values == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
        </div>
      </span>
      <!-- <span class="my_sp">
				<div class="flex_item"><i><img src="../../../assets/images/icon_phone2.png" alt="" class="my_img"></i><span>联系电话</span></div>
				<div>
					<input type="text" v-model="phone" class="fr_data" placeholder="请点击填写">
				</div>
      </span>-->
      <span class="my_sp">
        <div class="flex_item">
          <i>
            <img src="../../../assets/images/icon_why2.png" alt class="my_img" />
          </i>
          <span>调课原因</span>
        </div>
        <div>
          <textarea
            name
            id
            cols="30"
            rows="10"
            class="fr_date"
            placeholder="请点击填写"
            v-model="textarea"
          ></textarea>
        </div>
      </span>
    </div>
    <div class="submit">
      <button @click="fn1()" :disabled="isDisabled">提交申请</button>
    </div>
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns1"
        @cancel="showPicker1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>
    <van-popup v-model="showPicker2" position="bottom">
      <div class="apply-pop">
        <div class="pop-title">
          <i class="close-icon" @click="showPicker2 = false"></i>
          <p>审核人</p>
          <i class="confirm-icon" @click="resetCancel()"></i>
        </div>
        <div class="person">
          <button
            class="per-btn"
            ref="person"
            @click="personTap($event,index)"
            v-for="(item,index) in columns2"
            :key="item.id"
          >{{item.name}}</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// // import Header from '../header.vue'
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
export default {
  data() {
    return {
      isDisabled: false,
      option: [{
        values: '',
        labels: ''
      }],
      //停课周次
      columns1: [],
      //审核人
      columns2: [{
        id: '',
        name: '全部',
        isBtn: 0,
      }],
      item: {},
      showPicker1: false,
      showPicker2: false,
      values: '',
      valuess: "",
      phone: '',
      textarea: '',
      StopList: '',
      coursePlanId: '',
      weekNote: '',
      week: '',
      oldWeek: '',
      className: '',
      time: '',
      address: '',
      classNames: '',
      semesterId: '',
      stopList: [],
      dm: '',
      shrList: [],
      shr: '',
      pickType: '',
      reset:"",
      resetId:''
    };
  },
  methods: {
    resetCancel(){
      this.showPicker2= false
      this.values = this.reset
      this.shr = this.resetId
    },
    personTap(e, res) {
      let strList = []
      let idList = []
      if (this.columns2[res].isBtn == 0) {
        this.columns2[res].isBtn = 1
        e.target.className = 'cur'
      } else if (this.columns2[res].isBtn == 1) {
        this.columns2[res].isBtn = 0
        e.target.className = 'per-btn'
      }
      for (let i in this.columns2) {
        if (this.columns2[res].name == '全部') {
          this.columns2[i].isBtn = 0;
          this.columns2[res].isBtn = 1
          this.$refs.person[res].className = 'cur'
          this.$refs.person[i].className = 'per-btn'
        } else {
          this.columns2[0].isBtn = 0;
          this.$refs.person[0].className = 'per-btn'
        }
        if (this.columns2[i].isBtn == 1) {
          strList = strList.concat(this.columns2[i].name)
          idList = idList.concat(this.columns2[i].id)
        }
      }
      this.reset = strList.toString();
      this.resetId = idList.toString();
    },
    //教学变更周次
    onConfirm1(value1, index) {
      this.valuess = '第' + value1 + '周';
      this.showPicker1 = false;
      this.week = value1;
    },
    async fn1() {
      if (this.valuess !== '' && this.textarea !== '') {
        var formData = {}
        formData.coursePlanId = this.item.coursePlanId;//课表id
        formData.changeType = this.pickType;//调课类型
        formData.weekNote = this.item.weekNote;//星期节次
        formData.week = this.week;//周次
        formData.changeMode = this.dm;//调课方式
        formData.oldWeek = this.item.week;//原周次
        formData.userIds = this.shr;//审核人IDS
        formData.applyReason = this.textarea;//调课原因
        // formData = JSON.stringify(formData)
        // formData = JSON.parse(formData)
        this.isDisabled = true;
        const data = formData
        const res = await Api.saveTransferApplication(data)
        if (res.errorCode == 'fail') {
          Toast.fail(res.errorMessage);
        } else {
          Toast.success('申请成功')
          this.Submitlist = res.data;
          setTimeout(() => {
            this.$router.push({
              path: '/record4',
              query: {
                'week': this.valuess,
                'people': this.values,
                // 'phone':this.phone,
                'why': this.textarea,
                'weeks': this.week,
                'time': this.item.weekNote,
                'teachingBuildingName': this.item.classRoom,
                'className': this.item.className
              }
            })
          }, 1500)
        }
      } else {
        Toast.fail('选项不能为空');
      }
    },
    async Stoplesson() {
      const params = {
        semester: this.semesterId,
      }
      const res = await Api.getTeachingWeek(params)
      this.stopList = res.data
    },
    async getWeek() {
      const params = {
        semester: ""
      }
      const res = await Api.getTeachingWeek(params)
    },
    async getPeople() {
      let concatList4 = []
      const params = {
        ywcode: '009',
        ywid: this.noticeId
      }
      const res = await Api.selectReviewerApi(params)
      res.data.forEach((item, index) => {
        concatList4[index] = {
          name: item.userrealname,
          id: item.userid,
          isBtn: 0,
        }
      });
      this.columns2 = this.columns2.concat(concatList4);
    }
  },
  created() {
    this.item = this.$route.query.item;
    this.dm = this.$route.query.dm;
    this.Stoplesson();
    this.pickType = this.$route.query.type;
    //停课周次
    // this.getWeek()
    let range = this.item.weekDetail.match(/\d?(.\d+)?/ig);
    for (let j = 0; j < range.length; j++) {
      if (range[j] != '') {
        this.columns1.push(range[j].substr(1, range[j].length))
      }
    }
    //审核人
    this.getPeople()
  },
};
</script>

<style lang="less" scoped>
/* 审核人 */
.stop-item .close-icon {
  background: url(../../../../static/img/close.png) no-repeat center;
}
.stop-item .confirm-icon {
  background: url(../../../../static/img/confirm.png) no-repeat center;
}
.stop-item .pop-title i {
  width: 22px;
  height: 22px;
  background-size: 22px 22px;
  padding: 10px;
}
.stop-item .pop-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
}
.stop-item .person {
  padding: 57px 15px 15px 15px;
}
.stop-item .person button {
  border-radius: 3px;
  padding: 5px 15px;
  margin-right: 12px;
  margin-bottom: 10px;
}
.stop-item .apply-pop .person .per-btn {
  background-color: #ecedfd;
  color: #7469f8;
}
.stop-item .person .cur {
  background-color: #7469f8;
  color: #ecedfd;
}
.stop-item .van-popup.van-popup--bottom .van-picker .van-picker-column {
  position: relative;
}
.stop-item .van-popup.van-popup--bottom .van-picker .van-picker-column::before {
  position: absolute;
  content: '';
  width: 100px;
  height: 35px;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
  border-top: 1px solid #dfe0e6;
  border-bottom: 1px solid #dfe0e6;
}
.stop-item
  .van-ellipsis.van-picker-column__item.van-picker-column__item--selected {
  color: #212f6e;
  font-weight: 600;
}
.P_boxs {
  width: 90%;
  margin-left: 5%;
}
.P_boxs > p {
  color: #757da3;
  font-size: 14px;
  margin-top: 8px;
}
.P_boxs > p:nth-child(1) {
  color: #212f6e;
  font-size: 18px;
  font-weight: 600;
}
.P_boxs > p .technology {
  width: 294px;
  height: 40px;
  /* display: inline-block; */
}
.stop {
  width: 90%;
  margin-left: 5%;
}
.stop > p {
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  border-bottom: 1px solid #f4f4f4;
}
.stop > p span {
  color: #212f6e;
  font-size: 16px;
}
/* .cho>p:nth-child(2) input{
		width: 155px;
	} */
.stop > p i {
  display: inline-block;
  width: 22px;
  height: 22px;
}
.stop > p i img {
  width: 100%;
  vertical-align: middle;
}
.fr_date {
  float: right;
  width: 150px;
  height: 40px;
  text-align: right;
  border: none !important;
  color: #212f6e;
  font-size: 16px;
}
.el-input__inner {
  width: 150px;
}
.fl_span {
  float: left;
}
.stop textarea {
  text-align: right;
  width: 200px;
  color: gray;
}
.stop .fr_dat {
  text-align: center;
  float: right;
  width: 150px;
  color: gray;
}
.stop input::-webkit-input-placeholder,
.stop textarea::-webkit-input-placeholder {
  text-align: right;
  color: #dfe0e6;
  font-size: 16px;
}
.submit {
  width: calc(100% - 40px);
  margin: 0 20px;
  /* margin-top: 140px; */
  position: fixed;
  bottom: 20px;
}
.submit button {
  display: block;
  text-align: center;
  line-height: 40px;
  width: 100%;
  height: 40px;
  color: #ffffff;
  background: #7469f8;
  font-size: 16px;
  border-radius: 3px;
}
.el-message {
  margin-top: -20px;
}
.el-input__inner {
  border: none;
}
.stop .my_sp {
  display: inline-block;
  width: 100%;
  height: 41px;
  line-height: 40px;
  margin-top: 12px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  justify-content: space-between;
}
.stop .my_sp > div:last-child {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.stop .my_sp input::-webkit-input-placeholder {
  color: #dfe0e6;
  /* text-align: right */
  text-indent: 110px;
}
.stop .my_sp input {
  color: #212f6e;
  width: 87%;
  text-indent: 30px;
  text-align: right;
  font-weight: 600;
  padding-right: 5px;
}
.stop .my_sp .fr_span {
  width: 15px;
  height: 20px;
  background: url(../../../assets/images/left_icon.png) center center no-repeat;
  background-size: 100%;
  vertical-align: middle;
}
.stop .my_sp .fr_span_act {
  width: 8px;
  height: 20px;
  background: url(../../../../static/img/arrow.png) center center no-repeat;
  background-size: 100%;
  vertical-align: middle;
}
.stop .my_sp .flex_item {
  float: left;
}
.stop .my_sp .flex_item i {
  width: 22px;
  height: 22px;
  margin-bottom: 17px;
}
.stop .my_sp .flex_item i .my_img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
}
.stop .my_sp .flex_item span {
  color: #212f6e;
}
.stop-item .van-picker__cancel {
  background: url(../../../assets/images/err.png) no-repeat center center;
  background-size: 20px 20px;
  color: rgba(0, 0, 0, 0);
}
.stop-item .van-picker__confirm {
  background: url(../../../assets/images/success.png) no-repeat center center;
  background-size: 20px 20px;
  color: rgba(0, 0, 0, 0);
}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/stop.vue