import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

// 获取协同我的账号列表
/**
*@get /teamwork/myTeamworkList
*/
export const myTeamworkList = () => stsqReq('/teamwork/myTeamworkList', {})

// 获取我协同的账号列表
/**
*@get /teamwork/teamworkList
*/
export const teamworkList = () => stsqReq('/teamwork/teamworkList', {})
// 删除协同
/**
*@post /teamwork/deleteWorker
*param {number} teamworkID
*/
export const deleteWorker = (teamworkID) => stsqReq('/teamwork/deleteWorker', { teamworkID })
// 获取用户名
/**
*@get/teamwork/getUserName
*param {string} userNumber
*/
export const getUserName = (userNumber) => stsqReq('/teamwork/getUserName', { userNumber })
// 新增协同
/**
*@post /teamwork/addworker
*param {number} workUserID
*param {number} permission 1
*/
export const addworker = (workUserID, permission = 1) => stsqReq('/teamwork/addworker', { workUserID, permission })

/** *******************************************************协同的试卷操作********************************************/
/*
  获取试卷列表
    masterUserID 主ID
  */
export const paperFolderListXT = (masterUserID) => stsqReq('/paper/paperFolderListXT', { masterUserID })

/*
  获取协同用户的信息
  /teamwork/getUserInfo
    masterUserID 主ID
  */
export const getUserInfo = (masterUserID) => stsqReq('/teamwork/getUserInfo', { masterUserID })

/* 添加新的试卷
 /paper/paperTitle/insertXT
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  folderID 否 int 目标文件夹ID
  paperTitle 是 string 试卷标题
  labelID 否 分类ID
  masterUserID 主ID
 */
export const paperTitleinsertXT = (data) => stsqReq('/paper/paperTitle/insertXT', data)
/*
/paper/deleteXT
* 删除试卷或取消收藏
masterUserID 主ID
*/
export const paperDeleteXT = function (paperID, masterUserID) { return stsqReq('/paper/deleteXT', { paperID, masterUserID }) }

/* 试卷重命名
 /label/plabelsetXT paperID labelID userID guid client
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
 labelID 分类ID
   masterUserID 主ID
 */
export const plabelsetXT = (paperID, labelID, masterUserID) => stsqReq('/label/plabelsetXT', { paperID, labelID, masterUserID })

/* 试卷重命名
 /paper/paperTitle/updateXT
  userID 是 int 用户ID
  guid 是 string 无
  client 是 int 客户端代码 IOS：2

  paperID 是 int 试卷ID
  paperTitle 是 String 修改的试卷名称
  masterUserID 主ID
 */
export const paperTitleupdateXT = (data) => stsqReq('/paper/paperTitle/updateXT', data)
