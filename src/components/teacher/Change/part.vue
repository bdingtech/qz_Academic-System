<template>
	<div class="part">
		<Header title="部分调课"></Header>
		<div class="P_box">
			<p>{{className}}</p>
			<p>周次：<span>{{week}}</span> </p>
			<p>时间：<span>{{weekNote}}</span> </p>
			<p>地点：<span>{{address}}</span> </p>
			<p><span class="fl_span">班级：</span>{{classNames}}</p>
		</div>
		<div class="choic">
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"><p>教学变更周次</p></div>
				<div>
					<input type="text" @click="showPickers = true" readonly v-model="value1" class="pick-input" placeholder="请选择">
					<span :class="value1 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/date_icon2.png" alt="" class="my_img"><p>星期几</p></div>
				<div>
					<input type="text" @click="showPicker1 = true" readonly v-model="value3" class="pick-input" placeholder="请选择">
					<span :class="value3 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/time_icon2.png" alt="" class="my_img"><p>起止节次</p></div>
				<div>
					<input type="text" @click="nodeTap()" readonly v-model="value" class="pick-input" placeholder="请选择">
					<span :class="value == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/address_icon2.png" alt="" class="my_img"><p>地点</p></div>
				<div>
					<input type="text" @click="addressTap()" readonly v-model="value2" class="pick-input" placeholder="请选择">
					<span :class="value2 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_people2.png" alt="" class="my_img"><p>审核人</p></div>
				<div>
					<input type="text" @click="showPicker3 = true" readonly v-model="value4" class="pick-input" placeholder="请选择">
					<span :class="value4 == '' ? 'fr_span' : 'fr_span_act'"></span>
				</div>
			</div>
			<!-- <div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_phone2.png" alt="" class="my_img"><p>联系电话</p></div>
				<div>
					<input type="text" v-model="phone" class="fr_data" placeholder="请点击填写">
				</div>
			</div> -->
			<div class="my_spans">
				<div class="flex_item"><img src="../../../assets/images/icon_why2.png" alt="" class="my_img"><p>调课原因</p></div>
				<div>
					<textarea name="" id="" cols="30" rows="10" class="fr_date" placeholder="请点击填写" v-model="textarea"></textarea>
				</div>
			</div>
		</div>
		<div class="subm">
			<button @click="fn1()" :disabled="isDisabled">提交申请</button>
		</div>
		
		<van-popup v-model="showPickers" position="bottom">
			<van-picker show-toolbar :columns="columnss" @cancel="showPickers = false" @confirm="onConfirms" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker1" position="bottom">
			<van-picker show-toolbar :columns="columns1" @cancel="showPicker1 = false" @confirm="onConfirm1" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" :item-height="35"/>
		</van-popup>
		<van-popup v-model="showPicker2" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="showPicker2 = false" @confirm="onConfirm2" :item-height="35"/>
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
				option: [{
					values: '',
					labels: ''
				}],
				//起始节次
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
				//星期几
				columns1: [{
					values: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
				}],
				//地点
				columns2: [],
				//审核人
				columns3: [{
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
				value4:'',
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
				shr:'',
				type:'',
				classRoom:'',
				weekDetail:'',
				weekItem:'',
				adressId:'',
				adressIdList:[],
				classRoomIdList:[],
				classRoomId:'',
        reset:"",
        resetId:''
			};
		},
		methods:{
			resetCancel(){
	      this.showPicker3 = false
	      this.value4 = this.reset
	      this.shr = this.resetId
	    },
			addressTap(){
				if(this.value3 == '' || this.value1 == '' || this.value == ''){
					Toast.fail("请选择周次和起止节次")
				}else if(this.columns2.length == 0){
					Toast('未查询到可用地点')
				}else{
					this.showPicker2 = true
				}
			},
			//节次
			async Part(){
				const res = await Api.getNodeList()
				this.Node = res.data;
			},
			nodeTap(){
				if(this.value3 == ''){
					Toast.fail('请先选择星期')
				}else{
					if(this.columns.length == 0){
						Toast.fail('未查询到可用节次')
					}else{
						this.showPicker = true;
					}
				}
			},
			//起始节次
			onConfirm(value,index) {
				this.showPicker = false;
				this.value = value;
				// this.end = value[1]
				this.adressId = this.adressIdList[index]
				this.Part2();
			},
			//教学变更周次
			onConfirms(value1) {
				this.value1 ='第'+value1[0]+'周' + '变更为' +'第'+value1[1]+'周';
				this.start = value1[0];
				this.end = value1[1]
				this.showPickers = false;
				if(this.value3 == ''){

				}else{
					this.getNodeList();
				}
			},
			//星期几
			onConfirm1(value3,index) {
				this.value = ''
				this.value3 = value3.toString();
				this.showPicker1 = false;
				this.weekItem = (Number(index) + 1).toString();
				if(this.value1 == ''){

				}else{
					this.getNodeList();
				}
			},
			//地点
			onConfirm2(value2,index) {
				this.value2 = value2;
				this.showPicker2 = false;
				this.classRoomId = this.classRoomIdList[index]
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
			async Part2(){
				//地点
				const params = {
					noticeId:this.noticeId,
					semesterId:this.semesterId,
					weekNote:this.adressId,
					week:this.start + '-' + this.end,
					timeFlag:this.timeFlag,
					changeType:'1',
					coursePlainId:this.coursePlanId,
					//非必须
					campusId:'',
					teachingBuildingId:'',
					validSeat:'',
					domainId:'',
					classroomName:''
				}
				const res = await Api.getTeachGetkyjs(params)
				for(let i = 0;i < res.data.length;i++){
					this.columns2.push(res.data[i].classroomName);
					this.classRoomIdList.push(res.data[i].classroomIds)
				}
			},
			async getNodeList(){
				this.columns = []
				//节次列表（下拉框）
				const params = {
					coursePlanId:this.coursePlanId,
					weekNote:this.weekNote,
					noticeId:this.noticeId,
					week:this.end,
					timeFlag:this.timeFlag,
					oldWeek:this.start,
					changeType:'1',
				}
				const res = await Api.getTeachGetkysj(params)
				if(res.errorCode == 'fail'){
					Toast.fail(res.errorMessage)
				}else{
					for(let i = 0;i < res.data.length;i++){
						if(this.weekItem == res.data[i].weekDay){
							this.columns.push(res.data[i].bigNode)
							this.adressIdList.push(res.data[i].nodes)
						}
					}
				}
			},
			async saveTransferApplication(){
				const data = {
					formData:{
						coursePlanId:this.coursePlanId,
						changeType:'1',
						classroomId:this.classRoomId,
						weekNote:this.adressId,
						week:this.end,
						teacherId:'',
						changeMode:this.dm,
						applyReason:this.textarea,
						oldWeek:this.start,
						userIds:this.shr
					}
				}
				const res = await Api.saveTransferApplication(data)
				this.Submitlist = res.data;
				if(res.errorCode == 'success'){
					Toast.success('申请成功')
					this.$router.push({
						path: '/record2',
						query:{
							'adjustweek':this.value1,
							'week':this.value3,
							'node':this.value,
							'address':this.value2,
							'people':this.value4,
							// 'phone':this.phone,
							'why':this.textarea,
							'weeks':this.week,
							'time':this.weekNote,
							'teachingBuildingName':this.address,
							'className':this.courseName,
							'classNames':this.classNames
						}
					})
				}else{
					Toast(res.errorMessage)
				}
			},
			fn1(){
				if (this.value !== '' && this.value2 !== '' && this.value3 !== '' && this.textarea !== ''){
						this.isDisabled = true;
						this.saveTransferApplication()
				} else {
					Toast.fail('选项不能为空');
					return false
				}
			},
			async getWeek(){
				//周次次列表（下拉框）
				let concatLists = []
				const res = await Api.getTeachingWeek()
				let range = this.weekDetail.match(/\d?(.\d+)?/ig);
				for(let j = 0;j < range.length;j++){
					if(range[j] != ''){
						this.columnss[0].values.push(range[j].substr(1,range[j].length))
					}
				}
				for(let i = 0;i < res.data.length;i++){
					concatLists = concatLists.concat(res.data[i].week)
					this.columnss[1].values = concatLists;
				}
			},
			async getPeople(){
				//审核人
				let concatList2 = []
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
			}
		},
		created(){
			this.week = JSON.parse(this.$route.query.item).week;
			this.time = JSON.parse(this.$route.query.item).startTime + '-' + JSON.parse(this.$route.query.item).endTime;
			this.className = JSON.parse(this.$route.query.item).courseName;
			this.address = JSON.parse(this.$route.query.item).classRoom;
			this.coursePlanId = JSON.parse(this.$route.query.item).coursePlanId;
			this.weekNote = JSON.parse(this.$route.query.item).weekNote;
			this.oldWeek = JSON.parse(this.$route.query.item).oldWeek;
			this.semesterId = JSON.parse(this.$route.query.item).semesterId;
			this.weekDetail = JSON.parse(this.$route.query.item).weekDetail;
			this.noticeId = JSON.parse(this.$route.query.item).noticeId;
			this.timeFlag = JSON.parse(this.$route.query.item).timeFlag;
			this.classNames = JSON.parse(this.$route.query.item).className;
			this.classRoom = JSON.parse(this.$route.query.item).classRoom;
			this.dm = this.$route.query.dm
			this.type = this.$route.query.type;

			this.Part();
			this.dm = this.$route.query.dm

			this.getWeek()
			this.getPeople()
		},
	};
