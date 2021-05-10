import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/*
  *https://stsqapi.tibosi.com/user/addBusinessInfo
  提交信息
  */
export const addBusinessInfo = (businessName, linkman, linkNumber) => stsqReq('/user/addBusinessInfo', { businessName, linkman, linkNumber })
