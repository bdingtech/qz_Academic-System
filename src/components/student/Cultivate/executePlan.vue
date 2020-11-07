<template>
  <div>
    <Header title="执行计划"></Header>
    <div class="executePlan_select">
      <div class="sem-drop">
        <div @click="semPicker = true"><p>{{this.semester}}</p><i></i></div>
      </div>
      <van-popup v-model="semPicker" position="bottom">
        <van-picker show-toolbar :columns="option1" @cancel="semPicker = false" @confirm="semesterChoose" :swipe-duration="500" :item-height="35"/>
      </van-popup>
      <!-- <van-dropdown-menu active-color="#212F6E">
        <van-dropdown-item v-model="value1" :options="option1" @change="semesterChoose"/>
      </van-dropdown-menu> -->
    </div>
    <NOdata v-if="this.clList.length == 0 && isLoad" title="暂无执行计划~"></NOdata>
    <div class="content_ executePlan" v-else>
      <a class="executePlan_list" v-for="(item,index) in clList" :key="index">
        <h4 style="color: #212F6E;font-size: 16px;line-height: 24px;font-weight:700;">{{item.COURSENAME}}</h4>
        <div>
          <div>
            <p>学分： {{item.CREDIT}}</p>
            <p>考核方式： {{item.EVALUATIONMODE}}</p>
            <p>课程属性:  {{item.COURSEATTRIBUTE}}</p>
            <p>课程编号:  {{item.COURSECODE}}</p>
          </div>
          <div>
            <p>学时： {{item.TOTALHOURS}}</p>
            <p>是否考试： {{item.WHETHERTOTEST}}</p>
          </div>
        </div>
        <p>开课单位： {{item.COURSEUNITS}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import { Toast } from 'vant'
  import {Api} from '../../../utils/axios'
  export default {
    data(){
      return{
        value1: 0,
        clList:[],
        semPicker:false,
        semester:'学年学期',
        option1: [{
          text:'学年学期',
          value:0,
          index:''
        }],
        isLoad:false
      }
    },
    methods:{
      async semesterChoose(e,val){
        this.semPicker = false
        this.semester = e.text
        const params = {
          semester:this.semester == '学年学期' ? '' : this.semester
        }
        const res = await Api.executionPlan(params)
        this.clList=res.data
      },
      async getTerm(){
        const res = await Api.getCurrentTerm()
        this.semester = res.data[0].semesterId
      },
      async getSemList(){
        let concatList = []
        const res = await Api.getSemesterList()
        res.data.forEach((item,index) => {
          concatList[index] = {
            text:item.semesterName,
            value:index + 1,
            index:item.semesterId
          }
        });
        this.option1 = this.option1.concat(concatList)
      },
      async getPlan(){
        const res = await Api.executionPlan()
        this.clList = res.data;
        this.isLoad = true;
      }
    },
    created(){
      this.getTerm()
      this.getSemList()
      this.getPlan()
    },
  }
</script>

<style lang="less" scoped>
  .executePlan_select{width: 100%;height: 50px;display: flex;justify-content: center;align-items: center;border-bottom: 1px solid @attendance-border-color-6;}
  .executePlan_select select{background: none;border: 0;outline: 0;}
  .executePlan .executePlan_list{width: 100%;box-sizing: border-box;padding: 20px;background: @attendance-background-color-10;border-radius:5px;display: flex;justify-content: space-between;margin-bottom: 20px;}
  .executePlan .executePlan_list p{color: @attendance-color-2;font-size: 12px;line-height: 20px;}
  .executePlan_select .van-dropdown-menu__title--active{color: @attendance-color-2}
  .executePlan_select .van-popup{max-height: 40%;}
  .executePlan_list{display: flex;flex-direction: column;}
  .executePlan_list h4{text-align: left;margin-bottom: 4px;}s
  .executePlan_list>div{display: flex;justify-content: space-between;width: 100%;}
  .executePlan_list>div>div{width: 45%;}
  .executePlan_select .van-hairline--top-bottom:after, .van-hairline-unset--top-bottom:after{border-width: 0;}
  .executePlan_select .sem-drop>div{display: flex;align-items: center;color: @attendance-color-2;font-size: 14px;}
  .executePlan_select .sem-drop>div i{background: url(../../../../static/img/Triangle.png)no-repeat center;width: 10px;height: 10px;background-size: 10px 8px;margin-left: 5px;}
  .executePlan_select .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}
  .executePlan_select .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}

  .executePlan_select .van-picker__columns::before{width: 150px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .executePlan_select .van-picker__columns::after{width: 150px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}

</style>



// WEBPACK FOOTER //
// src/components/student/Cultivate/executePlan.vue