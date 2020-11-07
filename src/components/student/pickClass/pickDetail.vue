<template>
  <div>
    <Header :title=title></Header>
    <div class="delay-search">
      <i class="search-icon" @click="searchTap()"></i>
      <input type="text" placeholder="搜索课程（名称或课号）" v-model="author">
    </div>
    <NOdata title="暂无选课数据~" v-if="detailLists.length == 0"></NOdata>
    <div class="pick-record" v-else>
      <div class="pick-item" v-for="(item,index) in detailList" :key="index">
        <div class="pick-text">
          <p>{{item.courseName}}</p>
          <ul>
            <li>学分：{{item.credit}}分</li>
            <li>学时：{{item.period}}学时</li>
            <li>上课老师：{{item.classTeacher}}</li>
            <li v-html="'上课时间：' + item.classTime"></li>
            <li v-html="'上课地点：' + item.classPlace"></li>
            <li v-if="item.kctxmc" v-html="'课程体系：' + item.kctxmc"></li>
            <li v-html="'分组：' + item.groupName"></li>
          </ul>
        </div>
        <div><button class="pick-btn" @click="selectCourse(item.courseId,item.noticeId)">选课</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  // import NOdata from '../NOdata.vue'
  import {Toast} from 'vant'
  import { Api } from '../../../utils/axios'
  export default{
    data(){
      return{
        detailLists:[],
        author:'',
        title:'',
        value1: 0,
        value2: 'a',
        value3: 'A',
        option1: [
          { text: '课程体系', value: 0 },
        ],
        option2: [
          { text: '课程性质', value: 'a' },
          { text: '活动名称1', value: 'b' },
          { text: '活动名称2', value: 'c' },
        ],
        option3: [
          { text: '课程属性', value: 'A' },
          { text: '2018-2019-2', value: 'B' },
          { text: '2019-2020-1', value: 'C' }
        ]
      }
    },
    computed:{
      detailList:function(){
        let author = this.author;
        if(author){
          // console.log(this.detailLists);
          return this.detailLists.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(author) > -1
            })
          })
        }
        return this.detailLists
      }
    },
    created(){
      switch (this.$route.query.data) {
        case '01':
          this.title = '必修选课';
          break;
        case  '02':
          this.title = "选修选课";
          break;
        case  '03':
          this.title = "本学期计划选课";
          break;
        case  '04':
          this.title = "专业内跨年级选课";
          break;
        case  '05':
          this.title = "跨专业选课";
          break;
        case  '06':
          this.title = "公选课选课";
          break;
        case  '07':
          this.title = "辅修选课";
      }
      this.getList()
    },
    methods:{
      searchTap(){
        let whiteList = ['03','04','05']
        if(whiteList.includes(this.$route.query.data)){
          this.getList()
        }
      },
      async getList(){
        const params = {
          classificationCode:this.$route.query.data,
          rotationId:this.$route.query.data1,
          courseId:'',
          noticeId:'',
          splitIdentification:'',
          courseInformation:'',
          classTeacher:'',
          classWeek:'',
          classSessions:'',
          filteringConflicts:'',
          restrictedSelection:'',
          sessionTime	:this.$route.query.session,
          fullCourse:'',
          compulsorySemester:this.$route.query.data3,
          compulsorySelection:this.$route.query.data4,
          compulsoryGrades:this.$route.query.data2,
          selectionGrades:this.$route.query.data5,
          departmentCurriculum:this.$route.query.data6,
          generalCourseCategories:'',
          courseQualification:this.$route.query.data7,
          courseInformation:this.author
        }
        const res = await Api.selectWxgetKcList(params)
        if(res.errorCode == 'fail'){
          Toast(res.errorMessage)
        }
        this.detailLists = res.data
      },
      async selectCourse(id,id1){
        const params = {
          classificationCode:this.$route.query.data,
          rotationId:this.$route.query.data1,
          courseId:id,
          noticeId:id1,
          splitIdentification:'',
          courseInformation:'',
          classTeacher:'',
          classWeek:'',
          classSessions:'',
          filteringConflicts:'',
          restrictedSelection:'',
          sessionTime:this.$route.query.session,
          fullCourse:'',
          compulsorySemester:this.$route.query.data3,
          compulsorySelection:this.$route.query.data4,
          compulsoryGrades:this.$route.query.data2,
          selectionGrades:this.$route.query.data5,
          departmentCurriculum:this.$route.query.data6,
          generalCourseCategories:'',
          courseQualification:this.$route.query.data7,
        }
        const res = await Api.selectWxxkOper(params)
        Toast(res.errorMessage)
      }
    },
  }
</script>

<style lang="less" scoped>
  .delay-search{background-color: @attendance-background-color-6 ;border-radius:3px;margin: 20px 20px 0;padding: 11px 12px;display: flex;}
  .search-icon{background: url(../../../../static/img/search.png)no-repeat center;width: 22px;height: 22px;background-size: 18px 18px;}
  .delay-search input{background-color: @attendance-background-color-6 ;padding-left: 22px;flex: 1;color: @attendance-color-2;}
  .search-info{display: flex;justify-content: center;border-bottom: 1px solid @attendance-border-color-6;}
  .delay-btn{position: absolute;bottom: 20px;width: 100%;text-align: center;}
  .delay-btn button{background-color: @attendance-background-color-7;color: @attendance-background-color-1;padding: 11px 0;width: 90%;border-radius: 3px;}
  .pick-record{padding: 20px 20px;}
  .pick-record .pick-item{background-color: @attendance-background-color-10;border-radius: 5px;padding: 20px;display: flex;justify-content: space-between;margin-bottom: 20px;}
  .pick-record .pick-btn{background-color: @attendance-background-color-1;border-radius: 3px;color: @attendance-color-3;padding: 11px 0px;box-sizing: border-box;width: 70px;}
  .pick-record .pick-text p{color: @attendance-color-1 ;font-weight: 700;margin:0 10px 4px 0;line-height: 22px}
  .pick-record .pick-text ul li{font-size: 12px;color: @attendance-color-2;margin-bottom: 2px;line-height: 17px;}
  .search-info .van-dropdown-menu{width: 90%}
  .search-info .van-popup{max-height: 50%;}
</style>



// WEBPACK FOOTER //
// src/components/student/pickClass/pickDetail.vue