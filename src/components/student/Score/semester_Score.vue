<template>
  <div class="semester_Score">
    <Header title="学期考试成绩"></Header>
    <div class="content_">
      <div class="semester_Score_top">
        <h3>{{this.perInfo.name}}</h3>
        <p>学号：{{this.perInfo.studentID}}</p>
        <div @click="closeAction()" class="input-tap">
          <input type="text" readonly v-model="curSemester" placeholder="学年学期">
          <i></i>
        </div>
      </div>
      <div class="best-select">
        <h3>成绩单</h3>
        <div>
          <input type="text" v-model="bestOrAll" readonly @click="bestPop = true">
          <i></i>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="semesterScore" stripe @cell-click="handle">
      	<el-table-column prop="courseName" label="课程" width="190" sortable :sort-method="nameSort"></el-table-column>
      	<el-table-column label="学分" sortable prop="credit">
          <template slot-scope="scope">
            <span style="margin-right: 23px">{{ scope.row.credit }}</span>
          </template>
        </el-table-column>
      	<el-table-column label="成绩" sortable prop="fraction">
          <template slot-scope="scope">
            <span style="margin-right: 23px" :class="calcBest(scope.row.fraction)">{{ scope.row.fraction }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <van-popup v-model="popShow" class="popup">
      <h2>{{this.popList.courseName}}</h2>
      <div>{{this.popList.fraction}}</div>
      <p>课程属性：<span>{{this.popList.curriculumAttributes}}</span></p>
      <p>课程性质：<span>{{this.popList.courseNature}}</span></p>
      <p>考试性质：<span>{{this.popList.examinationNature}}</span></p>
      <p>学分：<span>{{this.popList.credit}}</span></p>
      <button @click="closePop()">确定</button>
    </van-popup>
    <van-popup v-model="bestPop" position="bottom">
      <van-picker
        show-toolbar
        :columns="actions1"
        @cancel="bestPop = false"
        @confirm="onSelectBests"
        :item-height="35"
        :default-index="defaultIndex1"/>
    </van-popup>
    <van-popup v-model="semesterShow" position="bottom">
      <van-picker
        show-toolbar
        :columns="actions"
        @cancel="semesterShow = false"
        @confirm="onSelect"
        :item-height="35"
        :default-index="defaultIndex"/>
    </van-popup>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import {Toast} from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        bestPop:false,
        defaultIndex:0,
        bestOrAll:'最好',
        curSemester:'',
        semesterShow:false,
        semesterScore:[],
        actions1:['最好','全部'],
        defaultIndex1:0,
        perInfo:'',
        popShow:false,
        itemHeight:33,
        popList:[{
          courseName:'',
          fraction:'',
          curriculumAttributes:'',
          courseNature:'',
          examinationNature:'',
          credit:''
        }],
        actions: [{
          values:[]
        }],
        type:'1'
      }
    },
	  created(){
      this.getTerm()
      this.semList()
    },
    methods:{
      nameSort(obj1,obj2){
        let val1 = obj1.courseName.substring(0,1);
        let val2 = obj2.courseName.substring(0,1);
        return val1.localeCompare(val2)
      },
      calcBest(e){
        if(this.type == 1){
          if(e == '不及格'){
            return 'warning-score'
          }
          if(e <= 60){
            return 'warning-score'
          }
        }
      },
      onSelectBests(val){
        this.bestOrAll = val
        this.bestPop = false
        if(val == '最好'){
          this.type = '1'
        }else{
          this.type = ''
        }
        this.getScore(this.curSemester,this.type)
      },
      async getTerm(){
        const res = await Api.getCurrentTerm()
        this.curSemester = res.data[0].semesterId
        this.getScore(res.data[0].semesterId,'1')
      },
      async getScore(e,type){
        const params = {
          semester:e == '全部' ? '' : e,
          type:type
        }
        const res = await Api.getTermGPA(params)
        if(res.data.length == 0){
          Toast("暂无数据~")
        }else{
          this.perInfo = res.data[0]
          this.semesterScore = res.data[0].achievement
        }
      },
      async semList(){
        let concatList = []
        const res = await Api.getSemesterList()
        this.semesterList= res.data;
        res.data.forEach((item,index) => {
          concatList[index + 1] = item.semesterId
          if(item.semesterId == this.curSemester){
            this.defaultIndex = index + 1
          }
        });
        concatList[0] = '全部'
        this.actions = concatList
      },
      closeAction(){
        this.semesterShow = true;
      },
      handle(index){
        this.popShow = true;
        this.popList = index;
      },
      onSelect(item) {
        this.semesterShow = false;
        this.curSemester = item;
        this.getScore(item,this.type)
      },
      closePop(){
        this.popShow = false;
      },
    }

  }
