<template>
  <div class="grade-detail">
    <Header title="等级考试报名"></Header>
    <div class="grade">
      <p class="grade-name">{{this.gradeInfo.examinationType}}({{this.gradeInfo.examinationGrade}})</p>
      <p class="grade-info">课程等级：{{this.gradeInfo.examinationGrade}}</p>
      <p class="grade-info">考试时间：{{this.gradeInfo.time}}</p>
    </div>

    <div class="grade-input">
      <!-- <div class="grade-item">
        <p>学生姓名</p>
        <input type="text" v-model="studentName" readonly placeholder="请填写姓名"/>
      </div> -->
      <div class="grade-item">
        <p>身份证号</p>
        <input type="text" v-model="idNum" readonly placeholder="请填写身份证号"/>
      </div>
      <div class="grade-item">
        <p>学生编号</p>
        <input type="text" v-model="studentNum" readonly placeholder="请填写编号"/>
      </div>
      <div class="grade-item">
        <p>院校班级</p>
        <input type="text" placeholder="请填写院校班级" readonly v-model="academy"/>
      </div>
      <div class="grade-item">
        <p>联系电话</p>
        <input type="text" placeholder="请填写联系电话" v-model="telNum"/>
      </div>
      <div class="grade-item">
        <p>考试类型</p>
        <input type="text" placeholder="请点击选择" readonly v-model="testType" @click="onType()" style="padding-right:15px;"/>
        <!-- <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @cancel="onCancel" @select="typeSelect"/> -->
        <i :class="testType == '' ? 'arrow' : 'arrow-act'"></i>
      </div>
      <div class="grade-item" v-if="this.testType == '补考机试' || this.testType == '补考笔试' ">
        <p>上次准考证号</p>
        <input type="text" placeholder="请填写准考证号" v-model="lastNum"/>
      </div>
    </div>
    <div class="grade-sub" v-if="isFocus">
      <p>请确认身份证信息无误后再提交</p>
      <button @click="submitApply()">提交申请</button>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar :columns="actions" @cancel="show = false" @confirm="typeSelect" :item-height="itemHeight"></van-picker>
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import { ActionSheet } from 'vant';
  // // import Header from './header.vue'
  import { Api } from '../../utils/axios'
  export default{
    data(){
      return{
        lastNum:'',
        gradeInfo:[],
        studentName:'',
        idNum:'',
        isFocus:true,
        studentNum:'',
        academy:'',
        telNum:'',
        testType:'全报',
        show: false,
        typeNum:'0',
        itemHeight:35,
        actions: [{
          values:['全报','补考机试','补考笔试'],
          defaultIndex:1,
        }]
      }
    },
    created(){
      this.gradeInfo = JSON.parse(this.$route.query.info);
      this.getMy()
    },
    mounted(){
      window.onresize = function(){
        if(window.innerHeight < 600){
          this.isFocus = false
        }
      }
    },
    methods:{
      async getMy(){
        const res = await Api.getStuInfo()
        this.idNum = res.data[0].idno
        this.studentNum = res.data[0].studentID
        this.academy = res.data[0].academy + '-' + res.data[0].className
        this.studentName = res.data[0].name
        this.telNum = res.data[0].dh
      },
      async saveTap(){
        const params = {
          trainingType:'',
          examinationType:this.typeNum,
          skdjsjid:this.gradeInfo.gradeid,
          telephone:this.telNum,
          lastTicketNumber:this.lastNum
        }
        const res = await Api.gradeExaminationSave(params)
        Toast(res.Msg);
        if(res.code == '1'){
          this.$router.push({
            path:'/student/gradeExam'
          })
        }
      },
      onCancel() {
        this.show = false;
      },
      onType(){
        this.show = true;
      },
      typeSelect(item,index){
        this.testType = item;
        this.typeNum = Number(index)
        this.show = false;
      },
      submitApply(){
        let reg = /^1[3456789]\d{9}$/;
        if(this.telNum == ''){
          Toast.fail('请填写完整信息');
        }else if(!reg.test(this.telNum)){
          Toast.fail('请填写有效手机号');
        }else if(this.testType != '全报' && this.lastNum == ''){
          Toast.fail('请填写完整信息');
        }else{
          this.saveTap()
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .grade{padding: 20px 20px 5px;}
  .grade p{margin-bottom: 8px;}
  .grade .grade-name{color: @attendance-color-1;font-size: 18px;font-weight: 700;}
  .grade .grade-info{color: @attendance-color-2;font-size: 14px;}
  .grade-input{padding: 10px 20px;margin-bottom: 100px;}
  .grade-input .grade-item{padding: 0px 0 9px;border-bottom: 1px solid @attendance-border-color-6;display: flex;color: @attendance-color-1;margin-top: 20px;align-items: center;}
  .grade-input .grade-item input{text-align: right;flex: 1;color: @attendance-color-1;font-size: 16px;font-weight: 700;padding-left: 20px;}
  .grade-input .grade-item input::placeholder{color: @attendance-background-color-2;font-weight: 400;}
  .grade-sub{text-align: center;width: 100%;padding-bottom: 20px;background-color: @attendance-color-3;bottom: 0;position: fixed;}
  .grade-sub p{color: @attendance-color-2;margin:20px 0 2px;font-size: 12px;line-height: 16px;}
  .grade-sub button{padding: 11px 0;color: @attendance-color-3;background-color: @attendance-background-color-1;border-radius: 3px;width: 90%;}
  .icon-success{background: url(../../../static/img/success.png)no-repeat center;width: 20px;height: 20px;background-size: 20px 20px;display: block;}
  .grade-item>i{width: 15px;height: 15px;}
  .arrow{background: url(../../../static/img/arrow_r.png)no-repeat center;background-size: 15px 15px;}
  .arrow-act{background: url(../../../static/img/arrow.png)no-repeat center;background-size: 8px 11px;}
  .grade-detail .van-picker-column__item{margin: 0 30%;}
  .grade-detail .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{font-weight: 600;color: @attendance-color-1;border-top:1px solid @attendance-background-color-2;border-bottom: 1px solid @attendance-background-color-2;}
</style>



// WEBPACK FOOTER //
// src/components/student/gradeDetail.vue