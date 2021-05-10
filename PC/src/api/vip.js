import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/*
  *https://stsqapi.tibosi.com/vip/goods
  获取VIP列表
  */
export const goods = () => stsqReq('/vip/goods', {})

/**
 * 获取企业会员产品
 * @returns {Promise<JSON>}
 */
export const busGoods = () => stsqReq('/vip/business', {})

/**
 * 普通会员支付下单
 * @param {number} goodID 产品ID
 * @param {string} payType 支付方式 AliPay -支付宝, WechatPay -微信支付, AppStore -苹果内购, Taobao -淘宝
 * @returns {Promise<JSON>}
 */
export const createOrderVipQR = (goodID, payType) => stsqReq('/vip/payment/createOrderWeb', { goodID, payType })
/**
 * 主动查询支付结果
 * @param {string} outTradeNo 订单ID
 * @returns {Promise<JSON>}
 */
export const queryOrderWeb = (outTradeNo) => stsqReq('/vip/payment/queryOrderWeb', { outTradeNo })

/**
 * 企业会员支付下单
 * @param {number} goodID 产品ID
 * @param {string} payType 支付方式 AliPay -支付宝, WechatPay -微信支付, AppStore -苹果内购, Taobao -淘宝
 * @returns {Promise<JSON>}
 */
export const createOrderBusinessWeb = (goodID, payType) => stsqReq('/vip/payment/createOrderBusinessWeb', { goodID, payType })
/**
 * 主动查询支付结果
 * @param {string} outTradeNo 订单ID
 * @returns {Promise<JSON>}
 */
export const queryOrderBusWeb = (outTradeNo) => stsqReq('/vip/payment/queryOrderBusWeb', { outTradeNo })
