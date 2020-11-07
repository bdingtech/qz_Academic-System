<template>
  <div class="login">
    <!-- <p>修改密码</p> -->
	<Header title='修改密码'></Header>	
    <div class="log-input" style="margin-top:70px;">
      <p>原密码</p>
      <div :class="isFocus ? 'input-active' : 'input-item  '">
        <input type="password" placeholder="请输入原密码" v-model="password" @focus="lineChange(0)">
        <i class="delete-icon" v-if="password" @click="deleteTap(1)"></i>
      </div>
    </div>
    <div class="log-input">
      <p>新密码</p>
      <div :class="isFocus1 ? 'input-active' : 'input-item  '">
        <input type="password" placeholder="请输入新密码" v-model="password1" @focus="lineChange(1)" @blur="checkLength()">
        <i class="delete-icon" v-if="password1" @click="deleteTap(2)"></i>
      </div>
    </div>
	<div class="log-input">
	  <p>重复密码</p>
	  <div :class="isFocus2 ? 'input-active' : 'input-item  '">
	    <input type="password" placeholder="重复新密码" v-model="password2" @focus="lineChange(2)">
	    <i class="delete-icon" v-if="password2" @click="deleteTap(3)"></i>
	  </div>
	</div>
    <div class="log-btn"><button @click="loginSubmit()">提交修改</button></div>
  </div>

</template>

<script>
import { Toast } from 'vant';
import { Api } from '../../utils/axios'
// import Header from '../student/header'
export default {
  data () {
    return {
      password:'',
      password1:'',
      password2:'',
      isFocus:false,
      isFocus1:false,
      isFocus2:false,
    }
  },
  methods:{
    checkLength(){
      if(this.password1.length < 6){
        Toast.fail("密码至少为6个字符")
      }
    },
    async loginSubmit(){
      if(this.password == ''){
        Toast("请填写原密码~")
        return false
      }
      if(this.password1 == ''){
        Toast("请填写新密码~")
        return false
      }
      if(this.password1.length < 6){
        Toast.fail("密码至少为6个字符")
        return false
      }
      if(this.password2 == ''){
        Toast("请重复新密码~")
        return false
      }
      if(this.password == this.password1){
        Toast("新密码不能与原密码相同")
        return false
      }
      if(this.password1 != this.password2){
        Toast("重复密码与新密码不一致~")
        return false
      }
      const res = await Api.changePassword({
          password:this.password2,
          oldpassword:this.password,
        })
      if(res.code == "0"){
        Toast.fail(res.Msg)
      }else{
        Toast.success("修改密码成功,请重新登录!")
        sessionStorage.removeItem("Token")
        setTimeout(() => {
          this.$router.replace("/login")
        },1500)
      }
    },
    deleteTap(val){
      if(val == 1){
       this.password = ""
      }else if(val == 2){
        this.password1 = ""
      }else if(val == 3){
        this.password2 = ""
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
<style scoped lang="less">
.login>p{color: @attendance-color-1;font-size: 18px;font-weight: 600;margin: -23px 0 47px 36px;}
  .log-title{font-size: 19px;color: @attendance-color-1;font-weight:600;margin: 27px 36px;}
  .log-logo{text-align: center;padding: 28px 0 49px;}
  .log-logo img{width: 120px;}
  .log-input{padding: 0 30px;}
  .log-input p{color: @attendance-color-2;margin-bottom: 11px;}
  .input-item,.input-active{display: flex;align-items: center;padding-bottom: 10px;justify-content: space-between;margin-bottom: 24px;}
  .input-item{border-bottom: 1px solid @attendance-border-color-3;}
  .input-active{border-bottom: 1px solid @attendance-color-2;}
  .input-item input,.input-active input{font-size: 24px;color: @attendance-color-1;width: 90%;padding: 0 4px;}
  .delete-icon{background: url('../../../static/img/delete.png')no-repeat center;width: 16px;height: 16px;background-size: 16px 16px;}
  .input-item input::placeholder,.input-active input::placeholder{font-size: 20px;}
  .log-btn{text-align: center;}
  .log-btn button{background-color: @attendance-background-color-1;padding: 11px 0;width: 90%;color: @attendance-color-3;border-radius: 3px;margin-top: 6px;}
</style>



// WEBPACK FOOTER //
// src/components/pages/Untied.vue