<template>
	<div>
		<Header title="申请记录"></Header>
		<div class="p_divs">
			<P :style="{color : color1}">{{changeList.auditStateName}}</P>
			<P>{{changeList.courseName}}</P>
			<P class="p_span">周次：<span>{{changeList.oldPlanWeek}}</span>调课方式：<span>{{changeList.changeMode}}</span></P>
			<P class="p_span">时间：<span>{{changeList.oldCourseTime}}</span>调课类型：<span>{{changeList.changeTypeName}}</span></P>
			<P>地点：<span>{{changeList.oldClassroomName}}</span></P>
			<p>班级：<span>{{changeList.className}}</span></p>
		</div>
		<div class="nostop">
			<div v-if="changeList.changeType == '5' ? isHide : isShow">
				<i><img src="../../../assets/images/content_icon2.png" alt=""></i>
				<span>调课周次</span>
				<input type="text" v-model="oldTimeFlag" class="fr_date" readonly>
			</div>
			<div v-if="changeList.changeType == '5' ? isShow : ''">
				<i><img src="../../../assets/images/icon_teacher2.png" alt=""></i>
				<span>变更老师</span>
				<input type="text" class="fr_date" readonly :value="changeList.teacherName">
			</div>
			<div v-if="changeList.changeType == '2' ? isHide : isShow">
				<i><img src="../../../assets/images/date_icon2.png" alt=""></i>
				<span>星期几</span>
				<input type="text" class="fr_date" v-model="weekDay" readonly>
			</div>
			<div  v-if="changeList.changeType == '2' ? isHide : isShow">
				<i><img src="../../../assets/images/time_icon2.png" alt=""></i>
				<span>起止节次</span>
				<input type="text" class="fr_date" readonly :value="changeList.noteStart + '-' + changeList.noteEnd">
			</div>
			<div  v-if="changeList.changeType == '2' ? isHide : isShow">
				<i><img src="../../../assets/images/address_icon2.png" alt=""></i>
				<span>地点</span>
				<input type="text" class="fr_date" readonly :value="changeList.classroomName">
			</div>
			<div>
				<i><img src="../../../assets/images/icon_people2.png" alt=""></i>
				<span>审核人</span>
				<input type="text" :value="changeList.shr" class="fr_date" readonly>
			</div>
			<div>
				<i><img src="../../../assets/images/icon_phone2.png" alt=""></i>
				<span>联系电话</span>
				<input type="text" class="fr_date" value="13147029854" readonly>
			</div>
			<div class="change-res">
				<i><img src="../../../assets/images/icon_why2.png" alt=""></i>
				<span>调课原因</span>
				<p>{{changeReason}}</p>
			</div>
		</div>
	</div>
</template>

<script>
// // import Header from '../header.vue'
import { Api } from '../../../utils/axios'
	export default{
		data(){
			return{
				changeList:[],
				changeId:'',
				changeReason:'',
				oldTimeFlag:'',
				color1: '',
				isShow:true,
				isHide:false,
				weekDay:'',
				address:'',
			}
		},
		methods:{
			async typeDetail(){
				this.changeId = this.$route.query.changeId;
				const params = {
					changeId:this.changeId
				}
				const res = await Api.teachGetJstkxxDetail(params)
				this.changeList = res.data;
				if(this.changeList.auditStateName == '通过'){
					this.color1 = '#12DDD6'
				}else if(this.changeList.auditStateName == '不通过'){
					this.color1 = '#F86969'
				}else if(this.changeList.auditStateName == '审核中'){
					this.color1 = '#7469F8'
				}else if(this.changeList.auditStateName == '待送审'){
					this.color1 = '#757DA3'
				}
				this.changeReason = res.data.changeReason;
				this.oldTimeFlag = res.data.planWeek;
				this.weekDay = res.data.weekday;
			}
		},
		created(){
			this.typeDetail();
		},
	}
</script>

<style lang="less" scoped>
.change-res{display: flex;}
	.change-res>p{
		color: #212F6E;
		font-weight: 700;
		flex: 1;
		margin-left: 20px;
		line-height: 24px;
	}
	.p_divs{
		width: 90%;
		margin-left: 5%;
		margin-top: 70px;
	}
	.p_divs>p{
		color: #757DA3;
		font-size: 14px;
		margin-top: 8px;
	}
	.p_divs>p:nth-child(1){
		font-weight: 700;
		font-size: 24px;
		margin: 20px 0;
	}
	.p_divs>p:nth-child(2){
		color: #212F6E;
		font-weight: 700;
		font-size: 18px;
	}
	.p_divs>p span{
		font-weight: 600;
	}
	.p_divs .p_span span{
		/* margin-right: 30px; */
		width: 80px;
		display: inline-block;
	}
	.p_divs .p_content span:nth-child(1){
		float: left;
	}
	.p_divs .p_content span:nth-child(2){
		/* display: inline-block; */
		width: 294px;
		height: 40px;
	}
	.nostop{
		width: 90%;
		margin-left: 5%;
	}
	.nostop>div{
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		border-bottom: 1px solid #F4F4F4;
	}
	.nostop>div span{
		color: #212F6E;
		font-size: 16px;
	}
	.nostop>div i{
		display: inline-block;
		width: 22px;
		height: 22px;
	}
	.nostop>div i img{
		width: 100%;
		vertical-align: middle;
	}
	.fr_date{
		float: right;
		/* width: 110px; */
		height: 40px;
		text-align: right;
		border: none !important;
		color: #212F6E;
		font-size: 16px;
	}
	.nostop>div input::-webkit-input-placeholder{
		text-align: right;
		color: #DFE0E6;
		font-size: 16px;
	}
	.nostop>div textarea{
		font-weight: 700;
		text-align: right;
		float: right;
		height: 88px;
		width: 205px;
		border: none;
		outline: none;
		color: #212F6E;
		font-size: 16px;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/noStop.vue