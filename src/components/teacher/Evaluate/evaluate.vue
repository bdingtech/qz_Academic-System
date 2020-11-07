<template>
	<div class="eva-item-other">
		<Header title="教学评价" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
		<div class="teacher">
			<div class="icon_box">
				<div class="top_box">
					<span>{{teacher.name}}</span>
					<span>教工号：{{teacher.jobNumber}}</span>
					<div class="eva-other">
						<input type="text" placeholder="学年学期" v-model="value" @click="showPicker = true" readonly class="sem-input">
						<i class="arrow_r"></i>
					</div>
				</div>
				<div class="bottom_box">
					<ul>  
						<li>
							<span>{{List.average == '' ? '0' : List.average}}</span>
							<span>平均分</span>
						</li>
						<li>
							<span>{{List.sample == '' ? '0' : List.sample}}</span>
							<span>样本数</span>
						</li>
						<li>
							<span>{{List.participationRate == '' ? '0' : List.participationRate + '%'}}</span>
							<span>参评率</span>
						</li>
					</ul>
				</div>
			</div>
			<p>教师评教</p>
			<div class="evaluate_content">
				<div v-for="(item,index) in evaluateList" :key="index" @click="teachEva(item.dataitem[0].batchId,item.pj05id)">
				<div>
					<h4 style="color: #212F6E;padding: 5px 0;font-size: 16px;">{{item.dataitem[0].evaluationBatch}}</h4>
					<p>分类：{{item.evaluationType}}</p>
					<p>学期：{{item.dataitem[0].evaluationBatch}}</p>
				</div>
				<span class="icon_right"></span>
				</div>
			</div>
		</div>
		<!-- <div class="record_box">
			<button @click="fn1()">查看我的评价记录</button>
		</div> -->
		<van-popup v-model="showPicker" position="bottom">
			<van-picker show-toolbar :columns="options" @cancel="showPicker = false" @confirm="fns" :item-height="35"/>
		</van-popup>
	</div>
</template>

<script>
import { Api } from '../../../utils/axios'
// import Header from '../header.vue'
	export default {
    data(){
      return{
				casLogin:sessionStorage.getItem('casLogin'),
				evaluateList:[],
				options: [],
				value: '',
				teacher:[],
				semester:'',
				List:[],
				showPicker:false
      }
    },
    created(){
			this.getList()
	  this.itemSelect();
	  this.getMy()
	},
    methods:{
			async getList(){
				const res = await Api.getCurrentTerm()
				this.value = res.data[0].semesterId;
				this.getEva(res.data[0].semesterId)
			},
			async getMy(){
				const res = await Api.getTeaInfo()
				this.teacher= res.data[0];
			},
			async fns(value){
				this.value = value;
				this.showPicker = false;
				const params = {
					semester:this.value
				}
				const res = await Api.teachTeachingEvaluation(params)
				this.evaluateList = res.data.data[0].evaluationitem;
				this.List = res.data.data[0];
			},
			async getEva(e){
				const params = {
					semester:e
				}
				const res = await Api.teachTeachingEvaluation(params)
				this.evaluateList = res.data[0].evaluationitem;
				this.List = res.data[0];
			},
      teachEva(id1,id2){
        this.$router.push({
          path:'/evaluate2',
          query:{
            'pj05id':id2,
            'batchId':id1  
          }
        })
	  },
	  async itemSelect(){
			const res = await Api.getSemesterList()
			if(res.data.length == 0){
				Toast("暂无数据~")
			}else{
				res.data.forEach(item => {
					this.options.push(item.semesterId)
				});
			}
      },
	  fn1(){
		this.$router.push({
			path:'/evaluate_record'
		})
	}
	},
	
  }
</script>

