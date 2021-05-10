import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/**
 * 获取自己的试卷列表
 * @description 组织考试的时候选择试题使用
 * @author tfj
 * @date 2019-12-05 16:43:33
 * @version V1.0.0
 */
export const getList = () => stsqReq('/paper/wxlist')

/**
 * 获取考试配置信息（暂废弃）
 * @description 旧版考试，创建试卷
 * @author tfj
 * @date 2019-12-06 14:18:54
 * @version V1.0.0
 */
export const examPaperInfo = (examID, paperID) => stsqReq('/exam/examPaperInfo', { examID, paperID })

/**
 * 获取当前考试配置信息
 * @description 新版考试，只需传examID
 * @author tfj
 * @date 2019-12-17 09:08:06
 * @version V1.0.0
 */
export const examPaperInfoNew = (examID) => stsqReq('/exam/examPaperInfoNew', { examID })

/**
 * 获取考试配置信息
 * @description 新版考试，只需传examID
 * @author tfj
 * @param {number} examID
 * @param {String} paperID 选中的试卷，多张试卷用逗号分隔 eg: 11111,22222,33333
 * @date 2019-12-17 08:55:18
 * @version V1.0.0
 */
export const examPaperInfoRechoose = (examID, paperID) => stsqReq('/exam/examPaperInfoRechoose', { examID, paperID })

/**
 * 获取考试列表
 * @description 考试
 * @author tfj
 * @date 2019-12-10 16:14:18
 * @version V1.0.0
 */
export const getExamList = () => stsqReq('/exam/examList/available')

/**
 * 考试题型列表
 * @description 考试题型信息（题型排序）
 * @param {number} examID 考试ID
 * @author tfj
 * @date 2019-12-13 11:49:00
 * @version V1.0.0
 */
export const styleList = (examID) => stsqReq('/exam/styleList', { examID })

/**
 * 更新考试题型排序
 * @description 考试题型信息（题型排序）
 * @author tfj
 * @date 2019-12-13 15:56:34
 * @version V1.0.0
 */
export const updateStyle = (examID, styleJson) => stsqReq('/exam/updateStyle', { examID, styleJson })

/**
 * 获取可组卷的试卷列表
 * @description 新版创建考试
 * @author tfj
 * @date 2019-12-14 16:59:57
 * @version V1.0.0
 */
export const getPaperList = () => stsqReq('/exam/paperList')

/**
 * 插入试卷
 * @author tfj
 * @param {number} ExamType 考试组卷方式 1按试卷 2按指定试题 目前1
 * @param {number} source 发起组卷来源 1试题详情页 2我的考试
 * @param {number} examApplyType 报名类型 0极简 1严格
 * @param {number} isLookError 是否看错题 0不给 1给
 * @param {number} isLookDetail 是否看做题详情 0不给 1给
 * @param {number} isLookOverView 是否看做题概览 0不给 1给
 * @param {number} isManul 手否手动判卷 0自动 1手动  严格模式下才有
 * paperID, examTitle, ExamType, source, examApplyType, isLookError, isLookDetail, isLookOverView
 * @date 2019-12-16 09:19:01
 * @version V1.0.0
 */
export const insertExam = (data) => stsqReq('/exam/insertExam', data)

/**
 * 获取报名信息
 * @description 考试报名页面
 * @author tfj
 * @date 2019-12-16 10:01:06
 * @version V1.0.0
 */
export const examApplyInfo = (examID) => stsqReq('/exam/examApplyInfo', { examID })

/**
 * 获取报名小程序码
 * @description
 * @author tfj
 * @date 2019-12-16 11:10:30
 * @version V1.0.0
 */
export const getApplyQRCode = (examID, isBusiness) => stsqReq('/exam/getApplyQRCode', { examID, isBusiness })

/**
 *获取第三方报名小程序码
 * @param {number} examID 考试ID
 * @returns {Promise<JSON>}
 */
export const getApplyQRCodeThird = (examID, isBusiness) => stsqReq('/exam/getApplyQRCodeThird', { examID, isBusiness })

/**
 * 更新考试报名信息
 * @author tfj
 * @date 2019-12-16 14:59:47
 * @version V1.0.0
 */
