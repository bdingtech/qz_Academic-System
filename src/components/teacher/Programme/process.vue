<template>
	<div class="process">
		<Header title="专业教学进程"></Header>
		<div class="body">
			<!-- 学年学期 -->
			<span class="M_span">
					<div class="flex_item"><span>学年学期</span></div>
					<div>
						<input type="text" @click="showPicker4 = true" readonly v-model="value4" class="pick-input" placeholder="非必选">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker4" position="bottom">
						<van-picker show-toolbar :columns="columns4" @cancel="showPicker4 = false" @confirm="onConfirm4" :item-height="35"/>
					</van-popup>
				</span>
				<!-- 院系名称 -->
				<span class="M_span">
					<div class="flex_item"><span>院系名称</span></div>
					<div>
						<input type="text" @click="showPicker2 = true" readonly v-model="value2" class="pick-input" placeholder="请点击选择">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker2" position="bottom">
						<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
					</van-popup>
				</span>
			<!-- 所在年级 -->
				<span class="M_span">
					<div class="flex_item"><span>所在年级</span></div>
					<div>
						<input type="text" @click="showPicker1 = true" readonly v-model="value1" class="pick-input" placeholder="请点击选择">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker1" position="bottom">
						<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1" :item-height="35"/>
					</van-popup>
				</span>
				<!-- 专业名称 -->
				<span class="M_span">
					<div class="flex_item"><span>专业名称</span></div>
					<div>
						<input type="text" @click="fn4()" readonly v-model="value3" class="pick-input" placeholder="请点击选择">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker3" position="bottom">
						<van-picker show-toolbar :columns="columns3" @cancel="showPicker3 = false" @confirm="onConfirm3" :item-height="35"/>
					</van-popup>
				</span>
			<!-- 班级名称 -->
				<span class="M_span">
					<div class="flex_item"><span>班级名称</span></div>
					<div>
						<input type="text" @click="classTap()" readonly v-model="value5" class="pick-input" placeholder="非必选">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker5" position="bottom">
						<van-picker show-toolbar :columns="columns5" @cancel="showPicker5 = false" @confirm="onConfirm5" :item-height="35"/>
					</van-popup>
				</span>
		</div>
		<div class="footer">
				<button class="btns" @click="fn()">查询</button>
		</div>
	</div>
</template>

