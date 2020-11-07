<template>
	<div class="classroom2">
		<Header title="教室借用"></Header>
		<div class="bodys">
			<ul class="ul">
				<li @click="showPicker1 = true" :style="weekly =='' ? '' : 'margin:15px 0 0 15px;'">{{weekly}}</li>
				<li @click="showPicker2 = true" :style="dayweek =='' ? '' : 'margin:15px 0 0 15px;'">{{dayweek}}</li>
				<li @click="showPicker3 = true" :style="nodeId =='' ? '' : 'margin:15px 0 0 15px;'">{{nodeId}}小节</li>
				<li @click="showPicker4 = true" :style="campusName =='' ? '' : 'margin:15px 0 0 15px;'">{{campusName}}</li>
				<li @click="showPicker5 = true" :style="buildingName =='' ? '' : 'margin:15px 0 0 15px;'">{{buildingName}}</li>
				<li @click="buildTypePicker = true" :style="typeCodeName =='' ? '' : 'margin:15px 0 0 15px;'">{{typeCodeName}}</li>
			</ul>
		</div>
		<div class="article">
			<p>搜索结果</p>
			<NOdata title="未查询到空闲教室~" v-if="this.CLassList.length == 0"></NOdata>
			<div class="contents" v-for="(item,index) in CLassList" :key="index" @click="Next(item)">
				<div class="left_box">
					<span class="span">{{item.teachingBuildingName}} {{item.classroomName}}栋 {{item.classroomNumber}}教室</span>
					<span>容量:{{item.seatNumber}}</span>
				</div>
				<div class="right_box"><i></i></div>
			</div>
		</div>
		<!-- 周次 -->
		<van-popup v-model="showPicker1" position="bottom">
			<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1" :item-height="35"/>
		</van-popup>
		<!-- 星期 -->
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
		</van-popup>
		<!-- 节次 -->
		<van-popup v-model="showPicker3" position="bottom">
			<van-picker show-toolbar :columns="columns3" @cancel="showPicker = false" @confirm="onConfirm3" :item-height="35"/>
		</van-popup>
		<!-- 校区 -->
		<van-popup v-model="showPicker4" position="bottom">
			<van-picker show-toolbar :columns="columns4" @cancel="showPicker4 = false" @confirm="onConfirm4" :item-height="35"/>
		</van-popup>
		<!-- 教学楼 -->
		<van-popup v-model="showPicker5" position="bottom">
			<van-picker show-toolbar :columns="columns5" @cancel="showPicker5 = false" @confirm="onConfirm5" :item-height="35"/>
		</van-popup>
		<!-- 教室类型 -->
		<van-popup v-model="buildTypePicker" position="bottom">
			<van-picker show-toolbar :columns="buildTypeList" @cancel="buildTypePicker = false" @confirm="buildTypeSelect" :item-height="35"/>
		</van-popup>
	</div>
</template>

