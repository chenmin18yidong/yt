import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/*
  *https://stsqapi.tibosi.com/paper/listSort/
  获取试卷列表
  */
export const paperFolderList = () => stsqReq('/paper/paperFolderList')
// 获取试卷分类列表
export const labelAllLabel = () => stsqReq('/label/allLabel')
// 获取试卷对应分类路径
export const plabeltree = (paperID) => stsqReq('/label/plabeltree', { paperID })

/* 添加新的试卷
 /paper/paperTitle/insert
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  folderID 否 int 目标文件夹ID
  paperTitle 是 string 试卷标题
  labelID 否 分类ID
 */
export const paperTitleinsert = (data) => stsqReq('/paper/paperTitle/insert', data)

/* 试卷重命名
 /label/plabelset paperID labelID userID guid client
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
 labelID 分类ID
 */
export const plabelset = (paperID, labelID) => stsqReq('/label/plabelset', { paperID, labelID })

/* 试卷重命名
 /paper/paperTitle/insert
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
  paperTitle 是 String 修改的试卷名称
 */
export const paperTitleupdate = (data) => stsqReq('/paper/paperTitle/update', data)

/* 检测当前试卷是否存在分享码、用户需不需要输入分享码以及试卷是否为本人
  /sharecode/checkMine
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
 */
export const sharecodeCheckMine = (paperID) => stsqReq('/sharecode/checkMine', { paperID })

/**
 * 试卷分享码输入校验
 * /sharecode/valid
 * 参数：userID
 * 用户ID，paperID
 * 试卷ID，code 分享码
 */
export const shareCodeValid = (userID, paperID, code) => stsqReq('/sharecode/valid', { userID, paperID, code })

/* 分享码开启开关
  /sharecode/switcher
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
 */
export const sharecodeSwitcher = (paperID) => stsqReq('/sharecode/switcher', { paperID })

/* 分享码列表接口
  /sharecode/codeList
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
 */
export const sharecodeCodeList = (paperID) => stsqReq('/sharecode/codeList', { paperID })

/* 生成分享码接口
  /sharecode/insert
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2
  type 是 int 无 0通用 1临时
  paperID 是 int 试卷ID
 */
export const shareCodeInsert = (paperID, type) => stsqReq('/sharecode/insert', { paperID, type })
/* 分享码详情信息接口
 /sharecode/codedetail
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  code 是 string 分享码
  paperID 是 int 试卷ID
 */
export const shareCodedetail = (paperID, code) => stsqReq('/sharecode/codedetail', { paperID, code })

/* 分享码详情信息接口
 /sharecode/disableCode
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  code 是 string 分享码
  paperID 是 int 试卷ID
 */
export const shareDisableCode = (paperID, code) => stsqReq('/sharecode/disableCode', { paperID, code })

/**
 * 开启/关闭复制功能
 */
export const modifyCopy = function (paperID) { return stsqReq('/paper/modifyCopy', { paperID }) }

/**
 * 开启/关闭私密功能 是否允许被搜索 privateType:0 允许 1不允许
 */
export const modifyPrivate = function (paperID, privateType) { return stsqReq('/paper/modifyPrivate', { paperID, privateType }) }

/**
 * 删除试卷或取消收藏
 */
export const paperDelete = function (paperID) { return stsqReq('/paper/delete', { paperID }) }

/**
 * 试题试卷总数
 */
export const countUserPaper = function () { return stsqReq('/paper/countUserPaper') }

/**
 * 获取试卷题型信息
 * @param {number} paperID
 */
export const getPaperStyleInfo = function (paperID) { return stsqReq('/paper/style/settingInfo', { paperID }) }
/**
 * 保存题型设置
 * @param {number} paperID
 */
export const updatePaperStyleInfo = function (paperID, styleJson) { return stsqReq('/paper/style/updateSetting', { paperID, styleJson }) }

/**
 * 获取试卷分享列表
 * @param {number}
 */
export const collectMessage = function () { return stsqReq('/paper/collectMessage') }

/**
 * 复制试卷
 * @param  data={
            paperID:paperID,
            userID:uid,
            paperTitle: paperTitle,
            toUserID:toUserID// "原用户ID"
        }
 */
export const copyPaper = function (data) { return stsqReq('/paper/copyPaper', data) }

/**
 * getPaidPaper
 * @desciption 首页 已购买页面
 */
export const getPaidPaper = (userID) => stsqReq('/tjs/purchased', { userID })
