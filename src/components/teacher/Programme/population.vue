<template>
	<div>
		<Header title="培养方案总纲"></Header>
		<NOdata v-if="this.arrList2.length == 0" title="暂无数据~"></NOdata>
		<div class="year" v-else>
			<div class="con" v-for="(item,index) in arrList2" :key="index" @click="fn(item.versionId)">
				<div class="left_box">
					<span class="sp">{{item.versionName}}</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
		</div>
	</div>
</template>

<script>
import {Api} from '../../../utils/axios'
	export default {
		data() {
			return {
				arrList2: [],
				List:[]
			}
		},
		methods:{
			async Populations(){
				const res = await Api.teachFosterVertionList()
				this.arrList2 = res.data
			},
			async fn(val){
				const params = {
					versionId:val
				}
				const res = await Api.teachFosterOutlineDetail(params)
				this.List = res.data;
				this.$router.push({
					path:'/population2',
					query:{
						'data':this.List
					}
				})
			}
		},
		created(){
			this.Populations()
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
	.year{
		width: 90%;
		margin: 70px auto 0;
	}
	.con{
		position: relative;
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}
	.con::after{position: absolute;width: 3px;height: 100%;content: '';background-color: @attendance-background-color-1 ;left: 0;border-radius: 5px 0 0 5px;}
	.con .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.con .left_box .sp{
		display: block;
	}
	.con .left_box .sp{
		color: @attendance-color-1;
		margin-top: 30px;
		font-weight:600
	}
	
	.con .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.con .right_box i{
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
// src/components/teacher/Programme/population.vue