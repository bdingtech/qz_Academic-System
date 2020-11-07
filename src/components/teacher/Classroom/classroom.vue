<template>
	<div class="classroom-teach">
		<Header title="教室借用" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
		<div class="Classroom_div">   
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/content_icon2.png" alt="" class="my_img"></i><span>教学周次</span></div>
					<span class="fr_span" style="float:right"></span>
				<input type="text" @click="showPicker1 = true" readonly v-model="value1" class="pick-input" placeholder="请选择">
			</span>
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/date_icon2.png" alt="" class="my_img"></i><span>星期几</span></div>
					<span class="fr_span" style="float:right"></span>
				<input type="text" @click="showPicker4 = true" readonly v-model="value2" class="pick-input" placeholder="请选择">
			</span>
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/people_icon2.png" alt="" class="my_img"></i><span>教室容量</span></div>
				<input type="number"  placeholder="请输入教室容量" v-model="value3" class="fr_dates" @keyup="numLimit()">
			</span>
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"></i><span>起始节次</span></div>
					<span class="fr_span" style="float:right"></span>
				<input type="text" @click="showPicker = true" readonly v-model="value" class="pick-input" placeholder="请选择">
			</span>  
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/address_icon2.png" alt="" class="my_img"></i><span>校区</span></div>
					<span class="fr_span" style="float:right"></span>
				<input type="text" @click="showPicker2 = true" readonly v-model="value5" class="pick-input" placeholder="非必选">
			</span>
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/lou_icon2.png" alt="" class="my_img"></i><span>教学楼</span></div>
					<span class="fr_span" style="float:right"></span>
				<input type="text" @click="showPicker3 = true" readonly v-model="value6" class="pick-input" placeholder="非必选">
			</span>
			<span class="My_span">
				<div class="flex_item"><i><img src="../../../assets/images/icon_teacher2.png" alt="" class="my_img"></i><span>教室类型</span></div>
					<span class="fr_span" style="float:right"></span>
				<input type="text" @click="buildTypePicker = true" readonly v-model="value7" class="pick-input" placeholder="非必选">
			</span>
		</div>  
		<div class="butts">
			<button @click="fn2()">申请记录</button>
			<button @click="fn1()">查询</button>
		</div>

		<van-popup v-model="showPicker1" position="bottom">
			<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker4" position="bottom">
			<van-picker show-toolbar :columns="columns4" @cancel="showPicker4 = false" @confirm="onConfirm4" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker3" position="bottom">
			<van-picker show-toolbar :columns="columns3" @cancel="showPicker3 = false" @confirm="onConfirm3" :item-height="35"/>
		</van-popup>
		<!-- 教室类型 -->
		<van-popup v-model="buildTypePicker" position="bottom">
			<van-picker show-toolbar :columns="buildTypeList" :default-index="defaultIndex" @cancel="buildTypePicker = false" @confirm="buildTypeSelect" :item-height="35"/>
		</van-popup>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import {Api} from '../../../utils/axios'
	export default{
		data(){
			return {
				buildTypePicker:false,
				defaultIndex:1,
				buildTypeList:[],
				casLogin:sessionStorage.getItem('casLogin'),
				columns: [{
					values: [],
					className: 'column1'
					},
					{
					values: [],
					className: 'column2',
					defaultIndex: 1
				}],
				columns1: [{
					values: [],
					className: 'column1'
				}],
				columns2: [{
					values: [],
					className: 'column1'
				}],
				columns3: [{
					values: [],
					className: 'column1'
				}],
				columns4: [{
					values: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
					className: 'column1'
				}],
				options4:[],
				options5:[],
				options6:[],
				options7:[],
				ListData:[],
				value1: '',
				value2:"",
				value3:'',
				value:'',
				value5:'',
				value6:'',
				showPicker: false,
				showPicker1: false,
				showPicker2: false,
				showPicker3: false,
				showPicker4:false,
				teacherWeeks:[],
				buildingId:[],
				jxlList:'',
				campusId:[],
				xqIdList:'',
				classList:[],
				weeklist:'',
				weeknode:'',
				value7:'',
				typeCodeList:[],
				typeCode:''
			}
		},
		methods:{
      async getType(){
        const params = {
          table:'zzdjslx'
        }
				const res = await Api.getRoomType(params)
				this.buildTypeList.push("请选择")
        res.data.forEach(item => {
          this.buildTypeList.push(item.dmmc)
          this.typeCodeList.push(item.dm)
				});
				this.value7 = this.buildTypeList[1]
				this.typeCode = this.typeCodeList[0]
      },
      buildTypeSelect(val,index){
				this.buildTypePicker = false
        if(val == "请选择"){
					this.value7 = ""
					this.typeCode = ""
				}else{
					this.value7 = val
					this.typeCode = this.typeCodeList[index - 1]
				}
      },
			numLimit(){
				this.value3 = parseInt(this.value3);
				if(this.value3 < 0){
					this.value3 = Math.abs(this.value3)
				}
			},
			//起始节次
			onConfirm(value) {
				this.start = value[0];
				this.end = value[1];
				let begin = Number(this.start);
				let end = Number(this.end);
				if(begin > end){
					Toast.fail('开始节次不能大于结束节次')
				}else{
					this.value = this.start + '-' + this.end;
					this.showPicker = false;
				}
			},
			//教学周次
			onConfirm1(value1,index) {
				this.value1 ='第'+ value1+'周'
				this.weeknode = value1.toString()
				sessionStorage.setItem('weeknode',this.weeknode)
				// console.log(this.weeknode)
				this.showPicker1 = false;
			},
			//校区
			onConfirm2(value5,index) {
				if(value5.toString() == '请选择'){
					this.value5 = '';
				}else{
					this.value5 = value5;
				}
				this.xqIdList = this.campusId[index-1]
				this.showPicker2 = false;
			},
			//教学楼
			onConfirm3(value6,index) {
				if(value6.toString() == '请选择'){
					this.value6 = '';
				}else{
					this.value6 = value6;
				}
				this.showPicker3 = false;
				this.jxlList = this.buildingId[index-1]
			},
			//星期几
			onConfirm4(value2,index) {
				this.value2 =value2
				let weeks = parseInt(index)+1;
				this.weeklist = weeks.toString()
				this.showPicker4 = false;
			},
			fn1(){
				if (this.value1 == ''){
					Toast("请选择教学周次")
					return
				}
				if(this.value2 == ''){
					Toast("请选择星期")
					return
				}
				// if(this.value3 == ''){
				// 	Toast("请填写教室容量")
				// 	return
				// }
				if(this.value == ''){
					Toast("请选择起始节次")
					return
				}
				this.$router.push({
					path: '/classroom2',
					query: {
						'weekly':this.value1,
						'dayweek':this.value2,
						'classroomCapacity':this.value3,
						'nodeId':this.value,
						'buildingName':this.value6,
						'campusName':this.value5,
						'weeknode':this.weeknode,
						'campusList':this.xqIdList,
						'jxlIdList':this.jxlList,
						'rType':this.typeCode
					}
				})
			},
			fn2(){
				this.$router.push({
					path:'/application_record'
				})
			},
			async getNode(){
				let concatList = []
				const res = await Api.getNodeList()
				for(let i = 0;i < res.data.length;i++){
					concatList = concatList.concat(res.data[i].nodeName)
					this.columns[0].values = concatList
					this.columns[1].values = concatList
				}
			},
			async getWeek(){
				let concatList1 = []
				const params = {
					semester:'',
					type:'1'
				}
				const res = await Api.getTeachingWeek(params)
				for(let i = 0;i < res.data.length;i++){
					concatList1 = concatList1.concat(res.data[i].week)
					this.columns1[0].values = concatList1
				}
			},
			async getCampus(){
				let concatList2 = ['请选择']
				let concatList5 = []
				const res = await Api.getCampusList()
				for(let i = 0;i < res.data.length;i++){
					concatList2 = concatList2.concat(res.data[i].campusName)
					concatList5 = concatList5.concat(res.data[i].campusId)
					this.columns2[0].values = concatList2
				}
				this.campusId = concatList5
			},
			async getBuild(){
				let concatList3 = ['请选择']
				let concatList4 = []
				const res = await Api.getTchBuildingList()
				for(let i = 0;i < res.data.length;i++){
					concatList3 = concatList3.concat(res.data[i].buildingName)
					concatList4 = concatList4.concat(res.data[i].buildingId)
					this.columns3[0].values = concatList3
				}
				this.buildingId = concatList4
			}
		},
		created(){
			//节次列表（下拉框）
			this.getNode()
			//教学周次
			this.getWeek()
			//校区
			this.getCampus()
			//教学楼
			this.getBuild()
			// 教室类型
			this.getType()
		},

	}
