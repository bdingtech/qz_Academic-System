<template>
	<div>
		<Header title="培养方案总纲"></Header>
		<div class="asid">
			<span>{{this.arrList1.fosterEdition}}培养方案</span>
			<span>发布人：{{this.arrList1.publisher}}</span>
			<span>时间：{{this.arrList1.publishTime}}</span>
			<span>版本：{{this.arrList1.fosterEdition}}</span>
			<!-- <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea> -->
			<p v-html="this.content"></p>
		</div>
	</div>
</template>

<script>
// import Header from '../header.vue'
	export default {
		data() {
			return {
				arrList1: [],
				// gardeId:''，
				content:''
			}
		},
		methods:{
// 			Population(){
// 				this.gardeId = this.$route.query.grade;
// 				console.log(this.gardeId)
// 				this.$axios({
// 					method:'post',
// 					url:'/teacher/fosterOutlineDetail',
// 					params:{
// 						grade:this.gardeId
// 					}
// 				}).then(res => {
// 					this.arrList1 = res.data;
// 					console.log(this.arrList1)
// 				}).catch(err => {
// 					
// 				})
// 				
// 			},
		},
		created(){
			// this.Population()
			this.arrList1 = this.$route.query.data[0];
			this.content = this.$route.query.data[0].detail

		},
	}
</script>



<style lang="less">
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
	.asid{
		width: 90%;
		margin-left: 5%;
	}
	.asid span{
		display: block;
		color: @attendance-color-2;
		font-size: 14px;
		margin: 7px 0;
	}
	.asid span:nth-child(1){
		color: @attendance-color-1;
		font-size: 18px;
		margin-top: 15px;
		font-weight:600;
	}
	.asid p{
		text-indent: 28px;
		width: 100%;
		height: 240px;
		padding: 0;
		color: @attendance-color-2;
		font-size: 14;
		border: none;
		outline: none;
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Programme/population2.vue