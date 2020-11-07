<template>
  <div>
    <Header title="退选"></Header>
    <div class="eva-detail">
      <h4 class="eva-num">退课原因？</h4>
      <template>
        <div>
          <p class="eva-topic"></p>
          <div class="eva-rate">
            <textarea name placeholder="请点击填写" v-model="evaText" maxlength="140"></textarea>
            <p>{{calcNum()}}</p>
          </div>
        </div>
      </template>
    </div>

    <div class="eva-buttons">
      <button class="pre-topic" @click="cancelExit()">取消</button>
      <button class="eva-btn" @click="exitTap()">退选</button>
    </div>
  </div>
</template>

<script>
// import Header from '../header.vue'
import { Toast } from 'vant'
import { Api } from '../../../utils/axios'
import axios from 'axios';
export default {
  data() {
    return {
      evaText: '',
      SelectUrl: '',
      maxNum: '140'
    }
  },
  methods: {
    calcNum() {
      this.maxNum = 140 - this.evaText.length;
      return this.maxNum
    },
    cancelExit() {
      this.$router.replace({
        path: '/student/pickClass'
      })
    },
    async exitConfirm() {
      // const params = {
      //   courseQualification:this.$route.query.course,
      //   rotationId:this.$route.query.data,
      //   noticeId:this.$route.query.id,
      //   sessionTime:this.$route.query.session,
      //   retireCause:this.evaText  
      // }
      let formData = new FormData();
      formData.append('courseQualification', this.$route.query.course);
      formData.append('rotationId', this.$route.query.data);
      formData.append('noticeId', this.$route.query.id);
      formData.append('sessionTime', this.$route.query.session);
      formData.append('retireCause', this.evaText);
      axios.defaults.headers.token = sessionStorage.getItem('Token')
      const baseURL_SEL = process.env.NODE_ENV === 'production' ? sessionStorage.getItem('SelectUrl') : 'select'
      axios.post(baseURL_SEL + '/qzapp/wxxstkOper',
        formData,
        // { timeout: 5 * 60 * 1000 }
      ).then(res => {
        Toast(res.data.errorMessage);
        if (res.data.errorCode == 'success') {
          this.$router.replace('/student/pickClass')
        }
      }).catch(() => {
        Toast('请求失败')
      })
      // const res = await Api.selectWxxstkOper(params)
      // Toast(res.errorMessage);
      // if (res.errorCode == 'success') {
      //   this.$router.replace('/student/pickClass')
      // }
    },
    exitTap() {
      if (this.$route.query.exit == '是' && this.evaText == '') {
        Toast.fail('请填写退课原因')
      } else {
        this.exitConfirm()
      }

    }
  },
}
</script>

<style lang="less" scoped>
.eva-detail {
  padding: 0 20px 50px;
}
.eva-detail .eva-rate {
  position: relative;
}
.eva-detail .eva-rate p {
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: @attendance-color-2 ;
}
.eva-detail .eva-num {
  color: @attendance-background-color-1;
  font-size: 18px;
  margin-bottom: 20px;
}
.eva-detail .eva-rate textarea {
  width: 100%;
  padding: 20px;
  background-color: @attendance-background-color-6;
  border-radius: 3px;
  box-sizing: border-box;
  color: @attendance-color-1;
  height: 350px;
}
.eva-detail .eva-rate textarea::placeholder {
  color: @attendance-color-2;
}
.eva-buttons {
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  padding-bottom: 20px;
  background-color: @attendance-color-3;
}
.eva-buttons button {
  border-radius: 3px;
  padding: 11px 0;
  width: 45%;
}
.eva-buttons .eva-btn {
  background-color: @attendance-background-color-1;
  color: @attendance-color-3;
}
.eva-buttons .pre-topic {
  background-color: @attendance-background-color-6;
  color: @attendance-background-color-1;
}
</style>



// WEBPACK FOOTER //
// src/components/student/pickClass/exitPick.vue