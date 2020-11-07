<template>
  <div>
    <Header title="调课审核" type="0" route="/teacher/examine/adjustList" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="center-list">
        <div class="paperClip-circle"></div>
        <img  class="paperClip" src="../../../../assets/images/paperClip.png"/>
        <div class="list-left">  
          <div class="left-title">{{route_tk.kcmc}}</div>
          <div class="left-line">
            <div style="width:40%">
              <span>教师:</span>
              <span style="margin-left: 5px;">{{info.skls}}</span>
            </div>
            <div class="left-line-line">
              <span>调课方式:</span>
              <span style="margin-left: 5px;">{{route_tk.tkfs}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:40%">
              <span>院系:</span>
              <span style="margin-left: 5px;">{{info.dwmc}}</span>
            </div>
            <div class="left-line-line">
              <span>调课类型:</span>
              <span style="margin-left: 5px;">{{route_tk.tklx}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>班级:</span>
              <span style="margin-left: 5px;">{{ route_tk.ktmc}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="center-content-white">
        <div class="white-left">时间模式</div>
        <div class="white-right">{{info.oldkbjcmsid}}</div>
      </div>
      <div class="center-content-white">
        <div class="white-left">上课周次</div>
        <div class="white-right">{{info.ykkzc}}</div>
      </div>
      <div class="center-content-gray">
        <div class="gray-line-one">
          <div class="gray-left">新上课周次</div>
          <div class="gray-right">{{info.xkkzc}}</div>
        </div>
        <div class="gray-line-one">
          <div class="gray-left">待调整周次</div>
          <div class="gray-right" style="color:#757DA3;">{{info.kkzc}}</div>
        </div>
      </div>

      <div class="center-content-gray">
        <div class="gray-line-one">
          <div class="gray-left">时间</div>
          <div class="gray-right">{{info.kcsj}}</div>
        </div>
        <div class="gray-line-one">
          <div class="gray-left" style="text-decoration: line-through;">原时间</div>
          <div
            class="gray-right"
            style="color:#757DA3;text-decoration: line-through;"
          >{{info.ykcsj}}</div>
        </div>
      </div>

      <div class="center-content-gray" v-if="route_tk.tklx =='变更教师'">
        <div class="gray-line-one">
          <div class="gray-left">教师</div>
          <div class="gray-right">{{ jsmc}}</div>
        </div>
        <div class="gray-line-one">
          <div class="gray-left" style="text-decoration: line-through;">原教师</div>
          <div
            class="gray-right"
            style="color:#757DA3;text-decoration: line-through;"
          >{{route_tk.skls}}</div>
        </div>
      </div>

      <div class="center-content-gray">
        <div class="gray-line-one">
          <div class="gray-left">地点</div>
          <div class="gray-right">{{info.xjsmc}}</div>
        </div>
        <div class="gray-line-one">
          <div class="gray-left" style="text-decoration: line-through;">原地点</div>
          <div
            class="gray-right"
            style="color:#757DA3;text-decoration: line-through;"
          >{{info.yjsmc}}</div>
        </div>
      </div>

      <div class="center-content-white">
        <div class="white-left">单双周</div>
        <div class="white-right">{{route_tk.dsz}}</div>
      </div>

      <div class="center-content-white" style="align-items: flex-start;">
        <div class="white-left">调课原因</div>
        <div
          class="white-right"
          style="width: 60%;word-break: break-all;text-align: right"
        >{{info.tkyy}}</div>
      </div>

      <van-button class="bottom-button" type="default" @click="pushExamine">审核</van-button>
    </div>
  </div>
</template>
<script>
// import Header from '../../header.vue'
import { Api } from '@/utils/axios'
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      list: [],
      route_tk: {},
      info: {},
      jsmc:''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {

    async getList() {
      this.route_tk = JSON.parse(decodeURI(this.$route.params.route_params))
      const params = {
        tkid: this.route_tk.ywinstanceid
      }
      const res = await Api.getTkck(params)
      this.info = res.jx0408ttkList[0]
      this.jsmc = res.changeJgnew
      if (this.route_tk.cjr.includes('[')) {
        this.route_tk.cjr = this.route_tk.cjr.split('[')[0]
      }

    },
    pushExamine() {
      this.route_tk.id_sh = this.route_tk.id
      this.route_tk.xq_id = this.route_tk.ywinstanceid
      this.route_tk.sh_flag = '009'
      this.$router.push({ name: 'examineCommom', params: { route: 'adjustListDetail,1', route_params: encodeURI(JSON.stringify(this.route_tk)) } })
    }
  }

}
</script>

<style lang="less" scoped>
.center {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.center-list {
  width: calc(100% - 80px);
  /* background-image: url(../../../../assets/images/card_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%; */
   background: url(../../../../assets/images/card_bg3.png) no-repeat top center;
  background-size: cover;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 20px 20px 18px 20px;
  position: relative;
}
.paperClip {
  position: absolute;
  right: 20px;
  top:20px;
  width: 22px;
  height: 22px;
}
.paperClip-circle {
  position: absolute;
  right: 15px;
  top:15px;
  width: 32px;
  height: 32px;
  border-radius: 30px;
  background: @attendance-background-color-16;
}
.list-left {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.left-title {
  width: 100%;
  font-size: 16px;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.left-line {
  width: 100%;
  font-size: 12px;
  color: rgb(243, 240, 240);
  margin-bottom: 2px;
  display: flex;
}
.center-content-white {
  width: calc(100% - 40px);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.white-left {
  color: @attendance-color-2;
  font-size: 14px;
}
.white-right {
  color: @attendance-color-2;
  font-size: 14px;
  font-weight: 600;
}
.center-content-gray {
  width: calc(100% - 40px);
  margin-bottom: 16px;
  padding: 8px 10px 4px 10px;
  display: flex;
  flex-wrap: wrap;
  background-color: @attendance-background-color-10;
  border-radius: 3px;
  /* align-items: center;
  justify-content: space-between; */
}
.gray-line-one {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.gray-left {
  color: @attendance-color-2;
  font-size: 14px;
}
.gray-right {
  color: @attendance-background-color-12;
  font-size: 14px;
  font-weight: 600;
}
.bottom-button {
  width: calc(100% - 40px);
  background-color: @attendance-background-color-1;
  color: white;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  /* position: absolute; */
  /* bottom: 20px; */
  border-radius: 3px;
}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Examine/class-adjustment/listDetail.vue