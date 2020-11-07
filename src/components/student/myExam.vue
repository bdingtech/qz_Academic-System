<template>
  <div>
    <Header title="我的报名申请"></Header>
    <NOdata v-if="this.changeList.length == 0" title="暂无报名信息~"></NOdata>
    <template v-else>
      <div class="grey-contain" v-for="(item,index) in changeList" :key="index">
        <div>
          <p>{{item.examinationType}}({{item.examinationGrade}})</p>
          <span>截止时间：{{item.deadline}}</span><br>
          <span>考试时间：{{item.time}}</span>
        </div>
        <div :class="item.status == '通过' ? 'text2' : 'text1'">{{item.status}}</div>
      </div>
    </template>
  </div>
</template>

<script>
  // // import Header from './header.vue'
  // import NOdata from './NOdata.vue'
  import { Api } from '../../utils/axios'
  export default {
    data(){
      return{
        changeList:[]
      }
    },
    methods:{
      async getList(){
        const res = await Api.getMyExamination()
        this.changeList = res.data
      }
    },
    created(){
      this.getList()
    },
  }
</script>

<style lang="less" scoped>
  .grey-contain>div:first-child{width: 80%;}
  .grey-contain p{font-weight: 600;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .grey-contain span{color: @attendance-color-2;font-size: 12px;}
  .grey-contain .text1{font-size: 14px;color: @attendance-background-color-13;font-weight: 600;}
  .grey-contain .text2{font-size: 14px;color: @attendance-background-color-12;font-weight: 600;}
</style>



// WEBPACK FOOTER //
// src/components/student/myExam.vue