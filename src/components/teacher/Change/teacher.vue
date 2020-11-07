<template>
	<div class="teacher111">
		<Header title="老师变更" type="0" route="teacher2"></Header>
		<div class="P_boxs">
			<p>{{courseName}}</p>
			<p>周次：<span>{{week}}</span> </p>
			<p>时间：<span>{{weekNote}}</span> </p>
			<p>地点：<span>{{classroomName}}</span> </p>
			<p><span class="fl_span">班级：</span><span class="technology">{{classNames}}</span> </p>
		</div>
		<div class="cho">
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_teacher2.png" alt="" class="my_img"><span>变更老师</span></div>
				<div>
					<input type="text" readonly v-model="valuess" class="pick-input" placeholder="请选择" @click="alterTeacher()">
					<span :class="valuess == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"><span>教学变更周次</span></div>
				<div>
					<input type="text" @click="showPickers = true" readonly v-model="value1" class="pick-input" placeholder="请选择">
					<span :class="value1 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/date_icon2.png" alt="" class="my_img"><span>星期几</span></div>
				<div>
					<input type="text" @click="showPicker2 = true" readonly v-model="value3" class="pick-input" placeholder="请选择">
					<span :class="value3 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"><span>起止节次</span></div>
				<div>
					<input type="text" @click="startTap()" readonly v-model="value" class="pick-input" placeholder="请选择">
					<span :class="value == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/address_icon2.png" alt="" class="my_img"><span>地点</span></div>
				<div>
					<input type="text" @click="localTap()" readonly v-model="value2" class="pick-input" placeholder="请选择">
					<span :class="value2 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_people2.png" alt="" class="my_img"><span>审核人</span></div>
				<div>
					<input type="text" @click="showPicker4 = true" readonly v-model="values" class="pick-input" placeholder="请选择">
					<span :class="values == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<!-- <div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_phone2.png" alt="" class="my_img"><span>联系电话</span></div>
				<div>
					<input type="text" v-model="phone" class="fr_data" placeholder="请点击填写">
				</div>
			</div> -->
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_why2.png" alt="" class="my_img"><span>调课原因</span></div>
				<div>
					<textarea name="" id="" cols="30" rows="10" class="fr_date" placeholder="请点击填写" v-model="textarea"></textarea>
				</div>
			</div>
		</div>
		<div class="submi">
				<button @click="fn1()" :disabled="isDisabled">提交申请</button> 
		</div>
		<van-popup v-model="showPickers" position="bottom">
			<van-picker show-toolbar :columns="columnss" @cancel="showPickers = false" @confirm="onConfirms"/>
		</van-popup>
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2"/>
		</van-popup>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm"/>
		</van-popup>
		<van-popup v-model="showPicker3" position="bottom">
			<van-picker show-toolbar :columns="columns3" @cancel="showPicker3 = false" @confirm="onConfirm3"/>
		</van-popup>
		<van-popup v-model="showPicker4" position="bottom">
			<div class="apply-pop">
				<div class="pop-title">
					<i class="close-icon" @click="showPicker4 = false"></i>
					<p>审核人</p>
					<i class="confirm-icon" @click="resetCancel()"></i>
				</div>
				<div class="person">
					<button class="per-btn" ref="person" @click="personTap($event,index)" v-for="(item,index) in columns4" :key="item.id">{{item.name}}</button>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
