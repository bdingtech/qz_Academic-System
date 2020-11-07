<template>
	<div>
		<Header title="专业培养方案"></Header>
		<div class="body">
			<ul class="ul">
				<li @click="showPicker1 = true" v-if="this.academyId">{{academyId}}</li>
				<li @click="showPicker2 = true">{{gardeId}}级</li>
				<li @click="showPicker3 = true">{{majorId}}</li>
			</ul>
		</div>
		<div class="article">
			<p>搜索结果</p>
			<NOdata title="暂无搜索结果~" v-if="this.pageData.length == 0?isShow3:''"></NOdata>
			<div class="content" v-for="(item,index) in pageData" :key="index">
				<span>{{item.courseName}}</span>
				<span class="sp">学分：{{item.credit}}</span>
				<span class="sp">考核方式：{{item.evaluationMode}}</span><br/>
				<span class="sp">总学时：{{item.period}}</span>
				<span class="sp">开设学期：{{item.openSemesterId}}</span><br/>
				<span>参考周学时：{{item.weekOfSchool}}</span><br/>
				<span>课程编码：{{item.courseCode}}</span><br/>
				<span>开课单位：{{item.courseUnits}}</span><br/>
			</div>
		</div>
		<div class="tan">
			<!-- 院系 -->
			<van-popup v-model="showPicker1" position="bottom">
				<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1"/>
			</van-popup>
			<!-- 年级 -->
			<van-popup v-model="showPicker2" position="bottom">
				<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2"/>
			</van-popup>
			<!-- 专业 -->
			<van-popup v-model="showPicker3" position="bottom">
				<van-picker show-toolbar :columns="columns3" @cancel="showPicker3 = false" @confirm="onConfirm3"/>
			</van-popup>
		</div>
		
	</div>
</template>

<script>
import {Api} from '../../../utils/axios'
	export default {
		data() {
			return {
				pageData:[],
				isShow3:true,
				gardeId:'',
				academyId:'',
				majorId:'',
				grade:[],
				academy:[],
				major:[],
				//院系
				showPicker1: false,
				columns1: [],
				yxmc:'',
				academy:[],
				//年级
				showPicker2: false,
				columns2: [],
				njmc:'',
				garde:[],
				//专业
				showPicker3: false,
				columns3: [],
				zymc:'',
				major:[],
				gradeId:[]
			}
		},
		methods:{
			//院系
			async onConfirm1(value1,index) {
				this.academyId = value1
				this.yxmc = this.academy[index];
				this.majorId = '请选择'
				this.showPicker1 = false;
				//专业名称
				const params = {
					academyId:this.yxmc,
					grade:this.gardeId
				}
				const res = await Api.getAnnualMajorList(params)
				this.columns3 = [];
				this.major = [];
				for(let i = 0;i < res.data.length;i++){
					this.columns3.push(res.data[i].annumajorName)
					this.major.push(res.data[i].annumajorId)
				}
				this.Major()
			},
			//年级
			onConfirm2(value2,index) {
				this.gardeId =value2.toString()
				this.njmc =this.gradeId[index]
				this.showPicker2 = false;
				this.Major();
				this.getMajor()
			},
			//专业
			onConfirm3(value3,index) {
				this.majorId =value3.toString()
				this.zymc = this.major[index]
				this.showPicker3 = false;
				this.Major()
			},
			async Major(){
				const params = {
					academyId:this.yxmc,
					majorId:this.zymc,
					gardeId:this.gardeId
				}
				const res = await Api.teachMajorFosterDetail(params)
				this.pageData = res.data
			},
			async getMajor(){
				this.columns3 = []
				this.major = []
				const params = {
					academyId:this.yxmc,
					grade:this.gardeId
				}
				const res = await Api.getAnnualMajorList(params)
				for(let i = 0;i < res.data.length;i++){
					this.columns3.push(res.data[i].annumajorName)
					this.major.push(res.data[i].annumajorId)
				}
			},
			async getCampus(){
				const res = await Api.getAcademyList()
				for(let i = 0;i < res.data.length;i++){
					this.columns1.push(res.data[i].academyName);
					this.academy.push(res.data[i].academyId);
				}
			},
			async getClass(){
				const res = await Api.getGradeList()
				for(let i = 0;i < res.data.length;i++){
					this.columns2.push(res.data[i].gradeName);
					this.gradeId.push(res.data[i].gradeId);
				}
			}
		},
		mounted (){
			this.pageData = this.$route.query.data
		},
		created(){
			this.gardeId = this.$route.query.gardeId;
			this.academyId = this.$route.query.academyId;
			this.majorId = this.$route.query.majorId;
			this.zymc = this.$route.query.zyid;
			this.yxmc = this.$route.query.yxid
			//院系
			this.getCampus()
			//年级
			this.getClass()
			this.getMajor()
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
	.body{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
	}
	.body .ul{
		margin: 0;
		padding: 0;
	}
	
	.body .ul li{
		list-style: none;
		/* width: 132px; */
		padding: 0 15px;
		height: 30px;
		background: @attendance-background-color-7;
		color: @attendance-background-color-1;;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
		float: left;
		margin-top: 20px;
		border-radius: 3px;
	}
	.body .ul li:nth-child(2){
		margin-left: 20px;
		margin-right: 20px;
	}
	.article{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
		overflow: hidden;
	}
	.article>p{
		color: @attendance-color-1;
		font-size: 18px;
		margin-top: 40px;
		font-weight:600
	}
	.article .content{
		width: 100%;
		height:164px;
		background: @attendance-background-color-10;
		border-radius: 5px;
		padding-left: 20px;
		margin-top: 20px;
	}
	.article .content span:nth-child(1){
		display: block;
		color: @attendance-color-1;
		font-size: 16px;
		padding-top: 20px;
		font-weight:600;
	}
	.article .content span{
		color:@attendance-color-2;
		font-size: 12px;
	}
	.article .content .sp{
		display: inline-block;
		width: 150px;
	}
	.tan .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.tan .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>










// WEBPACK FOOTER //
// src/components/teacher/Programme/major2.vue