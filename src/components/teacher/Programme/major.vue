<template>
	<div class="major">
		<Header title="专业培养方案"></Header>
		<div class="body majo">
			<div class="inp_boxs">
				<!-- 院系名称 -->
				<span class="My_span">
					<div class="flex_item"><span>院系名称</span></div>
					<div>
						<input type="text" @click="showPicker2 = true" readonly v-model="value2" class="pick-input" placeholder="非必选">
						<span class="fr_span" style="display:inline-block"></span>
					</div>
					<van-popup v-model="showPicker2" position="bottom">
						<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
					</van-popup>
				</span>
				<!-- 所在年级 -->
				<span class="My_span">
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
				<span class="My_span">
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
// import Header from '../header.vue'
import {Api} from '../../../utils/axios'
	import { Toast } from 'vant';
	export default {
		data(){
			return{
				ListData:[],
				major:[],//专业列表
				grade:[],//年级列表
				academy:[],//院系列表
				value1:'',//年级
				value2:'',//院系
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
				this.showPicker1 = false;//专业名称
				this.getMajor()
			},
			async getMajor(){
				this.columns3 = []
				const params = {
					academyId:this.yxmc,
					grade:this.value1
				}
				const res = await Api.getAnnualMajorList(params)
				for(let i = 0;i < res.data.length;i++){
					this.columns3.push(res.data[i].annumajorName)
					this.majorId.push(res.data[i].annumajorId)
				}
			},
			//院系名称
			onConfirm2(value2,index) {
				this.value2 =value2.toString();
				this.value3 = '';
				this.yxmc = this.academyId[index];
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
				if (this.value1 == '' || this.value3 == '') {
					Toast.fail('请选择年级或专业')
				} else {
					const params = {
						academyId:this.yxmc,
						majorId:this.zymc,
						gardeId:this.value1
					}
					const res = await Api.teachMajorFosterDetail(params)
					this.ListData = res.data;
					this.$router.push({
						path: '/major2',
						query: {
							'data': this.ListData,
							'gardeId':this.value1,
							'academyId':this.value2,
							'majorId':this.value3,
							'zyid':this.zymc,
							'yxid':this.yxmc
						}
					})
				}
			},
			fn4(){
				if(this.value1 == ''){
					Toast.fail('请先选择年级')
				}else if(this.columns3.length == 0){
					Toast('未查询到可选专业')
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
			async getCampus(){
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
		created() {
			//所在年级
			this.getGrade()
			//院系名称
		this.getCampus()
		},
	}
</script>

<style lang="less">
  .major .van-picker__columns::before{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .major .van-picker__columns::after{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .major .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}

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
	.inp_boxs{
		margin-top: 30px;
	}
	.inp_boxs .My_span{
		color: @attendance-color-1;
		font-size: 16px;
		width: 100%;
		display: inline-block;
		border-bottom: 2px solid @attendance-border-color-6;
		margin-top: 20px;
	}
	.inp_boxs .My_span input{
		/* float: right; */
		border: none;
		outline: none;
		height: 24px;
		width: 180px;
	}
	.body .inp_boxs .My_span input::-webkit-input-placeholder{
		text-align: right;
		color: @attendance-background-color-2;
		font-size: 16px;
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
		/* margin-top: 350px; */
		position: fixed;
		bottom: 20px
	}
	.el-select{
		float: right;
		width: 180px;
	}
	.el-select-dropdown__list{
		width: 180px;
	}
	.el-message{
		margin-top: -20px;
	}
	.el-input__inner{
		border: none
	}
	.inp_boxs .My_span{
		display: inline-block;
		width: 100%;
		height: 41px;
		/* line-height: 51px; */
		margin-top: 3px;
		border-bottom:1px solid @attendance-border-color-6;
		display: flex;
		justify-content: space-between
	}
	 .inp_boxs .My_span input::placeholder{
		color: @attendance-background-color-2;
		font-weight: 400;
		 font-size: 16px
	 } 
	.inp_boxs .My_span .fr_span{
		width: 15px;
		height: 15px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		vertical-align: middle;
	}
	.inp_boxs .My_span input{
		color: @attendance-color-1;
		font-weight: 600;
    	width: 180px;
		height: 41px;
		/* text-indent: 112px */
		text-align: right
	}
	.inp_boxs .My_span .flex_item{
		float: left;
		height: 22px;
		margin-top: 10px;
	}
	.inp_boxs .My_span .flex_item i{
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
	.inp_boxs .My_span .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle;
	}
	.inp_boxs .My_span .flex_item span{
		color: @attendance-color-1;
		font-size: 16px
	}
	.majo .inp_boxs .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.majo .inp_boxs .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Programme/major.vue