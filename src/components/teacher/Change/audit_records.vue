<template>
	<div>
		<Header title="调课申请记录"></Header>
		<div class="nav">
			<van-tabs v-model="active">
				<van-tab title="审核中">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.auditList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in auditList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box">{{item.auditStateName}}</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="不通过">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.nopassList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in nopassList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box" style="color:#F86969">{{item.auditStateName}}</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="已通过">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.passList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in passList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box" style="color:#12DDD6">{{item.auditStateName}}</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="待审核">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.ToauditList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in ToauditList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box" style="color:#757DA3">{{item.auditStateName}}</div>
						</div>
					</div>
				</van-tab>
			</van-tabs>
			<!-- <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="审核中" name="first">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.auditList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in auditList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box">{{item.auditStateName}}</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="不通过" name="second">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.nopassList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in nopassList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box" style="color:#F86969">{{item.auditStateName}}</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已通过	" name="third">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.passList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in passList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box" style="color:#12DDD6">{{item.auditStateName}}</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="待审核" name="fourth">
					<div class="sh">
						<NOdata title="暂无申请记录~" v-if="this.ToauditList.length == 0?isShow:''"></NOdata>
						<div class="content" v-for="(item,index) in ToauditList" :key="index" @click="Nostop(item.changeId)">
							<div class="left_box">
								<span class="span">{{item.courseName}}</span>
								<span>调课方式：{{item.changeMode}}</span>
								<span>调课类型：{{item.changeTypeName}}</span>
							</div>
							<div class="right_box" style="color:#757DA3">{{item.auditStateName}}</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs> -->
		</div>
		<div><router-view></router-view></div>
	</div>
</template>

<script>
import { Api } from '../../../utils/axios'
	export default{
		data(){
			return{
				active:0,
				activeName: 'first',
				recordList:[],
				passList:[],
				nopassList:[],
				auditList:[],
				ToauditList:[],
				isShow:true
			}
		},
		methods: {
			async Record(){
				const params = {
					auditState:''
				}
				const res = await Api.teachGetJstkxx(params)
				this.recordList = res.data;
				for(var i in this.recordList){
					if(this.recordList[i].auditStateName == '通过'){
						this.passList.push(this.recordList[i])
					}
					if(this.recordList[i].auditStateName == '不通过'){
						this.nopassList.push(this.recordList[i])
					}
					if(this.recordList[i].auditStateName == '审核中'){
						this.auditList.push(this.recordList[i])
					}
					if(this.recordList[i].auditStateName == '待送审'){
						this.ToauditList.push(this.recordList[i])
					}
				}
			},
			Nostop(val){
				this.$router.push({
					path:'/noStop',
					query:{
						'changeId':val
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
	.nav .router-link-exact-active.router-link-active{color: #212F6E;font-weight: 600;}
	.nav .van-tab.van-tab--active .van-ellipsis{color: #212F6E;font-weight: 600;}
	.nav .el-tabs__active-bar{background-color: #212F6E;}
	.nav a:first-child{color: #212F6E;}
	.nav .van-tabs__line{background-color: #fff;}
	.nav{
		width: 100%;
		/* border-bottom: 1px solid #F4F4F4; */
		padding-bottom: 10px;
	}
	.nav a{
		display: inline-block;
		width: 24%;
		text-align: center;
		color: #757DA3;
		font-size: 14px;
	}
	.nav .el-tabs__item{
		padding: 0 25px;
	}
	.nav .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .nav .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .nav .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .nav .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    	margin-left: 22px;
	}
	.nav .el-tabs__active-bar{
		margin-left: 22px;
	}
	.sh{
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.sh .content{
		width: 100%;
		height: 82px;
		margin-top: 20px;
		border-radius: 5px;
		background: url(../../../assets/images/gray_bg.png) center center no-repeat;
		background-size: 100%;
	}
	.sh .content .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.sh .content .left_box span{
		display: block;
	}
	.sh .content .left_box .span{
		color: #212F6E;
		padding-top: 10px;
		font-weight: 600
	}
	.sh .content .left_box span:nth-child(2), .content .left_box span:nth-child(3) {
    color: #757DA3;
    font-size: 12px;
    padding-top: 4px;
}
	.sh .content .right_box{
		width: 25%;
		height: 100%;
		float: right;
		line-height: 82px;
		color: #7469F8;
		font-size: 14px;
		font-weight: 600;
		text-align: center;
	}
	.nav .el-tabs__nav .is-top{
		background: none;
		/* color: #757da3 */
	}
	.nav.el-tabs__active-bar .is-top{
		background-color: #212f6e
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/audit_records.vue