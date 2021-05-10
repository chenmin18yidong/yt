import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

export const getGroupListBySelf = () => stsqReq('/group/mylistPC')

export const getGroupListByJoin = () => stsqReq('/group/joinlistPC')

/**
 * 创建群组
 * @param {string} name 名称
 * @param {string} intro 简介
 * @param {number} labelID 分类ID
 * @returns {Promise<JSON>}
 */
export const createGroup = (name, intro, labelID) => stsqReq('/group/new', { name, intro, labelID })

/**
 * 群组搜索（群名）
 * @param {String} keyword 关键字
 * @returns {Promise<JSON>}
 */
export const searchGroupByName = (keyword) => stsqReq('/group/search/name', { keyword })

/**
 * 群组搜索（群名）
 * @param {Number} keyword 搜索ID
 * @returns {Promise<JSON>}
 */
export const searchGroupByID = (keyword) => stsqReq('/group/search/id', { keyword })

/**
 * 申请加群
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const applyAddGroup = (groupID) => stsqReq('/group/join', { groupID })

/**
 * 解散群组
 * @param {Number} groupID 群组ID
 * @param {String} password 登录密码md5
 * @returns {Promise<JSON>}
 */
export const disMissGroup = (groupID, password) => stsqReq('/group/dismiss', { groupID, password })

/**
 * 获取群组信息
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const getGroupInfo = (groupID) => stsqReq('/group/detail', { groupID })

/**
 * 群组重命名
 * @param {Number} groupID 群组ID
 * @param {String} name 新群组名
 * @returns {Promise<JSON>}
 */
export const modifyGroupName = (groupID, name) => stsqReq('/group/modifyGroupName', { groupID, name })

/**
 * 修改群简介
 * @param {Number} groupID 群组ID
 * @param {String} intro 新群简介
 * @returns {Promise<JSON>}
 */
export const modifyGroupIntro = (groupID, intro) => stsqReq('/group/modifyGroupIntro', { groupID, intro })

/**
 * 修改群组分类
 * @param {Number} groupID 群组ID
 * @param {Number} labelID 分类ID
 * @returns {Promise<JSON>}
 */
export const modifyGroupLabel = (groupID, labelID) => stsqReq('/group/modifyGroupLabel', { groupID, labelID })

/**
 * 获取群成员列表
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const getGroupMembers = (groupID) => stsqReq('/group/groupmembers', { groupID })

/**
 * 允许加群
 * @param {Number} groupID 群组ID
 * @param {Number} applyUserID 申请人ID
 * @returns {Promise<JSON>}
 */
export const allowAddGroup = (groupID, applyUserID) => stsqReq('/group/apply', { groupID, applyUserID })

/**
 * 拒绝加群
 * @param {Number} groupID 群组ID
 * @param {Number} removeUserID 申请人ID
 * @returns {Promise<JSON>}
 */
export const denyAddGroup = (groupID, removeUserID) => stsqReq('/group/disagree', { groupID, removeUserID })

/**
 * 踢出群组
 * @param {Number} groupID 群组ID
 * @param {Number} removeUserID 申请人ID
 * @returns {Promise<JSON>}
 */
export const kickOutGroup = (groupID, removeUserID) => stsqReq('/group/remove', { groupID, removeUserID })

/**
 * 群试卷列表
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const groupPaperList = (groupID) => stsqReq('/group/groupPaperList', { groupID })

/**
 * 删除群组试卷
 * @param {Number} groupID 群组ID
 * @param {Number} paperID 试卷ID
 * @returns {Promise<JSON>}
 */
export const removeGroupPaper = (groupID, paperID) => stsqReq('/group/removeGroupPaper', { groupID, paperID })

/**
 * 发布群试卷列表
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const groupPublishPaperList = (groupID) => stsqReq('/group/paperList', { groupID })

/**
 * 发布群试卷列表
 * @param {Number} groupID 群组ID
 * @param {Number} paperID 试卷ID
 * @returns {Promise<JSON>}
 */
export const insertGroupPaper = (groupID, paperID) => stsqReq('/group/insertGroupPaper', { groupID, paperID })

/**
 * 群试卷群员做题情况详情
 * @param {Number} groupID 群组ID
 * @param {Number} paperID 试卷ID
 * @returns {Promise<JSON>}
 */
export const groupPaperDetail = (groupID, paperID) => stsqReq('/group/groupPaperDetail', { groupID, paperID })

/**
 * 获取群组信息
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const getGroupDInfo = (groupID) => stsqReq('/group/index', { groupID })

/**
 * 主动退群
 * @param {Number} groupID 群组ID
 * @returns {Promise<JSON>}
 */
export const quitGroup = (groupID) => stsqReq('/group/quitGroup', { groupID })
