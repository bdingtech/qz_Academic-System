<template>
	<div>
		<Header title="申请记录"></Header>
		<div class="p_div">
			<P>审核中</P>
			<P>{{className}}</P>
			<P class="p_span"><span>周次：{{weeks}}</span><span>调课方式：个人调课</span></P>
			<P class="p_span"><span>时间：{{time}}</span><span>调课类型：整体调课</span></P>
			<P>地点：{{teachingBuildingName}}</P>
			<p class="p_content"><span>班级：</span><span>{{classNames}}</span></p>
		</div>
		<div class="choices">
			<p>
				<i><img src="../../../assets/images/date_icon2.png" alt=""></i>
				<span>星期几</span>
				<input type="text" class="fr_date" v-model="week" readonly> 
			</p>
			<p>
				<i><img src="../../../assets/images/time_icon2.png" alt=""></i>
				<span>起止节次</span>
				 <!-- value="01-02" -->
				<input type="text" class="fr_date" v-model="node" readonly>
			</p>
			<p>
				<i><img src="../../../assets/images/address_icon2.png" alt=""></i>
				<span>地点</span>
				<input type="text" class="fr_date" v-model="address" readonly>
			</p>
			<p>
				<i><img src="../../../assets/images/icon_people2.png" alt=""></i>
				<span>审核人</span>
				<input type="text" class="fr_date" v-model="people" readonly>
			</p>
			<!-- <p>
				<i><img src="../../../assets/images/icon_phone2.png" alt=""></i>
				<span>联系电话</span>
				<input type="text" class="fr_date" v-model="phone">
			</p> -->
			<p>
				<i><img src="../../../assets/images/icon_why2.png" alt=""></i>
				<span>调课原因</span>
				<input type="text" class="fr_date" v-model="why" readonly>
			</p>
		</div>
	</div>
</template>

<script>
// // import Header from '../header.vue'
	export default{
		data(){
			return{
				week:'',
				node:'',
				address:'',
				people:'',
				phone:'',
				why:'',
				weeks:'',
				classsName:'',
				time:'',
				teachingBuildingName:'',
				classNames:''
			}
		},
		created(){
			this.week = this.$route.query.week;
			this.node = this.$route.query.node;
			this.address = this.$route.query.address;
			this.people = this.$route.query.people;
			// this.phone = this.$route.query.phone;
			this.why = this.$route.query.why;
			this.weeks = this.$route.query.weeks;
			this.teachingBuildingName = this.$route.query.teachingBuildingName;
			this.className = this.$route.query.className;
			this.time = this.$route.query.time;
			this.classNames = this.$route.query.classNames;
		},
	}
</script>

<style lang="less" scoped>
	
	.p_div{
		width: 90%;
		margin-left: 5%;
	}
	.p_div>p{
		color: #757DA3;
		font-size: 14px;
		margin-top: 8px;
	}
	.p_div>p:nth-child(1){
		color: #7469F8;
		font-size: 24px;
		margin: 20px 0;
	}
	.p_div>p:nth-child(2){
		color: #212F6E;
		font-size: 18px;
	}
	.p_div .p_span span{
		display: inline-block;
		/* width: 126px; */
		height: 20px;
	}
	.p_div .p_span span:nth-child(2){
		margin-left: 45px;
	}
	.p_div .p_content span:nth-child(1){
		float: left;
	}
	.p_div .p_content span:nth-child(2){
		display: inline-block;
		width: 294px;
		height: 40px;
	}
	.choices{
		width: 90%;
		margin-left: 5%;
		margin-bottom: 20px;
	}
	.choices>p{
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		border-bottom: 1px solid #F4F4F4;
	}
	.choices>p span{
		color: #212F6E;
		font-size: 16px;
	}
	.choices>p i{
		display: inline-block;
		width: 22px;
		height: 22px;
	}
	.choices>p i img{
		width: 100%;
		vertical-align: middle;
	}
	.fr_date{
		float: right;
		width: 150px;
		height: 40px;
		text-align: right;
		border: none !important;
		color: #212F6E;
		font-size: 16px;
	}
	.choices>p input::-webkit-input-placeholder{
		text-align: right;
		color: #DFE0E6;
		font-size: 16px;
	}
	.choices>p textarea{
		float: right;
		height: 88px;
		width: 205px;
		border: none;
		outline: none;
		color: #212F6E;
		font-size: 16px;
		text-align: right
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/record.vue