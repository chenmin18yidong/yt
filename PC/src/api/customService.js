import { stsqHttp } from '@/utils/ajax'

const reqStsq = stsqHttp.Ajax

/**
 * 获取用户绑定的微信小程序信息
 * @returns {Promise<JSON>}
 */
export const wxThridInfo = () => reqStsq('/user/wxThridInfo')

/**
 * 查看考试小程序码
 * @param {number} examID 考试ID
 * @returns {Promise<JSON>}
 */
export const qrcodeThird = (examID) => reqStsq('/exam/qrcodeThird', { examID })
