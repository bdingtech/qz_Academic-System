<template>
	<div class="whole2">
		<Header :title="title"></Header>
		<div class="P_box">
			<p>{{className}}</p>
			<p>周次：<span>{{week}}</span> </p>
			<p>时间：<span>{{weekNote}}</span> </p>
			<p>地点：<span>{{classroomName}}</span> </p>
			<p v-if="!$route.query.isEx"><span class="fl_span">班级：</span>{{classNames}}</p>
		</div>
		<div class="choice">
			<span class="m_span">
				<div class="flex_item"><img src="../../../assets/images/date_icon2.png" alt="" class="my_img"><span>星期几</span></div>
				<div>
					<input type="text" @click="showPicker1 = true" readonly v-model="value1" class="pick-input" placeholder="请选择">
					<span :class="value1 == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
				</div>
			</span>
			<span class="m_span" v-if="!$route.query.isEx">
				<div class="flex_item"><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"><span>起止节次</span></div>
				<div>
					<input type="text" @click="startTap()" readonly v-model="value" class="pick-input" placeholder="请选择">
					<span :class="value == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
				</div>
			</span>
			<span class="m_span" v-if="$route.query.isEx">
				<div class="flex_item"><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"><span>可选老师</span></div>
				<div>
					<input type="text" @click="weekTap()" readonly v-model="weekValue" class="pick-input" placeholder="请选择">
					<span :class="value == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
				</div>
			</span>
			<span class="m_span">
				<div class="flex_item"><img src="../../../assets/images/address_icon2.png" alt="" class="my_img"><span>地点</span></div>
				<div>
					<input type="text" @click="openLocate()" readonly v-model="value3" class="pick-input" placeholder="请选择">
					<span :class="value3 == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
				</div>
			</span>
			<span class="m_span">
				<div class="flex_item"><img src="../../../assets/images/address_icon2.png" alt="" class="my_img"><span>审核人</span></div>
				<div>
					<input type="text" @click="showPicker3 = true" readonly v-model="value4" class="pick-input" placeholder="请选择">
					<span :class="value4 == '' ? 'fr_span' : 'fr_span_act'" style="display:inline-block"></span>
				</div>
			</span>
			<span class="m_span">
				<div class="flex_item"><img src="../../../assets/images/icon_why2.png" alt="" class="my_img"><span>调课原因</span></div>
				<div>
					<textarea name="" id="" cols="30" rows="10" class="fr_date" placeholder="请点击填写" v-model="textarea"></textarea>
				</div>
			</span>
		</div>
		<div class="sub">
				<button @click="fn1()" :disabled="isDisabled">提交申请</button> 
		</div>
		<van-popup v-model="showPicker1" position="bottom">
			<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
		</van-popup>
		<!-- 可选老师  -->
		<van-popup v-model="weekPicker" position="bottom">
			<van-picker show-toolbar :columns="weekColumns" @cancel="weekPicker = false" @confirm="weekConfirm" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker3" position="bottom">
			<div class="apply-pop">
				<div class="pop-title">
					<i class="close-icon" @click="showPicker3 = false"></i>
					<p>审核人</p>
					<i class="confirm-icon" @click="resetCancel()"></i>
				</div>
				<div class="person">
					<button class="per-btn" ref="person" @click="personTap($event,index)" v-for="(item,index) in columns3" :key="item.id">{{item.name}}</button>
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
				weekPicker:false,
				weekColumns:[],
				title:'整体调课',
				//起始节次
				columns: [],
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
          id:'',
          name:'全部',
          isBtn:0,
        }],
				Node:[],
				Campus:[],
				weekValue:'',
				value1:'',
				value:'',
				value3: '',
				value4:'',
				textarea:'',
				phone:'',
				showPicker: false,
				showPicker1: false,
				showPicker2: false,
				showPicker3: false,
				week:'',
				time:'',
				className:'',
				teachingBuildingName:'',
				coursePlanId:'',
				classroomlist:[],
				weekNote:'',
				teacherId:'',
				Submitlist:[],
				semesterId:'',
				classroomName:'',
				noticeId:'',
				timeFlag:'',
				classNames:'',
				dm:'',
				weekIndex:'',
				shrList:[],
				shr:'',
				classRoomIdList:[],
				classRoomId:'',
				nodeId:'',
				nodeIdList:[],
        reset:"",
        resetId:''
			};
		},
		methods:{
			resetCancel(){
	      this.showPicker3= false
	      this.value4 = this.reset
	      this.shr = this.resetId
	    },
			personTap(e,res){
        let strList = []
				let idList = []
				if(this.columns3[res].isBtn == 0){
          this.columns3[res].isBtn = 1
          e.target.className = 'cur'
        }else if(this.columns3[res].isBtn == 1){
          this.columns3[res].isBtn = 0
          e.target.className = 'per-btn'
        }
        for(let i in this.columns3){
          if(this.columns3[res].name == '全部'){
            this.columns3[i].isBtn = 0;
            this.columns3[res].isBtn = 1
            this.$refs.person[res].className = 'cur'
            this.$refs.person[i].className = 'per-btn'
          }else{
            this.columns3[0].isBtn = 0;
            this.$refs.person[0].className = 'per-btn'
          }
          if(this.columns3[i].isBtn == 1){
            strList = strList.concat(this.columns3[i].name)
            idList = idList.concat(this.columns3[i].id)
          }
        }
        this.reset = strList.toString();
        this.resetId = idList.toString();
			},
			startTap(){
				if(this.columns.length == 0){
					Toast('未查询到可用节次')
				}else{
					this.showPicker = true
				}
			},
			weekTap(){
				// this.weekPicker = true
				this.$router.push({
					path:'/alterTeacher',
					query:{
						isEx:true
					}
				})
			},
			//起始节次
			onConfirm(value,index) {
				this.value = value;
				this.showPicker = false;
				this.nodeId = this.nodeIdList[index]
			},
			//星期几
			onConfirm1(value1,index) {
				this.value1 = value1;
				this.value = '';
				this.weekIndex = Number(index) + 1
				this.showPicker1 = false;
				this.getNode()
			},
			//地点
			onConfirm2(value3,index) {
				this.value3 = value3;
				this.showPicker2 = false;
				this.classRoomId = this.classRoomIdList[index]
			},
			weekConfirm(val,index){

			},
			async openLocate(){
				//地点
				if(this.start == '' || this.value1.toString() == ''){
					Toast('请选择星期和起始节次~')
				}else{
					let concatList1 = []
					let weekNote = (Number(this.weekIndex) + 1) + this.start + this.end
					const params = {
						noticeId:this.noticeId,
						semesterId:this.semesterId,
						weekNote:this.nodeId,
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
						concatList1 = concatList1.concat(res.data[i].classroomName);
						this.classRoomIdList.push(res.data[i].classroomIds)
					}
					this.columns2[0].values = concatList1;
					this.showPicker2 = true;
				}
			},
			async getNode(){
					//节次列表
					const params = {
						coursePlanId:this.coursePlanId,
						weekNote:this.weekNote,
						noticeId:this.noticeId,
						week:this.week,
						timeFlag:this.timeFlag,
						oldWeek:this.week,
						changeType:this.$route.query.isEx ? '6' :'0',
					}
					const res = await Api.getTeachGetkysj(params)
					this.columns = [];
					this.nodeIdList = []
					for(let i = 0;i < res.data.length;i++){
						if(this.weekIndex == res.data[i].weekDay){
							this.columns.push(res.data[i].bigNode);
							this.nodeIdList.push(res.data[i].nodes)
						}
					}
			},
			async fn1(){
				let formData = {
						coursePlanId:this.coursePlanId,
						changeType:this.$route.query.isEx ? '6' :'0',
						classroomId:this.classRoomId,
						weekNote:this.nodeId,
						week:'',
						teacherId:'',
						changeMode:this.dm,
						applyReason:this.textarea,
						oldWeek:this.week,
						userIds:this.shr
					}
				let reg=/^1[3456789]\d{9}$/;
				if (this.value1 == '') {
					Toast("请选择星期")
					return false
				}
				if (this.value == '') {
					Toast("请选择起始节次")
					return false
				}
				if (this.value3 == '') {
					Toast("请选择地点")
					return false
				}
				if (this.textarea == '') {
					Toast("请填写调课原因")
					return false
				}
				const data = {
					formData:formData
				}
				const res = await Api.saveTransferApplication(data)
				if(res.errorCode=='fail'){
					Toast(res.errorMessage);
					return
				}else if(res.errorCode == 'success'){
					this.isDisabled = true;
					Toast.success(res.errorMessage);
					this.Submitlist = res.data;
					this.$router.push({
						path: '/record',
						query:{
							'week':this.value1,
							'node':this.value,
							'address':this.value3,
							'people':this.value4,
							// 'phone':this.phone,
							'why':this.textarea,
							'weeks':this.week,
							'time':this.weekNote,
							'className':this.className,
							'teachingBuildingName':this.address,
							'classNames':this.classNames
						}
					})
				}
			},
			async getPeople(){
				let concatList2 = []
				let concatList3 = []
				const params = {
					ywcode:'009',
					ywid:this.noticeId
				}
				const res = await Api.selectReviewerApi(params)
				res.data.forEach((item,index) => {
					concatList2[index] = {
						name:item.userrealname,
						id:item.userid,
						isBtn:0,
					}
				});
				this.columns3 = this.columns3.concat(concatList2);
			},
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
			//审核人
			this.getPeople()
		},
	};
