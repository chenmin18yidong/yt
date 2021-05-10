import { stsqHttp } from '@/utils/ajax'
const stsqReq = stsqHttp.Ajax
/** userID,guid,client在ajax中有 */

/**
 * 获取全部试卷分类
 */
export const allLabel = () => stsqReq('/label/allLabel')

/**
 * 题集市试卷列表
 * labelID keyword 可选 page pagesize sort排序 1销售数 2平均分数 3最新试卷
 */
export const searchPayPaperPC = (data) => stsqReq('/keyword/searchPayPaperPC', data)

/**
 * 试卷详情不校验登录
 * "paper/middleInfo/novalid"
paperID
 */
export const middleInfoNovalid = (paperID) => stsqReq('/paper/middleInfo/novalid', { paperID })
/**
 * 试卷详情
 * "paper/middleInfo"
userID guid paperID client
 */
export const middleInfo = (paperID) => stsqReq('/paper/middleInfo', { paperID })
/**
 * 获取评论
 * "paper/middleInfo"
paperID
 */
export const ratingList = (paperID) => stsqReq('/paper/ratingList', { paperID })
/**
 * 获取评论不校验登录
 * "paper/middleInfo"
paperID
 */
export const ratingListNovalid = (paperID) => stsqReq('/paper/ratingList/novalid', { paperID })
/**
 * 收藏和取消收藏
 * /keyWord/wxcollection
 *  paperID: 383330
    toUserID: 3402
    userID: 962098
 */
export const wxcollection = (paperID, toUserID) => stsqReq('/keyWord/wxcollection', { paperID, toUserID })
/**
删除评论
/paper/deleteRating
paperID

添加评论
/paper/rating
comment: "踩踩踩"
paperID: "383330"
score: 5
 */

/**
 * 作者更多试卷
 * /tjs/more
 *  authorUserID page pagesize userID guid client
 */
export const morePaper = (authorUserID, page, pagesize) => stsqReq('/tjs/more', { authorUserID, page, pagesize })
/**
 * 下单
 * userID guid client paperID payType填WeChatPay
 */
export const createOrder = (paperID, payType) => stsqReq('/tjs/payment/web/createOrder', { paperID, payType })
/**
 * 查单
 * outTradeNo单号
 */
export const queryOrder = (outTradeNo, payType) => {
  if (payType === 'WeChatPay') {
    return stsqReq('/tjs/payment/web/queryOrder', { outTradeNo, payType })
  } else {
    return stsqReq('/tjs/alipayment/queryOrderAlipay', { outTradeNo, payType })
  }
}

/**
 * 已购买试卷
 */
export const purchased = () => stsqReq('/tjs/pc/purchased')
/**
 * 付费卷删除
 *  paperID
 */
export const deletepaper = (paperID) => stsqReq('/tjs/deletepaper', { paperID })
/**
 * 是否是vip
 * paperID
 */
export const isvip = (paperID) => stsqReq('/tjs/isvip', { paperID })

/**
 * 用户资金状态
 */
export const fundInfo = () => stsqReq('/tjs/user/fundInfo')

/**
 * 付费卷——管理列表
 */
export const paypaperlist = () => stsqReq('/tjs/paypaperlist')

/**
 * 付费卷——个人名下试卷数据
 */
export const settinginfo = () => stsqReq('/tjs/settinginfo')
/**
 * 付费卷插入/更新付费卷设置
 *  paperID overview预览题数 pr价格 isLock是否下架
 */
export const insertpaper = (paperID, overview, pr, isLock) => stsqReq('/tjs/insertpaper', { paperID, overview, pr, isLock })

/**
 * 付费卷信息
 * paperID
 */
export const itemsInfo = (paperID) => stsqReq('/tjs/itemsInfo', { paperID })

/**
60天流水
/tjs/capitalflow
流水详情
/tjs/flowdetail flowID流水ID
 */
/**
 *  获取认证信息
 */
export const identifyInfo = () => stsqReq('/identity/identifyInfo')
/**
 *  上传认证信息
 *  userID guid client fullName姓名 identifyNum身份证号 bankAccount银行卡账号 idFront身份证正面照片文件名 idBack身份证背面照片文件名 bank银行卡照片文件名
 */
export const verification = (data) => stsqReq('/identity/verification', data)
/** 估计需要表单上传
 *  上传图片
 *  userID guid client 再带个图片文件
 * type 1身份证正面 2身份证背面 3银行卡 4其他信息
 */
// export const uploadPersonalInfo = (data) => stsqReq('/identity/uploadPersonalInfo', data)

/**
 *
 * /identity/updateProperties 修改认证信息
properties：传AliPayAccount
value：传支付宝账号
 */
export const updateProperties = (properties, value) => stsqReq('/identity/updateProperties', { properties, value })

/*
不校验登录的取题，只能取付费卷
*/
export const questionsPay = (paperID, model = 0, locations = 0) => stsqReq('/paper/questionsPay', { paperID, model, locations })
