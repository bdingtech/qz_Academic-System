<template>
  <div class="textbook">
      <Header title="教材查询" :casLogin="casLogin"></Header>
      <div class="textbook_content">
        <div class="textbook_search">
          <i class="icon_search" @click="searchBook()"></i>
          <input type="text"  style="width: calc(100% - 31px)" placeholder="搜索教材名称/作者" v-model="author">
        </div>
        <div class="textbook_select">
          <div class="sem-drop">
            <div @click="semPicker = true"><p>{{this.semester}}</p><i></i></div>
            <div @click="actTap()"><p>{{this.activity}}</p><i></i></div>
          </div>
          <van-popup v-model="semPicker" position="bottom">
            <van-picker show-toolbar :columns="semesterList" @cancel="semPicker = false" @confirm="semConfirm" :item-height="itemHeight"/>
          </van-popup>
          <van-popup v-model="actPicker" position="bottom">
            <van-picker show-toolbar :columns="courseList" @cancel="actPicker = false" @confirm="actConfirm" :item-height="itemHeight"/>
          </van-popup>
        </div>
        <NOdata title="未查询到教材数据~" v-if="this.textbookList.length == 0"></NOdata>
        <template v-else>
          <RouterLink v-for="(item,index) in textbooks" :key="index" :to="{path:'/teacher/textbook_Details',query:{info:JSON.stringify(item)}}">
            <div class="textbook_list" v-if="item.teachingMaterialName != ''">
              <h4>{{item.teachingMaterialName}}</h4>
              <p style="margin-bottom:2px;">作者:{{item.author}}</p>
              <p>出版社:{{item.publishingHouse}}</p>
            </div>
          </RouterLink>
        </template>
      </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data(){
      return{
        casLogin:sessionStorage.getItem('casLogin'),
        semPicker:false,
        actPicker:false,
        itemHeight:35,
        semesterList: [{
          text:'学年学期',
          value:0
        }],
        courseList:[{
          text:'课程名称',
          value:0
        }],
        semester:'学年学期',
        activity:'课程名称',
        author:'',
        value: 0,
        value1: 0,
        textbookList:[]
      }
    },
    methods:{
      actTap(){
        if(this.semester == '' || this.semester == '学年学期'){
          Toast.fail('请先选择学年学期')
        }else{
          this.actPicker = true
        }
      },
      semConfirm(e,val){
        this.semPicker = false
        this.semester = e.text
        this.searchBook()
        this.findCourse(this.semester)
      },
      actConfirm(e,val){
        this.actPicker = false;
        this.activity = e.text
        this.searchBook()
      },
      async searchBook(){
        const params = {
          semester:this.semester == '学年学期' ? '' : this.semester,
          nameOrAuthor:this.author,
          courseName:this.activity == '课程名称' ? '' : this.activity
        }
        const res = await Api.getTeachingMaterialTea(params)
        this.textbookList = res.data
      },
      async findCourse(val){
        this.value1 = 0
        this.courseList=[{
          text:'课程名称',
          value:0
        }]
        const params = {
          semester:val,
        }
        const res = await Api.getTeachingCourseTea(params)
        let concatList = []
        res.data.forEach((item,index) => {
          concatList[index] = {
            text:item.courseName,
            value:index + 1
          }
        });
        this.courseList = this.courseList.concat(concatList)
      },
      async semList(){
        let concatList = []
        const res = await Api.getSemesterList()
        res.data.forEach((item,index) => {
          concatList[index] = {
            text:item.semesterName,
            value:index + 1
          }
        });
        this.semesterList = this.semesterList.concat(concatList)
      },
      async getCourse(e){
        const params = {
          semester:e
        }
        const res = await Api.getTeachingCourseTea(params)
        let concatList = []
        res.data.forEach((item,index) => {
          concatList[index] = {
            text:item.courseName,
            value:index + 1
          }
        });
        this.courseList = this.courseList.concat(concatList)
      },
      async getMaterial(e){
        const params = {
          semester:e,
          nameOrAuthor:'',
          courseName:''
        }
        const res = await Api.getTeachingMaterialTea(params)
        this.textbookList = res.data
      },
      async getList(){
        const res = await Api.getCurrentTerm()
        this.semester = res.data[0].semesterId
        this.getMaterial(res.data[0].semesterId)
        this.getCourse(res.data[0].semesterId)
      }
    },
    created() {
      console.log(!sessionStorage.getItem('casLogin'));
      
      this.getList()
      this.semList()
    },
    computed:{
      textbooks:function(){
        var author = this.author;
        if(author){
          return this.textbookList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(author) > -1
            })
          })
        }
        return this.textbookList
      }
    }
  }
</script>

<style lang="less">
  .textbook .van-dropdown-menu{width: 65%;}
  .textbook .textbook_content{padding: 10px 20px;}
  .textbook .textbook_search{width: 100%;height: 44px;background: @attendance-background-color-6;display: flex;align-items: center;border-radius:3px;box-sizing: border-box;padding: 0 15px;}
  .textbook .textbook_search .icon_search{width: 20px;height: 20px;background: url(../../../../static/img/search.png) no-repeat;background-size: 100%;margin-right: 11px;}
  .textbook .textbook_search input{background: none;}
  .textbook .textbook_select{display: flex;justify-content: center;align-items: center;border-bottom: 1px solid @attendance-border-color-6;padding: 20px 0 7px;}
  .textbook .textbook_select select{border: 0;background: 0;outline: 0;}
  .textbook .textbook_list{padding: 0 20px;background:rgba(248,248,248,1);border-radius:5px;margin-top: 20px;min-height: 82px;display: flex;flex-direction: column;justify-content: center;}
  .textbook .textbook_list h4{font-size: 16px;line-height: 22px;color: @attendance-color-1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 4px;}
  .textbook .textbook_list p{color: @attendance-color-2;font-size: 12px;line-height: 17px;}
  .textbook .el-select{width: 40%;}
  .textbook .el-input__inner{border: 0;}
  .textbook .el-input--suffix .el-input__inner{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

  .textbook_select .sem-drop{width: 80%;}
  .textbook_select .van-picker-column__item{margin: 0 30%;}
  .textbook_select .sem-drop>div{width: 45%;}
  .textbook_select .van-popup.van-popup--bottom{border-radius: 5px 5px 0 0;}
  .textbook_select .sem-drop p{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;}
  .textbook_select .sem-drop,.textbook_select .sem-drop div{display: flex;align-items: center;color: @attendance-color-2;font-size: 14px;justify-content: center;}
  .textbook_select .sem-drop>div i{background: url(../../../../static/img/Triangle.png)no-repeat center;width: 10px;height: 10px;background-size: 10px 8px;margin-left: 5px;}
  .textbook_select .van-ellipsis.van-picker-column__item.van-picker-column__item--selected{font-weight: 600;color: @attendance-color-1;}

  .textbook_select .van-picker__columns::before{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;top: 70px;left: 50%;transform: translateX(-50%)}
  .textbook_select .van-picker__columns::after{width: 140px;height: 1px;background-color: @attendance-background-color-2;content: '';position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%)}

</style>






// WEBPACK FOOTER //
// src/components/teacher/Textbook/textbook.vue