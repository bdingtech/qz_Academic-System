<template>
	<div>
		<Header title="调课申请" type="0" route="change_class"></Header>
		<div class="cantent">
			<p class="class">您申请的调课类型属于？</p>

			<div class="content" @click="fn1(0)">
				<div class="left_box">
					<span class="sp">整体调课</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
			<div class="content" @click="fn2(1)">
				<div class="left_box">
					<span class="sp">部分调课</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
			<div class="content" @click="fn3(5)">
				<div class="left_box">
					<span class="sp">变更老师</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
			<div class="content" @click="fn4(2)">
				<div class="left_box">
					<span class="sp">停课</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
			<!-- <div class="content" @click="fn5(4)">
				<div class="left_box">
					<span class="sp">补课</span>
				</div>
				<div class="right_box"><i></i></div>
			</div> -->
			<!--仅供 北京经济管理职业学院 -->
			<div class="content" @click="$router.push('/exchangeCourse')" v-if="code == '14073' || code == '66666'">
				<div class="left_box">
					<span class="sp">对调课程</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
		</div>
		<div class="foot">
			<button @click="check()">
				查看我的调课申请
			</button>
		</div>
	</div>
</template>

<script>
// // import Header from '../header.vue'
	export default{
		data(){
			return{
				Wholelist:[],
				recoreList:[],
				dm:'',
				studentNumber:'',
				code:sessionStorage.getItem('schoolCode')
			}
		},
		methods:{
			check(){
				this.$router.push({
					path:'/audit_records'
				})
			},
			fn1(val){
				this.$router.push({
					path:'/whole',
					query:{
						'dm':this.dm,
						'studentNumber':this.studentNumber,
						'type':val
					}
				})
			},
			fn2(val){
				this.$router.push({
					path:'/part2',
					query:{
						'dm':this.dm,
						'studentNumber':this.studentNumber,
						'type':val
					}
				})
			},
			fn3(val){
				this.$router.push({
					path:'/teacher2',
					query:{
						'dm':this.dm,
						'studentNumber':this.studentNumber,
						'type':val
					}
				})
			},
			fn4(val){
				this.$router.push({
					path:'/stop2',
					query:{
						'dm':this.dm,
						'studentNumber':this.studentNumber,
						'type':val
					}
				})
			},
			fn5(val){
				this.$router.push({
					path:'/lessons2',
					query:{
						'dm':this.dm,
						'studentNumber':this.studentNumber,
						'type':val
					}
				})
			},
		},
		created(){
			this.dm = this.$route.query.dm;
			this.studentNumber = this.$route.query.studentNumber;
		},
	}
</script>

<style lang="less" scoped>
	
	.class{
		color: #7469F8;
		font-size: 18px;
		margin-top: 10px;
		font-weight:600;
	}
	.cantent{
		width: 90%;
		margin: 70px auto 0;
	}
	.content{
		display: inline-block;
		position: relative;
		width: 100%;
		height: 82px;
		margin-top: 10px;
		background: #F8F8F8;
		border-radius: 5px;
	}
	.content::after{position: absolute;width: 3px;height: 100%;content: '';background-color: #7469F8;left: 0;border-radius: 5px 0 0 5px;}
	.content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.content .left_box .sp{
		display: block;
	}
	.content .left_box .sp{
		color: #212F6E;
		line-height: 82px;
		font-weight:600;
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
	.foot{
		width: 90%;
		margin-left: 5%;
		height: 44px;
		/* margin-top: 100px; */
		position: fixed;
		bottom: 20px
	}
	.foot button{
		display: block;
		text-align: center;
		line-height: 44px;
		width: 100%;
		height: 44px;
		color: #7469F8;
		background: #ECEDFD;
		font-size: 16px ;
		border-radius: 3px;
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Change/change_class2.vue