<style>
  .eva-item-other .van-picker__columns::before{width: 140px;height: 1px;background-color: #DFE0E6;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .eva-item-other .van-picker__columns::after{width: 140px;height: 1px;background-color: #DFE0E6;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .eva-item-other .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{color: #212F6E;font-weight: 600;}

	.title {
		line-height: 34px;
		width: 90%;
		margin: 10px auto;
	}

	.title a {
		text-decoration: none;
		color: #000;
		font-size: 18px;
		font-weight: 600;
	}

	.title a i {
		text-decoration: none;
		color: #000;
		vertical-align: middle;
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/back_left.png)center center no-repeat;
		background-size: 100%;
		margin-right: 5px;
	}

	.teacher .icon_box {
		width: 100%;
		height: 147px;
		border-radius: 5px;
		background: url(../../../assets/images/blue_icon.png) center center no-repeat;
		background-size: 100%;
		margin-top: 20px;
		position: relative;
	}

	.top_box span:nth-child(1) {
		display: block;
		color: #FFFFFF;
		font-size: 16px;
		margin-left: 20px;
		padding-top: 20px;
		max-width: calc(100% - 140px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_box span:nth-child(2),
	.top_box div {
		color: #FFFFFF;
		font-size: 12px;
		margin: 4px 0px 0px 20px;
		font-weight: 200;
	}

	.top_box div {
		margin-left: 36px;
		position: absolute;
		top: 10%;
		right: 5%;
	}

	.top_box span:nth-child(3) #list {
		border: none;
		outline: none;
		color: #FFFFFF;
		background: #B5AFFB;
		width: 135px;
		height: 25px;
		border-radius: 12px;
	}
	.type_box span{
		color: #757DA3;
		font-size: 12px;
	}
	.bottom_box ul {
		width: 100%;
		margin: 20px 0 0 0;
		padding: 0;
		display: flex;

	}

	.bottom_box ul li {
		width: 80px;
		height: 44px;
		justify-content: space-between;
		list-style: none;
		text-align: center;
		margin-left: 5px;
	}

	.bottom_box ul li span {
		display: block;
	}

	.bottom_box ul li span:nth-child(1) {
		color: #FFFFFF;
		font-size: 18px;
		margin-top: 2px;
	}

	.bottom_box ul li span:nth-child(2) {
		color: #FFFFFF;
		font-size: 10px;
	}

	.bottom_box ul li:nth-child(1) {
		width: 70px;
		height: 44px;
		background: url(../../../assets/images/pink_icon.png) center center no-repeat;
		background-size: 100%;
		border-radius: 5px;
		margin-left: 20px;
	}

	.bottom_box ul li:nth-child(1) span {
		color: #7469F8;
	}

	.teacher {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.teacher>p {
		color: #212F6E;
		font-size: 18px;
		margin-top: 30px;
		font-weight: 600;
	}

	.conten {
		display: block;
		width: 100%;
		height: 82px;
		margin-top: 20px;
		background: #F8F8F8;
		border-radius: 5px;
	}

	.conten .left_box {
		width: 60%;
		height: 100%;
		margin-left: 20px;
		float: left;
	}

	.conten .left_box span {
		display: block;
	}

	.conten .left_box .span {
		color: #212F6E;
		padding-top: 15px;
		font-weight: 600;
	}

	.conten .left_box span:nth-child(2),
	.conten .left_box span:nth-child(3) {
		color: #757DA3;
		font-size: 12px;
		padding-top: 4px;
	}

	.conten .right_box {
		width: 25%;
		height: 100%;
		float: right;
	}

	.conten .right_box i {
		display: inline-block;
		margin-top: 35px;
		margin-left: 60px;
		width: 9px;
		height: 13px;
		background: url(../../../assets/images/back_right.png)center center no-repeat;
		background-size: 100%;
	}
	.evaluate_content{
    font-family:PingFangSC;
    padding: 15px 0;
	}
	.evaluate_content>div>div{width: 95%;}
	.evaluate_content>div>div>h4{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .evaluate_content>div{
		position: relative;
		border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F8F8F8;
    padding:10px 20px;
    box-sizing: border-box;
    color:#757DA3 ;
    margin-bottom: 15px;
  }
	.evaluate_content>div::after{position: absolute;width: 3px;height: 100%;content: '';background-color: #7469F8;left: 0;border-radius: 5px 0 0 5px;}
  .evaluate_content>div p{
    color: #757DA3;
    font-size: 12px;
    line-height: 20px;
  }
  .evaluate_content div .icon_right{
    height: 15px;
    width: 15px;
    background: url(../../../../static/img/arrow.png) center center no-repeat;
    /* -webkit-background-size: ; */
    background-size: contain;
  }
  .recor_box{
	  width: 100%;
  }
  .record_box button{
	  width: 90%;
	  height: 44px;
	  margin-left: 5%;
	  background: #ECEDFD;
	  color: #7469F8;
	  border-radius: 3px;
	  position: fixed;
	  top: 90%;
  }
  .top_box .sem-input{width: 100%; background-color:rgba(143,135,249,.8);border: none;border-radius: 20px;height: 25px;line-height: 25px;color: #fff;padding: 0 10px;}
	.top_box .arrow_r{background: url(../../../../static/img/week.png)no-repeat center;width: 7px;height: 4px;background-size: 7px 4px;position: absolute;right:70px;position: absolute;right: 10px;}
	.eva-other{display: flex;align-items: center;position: relative;max-width: 110px;}
	.top_box .el-input__icon{line-height: 30px;}
  .top_box .el-select{width: 140px;}
  .top_box .el-select .el-input .el-select__caret{color: #fff;position: absolute;
    top: -3px;
    right: 1px;}
  .top_box .el-table .descending .sort-caret.descending{border-top-color:#757DA3}
  .top_box .el-table .ascending .sort-caret.ascending{border-bottom-color:#757DA3;}
  .top_box .el-table .sort-caret.ascending{border-bottom-color:#DFE0E6;}
  .top_box .el-table .sort-caret.descending{border-top-color:#DFE0E6}
  .top_box .van-popup--center{width: 90%;border-radius: 5px;}
	.top_box .el-input.el-input--suffix input::placeholder{color: #fff;}
	  .eva-item-other .van-picker__cancel{
		background: url(../../../assets/images/err.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}
	.eva-item-other .van-picker__confirm{
		background: url(../../../assets/images/success.png) no-repeat center center;
		background-size: 20px 20px;
		color: rgba(0,0,0,0)
	}

</style>



// WEBPACK FOOTER //
// src/components/teacher/Evaluate/evaluate.vue