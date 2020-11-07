<template>
  <div class="eva-item">
      <Header title="学生评教" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
      <NOdata v-if="evaluateList.length == 0" title="暂无评教数据~"></NOdata>
      <div class="evaluate_content">
        <div v-for="(item,index) in evaluateList" :key="index" @click="teachEva(item.PJ01ID,item.PJ05ID,item.BATCHID)">
          <div>
            <h4>{{item.SEMESTER}}</h4>
             <p>分类：{{item.EVALUATIONBATCH}}</p>
             <p>学期：{{item.SEMESTER}}</p>
          </div>
          <span class="icon_right"></span>
        </div>
      </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        casLogin:sessionStorage.getItem('casLogin'),
        evaluateList:[]
      }
    },
    created(){
      this.getEvaluate()
    },
    methods:{
      async getEvaluate(){
        const res = await Api.getEvaluateApi()
        this.evaluateList = res.data
      },
      teachEva(id1,id2,id3){
        this.$router.push({
          path:'/student/teachEvaluate',
          query:{
            'pj01id':id1,
            'pj05id':id2,
            'pj0502id':id3
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .eva-item .evaluate_content{font-family:PingFangSC;padding: 20px;}
  .eva-item .evaluate_content>div{width: 100%;display: flex;justify-content: space-between;align-items: center;background: @attendance-background-color-10;padding:10px 20px;box-sizing: border-box;color:@attendance-color-2 ;
    margin-bottom: 15px;border-radius: 5px;position: relative;}
  .eva-item .evaluate_content>div::after{position: absolute;content: '';background-color: @attendance-background-color-1;width: 3px;left: 0;border-radius: 5px 0 0 5px;height: 100%;}
  .eva-item .evaluate_content>div p{color: @attendance-color-2;font-size: 12px;line-height: 17px;margin-bottom: 2px;}
  .eva-item .evaluate_content>div h4{color: @attendance-color-1;font-size: 16px;line-height: 22px;margin-bottom: 4px;}
  .eva-item .evaluate_content div .icon_right{height: 15px;width: 15px;background: url(../../../../static/img/arrow.png) center center no-repeat;background-size: contain;}
</style>



// WEBPACK FOOTER //
// src/components/student/Evaluate/evaluate.vue