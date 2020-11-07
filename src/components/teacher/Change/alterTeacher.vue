<template>
  <div class="alter-teacher">
    <Header title="选择变更老师" :type="type"></Header>
    <div class="alter-find">
      <i @click="teaTap()"></i>
      <input type="text" placeholder="搜索老师姓名/工号" v-model="teaInfo">
    </div>
    <NOdata v-if="this.teacherList.length == 0" title="未查询到教师信息"></NOdata>
    <template v-else>
      <div class="alter-item" v-for="(item,index) in teachers" :key="index">
        <div>
          <h4>{{item.teacherName}}</h4>
          <p>工号：{{item.teacherNum}}</p>
        </div>
        <el-checkbox v-model="item.checked"></el-checkbox>
      </div>
    </template>
    <div class="alter-buttons">
      <button class="clear" @click="clear()">清除</button>
      <button class="confirm"  @click="select()">确定</button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { Api } from '../../../utils/axios'
export default {
  data(){
    return{
      teacherList:[],
      teaInfo:'',
      teaIdList:[],
      teaNameList:[],
      route:'teacher',
      type:'1'
    }
  },
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true
    next()
  },
  created(){
    //变更老师
    this.getTeaList()
  },
  methods:{
    async getTeaList(){
      const params = {
        facultyId:'',
        departmentId:'',
        teacherName:''
      }
      const res = await Api.teachGetKxls(params)
      this.teacherList = res.data
    },
    select(){
      this.teaIdList = []
      this.teaNameList = []
      for(let i = 0;i < this.teachers.length;i++){
        if(this.teachers[i].checked){
          this.teaIdList.push(this.teachers[i].teacherId);
          this.teaNameList.push(this.teachers[i].teacherName)
        }
      }
      if(this.teaIdList.length == 0){
        Toast.fail('请选择变更老师')
      }else{
        this.$router.push({
          path: this.$route.query.isEx ? '/exchangeCourse1' : '/teacher',
          query:{
            'teaData':this.teaIdList.toString(),
            'teaName':this.teaNameList.toString(),
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
      }
    },
    clear(){
      for(let i = 0;i < this.teachers.length;i++){
        if(this.teachers[i].checked){
          this.teachers[i].checked = false
        }
      }
    },
    async teaTap(){
      const params = {
        facultyId:this.teaInfo,
        departmentId:this.teaInfo,
        teacherName:this.teaInfo
      }
      const res = await Api.teachGetKxls(params)
      this.teacherList = res.data
    }
  },
  computed:{
    teachers:function(){
      var author = this.teaInfo;
      if(author){
        return this.teacherList.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(author) > -1
          })
        })
      }
      return this.teacherList
    }
  },       
}
</script>
<style lang="less" scoped>
.alter-teacher{padding: 0 20px;margin: 70px 0 20px;}
.alter-teacher .alter-find{border-radius:3px;background-color: #F4F5FF;padding: 11px 13px;display: flex;}
.alter-teacher .alter-find i{background: url(../../../assets/images/search.png)no-repeat center;background-size: 22px 22px;width: 22px;height: 22px;}
.alter-teacher .alter-find input,.alter-teacher .alter-find input::placeholder{color: #757DA3;}
.alter-teacher .alter-find input{padding: 0 11px;flex: 1;}
.alter-teacher .alter-item{padding: 0 20px;background-color: #F8F8F8;border-radius:5px;height: 82px;margin: 21px 0 13px;display: flex;justify-content: space-between;align-items: center;}
.alter-teacher .alter-item h4{color: #212F6E;font-size: 16px;line-height: 22px;margin-bottom: 8px;}
.alter-teacher .alter-item p{color: #757DA3;font-size: 12px;line-height: 17px;}
.alter-buttons{z-index: 9;background-color: #fff;position: fixed;bottom: 0;padding: 20px 0;width: calc(100% - 40px);box-sizing: border-box;display: flex;justify-content: space-between;align-items: center;}
.alter-buttons button{width: calc(50% - 10px);padding: 11px 0;border-radius: 3px;}
.alter-buttons button.clear{background-color: #ECEDFD;color: #7469F8;}
.alter-buttons button.confirm{background-color: #7469F8;color: #fff;}
.alter-teacher .el-checkbox__inner{width: 18px;height: 18px;border-radius: 50%;border: 2px solid #B3B9D0}
.alter-teacher .el-checkbox__inner::after{left: 5px;top: 2px;border-width: 2px;}
.alter-teacher .el-checkbox__input.is-checked .el-checkbox__inner{background: #7469F8;border-color:#7469F8;}
</style>







// WEBPACK FOOTER //
// src/components/teacher/Change/alterTeacher.vue