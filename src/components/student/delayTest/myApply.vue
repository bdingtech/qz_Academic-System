<template>
  <div>
      <Header title="我的缓考申请"></Header>
      <div class="delay-search">
        <i class="search-icon" @click="searchMy()"></i>
        <input type="text" placeholder="搜索课程(名称或课号)" v-model="courseInfo">
      </div>
      <div class="search-info">
        <div class="sem-drop">
          <div @click="semPicker = true"><p>{{this.semester}}</p><i></i></div>
          <div @click="actTap()"><p>{{this.activity}}</p><i></i></div>
        </div>
        <van-popup v-model="semPicker" position="bottom">
          <van-picker show-toolbar :columns="option1" @cancel="semPicker = false" @confirm="semConfirm" :swipe-duration="500" :item-height="35"/>
        </van-popup>
        <van-popup v-model="actPicker" position="bottom">
          <van-picker show-toolbar :columns="option2" @cancel="actPicker = false" @confirm="actConfirm" :swipe-duration="500" :item-height="35"/>
        </van-popup>
        <!-- <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" @change="itemSelect"/>
          <van-dropdown-item v-model="value2" :options="option2" @open="courseShow"/>
        </van-dropdown-menu> -->
      </div>
      <NOdata title="未查询到缓考申请~" v-if="this.allWarnList.length == 0 && isLoad"></NOdata>
      <template v-else>
        <a class="grey-contain" v-for="(item,index) in allWarnList" :key="index" @click="goDetail(index)">
          <div>
            <p class="contain-txt">{{item.courseName}}</p>
            <p class="contain-txt1">考试方式：{{item.examinationNature}}</p>
            <p class="contain-txt1">申请时间：{{item.applicationTime}}</p>
          </div>
          <p :style="item.auditStatus == '通过' ? 'color: #12DDD6;' : 'color:#F86969;'">{{item.auditStatus}}</p>
        </a>
      </template>
  </div>
</template>

<script>
// import Header from '../header.vue'
// import NOdata from '../NOdata.vue'
import { Toast } from 'vant'
import { Api } from '../../../utils/axios'
  export default {
    data() {
      return {
        courseInfo:'',
        semPicker:false,
        actPicker:false,
        semester:'学年学期',
        activity:'活动名称',
        allWarnList:[],
        timeValue: '',
        activityValue:'',
        value2: 0,
        option1: [{
          text:'学年学期',
          value:0,
          index:''
        }],
        option2: [{
          text:'活动名称',
          value:0,
          index:''
        }],
        activityId:'',
        isLoad:false
      }
    },
        created(){
          this.getMain()
          this.getSemList()
        },
        methods:{
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
          async getMain(){
            const res = await Api.getCurrentTerm()
            this.semester = res.data[0].semesterId
            this.getSlow(res.data[0].semesterId)
            this.itemSelect(res.data[0].semesterId)
          },
          async getSlow(val){
            const params = {
              semester:val,
              courseName: '',
              cj0701id: ''
            }
            const res = await Api.getMySlowExamination(params)
            this.allWarnList = res.data;
            this.isLoad = true;
          },
          actTap(){
            if(this.semester == '' || this.semester == '学年学期'){
              Toast.fail('请先选择学年学期')
            }else{
              this.actPicker = true
            }
          },
          semConfirm(e,val){
            this.semPicker = false
            this.semester = e.text
            this.searchMy()
            this.itemSelect(e.text)
          },
          actConfirm(e,val){
            this.actPicker = false;
            this.activity = e.text
            this.activityId = e.index
            this.searchMy()
          },
          goDetail(index){
            this.$router.push({
              path:'/student/myApply1',
              query:{
                'data':JSON.stringify(this.allWarnList[index])
              }
            })
          },
          courseShow(res){
            if(this.value1 == ''){
              Toast.fail('请先选择学年学期~')
            }
          },
          async itemSelect(index){
            this.option2 = [{
              text:'活动名称',
              value:0,
              index:''
            }]
            this.value2 = 0
            const params = {
              semester:index
            }
            const res = await Api.getActivityName(params)
            let concatList = []
            res.data.forEach((item,index) => {
              concatList[index] = {
                text:item.ACTIVITYNAME,
                value:index + 1,
                index:item.CJ0701ID
              }
            });
            this.option2 = this.option2.concat(concatList)
          },
          async searchMy(){
            const params = {
              semester:this.semester == '学年学期' ? '' : this.semester,
              courseName:this.courseInfo,
              cj0701id:this.activityId == '活动名称' ? '' : this.activityId
            }
            const res = await Api.getMySlowExamination(params)
            this.allWarnList = res.data
          }
        },
      }
</script>

<style lang="less" scoped>
  .delay-search{background-color: @attendance-background-color-6;border-radius:3px;margin: 20px 20px 0;padding: 11px 12px;display: flex;}
  .search-icon{background: url(../../../../static/img/search.png)no-repeat center;width: 22px;height: 22px;background-size: 22px 22px;}
  .delay-search input{background-color: @attendance-background-color-6;padding-left: 22px;flex: 1;color: @attendance-color-2;}
  .search-info{display: flex;justify-content: center;border-bottom: 1px solid @attendance-border-color-6;}
  .grey-contain>p{font-size: 14px;font-weight: 500;}
</style>



// WEBPACK FOOTER //
// src/components/student/delayTest/myApply.vue