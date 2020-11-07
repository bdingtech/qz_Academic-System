<template>
  <div>
    <div class="cas-ban">
      <img src="static/img/home_ban.png"/>
    </div>
    <div class="cas-code">
      <img src="static/img/fail.png" v-if="isError"/>
      <p>{{response}}</p>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import {aApi} from '../utils/auth'
export default {
  data(){
    return{
      response:'加载中...',
      isError:false,
      data:[
        {"menu":"xs_cj","path":"student/score"},
        {"menu":"xs_xjgl","path":"student/schoolRoll"},
        {"menu":"xs_ksap","path":"student/exam"},
        {"menu":"xs_hk","path":"student/delayedExam"},
        {"menu":"xs_djksbm","path":"student/gradeExam"},
        {"menu":"xs_kxjs","path":"student/classroom"},
        {"menu":"xs_pyfa","path":"student/cultivate"},
        {"menu":"xs_xspj","path":"student/evaluate"},
        {"menu":"xs_xk","path":"student/pickClass"},
        {"menu":"xs_kcb","path":"student/timetable"},
        {"menu":"xs_jc","path":"student/textbook"},
        {"menu":"xs_kq","path":"student/attendanceAdd"},
        {"menu":"xs_bk","path":"student/supplementExam"},
        {"menu":"js_kcb","path":"surfaces"},
        {"menu":"js_tksq","path":"change_class"},
        {"menu":"js_jkcx","path":"invigilate"},
        {"menu":"js_jsjy","path":"classroom"},
        {"menu":"js_jxpj","path":"evaluate"},
        {"menu":"js_cjgl","path":"achievement1"},
        {"menu":"js_pyfa","path":"programme"},
        {"menu":"js_bysj","path":"design"},
        {"menu":"js_kt","path":"teacher/courseManage"},
        {"menu":"js_kq","path":"teacher/attendance"},
        {"menu":"js_kw","path":"teacher/examinationIndex"},
        {"menu":"js_sh","path":"teacher/examineIndex"},
        // 通知公告
        {"menu":"tzgg","path":"/message"},
      ]
    }
  },
  created(){
    sessionStorage.removeItem('isNeedLogout')
    sessionStorage.setItem('ifSelect',0)
    sessionStorage.setItem('menuSave','0')
    if(this.$route.query.weChart && this.$route.query.weChart == 1){
      sessionStorage.setItem('isWechat',1)
    }else{
      sessionStorage.removeItem('isWechat')
    }
    //单点登录判断
    sessionStorage.setItem('casLogin',true)
    sessionStorage.setItem("Identity",this.$route.query.userType)
    this.ifWechatBrowser()
    if(this.$route.query.token || this.$route.query.askToken){
      sessionStorage.setItem("Token",this.$route.query.token || this.$route.query.askToken);
      if(this.$route.query.toMenu && this.$route.query.toMenu != null && this.$route.query.toMenu != "" && this.$route.query.toMenu != "null"){
        // 菜单跳转
        this.menuCheck(this.$route.query.toMenu)
      }else{
        this.$router.replace('/index')
      }
    }else{
      this.codeDiffer()
    }
  },
  methods:{
    codeDiffer(){
      this.isError = true
      if(this.$route.query.code == 1){
        this.response = "无法获取用户信息！"
      }else if(this.$route.query.code == 2){
        this.response = "用户不存在！"
      }else if(this.$route.query.code == 3){
        this.response = "登录失败！"
      }else{
        this.response = "参数错误"
      }
    },
    aksCasLogin(){
      aApi.AKSCasLogin({
        token:this.$route.query.askToken
      }).then((res) => {
        if(res.code == '0'){
          this.response = res.Msg
        }else{
          sessionStorage.setItem('userInfo',JSON.stringify(res.data))
          sessionStorage.setItem('Token',res.data.token)
          this.$router.replace('/homeIndex')
        }
      }).catch((err) =>{

      })
    },
    menuCheck(menu){
      this.data.forEach(item => {
        if(menu == item.menu){
          this.$router.replace(item.path)
        }
      });
    },
    ifWechatBrowser(){
      let browser = {
        versions: function () {
        let u = navigator.userAgent, app = navigator.appVersion;
        return {  //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }
      if(browser.versions.mobile){
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          // 阿克苏
          if(this.$route.query.askToken){
            this.aksCasLogin()
          }else if(this.$route.query.token){
            // this.wechatLogin()
          }else{
            this.codeDiffer()
          }
        }
      }
    },
    // .net微信平台登录 学工
    async wechatLogin(){
      // alert(localStorage.getItem('qz-wx-token') || '未获取到token')
      let token = { token: this.$route.query.token }
      const res = await aApi.dotNetCasLogin(token)
      if(res.code == '0'){
        this.response = res.Msg
      }else{
        sessionStorage.setItem('userInfo',JSON.stringify(res.data))
        sessionStorage.setItem('Token',res.data.token)
        this.$router.replace('/homeIndex')
      }
    }
  }
  //阿克苏教育
}
</script>
<style lang="less" scoped>
.cas-ban{padding: 8px 20px;margin-top: 50px;}
.cas-ban img{height: 111px;width: 100%;}
.cas-code{position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);text-align: center;}
.cas-code img{width: 64px;height: 64px;}
.cas-code p{color: @attendance-color-1;font-weight: 300;margin-top: 20px;}
</style>



// WEBPACK FOOTER //
// src/components/casLogin.vue