</script>

<style lang="less" scoped>
/* 审核人 */
  .whole2 .van-picker__columns::before{width: 140px;height: 1px;background-color: #DFE0E6;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .whole2 .van-picker__columns::after{width: 140px;height: 1px;background-color: #DFE0E6;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .whole2 .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: #212F6E;font-weight: 600;}

	.whole2 .close-icon{background: url(../../../../static/img/close.png)no-repeat center;}
  .whole2 .confirm-icon{background: url(../../../../static/img/confirm.png)no-repeat center;}
  .whole2 .pop-title i{width: 22px;height: 22px;background-size: 22px 22px;padding: 10px;}
	.whole2 .pop-title{display: flex;align-items: center;justify-content: space-between;}
	.whole2 .person{padding: 15px;}
	.whole2 .person button{border-radius:3px;padding: 5px 15px;margin-right: 12px;margin-bottom: 10px;}
  .whole2 .apply-pop .person .per-btn{background-color: #ECEDFD;color: #7469F8;}
  .whole2 .person .cur{background-color: #7469F8;color: #ECEDFD;}

	.P_box {
		width: 90%;
		margin-left: 5%;
		margin-top: 70px;
	}

	.P_box>p {
		color: #757DA3;
		font-size: 14px;
		margin-top: 8px;
	}

	.P_box>p:nth-child(1) {
		color: #212F6E;
		font-size: 18px;
		font-weight:600;
	}

	.P_box>p .technology {
		width: 294px;
		height: 40px;
		display: inline-block;
	}

	.fl_span {
		float: left;
	}

	.choice {
		width: 90%;
		margin-left: 5%;
		margin-bottom: 100px;
	}

	.choice>p {
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		border-bottom: 1px solid #F4F4F4;
	}

	.choice>.m_span span {
		color: #212F6E;
		font-size: 16px;
	}

	.choice>.m_span i {
		display: inline-block;
		width: 22px;
		height: 22px;
	}

	.choice>.m_span i img {
		width: 100%;
		vertical-align: middle;
	}

	.fr_date {
		width: 150px;
		height: 40px;
		border: none !important;
		color: #212F6E;
		font-size: 16px;
		text-align:right;
	}
	.fr_data{
		text-align: center;
		width: 190px;
		color: gray;
	}
	.choice textarea{
		width: 150px;
		text-align: right;
		color: #212F6E;
		font-weight: 600;
	}
	.choic .fr_data{
		text-align: center;
		float: right;
		width: 195px;
		color: gray;
	}
	.el-input__inner{
		width: 150px;
		/* text-align: center */
	}
	.sub {
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		background-color: #fff;
	}

	.sub button {
		line-height: 40px;
		margin: 20px 0;
		width: 100%;
		height: 40px;
		color: #FFFFFF;
		background: #7469F8;
		font-size: 16px;
		border-radius: 3px;
	}
	.el-select{
		float: right;
		width: 180px;
	}
	.el-select-dropdown__list{
		width: 180px;
	}
	.el-input__inner{
		border: none
	}
	.el-message{
		margin-top: -20px;
	}
	.choice .m_span{
		display: inline-block;
		width: 100%;
		height: 41px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom:1px solid #F4F4F4;
		display: flex;
    	justify-content: space-between;
	}
	.choice .m_span input::placeholder{
		color: #DFE0E6;
		font-weight: 400;
	}
	.choice .m_span textarea::placeholder{
		color: #DFE0E6;
		text-align: right;
		font-weight: 400;
	}
	.choice .m_span input{
		color: #212F6E;
		font-weight: 600;
		text-align: right;
		width: 90%;
		padding-right: 5px;
	}
	.m_span div:last-child{
		display: flex;align-items: center;
		flex: 1;
		justify-content: flex-end;
	}
	.choice .m_span .fr_span{
		width: 15px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
	}
	.choice .m_span .fr_span_act{
		width: 8px;
		height: 20px;
		background: url(../../../../static/img/arrow.png) center center no-repeat;
		background-size: 100%;
		vertical-align: middle;
	}
	.choice .flex_item{
		display: flex;
		align-items: center;
	}
	.choice .flex_item .my_img{
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
	.choice .flex_item span{
		color: #212F6E;
		white-space: nowrap;
	}
	.whole2 .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.whole2 .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Change/whole2.vue