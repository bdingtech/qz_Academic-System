<template>
	<div>
		<Header title="专业教学进程"></Header>
		<div class="body">
			<ul class="ul">
				<li @click="showPicker4 = true" v-if="this.semesterId">{{semesterId}}</li>
				<li @click="showPicker1 = true">{{academyName}}</li>
				<li @click="showPicker2 = true">{{gardeId}}级</li>
				<li @click="showPicker3 = true">{{majorName}}</li>
			</ul>
		</div>
		<div class="articles">
			<p>搜索结果</p>
			<NOdata title="暂无搜索结果~" v-if="this.ClassList.length == 0"></NOdata>
			<template v-else>
				<div class="content" v-for="(item,index) in ClassList" :key="index" @click="fn1(item)">
					<div class="left_box">
						<span class="span">{{item.semester}}</span>
						<span>{{item.classname}}</span>
					</div>
					<div class="right_box"><i></i></div>
				</div>
			</template>
		</div>
		<div class="tans">
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
			<!-- 学年学期 -->
			<van-popup v-model="showPicker4" position="bottom">
				<van-picker show-toolbar :columns="columns4" @cancel="showPicker4 = false" @confirm="onConfirm4"/>
			</van-popup>
		</div>
		
	</div>
</template>

<script>
import {Api} from '../../../utils/axios'
	export default{
		data(){
			return{
				gardeId:'',
				academyId:'',
				majorId:'',
				majorName:'',
				semesterId:'',
				ClassList:[],
				semester:'',
				classId:'',
				isShow3:true,
				list1:'',
				list2:'',
				list3:'',
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
				//学年学期
				showPicker4: false,
				columns4: [{
					values: [],
					className: 'column1'
				}],
				xnxq:'',
				semesterlist:[]
			}
		},
		methods:{
			//院系
			onConfirm1(value1,index) {
				this.academyName = value1.toString()
				this.academyId = this.academy[index]
				this.showPicker1 = false;
				this.getMajor();
				this.classId = ''
				this.alterTap();
			},
			//年级
			onConfirm2(value2,index) {
				this.gardeId = value2.toString()
				this.showPicker2 = false;
				this.getMajor();
				this.classId = ''
				this.alterTap();
			},
			//专业
			onConfirm3(value3,index) {
				this.majorName = value3.toString()
				this.majorId = this.major[index]
				this.showPicker3 = false;
				this.classId = ''
				this.alterTap();
			},
			//学年学期
			onConfirm4(value4,index) {
				this.semesterId = value4.toString()
				this.xnxq = this.semesterlist[index]
				this.showPicker4 = false;
				this.classId = '';
				this.alterTap();
			},
			fn1(e){
				this.$router.push({
					path:'/speed',
					query:{
						'semester':e.semester,
						'classId':e.classId,
						'academyId':this.academyId,
						'majorId':this.majorId,
						'gardeId':this.gardeId
					}
				})
			},
			async alterTap(){
				const params = {
					semester:this.semesterId,
					classId:this.classId,
					academyId:this.academyId,
					majorId:this.majorId,
					gardeId:this.gardeId
				}
				const res = await Api.teachTeachingProcess(params)
				this.ClassList = res.data
			},
			async getMajor(){
				//专业名称
				let concatList4 = []
				let concatList5 = []
				const params = {
					academyId:this.academyId,
					grade:this.gardeId
				}
				const res = await Api.getAnnualMajorList(params)
				this.columns3 = []
				this.major = []
				res.data.forEach((item,index) => {
					this.columns3.push(item.annumajorName)
					this.major.push(item.annumajorId)
				});
			},
			async getAcademy(){
				const res = await Api.getAcademyList()
				for(let i = 0;i < res.data.length;i++){
					this.columns1.push(res.data[i].academyName)
					this.academy.push(res.data[i].academyId)
				}
			},
			async getGrade(){
				const res = await Api.getGradeList()
				for(let i = 0;i < res.data.length;i++){
					this.columns2.push(res.data[i].gradeName)
					this.garde.push(res.data[i].gradeId)
				}
			},
			async getSem(){
				let concatList7 = []
				let concatList8 = []
				const res = await Api.getSemesterList()
				for(let i = 0;i < res.data.length;i++){
					concatList7 = concatList7.concat(res.data[i].semesterName)
					concatList8 = concatList8.concat(res.data[i].semesterId)
				}
				this.columns4[0].values = concatList7
				this.semesterlist = concatList8
			}
		},
		created(){
			this.gardeId = this.$route.query.gardeId;
			this.academyId = this.$route.query.academyId;
			this.academyName = this.$route.query.academyName
			this.majorName = this.$route.query.majorName;
			this.majorId = this.$route.query.majorId;
			this.semesterId = this.$route.query.semester;
			this.classId = this.$route.query.classId;
			if(this.semesterId == ''){
				this.semesterId = ''
			}else{
				this.semesterId = this.$route.query.semester;
			}
			this.classId = this.$route.query.classId;
			if(this.classId == ''){
				this.classId = ''
			}else{
				this.classId = this.$route.query.classId;
			}
			this.alterTap();
			//院系
			this.getAcademy()
			//年级
			this.getGrade()
			//学年学期
			this.getSem()
			this.getMajor();
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
		color: @attendance-background-color-1;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
		float: left;
		margin-top: 20px;
		border-radius: 3px;
	}
	.body .ul li{
		margin-left: 10px;
		margin-right: 10px;
	}
	.articles{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
		overflow: hidden;
	}
	.articles>p{
		color: @attendance-color-1;
		font-size: 18px;
		margin-top: 40px;
		font-weight:600;
	}
	.content{
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}
	.content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.content .left_box span{
		display: block;
	}
	.content .left_box .span{
		color: @attendance-color-1;
		padding-top: 18px;
		font-weight:600;
	}
	.content .left_box span:nth-child(2){
		color: @attendance-color-2;
		font-size: 12px;
		padding-top: 8px;
	}
	.content .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.content .right_box i{
		display: inline-block;
		margin-top:35px;
		margin-left: 60px;
		width: 9px;
		height: 13px;
		background: url(../../../assets/images/back_right.png)center center no-repeat;
		background-size: 100%;
	}
	.tans .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.tans .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>









// WEBPACK FOOTER //
// src/components/teacher/Programme/process2.vue