</script>

<style lang="less" scoped>
.warning-score{color: @attendance-background-color-13;}
.best-select{margin: 24px 0 5px;display: flex;justify-content: space-between;}
.best-select>h3{color: @attendance-color-1;font-size: 16px;}
.best-select>div{width: 40px;background-color:@attendance-background-color-7;border-radius: 12px;padding: 5px 15px;color: @attendance-background-color-8;font-size: 12px;display: flex;align-items: center;}
.best-select>div input{width: 100%;}
.best-select>div i{background: url(../../../../static/img/best.png)no-repeat center;background-size: 7px 5px;width: 7px;height: 7px;}
  .semester_Score_top{width: 100%;height: 108px;background: url(../../../../static/img/xq_bg.png)no-repeat center;background-size: 100% 100%;border-radius: 5px;box-sizing: border-box;padding:20px;}
  .semester_Score_top>h3{color: @attendance-color-3 ;font-size: 16px;height: 22px;line-height: 22px;}
  .semester_Score_top>p{color: @attendance-color-3 ;font-size: 12px; height: 18px;margin-top: 4px;}
  .semester_Score_top>div{text-align: right;margin-top: 4px;}
  .semester_Score .el-table td{padding: 6px 0;color: @attendance-color-1;font-size: 14px;}
  .semester_Score .van-action-sheet{max-height: 33%;}
  .van-popup.van-popup--center{box-sizing: border-box;padding: 20px;}
  .semester_Score .van-popup.van-popup--center>h2{color: @attendance-color-1;font-size: 16px;line-height: 25px;text-align: center;font-weight: bold;}
  .van-popup.van-popup--center>div{color: @attendance-background-color-1;font-size: 24px;font-weight: bold;text-align: center;padding-top: 10px;padding-bottom: 10px;}
  .van-popup.van-popup--center>p{color: @attendance-color-2;font-size: 16px;line-height: 30px;}
  .van-popup.van-popup--center>p>span{font-weight: bold;}
  .semester_Score .el-table .descending .sort-caret.descending{border-top-color:@attendance-color-2}
  .semester_Score .el-table .ascending .sort-caret.ascending{border-bottom-color:@attendance-color-2;}
  .semester_Score .el-table .sort-caret.ascending{border-bottom-color:@attendance-background-color-2 ;}
  .semester_Score .el-table .sort-caret.descending{border-top-color:@attendance-background-color-2 }
  .semester_Score .van-popup--center{width: 90%;border-radius: 5px;}
  .popup button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;border-radius: 3px;width: 100%;margin-top: 30px;}
  .input-tap input{width: 80px;background-color:rgba(143,135,249,.8);border-radius: 12px;padding: 5px 30px 5px 15px;color: @attendance-color-3 ;font-size: 12px;}
  .input-tap input::placeholder{color: @attendance-color-3 ;}
  .input-tap{position: relative;}
  .semester_Score .el-table__header .cell{color: @attendance-color-2;font-weight: 400;}
  .semester_Score .el-table th{padding: 0;}
  .semester_Score .el-table__row td:nth-child(2),.semester_Score .el-table__row td:nth-child(3){text-align: right;padding-right:25px;}
  .semester_Score .el-table__header-wrapper th:nth-child(2),.semester_Score .el-table__header-wrapper th:nth-child(3){text-align: right;}
  .semester_Score .el-table__body-wrapper tr td:first-child{font-weight: 600;padding-left: 10px;}
  .semester_Score .el-table__header-wrapper tr th:first-child{padding-left: 10px;}
  .semester_Score .el-table td,.semester_Score .el-table th.is-leaf{border-bottom: none;}
  .semester_Score .el-table__row.el-table__row--striped{background-color: @attendance-background-color-3;}
  .semester_Score .el-table .cell{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .semester_Score .el-table::before{height: 0;}
  .semester_Score .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}
  /* border-top:1px solid @attendance-background-color-2 ;border-bottom: 1px solid @attendance-background-color-2 ; */
  .semester_Score .van-picker__columns::before{width: 140px;height: 1px;background-color: @attendance-background-color-2 ;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .semester_Score .van-picker__columns::after{width: 140px;height: 1px;background-color: @attendance-background-color-2 ;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}
  .semester_Score .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{font-weight: 600;color: @attendance-color-1;}
  .input-tap>i{background: url(../../../../static/img/week.png)no-repeat center;background-size: 7px 5px;width: 7px;height: 7px;position: absolute;right: 10px;top: 50%;margin-top: -3px;}
</style>



// WEBPACK FOOTER //
// src/components/student/Score/semester_Score.vue