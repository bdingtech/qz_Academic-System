<template>
  <div>
      <Header title="选课中心" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
      <NOdata v-if="this.centerList.length == 0 && isLoad" title="暂无选课数据~"></NOdata>
      <div class="grey-contain" v-for="(item,index) in centerList" :key="index" @click="goCenter(item.rotationname,item.semesterid,item.courseselectiontime,item.rotationid,item.retirecausecontrol)">
        <div>
          <p class="contain-txt">{{item.rotationname}}</p>
          <span class="contain-txt1">学年学期：{{item.semesterid}}</span>
          <div class="contain-txt1">选课时间：<span style="color: #F86969;">{{item.courseselectiontime}}</span></div>
        </div>
        <i class="arrow_link"></i>
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
        centerList:[],
        isLoad:false
      }
    },
    beforeCreate(){
      sessionStorage.setItem("ifSelect",1)
    },
    created(){
      this.getList()
    },
    methods:{
      goCenter(data1,data2,data3,data4,data5){
        this.$router.push({
          path:'/student/pickCenter',
          query:{
            'data1':data1,
            'data2':data2,
            'data3':data3,
            'data4':data4,
            'data5':data5
          }
        })
      },
      async getList(){
        const res = await Api.selectWxgetXklc()
        this.centerList = res.data;
        this.isLoad = true;
      }
    },
  }
</script>

<style lang="less" scoped>
  .grey-contain{position: relative;}
  .grey-contain::after{position: absolute;width: 3px;height: 100%;left: 0;border-radius: 5px 0 0 5px;content: '';background-color: @attendance-background-color-1;}
  .grey-contain button{background-color: @attendance-background-color-1;padding: 11px 16px;border-radius: 3px;color: @attendance-color-3;}
  .grey-contain>div{width: 95%;}
  .grey-contain .contain-txt{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>



// WEBPACK FOOTER //
// src/components/student/pickClass/pickClass.vue