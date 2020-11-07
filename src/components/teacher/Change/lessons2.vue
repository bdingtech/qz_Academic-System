<template>
	<div>
		<Header title="补课申请"></Header>
		<div class="less">
			<span>选择调课</span>
			<span>调课方式：{{tkfs}}</span>
			<span>调课类型：补课</span>
		</div>
		<div class="edusy">
			<div class="content" v-for="(item,index) in WholeList" :key="index" @click="fn1(item)">
				<div class="left_box">
					<span class="span">{{item.courseName}}</span>
					<span>周次:{{item.week}}</span>
					<span>时间:{{item.endTime}}</span>
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
				WholeList:[],
				semesterId:'',
				changeTypeCode:'',
				dm:'',
				tkfs:''
			}
		},
		methods:{
			fn1(e){
				this.$router.push({
					path:'/lessons',
					query:{
						'week':e.week,
						'time':e.endTime,
						'className':e.courseName,
						'classNames':e.className,
						'address':e.teachingBuildingName,
						'coursePlanId':e.coursePlanId,
						'weekNote':e.weekNote,
						'oldWeek':e.weekDetail,
						'semesterId':e.semesterId,
						'classRoom':e.classRoom,
						'noticeId':e.noticeId,
						'timeFlag':e.timeFlag,
						'dm':this.dm
					}
				})
			},
			async Whple(){
				const params = {
					semesterId:'',
					changeTypeCode:'1'
				}
				const res = await Api.teachGetJsskxx(params)
				this.WholeList = res.data
			}
		},
		created(){
			this.Whple()
			this.dm = this.$route.query.dm;
			this.tkfs=this.$route.query.studentNumber;
		},
	}
</script>

<style lang="less" scoped>
	
	.less{
		width: 90%;
		margin-left: 5%;
	}
	.less span{
		display: block;
		color: #757DA3;
		font-size: 14px;
		margin-top: 4px;
	}
	.less span:nth-child(1){
		color: #212F6E;
		font-size: 18px;
		font-weight:600;
	}
	.edusy{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
	}
	.edusy .content{
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: #F8F8F8;
		border-radius: 5px;
	}
	.edusy .content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.edusy .content .left_box span{
		display: block;
	}
	.edusy .content .left_box .span{
		color: #212F6E;
		padding-top: 15px;
		font-weight:600;
		font-size: 15px
	}
	.edusy .content .left_box span:nth-child(2),.content .left_box span:nth-child(3){
		color: #757DA3;
		font-size: 12px;
		padding-top: 4px;
	}
	.edusy .content .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.edusy .content .right_box i{
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
// src/components/teacher/Change/lessons2.vue