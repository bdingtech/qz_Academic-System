//空闲教室
import Classroom from '@/components/student/Classroom/classroom'
import classroom_refer from '@/components/student/Classroom/classroom_refer'
//成绩管理
import Score from '@/components/student/Score/score'
import semester_Score from '@/components/student/Score/semester_Score'
import score_Affirmation from '@/components/student/Score/score_Affirmation'
import score_apply from '@/components/student/Score/score_apply'
import score_replace from '@/components/student/Score/score_replace'
import submit_success from '@/components/student/Score/submit_success'
import score_confirm from '@/components/student/Score/score_confirm'
import grades_score from '@/components/student/Score/grades_score'
//学籍
import SchoolRoll from '@/components/student/statusManage/schoolRoll'
import Warning from '@/components/student/statusManage/warning'
import curWarn from '@/components/student/statusManage/curWarn'
import allWarn from '@/components/student/statusManage/allWarn'
import warnDetail from '@/components/student/statusManage/warnDetail'
import Change from '@/components/student/statusManage/change'
import changeDetail from '@/components/student/statusManage/changeDetail'
//考试安排
import Exam from '@/components/student/exam'
//补考查询
import SupplementExam from '@/components/student/supplementExam'
//缓考
import delayedExam from '@/components/student/delayTest/delayedExam'
import delayApply from '@/components/student/delayTest/delayApply'
import myApply from '@/components/student/delayTest/myApply'
import myApply1 from '@/components/student/delayTest/myApply1'
//等级考试
import gradeExam from '@/components/student/gradeExam'
import gradeDetail from '@/components/student/gradeDetail'
import myExam from '@/components/student/myExam'
//培养方案
import cultivate from '@/components/student/Cultivate/cultivate'
import syllabus from '@/components/student/Cultivate/syllabus'
import cultivateDetail from '@/components/student/Cultivate/cultivateDetail'
import courseSet from '@/components/student/Cultivate/courseSet'
import courseAdd from '@/components/student/Cultivate/courseAdd'
import courseDetails from '@/components/student/Cultivate/courseDetails'
import executePlan from '@/components/student/Cultivate/executePlan'
//选课
import pickClass from '@/components/student/pickClass/pickClass'
import creditStatistics from '@/components/student/pickClass/creditStatistics'
import pickCenter from '@/components/student/pickClass/pickCenter'
import exitPick from '@/components/student/pickClass/exitPick'
import pickDetail from '@/components/student/pickClass/pickDetail'
import pickRecord from '@/components/student/pickClass/pickRecord'
//评教
import evaluate from '@/components/student/Evaluate/evaluate'
import teachEvaluate from '@/components/student/Evaluate/teachEvaluate'
import teachEva from '@/components/student/Evaluate/teachEva'
import evaluateHistory from '@/components/student/Evaluate/evaluateHistory'
import detailEvaluate from '@/components/student/Evaluate/detailEvaluate'
// 课程表
import timetable from '@/components/student/timetable'
//教材
import textbook from '@/components/student/Textbook/textbook'
import textbook_Details from '@/components/student/Textbook/textbook_Details'


import attendanceRate from '@/components/student/Attendance/attendanceRate'
import studentAttendance from '@/components/student/Attendance/attendance'
import studentAttendanceDtl from '@/components/student/Attendance/attendanceDetail'

//辅修报名
import MinorSearch from '@/components/student/minorSignUp/search'
import MinorList from '@/components/student/minorSignUp/list'

//重修报名
import RetouchList from '@/components/student/retouchSignUp/list'
import RetouchSubmit from '@/components/student/retouchSignUp/submit'

