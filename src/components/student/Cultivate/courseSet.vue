<template>
  <div>
    <Header title="课程设置总表"></Header>
    <NOdata v-if="this.clList.length == 0 && isLoad" title="暂无数据~"></NOdata>
    <div class="content_ courseSet" v-else>
      <div class="courseSet_list" v-for="(item,index) in clList" :key="index" @click="goDetail(index)">
        <h4 style="color: #212F6E;font-size: 16px;line-height: 24px;font-weight:600;">{{item.courseName}}</h4>
        <div class="set-part">
          <div>
            <p>学分：{{item.credit}}</p>
            <p>学时：{{item.totalHours}}</p>
            <p>课程属性:{{item.courseAttribute}}</p>
            <p>课程编号:{{item.courseCode}}</p>
          </div>
          <div>
            <p>考核方式：{{item.evaluationMode}}</p>
            <p>是否考试：{{item.whetherTest}}</p>
            <p>开设学期：{{item.openSemester}}</p>
          </div>
        </div>
        <p>开课单位：{{item.courseUnits}}</p>
      </div>

    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import { Toast } from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        clList:[],
        isLoad:false
      }
    },
    created(){
      this.getList()
    },
    methods:{
      goDetail(val){
        this.$router.push({
          path:'/student/courseDetails',
          query:{
            'data':JSON.stringify(this.clList[val])
          }
        })
      },
      async getList(){
        const res = await Api.guidanceTeaching()
        this.clList = res.data;
        this.isLoad = true;
      }
    },
  }
</script>

<style lang="less" scoped>
  .courseSet .courseSet_list{width: 100%;box-sizing: border-box;padding: 20px;background: @attendance-background-color-10;border-radius:5px;margin-bottom: 20px;}
  .courseSet .courseSet_list p{color: @attendance-color-2;font-size: 12px;line-height: 20px;overflow: hidden;}
  .courseSet .courseSet_list h4{margin-bottom: 4px;}
  .set-part{display: flex;justify-content: space-between;}
  .set-part>div{width: 48%}
</style>



// WEBPACK FOOTER //
// src/components/student/Cultivate/courseSet.vue