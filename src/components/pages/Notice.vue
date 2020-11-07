<template>
  <div class="notice">
    <Header title = "通知"></Header>
    <NOdata title="暂无消息~" v-if="this.msgLists.length == 0"></NOdata>

    <div v-else>
      <div v-for="(item,index) in msgLists" :key="index">
        <div class="notice-item">
          <h1 class="note-title">{{item.msgTitle}}</h1>
          <p :class="item.isOpen ? '' : 'is-open'">{{item.msgDes}}</p>
          <div class="check-dtl" @click="item.isOpen = !item.isOpen;open(item.msgId)">{{item.isOpen ? '收起' : '展开'}}</div>
        </div>
        <div class="notice-time">{{item.msgTime}}</div>
      </div>
    </div>
      
  </div>
</template>

<script>
  import { Api } from '../../utils/axios'
  export default{
    data(){
      return{
        msgLists:[],
      }
    },
    methods:{
      async open(val){
        if(this.$route.query.type == '1'){
          const params = {
            msgId:val
          }
          const res = await Api.getMessageMarkRead(params)
        }
      },
      async getList(){
        const params = {
          msgType:this.$route.query.type
        }
        const res = await Api.getNoticeList(params)
        let concatList = []
        res.data.forEach((item,index) => {
          concatList[index] = {
            "msgTitle":item.msgTitle,
            "msgDes":item.msgDes,
            "msgTime":item.msgTime,
            "msgId":item.msgId,
            "isOpen":false
          }
        });
        this.msgLists = this.msgLists.concat(concatList);
      }
    },
    created(){
      this.getList()
    },
  }
</script>

<style lang="less" scoped>
  .black-title{display: flex;align-items: center;}
  .notice-item{margin: 20px 20px 0;background-color: @attendance-background-color-10;padding: 8px 16px;text-align: center;}
  .note-title{color: @attendance-color-1;font-weight: 600;margin-bottom: 8px;font-size: 16px;}
  .notice-item p{font-size: 14px;color: @attendance-color-2;}
  .notice-item .is-open{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .check-dtl{padding-top: 8px;border-top: 1px solid @attendance-border-color-2;margin-top: 19px;color: @attendance-color-2;font-size: 12px;}
  .notice-time{text-align: center;color: @attendance-color-2;font-size: 12px;margin-top: 8px;}
</style>



// WEBPACK FOOTER //
// src/components/pages/Notice.vue