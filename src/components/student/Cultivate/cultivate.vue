<template>
  <div class="cultivate">
    <Header title="培养方案总纲" :casLogin="casLogin"></Header>
		<NOdata title="暂无数据" v-if="resetList.length == 0"></NOdata>
    <div class="cultivate_content">
      <router-link v-for="(item,index) in resetList" :to="item.path" tag="div" :key="index" class="cultivate_link">
        <p>{{item.name}}</p>
        <i class="arrow_link"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
// import Header from '../header.vue'
// import NOdata from '../NOdata'
import {Api} from '@/utils/axios'
  export default {
    data(){
      return{
				Identity:sessionStorage.getItem('Identity'),
        casLogin:sessionStorage.getItem('casLogin'),
        fnList:[
          {name:'教学进度',path:'/student/syllabus',url:'xs_pyfa_jxjd'},
          {name:'执行计划',path:'/student/executePlan',url:'xs_pyfa_zxjh'},
          {name:'培养方案明细',path:'/student/cultivateDetail',url:'xs_pyfa_mx'},
        ],
				i_id:'',
				resetList:[]
      }
    },
    created(){
      this.Change()
    },
    methods:{
			async Change(){
				const params = {
					xx0101id: sessionStorage.getItem('schoolCode'),
					type: this.Identity == '2' ? '0' : '',
					isqy: '',
					key: 'qzkj'
				}
				const res = await Api.getHomeMenuApi(params)
				if(res.data.length > 0){
					res.data.forEach(item => {
						if(item.url == 'xs_pyfa'){
							this.i_id = item.i_id
						}
					});
				}
				this.getAuth()
			},
			async getAuth(){
				const params = {
					I_ID:this.i_id
				}
				const res = await Api.getSubMenu(params)
				this.resetList = res.data
				if(res.data.length > 0){
					this.resetList.forEach(item => {
						this.fnList.forEach(list => {
							if(item.url == list.url){
								item.path = list.path
							}
						});
					});
				}
			},
		},

  }
</script>

<style lang="less" scoped>
  .cultivate_content{width: 100%;padding: 10px 20px;box-sizing: border-box;font-family:PingFangSC;}
  .cultivate_content .cultivate_link{height: 82px;display: flex;justify-content: space-between;align-items: center;padding: 0px 20px;background: @attendance-background-color-10;border-radius: 5px;
    margin-top: 20px;position: relative;}
  .cultivate_content .cultivate_link::after{position: absolute;width: 3px;height: 100%;content: '';background-color: @attendance-background-color-1;border-radius: 5px 0 0 5px;left: 0;}
  .cultivate_content .cultivate_link p{color: @attendance-color-1;font-weight: 700;}
  .cultivate_content .cultivate_link:first-child{margin-top: 0px;}
</style>



// WEBPACK FOOTER //
// src/components/student/Cultivate/cultivate.vue