</script>

<style lang="less" scoped>

/* 审核人 */
.part .date-pick-item.van-popup.van-popup--bottom .van-picker.van-datetime-picker .van-picker-column::before{position: absolute;content: "";width: 50px;height: 35px;top: 50%;left: 50%;z-index: 9;transform: translate(-50%,-50%);border-top:1px solid #DFE0E6;border-bottom: 1px solid #DFE0E6;}
.part .van-popup.van-popup--bottom .van-picker .van-picker-column{position: relative;}
.part .van-popup.van-popup--bottom .van-picker .van-picker-column::before{position: absolute;content: "";width: 100px;height: 35px;top: 50%;left: 50%;z-index: 9;transform: translate(-50%,-50%);border-top:1px solid #DFE0E6;border-bottom: 1px solid #DFE0E6;}
  .part .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: #212F6E;font-weight: 600;}

	.part .close-icon{background: url(../../../../static/img/close.png)no-repeat center;}
	.part .confirm-icon{background: url(../../../../static/img/confirm.png)no-repeat center;}
		.part .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.part .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
  .part .pop-title i{width: 22px;height: 22px;background-size: 22px 22px;padding: 10px;}
	.part .pop-title{display: flex;align-items: center;justify-content: space-between;}
	.part .person{padding: 15px;}
	.part .person button{border-radius:3px;padding: 8px 15px;margin-right: 12px;margin-bottom: 10px;}
  .part .apply-pop .person .per-btn{background-color: #ECEDFD;color: #7469F8;}
  .part .person .cur{background-color: #7469F8;color: #ECEDFD;}
	
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
	.choic .flex_item{
		display: flex;
		align-items: center;
	}
	.choic .flex_item .my_img{
		width: 22px;
		height: 22px;
		margin-right: 5px;
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
		font-weight: 700;
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
		color: #212F6E;
	}
	.choic input::placeholder,.choic textarea::placeholder{
		text-align: right;
		color: #DFE0E6;
		font-weight: 400;
		font-size: 16px;
	}
	.subm{
		width: 90%;
		margin-left: 5%;
		/* margin-top: 25px; */
		position: fixed;
		bottom: 0;
		background-color: #fff;
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
		margin: 20px 0;
	}
	.el-message{
		margin-top: -20px;
	}
	.choic .my_spans{
		height: 41px;
		line-height: 40px;
		margin-top: 12px;
		border-bottom:1px solid #F4F4F4;
		display: flex;
		justify-content: space-between;
	}
	.choic .my_spans input::placeholder{
		font-weight: 400;
	}
	.my_spans>div:last-child{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex: 1;
	}
	.choic .my_spans input{
		color: #212F6E;
		font-weight: 600;
		padding-right: 5px;
		text-align: right;
		width: 90%;
	}
	.choic .my_spans .fr_span{
		width: 15px;
		height: 20px;
		background: url(../../../assets/images/left_icon.png) center center no-repeat;
		background-size: 100%;
	}
	.choic .my_spans .fr_span_act{
		width: 8px;
		height: 20px;
		background: url(../../../../static/img/arrow.png) center center no-repeat;
		background-size: 100%;
	}
	.choic .flex_item i .my_img{
		width: 22px;
		height: 22px;
		vertical-align: middle
	}
	.choic .flex_item p{
		color: #212F6E;
		white-space: nowrap;
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
// src/components/teacher/Change/part.vue