<script>
	import {Api} from '../../../utils/axios'
	export default{
		data(){
			return{
				showPicker1: false,
				showPicker2: false,
				showPicker3: false,
				showPicker4:false,
				showPicker5:false,
				buildTypePicker:false,
				typeCodeName:'',
				typeCode:'',
				columns1: [{
					values: [],
					className: 'column1'
				}],
				columns2: [{
					values: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
					className: 'column1'
				}],
				columns3: [{
					values: [],
					className: 'column1'
					},
					{
					values: [],
					className: 'column2',
					defaultIndex: 1
				}],
				columns4: [{
					values: [],
					className: 'column1'
				}],
				columns5: [{
					values: [],
					className: 'column1'
				}],
				CLassList:[],
				ClassLists:[],
				weekly:'',
				dayweek:'',
				classroomCapacity:'',
				nodeId:'',
				buildingName:'',
				campusName:'',
				classroomNumber:'',
				xqmc:'',
				classroomName:'',
				isShow:false,
				buding:'',
				campus:[],
				campusId:'',
				building:[],
				buildingId:'',
				week:[],
				weekList:'',
				weekId:'',
				dayId:'',
				start:'',
				end:'',
				dayweekList:'',
				campusList:'',
				weeknode:"",
				jxlIdList:'',
				buildTypeList:[],
				typeCodeList:[]
			}
		},
		methods: {
      buildTypeSelect(val,index){
				this.buildTypePicker = false
        if(val == "请选择"){
					this.typeCodeName = "全部"
					this.typeCode = ""
				}else{
					this.typeCodeName = val
					this.typeCode = this.typeCodeList[index - 1]
				}
				this.research()
      },
      async getType(){
        const params = {
          table:'zzdjslx'
        }
				const res = await Api.getRoomType(params)
				this.buildTypeList.push("请选择")
        res.data.forEach(item => {
          this.buildTypeList.push(item.dmmc)
					this.typeCodeList.push(item.dm)
					if(this.$route.query.rType != ''){
            if(this.$route.query.rType == item.dm){
              this.typeCodeName = item.dmmc
            }
          }
        });
      },
			onValuesChange(picker, values) {
			  if (values[0] > values[1]) {
				picker.setSlotValue(1, values[0]);
			  }
			},
			//教学周次
			onConfirm1(value1,index) {
				this.weekly ='第'+ value1+'周',
				this.weekId = value1.toString();
				this.showPicker1 = false;
				this.research()
			},
			//星期几
			onConfirm2(value2,index) {
				this.dayweek = value2.toString()
				this.dayId = index.toString()
				this.showPicker2 = false;
				this.research()
			},
			//起始节次
			onConfirm3(value) {
				this.nodeId = value[0] + '-' +value[1];
				this.start = value[0];
				this.end = value[1]
				this.showPicker3 = false;
				this.research()
			},
			//校区
			onConfirm4(value5,index) {
				this.campusName = value5.toString();
				if(value5[0] == '全部'){
					this.campusList = ''
				}else{
					this.campusList = this.campusId[index-1];
				}
				this.showPicker4 = false;
				this.research()
			},
			//教学楼
			onConfirm5(value6,index) {
				if(value6[0] == '全部'){
					this.jxlIdList = ''
				}else{
					this.jxlIdList = this.buildingId[Number(index) - 1]
				}
				this.buildingName =value6.toString()
				this.showPicker5 = false;
				this.research()
			},
			Next(e){
				let startNode = this.nodeId.substr(0,2);
				let endnode = this.nodeId.substr(3,5)
				this.$router.push({
					path:'/classroom3',
					query:{
						'startNode':startNode,//开始节次
						'endnode':endnode,//结束节次
						'classroomCapacity':this.classroomCapacity,//教室容量
						'xqmc':this.xqmc,//学期名称
						'teachingBuildingName':e.teachingBuildingName,
						'classroomName':e.classroomName,
						'classroomNumber':e.classroomNumber,
						'seatNumber':e.seatNumber,
						'id':e.classroomId,
						'week':this.weekId,
						'day':this.dayId,
						'weeknode':this.weeknode
					}
				})
			},
			async research(){
				const params = {
					weekly:this.weekId,
					dayweek:this.dayId,
					classroomCapacity:this.classroomCapacity,
					nodeId:this.nodeId,
					tchBuilding:this.jxlIdList,
					campus:this.campusList,
					jslx:this.typeCode
				}
				const res = await Api.teachBorrowingClassrooms(params)
				this.CLassList = res.data
			},
			async getWeel(){
				let concatList1 = []
				const params = {
					semester:''
				}
				const res = await Api.getTeachingWeek(params)
				for(let i = 0;i < res.data.length;i++){
					concatList1 = concatList1.concat(res.data[i].week)
					this.columns1[0].values = concatList1
				}
			},
			async getNode(){
				let concatList = []
				const res = await Api.getNodeList()
				for(let i = 0;i < res.data.length;i++){
					concatList = concatList.concat(res.data[i].nodeName)
					this.columns3[0].values = concatList
					this.columns3[1].values = concatList
				}
			},
			async getCampus(){
				let concatList2 = ['全部']
				let concatList5 = []
				const res = await Api.getCampusList()
				for(let i = 0;i < res.data.length;i++){
					concatList2 = concatList2.concat(res.data[i].campusName)
					concatList5 = concatList5.concat(res.data[i].campusId)
					this.columns4[0].values = concatList2
				}
				this.campusId = concatList5
			},
			async getBuild(){
				let concatList3 = ['全部']
				let concatList4 = []
				const res = await Api.getTchBuildingList()
				for(let i = 0;i < res.data.length;i++){
					concatList3 = concatList3.concat(res.data[i].buildingName)
					concatList4 = concatList4.concat(res.data[i].buildingId)
					this.columns5[0].values = concatList3
				}
				this.buildingId = concatList4
			}
		},
		created(){
			//教学周次
			this.getWeel()
			//节次列表（下拉框）
			this.getNode()
			//校区
			this.getCampus()
			//教学楼
			this.getBuild()
			this.weekly = this.$route.query.weekly;
			this.weeknode = this.$route.query.weeknode;
			this.weekId = this.weekly.substr(0,this.weekly.length - 1).substr(1,1);
			
			this.dayweek = this.$route.query.dayweek.toString();
			this.dayId = this.dayweek.substr(2,1);
			switch (this.dayId) {
				case '一':
					this.dayId = '1'
					break;
				case '二':
					this.dayId = '2'
					break;
				case '三':
					this.dayId = '3'
					break;
				case '四':
					this.dayId = '4'
					break;
				case '五':
					this.dayId = '5'
					break;
				case '六':
					this.dayId = '6'
					break;
				case '天':
					this.dayId = '7'
					break;
				default:
					break;
			}
			this.classroomCapacity = this.$route.query.classroomCapacity;
			this.typeCode = this.$route.query.rType
			this.nodeId = this.$route.query.nodeId;
			if(this.$route.query.buildingName != ''){
				this.buildingName = this.$route.query.buildingName.toString();
			}
			if(this.$route.query.campusName != ''){
				this.campusName = this.$route.query.campusName.toString();
			}
			this.jxlIdList = this.$route.query.jxlIdList;
			this.campusList = this.$route.query.campusList
			this.getType()
			this.research();
		},

	}
