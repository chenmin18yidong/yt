import { stsqHttp } from '@/utils/ajax'
const stsqReq = stsqHttp.Ajax
/** userID,guid,client在ajax中有 */
/*
  * 获取试卷列表
  * userID: R, offlinePaperID: o
  * /offline/paperlist
  */
export const paperlist = (offlinePaperID) => stsqReq('/offline/paperlist', { offlinePaperID })
/**
  * 获取试题
  * paperID: R, '1,2,3'
  *  offlinePaperID: R,
  *  type: o, keyWord:o, page:o
  * 排序sort: time按时间排序 usedNum使用次数排序
  * filter: 0不过滤 1过滤
  * /offline/testlist
  */
export const testlist = (data) => stsqReq('/offline/testlist', data)
/**
 * 模块题型树
 * /offline/modulestyle
 * @param {*} offlinePaperID
 */
export const modulestyle = (offlinePaperID) => stsqReq('/offline/modulestyle', { offlinePaperID })
/**
 * 组卷选择试题
 * offlinePaperID: R, testID: R,op操作模式(add选定 del取消选定 sort排序): R moduleID:模块ID O:styleID O sort：O
 */
export const operate = (data) => stsqReq('/offline/operate', data)

/**
 * 试题库的数据统计 /offline/static
 * offlinePaperID: R
 */
export const testAddstatic = (offlinePaperID) => stsqReq('/offline/static', { offlinePaperID })

/**
 *  收藏试题 /offline/collectTest
 * 参数：offlinePaperID testID
 */
export const collectTest = (offlinePaperID, testID) => stsqReq('/offline/collectTest', { offlinePaperID, testID })
/**
 *  取消收藏试题 /offline/cancelCollectTest
 * 参数：offlinePaperID testID
 */
export const cancelCollectTest = (offlinePaperID, testID) => stsqReq('/offline/cancelCollectTest', { offlinePaperID, testID })
/** ******************************试卷预览**************************************** */
/**
 * 预览-模块题型试题树
/offline/treeConstruct
offlinePaperID userID guid client
 */
export const treeConstruct = (offlinePaperID) => stsqReq('/offline/treeConstruct', { offlinePaperID })
/**
 * 模块操作
 * /offline/module/operate
 * offlinePaperID:r 组卷ID | type:r 操作类型(add 添加 rename重命名 sort修改排序 del删除) | moduleID: o 模块ID | moduleName: o 新模块名称 | sort: o 新排序
 */
export const moduleOperate = (data) => stsqReq('/offline/module/operate', data)

/**
 *
 * @param {
 * 题型操作接口
 * offlinePaperID: r, op: r 操作类型(add新增 del删除 score设置分数 rename重命名 sort设置排序), score: 0分数 type:o题型 name:o新题型名称 moduleID:模块ID
 * /offline/style/operate
 * add模式需要传: offlinePaperID type moduleID
 * del模式需要传: styleID
 * rename模式需要传: styleID name
 * score模式需要传: styleID score
 * sort模式需要传: styleID moduleID offlinePaperID sort
 * @param {*} score
 */
export const styleOperate = (data) => stsqReq('/offline/style/operate', data)

/**
 * 获取组卷设置
/offline/getConf
offlinePaperID
 */
export const getConf = (offlinePaperID) => stsqReq('/offline/getConf ', { offlinePaperID })
/**
 * 更新组卷配置
 /offline/updateConf  offlinePaperID
  showTime是否显示考试时间 1显示 0不显示 后面的类推
  showAttention 注意事项
  studentInfo 考生信息
  hasScore 大题分
  hasTotalScore 总评分
 */
export const updateConf = (data) => stsqReq('/offline/updateConf ', data)

/**
 * 获取配置详情
/offline/getConfDetail
offlinePaperID
 */
export const getConfDetail = (offlinePaperID) => stsqReq('/offline/getConfDetail', { offlinePaperID })

/**
 * 更新配置详情
/offline/updateConfDetail
offlinePaperID:r 这几个ExamTime考试时间 Attention注意事项 StudentInfoDetail学生信息哪个需要更新传哪个} offlinePaperID
 */
export const updateConfDetail = (data) => stsqReq('/offline/updateConfDetail', data)

/**
 * 保存组卷
 * /offline/save
    offlinePaperID
 */

export const paperSave = (offlinePaperID) => stsqReq('/offline/save', { offlinePaperID })
/** ******************************试卷预览end**************************************** */

/**
 * 已组卷列表 /offline/offlineList
 */
export const offlineList = () => stsqReq('/offline/offlineList')
/**
 * 新增在线组卷
 * /offline/newPaper
 */
export const newPaper = () => stsqReq('/offline/newPaper')
/**
 *  修改组卷名称 /offline/changename
 * 参数：offlinePaperID name
 */
export const changename = (offlinePaperID, name) => stsqReq('/offline/changename', { offlinePaperID, name })

/**
 * 复制组卷 /offline/copyPaper
 * 参数：offlinePaperID
 */
export const copyPaper = (offlinePaperID) => stsqReq('/offline/copyPaper', { offlinePaperID })

/**
 * 删除组卷 /offline/delete
 * 参数：offlinePaperID
 */
export const paperDelete = (offlinePaperID) => stsqReq('/offline/delete', { offlinePaperID })
/**
 * 收藏试题列表
 * /offline/collectTestList  offlinePaperID  userID guid client type keyWord page:o
 */
export const collectTestList = (data) => stsqReq('/offline/collectTestList', data)

/** 先不做组卷收藏 */
/**
 * 收藏组卷 /offline/collectPaper
 * 参数：offlinePaperID
 */
export const collectPaper = (offlinePaperID) => stsqReq('/offline/collectPaper', { offlinePaperID })

/**
 *  取消收藏组卷 /offline/cancelCollectPaper
 * 参数：offlinePaperID
 */
export const cancelCollectPaper = (offlinePaperID) => stsqReq('/offline/cancelCollectPaper', { offlinePaperID })

/**
 *  已收藏试卷 /offline/collectList
 * 参数：
 */
export const collectList = () => stsqReq('/offline/collectList')
