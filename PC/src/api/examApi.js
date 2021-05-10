import { stsqHttp } from '@/utils/ajax'
const stsqReq = stsqHttp.Ajax
/** userID,guid,client在ajax中有 */

/**
 * 考试编号进入考试
 * /exam/getExamInfoByShareCode
 * 参数：sharecode
 */
export const getExamInfoByShareCode = (sharecode) => stsqReq('/exam/getExamInfoByShareCode', { sharecode })

/**
 * 获取考试试题
 * /exam/examination
 * 参数：examID source
 * source 来源 shareExamInfo接口拿到
 */
export const examination = (examID, source) => stsqReq('/exam/examination', { examID, source })

/**
 * 考试提交答案
 * /exam/answerExamTest
 * 参数：userID, recordID 考试记录ID, testID 试题ID, answer 答案, score 当前小题分数
 */
export const answerExamTest = (recordID, testID, childTableID, answer, score) => stsqReq('/exam/answerExamTest', { recordID, testID, childTableID, answer, score })

/**
 * 获取考试信息
 * /exam/shareExamInfo
 * 参数：examID 考试ID
 */
export const shareExamInfo = (examID) => stsqReq('/exam/shareExamInfo', { examID })

/**
 * 提交考试
 * @param {number} recordID 考试记录ID
 * @returns {Promise<JSON>}
 */
export const submitExamRecord = (recordID) => stsqReq('/exam/submitExam', { recordID })

/**
 * 分享考试做题检测时候报名
 */
export const examCheck = (examID) => stsqReq('/exam/examCheck', { examID })

/** @@@
 * 获取考试次数
 * /exam/examAchievement
 * 参数：paperID userID guid client
 */
export const examAchievement = (examID) => stsqReq('/exam/examAchievement', { examID })

/**
 * 获取最后一次考试详情
 */
export const userLatestAnswerDetail = function (examID) { return stsqReq('/exam/userLatestAnswerDetail', { examID }) }

/**
 * 获取最后一次考试做题记录
 */
export const userLatestAnswer = function (examID) { return stsqReq('/exam/userLatestAnswer', { examID }) }

/**
 * 我的全部错题取题
 * userID Guid ajax中会赋值
 * @param
 * @date 2019-05-24 09:52:21
 * @version V1.0.0

 */

export const examAnswerDetail = (recordID) => stsqReq('/exam/examAnswerDetail', { recordID })

/**
 * /exam/anticheat/getConfig
 * 获取反作弊配置
 * userID guid client examID
 * 返回参数
 * 修改反作弊配置
 * userID guid client
 * ExamID:考试ID
 * DeviceLimit:设备限制 0全部设备 1App 2小程序 3PC
 * ForbiddenCopy 是否限制复制 0否 1是
 * ForbiddenPaste 是否限制粘贴 0否 1是
 * ForbiddenSwitch 是否限制切屏 0否 1是
 * SwitchLimit 切屏触发作弊次数
 * ForbiddenCapture 是否限制截屏 0否 1是
 * CaptureLimit 截屏触发作弊次数
 * ForceSubmit 是否超时强制提交 0否 1是
 * SubmitTime 强制提交超时时间
 */
export const cheatGetConfig = (examID) => stsqReq('/exam/anticheat/getConfig', { examID })
/**
 * /exam/anticheat/listener
 * 作弊行为监听
 * userID guid client
 * recordID 考试记录ID
 * type 触发动作类型 copy复制 paste粘贴 submit超时强制提交 switch切后台 capture截屏
 */
export const cheatListener = (recordID, type) => stsqReq('/exam/anticheat/listener', { recordID, type })
/**
 * /exam/getCurrentTime
 * 获取服务器时间
 */
export const getCurrentTime = () => stsqReq('/exam/getCurrentTime')
