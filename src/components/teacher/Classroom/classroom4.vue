<template>
	<div>
		<Header title="教室借用"></Header>
		<div class="asidess">
			<span class="c_span">{{this.teachingBuildingName}} {{this.classroomName}}栋 {{this.classroomNumber}}教室</span>
			<span class="c_span">容量：{{this.seatNumber}}人</span>
			<p>
				<span>联系电话：</span>
				<input type="text" v-model="phone">
			</p>
			<p>
				<span>备注：</span>
				<span class="content_span">{{remark}}</span>
			</p>
		</div>
		<div class="success">
			备注
			<div class="fl" @click="Err()"></div>
			<div class="fr" @click="Res()"></div>
			<!-- <textarea name="" id="" cols="30" rows="10" placeholder="点击填写"></textarea> -->
			<input type="text" placeholder="请点击填写" class="BZ" v-model="remark">
		</div>
	</div>
</template>

<script>
// // import Header from '../header.vue'
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
	export default{
		data(){
			return{
				value:'',
				phone:'',
				remark:'',
				state:[],
				teachingBuildingName:'',
				classroomName:'',
				classroomNumber:"",
				seatNumber:''
			}
		},
		methods:{
			Err(){
				this.remark = ''
			},
			async Res(){
				let formData = {
					classroomIds: this.$route.query.id,
					week: "1",
					weekDetail: "1",
					applyReason: this.remark,
					borrowTypeCode: "2",
					nodeNumber: "01020304",
					weekday: "1",
					semesterId: "2018-2019-1",
					useCode: "2",
					phone: this.phone,
					isMultimediaCode: "1",
					applyTime: "2019-02-26 18:55",
					timeFlag: "1"
				}
				if(this.phone !== '' && this.remark !== ''){
					const data = {
						formData: formData
					}
					const res = await Api.teachSaveBorrowingClassrooms(data)
					this.state = res.data;
					let reg=/^1[3456789]\d{9}$/;
					if(this.phone==''){
						Toast('请输入手机号码');

					} else if(!reg.test(this.phone)){
						Toast('手机格式不正确');

					}else{
						this.$router.push({
							path:'/classroom5'
						})
					}
				}else {
					Toast.fail('请填写完整');
					return false
				}
			}
		},
		created(){
			this.phone = this.$route.query.phone;
			this.remark = this.$route.query.remark;
			this.teachingBuildingName = this.$route.query.teachingBuildingName;
			this.classroomName = this.$route.query.classroomName;
			this.classroomNumber = this.$route.query.classroomNumber;
			this.seatNumber = this.$route.query.seatNumber
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
	.asidess{
		width: 90%;
		margin-left: 5%;
		margin-top: 20px;
	}
	.asidess .c_span{
		display: block;
		color: @attendance-color-1;
		font-size: 18px;
		font-weight:600;
	}
	.asidess .c_span:nth-child(2){
		color: @attendance-color-2;
		font-size: 12px;
		margin-bottom: 30px;
		margin-top: 10px;
	}
	.asidess p{
		color: @attendance-color-1;
		font-size: 16px;
		width: 100%;
		display: inline-block;
		border-bottom: 2px solid @attendance-border-color-6;
		margin-top: 20px;
	}
	.asidess p span{
		color: @attendance-color-1;
		font-size: 16px;
	}
	.asidess p .content_span{
		float: right
	}
	.asidess p input{
		width: 105px;
		float: right;
		border: none;
		outline: none;
		height: 24px;
		color: @attendance-color-1;
		font-size: 16px;
	}
	.asidess p input::-webkit-input-placeholder{
		text-align: center;
	}
	.success{
		width: 100%;
		text-align: center;
		line-height: 50px;
		color: @attendance-color-4;
		font-size: 16px;
		margin-top: 200px;
	}
	.fl{
		float: left;
		width: 22px;
		height: 22px;
		background: url(../../../assets/images/error.png) center center no-repeat;
		background-size: 100%;
		margin: 16px 0 0 16px;
	}
	.fr{
		float: right;
		width: 22px;
		height: 22px;
		background: url(../../../assets/images/success.png) center center no-repeat;
		background-size: 140%;
		margin: 16px 16px 0 0;
	}
	.success .BZ{
		width: 100%;
		/* height: 171px; */
		outline: none;
		border: none;
		text-indent: 25px;
	}
	.success input::-webkit-input-placeholder{
		color: @attendance-background-color-2;
		font-size: 16px;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Classroom/classroom4.vue