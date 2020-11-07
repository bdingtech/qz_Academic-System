<template>
  <div class="delay-exam">
      <Header title="缓考" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
      <div class="delay-search">
        <i class="search-icon" @click="delaySearch()"></i>
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
      </div>
      <NOdata v-if="this.allWarnList.length == 0 && isLoad" title="暂无缓考数据~"></NOdata>
      <div v-else>
        <a class="grey-contain" v-for="(item,index) in allWarnList" :key="index" @click="goApply(index)">
          <div>
            <p class="contain-txt">{{item.courseName}}</p>
            <p class="contain-txt1">学时：{{item.period}}</p>
            <p class="contain-txt1">学分：{{item.credit}}</p>
          </div>
          <!-- <i class="arrow_link"></i> -->
        </a>
      </div>
      <router-link class="delay-btn" to="/student/myApply">
        <button>我的缓考申请</button>
      </router-link>

  </div>
</template>

<script>
  // import Header from '../header.vue';
  // import NOdata from '../NOdata.vue';
  import { Toast } from 'vant';
  import { Api } from '../../../utils/axios'
  export default {
        data() {
          return {
            casLogin:sessionStorage.getItem('casLogin'),
            allWarnList:[],
            activityValue:'',
            semPicker:false,
            actPicker:false,
            semester:'学年学期',
            curSemester:'',
            activity:'活动名称',
            value1: 0,
            courseInfo:'',
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
          async getMain(){
            const res = await Api.getCurrentTerm()
            this.curSemester = res.data[0].semesterId;
            this.semester = res.data[0].semesterId;
            this.getSlow(res.data[0].semesterId)
            this.itemSelect(res.data[0].semesterId)
          },
          async getSlow(val){
            const params = {
              semester:val,
              courseName:'',
              cj0701id:''
            }
            const res = await Api.getSlowExamination(params)
            this.allWarnList = res.data;
            this.isLoad = true;
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
          actTap(){
            if(this.semester == '' || this.semester == '学年学期'){
              Toast.fail('请先选择学年学期')
            }else{
              this.actPicker = true
            }
          },
          semConfirm(e,val){
            this.semPicker = false;
            if(e.text == '学年学期'){
              this.semester = this.curSemester
            }else{
              this.semester = e.text
            }
            this.delaySearch();
            this.itemSelect(this.semester)
          },
          actConfirm(e,val){
            this.actPicker = false;
            this.activity = e.text
            this.activityId = e.index
            this.delaySearch()
          },
          async itemSelect(index){
            this.value2 = 0
            this.option2 = [{
              text:'活动名称',
              value:0,
              index:''
            }]
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
          goApply(val){
            this.$router.push({
              path:'/student/delayApply',
              query:{
                'data':JSON.stringify(this.allWarnList[val])
              }
            })
          },
          async delaySearch(){
            const params = {
              semester:this.semester,
              courseName:this.courseInfo,
              cj0701id:this.activityId == '活动名称' ? '' : this.activityId
            }
            const res = await Api.getSlowExamination(params)
            this.$store.state.courseInfo = this.courseInfo;
            this.$store.state.value1 = this.value1
            this.allWarnList = res.data;
            this.$store.state.allWarnList = this.allWarnList
          },
        },
  }
</script>

<style lang="less" scoped>
.delay-exam .grey-contain .contain-txt{line-height: 22px;}
.delay-exam .grey-contain .contain-txt1{line-height: 17px;}
  .delay-search{background-color: @attendance-background-color-6;border-radius:3px;margin: 20px 20px 0;padding: 11px 12px;display: flex;}
  .search-icon{background: url(../../../../static/img/search.png)no-repeat center;width: 20px;height: 20px;background-size: 100%;}
  .delay-search input{background-color: @attendance-background-color-6;padding-left: 11px;flex: 1;color: @attendance-color-2;}
  .search-info{display: flex;justify-content: center;border-bottom: 1px solid @attendance-border-color-6;padding: 20px 0 7px;}
  .search-info input{width: 40%;text-align: center;padding: 10px 0}
  .delay-btn{position: fixed;padding: 20px;width: 100%;text-align: center;bottom: 0;background-color: @attendance-color-3;box-sizing: border-box;}
  .delay-btn button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;width: 100%;border-radius: 3px;}
  .grey-contain:last-child{margin-bottom: 80px;}
  .search-info .sem-drop,.search-info .sem-drop div{display: flex;align-items: center;color: @attendance-color-2;font-size: 14px;justify-content: center;}

  .search-info .sem-drop{width: 80%;}
  .search-info .sem-drop>div{width: 45%;text-align: center;display: flex;align-items: center;justify-content: center;}
  .search-info .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}/*box-shadow:0px -2px 2px 0px rgba(223,223,223,0.5);*/
  .search-info .sem-drop p{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;}
  .search-info .sem-drop>div{position: relative}
  .search-info .sem-drop>div i{background: url(../../../../static/img/Triangle.png)no-repeat center;width: 10px;height: 10px;background-size: 10px 8px;margin-left: 5px;}
  .search-info .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{font-weight: 600;color: @attendance-color-1;}
  .search-info .van-picker__columns::before{width: 150px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .search-info .van-picker__columns::after{width: 150px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}

</style>



// WEBPACK FOOTER //
// src/components/student/delayTest/delayedExam.vue