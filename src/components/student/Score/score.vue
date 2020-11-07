<template>
  <div class="score">
    <Header title="成绩" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
    <div class="score_content">
      <h3 class="score_title">您想要查看的成绩类型</h3>
      <NOdata title="暂无数据" v-if="resetList.length == 0"></NOdata>
      <template v-for="(item,index) in resetList">
        <h3 class="score_title" style="margin-top: 35px;" v-if="item.url == '/student/achievementRecognition'" :key="item.sort_number">成绩操作</h3>
        <router-link :to="item.path" class="score_link" :key="index">
          <p>{{item.name}}</p>
          <i class="arrow_link"></i>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return {
				Identity:sessionStorage.getItem('Identity'),
        casLogin:sessionStorage.getItem('casLogin'),
        isEnable:true,
        isLoad:false,
				i_id:'',
        resetList:[],
        list:[
          {path:'/student/semester_Score',url:'xs_cj_xq'},
          {path:'/student/grades_score',url:'xs_cj_dj'},
          {path:'/student/score_Affirmation',url:'/student/achievementRecognition'}
        ]
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
						if(item.url == 'xs_cj'){
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
						this.list.forEach(list => {
							if(item.url == list.url){
								item.path = list.path
							}
						});
					});
				}
			},
    }
  }
</script>

<style lang="less" scoped>
  .score .score_content{padding: 10px 20px;}
  .score .score_link{position: relative; width: 100%;height: 82px;display: flex;justify-content: space-between;align-items: center;background: @attendance-background-color-10;padding:20px;box-sizing: border-box;color:@attendance-color-2 ;margin-top: 25px;border-radius: 5px;}
  .score .score_link::after{position: absolute;content: '';width: 3px;height: 100%;left: 0;background-color: @attendance-background-color-1;left: 0;border-radius: 5px 0 0 5px;}
  .score .score_link p{color: @attendance-color-1;font-size: 16px;font-weight: 700;}
  .score .score_title{color: @attendance-background-color-1;font-size: 18px;height: 25px;line-height: 25px;}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/score.vue