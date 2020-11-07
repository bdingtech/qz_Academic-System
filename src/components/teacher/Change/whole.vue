<template>
	<div>
		<Header title="整体调课"></Header>
		<div class="seclate">
			<span>选择调课</span>
			<span>调课方式：{{tkfs}}</span>
			<span>调课类型：整体调课</span>
		</div>
		<NOdata v-if="this.WholeList.length == 0" title="未查询到调课数据~"></NOdata>
		<div class="edusystem" v-else>
			<div class="content" v-for="(item,index) in WholeList" :key="index" @click="fn1(item)">
				<div class="left_box">
					<p class="span">{{item.courseName}}</p>
					<span>班级:{{item.className}}</span>
					<span>周次:{{item.week}}</span>
					<span>时间:{{item.weekNote}}</span>
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
				WholeList:[],
				semesterId:'',
				changeTypeCode:'',
				dm:'',
				tkfs:'',
				pickType:''
			}
		},
		methods:{
			fn1(e){
				this.$router.push({
					path:'/whole2',
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
					changeTypeCode:this.$route.query.dm
				}
				const res = await Api.teachGetJsskxx(params)
				this.WholeList = res.data;
			}
		},
		created(){
			this.dm = sessionStorage.getItem('Alter');
			if(this.dm == '0'){
				this.tkfs = '个人调课'
			}else{
				this.tkfs = '因公调课'
			}
			this.pickType=this.$route.query.type;
			this.Whple()
		},
	}
</script>

<style lang="less" scoped>
	
	.seclate{
		width: 90%;
		margin-left: 5%;
		margin-top: 70px;
	}
	.seclate span{
		display: block;
		color: #757DA3;
		font-size: 14px;
		margin-top: 4px;
	}
	.seclate span:nth-child(1){
		color: #212F6E;
		font-size: 18px;
		font-weight:600;
	}
	.edusystem{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
	}
	.edusystem .content{
		width: 100%;
		margin-top: 20px;
		background: #F8F8F8;
		border-radius: 5px;
		min-height: 82px;
	}
	.edusystem .content .left_box{
		width: calc(100% - 40px);
		height: 100%;
		margin-left: 20px;
		padding-bottom: 10px;
	}
	.edusystem .content .left_box span{
		display: block;
	}
	.edusystem .content .left_box .span{
		color: #212F6E;
		padding-top: 10px;
		font-weight:600;
		font-size: 15px
	}
	.edusystem .content .left_box span{
		color: #757DA3;
		font-size: 12px;
		padding-top: 4px;
	}
	.edusystem .content .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.edusystem .content .right_box i{
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
// src/components/teacher/Change/whole.vue