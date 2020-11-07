<template>
	<div>
		<Header title="成绩查询"></Header>
		<div class="class_room">
			<h4 class="ach-title">选择班级</h4>
			<div class="content" v-for="(item,index) in List[0]" :key="index" @click="fn1(item)">
				<div class="left_box">
					<span class="sp">{{item.className}}</span>
				</div>
				<div class="right_box"><i></i></div>
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
				arrlist:[],
				arrList:[],
				classId:'',
				className:'',
				classList:[],
				courseId:'',
				List:[]

			}
		},
		methods:{
			async Class_a(){
				const res = await Api.teachGetCjcxByjs()
				this.arrlist = res.data;
				for(var i in this.arrlist){
					if(this.arrlist[i].courseId == this.courseId){
						this.List.push(this.arrlist[i].classList)
					}
				}
			},
			fn1(e){
				this.$router.push({
					path:'/achievement3',
					query:{
						'classId':e.classId,
						'courseId':this.courseId,
						'className':e.className
					}
				})
			}
		},
		created:function(){
			this.Class_a();
			this.courseId = this.$route.query.courseId;
		},
	}
</script>

<style lang="less" scoped>
	.ach-title{font-size: 18px;color: @attendance-background-color-1;font-weight: 600;}
	.class_room{
		margin-top: 20px;
		width: 90%;
		margin: 60px auto;
	}
	.class_room .content{
		position: relative;
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}
	.class_room .content::after{position: absolute;width: 3px;height: 100%;content: '';background-color: @attendance-background-color-1;left: 0;border-radius: 5px 0 0 5px;}
	.class_room .content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.class_room .content .left_box .sp{
		display: block;
	}
	.class_room .content .left_box .sp{
		color: @attendance-color-1;
		line-height: 82px;
		font-weight:600
	}
	
	.class_room .content .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.class_room .content .right_box i{
		display: inline-block;
		margin-top:35px;
		margin-left: 60px;
		width: 9px;
		height: 13px;
		background: url(../../../assets/images/back_right.png)center center no-repeat;
		background-size: 100%;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Achievement/achievement2.vue