export const updateExamApplyInfo = (data) => stsqReq('/exam/updateExamApplyInfo', data)

/**
 * 获取考生报名列表
 * @description
 * @author tfj
 * @date 2019-12-17 19:09:07
 * @version V1.0.0
 */
export const examApplyList = (examID) => stsqReq('/exam/examApplyList', { examID })

/**
 * 删除报名
 * @description
 * @author tfj
 * @date 2019-12-17 19:19:37
 * @version V1.0.0
 */
export const deleteApplyByID = (examID, examApplyID) => stsqReq('/exam/deleteApplyByID', { examID, examApplyID })

/**
 * 删除考生
 * @description
 * @author tfj
 * @date 2019-12-28 14:38:44
 * @version V1.0.0
 */
export const deleteExamerByID = (examID, examApplyID) => stsqReq('/exam/deleteExamerByID', { examID, examApplyID })

/**
 * 修改考试名
 * @description
 * @author tfj
 * @date 2019-12-18 16:16:35
 * @version V1.0.0
 */
export const updateExamTitle = (examID, examTitle) => stsqReq('/exam/updateExamTitle', { examID, examTitle })

/**
 * 删除考试
 * @description
 * @author tfj
 * @date 2019-12-18 16:49:36
 * @version V1.0.0
 */
export const updateExamStatus = (examID) => stsqReq('/exam/updateExamStatus', { examID })

/**
 * 修改考试配置
 * @description 参数具体见： src\views\STSQ\ExamManager\componment\common\createexam.vue
 * @author tfj
 * @date 2019-12-18 17:21:43
 * @version V1.0.0
 */
export const insertExamConfigNew = (data) => stsqReq('/exam/insertExamConfigNew', data)

/**
 * 企业添加考生
 * @description
 * @author tfj
 * @date 2019-12-19 17:08:45
 * @version V1.0.0
 */
export const addExamer = (examID, examerName, examerNumber, examerEmail) => stsqReq('/exam/addExamer', { examID, examerName, examerNumber, examerEmail })

/**
 * 发送邮件
 * @description
 * @author tfj
 * @date 2019-12-19 17:20:45
 * @version V1.0.0
 */
export const sendEmailbyID = (examApplyID, emailMsg, emailTheme) => stsqReq('/exam/sendEmailbyID', { examApplyID, emailMsg, emailTheme })

/**
 * 已报名的考生
 * @description
 * @author tfj
 * @date 2019-12-19 17:43:25
 * @version V1.0.0
 */
export const examerList = (examID, keyword, isSendEmail, isAnswer) => stsqReq('/exam/examerList', { examID, keyword, isSendEmail, isAnswer })

/**
 * 查看考试小程序码
 * @description
 * @author tfj
 * @date 2019-12-20 15:36:37
 * @version V1.0.0
 */
export const examQrcode = (examID) => stsqReq('/exam/qrcode', { examID })

/**
 * 考试用户答题数据
 * @description
 * showMode 成绩显示模式  0按最新成绩 1按最优成绩
   commitTimeBegin 交卷时间（开始）如 2020-12-15 17:39:00
   commitTimeEnd   交卷时间（结束）如 2020-12-15 17:39:00
   minScore 最低分
   maxScore 最高分
 * @author tfj
 * @date 2019-12-21 12:35:13
 * @version V1.0.0
 */
export const examStatisticData = (data) => stsqReq('/exam/examStatisticData', data)

/**
 * 获取用户考试详情
 * @description
 * @author tfj
 * @date 2019-12-23 11:54:35
 * @version V1.0.0
 */
export const examRecordDetail = (examUserID, userExamID) => stsqReq('/exam/examRecordDetail', { examUserID, userExamID })

/**
 * 报名导入到考生
 * @description
 * @author tfj
 * @date 2019-12-26 17:58:16
 * @version V1.0.0
 */
export const applyer2Examer = (examID) => stsqReq('/exam/applyer2Examer', { examID })

/**
 * 获取考试结果
 * /exam/examAnswerDetail
 * 参数：userID recordID
 */
