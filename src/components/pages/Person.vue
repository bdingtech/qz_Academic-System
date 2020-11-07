<template>
  <div class="person">
    <p class="black-title">我的</p>
    <div class="per-bg">
      <van-image width="80" height="80" :src="headPic" round fit="cover" class="per-head"/>
      <p class="per-name" v-if="this.Identity == '1'||this.Identity == '2'" >{{this.Mine.name}}</p>
      <p class="per-name" v-if="this.Identity == '0'">管理员</p>
      <div class="per-info">
        <img :src="this.Mine.gender == '男' ? 'static/img/male.png' : 'static/img/female_1.png'"/>
        <p>{{this.Mine.dateBirth}}</p>
      </div>
      <div class="info-detail">
        <div class="info-item">
          <p class="item-name">学校：</p>
          <span>{{this.Identity == '1'? this.Mine.schoolName : this.Mine.school}}</span>
        </div>
        <div class="info-item">
          <p class="item-name">院系：</p>
          <span>{{this.Mine.academy}}</span>
        </div>
        <div>
          <div class="info-item"  v-if="this.Identity == '2'">
            <p class="item-name">班级：</p>
            <span>{{this.Mine.className}}</span>
          </div>
          <div class="info-item" v-if="this.Identity == '2'">
            <p class="item-name">入学年份：</p>
            <span>{{this.Mine.inGrade}}</span>
          </div>
          <div class="info-item">
            <p class="item-name">{{this.Identity == '2' ? '学号：' : '工号：'}}</p>
            <span>{{this.Identity == '1'? this.Mine.jobNumber : this.Mine.studentID}}</span>
          </div>
        </div>
      </div>
    </div>
    <router-link class="grey-contain" to="/about" tag="div">
      <p>关于我们</p>
      <!-- <i class="arrow_link"></i> -->
    </router-link>
    <router-link class="grey-contain" to="/forget" tag="div">
      <p>忘记密码</p>
    </router-link>
    <!-- <router-link class="grey-contain" to="/untied" tag="div" v-if="isNeedLogout && isNeedLogout == 1">
      <p>修改密码</p>
    </router-link> -->
    <!-- /untied -->
    <div class="grey-contain" @click="untiedWeChatTap()" v-if="isWechat && isWechat == 1">
      <p>解绑微信</p>
      <i class="arrow"></i>
    </div>
    <div class="grey-contain" @click="exitLog()" v-if="isNeedLogout && isNeedLogout == 1">
      <p>注销</p>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { Api } from '../../utils/axios'
  export default{
    data(){
      return{
        isWechat:sessionStorage.getItem('isWechat'),
        isNeedLogout:sessionStorage.getItem('isNeedLogout'),
        Identity:sessionStorage.getItem('Identity'),
        Mine:[],
        headPic:require('../../../static/img/head.jpeg')
      }
    },
    created(){
      if(this.Identity == '1'){
        this.teaInfo()
      }
      if(this.Identity == '2'){
        this.stuInfo()
      }
    },
    methods:{
      async stuInfo(){
        const res = await Api.getStuInfo()
        this.Mine = res.data[0];
      },
      async teaInfo(){
        const res = await Api.getTeaInfo()
        this.Mine = res.data[0];
      },
      async untiedWeChat(){
        const res = await Api.untiedWeChat()
        if(res.code == 0 && res.Msg == 'error'){
          Toast("暂未绑定任何微信账号")
        }else if(res.code == 1){
          Toast.success("解绑成功!")
        }
      },
      exitLog(){
        Dialog.confirm({
          message: '确认注销？'
        }).then(() => {
          sessionStorage.removeItem("Token");
          this.$router.replace('/login');
        }).catch(() => {
          // on cancel
        });
      },
      untiedWeChatTap(){
        Dialog.confirm({
          message: '确认解绑微信？'
        }).then(() => {
          this.untiedWeChat()
        }).catch(() => {
          // on cancel
        });
      }
    },
    components: {
      [Dialog.Component.name]: Dialog.Component
    }
  }
</script>

<style scoped lang='less'>
  .per-head{width: 80px;height: 80px;border-radius: 50%;border: 2px solid @attendance-background-color-12;position: absolute;top: 16px;right: 16px;}
  .per-bg{position: relative;margin: 8px 20px;background: url(../../../static/img/per_bg.png)no-repeat center;min-height: 186px;background-size: 100% 100%;color: @attendance-color-3;padding: 0 16px 12px 20px;}
  .per-name{padding-top: 20px;font-weight: 600;margin-bottom: 10px;max-width: ~"calc(100% - 90px)";}
  .per-info{display: flex;align-items: center;}
  .per-info img{width: 20px;height: 20px;margin-right: 8px;}
  .info-detail{margin-top: 20px;}
  .info-item{margin-bottom: 8px;display: flex;align-items: center;}
  .item-name{color: @attendance-background-color-15;}
  .grey-contain p{font-weight: 600;}
</style>



// WEBPACK FOOTER //
// src/components/pages/Person.vue