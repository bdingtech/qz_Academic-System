<template>
	<div>
		<Header title="学生选题情况"></Header>
		<NOdata v-if="this.arrList.length == 0" title="暂无选题数据~"></NOdata>
		<div class="type" v-else>
			<div class="contents" v-for="(item,index) in arrList" :key="index">
				<div class="left_box">
					<span class="spans">{{item.projectName}}</span>
					<span>题目编号：{{item.projectCode}}</span>
					<span>学科门类：{{item.discipline}}</span>
					<span>题目类型：{{item.subjectType}}</span>
				</div>
				<div class="right_box">
					<div class="people">
						<span>{{item.selectedNum}}</span>
						<span>选中人数</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Api } from '../../../utils/axios'
	export default {
		data() {
			return {
				arrList: [],
			}
		},
		methods:{
			async Selected(){
				const res = await Api.teachGraduationProject()
				this.arrList = res.data
			},
		},
		created:function(){
			this.Selected()
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

	.type {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.type .contents{
		width: 100%;
		height: 164px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}

	.type .contents .left_box {
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}

	.type .contents .left_box span {
		display: block;
	}

	.type .contents .left_box .spans {
		color: @attendance-color-1;
		padding-top: 18px;
		font-weight:600
	}

	.type .contents .left_box span:nth-child(2),
	.type .contents .left_box span:nth-child(3),
	.type .contents .left_box span:nth-child(4) {
		color: @attendance-color-2;
		font-size: 12px;
		padding-top: 8px;
	}

	.type .contents .right_box {
		width: 30%;
		height: 100%;
		float: right;
	}

	.type .contents .right_box .people {
		width: 70px;
		height: 42px;
		background: url(../../../assets/images/gray_icon.png) center center no-repeat;
		background-size: 100%;
		border-radius: 5px;
		margin-top: 20px;
	}

	.type .contents .right_box .people span {
		display: block;
		text-align: center;
	}

	.type .contents .right_box .people span:nth-child(1) {
		color: @attendance-color-3;
		font-size: 18px;
	}

	.type .contents .right_box .people span:nth-child(2) {
		color: @attendance-color-3;
		font-size: 10px;
		font-weight: 100;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Design/selected.vue