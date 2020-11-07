<template>
	<div class="plan">
		<Header title="教学计划"></Header>
		<div class="body">
			<div class="inp_box">
				<!-- 院系名称 -->
				<span class="My_san">
					<div class="flex_item"><span>院系名称</span></div>
					<div>
						<input type="text" @click="showPicker2 = true" readonly v-model="value2" class="pick-input" placeholder="请点击选择">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker2" position="bottom">
						<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
					</van-popup>
				</span>
				<span class="My_san">
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
				<span class="My_san">
					<div class="flex_item"><span>专业名称</span></div>
					<div>
						<input type="text" @click="fn4()" readonly v-model="value3" class="pick-input" placeholder="请点击选择">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker3" position="bottom">
						<van-picker show-toolbar :columns="columns3" @cancel="showPicker3 = false" @confirm="onConfirm3" :item-height="35"/>
					</van-popup>
				</span>
			</div>
		</div>
		<div class="footer">
				<button  class="btn" @click="fn()">查询</button>
		</div>
	</div>
</template>

<script>
import {Api} from '../../../utils/axios'
	// import Header from '../header.vue'
	import { Toast } from 'vant';
	export default{
		data(){
			return {
				Planlist:[],
				grade:[],//年级
				value1:'',//年级
				academy:[],//院系
				value2:'',//院系
				major:[],//专业
				value3:'',//专业
				showPicker1: false,
				columns1: [{
					values: [],
					className: 'column1'
				}],
				showPicker2: false,
				columns2: [{
					values: [],
					className: 'column1'
				}],
				yxmc:'',
				academyId:[],
				showPicker3: false,
				columns3: [],
				zymc:'',
				majorId:[]

			}
		},
		methods:{
			//所在年级
			onConfirm1(value1) {
				this.value1 =value1.toString()
				this.showPicker1 = false;
				this.getMajor()
			},
			async getMajor(){
				//专业名称
				let concatList3 = []
				let concatList4 = []
				const params ={
					academyId:this.yxmc,
					grade:this.value1
				}
				const res = await Api.getAnnualMajorList(params)
				for(let i = 0;i < res.data.length;i++){
					concatList3 = concatList3.concat(res.data[i].annumajorName)
					concatList4 = concatList4.concat(res.data[i].annumajorId)
				}
				this.columns3 = concatList3
				this.majorId = concatList4
			},
			//院系名称
			onConfirm2(value2,index) {
				this.value3 = ''
				this.value2 =value2.toString()
				this.yxmc = this.academyId[index]
				this.showPicker2 = false;
				this.getMajor()
			},
			//专业名称
			onConfirm3(value3,index) {
				this.value3 = value3.toString()
				this.zymc = this.majorId[index]
				this.showPicker3 = false;
			},
			
			async fn(){
				if(this.value1 == ''){
					Toast.fail('请选择年级');
					return false
				}else if(this.value3 == ''){
					Toast.fail('请选择专业');
					return false
				} else {
					const params = {
						academyId:this.yxmc,
						majorId:this.zymc,
						gardeId:this.value1
					}
					const res = await Api.teachTeachingPlan(params)
					this.Planlist = res.data;
					this.$router.push({
						path: '/plan2',
						query: {
							'data': this.Planlist,
							'gardeId':this.value1,
							'academyId':this.value2,
							'majorId':this.value3,
							'yxid':this.yxmc,
							'zyid':this.zymc,
						}
					})
				}
			},
			fn4(){
				if(this.value1 == ''){
					Toast('请先选择年级')
				}else if(this.columns3.length == 0){
					Toast('未查询到专业信息~')
				}else{
					this.showPicker3 = true;
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
				this.academyId = concatList5
			}
		},
		created(){
			this.getGrade()
			//院系名称
			this.getAcademy()
		},
	}
</script>

<style lang="less">
  .plan .van-picker__columns::before{width: 140px;height: 1px;background-color: @attendance-background-color-2 ;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .plan .van-picker__columns::after{width: 140px;height: 1px;background-color: @attendance-background-color-2 ;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .plan .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}
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
	.inp_box{
		margin-top: 30px;
	} 
	.footer{
		width: 90%;
		margin: 0 auto;
		height: 44px;
	}
	.footer .btn{
		width: 90%;
		height: 44px;
		background: @attendance-background-color-1;
		color: @attendance-color-3;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		/* margin-top: 112%; */
		position: fixed;
		bottom: 20px
	}
	.el-select{
		float: right;
		width: 180px;
	}
	.el-message{
		margin-top: -20px;
	}
	.el-input__inner{
		border: none
	}
	.body .inp_box .My_san{
		display: inline-block;
		width: 100%;
		height: 46px;
		/* line-height: 51px; */
		/* margin-top: 3px; */
		border-bottom:1px solid @attendance-border-color-6 ;
		display: flex;
		justify-content: space-between
	}
	.body .inp_box .My_san input::placeholder{
		color: @attendance-background-color-2 ;
		font-weight: 400;
		font-size: 16px
	}
	.body .inp_box .My_san .fr_span{
		width: 15px;
		height: 15px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		vertical-align: middle;
	}
	.body .inp_box .My_san input{
		color: @attendance-color-1;
		font-weight: 600;
    	width: 180px;
		height: 41px;
		text-align: right
	}
	.body .inp_box .My_san .flex_item{
		float: left;
		height: 22px;
		margin-top: 10px;
	}
	.body .inp_box .My_san .flex_item i{
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
	.body .inp_box .My_san .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle;
	}
	.body .inp_box .My_san .flex_item span{
		color: @attendance-color-1;
		font-size: 16px
	}
	.body .inp_box .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.body .inp_box .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Programme/plan.vue