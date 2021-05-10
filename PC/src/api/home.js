import { stsqHttp } from '@/utils/ajax'

const stsqReq = stsqHttp.Ajax

/*
  *https://stsqapi.tibosi.com/index/info
  提交信息
  */
export const indexInfo = () => stsqReq('/index/info', {})

export const indexPchot = () => stsqReq('/index/pchot', {})
export const indexPcnew = () => stsqReq('/index/pcnew', {})
