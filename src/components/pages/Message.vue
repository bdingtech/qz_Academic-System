<template>
	<div class="message">
		<p class="black-title">通知</p>
    <router-link class="msg-item" tag="div" :to="{path:'/notice',query:{type:0}}">
      <img src="../../../static/img/undo.png"/>
      <div class="item-text">
        <span>待处理消息</span>
        <p>{{this.pendList}}</p>
      </div>
    </router-link>
    <router-link class="msg-item" tag="div" :to="{path:'/notice',query:{type:1}}">
      <img src="../../../static/img/unread.png"/>
      <div class="item-text">
        <span>未读消息</span>
        <p>{{this.unreadList == 'undefined' ? '暂无' : this.unreadList}}</p>
      </div>
    </router-link>
    <router-link class="msg-item" tag="div" :to="{path:'/notice',query:{type:2}}">
      <img src="../../../static/img/read.png"/>
      <div class="item-text">
        <span>已读消息</span>
        <p>{{this.readList == 'undefined' ? '暂无' : this.readList}}</p>
      </div>
    </router-link>

    <router-link class="msg-item" tag="div" :to="{path:'/adv'}">
      <img src="../../../static/img/unread.png"/>
      <div class="item-text">
        <span>已收公告</span>
        <!-- <p>{{this.advList == 'undefined' ? '暂无' : '已收公告该用户第一条消息标题'}}</p> -->
      </div>
    </router-link>
	</div>
</template>

<script>
import { Api } from '../../utils/axios'
  export default{
    data(){
      return{
        pendList:'',
        unreadList:'',
        readList:'',
        // advList:''
      }
    },
    methods:{
      async getMsg(){
        const res = await Api.getMsgApi()
        for(let i = 0;i < res.data.length;i++){
          if(res.data[i].pendingMsg == undefined){
            res.data[i].pendingMsg = ''
          }
          if(res.data[i].unReadMsg == undefined){
            res.data[i].pendingMsg = ''
          }
          if(res.data[i].readMsg == undefined){
            res.data[i].readMsg = ''
          }
          // if(res.data[i].advList == undefined){
          //   res.data[i].advList = ''
          // }
          this.pendList += res.data[i].pendingMsg + ''
          this.unreadList += res.data[i].unReadMsg + ''
          this.readList += res.data[i].readMsg + ''
          // this.advList += res.data[i].advList + ''
        }
        if(this.pendList == ''){
          this.pendList = '暂无'
        }
        if(this.unreadList == ''){
          this.unreadList = '暂无'
        }
        if(this.readList == ''){
          this.readList = '暂无'
        }
        // if(this.advList == ''){
        //   this.advList = '暂无'
        // }
      }
    },
    created(){
      this.getMsg()
    }
  }
</script>

<style lang="less">
  .msg-item{margin: 20px 20px 0;background-color: @attendance-background-color-10;border-radius: 5px;height: 82px;display: flex;align-items: center;padding: 0 20px;color: @attendance-color-1;}
  .msg-item img{width: 40px;height: 40px;margin-right: 16px;}
  .item-text{display: grid;}
  .item-text span{color: @attendance-color-1;font-weight: 600;}
  .item-text p{font-size: 14px;color: @attendance-color-2;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;margin-top: 8px;height: 20px;}
</style>



// WEBPACK FOOTER //
// src/components/pages/Message.vue