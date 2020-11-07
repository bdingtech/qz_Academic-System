<template>
	<div>
		<Header title="补课申请"></Header>
		<div class="P_box">
			<p>{{className}}</p>
			<p>周次：<span>{{week}}</span> </p>
			<p>时间：<span>{{time}}</span> </p>
			<p>地点：<span>{{address}}</span> </p>
			<p><span class="fl_span">班级：</span><span class="technology">{{classNames}}</span> </p>
		</div>
		<div class="choic">
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"></i><span>补课周次</span></div>
				<div>
					<input type="text" @click="showPickers = true" readonly v-model="value1" class="pick-input" placeholder="请选择">
					<span class="fr_span" style="display:inline-block"></span>
				</div>
				<van-popup v-model="showPickers" position="bottom">
					<van-picker show-toolbar :columns="columnss" @cancel="showPickers = false" @confirm="onConfirms"/>
				</van-popup>
			</span>
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/date_icon2.png" alt="" class="my_img"></i><span>星期几</span></div>
				<div>
					<input type="text" @click="showPicker1 = true" readonly v-model="value3" class="pick-input" placeholder="请选择">
					<span class="fr_span" style="display:inline-block"></span>
				</div>
				<van-popup v-model="showPicker1" position="bottom">
					<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1"/>
				</van-popup>
			</span>
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"></i><span>起止节次</span></div>
				<div>
					<input type="text" @click="showPicker = true" readonly v-model="value" class="pick-input" placeholder="请选择">
					<span class="fr_span" style="display:inline-block"></span>
				</div>
				<van-popup v-model="showPicker" position="bottom">
					<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm"/>
				</van-popup>
			</span>
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/address_icon2.png" alt="" class="my_img"></i><span>地点</span></div>
				<div>
					<input type="text" @click="showPicker2 = true" readonly v-model="value2" class="pick-input" placeholder="请选择">
					<span class="fr_span" style="display:inline-block"></span>
				</div>
				<van-popup v-model="showPicker2" position="bottom">
					<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2"/>
				</van-popup>
			</span>
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/icon_people2.png" alt="" class="my_img"></i><span>审核人</span></div>
				<div>
					<input type="text" @click="showPicker3 = true" readonly v-model="values" class="pick-input" placeholder="请选择">
					<span class="fr_span" style="float:right"></span>
				</div>
				<van-popup v-model="showPicker3" position="bottom">
					<van-picker show-toolbar :columns="columns3" @cancel="showPicker3 = false" @confirm="onConfirm3"/>
				</van-popup>
			</span>
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/icon_phone2.png" alt="" class="my_img"></i><span>联系电话</span></div>
				<div>
					<input type="text" v-model="phone" class="fr_data" placeholder="请点击填写">
				</div>
				
			</span>
			<span class="my_spans">
				<div class="flex_item"><i><img src="../../../assets/images/icon_why2.png" alt="" class="my_img"></i><span>调课原因</span></div>
				<div>
					<textarea name="" id="" cols="30" rows="10" class="fr_date" placeholder="请点击填写" v-model="textarea"></textarea>
				</div>
				
			</span>
		</div>
		<div class="subm">
			<button @click="fn1()">提交申请</button>
		</div>
	</div>
</template>

