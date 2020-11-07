//成绩查询
import Achievement from '@/components/teacher/Achievement/achievement1';
import Achievements from '@/components/teacher/Achievement/achievement2';
import Achievementss from '@/components/teacher/Achievement/achievement3';
import Modify from '@/components/teacher/Achievement/modify';
//毕业设计
import Design from '@/components/teacher/Design/design';
import Selected from '@/components/teacher/Design/selected';
//培养方案
import Programme from '@/components/teacher/Programme/programme';
import Population from '@/components/teacher/Programme/population';
import Populations from '@/components/teacher/Programme/population2';
import Major from '@/components/teacher/Programme/major';
import Majors from '@/components/teacher/Programme/major2';
import Process from '@/components/teacher/Programme/process';
import Processs from '@/components/teacher/Programme/process2';
import Plan from '@/components/teacher/Programme/plan';
import Plans from '@/components/teacher/Programme/plan2';
import Speed from '@/components/teacher/Programme/speed';
//教室借用
import Classrooms from '@/components/teacher/Classroom/classroom';
import Classroomss from '@/components/teacher/Classroom/classroom2';
import Classroomsss from '@/components/teacher/Classroom/classroom3';
import Classroomssss from '@/components/teacher/Classroom/classroom4';
import Classroomsssss from '@/components/teacher/Classroom/classroom5';
import Application_record from '@/components/teacher/Classroom/application_record';
import RecordDetail from '@/components/teacher/Classroom/recordDetail';
//监考查询
import Invigilate from '@/components/teacher/Invigilate/invigilate';
//教学评价
import Evaluate from '@/components/teacher/Evaluate/evaluate';
import Evaluates from '@/components/teacher/Evaluate/evaluate2';
import Evaluatess from '@/components/teacher/Evaluate/evaluate3';
import Evaluatesss from '@/components/teacher/Evaluate/evaluate4';
import Evaluate_record from '@/components/teacher/Evaluate/Evaluate_record';
import GradeDetails from '@/components/teacher/Evaluate/gradeDetails';
//调课申请
import Changes from '@/components/teacher/Change/change_class';
import Changess from '@/components/teacher/Change/change_class2';
import Whole from '@/components/teacher/Change/whole';
import Wholes from '@/components/teacher/Change/whole2';
import Record from '@/components/teacher/Change/record';
import Records from '@/components/teacher/Change/record2';
import Recordss from '@/components/teacher/Change/record3';
import Recordsss from '@/components/teacher/Change/record4';
import Record_backups from '@/components/teacher/Change/record_backups';
import Part from '@/components/teacher/Change/part';
import Parts from '@/components/teacher/Change/part2';
import Teacher from '@/components/teacher/Change/teacher';
import alterTeacher from '@/components/teacher/Change/alterTeacher';
import Teachers from '@/components/teacher/Change/teacher2';
import Stop from '@/components/teacher/Change/stop';
import Stops from '@/components/teacher/Change/stop2';
import Nostop from '@/components/teacher/Change/noStop';
import Lessons from '@/components/teacher/Change/lessons';
import Lessones from '@/components/teacher/Change/lessons2';
import Audit from '@/components/teacher/Change/audit_records';

//课程表
import Surfaces from '@/components/teacher/Class/surfaces'
//课堂直播
import courseManage from '@/components/teacher/live/courseManage'
import expertLecture from '@/components/teacher/live/expertLecture'
import lectureResult from '@/components/teacher/live/lectureResult'
import supervise from '@/components/teacher/live/supervise'
import supervised from '@/components/teacher/live/supervised'
//考勤
import attendance from '@/components/teacher/Attendance/attendance'
import attendanceDetail from '@/components/teacher/Attendance/attendanceDetail'
//审核
import examineIndex from '@/components/teacher/Examine/index'
//公共审核页面
import examineCommom from '@/components/teacher/Examine/commom/index'
import examineCommomSuccess from '@/components/teacher/Examine/commom/success'
//调课审核
import adjustList from '@/components/teacher/Examine/class-adjustment/list'
import adjustListDetail from '@/components/teacher/Examine/class-adjustment/listDetail'
//教室借用审核
import borrowingList from '@/components/teacher/Examine/classroom-borrowing/list'
import borrowingListDetail from '@/components/teacher/Examine/classroom-borrowing/listDetail'
//成绩录入审核
import searchScore from '@/components/teacher/Examine/score-entry/search'
import scoreList from '@/components/teacher/Examine/score-entry/list'
import scoreListDetail from '@/components/teacher/Examine/score-entry/listDetail'

