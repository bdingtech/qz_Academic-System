<template>
	<div>
		<Header title="考场信息查询" :casLogin="casLogin"></Header>
		<NOdata v-if="this.arrList1.length == 0" title="暂无监考数据~"></NOdata>
		<div class="invi" v-else>
			<div class="content_in" v-for="(item,index) in arrList1" :key="index">
				<div class="left_box">
					<span class="span">{{item.courseName}}</span>
					<span>时间：{{item.time}}</span>
					<span>地点：{{item.place}}</span>
				</div>
				<!-- <div class="right_box"><i></i></div> -->
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
				arrList1:[]
			}
		},
		methods:{
			async Invig(){
				const res = await Api.teachInvigilatorInquiry()
				this.arrList1 = res.data;
			}
		},
		created() {
			this.Invig()
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
	.invi{
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.invi .content_in{
		width: 100%;
		min-height: 82px;
		margin-top: 20px;
		border-radius: 5px;
		background: url(../../../assets/images/gray_bg.png) center center no-repeat;
		background-size: 100% 100%;
	}
	.invi .content_in .left_box{
		width: 90%;
		height: 100%;
		margin-left: 20px;
		padding: 10px 0;
	}
	.invi .content_in .left_box span{
		display: block;
	}
	.invi .content_in .left_box .span{
		color: @attendance-color-1;
		font-weight:600;
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */
	}
	.invi .content_in .left_box span:nth-child(2),.content_in .left_box span:nth-child(3){
		color: @attendance-color-2 ;
		font-size: 12px;
		padding-top: 4px;
	}
	.invi .content_in .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.invi .content_in .right_box i{
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
// src/components/teacher/Invigilate/invigilate.vue