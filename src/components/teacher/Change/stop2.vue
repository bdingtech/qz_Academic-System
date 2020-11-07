<template>
	<div>
		<Header title="停课"></Header>
		<div class="seclate">
			<span>选择调课</span>
			<span>调课方式：{{tkfs}}</span>
			<span>调课类型：停课申请</span>
		</div>
		<NOdata v-if="WholeList.length == 0" title="未查询到调课数据~"></NOdata>
		<div class="edusystem" v-else>
			<div class="content" v-for="(item,index) in WholeList" :key="index" @click="pickClass(item)">
				<div class="left_box">
					<span class="span">{{item.courseName}}</span>
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
import { Toast } from 'vant'
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
			pickClass(item){
				this.$router.push({
					path:'/stop',
					query:{
						'item':item,
						'dm':this.dm,
						'type':this.pickType
					}
				})
			},
			async Whple(){
				const params = {
					semesterId:'',
					changeTypeCode:'2'
				}
				const res = await Api.teachGetJsskxx(params)
				this.WholeList = res.data;
				if(res.errorMessage){
					Toast.fail(res.errorMessage)
				}
			}
		},
		created(){
			this.Whple()
			this.dm = sessionStorage.getItem('Alter');
			if(this.dm == '0'){
				this.tkfs = '个人调课'
			}else{
				this.tkfs = '因公调课'
			}
			this.pickType = this.$route.query.type;
		},
	}
</script>

<style lang="less" scoped>
	
	.seclate{
		width: 90%;
		margin-left: 5%;
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
		padding-bottom: 20px;
	}
	.edusystem .content .left_box{
		width: calc(100% - 40px);
		height: 100%;
		margin-left: 20px;
	}
	.edusystem .content .left_box span{
		display: block;
	}
	.edusystem .content .left_box .span{
		color: #212F6E;
		padding-top: 15px;
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
// src/components/teacher/Change/stop2.vue