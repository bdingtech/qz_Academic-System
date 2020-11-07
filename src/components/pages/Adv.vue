<template>
  <div class="adv">
    <Header title="已收公告"></Header>
    <NOdata title="暂无消息~" v-if="this.advLists.length == 0"></NOdata>

    <div v-else>
      <div v-for="(item,index) in advLists" :key="index">
        <div class="adv-item" >
          <h1 class="adv-title">已收公告{{index+1}}</h1>
          <p><span>{{item.ggbt}}</span></p>
          <router-link tag="div" :to="{name:'advItem',params:{ggid:item.ggid,gglbname:item.gglbname}}">
            <div class="check-dtl">查看详情</div>
          </router-link>
        </div>

        <div class="adv-time" >{{item.ggfbsj}}</div>
       </div>
    </div>

  </div>
</template>

<script>
  import {
    Api
  } from '../../utils/axios'

  export default {
    data(){
      return{
        advLists:[],
      }
    },
    methods: {
      async getList(){
        const res = await Api.getAdvList()
        console.log(res)
        let concatList = []
        res.data.forEach((item,index) => {
          concatList[index] = {
            "yyzt":item.yyzt,
            "ggfbsj":item.ggfbsj,
            "ggbt":item.ggbt,
            "ggid":item.ggid,
            "gglbname":item.gglbname,
          }
        });
        this.advLists = concatList;
        // console.log(this.advLists);
      }
    },
    created(){
     this.getList()
    },
  }
</script>

<style scoped lang="less">
    .adv-item{margin: 20px 20px 0;background-color: @attendance-background-color-10;padding: 8px 16px;text-align: center;}
    .adv-title{color: @attendance-color-1;font-weight: 600;margin-bottom: 8px;font-size: 16px;}
    .adv-item p{font-size: 14px;color: @attendance-color-2;}
    .adv-item .is-open{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .check-dtl{padding-top: 8px;border-top: 1px solid @attendance-border-color-2;margin-top: 19px;color: @attendance-color-2;font-size: 12px;}
    .adv-time{text-align: center;color: @attendance-color-2;font-size: 12px;margin-top: 8px;}
</style>



// WEBPACK FOOTER //
// src/components/pages/Adv.vue