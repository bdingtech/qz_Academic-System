<template>
	<div>
		<Header title="教学计划"></Header>
		<div class="body">
			<ul class="ul">
				<li @click="showPicker1 = true" v-if="academyId != ''">{{academyId}}</li>
				<li @click="showPicker2 = true">{{gardeId}}级</li>
				<li @click="showPicker3 = true">{{majorId}}</li>
			</ul>
		</div>
		<div class="article">
			<p>搜索结果</p>
			<NOdata title="暂无搜索结果~" v-if="this.planList.length == 0"></NOdata>
			<template v-else>
				<div class="content" v-for="(item,index) in planList" :key='index'>
					<span>{{item.courseName}}</span>
					<span class="sp">学分：{{item.credit}}</span>
					<span class="sp">课程属性：{{item.courseAttribute}}</span><br/>
					<span class="sp">总学时：{{item.totalHours}}</span>
					<span class="sp">考核方式：{{item.evaluationMode}}</span><br/>
					<span class="sp">学期时：{{item.Semester}}</span>
					<span class="sp">课程体系：{{item.courseSystem}}</span><br/>
					<span class="sp">课程编码：{{item.courseCode}}</span>
					<span class="sp">开课单位：{{item.courseUnits}}</span><br/>
					<span class="sp">开设学期：{{item.openSemester}}</span>
				</div>
			</template>
			
		</div>
		<div class="ta">
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
	export default{
		data(){
			return{
				planList:[],
				isShow3:true,
				gardeId:'',
				academyId:'',
				majorId:'',
				grade:[],
				academy:[],
				major:[],
				list1:'',
				list2:'',
				list3:'',
				//院系
				showPicker1: false,
				columns1: [{
					values: [],
					className: 'column1'
				}],
				yxmc:'',
				academy:[],
				//年级
				showPicker2: false,
				columns2: [{
					values: [],
					className: 'column1'
				}],
				njmc:'',
				garde:[],
				//专业
				showPicker3: false,
				columns3: [],
				zymc:'',
				major:[]
			}
		},
		methods:{
			//院系
			onConfirm1(value1,index) {
				this.academyId =value1.toString()
				this.yxmc = this.academy[index]
				this.showPicker1 = false;
				this.Major();
				this.getMajor();
			},
			//年级
			onConfirm2(value2,index) {
				this.gardeId =value2.toString()
				this.njmc =this.garde[index]
				this.showPicker2 = false;
				this.Major();
				this.getMajor();
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
				const res = await Api.teachTeachingPlan(params)
				this.planList = res.data
			},
			async getMajor(){
				const params = {
					academyId:this.yxmc,
					grade:this.gardeId
				}
				const res = await Api.getAnnualMajorList(params)
				//专业名称
				this.columns3 = []
				this.major = []
				for(let i = 0;i < res.data.length;i++){
					this.columns3.push(res.data[i].annumajorName)
					this.major.push(res.data[i].annumajorId);
				}
			},
			async getAcademy(){
				let concatList1 = []
				let concatList2 = []
				const res = await Api.getAcademyList()
				for(let i = 0;i < res.data.length;i++){
					concatList1 = concatList1.concat(res.data[i].academyName)
					concatList2 = concatList2.concat(res.data[i].academyId)
					
				}
				this.columns1[0].values = concatList1
				this.academy = concatList2
			},
			async getGrade(){
				let concatList3 = []
				let concatList6 = []
				const res = await Api.getGradeList()
				for(let i = 0;i < res.data.length;i++){
					concatList3 = concatList3.concat(res.data[i].gradeName)
					concatList6 = concatList6.concat(res.data[i].gradeId)
				}
				this.columns2[0].values = concatList3
				this.garde = concatList6
			}
		},
		created(){
			this.planList = this.$route.query.data;
			this.gardeId = this.$route.query.gardeId;
			this.academyId = this.$route.query.academyId;
			this.majorId = this.$route.query.majorId;
			this.yxmc = this.$route.query.yxid;
			this.zymc = this.$route.query.zyid
			//院系
			this.getAcademy()
			//年级
			this.getGrade()
			this.getMajor();
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
		font-weight:600;
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
		margin-bottom: 5px;
	}
	.article .content span{
		color:@attendance-color-2;
		font-size: 12px;
	}
	.article .content .sp{
		display: inline-block;
		width: 150px;
	}
	.ta .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.ta .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Programme/plan2.vue