// // import Header from '../header.vue'
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
	export default {
		data() {
			return {
				isDisabled:false,
				//起止节次
				columns: [],
				//教学变更周次
				columnss: [{
					values: [],
					className: 'column1'
					},
					{
					values: [],
					className: 'column2',
					defaultIndex: 1
				}],
				//变更老师
				columns1: [{
					values: [],
					className: 'column1'
				}],
				//星期几
				columns2: [{
					values: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
					className: 'column1'
				}],
				//地点
				columns3: [],
				//审核人
				columns4: [{
          id:'',
          name:'全部',
          isBtn:0,
        }],
				Node:[],
				classroomlist:[],
				value:'',
				value1:'',
				value2:'',
				value3: '',
				values:'',
				valuess:"",
				phone:'',
				textarea:"",
				showPicker: false,
				showPickers: false,
				showPicker1: false,
				showPicker2: false,
				showPicker3: false,
				showPicker4: false,
				TeacherList:[],
				coursePlanId:'',
				weekNote:'',
				week:'',
				oldWeek:'',
				teacherName:[],
				className:'',
				time:'',
				address:'',
				courseName:'',
				noticeId:'',
				timeFlag:'',
				dm:'',
				shrList:[],
				shr:'',
				adressList:[],
				adressId:'',
				durNodeList:[],
				durNodeId:'',
				xqWeek:'',
        reset:"",
        resetId:''
			};
		},
		methods:{
			resetCancel(){
	      this.showPicker4= false
	      this.values = this.reset
	      this.shr = this.resetId
	    },
			startTap(){
				if(this.value1 == ''){
					Toast.fail('请选择变更周次')
				}else if(this.value3 == ''){
					Toast.fail('请选择星期')
				}else{
					this.showPicker = true;
				}
			},
			localTap(){
				if(this.value1 == '' || this.value == ''){
					Toast.fail('请选择起止节次和变更周次')
				}else{
					this.getLoaction()
					this.showPicker3 = true;
				}
			},
			alterTeacher(){
				this.$router.push({
					path:'/alterTeacher',
					query:{
						'week':this.$route.query.week,
						'time':this.$route.query.time,
						'className':this.$route.query.className,
						'classNames':this.$route.query.classNames,
						'address':this.$route.query.address,
						'coursePlanId':this.$route.query.coursePlanId,
						'weekNote':this.$route.query.weekNote,
						'oldWeek':this.$route.query.oldWeek,
						'semesterId':this.$route.query.semesterId,
						'classRoom':this.$route.query.classRoom,
						'noticeId':this.$route.query.noticeId,
						'timeFlag':this.$route.query.timeFlag,
						'dm':this.$route.query.dm
					}
				})
			},
			//起止节次
			onConfirm(value,index) {
				this.value = value;
				this.showPicker = false;
				this.durNodeId = this.durNodeList[index];
				this.getLoaction();
			},
			//教学变更周次
			onConfirms(value1) {
				this.value1 ='第'+value1[0]+'周' + '变更为' +'第'+value1[1]+'周';
				this.start = value1[0];
				this.end = value1[1]
				this.showPickers = false;
				if(this.value3 == ''){

				}else{
					this.getNode();
				}
			},
			//变更老师
			onConfirm1(value) {
				this.valuess = value;
				this.showPicker1 = false;
			},
			//星期几
			onConfirm2(value3,index) {
				this.value3 = value3;
				this.value = '';
				this.showPicker2 = false;
				this.xqWeek = Number(index) + 1
				if(this.value1 == ''){

				}else{
					this.getNode();
				}
			},
			//地点
			onConfirm3(value2,index) {
				this.value2 = value2;
				this.showPicker3 = false;
				this.adressId = this.adressList[index]
			},
			personTap(e,res){
        let strList = []
        let idList = []
        if(this.columns4[res].isBtn == 0){
          this.columns4[res].isBtn = 1
          e.target.className = 'cur'
        }else if(this.columns4[res].isBtn == 1){
          this.columns4[res].isBtn = 0
          e.target.className = 'per-btn'
        }
        for(let i in this.columns4){
          if(this.columns4[res].name == '全部'){
            this.columns4[i].isBtn = 0;
            this.columns4[res].isBtn = 1
            this.$refs.person[res].className = 'cur'
            this.$refs.person[i].className = 'per-btn'
          }else{
            this.columns4[0].isBtn = 0;
            this.$refs.person[0].className = 'per-btn'
          }
          if(this.columns4[i].isBtn == 1){
            strList = strList.concat(this.columns4[i].name)
            idList = idList.concat(this.columns4[i].id)
          }
        }
        this.reset = strList.toString();
        this.resetId = idList.toString();
			},
			async getNode(){
				//节次列表（下拉框）
				const params = {
					coursePlanId:this.coursePlanId,
					weekNote:'',
					noticeId:this.noticeId,
					week:this.xqWeek,
					timeFlag:this.timeFlag,
					changeType:'5',
					teacherid:this.teacherId,
					oldWeek:this.start,
				}
				const res = await Api.getTeachGetkysj(params)
				this.columns = [];
				this.durNodeList = [];
				if(res.errorCode == 'fail'){
					Toast(res.errorMessage)
				}
				for(let i = 0;i < res.data.length;i++){
					if(res.data[i].weekDay == this.xqWeek){
						this.columns.push(res.data[i].bigNode)
						this.durNodeList.push(res.data[i].nodes)
					}
				}
			},
			async getLoaction(){
				//地点
				let concatList2 = []
				const params = {
					noticeId:this.noticeId,
					semesterId:this.semesterId,
					weekNote:this.durNodeId,
					week:this.start + '-' + this.end,
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
					concatList2 = concatList2.concat(res.data[i].classroomName);
					this.adressList.push(res.data[i].classroomIds)
				}
				this.columns3 = concatList2;
			},
			async saveTransferApplication(){
				const data = {
					formData:{
						coursePlanId:this.coursePlanId,
						changeType:'5',
						classroomId:this.adressId,
						weekNote:this.durNodeId,
						week:this.end,
						teacherId:this.teacherId,
						changeMode:this.dm,
						applyReason:this.textarea,
						oldWeek:this.start,
						userIds:this.shr
					}
				}
				const res = await Api.saveTransferApplication(data)
				this.Submitlist = res.data;
				if(res.errorCode == 'fail'){
					Toast(res.errorMessage)
				}else{
					this.$router.push({
						path: '/record3',
						query:{
							'teacher':this.valuess,
							'week':this.value3,
							'node':this.value,
							'address':this.value2,
							'people':this.values,
							// 'phone':this.phone,
							'why':this.textarea,
							'weeks':this.week,
							'time':this.weekNote,
							'teachingBuildingName':this.address,
							'className':this.classNames,
							'courseName':this.courseName,
							'startWeek':this.start,
							'endWeek':this.end
						}
					})
				}
			},
			fn1(){
				if (this.value !== '' && this.value2 !== '' && this.value3 !== '' && this.valuess !== '' && this.textarea !== ''){
					this.isDisabled = true;
						this.saveTransferApplication()
				} else {
					Toast.fail('选项不能为空');
					return false
				}
			},
			async getWeek(){
				let concatLists = []
				//周次次列表（下拉框）
				const res = await Api.getTeachingWeek()
				let range = this.$route.query.oldWeek.match(/\d?(.\d+)?/ig);
				for(let j = 0;j < range.length;j++){
					if(range[j] != ''){
						this.columnss[0].values.push(range[j].substr(1,range[j].length))
					}
				}
				for(let i = 0;i < res.data.length;i++){
					concatLists = concatLists.concat(res.data[i].week)
					this.columnss[1].values = concatLists
				}
			},
			async changeTeacher(){
				//变更老师
				let concatList1 = []
				const params = {
					facultyId:'',
					departmentId:'',
					teacherName:''
				}
				const res = await Api.teachGetKxls(params)
				for(let i = 0;i < res.data.length;i++){
					concatList1 = concatList1.concat(res.data[i].teacherName)
				}
				this.columns1[0].values = concatList1
			},
			async getPeople(){
				//审核人
				let concatList4 = []
				const params = {
					ywcode:'009',
					ywid:this.noticeId
				}
				const res = await Api.selectReviewerApi(params)
				res.data.forEach((item,index) => {
					concatList4[index] = {
						name:item.userrealname,
						id:item.userid,
						isBtn:0,
					}
				});
				this.columns4 = this.columns4.concat(concatList4);
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
			//变更老师id
			this.teacherId = this.$route.query.teaData;
			if(this.$route.query.teaName){
				this.valuess = this.$route.query.teaName
			}
			this.getWeek()
			this.changeTeacher()
			this.getPeople()
		},
		watch: {
			$route:{
				handler(){
					this.valuess = this.$route.query.teaName
				}
			},
			deep:true
    },
	};
</script>

<style lang="less" scoped>
/* 审核人 */
	.teacher111 .close-icon{background: url(../../../../static/img/close.png)no-repeat center;}
  .teacher111 .confirm-icon{background: url(../../../../static/img/confirm.png)no-repeat center;}
  .teacher111 .pop-title i{width: 22px;height: 22px;background-size: 22px 22px;padding: 10px;}
	.teacher111 .pop-title{display: flex;align-items: center;justify-content: space-between;}
	.teacher111 .person{padding: 15px;}
	.teacher111 .person button{border-radius:3px;padding: 7px 15px;margin-right: 12px;margin-bottom: 10px;}
  .teacher111 .apply-pop .person .per-btn{background-color: #ECEDFD;color: #7469F8;}
  .teacher111 .person .cur{background-color: #7469F8;color: #ECEDFD;}
	.teacher111 .van-popup.van-popup--bottom .van-picker .van-picker-column{position: relative;}
	.teacher111 .van-popup.van-popup--bottom .van-picker .van-picker-column::before{position: absolute;content: "";width: 100px;height: 35px;top: 50%;left: 50%;z-index: 9;transform: translate(-50%,-50%);border-top:1px solid #DFE0E6;border-bottom: 1px solid #DFE0E6;}
  .teacher111 .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: #212F6E;font-weight: 600;}

	.teacher111 .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.teacher111 .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.P_boxs{
		width: 90%;
		margin-left: 5%;
	}
	.P_boxs>p{
		color: #757DA3;
		font-size: 14px;
		margin-top: 8px;
	}
	.P_boxs>p:nth-child(1){
		color: #212F6E;
		font-size: 18px;
		font-weight: 600
	}
	.P_boxs>p .technology{
		width: 294px;
		height: 40px;
		/* display: inline-block; */
	}
	.cho{
		width: 90%;
		margin-left: 5%;
		margin-bottom: 100px
	}
	.cho>p{
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		border-bottom: 1px solid #F4F4F4;
	}
	.fl_span{
		float: left;
	}
	.cho>p span{
		color: #212F6E;
		font-size: 16px;
	}
	.cho>p:nth-child(2) input{
		width: 155px;
	}
	.cho>p i{
		display: inline-block;
		width: 22px;
		height: 22px;
	}
	.cho>p i img{
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
	.cho .fr_data{
		text-align: center;
		/* float: right; */
		width: 195px;
		color: gray;
		text-align: right
	}
	.el-input__inner{
		width: 150px;
	}
	.cho textarea{
		width: 200px;
		text-align: right;
		color: gray;
	}
	.cho input::-webkit-input-placeholder,.cho textarea::-webkit-input-placeholder{
		text-align: right;
		color: #DFE0E6;
		font-size: 16px;
	}
	.teacher111 .submi{
		width: 100%;
		padding: 0 20px;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		background-color: #fff;
	}
	.teacher111 .submi button{
		text-align: center;
		line-height: 40px;
		width: 100%;
		height: 40px;
		color: #FFFFFF;
		background: #7469F8;
		font-size: 16px;
		border-radius: 3px;
		margin: 20px 0;
	}
	.el-message{
		margin-top: -20px;
	}
	.cho .my_span{
		display: inline-block;
		width: 100%;
		height: 41px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom:1px solid #F4F4F4
	}
	.cho .my_span input::-webkit-input-placeholder{
		color: #DFE0E6;
		/* text-align: right */
		text-indent: 113px
	}
	.cho .my_span input{
		color: gray;
		float: right;
    	width: 170px;
		text-indent: 26px
	}
	.cho .my_span .fr_span{
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
		margin-top: 10px
	}
	.cho .flex_item{
		float: left;
	}
	.cho .flex_item i{
		width: 22px;
		height: 22px;
	}
	.cho .flex_item .my_img{
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
	.cho .flex_item span{
		color: #212F6E;
	}
	.cho .my_spans{
		display: inline-block;
		width: 100%;
		height: 41px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom:1px solid #F4F4F4;
		display: flex;
		justify-content: space-between
	}
	.cho .my_spans input::placeholder{
		font-weight: 400;
	}
	.cho .my_spans input{
		color: #212F6E;
		font-weight: 600;
		text-align: right;
		padding-right: 5px;
	}
	.cho .my_spans .fr_span{
		width: 15px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
	}
	.cho .my_spans .fr_span_act{
		width: 8px;
		height: 20px;
		background: url(../../../../static/img/arrow.png) center center no-repeat;
		background-size: 100%;
		vertical-align: middle;
	}
	.cho .flex_item{
		display: flex;
		align-items: center;
	}
	.my_spans div:last-child{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.my_spans .pick-input{width: calc(100% - 22px)}
	.cho .flex_item i{
		width: 22px;
		height: 22px;
	}
	.cho .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle
	}
	.cho .flex_item span{
		color: #212F6E;
	}
	.cho .el-input__inner{
		border: none
	}
	.cho .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.cho .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/teacher.vue