const studentRoute = [{
    path: '/student/classroom',
    name: 'classroom',
    component: Classroom
  }, {
    path: '/student/classroom_refer',
    name: 'classroom_refer',
    component: classroom_refer
  },
  {
    path: '/student/score',
    name: 'score',
    component: Score
  },
  {
    path: '/student/grades_score',
    name: 'grades_score',
    component: grades_score
  },
  {
    path: '/student/semester_Score',
    name: 'semester_Score',
    component: semester_Score
  },
  {
    path: '/student/score_Affirmation',
    name: 'score_Affirmation',
    component: score_Affirmation
  },
  {
    path: '/student/score_apply',
    name: 'score_apply',
    component: score_apply
  },
  {
    path: '/student/score_replace',
    name: 'score_replace',
    component: score_replace
  },
  {
    path: '/student/submit_success',
    name: 'submit_success',
    component: submit_success
  },
  {
    path: '/student/score_confirm',
    name: 'score_confirm',
    component: score_confirm
  },
  {
    path: '/student/schoolRoll',
    name: 'schoolRoll',
    component: SchoolRoll
  }, {
    path: '/student/warning',
    name: 'warning',
    component: Warning,
    redirect: '/student/curWarn',
    children: [{
        path: '/student/curWarn',
        name: 'curWarn',
        component: curWarn
      },
      {
        path: '/student/allWarn',
        name: 'allWarn',
        component: allWarn
      },
    ]
  }, {
    path: '/student/warnDetail',
    name: 'warnDetail',
    component: warnDetail
  },
  {
    path: '/student/change',
    name: 'change',
    component: Change
  },
  {
    path: '/student/changeDetail',
    name: 'changeDetail',
    component: changeDetail
  },
  {
    path: '/student/exam',
    name: 'exam',
    component: Exam
  },
  {
    path: '/student/delayedExam',
    name: 'delayedExam',
    component: delayedExam
  },
  {
    path: '/student/delayApply',
    name: 'delayApply',
    component: delayApply
  },
  {
    path: '/student/myApply',
    name: 'myApply',
    component: myApply
  },
  {
    path: '/student/myApply1',
    name: 'myApply1',
    component: myApply1
  },
  {
    path: '/student/gradeExam',
    name: 'gradeExam',
    component: gradeExam
  },
  {
    path: '/student/gradeDetail',
    name: 'gradeDetail',
    component: gradeDetail
  },
  {
    path: '/student/myExam',
    name: 'myExam',
    component: myExam
  },
  {
    path: '/student/cultivateDetail',
    name: 'cultivateDetail',
    component: cultivateDetail
  },
  {
    path: '/student/courseSet',
    name: 'courseSet',
    component: courseSet
  },
  {
    path: '/student/courseAdd',
    name: 'courseAdd',
    component: courseAdd
  },
  {
    path: '/student/executePlan',
    name: 'executePlan',
    component: executePlan
  },
  {
    path: '/student/courseDetails',
    name: 'courseDetails',
    component: courseDetails
  },
  {
    path: '/student/cultivate',
    name: 'cultivate',
    component: cultivate
  },
  {
    path: '/student/syllabus',
    name: 'syllabus',
    component: syllabus
  },
  {
    path: '/student/evaluate',
    name: 'evaluate',
    component: evaluate
  },
  {
    path: '/student/evaluate',
    name: 'evaluats',
    component: evaluate
  },
  {
    path: '/student/evaluate',
    name: 'evaluatess',
    component: evaluate
  },
  {
    path: '/student/teachEvaluate',
    name: 'teachEvaluate',
    component: teachEvaluate
  }, //evaluateHistory
  {
    path: '/student/teachEva',
    name: 'teachEva',
    component: teachEva
  }, //evaluateHistory
  {
    path: '/student/evaluateHistory',
    name: 'evaluateHistory',
    component: evaluateHistory
  },
  {
    path: '/student/detailEvaluate',
    name: 'detailEvaluate',
    component: detailEvaluate
  },
  {
    path: '/student/pickClass',
    name: 'pickClass',
    component: pickClass
  },
  {
    path: '/student/creditStatistics',
    name: 'creditStatistics',
    component: creditStatistics
  },
  {
    path: '/student/pickCenter',
    name: 'pickCenter',
    component: pickCenter
  },
  {
    path: '/student/exitPick',
    name: 'exitPick',
    component: exitPick
  },
  {
    path: '/student/pickDetail',
    name: 'pickDetail',
    component: pickDetail
  },
  {
    path: '/student/pickRecord',
    name: 'pickRecord',
    component: pickRecord
  },
  {
    path: '/student/timetable',
    name: 'timetable',
    component: timetable
  },
  {
    path: '/student/textbook',
    name: 'timetables',
    component: textbook
  },
  {
    path: '/student/supplementExam',
    name: 'supplementExam',
    component: SupplementExam
  },

  {
    path: '/student/textbook_Details',
    name: 'textbook_Details',
    component: textbook_Details
  },
  {
    path: '/student/attendance',
    name: 'attendanceRate',
    component: attendanceRate,
    meta: {
      title: '课堂签到'
    }
  },
  {
    path: '/student/attendanceAdd',
    name: 'studentAttendance',
    component: studentAttendance,
    meta: {
      title: ''
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/student/attendanceDetailAdd',
    name: 'studentAttendanceDtl',
    component: studentAttendanceDtl,
    meta: {
      title: ''
    }
  },
  //辅修报名
  {
    path: '/student/minorSearch',
    name: 'minorSearch',
    component: MinorSearch
  },
  {
    path: '/student/minorList/:route_params',
    name: 'minorList',
    component: MinorList
  },
  //重修报名
  {
    path: '/student/retouchList',
    name: 'retouchList',
    component: RetouchList
  },
  {
    path: '/student/retouchSubmit/:route_params',
    name: 'retouchSubmit',
    component: RetouchSubmit
  },
  // 班级课表
  {
    path: '/student/class-timetable-search',
    name: 'stuClassTimeTableSearch',
    component: () => import('@/components/student/class-timetable/search.vue')
  },
  {
    path: '/student/class-timetable-detail/:route_params',
    name: 'stuClassTimeTableDetail',
    component: () => import('@/components/student/class-timetable/timetable.vue')
  },
  // 毕业状态查询
  {
	  path: '/student/SelectGraduationStatus-index',
	  name: 'graduationStatus',
	  component: () => import('@/components/student/SelectGraduationStatus/index.vue')
  }

]
export default studentRoute



// WEBPACK FOOTER //
// ./src/router/student.js