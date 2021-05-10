/** 做练习的接口 */
import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax
/** 顺序做题 */
/**
 * 顺序取题model=0,随机取题model=1，付费卷预览取题model=0
 * userID Guid ajax中会赋值
 * @param {
  paperID: G_Storage.getLocalStorageValue('paperID'),
  model: 0,
  locations: 0
};
新增参数cid 在model为3时需要传
model = 3 章节练习
返回json多了个From字段 那个是来源显示的章节名称
* @date 2019-05-24 09:52:21
* @version V1.0.0

*/
export const questions = (paperID, model = 0, locations = 0, cid) => stsqReq('/paper/questions', { paperID, model, locations, cid })
/** 付费卷 */

/**
 "pay/vip";//是否付费
    userID Guid ajax中会赋值
* @param paperID
*/
export const payVip = (paperID) => stsqReq('/pay/vip', { paperID })
/** 付费卷end */

/**
 "/sharecode/checkMine";//是否是加密卷
    userID Guid ajax中会赋值
* @param paperID
返回：
tp 是 int 试卷分享码标识 0：无分享码 1：有分享码
ap 是 int 用户访问标识 0：未输入过正确的分享码 1：输入过正确的分享码
self 是 int 试卷归属标识 0：非当前账户创建的试卷 1：当前账户创建的试卷
*/
export const checkMineSharecode = (paperID) => stsqReq('/sharecode/checkMine', { paperID })
/**
 /sharecode/valid";//验证分享码
    userID Guid ajax中会赋值
* @param paperID
*/
export const validSharecode = (paperID, code) => stsqReq('/sharecode/valid', { paperID, code })

/**
 * 章节目录树
 * /chapter/tree
 * paperID 试卷id
 * userID
 * guid
 * client */
export const chapterTree = (paperID) => stsqReq('/chapter/tree', { paperID })

/** 模拟考试 */
/**
 *模拟考试取题model=2 多三个模拟考试的配置
 * userID Guid ajax中会赋值
 * @param {
  paperID: G_Storage.getLocalStorageValue('paperID'),
  randTestConfig: 1/0
  randSortConfig: 1/0
  testConfig: [{
          "StyleID": 244270,
          "totality": "2"
      }, {
          "StyleID": 244271,
          "totality": "2"
      }, {
          "StyleID": 244272,
          "totality": "1"
      }, {
          "StyleID": 244273,
          "totality": "2"
      }, {
          "StyleID": 244274,
          "totality": "1"
      }, {
          "StyleID": 244275,
          "totality": "1"
      }
  ]
  model: 0,
  locations: 0
};
* @date 2019-05-24 09:52:21
* @version V1.0.0

*/
export const moniquestions = (paperID, randTestConfig, randSortConfig, testConfig, model = 2, locations = 0) => stsqReq('/paper/questions', { paperID, randTestConfig, randSortConfig, testConfig, model, locations })

/**
*模拟考试取题的信息
* userID Guid ajax中会赋值
* @param {
paperID:G_Prg.getQueryString('paperID'),
userID:G_Prg.getQueryString('userID')
};
* @date 2019-05-24 09:52:21
* @version V1.0.0

*/
export const gettestinfo = (paperID) => stsqReq('/paper/gettestinfo', { paperID })
/** 模拟考试end */

/**
* 取用户答题记录
* @description
* @param paperID
* @author ty
* @date 2019-05-24 17:39:58
* @version V1.0.0
*/
export const answerInfo = (paperID) => stsqReq('/paper/answer/info', { paperID })

/**
* 删除用户做题记录
* @description 分数页重新做题的时候使用到
* @param paperID
* @date 2019-05-25 10:53:21
* @version V1.0.0
*/
export const answerDelete = (paperID) => stsqReq('/paper/answer/delete', { paperID })
/** 顺序做题end */

/* 全部错题 */
/**
 * 我的全部错题取题
 * userID Guid ajax中会赋值
 * @param
 * @date 2019-05-24 09:52:21
 * @version V1.0.0

 */
export const getAllFalse = () => stsqReq('/paper/questions/getFalse')
/* 全部错题end */

/** 错题笔记收藏 */
/**
 * 取错题试题
 * userID Guid ajax中会赋值
 * @param {
  paperID: G_Storage.getLocalStorageValue('paperID'),
};
* @date 2019-05-24 09:52:21
* @version V1.0.0

*/
export const getErrorTest = (paperID) => stsqReq('/paper/questions/false', { paperID })
/**
* 取笔记试题
* userID Guid ajax中会赋值
* @param {
paperID: G_Storage.getLocalStorageValue('paperID'),
};
* @date 2019-05-24 09:52:21
* @version V1.0.0

*/
export const getNoteTest = (paperID) => stsqReq('/paper/getnotetest', { paperID })
/**
* 取收藏试题
* userID Guid ajax中会赋值
* @param {
paperID: G_Storage.getLocalStorageValue('paperID'),
};
* @date 2019-05-24 09:52:21
* @version V1.0.0

*/
export const getFavTest = (paperID) => stsqReq('/paper/getcollecttest', { paperID })
/** 错题笔记收藏end */

/** 做题共用接口 */
/**
   * 提交答案
   * userID Guid ajax中会赋值
   * @param {JSON} data   试题数据
   *  var params = {
              TestID: allTestID,
              childTableID: childTableID,
              paperID: paperID,
              lastReplyIsError: isRight,
              lastReply: lastUserReply
          };
  * @date 2019-05-24 09:52:21
  * @version V1.0.0
  */
export const submitAnswer = (data) => stsqReq('/paper/answer/questions', data)
/**
   * 试题收藏/取消收藏
   * @param {JSON} data    testID: allTestID,
                           childTableID: childTableID,
  * @date 2019-05-25 09:38:13
  * @version V1.0.0
  */
export const addFav = (testID, childTableID) => stsqReq('/test/testcollect', { testID, childTableID })

/**
   * 试题添加笔记
   * userID Guid ajax中会赋值
   * @param {JSON} data  var params = {
              userID: userID,
              testID: allTestID,
              userNoteContent: note,
              guid: guid
          };
  * @date 2019-05-25 10:09:54
  * @version V1.0.0
  */
export const addNote = (testID, childTableID, userNoteContent) => stsqReq('/test/inserttestnote', { testID, childTableID, userNoteContent })
/** 做题共用接口end */
