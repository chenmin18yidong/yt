const host = window.location.host
// 本地
// const stsqurl = 'http://192.168.1.10:9006' // 刷题神器莫
// 测试
const ckurl = 'https://stsqckapit.tibosi.com'// 刷题神器考试圈
const stsqurl = 'https://stsqapit.tibosi.com' // 刷题神器

const searchUrl = '/search' // 搜索
const qianduan = 'https://' + host // 刷提神器前端'http://127.0.0.1:8003/'//
const ksbaoUrl = 'http://bywide.ksbao.com/hzsWay?ac=5288'
const wxThridPartyUrl = 'https://wxservice.tibosi.com'

const config = {
  ckurl: ckurl,
  stsqurl: stsqurl,
  qianduan: qianduan,
  ksbaoUrl: ksbaoUrl,
  wxThridPartyUrl,
  searchUrl: searchUrl,
  tikuUrl: stsqurl,
  timeOut: 120000
}

export default config
