<template>
	<div>
		<Header title="教学进度"></Header>
		<div class="aside">
			<van-dropdown-menu active-color="#212F6E" @change="Change($event)">
			  <van-dropdown-item v-model="value1" :options="option1" />
			</van-dropdown-menu>
			<!-- <van-dropdown-menu>
				<van-dropdown-item v-model="value1" :options="option1" @change="Speed"/>
			</van-dropdown-menu> -->
		</div>
		<NOdata title="请选择学年学期~" v-if="this.speedList.length == 0"></NOdata>
		<div class="bodys">
			<div class="conts" v-for="(item,index) in speedList" :key="index">
				<span>第{{item.Week}}周</span>
				<span>
					<ul>
						<li>{{item.ProgressName}}</li>
					</ul>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {Api} from '../../../utils/axios'
	import { Toast } from 'vant'
	export default{
		data(){
			return{
				value1:0,
				option1:[],
				semester:'',
				classId:'',
				speedList:[]
			}
		},
		methods:{
			async Speed(item){
				const params = {
					semester:this.semester,
					classId:this.classId,
					academyId:this.$route.query.academyId,
					majorId:this.$route.query.majorId,
					gardeId:this.$route.query.gardeId
				}
				const res = await Api.getTeachTeachingProgress(params)
				this.speedList = res.data;
				if(res.data.length == 0){
					Toast('暂无教学进程~');
				}
			}
		},
		created(){
			this.semester = this.$route.query.semester;
			this.classId = this.$route.query.classId;
			this.Speed();
			 let concatList = []
			 concatList = {
			 	text:this.semester,
			 	value:0
			}
			this.option1 = this.option1.concat(concatList)
		},
	}
</script>

<style lang="less">
	.title {
		line-height: 34px;
		width: 90%;
		margin: 0px auto;
		padding-top: 10px;
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

	.aside {
		width: 100%;
		text-align: center;
		border-bottom: 1px solid @attendance-border-color-6;
		padding-bottom: 10px;
		background: @attendance-color-3;
		height: 45px;
		line-height: 55px;
	}

	.aside select {
		border: none;
		outline: none;
		color: @attendance-color-2;
		font-size: 14px;
		width: 130px;
		background: none;
	}

	.bodys,
	.conts {
		width: 100%;
		height: 75px;
	}

	.conts {
		margin-top: 10px;
	}

	/* .conts:nth-child(4) span:nth-child(2) ul,
	.conts:nth-child(5) span:nth-child(2) ul,
	.conts:nth-child(6) span:nth-child(2) ul {
		background: #FFBB79;
	}

	.conts:nth-child(7) span:nth-child(2) ul,
	.conts:nth-child(8) span:nth-child(2) ul,
	.conts:nth-child(9) span:nth-child(2) ul{
		background: @attendance-background-color-11;
	} */
	.conts:nth-of-type(odd) span ul{
		background: @attendance-background-color-9;
	}
	.conts:nth-of-type(even) span ul{
		background: @attendance-background-color-11;
	}
	.conts span {
		float: left;
		width: 20%;
		height: 61px;
		color: @attendance-color-2;
		font-size: 16px;
		line-height: 61px;
		text-align: center;
		overflow: hidden;

	}

	.conts span:nth-child(2) {
		width: 78%;
		height: 73px;
		text-align: left;
		font-size: 14px;
		border-bottom: 1px solid @attendance-background-color-2;
	}

	.conts span:nth-child(2) ul {
		width: 100%;
		height: 61px;
		/* background: @attendance-background-color-9; */
		border-radius: 5px 0px 0px 5px;
		list-style-type: disc !important;
	}

	.conts span:nth-child(2) ul li {
		text-indent: 20px;
		color: @attendance-color-3;
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Programme/speed.vue