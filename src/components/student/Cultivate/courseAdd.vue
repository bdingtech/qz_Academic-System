<template>
  <div>
    <Header :title="this.$route.query.type == 0 ? '培养目标' : '详细说明'"></Header>
    <div class="courseDetails content_">
      <article v-html="this.$route.query.type == 0 ? this.detailList.target : this.detailList.explain"></article>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        detailList:[]
      }
    },
    methods:{
      async getList(){
        const res = await Api.targetAndExplain()
        if(res.data[0]){
          this.detailList = res.data[0]
        }
      }
    },
    created(){
      this.getList()
    },
    
  }

</script>

<style lang="less" scoped>
  /* .courseDetails.content_{font-size: 16px;color: #757DA3;line-height:22px;} */
</style>



// WEBPACK FOOTER //
// src/components/student/Cultivate/courseAdd.vue