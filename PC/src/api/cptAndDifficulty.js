import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax
/** 章节添加章节和难易度 */
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
 * /paper/questions 取题接口修改
新增参数cid 在model为3时需要传
model = 3 章节练习
返回json多了个From字段 那个是来源显示的章节名称
以下接口新增可选参数cid（章节ID) 试题JSON里你自己加个新字段存难易度
/test/insert 新增试题
/test/update 修改试题
 */
/**
 * 新建章节
 * /chapter/new
 * paperID
 * cname 章节名称
 * pid 父级章节ID 最顶层一级不传该参数
 * userID
 * guid
 * client */
export const chapternew = (data) => stsqReq('/chapter/new', data)
/**
 * 修改章节
 * /chapter/modify/
 * cid 章节id
 * cname 新章节名称
 * userID
 * guid
 * client */
export const chaptermodify = (cid, cname) => stsqReq('/chapter/modify', { cid, cname })

/**
 * 删除章节
 * /chapter/del
 * cid 章节id
 * userID
 * guid
 * client */
export const chapterdel = (cid) => stsqReq('/chapter/del', { cid })

/**
 * 移动章节
 * /chapter/move
 * chapterConf 章节配置 [{cid: 10, pid: 1}, {cid: 12, pid: 1}] cid 章节ID pid 父级章节id
 * userID
 * guid
 * client */
export const chaptermove = (chapterConf) => stsqReq('/chapter/move', { chapterConf })
