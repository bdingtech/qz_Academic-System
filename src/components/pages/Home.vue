<template>
  <div class="home pad-fix">
    <p class="black-title"><i @click="backApp()" v-if="!isNeedLogout"></i>工具箱</p>
    <div class="home-ban">
      <img src="../../../static/img/home_ban.png" alt />
    </div>
    <div class="home-items">
      <!-- 教师端 -->
      <template v-if="this.Identity =='1'">
        <template v-for="(item,index) in jsCodeList">
          <router-link
            class="icon-item"
            :to="item.codePath"
            v-if="item.codeName != '禁用'"
            :key="index"
            tag="div"
          >
            <img :src="item.codeIcon" />
            <p>{{item.codeName}}</p>
          </router-link>
        </template>
      </template>
      <!-- 学生端 -->
      <template v-else-if="this.Identity =='2'">
        <template v-for="(item,index) in xsCodeList">
          <router-link
            class="icon-item"
            :key="index"
            :to="item.codePath"
            tag="div"
            v-if="item.codeName != '禁用'"
          >
            <img :src="item.codeIcon" />
            <p>{{item.codeName}}</p>
          </router-link>
        </template>
      </template>
      <!-- 管理端 -->
      <template v-else-if="this.Identity =='0'">
        <template v-for="(item,index) in gl_list">
          <router-link
            class="icon-item"
            :to="item.codePath"
            :key="index"
            tag="div"
            v-if="item.codeName != '禁用'"
          >
            <img :src="item.codeIcon" />
            <p>{{item.codeName}}</p>
          </router-link>
        </template>

        <!-- <template v-for="(item,index) in teacherList">
          <router-link
            class="icon-item"
            :to="item.codePath"
            :key="index"
            tag="div"
            v-if="item.codeName != '禁用'"
          >
            <img :src="item.codeIcon" />
            <p>{{item.name}}</p>
          </router-link>
        </template>
        <template v-for="(item,index) in studentList">
          <router-link
            class="icon-item"
            :key="index"
            :to="item.codePath"
            tag="div"
            v-if="item.codeName != '禁用'"
          >
            <img :src="item.codeIcon" />
            <p>{{item.name}}</p>
          </router-link>
        </template>-->
      </template>
    </div>
  </div>
</template>

