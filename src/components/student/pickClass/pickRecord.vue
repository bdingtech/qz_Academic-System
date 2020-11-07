<template>
  <div>
    <Header title="选课记录"></Header>
    <div class="pick-record">
      <div class="pick-item" v-for="(item,index) in pickList" :key="index">
        <div class="pick-text">
          <p>{{item.courseName}}</p>
          <ul>
            <li>学分：{{item.credit}}分</li>
            <li>学时：{{item.period}}学时</li>
            <li>上课老师：{{item.classTeacher}}</li>
            <li v-html="'上课时间：' + item.classTime"></li>
            <li v-html="'上课地点：' + item.classPlace"></li>
            <li v-if="item.kctxmc" v-html="'课程体系：' + item.kctxmc"></li>
          </ul>
        </div>
        <div><button class="pick-btn" @click="exitSelect(item.noticeId)">退选</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import {Toast} from 'vant';
  import { Api } from '../../../utils/axios'
  export default{
    data(){
      return{
        pickList:[],
      }
    },
    created(){
      this.getList()
    },
    methods:{
      async getList(){
        const params = {
          rotationId:this.$route.query.data
        }
        const res = await Api.selectWxgetYxkcList(params)
        this.pickList = res.data;
        if(res.data == ''){
          Toast(res.errorMessage)
        }
      },
      exitSelect(val){
        this.$router.push({
          path:'/student/exitPick',
          query:{
            'id':val,
            'data':this.$route.query.data,
            'course':this.$route.query.course,
            'exit':this.$route.query.exit,
            'session':this.$route.query.session
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .pick-record{padding: 0 20px;}
  .pick-record .pick-item{background-color: @attendance-background-color-10;border-radius: 5px;padding: 20px;display: flex;justify-content: space-between;margin-bottom: 20px;}
  .pick-record .pick-btn{background-color: @attendance-background-color-13;border-radius: 3px;color: @attendance-color-3;padding: 11px 0px;box-sizing: border-box;width: 75px;}
  .pick-record .pick-text p{color: @attendance-color-1;font-weight: 700;margin-bottom: 4px;line-height: 22px;}
  .pick-record .pick-text ul li{font-size: 12px;color: @attendance-color-2;margin-bottom: 2px;line-height: 17px;}
</style>



// WEBPACK FOOTER //
// src/components/student/pickClass/pickRecord.vue