//考务
import ExaminationIndex from '@/components/teacher/Examination/index'
//监考调代
import ExamSearch from '@/components/teacher/Examination/invigilation-replace/search'
import ExamSearchResult from '@/components/teacher/Examination/invigilation-replace/searchResult'
import ExamReplace from '@/components/teacher/Examination/invigilation-replace/replace'
//随堂考试
import ClassList from '@/components/teacher/Examination/classroom-test/list'
import ClassApply from '@/components/teacher/Examination/classroom-test/apply'
import ClassApplySuccess from '@/components/teacher/Examination/classroom-test/applySuccess'

//教材
import teacherTextbook from '@/components/teacher/Textbook/textbook'
import teacherTextbook_Details from '@/components/teacher/Textbook/textbook_Details'

// 实验室扫码
const teacherRoute = [
  {
    path:'/teacher/create',
    name:'teacherCreate',
    meta: {
      title:'创建课堂交流群'
    },
    component:() => import('@/components/teacher/createGroup/index.vue')
  },
  /** 
   * 审核
  */
 {
    path:'/teacher/verifyMenu',
    name:'verifyMenu',
    meta: {
      title:'审核'
    },
    component:() => import('@/components/teacher/verify/index.vue')//审核菜单
  },
  // 计划微调审核
  {
    path:'/teacher/verifyIndex',
    name:'verifyIndex',
    meta: {
      title:''
    },
    component:() => import('@/components/teacher/verify/plan/index.vue')//审核列表
  },
  {
    path:'/teacher/verifyDetail',
    name:'verifyDetail',
    meta: {
      title:''
    },
    component:() => import('@/components/teacher/verify/plan/detail.vue')//审核详情
  },
  // 书目申请审核
  {
    path:'/teacher/bookIndex',
    name:'bookIndex',
    meta: {
      title:''
    },
    component:() => import('@/components/teacher/verify/book/index.vue')//审核列表
  },
  {
    path:'/teacher/bookDetail',
    name:'bookDetail',
    meta: {
      title:''
    },
    component:() => import('@/components/teacher/verify/book/detail.vue')//审核详情
  },
  {
        path: '/achievement1',
        name: 'achievement1',
        component: Achievement
      },
      {
        path: '/achievement2',
        name: 'achievement2',
        component: Achievements
      },
      {
        path: '/achievement3',
        name: 'achievement3',
        component: Achievementss
      },
      {
        path: '/modify',
        name: 'modify',
        component: Modify
      },
      {
        path: '/design',
        name: 'design',
        component: Design
      },
      {
        path: '/selected',
        name: 'selected',
        component: Selected
      },
      {
        path: '/programme',
        name: 'programme',
        component: Programme
      },
      {
        path: '/population',
        name: 'population',
        component: Population
      },
      {
        path: '/population2',
        name: 'population2',
        component: Populations
      },
      {
        path: '/plan',
        name: 'plan',
        component: Plan
      },
      {
        path: '/plan2',
        name: 'plan2',
        component: Plans
      },
      {
        path: '/major',
        name: 'major',
        component: Major
      },
      {
        path: '/major2',
        name: 'major2',
        component: Majors
      },
      {
        path: '/process',
        name: 'process',
        component: Process
      },
      {
        path: '/process2',
        name: 'process2',
        component: Processs
      },
      {
        path: '/classroom',
        name: 'classrooms',
        component: Classrooms
      },
      {
        path: '/classroom2',
        name: 'classroom2',
        component: Classroomss
      },
      {
        path: '/classroom3',
        name: 'classroom3',
        component: Classroomsss
      },
      {
        path: '/classroom4',
        name: 'classroom4',
        component: Classroomssss
      },
      {
        path: '/classroom5',
        name: 'classroom5',
        component: Classroomsssss
      },
      {
        path: "/application_record",
        name: 'application_record',
        component: Application_record
      },
      {
        path: '/recordDetail',
        name: 'recordDetail',
        component: RecordDetail
      },
      {
        path: '/invigilate',
        name: 'invigilate',
        component: Invigilate
      },
      {
        path: '/evaluate',
        name: 'evaluates',
        component: Evaluate
      },
      {
        path: '/change_class',
        name: 'change_class',
        component: Changes
      },
      {
        path: '/change_class2',
        name: 'change_class2',
        component: Changess
      },
      {
        path: '/exchangeCourse',
        name: 'exchangeCourse',
        component: () => import('@/components/teacher/change/exchangeCourse.vue')
      },
      {
        path: '/exchangeCourse1',
        name: 'exchangeCourse1',
        component: () => import('@/components/teacher/change/exchangeCourse1.vue')
      },
      {
        path: '/whole',
        name: 'whole',
        component: Whole
      },
      {
        path: '/whole2',
        name: 'whole2',
        component: Wholes
      },
      {
        path: '/record',
        name: 'record',
        component: Record
      },
      {
        path: '/record2',
        name: 'record2',
        component: Records
      },
      {
        path: '/record3',
        name: 'record3',
        component: Recordss
      },
      {
        path: '/record4',
        name: 'record4',
        component: Recordsss
      },
      {
        path: '/record_backups',
        name: 'record_backups',
        component: Record_backups
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: Teacher,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/alterTeacher',
        name: 'alterTeacher',
        component: alterTeacher
      },
      {
        path: '/teacher2',
        name: 'teacher2',
        component: Teachers
      },
      {
        path: '/part',
        name: 'part',
        component: Part
      },
      {
        path: '/part2',
        name: 'part2',
        component: Parts
      },
      {
        path: '/stop',
        name: 'stop',
        component: Stop
      },
      {
        path: '/stop2',
        name: 'stop2',
        component: Stops
      },
      {
        path: '/noStop',
        name: 'noStop',
        component: Nostop
      },
      {
        path: '/lessons',
        name: 'lessons',
        component: Lessons
      },
      {
        path: '/lessons2',
        name: 'lessons2',
        component: Lessones
      },
      {
        path: '/audit_records',
        name: 'audit_records',
        component: Audit
      },
      {
        path: '/evaluateIndex',
        name: 'evaluateIndex',
        component: () => import('@/components/teacher/Evaluate/index.vue')
      },
      {
        path: '/evaluate2',
        name: 'evaluate2',
        component: Evaluates
      },
      {
        path: '/evaluate3',
        name: 'evaluate3',
        component: Evaluatess
      },
      {
        path: '/evaluate4',
        name: 'evaluate4',
        component: Evaluatesss
      },
      {
        path: '/evaluate_record',
        name: 'evaluate_record',
        component: Evaluate_record
      },
      {
        path: '/gradeDetails',
        name: 'gradeDetails',
        component: GradeDetails
      },
      {
        path: '/speed',
        name: 'speed',
        component: Speed
      },
      {
        path: "/surfaces",
        name: 'surfaces',
        component: Surfaces
      },
      //直播
      {
        path: '/teacher/courseManage',
        name: 'courseManage',
        component: courseManage
      },
      {
        path: '/teacher/expertLecture',
        name: 'expertLecture',
        component: expertLecture
      },
      {
        path: '/teacher/lectureResult',
        name: 'lectureResult',
        component: lectureResult
      },
      {
        path: '/teacher/supervise',
        name: 'supervise',
        component: supervise
      },
      {
        path: '/teacher/supervised',
        name: 'supervised',
        component: supervised
      },
      //考勤
      {
        path: '/teacher/attendance',
        name: 'attendance',
        component: attendance,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/teacher/attendanceDetail',
        name: 'attendanceDetail',
        component: attendanceDetail
      },
      //审核
      {
        path: '/teacher/examineIndex',
        name: 'examineIndex',
        component: examineIndex
      },
      {
        path: '/teacher/examine/examineCommom/:route/:route_params',
        name: 'examineCommom',
        component: examineCommom
      },
      {
        path: '/teacher/fileDetail',
        name: 'fileDetail',
        component: () => import('@/components/teacher/Examine/commom/main.vue')
      },
      {
        path: '/teacher/examine/examineCommomSuccess',
        name: 'examineCommomSuccess',
        component: examineCommomSuccess
      },
      {
        path: '/teacher/examine/adjustList',
        name: 'adjustList',
        component: adjustList
      },
      {
        path: '/teacher/examine/adjustListDetail/:route_params',
        name: 'adjustListDetail',
        component: adjustListDetail
      },
      {
        path: '/teacher/examine/borrowingList',
        name: 'borrowingList',
        component: borrowingList
      },
      {
        path: '/teacher/examine/borrowingListDetail/:route_params',
        name: 'borrowingListDetail',
        component: borrowingListDetail
      },
      {
        path: '/teacher/examine/searchScore',
        name: 'searchScore',
        component: searchScore
      },
      {
        path: '/teacher/examine/scoreList/:route_params',
        name: 'scoreList',
        component: scoreList
      },
      {
        path: '/teacher/examine/scoreListDetail/:route_params',
        name: 'scoreListDetail',
        component: scoreListDetail
      },
      //考务
      {
        path: '/teacher/examinationIndex',
        name: 'examinationIndex',
        component: ExaminationIndex
      },
      //考务调代
      {
        path: '/teacher/examSearch',
        name: 'examSearch',
        component: ExamSearch
      },
      {
        path: '/teacher/examSearchResult/:route_params',
        name: 'examSearchResult',
        component: ExamSearchResult
      },
      {
        path: '/teacher/examReplace/:route_params',
        name: 'examReplace',
        component: ExamReplace
      },
      //随堂考试
      {
        path: '/teacher/classList',
        name: 'classList',
        component: ClassList
      },
      {
        path: '/teacher/classApply/:route_params',
        name: 'classApply',
        component: ClassApply
      },
      {
        path: '/teacher/classApplySuccess',
        name: 'classApplySuccess',
        component: ClassApplySuccess
      },
      //教材
      {
        path: '/teacher/textbook',
        name: 'teacherTextbook',
        component: teacherTextbook
      },
      {
        path: '/teacher/textbook_Details',
        name: 'teacherTextbook_Details',
        component: teacherTextbook_Details
      },
      // 学风测评
      {
        path: '/teacher/learnHome',
        name: 'learnHome',
        component: () => import('@/components/teacher/Evaluate/learnAssessment/home.vue')
      },
      {
        path: '/teacher/learnIndex',
        name: 'learnIndex',
        component: () => import('@/components/teacher/Evaluate/learnAssessment/index.vue')
      },
      {
        path: '/teacher/styleEvaluate',
        name: 'styleEvaluate',
        component: () => import('@/components/teacher/Evaluate/learnAssessment/style.vue')
      },
      {
        path: '/teacher/detailEvaluate',
        name: 'TeaDetailEvaluate',
        component: () => import('@/components/teacher/Evaluate/learnAssessment/detail.vue')
      },
      // 工作量查询
      {
        path: '/teacher/workload',
        name: 'workload',
        component: () => import('@/components/teacher/Evaluate/workload/index.vue')
      },
      {
        path: '/teacher/workloadFind',
        name: 'workloadFind',
        component: () => import('@/components/teacher/Evaluate/workload/detail.vue')
      },
      // 指导培养方案审核
      {
        path: '/teacher/guideIndex',
        name: 'guideIndex',
        component: () => import('@/components/teacher/Examine/guide/index.vue')
      },
      {
        path: '/teacher/guideMain',
        name: 'guideMain',
        component: () => import('@/components/teacher/Examine/guide/main.vue')
      },
      // 新增课程审核
      {
        path: '/teacher/courseAudit',
        name: 'courseAudit',
        component: () => import('@/components/teacher/Examine/addAudit/index.vue')
      },
      {
        path: '/teacher/courseAuditMain',
        name: 'courseAuditMain',
        component: () => import('@/components/teacher/Examine/addAudit/main.vue')
      },
      // 图片上传
      {
        path: '/upload',
        name: 'upload',
        component: () => import('@/components/pages/upload.vue')
      },
      {
        path: '/uploadFile',
        name: 'uploadFile',
        component: () => import('@/components/pages/uploadFile.vue')
      },
      // 班级课表
      {
        path: '/teacher/class-timetable-search',
        name: 'classTimeTableSearch',
        component: () => import('@/components/teacher/class-timetable/search.vue')
      },
      {
        path: '/teacher/class-timetable-detail/:route_params',
        name: 'classTimeTableDetail',
        component: () => import('@/components/teacher/class-timetable/timetable.vue')
      },
      {
        path: '/disk',
        name: 'disk',
        component: () => import('@/components/teacher/disk/index.vue')
      },
  
  
]
export default teacherRoute


// WEBPACK FOOTER //
// ./src/router/teacher.js