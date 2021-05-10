import { stsqHttp } from '@/exam/js/ajax'

const stsqReq = stsqHttp.Ajax

/**
 * 获取考试码相关数据
 * /exam/examInfoByApply
 *  参数： examCode 考试码
 */
export const examInfoByApply = (examCode) => stsqReq('/exam/examInfoByApply', { examCode })

/**
 * 考生考试信息详情
 * /exam/examerExamInfo
 * 参数：examID examCode考试码
 *
 */
export const examerExamInfo = (examID, examCode) => stsqReq('/exam/examerExamInfo', { examID, examCode })

/**
 * 考试取题（不用登陆）
 * /exam/examinationNoLogin
 *  参数：  userID examID source考试发起来源，企业版传3
 */
export const examinationNoLogin = (userID, examID, source) => stsqReq('/exam/examinationNoLogin', { userID, examID, source })

/**
 * 考试提交答案
 * /exam/answerExamTestNoLogin
 * 参数：userID, recordID 考试记录ID, testID 试题ID, answer 答案, score 当前小题分数
 */
export const answerExamTestNoLogin = (userID, recordID, testID, childTableID, answer, score, isManul) => stsqReq('/exam/answerExamTestNoLogin', { userID, recordID, testID, childTableID, answer, score, isManul })

/**
 * 获取考试结果
 * /exam/examerAnswerDetail
 * 参数：userID examID
 */
export const examerAnswerDetail = (userID, examID) => stsqReq('/exam/examerAnswerDetail', { userID, examID })

/**
 * 提交考试 更新后台的试卷状态
 * /exam/submitExam
 * 参数：userID recordID
 */
export const submitExam = (userID, recordID) => stsqReq('/exam/submitExam', { userID, recordID })
