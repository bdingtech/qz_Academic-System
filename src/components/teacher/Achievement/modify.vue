<template>
	<div class="modify-stu">
		<Header title="成绩修改"></Header>
		<div class="stu">
			<div class="icon_box">
				<div class="top_boxs">
					<span>{{studentName}}</span>
					<span>学号：{{studentNumber}}</span>
					<span>考试性质：{{examProperty}}</span>
				</div>
				<div class="bottom_box">
					<ul>
						<li>
							<span>{{list2.score}}</span>
							<span>总成绩</span>
						</li>
						<li v-for="(item,index) in scoreList" :key="index">
							<span>{{item.projectScore}}</span>
							<span>{{item.projectName}}{{item.proportion}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="in_box">
				<template v-if="this.list2.scorType == 'D'">
					<template v-for="(item,index) in scoreList">
						<p :key="index">修改后{{item.projectName}}
							<input type="number" placeholder="请点击填写" min="0" v-model="calcIndexList[index]" @keyup="numLimit(index)">
						</p>
					</template>
				</template>
				<template v-else>
					<div class="text-alter-score">
						<span>修改后成绩</span>
						<p style="display:flex;align-items:center;"><input type="text" placeholder="请点击选择" v-model="valueGrade" readonly @click="scoreShow = true" required><i></i></p>
					</div>
				</template>
				<p>修改原因<input type="text" placeholder="请点击填写" v-model="valueRes"></p>
				<div class="text-alter-score">
					<span>审核人</span>
					<p style="display:flex;align-items:center;"><input type="text" placeholder="请点击选择" v-model="person" readonly @click="peoplePop = true" required><i></i></p>
				</div>
			</div>
		</div>
		<van-popup v-model="peoplePop" position="bottom">
			<div class="apply-pop">
        <div class="pop-title popNote">
          <i class="closeIcon" @click="peoplePop = false"></i>
          <p>审核人</p>
          <i class="conIcon" @click="resetCancel()"></i>
        </div>
        <div class="person">
          <button class="per-btn" ref="person" @click="personTap($event,index)" v-for="(item,index) in personList" :key="item.id">{{item.name}}</button>
        </div>
      </div>
		</van-popup>
		<div class="footer">
			<button @click="fn1()">送审</button>
		</div>
		<van-popup v-model="scoreShow" position="bottom">
      <van-picker show-toolbar :columns="actions" @cancel="scoreShow = false" @confirm="typeSelect" :item-height="35"></van-picker>
    </van-popup>
	</div>
</template>

<script>
// // import Header from '../header.vue'
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
export default {
    data () {
			return {
				peoplePop:false,
				scoreShow:false,
				valueGrade:'',
				actions: [{
					values:[],
				}],
				list2:[],
				scoreList:[],
				value1:'',
				value2:'',
				value3:'',
				value4:'',
				valueRes:'',
				scoreId:'',
				examProperty:'',
				studentName:'',
				studentNumber:"",
				personList:[{
					id:'',
					name:'全部',
					isBtn:0,
				}],
				person:'',
				personId:'',
				//分数
				numberList:[],
				proList:[],
				oldProList:[],
				curScore:0,
				calcIndexList:[],
        reset:"",
        resetId:''
			}
	},
	methods:{
		resetCancel(){
      this.peoplePop = false
      this.person = this.reset
      this.personId = this.resetId
    },
		numLimit(val){
			if(this.calcIndexList[val] < 0){
				this.calcIndexList[val] = Math.abs(this.calcIndexList[val]).toString()
			}else if(this.calcIndexList[val] > 100){
				this.calcIndexList[val] = 100;
				Toast.fail("成绩不能大于100");
			}
			return this.calcIndexList[val]
		},
		calcScore(){
			let concatlist1 = []
			let concatlist2 = []
			let concatlist3 = []
			for(let i = 0;i < this.scoreList.length;i++){
				concatlist1 = concatlist1.concat(this.scoreList[i].projectNumber);
				concatlist2 = concatlist2.concat(this.scoreList[i].projectScore);
				concatlist3 = concatlist3.concat(this.scoreList[i].proportion);//占比
			}
			this.numberList = concatlist1;
			this.oldProList = concatlist2;
		},
		typeSelect(val,index){
			this.scoreShow = false;
			this.valueGrade = val.toString()
		},
		personTap(e,res){
			let strList = []
			let idList = []
			if(this.personList[res].isBtn == 0){
				this.personList[res].isBtn = 1
				e.target.className = 'cur'
			}else if(this.personList[res].isBtn == 1){
				this.personList[res].isBtn = 0
				e.target.className = 'per-btn'
			}
			for(let i in this.personList){
				if(this.personList[res].name == '全部'){
					this.personList[i].isBtn = 0;
					this.personList[res].isBtn = 1
					this.$refs.person[res].className = 'cur'
					this.$refs.person[i].className = 'per-btn'
				}else{
					this.personList[0].isBtn = 0;
					this.$refs.person[0].className = 'per-btn'
				}
				if(this.personList[i].isBtn == 1){
					strList = strList.concat(this.personList[i].name)
					idList = idList.concat(this.personList[i].id)
				}
			}
			this.reset = strList.toString();
			this.resetId = idList.toString();
		},
		async place(){
			const params = {
				scoreId:this.scoreId
			}
			const res = await Api.teachGetCjxgxx(params)
			if(res.code == "0"){
				Toast(res.Msg);
				this.$router.replace('/achievement3');
			}
			this.list2 = res.data[0];
			if(res.data[0].scorType == 'D'){
				this.scoreList = res.data[0].scoreData
			}else{
				// this.scoreList = res.data.data[0].gradeList
			}
			switch (res.data[0].scorType) {
				case 'A':
					this.actions[0].values = ['通过','不通过']
					break;
				case 'B':
					this.actions[0].values = ['合格','不合格']
					break;
				case 'C':
					this.actions[0].values = ['优','良','中','及格','不及格']
					break;
				default:
					break;
			}
			for(let i = 0;i < this.scoreList.length;i++){
				this.calcIndexList.push('value' + (i + 1));
			}
			this.calcScore()
		},
		fn1(){
			let formData = {};
			this.proList = [];
			let total = [];
			for(let i = 0;i < this.scoreList.length;i++){
				this.proList = this.proList.concat(this.calcIndexList[i]);
				total = total.concat((Number(this.scoreList[i].proportion.slice(0,-1)/100) * Number(this.proList[i])).toFixed(1));
				this.curScore += Number(total[i]);
			}
			if(this.list2.scorType == 'D'){
				formData = {
					scoreId:this.scoreId,
					score:this.curScore.toString(),
					reason:this.valueRes,
					scoreOld:this.list2.score,
					achievementsProjectNumber:this.numberList,
					projectPerformance:this.proList,
					oldProjectPerformance:this.oldProList,
					userIds:this.personId
				}
			}else{
				formData = {
					scoreId:this.scoreId,
					score:this.valueGrade,
					reason:this.valueRes,
					scoreOld:this.list2.score,
					achievementsProjectNumber:[],
					projectPerformance:[],
					oldProjectPerformance:[],
					userIds:this.personId,
				}
			}
			if(this.person == '' || this.valueRes == ''){
				Toast.fail('请填写修改原因或审核人')
			}else if(this.list2.scorType != 'D' && this.valueGrade == ''){
				Toast.fail('请选择修改后的成绩')
			}else{
				this.getList(formData)
			}
		},
		async getList(e){
			const data = e
			const res = await Api.teachCjxgSave(data)
			if(res.code == '1'){
				Toast.success(res.Msg);
				setTimeout(() => {
					this.$router.replace('/achievement1')
				},1500)
			}else{
				Toast.fail(res.Msg);
			}
		},
		async getPeople(){
			const params = {
				ywcode:'011',
				ywid:''
			}
			const res = await Api.selectReviewerApi(params)
			let concatList = []
			res.data.forEach((item,index) => {
				concatList[index] = {
					name:item.userrealname,
					id:item.userid,
					isBtn:0,
				}
			});
			this.personList = this.personList.concat(concatList)
		}
	},
	mounted(){
		this.place();
	},
	created(){
			this.scoreId = this.$route.query.scoreId;
			this.examProperty = this.$route.query.examProperty;
			this.studentNumber = this.$route.query.studentNumber;
			this.studentName = this.$route.query.studentName
			// 审核人
			this.getPeople()
		},
}
</script>

<style lang="less" scoped>
  .modify-stu .van-picker__columns::before{width: 100px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .modify-stu .van-picker__columns::after{width: 100px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .modify-stu .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: @attendance-color-1;font-weight: 600;}

	.pop-title,.popNote>div{display: flex;justify-content: space-between;align-items: center;}
	.modify-stu .van-picker__cancel{color:rgba(0,0,0,0);background: url(../../../../static/img/close.png)no-repeat center;position: absolute;background-size: 25px 25px;width: 25px;height: 25px;left: 0;padding: 16px;}
	.modify-stu .van-picker__confirm{color:rgba(0,0,0,0);background: url(../../../../static/img/confirm.png)no-repeat center;position: absolute;background-size: 25px 25px;width: 25px;height: 25px;right: 0;padding: 16px;}
	.modify-stu .popNote .closeIcon{background: url(../../../../static/img/close.png)center center no-repeat;background-size: 25px 25px;}
	.modify-stu .popNote .conIcon{background: url(../../../../static/img/confirm.png)center center no-repeat;background-size: 25px 25px;}
	.modify-stu .person{padding:10px 20px;}
	.modify-stu .popNote i{width: 25px;height: 25px;padding: 16px;}
	.modify-stu .person button{border-radius:3px;padding: 5px 15px;margin-right: 12px;margin-bottom: 15px;background-color: @attendance-background-color-7;color: @attendance-background-color-1;}
	.modify-stu .person button.cur{background-color: @attendance-background-color-1;color: @attendance-background-color-7;}
	.stu{width: 90%;margin: 0 auto;}
	.stu .icon_box{
		width: 100%;
		height: 147px;
		border-radius: 5px;
		background: url(../../../assets/images/blue_icon.png) center center no-repeat;
		background-size: 100%;
		margin-top: 20px;
	}
	.stu .top_boxs span:nth-child(1){
		display: block;
		color: @attendance-color-3;
		font-size: 16px;
		margin-left:20px;
		padding-top: 20px;
	}
	.stu .top_boxs span:nth-child(2),.top_boxs span:nth-child(3){
		color: @attendance-color-3;
		font-size: 12px;
		margin: 4px 0px 0px 20px;
		font-weight: 200;
	}
	.stu .top_boxs span:nth-child(3){
		margin-left: 36px;
	}
	.bottom_box ul{
		width: 100%;
		margin: 20px 0 0 0;
		padding: 0;
		display: flex;
		
	}
	.bottom_box ul li{
		width: 23%;
		height: 44px;
		justify-content: space-between;
		list-style: none;
		text-align: center;
		margin-left: 5px;
	}
	.bottom_box ul li span{
		display: block;
	}
	.bottom_box ul li span:nth-child(1){
		color:@attendance-color-3;
		font-size: 18px;
		margin-top: 2px;
	}
	.bottom_box ul li span:nth-child(2){
		color:@attendance-color-3;
		font-size: 10px;
	}
	.bottom_box ul li:nth-child(1){
		width: 62px;
		height: 44px;
		background: url(../../../assets/images/pink_icon.png) center center no-repeat;
		background-size: 100%;
		border-radius:5px ;
		margin-left: 20px;
	}
	.bottom_box ul li:nth-child(1) span{
		color: @attendance-background-color-1;
	}
	.stu .in_box{
		margin-top: 10px;
	}
	.stu .in_box>p,.stu .in_box>div{
		color: @attendance-color-1;
		font-size: 16px;
		width: 100%;
		display: inline-block;
		border-bottom: 2px solid @attendance-border-color-6;
		padding: 20px 0 8px;
	}
	.stu .in_box>.text-alter-score{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.stu .in_box p input{
		float: right;
		border: none;
		outline: none;
		height: 24px;
		width: 100px;
		text-align: right;
	}
	.stu .in_box p>i{
		background: url(../../../assets/images/left_icon.png);
		background-size: 15px 15px;
		width: 15px;
		height: 15px;
	}
	.stu .in_box p input::-webkit-input-placeholder{
		
		text-align: center;
		color: @attendance-background-color-2;
		font-size: 16px;
	}
	.footer{
		width: 90%;
		height: 44px;
		position: absolute;
		bottom: 20px;
		left: 5%;
	}
	.footer button{
		width: 100%;
		height: 100%;
		background: @attendance-background-color-1;
		color: @attendance-color-3;
		border: none;
		border-radius: 5px;
		font-size: 16px;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Achievement/modify.vue