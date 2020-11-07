<template>
	<div>
		 <Header title="调课申请" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
		<div class="bod">
			<p class="class">您申请的调课方式属于？</p>
			<div class="content" v-for="(item,index) in changeList" :key="index" @click="fn1(item.dm)">
				<div class="left_box">
					<span class="sp">{{item.studentNumber}}</span>
				</div>
				<div class="right_box"><i></i></div>  
			</div>
		</div>
		
	</div>
</template>

<script>
// // import Header from '../header.vue'
import { Api } from '../../../utils/axios'
	export default{
		data(){
			return{
				casLogin:sessionStorage.getItem('casLogin'),
				changeList:[]
			}
		},
		methods:{
			async Change(){
				const res = await Api.teachChangeModeList()
				this.changeList = res.data;
			},
			fn1(val){
				sessionStorage.setItem('Alter',val) //0个人调课  1因公调课
				this.$router.push('/change_class2')
			}
		},
		created(){
			this.Change()
		},
	}
</script>

<style lang="less" scoped>
	.class{
		color: #7469F8;
		font-size: 18px;
		margin-top: 10px;
		font-weight:600;
	}
	.bod{
		width: 90%;
		margin: 70px auto 0;
	}
	.content{
		position: relative;
		display: inline-block;
		width: 100%;
		height: 82px;
		margin-top: 10px;
		background: #F8F8F8;
		border-radius: 5px;
	}
	.content::after{position: absolute;width: 3px;height: 100%;content: '';background-color: #7469F8;left: 0;border-radius: 5px 0 0 5px;}
	.content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.content .left_box .sp{
		display: block;
	}
	.content .left_box .sp{
		color: #212F6E;
		line-height: 82px;
		font-weight:600;
	}
	
	.content .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.content .right_box i{
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
// src/components/teacher/Change/change_class.vue