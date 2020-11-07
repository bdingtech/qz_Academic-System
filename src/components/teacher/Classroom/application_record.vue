<template>
    <div>
        <!-- <div class="title">
			<router-link to="classroom"><i></i>教室借用申请记录</router-link>
		</div> -->
		<Header title="申请记录"></Header>
		<NOdata title="暂无申请记录~" v-if="this.recordList.length == 0"></NOdata>
		<template v-else>
			<div class="record_box" @click="fn1(item)" v-for="(item,index) in recordList" :key="index">
				<div class="record_fl">
					<p>{{item.courseName}}</p>
					<span>教学周次：第{{item.weekly}}周</span>
					<span>星期几：{{item.dayweek}}</span>
					<span class="span1">教室容量：{{item.classroomCapacity}}</span>
					<span class="span1">起止节次：{{item.node}}</span>
					<span class="span1">校区：{{item.campus}}</span>
					<span class="span1">教学楼：{{item.tchBuilding}}</span>
					<!-- <span class="span1">教室：{{item.jsmc}}</span> -->
				</div>
				<div class="record_fr" :style="{color:color1}">{{item.state}}</div>
			</div>
		</template>
    </div>
</template>
<script>
import { Api } from '../../../utils/axios'
export default {
	data(){
		return{
			recordList:[],
			color1: ''
		}
	},
	methods:{
		async Record(){
			const res = await Api.teachMyBorrowingClassrooms()
			this.recordList = res.data;
			if(this.recordList[0] && this.recordList[0].state){
				if(this.recordList[0].state == '审核通过'){
					this.color1 = '#12DDD6'
				}else if(this.recordList[0].state == '申请失败'){
					this.color1 = '#F86969'
				}else if(this.recordList[0].state == '待审核'){
					this.color1 = '#7469F8'
				}else if(this.recordList[0].state == '待送审'){
					this.color1 = '#757DA3'
				}
			}
		},
		fn1(e){
			this.$router.push({
				path:'/recordDetail',
				query:{
					'weekly':e.weekly,
					'courseName':e.courseName,
					'dayweek':e.dayweek,
					'classroomCapacity':e.classroomCapacity,
					'node':e.node,
					'campus':e.campus,
					'state':e.state,
					'remarks':e.remarks,
					'tchBuilding':e.tchBuilding,
					'phone':e.phone,
					'jsmc':e.jsmc
				}
			})
		}
	},
	created(){
		this.Record();
	},

}
</script>
<style lang="less" scoped>
	.record_box{
		width: 90%;
		margin-left: 5%;
		height: 164px;
		background: @attendance-background-color-10;
		border-radius: 5px;
		margin-top: 20px
	}
	 .record_fl{
		 float: left;
		 width: 72%;
		 height: 100%;
	 }
	.record_box p{
		color: @attendance-color-1;
		font-size: 16px;
		font-weight: 600;
		padding: 20px 0 0 20px;
	}
	.record_box span{
		display:inline-block;
		color:@attendance-color-2;
		font-size: 12px;
		margin-left: 20px;
		margin-top: 8px
	}
	.record_box .span1{
		display: block;
		margin-top: 2px
	}
	.record_fr{
		float: right;
		width: 21%;
		height: 100%;
		line-height: 164px;
		text-align: center;
		margin-right: 18px;
		font-size: 14px;
		font-weight: 700;
		/* color: #7469F8 */
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Classroom/application_record.vue