import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/**
 * 获取进考试圈的token
 * @param {String} userName 昵称
 * @param {Number} userNumber 手机号码
 * @returns {Promise<JSON>}
 */
export const getKSbaoToken = (userName, userNumber) => stsqReq('/user/ksbaoLogin', { userName, userNumber })

/**
 * 获取科目列表
 * @param {number} KsbClassID 职业ID
 * @param {string} guid 考试宝典guid
 * @returns {Promise<JSON>}
 */
export const getKsbClassInfo = (KsbClassID, guid) => stsqReq('/ksbao/getKsbClassInfo', { KsbClassID, guid })

/**
 * 获取职业列表
 * @param {String} guid 考试宝典guid
 * @returns {Promise<JSON>}
 */
export const getKsbClass = (guid) => stsqReq('/ksbao/getKsbClass', { guid })

/**
 * 设置科目
 * @param {*} appID
 * @param {*} appVn
 * @param {*} guid
 * @returns {Promise<JSON>}
 */
export const setLastApp = (appID, appVn, guid) => stsqReq('/ksbao/setLastApp', { appID, appVn, guid })