<script>
import {Api} from '../../../utils/axios'
// import Header from '../header.vue'
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				options: [],
				options2: [],
				options3: [],
				options4: [],
				options5: [],
				ClassList:[],
				value4: '',//学年学期
				value5: '',//班级
				value1:'',//年级
				value2:'',//院系
				value3:'',//专业
				//年级
				showPicker1: false,
				columns1: [{
					values: [],
					className: 'column1'
				}],
				//院系
				showPicker2: false,
				columns2: [{
					values: [],
					className: 'column1'
				}],
				yxmc:'',
				academyIdList:[],
				//专业
				showPicker3: false,
				columns3: [],
				zymc:'',
				majorId:[],
				//学年学期
				showPicker4: false,
				columns4: [],
				//班级
				showPicker5: false,
				columns5: [],
				bjList:'',
				calssId:[]
			}
		},
		methods: {
			classTap(){
				if(this.columns5.length == 0){
					Toast('未查询到班级信息~')
				}else{
					this.showPicker5 = true
				}
			},
			fn4(){
				if(this.columns3.length == 0){
					Toast('未查询到专业信息~')
				}else{
					this.showPicker3 = true;
				}
			},
			async getMajor(){
				this.columns3 = []
				this.majorId = []
				//专业名称
				const params = {
					academyId:this.yxmc,
					grade:this.value1
				}
				const res = await Api.getAnnualMajorList(params)
				res.data.forEach((item,index) => {
					this.columns3.push(item.annumajorName)
					this.majorId.push(item.annumajorId)
				});
			},
			//所在年级
			onConfirm1(value1) {
				this.value1 = value1.toString();
				this.showPicker1 = false;
				this.getMajor();
			},
			//院系名称
			onConfirm2(value2,index) {
				this.value3 = '';
				this.value5 = '';
				this.value2 =value2.toString();
				this.yxmc = this.academyIdList[index]
				this.showPicker2 = false;
				this.getMajor();
			},
			//专业名称
			onConfirm3(value3,index) {
				this.value3 = value3.toString()
				this.zymc = this.majorId[index]
				this.showPicker3 = false;
				this.value5 = '';
				this.getClass();
			},
			//学年学期
			onConfirm4(value4) {
				this.value4 = value4.toString()
				this.showPicker4 = false;
			},
			//班级
			onConfirm5(value5,index) {
				this.value5 = value5.toString()
				this.bjList = this.calssId[index]
				this.showPicker5 = false;
			},
			async getClass(){
				const params = {
					academyId:this.yxmc,
					majorId:this.zymc,
					gradeId:this.value1
				}
				const res = await Api.getClassList(params)
				this.columns5 = []
				this.calssId = []
				for(let i = 0;i < res.data.length;i++){
					this.columns5.push(res.data[i].className)
					this.calssId.push(res.data[i].calssId)
				}
			},
			fn() {
				if (this.value1 =='') {
					Toast.fail('请选择年级');
					return false
				}else if (this.value2 =='') {
					Toast.fail('请选择院系');
					return false
				}else if (this.value3 =='') {
					Toast.fail('请选择专业');
					return false
				} else {
					this.$router.push({
						path: '/process2',
						query: {
							'gardeId':this.value1,
							'academyName':this.value2,
							'academyId':this.yxmc,
							'majorName':this.value3,
							'majorId':this.zymc,
							'semester':this.value4,
							'className':this.value5,
							'classId':this.bjList
						}
					})
				}
			},
			async getGrade(){
				let concatList1 = []
				const params = {
					semester:''
				}
				const res = await Api.getGradeList(params)
				for(let i = 0;i < res.data.length;i++){
					concatList1 = concatList1.concat(res.data[i].gradeName)
				}
				this.columns1[0].values = concatList1
			},
			async getAcademy(){
				let concatList2 = []
				let concatList5 = []
				const res = await Api.getAcademyList()
				for(let i = 0;i < res.data.length;i++){
					concatList2 = concatList2.concat(res.data[i].academyName)
					concatList5 = concatList5.concat(res.data[i].academyId)
				}
				this.columns2[0].values = concatList2
				this.academyIdList = concatList5
			},
			async getSem(){
				const res = await Api.getSemesterList()
				for(let i = 0;i < res.data.length;i++){
					this.columns4.push(res.data[i].semesterName)
				}
				// console.log("myData"+this.columns4);
				if(this.columns4 && this.columns4.length>0){
					this.value4=this.columns4[0]
				}
			}
		},
		created() {
				//所在年级
				this.getGrade()
				//院系名称
				this.getAcademy()
				//学年学期
				this.getSem()
		},
	}
</script>

<style lang="less">
  .process .van-picker__columns::before{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .process .van-picker__columns::after{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .process .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}

	.title {
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

	.body {
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
	}

	.body .M_span {
		color: @attendance-color-1;
		font-size: 16px;
		width: 100%;
		display: inline-block;
		border-bottom: 2px solid @attendance-border-color-6;
		margin-top: 20px;
	}

	.body .M_span input {
		/* float: right; */
		border: none;
		outline: none;
		height: 24px;
		width: 180px;
	}

	.body .M_span input::-webkit-input-placeholder {
		text-align: right;
		color: @attendance-background-color-2;
		font-size: 16px;
	}

	.footer {
		width: 90%;
		margin: 0 auto;
		height: 44px;
	}

	.footer .btns {
		width: 90%;
		height: 44px;
		background: @attendance-background-color-1 ;
		color: @attendance-color-3;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		/* margin-top:90%; */
		position: fixed;
		bottom: 20px
	}

	.el-select {
		width: 180px;
		float: right;
	}
	.el-message{
		margin-top: -20px;
	}
	.el-input__inner{
		border: none
	}
	.body .M_span{
		display: inline-block;
		width: 100%;
		height: 45px;
		/* line-height: 51px; */
		margin-top: 3px;
		border-bottom:1px solid @attendance-border-color-6;
		display: flex;
		justify-content: space-between
	}
	.body .M_span input::placeholder{
		color: @attendance-background-color-2;
		font-size: 16px;
		font-weight: 400;
	}
	.body .M_span .fr_span{
		width: 15px;
		height: 15px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		vertical-align: middle;
	}
	.body .M_span input{
		color: @attendance-color-1;
		font-weight: 600;
    	width: 180px;
		height: 41px;
		/* text-indent: 112px */
		text-align: right
	}
	.body .M_span .flex_item{
		float: left;
		height: 22px;
		margin-top: 10px;
	}
	.body .M_span .flex_item i{
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
	.body .M_span .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle;
	}
	.body .M_span .flex_item span{
		color: @attendance-color-1;
		font-size: 16px
	}
	.body .M_span .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.body .M_span .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Programme/process.vue