export const examAnswerDetail = (recordID) => stsqReq('/exam/examAnswerDetail', { recordID })

/** *************手动判分****************** */
/**
 * 成绩发布列表
 * /exam/scoreReleaseList
 * 参数：examID
 */
export const scoreReleaseList = (examID) => stsqReq('/exam/scoreReleaseList', { examID })

/**
 * 判分界面数据
 * /exam/judgeExam
 * 参数：recordID,examID
 */
export const judgeExam = (recordID, examID) => stsqReq('/exam/judgeExam', { recordID, examID })

/**
 * 判分接口
 * /exam/updateManulScore
 * 参数：historyID用户做题记录ID recordID考试记录ID manulScore人工评分分数,是否答对，分数完全一样才算对
 */
export const updateManulScore = (historyID, recordID, manulScore, isRight) => stsqReq('/exam/updateManulScore', { historyID, recordID, manulScore, isRight })
/**
 * 更新作答记录评语
 * /exam/comment/detail
 * 参数：comment historyID userID guid client
 */
export const detail = (comment, historyID) => stsqReq('/exam/comment/detail', { comment, historyID })

/**
 * 更新该次考试评语
 * /exam/comment/record
 * 参数：comment recordID userID guid client
 */
export const record = (comment, recordID) => stsqReq('/exam/comment/record', { comment, recordID })

/**
 * 发布成绩
 * /exam/releaseScore
 * 参数： userID recordID guid client
 */
export const releaseScore = (recordID) => stsqReq('/exam/releaseScore', { recordID })

/**
 * 获取考试防作弊信息
 * @param {number} examID 考试ID
 * @returns {Promise<JSON>}
 */
export const getAntiCheatingConfig = (examID) => stsqReq('/exam/anticheat/getConfig', { examID })

/**
 * 更新考试防作弊信息
 * userID guid client
 * ExamID:考试ID
 * DeviceLimit:设备限制 0全部设备 1App 2小程序
 * ForbiddenCopy 是否限制复制
 * ForbiddenPaste 是否限制粘贴
 * ForbiddenSwitch 是否限制切屏
 * SwitchLimit 切屏触发作弊次数
 * ForbiddenCapture 是否限制截屏
 * CaptureLimit 截屏触发作弊次数
 * ForceSubmit 是否超时强制提交
 * SubmitTime 强制提交超时时间
 * @returns {Promise<JSON>}
 */
export const updateAntiCheatingConfig = (data) => stsqReq('/exam/anticheat/updateConfig', data)

/**
 * 获取考试分享码
 * @param {number} examID 考试ID
 * @returns {Promise<JSON>}
 */
export const getShareCode = (examID) => stsqReq('/exam/sharecode', { examID })

/** *******************************************************我加入的考试************************************************************* */
/**
 * 获取我加入的考试列表
 * @description 考试
 * @author tfj
 * @date 2019-12-10 16:14:18
 * @version V1.0.0
 */
export const doExamList = () => stsqReq('/exam/doExamList')
/**
 * 获取我加入的考试 考试记录
 * @description 考试
 * @author tfj
 * @date 2019-12-10 16:14:18
 * @version V1.0.0
 */
export const doExamHistory = (examID) => stsqReq('/exam/doExamHistory', { examID })

/** ******************************************************我加入的考试end************************************************************ */
/** *******************************************************成绩页面显示设置************************************************************* */
/**
 * @description 成绩设置详情 exam/examResultSwitch
 *  * ExamID:考试ID
 * @date 2021-1-6 11:46
 * @version V1.0.0
 */
export const examResultSwitch = (examID) => stsqReq('/exam/examResultSwitch', { examID })

/**
 * @description 设置评价内容  /exam/rate/enable
 * examID考试ID
 * enable 1开启 0关闭
 * rate_config评语设置json: [{"Start": 1, "End": 59, "Content": "再接再厉"},{"Start": 60, "End": 100, "Content": "顺利过关"}]
 * @date 2021-1-6 11:46
 * @version V1.0.0
 */
export const examRateEnable = (data) => stsqReq('/exam/rate/enable', data)
/** *******************************************************成绩页面显示设置end********************************************************** */
