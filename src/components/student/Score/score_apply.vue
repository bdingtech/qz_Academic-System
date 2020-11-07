<template>
  <div class="score_apply">
    <Header title="我的成绩认定申请"></Header>
    <NOdata title="当前没有已申请的课程~" v-if="this.applyList.length == 0"></NOdata>
    <div class="score_apply_list">
      <div v-for="(item,index) in applyList" :key="index" @click="scoreDetail(item.cjrd02id)">
        <div>
          <h4>{{item.courseName}}</h4>
          <p>替换课程：{{item.substitutionCourseName}}</p>
          <p>申请日期：{{item.date}}</p>
        </div>
        <h1 :style="item.auditStatus == '审核中' ? 'color:#7469F8' :(item.auditStatus == '通过' ? 'color:#12DDD6' :'color:#F86969')">{{item.auditStatus}}</h1>
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
        applyList:[]
      }
    },
    created(){
      this.getList()
    },
    methods:{
      async getList(){
        const res = await Api.getMyApply()
        this.applyList = res.data
      },
      scoreDetail(res){
        this.$router.push({
          path:'/student/score_confirm',
          query:{
            'info':res
          }
        })
      }
    },


  }
</script>

<style lang="less" scoped>
  .score_apply .score_apply_list{box-sizing: border-box;padding: 20px;}
  .score_apply .score_apply_list>div{display: flex;justify-content: space-between;align-items: center;background:rgba(248,248,248,1);border-radius:5px;padding: 10px 20px;margin-bottom: 20px;}
  .score_apply .score_apply_list>div>div{width: 81%;}
  .score_apply .score_apply_list>div h4{color: @attendance-color-1 ;font-size: 16px;margin-bottom: 4px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .score_apply .score_apply_list>div p{color: @attendance-color-2 ;font-size: 12px;line-height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .score_apply .score_apply_list>div h1{font-size: 14px;font-weight: 600;}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/score_apply.vue