<script>
import { Api } from '../../utils/axios'
export default {
  data() {
    return {
      Identity: sessionStorage.getItem('Identity') || JSON.parse(sessionStorage.getItem('userInfo')).userType,
      isNeedLogout:sessionStorage.getItem('isNeedLogout'),
      // 学生端
      studentList: [{
        icon: require('../../../static/img/ico15.png'),
        name: '成绩',
        path: 'student/score',
        code: 'xs_cj',
      }, {
        icon: require('../../../static/img/ico14.png'),
        name: '学籍管理',
        path: 'student/schoolRoll',
        code: 'xs_xjgl',
      }, {
        icon: require('../../../static/img/ico4.png'),
        name: '考试安排',
        path: 'student/exam',
        code: 'xs_ksap',
      }, {
        icon: require('../../../static/img/ico1.png'),
        name: '缓考',
        path: 'student/delayedExam',
        code: 'xs_hk',
      }, {
        icon: require('../../../static/img/ico3.png'),
        name: '等级考试报名',
        path: 'student/gradeExam',
        code: 'xs_djksbm',
      }, {
        icon: require('../../../static/img/ico5.png'),
        name: '空闲教室',
        path: 'student/classroom',
        code: 'xs_kxjs',
      }, {
        icon: require('../../../static/img/ico10.png'),
        name: '培养方案',
        path: 'student/cultivate',
        code: 'xs_pyfa',
      }, {
        icon: require('../../../static/img/ico7.png'),
        name: '学生评教',
        path: 'student/evaluate',
        code: 'xs_xspj',
      }, {
        icon: require('../../../static/img/ico8.png'),
        name: '选课',
        path: 'student/pickClass',
        code: 'xs_xk',
      }, {
        icon: require('../../../static/img/ico11.png'),
        name: '课程表',
        path: 'student/timetable',
        code: 'xs_kcb',
      }, {
        icon: require('../../../static/img/ico14.png'),
        name: '教材',
        path: 'student/textbook',
        code: 'xs_jc',
      }, {
        icon: require('../../../static/img/attend.png'),
        name: '课堂签到',
        path: 'student/attendanceAdd',
        code: 'xs_kq',
      },
      {
        icon: require('../../../static/img/supplementExam.png'),
        name: '补考查询',
        path: 'student/supplementExam',
        code: 'xs_bk',
      },
      {
        icon: require('../../../static/img/ico3.png'),
        name: '辅修报名',
        path: 'student/minorSearch',
        code: 'xs_fx',
      },
      {
        icon: require('../../../static/img/ico3.png'),
        name: '重修报名',
        path: 'student/retouchList',
        code: 'xs_cx',
      }, {
        icon: require('../../../static/img/ico11.png'),
        name: '班级课表',
        path: '/student/class-timetable-search',
        code: 'xs_bjkb',
      },{
        icon: require('../../../static/img/ico2.png'),
        name: '毕业状态查询',
        path: '/student/SelectGraduationStatus-index',
        code: 'xs_byztcx',
      }],
      // 教师端
      teacherList: [{
        icon: require('../../../static/img/ico11.png'),
        name: '课程表',
        path: 'surfaces',
        code: 'js_kcb'
      }, {
        icon: require('../../../static/img/ico12.png'),
        name: '调课申请',
        path: 'change_class',
        code: 'js_tksq',
      }, {
        icon: require('../../../static/img/ico13.png'),
        name: '监考查询',
        path: 'invigilate',
        code: 'js_jkcx',
      }, {
        icon: require('../../../static/img/ico6.png'),
        name: '教室借用',
        path: 'classroom',
        code: 'js_jsjy',
      }, {
        icon: require('../../../static/img/ico7.png'),
        name: '教学评价',
        path: '/evaluateIndex',
        code: 'js_jxpj',
      }, {
        icon: require('../../../static/img/ico15.png'),
        name: '成绩管理',
        path: 'achievement1',
        code: 'js_cjgl',
      }, {
        icon: require('../../../static/img/ico10.png'),
        name: '培养方案',
        path: 'programme',
        code: 'js_pyfa',
      }, {
        icon: require('../../../static/img/ico2.png'),
        name: '毕业设计',
        path: 'design',
        code: 'js_bysj',
      }, {
        icon: require('../../../static/img/live.png'),
        name: '课堂管理',
        path: 'teacher/courseManage',
        code: 'js_kt',
      }, {
        icon: require('../../../static/img/attend.png'),
        name: '课堂签到',
        path: 'teacher/attendance',
        code: 'js_kq',
      }, {
        icon: require('../../../static/img/examine.png'),
        name: '审核',
        path: 'teacher/examineIndex',
        code: 'js_sh',
      }, {
        icon: require('../../../static/img/kw.png'),
        name: '考务',
        path: 'teacher/examinationIndex',
        code: 'js_kw',
      }, {
        icon: require('../../../static/img/ico14.png'),
        name: '教材',
        path: 'teacher/textbook',
        code: 'js_jc',
      }, {
        icon: require('../../../static/img/ico11.png'),
        name: '班级课表',
        path: '/teacher/class-timetable-search',
        code: 'js_bjkb',
      }, {
        icon: require('../../../static/img/live.png'),
        name: '我的课堂',
        path: '/teacher/create',
        code: 'js_wdkt',
      }],
      stuList: [],
      xs: [],
      js: [],
      xsCodeList: [],
      jsCodeList: [],
      data: [],
      gl_list: [],
    }
  },
  methods: {
    backApp(){
      this.$router.go(-2)
    },
    async gotMenu() {
      this.$forceUpdate()
      console.log(sessionStorage.getItem('schoolCode'));
      const params = {
        xx0101id: sessionStorage.getItem('schoolCode') || '',
        key: 'qzkj',
        is_home: '1',
        type: this.Identity == '2' ? '0' : ''
      }
      if (sessionStorage.getItem('menuSave') == '1') {
        this.data = JSON.parse(sessionStorage.getItem('homeMenuList'))
      } else {
        const res = await Api.getHomeMenuApi(params)
        this.data = res.data
        sessionStorage.setItem('homeMenuList', JSON.stringify(res.data))
        sessionStorage.setItem('menuSave', '1')
      }
      let js_ = [];
      let xs_ = [];
      if (this.data.length != 0) {
        this.data.forEach((item, index) => {
          if (item.url.slice(0, 2) == 'js' && this.Identity == '1' && item.url != 'js_bmqk' && item.url != 'js_zsbm') {
              js_.push({
                codeName: item.name,
                codeNum: item.url,
                codePath: '',
                codeIcon: ''
              })
              this.jsCodeList = js_
          }
          if (item.url.slice(0, 2) == 'js' && this.Identity == '0' && item.url != 'js_bmqk' && item.url != 'js_zsbm') {
              js_.push({
                codeName: item.name,
                codeNum: item.url,
                codePath: '',
                codeIcon: ''
              })
              this.jsCodeList = js_
          } else if (item.url.slice(0, 2) == 'xs') {
            xs_[index - js_.length] = {
              codeName: item.name,
              codeNum: item.url,
              codePath: '',
              codeIcon: ''
            }
            this.xsCodeList = xs_
          }
        })
        this.gl_list = []
        for (let i = 0; i < this.teacherList.length; i++) {
          for (let j = 0; j < js_.length; j++) {
            if (this.teacherList[i].code == this.jsCodeList[j].codeNum) {
              this.jsCodeList[j].codePath = this.teacherList[i].path;
              this.jsCodeList[j].codeIcon = this.teacherList[i].icon
            }
            if (this.teacherList[i].code == this.jsCodeList[j].codeNum && this.jsCodeList[j].codeNum == 'js_sh') {
              this.gl_list.push({
                codePath: this.teacherList[i].path,
                codeIcon: this.teacherList[i].icon,
                codeName: this.teacherList[i].name,
                name: this.teacherList[i].name,
              })
            }

          }
        }
        for (let i = 0; i < this.studentList.length; i++) {
          for (let j = 0; j < xs_.length; j++) {
            if (this.studentList[i].code == this.xsCodeList[j].codeNum) {
              this.xsCodeList[j].codePath = this.studentList[i].path;
              this.xsCodeList[j].codeIcon = this.studentList[i].icon
            }
          }
        }
      }
    },
    async getMenu() {
      const res = await Api.getSystemFun()
      let data = res.data;
      let js_ = [];
      let xs_ = [];
      data.forEach((item, index) => {
        if (item.GNBH.slice(0, 2) == 'js') {
          js_[index] = {
            codeName: item.GNMC,
            codeNum: item.GNBH,
            codePath: '',
            codeIcon: ''
          }
          this.jsCodeList = js_
        } else if (item.GNBH.slice(0, 2) == 'xs') {
          xs_[index - js_.length] = {
            codeName: item.GNMC,
            codeNum: item.GNBH,
            codePath: '',
            codeIcon: ''
          }
          this.xsCodeList = xs_
        }
      })
      for (let i = 0; i < this.teacherList.length; i++) {
        for (let j = 0; j < this.jsCodeList.length; j++) {
          if (this.teacherList[i].code == this.jsCodeList[j].codeNum) {
            // this.teacherList[j].name = this.jsCodeList[i].codeName;
            this.jsCodeList[j].codePath = this.teacherList[i].path;
            this.jsCodeList[j].codeIcon = this.teacherList[i].icon
          }
        }
      }
      for (let i = 0; i < this.studentList.length; i++) {
        for (let j = 0; j < this.xsCodeList.length; j++) {
          if (this.studentList[i].code == this.xsCodeList[j].codeNum) {
            // this.studentList[i].name = this.xsCodeList[j].codeName;
            this.xsCodeList[j].codePath = this.studentList[i].path;
            this.xsCodeList[j].codeIcon = this.studentList[i].icon
          }
        }
      }
    }
  },
  created() {
    sessionStorage.setItem('ifSelect', 0)
    this.gotMenu()
  },
}
</script>


<style scoped lang="less">
.home-ban {
  padding: 8px 20px;
  height: auto;
}
.black-title{
  display: flex;
}
.black-title i{
  background: url('../../../static/img/back.png')no-repeat center;
  width: 30px;
  height: auto;
  background-size:10px;
}
.home-ban img {
  width: 100%;
  height: auto;
}

.home-items {
  display: flex;
  flex-wrap: wrap;
}

.icon-item {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid @attendance-border-color-6;
  border-right: 1px solid @attendance-border-color-6;
}

.icon-item:nth-child(3n) {
  border-right: none;
}

.icon-item img {
  width: 31px;
  height: 31px;
  margin-bottom: 8px;
}

.icon-item p {
  color: @attendance-color-1;
  font-size: 12px;
}
</style>



// WEBPACK FOOTER //
// src/components/pages/Home.vue