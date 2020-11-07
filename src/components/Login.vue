<template>
  <div class="login">
    <p class="log-title">登录</p>
    <!-- <div class="log-logo"><img :src="logo" alt=""> </div> -->
    <form action="">
      <div class="log-input">
        <p>学号/工号</p>
        <div :class="isFocus ? 'input-active' : 'input-item'">
          <input type="text" placeholder="请输入学号/工号" v-model.trim="account" autocomplete="user" @focus="lineChange(0)"
            @keyup.enter="loginSubmit()">
          <i class="delete-icon" v-if="account" @click="deleteTap(0)"></i>
        </div>
      </div>
      <div class="log-input">
        <p>密码</p>
        <div :class="isFocus1 ? 'input-active' : 'input-item  '">
          <input type="password" placeholder="请输入密码" v-model="password" autocomplete="psw" @focus="lineChange(1)"
            @keyup.enter="loginSubmit()">
          <i class="delete-icon" v-if="password" @click="deleteTap(1)"></i>
        </div>
      </div>
    </form>
    <div class="log-btn"><button @click="loginSubmit()">登录</button></div>
  </div>

</template>

<script>
  import {
    Api
  } from '../utils/axios'
  import {
    Toast
  } from 'vant';
  import service from '@/utils/request'
  export default {
    data() {
      return {
        account: '',
        publicPath: process.env.BASE_URL,
        password: '',
        // logo: require('../../static/img/logo.png'),
        isFocus: false,
        isFocus1: false,
        schoolcode: ''
      }
    },
    beforeCreate() {
      sessionStorage.setItem('menuSave', 0)
      sessionStorage.setItem('ifSelect', 0)
    },
    created() {
      // sessionStorage.setItem('schoolCode','66666')
      sessionStorage.setItem('isNeedLogout', 1)
      //单点登录判断
      sessionStorage.removeItem('casLogin')
      sessionStorage.removeItem('isWechat')
      if (!sessionStorage.getItem('casLogin')) {
        if (sessionStorage.getItem('isConfig') && sessionStorage.getItem('isConfig') == 1) {

        } else {
          this.getSelectApi(sessionStorage.getItem('schoolCode'))
        }
      }
    },
    methods: {
      async getSelectApi(e) {
        const params = {
          'xx0101id': e,
          'key': 'qzkj'
        }
        const res = await Api.getSelectApi(params)
        if (res.data) {
          sessionStorage.setItem("SelectUrl", res.data.courseurl);
          if (process.env.NODE_ENV === 'production') {
            service.defaults.baseURL = res.data.schoolurl
            console.log(service.defaults.baseURL)
          }
        }
      },
      async ss() {
        const code = await Api.getSchoolCode()
        sessionStorage.setItem('schoolCode', code.data.schoolcode)
        this.schoolcode = code.data.schoolcode
      },
      async login() {
        const params = {
          'userNo': this.account,
          'pwd': this.password,
        }
        const res = await Api.userLoginApi(params)
        sessionStorage.setItem('Identity', res.data.userType);
        sessionStorage.setItem('Token', res.data.token);
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        if (res.code == 1) {
          Toast.success(res.Msg)
          // 实验室扫码
          if (this.$route.query.jx0601id && this.$route.query.gwbh) {
            sessionStorage.setItem('jx0601id', this.$route.query.jx0601id)
            this.$router.push({
              path: '/laboratory/repair',
              query: {
                jx0601id: this.$route.query.jx0601id,
                gwbh: this.$route.query.gwbh
              }
            })
          } else if (this.$route.query.jx0601id) {
            sessionStorage.setItem('jx0601id', this.$route.query.jx0601id)
            this.$router.push({
              path: '/laboratory/index',
              query: {
                jx0601id: this.$route.query.jx0601id,
              }
            })
          } else {
            this.$router.push('/homeIndex')
          }
        }
      },
      loginSubmit() {
        if (this.account == '' || this.password == '') {
          Toast.fail('请填写账号或密码')
        } else {
          this.login()
        }
      },
      deleteTap(val) {
        if (val == 0) {
          this.account = ""
        } else {
          this.password = ""
        }
      },
      async getSchoolCode() {
        const res = await Api.getSchoolCode()
      },
      lineChange(res) {
        if (res == 0) {
          this.isFocus = true
          this.isFocus1 = false
        } else {
          this.isFocus1 = true
          this.isFocus = false
        }
      },

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login{
  .log-title {
    font-size: 19px;
    // color: @attendance-color-1;
    font-weight: 600;
    margin: -20px 36px 27px;
  }
  .log-logo {
    text-align: center;
    padding: 28px 0 49px;
    img {
      width: 77px;
      height: 77px;
    }
  }
  .log-input {
    padding: 0 36px;
    p {
      // color: @attendance-color-2;
      margin-bottom: 11px;
    }
    >div{
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      justify-content: space-between;
      margin-bottom: 24px;
      >input{
        font-size: 24px;
        // color: @attendance-color-1;
        width: 90%;
        padding: 0 4px;
        // background-color: @attendance-color-3;
        &::placeholder{
          font-size: 20px;
        }
      }
      i{
        // background: url(../../static/img/delete.png)no-repeat center;
        width: 16px;
        height: 16px;
        background-size: 16px 16px;
      }
    }
    .input-item {
      // border-bottom: 1px solid @attendance-border-color-3;
    }
    .input-active {
      // border-bottom: 1px solid @attendance-color-2;
    }
  }
  .log-btn {
    text-align: center;
    padding: 0 1.25rem;
    button {
      // background-color: @attendance-background-color-1;
      padding: 11px 0;
      width: 100%;
      // color: @attendance-color-3;
      border-radius: 3px;
      margin-top: 33px;
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/components/Login.vue