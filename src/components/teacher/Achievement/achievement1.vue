<template>
	<div>
		<Header title="成绩查询" :casLogin="casLogin"></Header>
		<NOdata v-if="this.classlist.length == 0" title="暂无数据~"></NOdata>
		<div class="achiev" v-else>
			<h4 class="ach-title">选择课程</h4>
			<div class="contentes" v-for="(item,index) in classlist" :key="index" @click="fn(item)">
				<div class="left_box">
					<span class="span">{{item.courseName}}</span>
					<span>编号:{{item.courseCode}}</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
		</div>
	</div>
</template>

<script>
import { Api } from '../../../utils/axios'
	export default{
		data(){
			return{
				casLogin:sessionStorage.getItem('casLogin'),
				classlist:[],
				classList:[],
				class:[],
				classId:'',
			}
		},
		methods:{
			async Class(){
				const res = await Api.teachGetCjcxByjs()
				this.classlist = res.data;
				this.classList = this.classlist.slice(0,-1);
			},
			fn(e){
				this.$router.push({
					path:'/achievement2',
					query:{
						'courseId':e.courseId
					}
				})
			}
		},
		created(){
			this.Class()
		},
	}
</script>

<style lang="less" scoped>
	.ach-title{font-size: 18px;color: @attendance-background-color-1;font-weight: 600;}
	
	.achiev{
		width: 90%;
		margin: 60px auto 20px;
	}
	.contentes{
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
		position: relative;
	}
	.contentes::after{position: absolute;width: 3px;height: 100%;content: '';background-color: @attendance-background-color-1;left: 0;border-radius: 5px 0 0 5px;}
	.contentes .left_box{
		width: 80%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.contentes .left_box span{
		display: block;
	}
	.contentes .left_box .span{
		color: @attendance-color-1;
		padding-top: 18px;
		font-weight:600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.contentes .left_box span:nth-child(2){
		color: @attendance-color-2;
		font-size: 12px;
		padding-top: 8px;
	}
	.contentes .right_box{
		width: 10%;
		height: 100%;
		float: right;
		display: flex;
		align-items: center;
	}
	.contentes .right_box i{
		display: inline-block;
		width: 9px;
		height: 13px;
		background: url(../../../assets/images/back_right.png)center center no-repeat;
		background-size: 100%;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Achievement/achievement1.vue