<script>
// // import Header from '../header.vue'
	import { Toast } from 'vant';
	import { Api } from '../../../utils/axios'
	export default {
		data() {
			return {
				option: [{
					values: '',
					labels: ''
				}],
				//起始节次
				columns: [{
					values: [],
					className: 'column1'
					},
					{
					values: [],
					className: 'column2',
					defaultIndex: 1
				}],
				//补课周次
				columnss: [{
					values: [],
					className: 'column1'
				}],
				//星期几
				columns1: [{
					values: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
					className: 'column1'
				}],
				//地点
				columns2: [{
					values: [],
					className: 'column1'
				}],
				//审核人
				columns3: [{
					values: [],
					className: 'column1'
				}],
				Node:[],
				classroomlist:[],
				value:'',
				value1:'',
				value2:'',
				value3: '',
				values:'',
				phone:'',
				textarea:'',
				showPicker: false,
				showPickers: false,
				showPicker1: false,
				showPicker2: false,
				showPicker3: false,
				PartList:[],
				coursePlanId:'',
				weekNote:'',
				week:'',
				oldWeek:'',
				className:'',
				classNames:'',
				time:'',
				address:'',
				noticeId:'',
				timeFlag:'',
				dm:'',
				shrList:[],
				shr:''
			};
		},
		methods:{
			//节次
			async Part(){
				const res = await Api.getNodeList()
				this.Node = res.data
			},
			//起始节次
			onConfirm(value) {
				this.value = value[0] + '-' +value[1];
				this.start = value[0];
				this.end = value[1]
				this.showPicker = false;
			},
			//补课周次
			onConfirms(value1) {
				this.value1 ='第'+value1[0]+'周';
				this.showPickers = false;
			},
			//星期几
			onConfirm1(value3) {
				this.value3 = value3;
				this.showPicker1 = false;
			},
			//地点
			onConfirm2(value2,index) {
				this.value2 = value2;
				this.showPicker2 = false;
			},
			//审核人
			onConfirm3(values,index) {
				this.values = values;
				this.shr = this.shrList[index]
				this.showPicker3 = false;
			},
			//地点
			async Part2(){
				const params = {
					noticeId:'2018201910001209',
					semesterId:'2018-2019-1',
					weekNote:'10102',
					week:'1-11',
					timeFlag:'0',
					campusId:'',
					teachingBuildingId:'',
					validSeat:'',
					domainId:'',
					classroomName:'',
					changeType:'0',
					coursePlainId:'203273A67AEF4354B9E02ECA14B2154D'
				}
				const res = await Api.getTeachGetkyjs(params)
				this.classroomlist = res.data
			},
			async fn1(){
				if (this.value !== '' && this.value2 !== '' && this.value3 !== '' && this.phone !== '' && this.textarea !== ''){
					let reg=/^1[3456789]\d{9}$/;
					if(this.phone==''){
						Toast('请输入手机号码');
					} else if(!reg.test(this.phone)){
						Toast('手机格式不正确');
					}else{
						const data = {
							formData:{
								coursePlanId:this.coursePlanId,
								changeType:'4',
								classroomId:'1FC71A6FF9BA4214ACBEA7C8D939D7A6',
								weekNote:this.weekNote,
								week:this.week,
								teacherId:'06123',
								changeMode:this.dm,
								applyReason:this.textarea,
								oldWeek:this.week,
								userIds:this.shr
							}
						}
						const res = await Api.saveTransferApplication(data)
						this.Submitlist = res.data;
						this.$router.push({
							path: '/record_backups',
							query:{
								'adjustweek':this.value1,
								'week':this.value3,
								'node':this.value,
								'address':this.value2,
								'people':this.values,
								'phone':this.phone,
								'why':this.textarea,
								'weeks':this.week,
								'time':this.time,
								'teachingBuildingName':this.address,
								'className':this.courseName,
								'classNames':this.classNames
							}
						})
					}
				} else {
					Toast.fail('选项不能为空');
					return false
				}
			},
			async getNode(){
				const params = {
					coursePlanId:this.coursePlanId,
					weekNote:this.weekNote,
					noticeId:this.noticeId,
					week:this.week,
					timeFlag:this.timeFlag
				}
				const res = await Api.getTeachGetkysj(params)
				for(let i = 0;i < res.data.length;i++){
					concatList = concatList.concat(res.data[i].bigNode)
					this.columns[0].values = concatList
					this.columns[1].values = concatList
				}
			},
			async getWeek(){
				let concatLists = []
				const params = {
					semester:""
				}
				const res = await Api.getTeachingWeek(params)
				for(let i = 0;i < res.data.length;i++){
					concatLists = concatLists.concat(res.data[i].week)
				}
				this.columnss[0].values = concatLists
			},
			async getAddress(){
				let concatList1 = []
				const params = {
					noticeId:this.noticeId,
					semesterId:this.semesterId,
					weekNote:this.weekNote,
					week:this.week,
					timeFlag:this.timeFlag,
					campusId:'',
					teachingBuildingId:'',
					validSeat:'',
					domainId:'',
					classroomName:'',
					changeType:'0',
					coursePlainId:this.coursePlanId
				}
				const res = await Api.getTeachGetkyjs(params)
				for(let i = 0;i < res.data.length;i++){
						concatList1 = concatList1.concat(res.data[i].classroomName)
				}
				this.columns2[0].values = concatList1
			},
			async getPeople(){
				let concatList2 = []
				let concatList3 = []
				const params = {
					ywcode:'009',
					ywid:this.noticeId
				}
				const res = await Api.selectReviewerApi(params)
				for(let i = 0;i < res.data.length;i++){
					concatList2 = concatList2.concat(res.data[i].userrealname)
					concatList3 = concatList3.concat(res.data[i].userid)
				}
				this.columns3[0].values = concatList2
				this.shrList = concatList3
			}
		},
		created(){
			this.week = this.$route.query.week;
			this.time = this.$route.query.time;
			this.className = this.$route.query.className;
			this.address = this.$route.query.address;
			this.coursePlanId = this.$route.query.coursePlanId;
			this.weekNote = this.$route.query.weekNote;
			this.oldWeek = this.$route.query.oldWeek;
			this.semesterId = this.$route.query.semesterId;
			this.classroomName = this.$route.query.classRoom;
			this.noticeId = this.$route.query.noticeId;
			this.timeFlag = this.$route.query.timeFlag;
			this.classNames = this.$route.query.classNames,
			this.dm = this.$route.query.dm
			this.Part();
			this.Part2();
			// this.Part3();
			this.dm = this.$route.query.dm
			let concatList = []
			//节次列表（下拉框）
			this.getNode()
			//补课周次
			this.getWeek()
			//地点
			this.getAddress()
			//审核人
			this.getPeople()
		},
	};
