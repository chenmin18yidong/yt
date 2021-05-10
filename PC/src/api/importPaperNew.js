import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/**
 * 获取可都如的试卷
 * @returns {Promise<JSON>}
 */
export const ownPaperList = () => stsqReq('/paper/ownPaperList')

/**
 * 更新试题解析配置
 * @param {string} config JSON.stringify(config)
 * @returns {Promise<JSON>}
 */
export const updateModelConfig = (config) => stsqReq('/importWord/updateModelConfig', { config })

/**
 * 获取试题解析配置
 * @returns {Promise<JSON>}
 */
export const getModelConfig = () => stsqReq('/importWord/getModelConfig')

/**
 * 重新识别
 * @param {String} textContent 导入文本
 * @returns {Promise<JSON>}
 */
export const reIdentify = (textContent) => stsqReq('/paper/ImportAnalyze', { textContent })

/**
 * 试题查重
 * @param {JSON} testJson
 * @returns {Array<Array<Number>>}
 */
export const checkDupTest = (testJson) => stsqReq('/paper/checkTest', { testJson })

/**
 * 导入试题
 * @param {Number} paperID 试卷ID
 * @param {JSON} testJson 试题JSON
 */
export const massinsert = (paperID, testJson) => stsqReq('/paper/test/insertNoCheckWord', { paperID, testJson })
