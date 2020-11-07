<template>
	<div>
		<Header title="审核" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
		<div class="bod">
			<p class="class">选择审核类别</p>
			<NOdata title="暂未开放审核权限" v-if="resetList.length == 0 && dataList.length == 0"></NOdata>
			<Menu :title="item.name" v-for="(item,index) in resetList" :key="index" :route="item.path"/>
			<!-- 非配置 -->
		 	<!-- <Menu :title="item.name" v-for="(item,index) in dataList" :key="index" :route="item.path"/> -->
		</div>
	</div>
</template>

<script>
import Menu from '../../common/menu'
import { Api } from '@/utils/axios'
	export default{
		data(){
			return{
				Identity:sessionStorage.getItem('Identity'),
				casLogin:sessionStorage.getItem('casLogin'),
				changeList:[
					{name:'调课审核',path:'/teacher/examine/adjustList',url:'js_sh_tk'},
					{name:'教室借用审核',path:'/teacher/examine/borrowingList',url:'js_sh_js'},
					{name:'成绩录入审核',path:'/teacher/examine/searchScore',url:'js_sh_cj'},
					{name:'指导培养方案审核',path:'/teacher/guideIndex',url:'js_sh_pyfa'},
					{name:'新增课程审核',path:'/teacher/courseAudit?type=0',url:'js_sh_xzkc'},
					{name:'开课申请审核',path:'/teacher/courseAudit?type=1',url:'js_sh_kksq'},
				],
				resetList:[],
				// 非配置
				dataList:[
					{name:'计划微调审核',path:'/teacher/verifyIndex'},
					{name:'实验室借用审核',path:'/teacher/bookIndex?id=11'},
					{name:'教学进度审核',path:'/teacher/bookIndex?id=12'},
					{name:'书目申请审核',path:'/teacher/bookIndex?id=0'},
					{name:'学生用书征订审核',path:'/teacher/bookIndex?id=1'},
					{name:'学生信息核对审核',path:'/teacher/bookIndex?id=2'},
					{name:'毕业生信息核对审核',path:'/teacher/bookIndex?id=3'},
					{name:'教务处审核审核',path:'/teacher/bookIndex?id=4'},
					{name:'乘系数申请审核',path:'/teacher/bookIndex?id=5'},
					{name:'学生缓考审核',path:'/teacher/bookIndex?id=6'},
					{name:'成绩确认审核',path:'/teacher/bookIndex?id=7'},
					{name:'成绩查卷审核',path:'/teacher/bookIndex?id=8'},
					{name:'成绩认定审核',path:'/teacher/bookIndex?id=9'},
					{name:'成绩修改审核',path:'/teacher/bookIndex?id=10'},
				],
				i_id:''
			}
		},
		methods:{
			handle(e){
				this.$router.push(e.path)
			},
			async Change(){
				const params = {
					xx0101id: sessionStorage.getItem('schoolCode') || '',
					type: this.Identity == '2' ? '0' : '',
					isqy: '',
					key: 'qzkj'
				}
				const res = await Api.getHomeMenuApi(params)
				if(res.data.length > 0){
					res.data.forEach(item => {
						if(item.url == 'js_sh'){
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
				this.resetList = res.data
				if(res.data.length > 0){
					this.resetList.forEach(item => {
						this.changeList.forEach(list => {
							if(item.url == list.url){
								item.path = list.path
							}
						});
					});
				}
			},
			fn1(item){ 
				this.$router.push({
					path: item.path,
					query: {
						type:item.url == 'js_sh_kksq' ? '1' : item.url == 'js_sh_xzkc' ? '0' : ''
					}
				})
			}
		},
		created(){
			this.Change()
		},
		components:{
			Menu
		}
	}
</script>

<style scoped>
	.class{
		color: #7469F8;
		font-size: 18px;
		padding: 0 1.25rem 1.25rem;
		font-weight:600;
	}
	.bod{
		margin: 60px auto 0;
	}
	.content{
		position: relative;
		display: inline-block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: #F8F8F8;
		border-radius: 5px;
		margin-left: 0;
	}
	.content::after{position: absolute;width: 3px;height: 100%;content: '';background-color: #7469F8;left: 0;border-radius: 5px 0 0 5px;}
	.content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
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
</style>



// WEBPACK FOOTER //
// src/components/teacher/Examine/index.vue