</script>

<style lang="less" scoped>
.classroom2 .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.classroom2 .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.classroom2 .van-picker-column{position: relative;}
  .classroom2 .van-picker-column::before{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .classroom2 .van-picker-column::after{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .classroom2 .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}

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
	.bodys{
		width: 90%;
	}
	.bodys .ul{
		margin: 0;
		padding: 0;
	}
	
	.bodys .ul li{
		list-style: none;
		padding: 0px 20px;
		background: @attendance-background-color-7;
		color: @attendance-background-color-1;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
		float: left;
		border-radius: 3px;
	}
	.article{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
		overflow: hidden;
	}
	.article>p{
		color: @attendance-color-1;
		font-size: 18px;
		margin-top: 40px;
		font-weight:600;
	}
	.contents{
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: @attendance-background-color-10;
		border-radius: 5px;
	}
	.contents .left_box{
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}
	.contents .left_box span{
		display: block;
	}
	.contents .left_box .span{
		color: @attendance-color-1;
		padding-top: 18px;
		font-weight:600;
		width: 270px;
		font-size: 15px;
		overflow: hidden; 
        text-overflow: ellipsis; 
        -o-text-overflow: ellipsis;
        white-space:nowrap;
	}
	.contents .left_box span:nth-child(2){
		color: @attendance-color-2;
		font-size: 12px;
		padding-top: 8px;
	}
	.contents .right_box{
		width: 25%;
		height: 100%;
		float: right;
	}
	.contents .right_box i{
		display: inline-block;
		margin-top:35px;
		margin-left: 60px;
		width: 9px;
		height: 13px;
		background: url(../../../assets/images/back_right.png)center center no-repeat;
		background-size: 100%;
	}
	.navs{
		width: 90%;
		margin:0 5%;
		position: fixed;
		bottom: 0;
		background-color: @attendance-color-3;
	}
	.navs .picker-item{
		font-size: 16px;
	}
	.navs .fl{
		float: left;
		width: 22px;
		height: 22px;
		background: url(../../../assets/images/error.png) center center no-repeat;
		background-size: 100%;
		margin: 16px 0 0 16px;
	}
	.navs .fr{
		float: right;
		width: 22px;
		height: 22px;
		background: url(../../../assets/images/success.png) center center no-repeat;
		background-size: 140%;
		margin: 16px 16px 0 0;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Classroom/classroom2.vue