<template>
	<div>
		<Header title="成绩查询"></Header>
		<div class="class_box">  
			<p>{{this.className}}</p>
			<div class="inp">  
				<input type="text" placeholder="搜索学生姓名/学号" v-model="value1">
				<i></i>
			</div>
			<NOdata v-if="this.textbook.length == 0" title="未查询到成绩数据~"></NOdata>
			<div to="modify" class="center" v-for="(item,index) in textbook" :key="index" @click="fn1(item)">
				<div class="left_box">
					<span class="one">{{item.studentName}}</span>
					<span class="tow spa">学号：{{item.studentNumber}}</span>
					<span class="three spa">考试性质：{{item.examProperty}}</span>
				</div>
				<div class="right_box">
					<div class="icon_box" :style="'color:' + calcColor(item.score)">
						{{item.score}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
	export default{
		data(){
			return{
				list:[],
				lists:[],
				classId:'',
				courseId:'',
				className:'',
				value1:'',
				isEnable:true,
				array:[],
				i_id:''
			}
		},
		methods:{
			calcColor(e){
				if(Number(e) < 60 || e == '不及格'){
					return '#F86969'
				}else{
					return '#12DDD6'
				}
			},
			async chaxun(){
				const params = {
					classId:this.classId,
					courseId:this.courseId
				}
				const res = await Api.teachClassScoreList(params)
				this.list = res.data;
			},
			async Change(){
				const params = {
					xx0101id: sessionStorage.getItem('schoolCode'),
					type: this.Identity == '2' ? '0' : '',
					isqy: '',
					key: 'qzkj'
				}
				const res = await Api.getHomeMenuApi(params)
				if(res.data.length > 0){
					res.data.forEach(item => {
						if(item.url == 'js_cjgl'){
							this.i_id = item.i_id
						}
					});
				}
				this.getAuth()
			},
			async getAuth(){
				const params = {
					I_ID:this.i_id
				}
				const res = await Api.getSubMenu(params)
				if(res.data.length > 0){
					res.data.forEach(item => {
						if(item.url == "/teacher/getCjxgxx"){
							this.isEnable = false
						}
					});
				}
			},
			async getEnableApi(){
				const params = {
					'xx0101id':sessionStorage.getItem('schoolCode'),
					'type':sessionStorage.getItem('Identity') == 2 ? '0' : '1'
				}
				const res = await Api.getHomeMenuApi(params)
        res.data.forEach((item,index) => {
					if(item.url == '/teacher/getCjxgxx'){
						this.isEnable = false
					}
				});
      },
			fn1(e){
				if(this.isEnable == true){
					Toast.fail('暂未启用该功能')
				}else{
					this.$router.push({
						path:'/modify',
						query:{
							'scoreId':e.scoreId,
							'examProperty':e.examProperty,
							'studentNumber':e.studentNumber,
							'studentName':e.studentName
						}
					})
				}
			},
		},
		created(){
			this.classId = this.$route.query.classId;
			this.courseId = this.$route.query.courseId;
			this.className = this.$route.query.className;
			this.chaxun();
			this.Change()
			// this.getEnableApi()
		},
		computed:{
			textbook:function(){
				var value1 = this.value1;
				if(value1){
				return this.list.filter(function(product) {
					return Object.keys(product).some(function(key) {
					return String(product[key]).toLowerCase().indexOf(value1) > -1
					})
				})
				}
				return this.list
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.class_box{
		width: 90%;
		margin: 0 auto;
	}
	.class_box>p{
		color: @attendance-color-1;
		font-size: 18px;
		font-weight:600
	}
	.class_box .inp input{
		width: 100%;
		height: 44px;
		background: @attendance-background-color-6;
		border: none;
		outline: none;
		text-indent: 46px;
		border-radius: 3px;
	}
	.class_box .inp input::-webkit-input-placeholder{
		font-size: 16px;
		color: @attendance-color-2;
		
	}
	.class_box .inp{
		position: relative;
		margin-top: 20px;
	}
	.class_box .inp i{
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		width: 22px;
		height: 22px;
		background: url(../../../assets/images/search.png) center center no-repeat;
		background-size: 100%;
	}
	.class_box .center{
		display:block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}
	.center .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.center .right_box{
		width: 30%;
		height: 100%;
		float: right;
	}
	.class_box .center .left_box span{
		display: block;
		color: @attendance-color-2;
		font-size: 12px;
		margin-top: 4px;
	}
	.class_box .center .left_box span:nth-child(1){
		color: @attendance-color-1;
		font-size: 16px;
		margin-top: 10px;
		font-weight:600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.center .right_box .icon_box{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		text-align: center;
		height: 42px;
		background-size: 100%;
		font-weight: 600;
		margin: 20px 0;
	}
	.center .right_box .icon_box span:nth-child(1){
		line-height: 18px;
		display: block;
		color: @attendance-color-3;
		font-size: 18px;
	}
	.center .right_box .icon_box span:nth-child(2){
		display: block;
		color: @attendance-color-3;
		font-size: 10px;
	}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Achievement/achievement3.vue