</script>

<style lang="less" scoped>
	
	.P_box{
		width: 90%;
		margin-left: 5%;
	}
	.P_box>p{
		color: #757DA3;
		font-size: 14px;
		margin-top: 8px;
	}
	.P_box>p:nth-child(1){
		color: #212F6E;
		font-size: 18px;
		font-weight: 600
	}
	.P_box>p .technology{
		width: 294px;
		height: 40px;
		display: inline-block;
	}
	.fl_span{
		float: left;
	}
	.my_span{
		display: inline-block;
		width: 100%;
		height: 41px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom:1px solid #F4F4F4
	}
	.my_span input::-webkit-input-placeholder{
		color: #DFE0E6;
		text-indent: 103px
	}
	.my_span input{
		color: gray;
		/* float: right; */
    	width: 195px;
		text-align: right
	}
	.my_span .fr_span{
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		margin-top: 10px
	}
	.flex_item{
		float: left;
	}
	.flex_item i{
		width: 22px;
		height: 22px;
	}
	.flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle
	}
	.flex_item span{
		color: #212F6E;
	}
	.choic{
		width: 90%;
		margin-left: 5%;
		margin-bottom: 100px
	}
	.choic>p{
		height: 40px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom: 1px solid #F4F4F4;
	}
	.choic>p span{
		color: #212F6E;
		font-size: 16px;
	}
	.choic>p:nth-child(1) input{
		width: 155px;
	}
	.choic>p i{
		display: inline-block;
		width: 22px;
		height: 22px;
	}
	.choic>p i img{
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
	.choic .fr_data{
		text-align: right;
		/* float: right; */
		width: 195px;
		color: gray;
	}
	.el-input__inner{
		width: 150px;
	}
	.choic textarea{
		width: 200px;
		text-align: right;
		color: gray;
	}
	.choic input::-webkit-input-placeholder,.choic textarea::-webkit-input-placeholder{
		text-align: right;
		color: #DFE0E6;
		font-size: 16px;
	}
	.subm{
		width: 90%;
		margin-left: 5%;
		/* margin-top: 25px; */
		position: fixed;
		bottom: 20px
	}
	.subm button{
		display: block;
		text-align: center;
		line-height: 40px;
		width: 100%;
		height: 40px;
		color: #FFFFFF;
		background: #7469F8;
		font-size: 16px;
		border-radius: 3px;
	}
	.el-message{
		margin-top: -20px;
	}
	/* .pick-input{
		float:right;
		width: 75px;
	} */
	.choic .my_spans{
		display: inline-block;
		width: 100%;
		height: 41px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom:1px solid #F4F4F4;
		display: flex;
    	justify-content: space-between;
	}
	.choic .my_spans input::-webkit-input-placeholder{
		color: #DFE0E6;
		text-indent: 93px

	}
	.choic .my_spans input{
		color: gray;
		/* float: right; */
    	width: 195px;
		text-align: right
	}
	.choic .my_spans .fr_span{
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		margin-top: 10px
	}
	.choic .flex_item{
		float: left;
	}
	.choic .flex_item i{
		width: 22px;
		height: 22px;
		margin-bottom: 17px
	}
	.choic .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle
	}
	.choic .flex_item span{
		color: #212F6E;
	}
	.choic .el-input__inner{
		border: none
	}
	.choic .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.choic .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/lessons.vue