<template>
  <div class="advItem">
    <Header advItem-title="公告详情"></Header>

    <div class="advItem-asid">
      <p>{{advItemLists.ggbt}}</p>
      <p>发布类别：<span>{{this.$route.params.gglbname}}</span></p>
      <p>发布人：<span>{{advItemLists.ggfsr}}</span></p>
      <p>发布时间：<span>{{advItemLists.ggfbsj}}</span></p>
      <p>有效期：<p><span>{{advItemLists.ggkssj}}</span>
        ~<span>{{advItemLists.ggjssj}}</span></p></p>
    </div>

    <div class="advItem-content">
      <p>公告内容：</p>
      <span v-html="advItemLists.ggnr"></span>
    </div>

    <div class="advItem-foot" v-if="isShow" @click="downloadFile">
      <van-button type="primary" size="large">下载附件</van-button>
    </div>

  </div>
</template>

<script>
  // import Header from '../student/header.vue'
  import Vue from 'vue';
  import { Button } from 'vant';
  Vue.use(Button);

  import {
    Api
  } from '../../utils/axios'

  export default {
    data(){
      return{
        advItemLists:{},
        isShow:false
      }
    },
    methods: {
      async getList(){
        const params = {
          ggid:this.$route.params.ggid
        }
        const res = await Api.getAdvItemList(params)
        this.advItemLists = res.data.data[0];
        this.advItemLists.baseURL = res.config.baseURL
        if(this.advItemLists.fjname){
          this.isShow=!this.isShow;
        }
        // console.log(this.advItemLists);
        // console.log(res);
        // console.log(this.$route.params.gglbname)
      },
      async downloadFile() {
        var url= this.advItemLists.baseURL+this.advItemLists.fjid;//"http://192.168.5.139:8080/bzb_njwhd/"

        // console.log(url)
        let link =document.createElement('a');

        link.setAttribute("href",url);
        link.setAttribute("download",this.advItemLists.fjname);
        link.click();

        window.URL.revokeObjectURL(link.href);

        // console.log(res);
        // window.open(url);
      }
    },
    created(){
     this.getList()
    },
  }
</script>


<style lang="less" scoped>
  .advItem-title {
    line-height: 34px;
    width: 90%;
    margin: 10px auto;
  }

  .advItem-title a {
    text-decoration: none;
    color: @attendance-color-4;
    font-size: 18px;
    font-weight: 600;
  }

  .advItem-asid {
    width: 90%;
    margin-left: 5%;
  }

  .advItem-asid p {
    color: @attendance-color-2;
    font-size: 14px;
    margin: 7px 0;
  }

  .advItem-asid p:nth-child(1) {
    color: @attendance-color-1;
    font-size: 18px;
    margin-top: 15px;
    font-weight: 600;
  }

  .advItem-asid p span {
    font-weight: 600;
  }

  .advItem-content {
    width: 90%;
    margin-left: 5%;

  }

  .advItem-content p {
    display: block;
    color: @attendance-color-2;
    font-size: 15px;
  }

  .advItem-content span {
    text-indent: 28px;
    width: 100%;
    height: 240px;
    padding: 0;
    color: @attendance-color-2;
    font-size: 14px;
    border: none;
    outline: none;
    font-weight: 600;
  }

  .advItem-foot {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
</style>



// WEBPACK FOOTER //
// src/components/pages/AdvItem.vue