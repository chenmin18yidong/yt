import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/** 修改或添加试题接口 */

/**
 * 修改试题，获取小题
 * /test/list
 * 参数： paperID, userID, guid, client
 */
export const testList = (paperID) => stsqReq('/test/list', { paperID })

/**
 * 删除试题
 * /test/delete
 * 参数：
 *   * @param userID
     * @param guid
     * @param testID
     * @param client
 */
export const testDelete = (testID) => stsqReq('/test/delete', { testID })

// 以下接口新增可选参数cid（章节ID) 试题JSON里你自己加个新字段存难易度
// /test/insert 新增试题
// /test/update 修改试题

/**
 * 修改试题
 * /test/update
 * 参数： StyleID（放testJson中）, userID, paperID, guid, testJson, testID
 * 可选参数cid（章节ID)
 * difficulty easy简单  normal一般  difficult困难
 */
export const testUpdata = (data) => stsqReq('/test/update', data)

/**
 * 新增试题
 * /test/insert
 * 参数 styleID, userID, paperID, guid, testJson, testID
 * 可选参数cid（章节ID)
 * difficulty easy简单  normal一般  difficult困难
 */
export const testInsert = (data) => stsqReq('/test/insert', data)

/**
 * 章节目录树
 * /chapter/tree
 * paperID 试卷id
 * userID
 * guid
 * client
*/
export const chapterTree = (paperID) => stsqReq('/chapter/tree', { paperID })
/**
 * 批量导入
 * /paper/test/massinsert
 */
export const massinsert = (paperID, testJson) => stsqReq('/paper/test/massinsert', { paperID, testJson })

/**
 * 公式图片上传
 * /formula/upload
 * img:this.src,
    width:this.width,
    height:this.height,
    userID:userID
 */
export const formulaUpload = (img, width, height) => stsqReq('/formula/upload', { img, width, height })
