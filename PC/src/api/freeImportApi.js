import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

// 免费导题活动

/**
 * 获取正在导入的列表
 * @returns {Promise<JOSN>}
 */
export const uploadFileList = () => stsqReq('/uploadModel/uploadList')

/**
 * 删除已上传的文档
 * @param {number} modelID 模板ID
 * @returns {Promise<JOSN>}
 */
export const deleteUpload = (modelID) => stsqReq('/uploadModel/deleteUpload', { modelID })
