<template>
  <div>
    <Header title="专家听课" type="0" route="/teacher/expertLecture"></Header>
    <template>
      <div class="result-item" v-for="(item,index) in lectureList" :key="index" @click="liveDetail(item)">
        <div class="left-item">
          <p>{{item.kcmc}}</p>
          <span style="margin-bottom:2px;">教师：{{item.xm}}</span>
          <span>时间：{{item.kcsj}}</span>
        </div>
        <div class="right-item" v-show="item.zbxx.iszb == '1'">
          <span>直播中</span>
          <!-- <p><span>25</span>/50</p> -->
        </div>
        <div class="right-item" v-show="item.zbxx.iszb == '0'">
          <button :style="item.zpf == '' ? 'background-color: #7469F8;' : 'background-color: #F86969;'" @click.stop="goEva(item)">{{item.zpf == '' ? '督导' : item.zpf}}</button>
        </div>
      </div>
    </template>
    <!-- <noData v-else title="暂无数据~"></noData> -->
    <!-- pop -->
    <van-popup v-model="popShow" class="pop">
      <h4>{{popList.kcmc}}</h4>
      <p>时间：<span>{{popList.kcsj}}</span></p>
      <p>地点：<span>{{popList.dd}}</span></p>
      <p>教师：<span>{{popList.xm}}</span></p>
      <p>教学周：<span>第{{popList.jxz}}周</span></p>
      <p v-if="isLive.iszb == '1'">直播会议号：<span>{{isLive.password}}</span></p>
      <p v-if="isLive.iszb == '1'">直播会议密码：<span>{{isLive.password}}</span></p>
      <button @click="confirmLive(isLive)">{{isLive.iszb && isLive.iszb	== '1' ? '进入直播' : '确定'}}</button>
    </van-popup>
  </div>
</template>
<script>
import {Api} from '../../../utils/axios'
// import Header from '../header.vue'
export default {
  data(){
    return{
      popShow:false,
      popList:[],
      lectureList:[],
      isLive:[]
    }
  },
  methods:{
    liveDetail(e){
      this.popList = e;
      this.isLive = e.zbxx;
      this.popShow = true;
    },
    confirmLive(e){
      if(e.iszb == '1'){
        window.location.href = e.shareUrl;
      }
      this.popShow = false;
    },
    goEva(e){
      this.$router.push({
        path:'/teacher/supervised',
        query:{
          'val':JSON.stringify(e)
        }
      })
    },
    async getList(){
      const params = {
        semester:this.$route.query.semester,
        TK01ID:this.$route.query.type,
        TK05ID:this.$route.query.pc,
        zc:this.$route.query.zc
      }
      const res = await Api.supervisorGetddkclist()
      this.lectureList = res.data
    }
  },
  created(){
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.result-item{background-color: @attendance-background-color-10;border-radius: 5px;display: flex;justify-content: space-between;padding: 0 20px;box-sizing: border-box;
  margin: 20px 20px 0;width: calc(100% - 40px);height: 82px;}
  .result-item>div{display: flex;flex-direction: column;justify-content: center;}
  .result-item .left-item>p{color: @attendance-color-1;font-weight: 700;line-height: 22px;margin-bottom: 4px;}
  .result-item .left-item>span{color: @attendance-color-2;font-size: 12px;line-height: 17px;}
  .result-item .right-item>span{color: @attendance-background-color-1;font-size: 14px;line-height: 20px;}
  .result-item .right-item>p{font-size: 12px;color: @attendance-border-color-4;line-height: 20px;}
  .result-item .right-item>p>span{font-size: 14px;color: @attendance-background-color-12;font-weight: 700;}
  .result-item .right-item>button{width: 70px;height: 42px;color: @attendance-color-3;font-size: 14px;border-radius: 5px;font-weight: 700;}
  /* pop */
  .pop.van-popup.van-popup--center{border-radius: 5px;padding: 20px;box-sizing: border-box;width: calc(100% - 40px)}
  .pop>h4{color: @attendance-color-1;font-weight: 700;line-height: 22px;margin-bottom: 20px;}
  .pop>p{color: @attendance-color-2;line-height: 22px;margin-bottom: 8px;}
  .pop>p>span{font-weight: 700;}
  .pop>button{height:44px;background:rgba(236,237,253,1);border-radius:3px;color: @attendance-background-color-1;width: 100%;margin-top: 60px;}
</style>


// WEBPACK FOOTER //
// src/components/teacher/live/lectureResult.vue