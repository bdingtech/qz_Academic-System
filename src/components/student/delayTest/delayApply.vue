<template>
  <div class="apply">
    <Header title="缓考申请"></Header>
    <div class="apply-body">
      <div>
        <p class="apply-title">{{this.topInfo.courseName}}</p>
        <p class="apply-num">学时：{{this.topInfo.period}}</p>
        <p class="apply-num">学分：{{this.topInfo.credit}}</p>
      </div>

      <div class="apply-inputs">
        <div class="apply-input">
          <p>申请原因</p>
          <input type="text" placeholder="请点击填写" v-model="reason"/>
        </div>
        <div class="apply-input">
          <p>审核人</p>
          <input type="text" placeholder="请点击选择" @click="isPopShow()" v-model="person" readonly/>
          <i class="arrow"></i>
        </div>
      </div>
    </div>
    <button class="apply-btn" @click="submitApply()">提交申请</button>

    <!-- 审核人popup -->
    <van-popup v-model="isShow" position="bottom">
      <div class="apply-pop">
        <div class="pop-title">
          <i class="close-icon" @click="isShow = false"></i>
          <p>审核人</p>
          <i class="confirm-icon" @click="resetCancel()"></i>
        </div>
        <div class="person">
          <button class="per-btn" ref="person" @click="personTap($event,index)" v-for="(item,index) in personList" :key="item.id">{{item.name}}</button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
  // import Header from '../header.vue'
  import {Toast} from 'vant'
  import { Api } from '../../../utils/axios'
  export default{
    data(){
      return{
        isShow:false,
        topInfo:'',
        reason:'',
        personList:[
        {
          id:'',
          name:'全部',
          isBtn:0,
        }
        ],
        person:'',
        personId:'',
        reset:"",
        resetId:''
      }
    },
    created(){
      this.topInfo = JSON.parse(this.$route.query.data);
      this.getPeople()
    },
    methods:{
      resetCancel(){
        this.isShow= false
        this.person = this.reset
        this.personId = this.resetId
      },
      async getPeople(){
        const params = {
          ywcode:'011',
          ywid:''
        }
        const res = await Api.selectReviewerApi(params)
        let concatList = []
        res.data.forEach((item,index) => {
          concatList[index] = {
            name:item.userrealname,
            id:item.userid,
            isBtn:0,
          }
        });
        this.personList = this.personList.concat(concatList)
      },
      isPopShow(){
        this.isShow = !this.isShow
      },
      close(){
        this.isShow =false
      },
      async submitApply(){
        if(this.reason == ''){
          Toast.fail('请填写申请原因~')
        }else{
          const params = {
            cj0704id:this.topInfo.cj0704id,
            reason:this.reason,
            auditor:this.person == '全部' ? '' : this.personId
          }
          const res = await Api.slowExaminationSave(params)
          Toast(res.Msg)
          if(res.code == '1'){
            this.$router.replace('/student/delayedExam');
          }
        }
      },
      personTap(e,res){
        let strList = []
        let idList = []
        if(this.personList[res].isBtn == 0){
          this.personList[res].isBtn = 1
          e.target.className = 'cur'
        }else if(this.personList[res].isBtn == 1){
          this.personList[res].isBtn = 0
          e.target.className = 'per-btn'
        }
        for(let i in this.personList){
          if(this.personList[res].name == '全部'){
            this.personList[i].isBtn = 0;
            this.personList[res].isBtn = 1
            this.$refs.person[res].className = 'cur'
            this.$refs.person[i].className = 'per-btn'
          }else{
            this.personList[0].isBtn = 0;
            this.$refs.person[0].className = 'per-btn'
          }
          if(this.personList[i].isBtn == 1){
            strList = strList.concat(this.personList[i].name)
            idList = idList.concat(this.personList[i].id)
          }
        }
        this.reset = strList.toString();
        this.resetId = idList.toString();
      }
    },
  }
</script>

<style lang="less" scoped>
  .apply-body{padding: 20px;}
  .apply-body .apply-title{font-size: 18px;color: @attendance-color-1;font-weight: 600;}
  .apply-body .apply-num{font-size: 14px;color: @attendance-color-2;margin-top: 8px;}
  .apply-inputs{margin-top: 17px;}
  .apply-inputs .apply-input{padding: 9px 0;display: flex;align-items: center;justify-content: space-between;border-bottom: 1px solid @attendance-border-color-6;color: @attendance-color-1;}
  .apply-input input{flex: 1;text-align: right;color: @attendance-color-1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 20px;}
  .apply-input input::placeholder{color: @attendance-background-color-2;font-size: 16px;}
  .apply .apply-btn{position: absolute;bottom: 20px;background-color: @attendance-background-color-1;padding: 11px 0;color: @attendance-color-3;border-radius: 3px;width: 90%;margin-left: 5%;}
  .apply-pop{
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: @attendance-color-3;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
    max-height: 40%;
    overflow-y: scroll;
  }
  .close-icon{background: url(../../../../static/img/close.png)no-repeat center;}
  .pop-title{display: flex;justify-content: space-between;
    padding: 13px;
    position: fixed;
    width: 100%;
    background-color: @attendance-color-3;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;z-index: 9;}
  .pop-title i{width: 22px;height: 22px;background-size: 22px 22px;}
  .confirm-icon{background: url(../../../../static/img/confirm.png);}
  .apply-pop .person{padding: 20px 20px 0;display: flex;flex-wrap: wrap;margin-top: 48px;}
  .person button{border-radius:3px;padding: 5px 15px;margin-right: 12px;margin-bottom: 15px;}
  .apply-pop .person .per-btn{background-color: @attendance-background-color-7;color: @attendance-background-color-1;}
  .person .cur{background-color: @attendance-background-color-1;color: @attendance-background-color-7;}
  .apply-input .arrow{background: url(../../../../static/img/arrow_r.png)no-repeat center;width: 13px;height: 13px;background-size: 13px 13px;margin-left: 10px;}
</style>



// WEBPACK FOOTER //
// src/components/student/delayTest/delayApply.vue