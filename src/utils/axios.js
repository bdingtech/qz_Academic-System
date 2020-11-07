import service from './request'
import {baseURL, baseURL_PRO, baseURL_SEL, uploadUrl, uploadFileUrl, pwdUrl} from './baseUrl.js'
const parseFormDataParams = (data) => {
  const formData = new FormData()
  for (const name in data) {
    if (data.hasOwnProperty(name)) {
      if (data[name]) {
        formData.append(name, data[name])
      }
    }
  }
  return formData
}

export const Api = {
  getSelectApi : query => {
    return service({
      url: '/getSchoolUrL',
      method: 'post',
      baseURL:baseURL_PRO,
      params: query
    })
  },
  getSystemFun : query => {
    return service({
      url: '/getSystemFun',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getHomeMenuApi : query => {
    return service({
      url: '/FindSch_Int',
      method: 'post',
      baseURL,//baseURL:baseURL_PRO,
      params: query
    })
  },
  getSubMenu : query => {
    return service({
      url: '/FindSch_Submenu',
      method: 'post',
      baseURL:baseURL,
      params: query
    })
  },
  userLoginApi : query => {
    return service({
      url: '/login',
      method: 'post',
      baseURL,
      params: query
    })
  },
  weChatBindLogin : query => {
    return service({
      url: '/weChatBind',
      method: 'post',
      baseURL,
      params: query
    })
  },
  untiedWeChat : query => {
    return service({
      url: '/gzhUnbind',
      method: 'post',
      baseURL,
      params: query
    })
  },
  authLoginApi : (query) => {
    return service({
      url: '/authUser',
      method: 'post',
      baseURL,
      params: query
    })
  },
  /**
   * 绑定登录
   */
  bindLoginApi : query => {
    return service({
      url: '/authUser_bddl',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getSchoolCode : query => {
    return service({
      url: '/getSchoolCode',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getStuInfo : query => {
    return service({
      url: '/student/my',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getMessageMarkRead : query => {
    return service({
      url: '/messageMarkRead',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getNoticeList : query => {
    return service({
      url: '/noticeList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getAdvList : query => {
    return service({
      url: '/sys/getYfgggd',
      method: 'post',
      baseURL
    })
  },
  getAdvItemList : query => {
    return service({
      url: '/sys/getYfggck',
      method: 'post',
      params: query,
      baseURL
    })
  },
  getMyExamination : query => {
    return service({
      url: '/student/myExamination',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getGradeExamination : query => {
    return service({
      url: '/student/gradeExamination',
      method: 'post',
      baseURL,
      params: query
    })
  },
  gradeExaminationSave : query => {
    return service({
      url: '/student/gradeExaminationSave',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeaInfo : query => {
    return service({
      url: '/teacher/my',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getMsgApi : query => {
    return service({
      url: '/msgCenter',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getAnnualMajorList : query => {
    return service({
      url: '/annualMajorList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getEvaluateApi : query => {
    return service({
      url: '/student/studentEvaluate',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachEvaluation : query => {
    return service({
      url: '/student/teachingEvaluation',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachingProgress : query => {
    return service({
      url: '/student/teachingProgress',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachTeachingProgress : query => {
    return service({
      url: '/teacher/teachingProgress',
      method: 'post',
      baseURL,
      params: query
    })
  },
  examinationArrangement : query => {
    return service({
      url: '/student/examinationArrangement',
      method: 'post',
      baseURL,
      params: query
    })
  },
  queryResit: query => {
    return service({
      url: '/student/queryResit',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTimeMode : query => {
    return service({
      url: '/Get_sjkbms',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getGgjxzlDate : query => {
    return service({
      url: '/getGgjxzlDate',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getNodeList : query => {
    return service({
      url: '/nodeLIst',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getCampusList : query => {
    return service({
      url: '/campusList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTchBuildingList : query => {
    return service({
      url: '/tchBuildingList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getIdleClassroom : query => {
    return service({
      url: '/student/getIdleClassroom',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceCal : query => {
    return service({
      url: '/checkWorkAttendance/calendar',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceCourse : query => {
    return service({
      url: '/checkWorkAttendance/courseList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceStuCal : query => {
    return service({
      url: '/checkWorkAttendance/stu_calendar',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceStuCourse : query => {
    return service({
      url: '/checkWorkAttendance/stu_courseList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachWeekCal : query => {
    return service({
      url: '/checkWorkAttendance/getJxzl',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceSaveXskq : query => {
    return service({
      url: '/checkWorkAttendance/saveXskq',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceGetKqxs : query => {
    return service({
      url: '/checkWorkAttendance/getKqxs',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceZzdkqbj : query => {
    return service({
      url: '/checkWorkAttendance/zzdkqbj',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachGraduationProject : query => {
    return service({
      url: '/teacher/graduationProject',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachInvigilatorInquiry : query => {
    return service({
      url: '/teacher/invigilatorInquiry',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachChangeModeList : query => {
    return service({
      url: '/teacher/changeModeList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachGetJsskxx : query => {
    return service({
      url: '/teacher/getJsskxx',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachGetJstkxx : query => {
    return service({
      url: '/teacher/getJstkxx',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachGetKxls : query => {
    return service({
      url: '/teacher/getKxls',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachingWeek : query => {
    return service({
      url: '/teachingWeek',
      method: 'post',
      baseURL,
      params: query
    })
  },
  isYxMeetingV2Api : query => {
    return service({
      url: '/isYxMeetingV2',
      method: 'post',
      baseURL,
      params: query
    })
  },
  stuCurriculum : query => {
    return service({
      url: '/student/curriculum',
      method: 'post',
      baseURL,
      params: query
    })
  },
  selectReviewerApi : query => {
    return service({
      url: '/selectReviewer',
      method: 'post',
      baseURL,
      params: query
    })
  },
  saveTransferApplication : query => {
    return service({
      url: '/teacher/saveTransferApplication',
      method: 'post',
      baseURL,
      data: query
    })
  },
  getTeachGetkysj : query => {
    return service({
      url: '/teacher/getkysj',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachGetkyjs : query => {
    return service({
      url: '/teacher/getkyjs',
      method: 'post',
      baseURL,
      params: query
    })
  },
  targetAndExplain : query => {
    return service({
      url: '/student/targetAndExplain',
      method: 'post',
      baseURL,
      params: query
    })
  },
  guidanceTeaching : query => {
    return service({
      url: '/student/guidanceTeaching',
      method: 'post',
      baseURL,
      params: query
    })
  },
  executionPlan : query => {
    return service({
      url: '/student/executionPlan',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getCurrentTerm : query => {
    return service({
      url: '/currentTerm',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getStatueWaring : query => {
    return service({
      url: '/student/statueWaring',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getStatueAlienation : query => {
    return service({
      url: '/student/statueAlienation',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getWarningDetail : query => {
    return service({
      url: '/student/warningDetail',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachingMaterial : query => {
    return service({
      url: '/student/teachingMaterial',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachingMaterialTea : query => {
    return service({
      url: '/teacher/teachingMaterial',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachingCourse : query => {
    return service({
      url: '/student/teachingCourse',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeachingCourseTea : query => {
    return service({
      url: '/teacher/teachingCourse',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getAlienationDetail : query => {
    return service({
      url: '/student/alinationDetail',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getSemesterList : query => {
    return service({
      url: '/semesterList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  slowExaminationSave : query => {
    return service({
      url: '/student/slowExaminationSave',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTermGPA : query => {
    return service({
      url: '/student/termGPA',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getActivityName : query => {
    return service({
      url: '/student/activityName',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getSlowExamination : query => {
    return service({
      url: '/student/slowExamination',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getMySlowExamination : query => {
    return service({
      url: '/student/mySlowExamination',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getEvaluationIndex : query => {
    return service({
      url: '/student/evaluationIndex',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkWorkAttendanceSaveXsqd : query => {
    return service({
      url: '/checkWorkAttendance/saveXsqd',
      method: 'post',
      baseURL,
      params: query
    })
  },
  stuSaveEvaluate : query => {
    return service({
      url: '/student/saveEvaluate',
      method: 'post',
      baseURL,
      data: query
    })
  },
  socialTestScores : query => {
    return service({
      url: '/student/socialTestScores',
      method: 'post',
      baseURL,
      params: query
    })
  },
  achievementRecognition : query => {
    return service({
      url: '/student/achievementRecognition',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getMyApply : query => {
    return service({
      url: '/student/myApply',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getMyApplyDetailed : query => {
    return service({
      url: '/student/myApplyDetailed',
      method: 'post',
      baseURL,
      params: query
    })
  },
  submitCensorshipApi : query => {
    return service({
      url: '/submitCensorship',
      method: 'post',
      baseURL,
      params: query
    })
  },
  alterNativeCourses : query => {
    return service({
      url: '/student/alternativeCourses',
      method: 'post',
      baseURL,
      params: query
    })
  },
  alterNativeCoursesSave : query => {
    return service({
      url: '/student/alternativeCoursesSave',
      method: 'post',
      baseURL,
      params: query
    })
  },
  /**
   * 选课
  */
  selectWxgetXsxktzsm : query => {
    return service({
      url: '/qzapp/wxgetXsxktzsm',
      method: 'post',
      baseURL:baseURL_SEL,
      data: query
    })
  },
  selectWxxstkOper : query => {
    return service({
      url: '/qzapp/wxxstkOper',
      method: 'post',
      baseURL:baseURL_SEL,
      data: query
    })
  },
  selectWxinitXscache : query => {
    return service({
      url: '/qzapp/wxinitXscache',
      method: 'post',
      baseURL:baseURL_SEL,
      params: query
    })
  },
  selectWxgetXklc : query => {
    return service({
      url: '/qzapp/wxgetXklc',
      method: 'post',
      baseURL:baseURL_SEL,
      data: query
    })
  },
  selectWxgetKcList : query => {
    return service({
      url: '/qzapp/wxgetKcList',
      method: 'post',
      baseURL:baseURL_SEL,
      params: query
    })
  },
  selectWxxkOper : query => {
    return service({
      url: '/qzapp/wxxkOper',
      method: 'post',
      baseURL:baseURL_SEL,
      params: query
    })
  },
  selectWxgetYxkcList : query => {
    return service({
      url: '/qzapp/wxgetYxkcList',
      method: 'post',
      baseURL:baseURL_SEL,
      params: query
    })
  },
  /**
   * 教师端接口
   */
  teachGetCjcxByjs : query => {
    return service({
      url: '/teacher/getCjcxByjs',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachClassScoreList : query => {
    return service({
      url: '/teacher/classScoreList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachGetCjxgxx : query => {
    return service({
      url: '/teacher/getCjxgxx',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachCjxgSave : query => {
    return service({
      url: '/teacher/cjxgSave',
      method: 'post',
      baseURL,
      data: query
    })
  },
  teachGetJstkxxDetail : query => {
    return service({
      url: '/teacher/getJstkxxDetail',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachCreatMeetingV2 : query => {
    return service({
      url: '/teacher/creatMeetingV2',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachCourseSchedule : query => {
    return service({
      url: '/teacher/courseSchedule',
      method: 'post',
      baseURL,
      params: query
    })
  },
  //班级课表
  classtimetable : query => {
    return service({
      url: '/classtimetable',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachMyBorrowingClassrooms : query => {
    return service({
      url: '/teacher/myBorrowingClassrooms',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachBorrowingClassrooms : query => {
    return service({
      url: '/teacher/borrowingClassrooms',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachSaveBorrowingClassrooms : query => {
    return service({
      url: '/teacher/saveborrowingClassrooms',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachTeachingEvaluation : query => {
    return service({
      url: '/teacher/teachingEvaluation',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachTeachingEvaluationList : query => {
    return service({
      url: '/teacher/teachingEvaluationList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachEvaluationIndex : query => {
    return service({
      url: '/teacher/evaluationIndex',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachSaveEvaluate : query => {
    return service({
      url: '/teacher/saveEvaluate',
      method: 'post',
      baseURL,
      data: query
    })
  },
  // 毕业状态查询
  getGraduationStatus : () => {
    return service({
      url: '/student/toFindBycjqr',
      method: 'post',
      baseURL,//baseURL:baseURL_PRO,
    })
  },
  /**
   * 督学
   */
  supervisorGetxnxq : query => {
    return service({
      url: '/supervisor/getxnxq',
      method: 'post',
      baseURL,
      params: query
    })
  },
  supervisorGettk01 : query => {
    return service({
      url: '/supervisor/gettk01',
      method: 'post',
      baseURL,
      params: query
    })
  },
  supervisorGettkpc : query => {
    return service({
      url: '/supervisor/gettkpc',
      method: 'post',
      baseURL,
      params: query
    })
  },
  supervisorGetddkclist : query => {
    return service({
      url: '/supervisor/getddkclist',
      method: 'post',
      baseURL,
      params: query
    })
  },
  supervisorGetddpjlist : query => {
    return service({
      url: '/supervisor/getddpjlist',
      method: 'post',
      baseURL,
      params: query
    })
  },
  supervisorSavepjlist : query => {
    return service({
      url: '/supervisor/savepjlist',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachMajorFosterDetail : query => {
    return service({
      url: '/teacher/majorFosterDetail',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getGradeList : query => {
    return service({
      url: '/gradeList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getAcademyList : query => {
    return service({
      url: '/academyList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachTeachingPlan : query => {
    return service({
      url: '/teacher/teachingPlan',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachFosterVertionList : query => {
    return service({
      url: '/teacher/fosterVertionList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachFosterOutlineDetail : query => {
    return service({
      url: '/teacher/fosterOutlineDetail',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getClassList : query => {
    return service({
      url: '/classList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  teachTeachingProcess : query => {
    return service({
      url: '/teacher/teachingProcess',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getjyList: query => {
    return service({
      url: '/examine/getjy_list',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getjyCk: query => {
    return service({
      url: '/examine/getjy_ck',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTklist: query => {
    return service({
      url: '/examine/gettk_list',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTkck: query => {
    return service({
      url: '/examine/gettk_ck',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getcjMaxlr: query => {
    return service({
      url: '/examine/getcj_maxlr',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getcjFind: query => {
    return service({
      url: '/examine/getcj_find',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getcjCk: query => {
    return service({
      url: '/examine/getcj_ck',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getshXx: query => {
    return service({
      url: '/examine/getsh_xx',
      method: 'post',
      baseURL,
      params: query
    })
  },
  fileUpload: query => {
    return service({
      url: '/upload/fileUpload',
      method: 'post',
      baseURL,
      data: query
    })
  },
  workflowAuditing: query => {
    return service({
      url: '/examine/workflowAuditing',
      method: 'post',
      baseURL,
      params: query
    })
  },
  workflowAuditingNew: query => {
    return service({
      url: '/examine/jumpTobzb_njw',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getXqjd: query => {
    return service({
      url: '/getzzdzdb',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getJktd: query => {
    return service({
      url: '/kaowu/getjktd',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getJkjs: query => {
    return service({
      url: '/kaowu/getjk_js',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getkxjs: query => {
    return service({
      url: '/kaowu/queryTkJg0101',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTdshr: query => {
    return service({
      url: '/kaowu/user_select_ss',
      method: 'post',
      baseURL,
      params: query
    })
  },
  cancelTdjs: query => {
    return service({
      url: '/kaowu/qxgoTdjg0101',
      method: 'post',
      baseURL,
      params: query
    })
  },
  sstdjgSs: query => {
    return service({
      url: '/kaowu/sstdjg0101',
      method: 'post',
      baseURL,
      params: query
    })
  },
  stkssqxx: query => {
    return service({
      url: '/kaowu/stkssqxx',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getKszc: query => {
    return service({
      url: '/kaowu/get_kszc',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getXnxq: query => {
    return service({
      url: '/kaowu/get_xnxq',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getSelectKsjs: query => {
    return service({
      url: '/kaowu/select',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getSelectKsls: query => {
    return service({
      url: '/kaowu/select_jg0101',
      method: 'post',
      baseURL,
      params: query
    })
  },
  toSendSendStkssq: query => {
    return service({
      url: '/kaowu/toSendStkssq',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getLooksq: query => {
    return service({
      url: '/kaowu/stkssq_add',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getSjms: query => {
    return service({
      url: '/kaowu/Get_sjkbmsjc',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getQueryCriteria: query => {
    return service({
      url: '/teacher/get_queryCriteria',
      method: 'get',
      baseURL,
      params: query
    })
  },
  getWorkloadList : query => {
    return service({
      url:'/teacher/workloadList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getTeaXfcpSemeter : query => {
    return service({
      url:'/teacher/xfcp_xnxq',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getRoomType : query => {
    return service({
      url:'/getzzdzdb',
      method: 'post',
      baseURL,
      params: query
    })
  },
  // 培养方案审核
  getCultivate : query => {
    return service({
      url:'/examine/getpyfa_list',
      method: 'post',
      baseURL,
      params: query
    })
  },
  // 新增课程审核
  getAddCourse : query => {
    return service({
      url:'/examine/getxzkc_list',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkAddCourse : query => {
    return service({
      url:'/examine/getxzkc_ck',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getLearnStyleList : query => {
    return service({
      url:'/teacher/xfcp_list',
      method: 'post',
      baseURL,
      params: query
    })
  },
  getLearnEvaData : query => {
    return service({
      url:'/teacher/xfcp_mx',
      method: 'post',
      baseURL,
      params: query
    })
  },
  saveLearnStyle : query => {
    return service({
      url:'/teacher/xfcp_save',
      method: 'post',
      baseURL,
      data: query
    })
  },
  addCourseAudit : query => {
    return service({
      url:'/examine/getszkk_list',
      method: 'post',
      baseURL,
      data: query
    })
  },
  checkCourseOpen : query => {
    return service({
      url:'/examine/getszkk_ck',
      method: 'post',
      baseURL,
      params: query
    })
  },
  checkGuide : query => {
    return service({
      url:'/examine/getpyfa_ck',
      method: 'post',
      baseURL,
      params: query
    })
  },
  downloadFile : (query,fileName) => {
    // return service({
    //   url:'tysh/fjsc' + query,//upload/workflowFileDown
    //   method: 'post',
    //   // baseURL,
    //   // params: query,
    //   // responseType: 'arraybuffer'
    // })
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = baseURL + query
    document.body.appendChild(elink)
    elink.click()
  },
  uploadApi : (query,id) => {
    return service({
      // url:'/jntcpy/savePhonetoByPhoto',
      url:'/kswjgl.do?method=savePhonetoByPhoto',
      method: 'post',
      baseURL:uploadUrl,
      headers:id,
      data: parseFormDataParams(query)
    })
  },
  uploadKscjApi : (query,id) => {
    return service({
      url:'/kscj/savemxfByPhoto',
      method: 'post',
      baseURL:uploadUrl,
      headers:id,
      data: parseFormDataParams(query)
    })
  },
  uploadFileApi : (query,id) => {
    return service({
      url:'/xszhxxAction.do?method=savePhonetoByPhoto',
      method: 'post',
      baseURL:uploadFileUrl,
      data: parseFormDataParams(query)
    })
  },
  changePassword : query => {
    return service({
      url:'/updatePassword',
      baseURL:pwdUrl,
      method: 'post',
      data: query
    })
  },
  queryByStudentFuxiu : query => {
    return service({
      url: '/student/queryByStudentFuxiu',
      method: 'post',
      baseURL,
      params: query
    })
  },
  showFxxsInfo : query => {
    return service({
      url: '/student/showFxxsInfo',
      method: 'post',
      baseURL,
      params: query
    })
  },
  fxbmOper : query => {
    return service({
      url: '/student/FxbmOper',
      method: 'post',
      baseURL,
      params: query
    })
  },
  classcxtjList : query => {
    return service({
      url: '/classcxtjList',
      method: 'post',
      baseURL,
      params: query
    })
  },
  qxFxbmOper : query => {
    return service({
      url: '/student/qxFxbmOper',
      method: 'post',
      baseURL,
      params: query
    })
  },
  cxbmxk_query : query => {
    return service({
      url: '/student/cxbmxk_query',
      method: 'post',
      baseURL,
      params: query
    })
  },
  cxbmxk_bm_save : query => {
    return service({
      url: '/student/cxbmxk_bm_save',
      method: 'post',
      baseURL,
      params: query
    })
  },
  exchangeQuery : query => {
    return service({
      url: '/teacher/courseSchedule',
      method: 'post',
      baseURL,
      params: query
    })
  },
  // 发送验证码
  sendVerifyCode : query => {
    return service({
      url: '/sys/getYzmfs',
      method: 'post',
      baseURL,
      params: query
    })
  },
  // 修改密码
  alterPassword : query => {
    return service({
      url: '/sys/getXgpwd',
      method: 'post',
      baseURL,
      params: query
    })
  },
  // 验证验证码  
  checkVerifyCode : query => {
    return service({
      url: '/sys/yzmjy',
      method: 'post',
      baseURL,
      params: query
    })
  },
}



// WEBPACK FOOTER //
// ./src/utils/axios.js