</script>

<style lang="less" scoped>
	.classroom-teach .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.classroom-teach .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}

.classroom-teach .van-picker-column{position: relative;}
  .classroom-teach .van-picker-column::before{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .classroom-teach .van-picker-column::after{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .classroom-teach .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}

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
	.Classroom_div{
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
	}
	.Classroom_div .p_image{
		/* color: gray; */ 
		font-size: 16px;
		width: 100%;
		height: 34px;
		/* display: inline-block; */
		border-bottom: 1px solid @attendance-border-color-6;
		margin-top: 9px;
		line-height: 20px;
	}
	.Classroom_div .p_image span{
		color: @attendance-color-1;
	}
	.Classroom_div .p_image input{
		float: right;
		border: none;
		outline: none;
		height: 24px;
		width: 150px;
	}
	.Classroom_div .p_image .fr_span{
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		margin-top: 10px
	}
	.Classroom_div .p_image .fr_dates{
		float: right;
		border: none;
		outline: none;
		height: 24px;
		width: 160px;
		text-indent: 110px;
		color: gray
	}
	.Classroom_div .p_image input::-webkit-input-placeholder{
		text-indent: 26px;
		color: @attendance-background-color-2;
		font-size: 16px;
	}
	.Classroom_div .p_image i{
		display: inline-block;
		width: 25px;
		height: 25px;
	}
	.Classroom_div .p_image i img{
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}
	.butts{
		width: 100%;
		/* margin-top: 250px; */
		position: absolute;
		bottom: 20px
	}
	.butts button{
		display: inline-block;
		text-align: center;
		line-height: 44px;
		width: 45%;
		height: 44px;
		background: url(../../../assets/images/btn_bg1.png) no-repeat center center;
		background-size: 100%;
		color: @attendance-background-color-1;
		font-size: 16px;
		margin-left: 3%;
	}
	.butts button:nth-child(2){
		color: @attendance-color-3;
		background: url(../../../assets/images/btn_bg2.png) no-repeat center center;
		background-size: 100%;
	}
	.el-select{
		float: right;
		width: 180px;
	}
	.el-select-dropdown__list{
		width: 180px;
	}
	.el-message{
		margin-top: -20px;
	}
	.My_span{
		display: inline-block;
		width: 100%;
		height: 41px;
		/* line-height: 51px; */
		margin-top: 3px;
		border-bottom:1px solid @attendance-border-color-6
	}
	.Classroom_div .My_span input::placeholder{
		color: @attendance-background-color-2;
		font-weight: 400;
	}
	.My_span .fr_span{
		width: 15px;
		height: 100%;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100% 15px;
		vertical-align: middle;
	}
	.Classroom_div .My_span input{
		color: @attendance-color-1;
		font-weight: 600;
		float: right;
		width: 180px;
		height: 41px;
		text-align: right
	}
	.My_span .flex_item{
		float: left;
		height: 22px;
		margin-top: 10px;
	}
	.My_span .flex_item i{
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
	.My_span .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle;
	}
	.My_span .flex_item span{
		color: @attendance-color-1;
	}
	.classroom .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.classroom .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Classroom/classroom.vue