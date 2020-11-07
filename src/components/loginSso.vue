<template>
  <div class="auth-main">
    <van-popup v-model="popShow" :close-on-click-overlay="false">
      <div class="auth-pop">
        <h1>提示</h1>
        <h2>{{warning}}</h2>
        <div><p @click="closePop()">确定</p></div>
      </div>
    </van-popup>
    <van-popup v-model="popShow1" :close-on-click-overlay="false">
      <div class="auth-pop">
        <h1>提示</h1>
        <h2>{{warning}}</h2>
        <button @click="backPop()">返回</button>
      </div>
    </van-popup>
    <van-loading v-if="isLoaded" type="spinner" color="#212F6E" vertical>跳转中...</van-loading>
  </div>
</template>
<script>
import { Popup, Toast, Loading } from 'vant';
import { Api } from '../utils/axios'
import service from '@/utils/request'

export default {
  data(){
    return{
      popShow:false,
      popShow1:false,
      warning:'',
      isLoaded:true,
      phoneNumber:'',
      xxid:''
    }
  },
  beforeCreate(){
    sessionStorage.removeItem('casLogin')
    sessionStorage.removeItem('isNeedLogout')
    sessionStorage.removeItem('isWechat')
    sessionStorage.setItem("schoolCode",this.$route.query.eduSchCode);
    sessionStorage.setItem("ifSelect",0);
    sessionStorage.setItem('menuSave',0)
  },
  created() {
    this.getSchoolApi()
  },
  methods: {
      closePop(){
        this.popShow = false
        // window.location.href = "../../index.html#/home"
        this.$router.back()
      },
      backPop(){
        this.popShow1 = false;
        this.$router.replace({
          path:'/bindLogin',
          query:{
            'phone':this.phoneNumber,
            'xxid':this.xxid
          }
        })
      },
      async getSchoolApi(){
        const params = {
          xx0101id:this.$route.query.eduSchCode,
          key:'qzkj'
        }
        const res = await Api.getSelectApi(params)
        service.defaults.baseURL = res.data.schoolurl
        sessionStorage.setItem("SelectUrl",res.data.courseurl);
        this.aa();
      },
      async aa() {
        if(this.$route.query.eduSchCode){
          const params = {
            token:this.$route.query.token,
            xxid:this.$route.query.eduSchCode
          }
          const res = await Api.authLoginApi(params)
          if(res.errorCode == 'fail'){
              if(res.data.retData == 'badreq'){
                this.warning = res.errorMessage;
                this.isLoaded = false;
                this.popShow = true;
              }else if(res.data.retData == 'nobindphone'){
                this.isLoaded = false;
                this.warning = res.errorMessage;
                this.popShow1 = true;
                this.phoneNumber = res.data.phoneNumber
                this.xxid = res.data.xxid
                this.$router.replace({
                  path:'/bindLogin',
                  query:{
                    'phone':res.data.phoneNumber,
                    'xxid':res.data.xxid
                  }
                })
              }else{
                this.isLoaded = false
                Toast.fail(res.errorMessage);
                setTimeout(function(){
                  // window.location.href = "../../index.html#/home";
                  this.$router.back()
                },1500)
              }
            }else{
              sessionStorage.setItem('Token', res.data.token);
              if(res.data.userInfo.userType == 'student'){
                sessionStorage.setItem('Identity','2')
              }else{
                sessionStorage.setItem('Identity','1')
              }
              this.$router.replace('/homeIndex');
            }
          }
      }
  }
}
</script>
<style lang="less" scoped>
  .auth-main .auth-pop h1{color: @attendance-color-1 ;font-size: 16px;margin-bottom: 10px;text-align: left;}
  .auth-main .auth-pop h2{color: @attendance-color-2;font-size: 16px;text-align: left;}
  .auth-main .auth-pop>div{text-align: right;color: @attendance-background-color-1;margin-top: 20px;}
  .auth-main .auth-pop>div>p{padding: 5px;font-size: 18px;}
  .auth-main .auth-pop button{width: 100%;padding: 11px 0;border-radius: 5px;background-color: @attendance-background-color-7;color: @attendance-background-color-1;margin-top: 40px;}
  .auth-main .van-popup.van-popup--center{width: 90%;padding: 20px;box-sizing: border-box;border-radius: 5px;}
  .auth-main .van-loading{text-align: center;position: absolute;top: 45%;left: 50%;transform: translate(-50%,-50%)}
</style>



// WEBPACK FOOTER //
// src/components/loginSso.vue