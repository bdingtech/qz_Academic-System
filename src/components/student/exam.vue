<template>
  <div>
      <Header title="考试安排" :casLogin="casLogin"></Header>
      <NOdata v-if="testArrange.length == 0 && isLoad" title="暂无考试安排~"></NOdata>
      <template v-else>
        <div class="grey-contain" v-for="(item,index) in testArrange" :key="index">
          <div>
            <p class="contain-txt">{{item.courseName}}</p>
            <p class="contain-txt1">位置：{{item.examinationPlace}}</p>
            <p class="contain-txt1">时间：<span style="color: #F86969;">{{item.time}}</span></p>
          </div>
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
        casLogin:sessionStorage.getItem('casLogin'),
        testArrange:[],
        isLoad:false
      }
    },
    methods:{
      async getList(){
        const params = {
          'semester':''
        }
        const res = await Api.examinationArrangement()
        this.testArrange = res.data;
        this.isLoad = true;
      }
    },
    created(){
      this.getList()
    },
  }
</script>

<style lang="less" scoped>
.grey-contain .contain-txt{line-height: 22px;}
.grey-contain .contain-txt1{line-height: 17px;}
.grey-contain>div>p:nth-child(2){margin-bottom: 2px;}
</style>



// WEBPACK FOOTER //
// src/components/student/exam.vue