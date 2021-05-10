import { stsqHttp } from '@/utils/ajax'
const stsqReq = stsqHttp.Ajax
// 获取邀请列表
/**
 *  /invite/getInviteList
 * @param userID
 * @param actID =1 邀新活动是1
 */
export const getInviteList = (actID = 1) => stsqReq('/invite/getInviteList', { actID })
/**
 *  发起邀请，生成邀请码
 * /invite/invite
 * @param userID
 * @param actID =1
 */
export const invite = (actID = 1) => stsqReq('/invite/invite', { actID })
/**
 * PC邀请注册 /invite/pcRegisteredInvite
 * @param data 中要包含inviteCode
 */
export const pcRegisteredInvite = (data) => stsqReq('/invite/pcRegisteredInvite', data)
/** 助力结果
 * /invite/inviteUserList
 * @param userID
 * @param   inviteCode,UserID
 */
export const inviteUserList = (inviteCode, userID) => stsqReq('/invite/inviteUserList', { inviteCode, userID })
