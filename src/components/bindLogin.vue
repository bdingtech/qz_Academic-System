<template>
  <div class="login">
    <p class="log-title"><img src="../../static/img/back.png" @click="linkTo()"> 登录</p>
    <div class="log-logo"><img src="../../static/img/logo.png" alt=""> </div>
    <form action="">
      <div class="log-input">
        <p>手机号</p>
        <div :class="isFocus2 ? 'input-active' : 'input-item'">
          <input type="number" placeholder="请输入学号/工号" v-model.trim="phoneNum" autocomplete="tel" @focus="lineChange(2)" @keyup.enter="loginSubmit()" readonly>
          <!-- <i class="delete-icon" v-if="account" @click="deleteTap(2)"></i> -->
        </div>
      </div>
      <div class="log-input">
        <p>学号/工号</p>
        <div :class="isFocus ? 'input-active' : 'input-item'">
          <input type="text" placeholder="请输入学号/工号" v-model.trim="account" autocomplete="user" @focus="lineChange(0)" @keyup.enter="loginSubmit()">
          <i class="delete-icon" v-if="account" @click="deleteTap(0)"></i>
        </div>
      </div>
      <div class="log-input">
        <p>密码</p>
        <div :class="isFocus1 ? 'input-active' : 'input-item  '">
          <input type="password" placeholder="请输入密码" v-model="password" autocomplete="psw" @focus="lineChange(1)" @keyup.enter="loginSubmit()">
          <i class="delete-icon" v-if="password" @click="deleteTap(1)"></i>
        </div>
      </div>
    </form>
    <div class="log-btn"><button @click="loginSubmit()">登录</button></div>
  </div>

</template>

<script>
import { Toast } from 'vant';
import { Api } from '../utils/axios'
export default {
  data () {
    return {
      account:'',
      password:'',
      phoneNum:'',
      xxid:'',
      isFocus:false,
      isFocus1:false,
      isFocus2:false,
    }
  },
  beforeCreate(){
    sessionStorage.removeItem('Token');
    sessionStorage.setItem("ifSelect","0")
    sessionStorage.setItem('menuSave','0')
    sessionStorage.removeItem('isWechat')
  },
  created(){
    this.phoneNum = this.$route.query.phone;
    this.xxid = this.$route.query.xxid;
  },
  methods:{
    linkTo(){
      this.$router.go(-2)
    },
    async loginSubmit(){
      if(this.account == '' || this.password == ''){
        Toast.fail('请填写账号和密码')
      }else{
        const params = {
          userCode:this.account,
          password:this.password,
          phoneNumber:this.phoneNum,
          xxid:this.xxid
        }
        const res = await Api.bindLoginApi(params)
        if(res.errorCode == "success"){
          sessionStorage.setItem('Identity', res.data.userInfo.userType);
          sessionStorage.setItem('Token', res.data.token);
          this.$router.push('/homeIndex')
          Toast.success("绑定成功")
        }else if(res.errorMessage == 'fail'){
          Toast.fail(res.errorMessage)
        }
      }
    },
    deleteTap(val){
      if(val == 0){
        this.account = "";
      }else{
        this.password = "";
      }
    },
    lineChange(res){
      if(res == 0){
        this.isFocus = true;
        this.isFocus1 = false;
        this.isFocus2 = false;
      }else if(res == 1){
        this.isFocus1 = true;
        this.isFocus = false;
        this.isFocus2 = false;
      }else{
        this.isFocus2 = true;
        this.isFocus = false;
        this.isFocus1 = false;
      }
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .log-title{font-size: 19px;color: @attendance-color-1;font-weight:600;margin:-20px 36px 27px;display: flex;align-items: center;}
  .log-title>img{width: 11px;padding: 10px 10px 10px 0;}
  .log-logo{text-align: center;padding: 28px 0 49px;}
  .log-logo img{width: 77px;height: 77px;}
  .log-input{padding: 0 36px;}
  .log-input p{color: @attendance-color-2;margin-bottom: 11px;}
  .input-item,.input-active{display: flex;align-items: center;padding-bottom: 10px;justify-content: space-between;margin-bottom: 24px;}
  .input-item{border-bottom: 1px solid @attendance-border-color-3;}
  .input-active{border-bottom: 1px solid @attendance-color-2;}
  .input-item input,.input-active input{font-size: 24px;color: @attendance-color-1;width: 90%;padding: 0 4px;background-color: @attendance-color-3;}
  .delete-icon{background: url(../../static/img/delete.png)no-repeat center;width: 16px;height: 16px;background-size: 16px 16px;}
  .input-item input::placeholder,.input-active input::placeholder{font-size: 20px;}
  .log-btn{text-align: center;}
  .log-btn button{background-color: @attendance-background-color-1;padding: 11px 0;width: calc(100% - 40px);color: @attendance-color-3;border-radius: 3px;margin-top: 33px;}
</style>



// WEBPACK FOOTER //
// src/components/bindLogin.vue