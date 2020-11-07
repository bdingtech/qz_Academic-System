<template>
	<div>
		<Header title="毕业设计" :casLogin="casLogin"></Header>
		<NOdata title="暂无数据" v-if="resetList.length == 0"></NOdata>
		<div class="subject" v-else>
			<router-link :to='item.path' class="content" v-for="(item,index) in resetList" :key="index">
				<div class="left_box">
					<span class="sp">{{item.name}}</span>
				</div>
				<div class="right_box"><i></i></div>
			</router-link>
		</div>
	</div>
</template>

<script>
import {Api} from '@/utils/axios'
	export default{
		
		data(){
			return{
				Identity:sessionStorage.getItem('Identity'),
				casLogin:sessionStorage.getItem('casLogin'),
				Arrlist4:[
					{
						title:"学生选题情况",
						path:'selected',
						url:'js_bysj_xsxt'
					},
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
					xx0101id: sessionStorage.getItem('schoolCode') || '',
					type: this.Identity == '2' ? '0' : '',
					isqy: '',
					key: 'qzkj'
				}
				const res = await Api.getHomeMenuApi(params)
				if(res.data.length > 0){
					res.data.forEach(item => {
						if(item.url == 'js_bysj'){
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
						this.Arrlist4.forEach(list => {
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
	.title{
		line-height: 34px;
		width: 90%;
		margin: 10px auto;
	}
	.title a {
		text-decoration: none;
		color: @attendance-color-4;
		font-size: 18px;
		font-weight: 600;
	}
	
	.title a i {
		text-decoration: none;
		color: @attendance-color-4;
		vertical-align: middle;
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/back_left.png)center center no-repeat;
		background-size: 100%;
		margin-right: 5px;
	}
	.subject{
		margin-top: 70px;
		width: 90%;
		margin-left:5%;
	}
	.subject .content{
		position: relative;
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}
	.subject .content::after{position: absolute;width: 3px;height: 100%;content: '';background-color: @attendance-background-color-1;left: 0;border-radius: 5px 0 0 5px;}
	.subject .content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.subject .content .left_box .sp{
		display: block;
		color: @attendance-color-1;
		line-height: 82px;
		font-weight:600;
	}
	
	.subject .content .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.subject .content .right_box i{
		display: inline-block;
		margin-top:35px;
		margin-left: 60px;
		width: 9px;
		height: 13px;
		background: url(../../../assets/images/back_right.png)center center no-repeat;
		background-size: 100%;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Design/design.vue