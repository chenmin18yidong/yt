import config from '@/config/project.config'
import xss from 'xss'
/********************************************************************************
函数名：OneTest
功能：一道试题显示时的数据结构
输入参数：无
返回值：无
 *******************************************************************************/
function OneTest () {
  // 需要的试题信息
  this.testNO = 0 // 试题编号
  this.allTestID = 0 // 试题的AllTestID
  this.subTestID = -1 // 小题id（针对A3题型、B题型）
  this.frontTitle = '' // 共用题干，针对A3Test
  this.title = '' // 试题标题
  this.selectedItems = [] // 试题选项
  this.answer = '' // 试题答案
  this.explain = '' // 解题思路
  this.score = -1 // 小题分数
  this.WXsubTest = []// 完形填空的小题

  // 用户的操作信息
  this.userReply = '' // 用户的答案
  this.isError = '' // 用户是否答错,因为提交答案时需要的是 lastReplyIsError，且得到的记录中的isRight：1错，0对。
  this.flag = 0// 用户标记

  this.isFav = 0
  this.userNote = ''
  this.fromCpt = ''

  // 试题的信息
  this.cptID = 0 // 章节ID
  this.sbjID = 0 // 科目ID
  this.srcID = 0 // 来源ID
  this.style = '' // 试题类型名称
  this.styleID = 0 // 试题类型ID
  this.testStyle = '' // 试题类型
  this.subStyle = '' // 小题类型名称
  this.subStyleType = '' // 小题类型
  this.difficulty = '' // 难易度
  this.testPoint = ''
  this.styleExplain = '' // 试题类型说明

  // 购买信息
  this.buyStatus = 0
}

// 完形填空题子题的结构
function WXSubTest () {
  this.allTestID = ''
  this.subTestID = -1 // 小题id（针对完形题型）
  this.answer = '' // 试题答案
  this.selectedItems = [] // 试题选项
  this.explain = '' // 解题思路
  this.score = -1 // 小题分数
  // 用户的操作信息
  this.userReply = '' // 用户的答案
  this.isError = 1 // 用户是否答错,因为提交答案时需要的是 lastReplyIsError，且得到的记录中的isRight：1错，0对。
  this.styleType = '' // 试题类型
}

/**
 * 处理图片： [aaa.gif]
 */
function procImg (str) {
  if (!str) return
  str = str.toString()

  // 过滤富文本标签(注释掉就是显示富文本)
  // str = str.replace(/<{.*?}>/g, "");

  let imgStr = str.replace(new RegExp(/</g), '&lt;')
  imgStr = imgStr.replace(new RegExp(/>/g), '&gt;')

  // 处理富文本自定义标签
  imgStr = imgStr.replace(new RegExp(/&lt;{(.*?)}&gt;/g), '<$1>')
  imgStr = xss(imgStr, {
    whiteList: {
      ...xss.whiteList,
      strike: ['style'],
      b: ['style'],
      a: ['style']
    }
  })

  imgStr = imgStr.replace(/\{\*\{/g, "<img style='vertical-align:middle; max-width:100%' src='" + config.stsqurl + '/testimg/').replace(/\}\*\}/g, "'/>")
  imgStr = imgStr.replace(/\{\*\*\{/g, "<img style='vertical-align:middle; max-width:100%' src='" + config.stsqurl + '/formula/').replace(/\}\*\*\}/g, "'/>")
  // eslint-disable-next-line no-useless-escape
  imgStr = imgStr.replace(/\{\-\*\{([\d_]+_(\d+)\.(?:png|jpe?g|gif))\}\*\-\}/gi, "<img style='vertical-align:middle; max-width:100%' src='" + config.stsqurl + "/images/picture/$2/$1' />"
  )

  // \{\-\*\{([\u2E80-\u9FFFA-z\.\d_]+_(\d+)\.(?:png|jpg|gif))\}\*\-\}
  // {-*{刷题神器_stsq.tibosi.com_13451234_24133.png}*-}
  // https://stsqapi.tibosi.com/images/picture/24133/刷题神器_stsq.tibosi.com_13451234_24133.png

  return imgStr
}

/**
 * 排序规则
 * @description 单选、多选、判断、共用题干、共用选项、填空、简答
 * @date 2019-05-29 09:35:06
 * @version V1.0.0
 */
function sortStyleItem (StyleItems) {
  const sortRule = ['ATEST', 'XTEST', 'PDTEST', 'A3TEST', 'BTEST', 'TKTEST', 'JDTEST']
  const reuslt = []
  sortRule.forEach(val => {
    StyleItems.forEach(e1 => {
      if (val === e1.Type) {
        reuslt.push(e1)
      }
    })
  })
  return reuslt
}

function getSubStyleType (str) {
  if (!str) return ''
  let subStyleType = ''
  if (str.indexOf('单项') !== -1) {
    subStyleType = 'ATEST'
  } else if (str.indexOf('多项') !== -1) {
    subStyleType = 'XTEST'
  } else {
    subStyleType = 'AXTEST'
  }
  return subStyleType
}

// eslint-disable-next-line no-unused-vars
function procSubStyle (subStyleType) {
  let subStyle = ''
  switch (subStyleType) {
    case 'ATEST':
      subStyle = '单选'
      break
    case 'XTEST':
      subStyle = '多选'
      break
    case 'PDTEST':
      subStyle = '判断'
      break
    case 'AXTEST':
      subStyle = '不定项'
      break
    case 'TKTEST':
      subStyle = '填空'
      break
    case 'JDTEST':
      subStyle = '简答'
      break
    default:
      break
  }
  return subStyle
}

// eslint-disable-next-line no-unused-vars
function procStyle (testStyle) {
  let style = ''
  switch (testStyle) {
    case 'ATEST':
      style = '单选题'
      break
    case 'XTEST':
      style = '多选题'
      break
    case 'PDTEST':
      style = '判断题'
      break
    case 'A3TEST':
      style = '共用题干题'
      break
    case 'BTEST':
      style = '共用选项题'
      break
    case 'TKTEST':
      style = '填空题'
      break
    case 'JDTEST':
      style = '简答题'
      break
    default:
      break
  }
  return style
}
// 给答案排序
function sortAnswer (answer) {
  if (!answer) return
  const arr = answer.split('')
  arr.sort((a, b) => {
    return a.charCodeAt() - b.charCodeAt()
  })
  return arr.join('')
}

export default function testDataHandle (styleItems, appEName, sort = 0) {
  if (sort === 1) {
    styleItems = sortStyleItem(styleItems)
  }

  const _arrAllTest = []
  let index = 0 // 数组Numbers的索引

  for (let i = 0; i < styleItems.length; i++) {
    const testType = styleItems[i].Type
    const testItems = styleItems[i].TestItems
    for (let j = 0; j < testItems.length; j++) {
      if (testType === 'A3TEST') {
        const a3items = testItems[j].A3TestItems
        for (let k = 0; k < a3items.length; k++) {
          const oneTest = new OneTest()
          oneTest.testNO = index + 1
          oneTest.allTestID = testItems[j].AllTestID
          oneTest.subTestID = a3items[k].A3TestItemID
          oneTest.frontTitle = procImg(testItems[j].FrontTitle)
          oneTest.title = procImg(a3items[k].Title)
          if (a3items[k].SelectedItems) {
            const si = JSON.parse(JSON.stringify(a3items[k].SelectedItems))
            si.forEach(item => {
              item.Content = procImg(item.Content)
            })

            oneTest.selectedItems = si
          } else {
            oneTest.selectedItems = []
          }
          oneTest.answer = sortAnswer(procImg(a3items[k].Answer))
          oneTest.explain = procImg(a3items[k].Explain || '')
          oneTest.score = styleItems[i].Score
          oneTest.isFav = a3items[k].IsFav
          oneTest.paperID = a3items[k].PaperID
          oneTest.userNote = a3items[k].UserNoteContent

          oneTest.fromCpt = testItems[j].From
          oneTest.difficulty = testItems[j].difficulty

          oneTest.cptID = testItems[j].CptID
          oneTest.sbjID = testItems[j].SbjID
          oneTest.srcID = testItems[j].SrcID
          oneTest.style = styleItems[i].Style
          // oneTest.style = procStyle(styleItems[i].Type);
          oneTest.styleID = styleItems[i].StyleID
          oneTest.testStyle = styleItems[i].Type
          oneTest.subStyleType = a3items[k].Type || getSubStyleType(styleItems[i].SubType)
          oneTest.userReply = a3items[k].UserAnswer || ''
          oneTest.isError = a3items[k].isRight === 1 ? 0 : 1
          // oneTest.subStyle = "A3型题" + procSubStyle(oneTest.subStyleType);
          oneTest.subStyle = styleItems[i].Style || a3items[k].SubType
          // oneTest.difficulty = testItems[j].Difficulty
          oneTest.testPoint = testItems[j].TestPoint
          oneTest.styleExplain = styleItems[i].Explain

          oneTest.buyStatus = testItems[j].BuyStatus

          _arrAllTest[index] = oneTest

          index++
        }
      } else if (testType === 'WXTEST') {
        const oneTest = new OneTest()
        oneTest.testNO = index + 1
        oneTest.allTestID = testItems[j].AllTestID
        oneTest.subTestID = -1
        oneTest.frontTitle = procImg(testItems[j].FrontTitle)
        const wxitems = testItems[j].WXTestItems
        for (let k = 0; k < wxitems.length; k++) {
          const wxTest = new WXSubTest()
          wxTest.allTestID = wxitems[k].AllTestID
          wxTest.subTestID = wxitems[k].WXTestID
          wxTest.answer = wxitems[k].Answer
          if (wxitems[k].SelectedItems) {
            const si = JSON.parse(JSON.stringify(wxitems[k].SelectedItems))
            si.forEach(item => {
              item.Content = procImg(item.Content)
            })
            wxTest.selectedItems = si
          } else {
            wxTest.selectedItems = []
          }
          wxTest.explain = wxitems[k].Explain
          wxTest.score = styleItems[i].Score
          wxTest.styleType = styleItems[i].Type
          oneTest.WXsubTest.push(wxTest)
        }
        oneTest.score = styleItems[i].Score
        oneTest.isFav = testItems[j].IsFav
        oneTest.paperID = testItems[j].PaperID
        oneTest.userNote = testItems[j].UserNoteContent
        oneTest.userReply = testItems[j].UserAnswer || ''
        oneTest.isError = testItems[j].isRight === 1 ? 0 : 1
        oneTest.fromCpt = testItems[j].From
        oneTest.difficulty = testItems[j].difficulty

        oneTest.cptID = testItems[j].CptID
        oneTest.sbjID = testItems[j].SbjID
        oneTest.srcID = testItems[j].SrcID
        oneTest.style = styleItems[i].Style
        oneTest.styleID = styleItems[i].StyleID
        oneTest.testStyle = styleItems[i].Type
        oneTest.subStyle = styleItems[i].Style || testItems[j].SubType
        oneTest.subStyleType = styleItems[i].Type
        oneTest.testPoint = testItems[j].TestPoint
        oneTest.styleExplain = styleItems[i].Explain

        oneTest.buyStatus = testItems[j].BuyStatus

        _arrAllTest[index] = oneTest
        // 多媒体信息（视频）
        // _arrAllTest[index].hasVideo = testItems[j].hasVideo || 0
        // _arrAllTest[index].videoInfo = testItems[j].videoInfo || {}

        index++
      } else if (testType === 'BTEST') {
        const bitems = testItems[j].BTestItems
        for (let k = 0; k < bitems.length; k++) {
          const oneTest = new OneTest()

          oneTest.testNO = index + 1
          oneTest.allTestID = testItems[j].AllTestID
          oneTest.subTestID = bitems[k].BTestItemID
          oneTest.frontTitle = ''
          oneTest.title = procImg(bitems[k].Title)
          if (testItems[j].SelectedItems) {
            const si = JSON.parse(JSON.stringify(testItems[j].SelectedItems))
            si.forEach(item => {
              item.Content = procImg(item.Content)
            })

            oneTest.selectedItems = si
          } else {
            oneTest.selectedItems = []
          }
          oneTest.answer = procImg(bitems[k].Answer)
          oneTest.fromCpt = bitems[k].From
          oneTest.difficulty = bitems[k].difficulty
          oneTest.explain = procImg(bitems[k].Explain || '')
          oneTest.userReply = bitems[k].UserAnswer || ''
          oneTest.isError = bitems[k].isRight === 1 ? 0 : 1
          oneTest.score = styleItems[i].Score

          oneTest.isFav = bitems[k].IsFav
          oneTest.paperID = bitems[k].PaperID
          oneTest.userNote = bitems[k].UserNoteContent

          oneTest.cptID = testItems[j].CptID
          oneTest.sbjID = testItems[j].SbjID
          oneTest.srcID = testItems[j].SrcID
          oneTest.style = styleItems[i].Style
          // oneTest.style = procStyle(styleItems[i].Type);
          oneTest.styleID = styleItems[i].StyleID
          oneTest.testStyle = styleItems[i].Type
          oneTest.subStyleType = getSubStyleType(styleItems[i].SubType) || bitems[k].Type
          // oneTest.subStyle = "B型题" + procSubStyle(oneTest.subStyleType);
          oneTest.subStyle = styleItems[i].Style || bitems[k].SubType
          // oneTest.difficulty = testItems[j].difficulty
          oneTest.testPoint = testItems[j].TestPoint
          oneTest.styleExplain = styleItems[i].Explain

          oneTest.buyStatus = testItems[j].BuyStatus

          _arrAllTest[index] = oneTest

          index++
        }
      } else if (testType === 'ATEST' || testType === 'JDTEST' || testType === 'PDTEST' || testType === 'TKTEST' || testType === 'XTEST') {
        const oneTest = new OneTest()

        oneTest.testNO = index + 1
        oneTest.allTestID = testItems[j].AllTestID
        oneTest.subTestID = -1
        oneTest.frontTitle = ''
        oneTest.title = procImg(testItems[j].Title)
        if (testItems[j].SelectedItems) {
          const si = JSON.parse(JSON.stringify(testItems[j].SelectedItems))
          si.forEach(item => {
            item.Content = procImg(item.Content)
          })

          oneTest.selectedItems = si
        } else {
          oneTest.selectedItems = []
        }
        if (testType === 'TKTEST') {
          // 兼容有些填空题，答案是数组的错误，答案应为数组字符串 2020/3/12
          let answer = '[]'
          if (testItems[j].Answer && testItems[j].Answer.constructor === Array) {
            answer = JSON.stringify(answer)
          } else if (testItems[j].Answer) {
            if (typeof testItems[j].Answer === 'number') {
              answer = `[${testItems[j].Answer}]`
            } else if (typeof testItems[j].Answer === 'string') {
              answer = testItems[j].Answer
            }
          }
          // 兼容有些填空题，答案是数组的错误，答案应为数组字符串
          oneTest.answer = procImg(answer)
          oneTest.answerType = testItems[j].answerType || 0// 填空题的答案是否可打乱：1:可打乱，0不可打乱
        } else if (testType === 'XTEST') {
          oneTest.answer = sortAnswer(testItems[j].Answer)
        } else {
          oneTest.answer = testItems[j].Answer ? procImg(testItems[j].Answer).trim() : ''
        }
        oneTest.fromCpt = testItems[j].From
        oneTest.difficulty = testItems[j].difficulty
        oneTest.userReply = testItems[j].UserAnswer || ''
        oneTest.isError = testItems[j].isRight === 1 ? 0 : 1

        oneTest.explain = procImg(testItems[j].Explain || '')
        oneTest.score = styleItems[i].Score

        oneTest.isFav = testItems[j].IsFav
        oneTest.paperID = testItems[j].PaperID
        oneTest.userNote = testItems[j].UserNoteContent

        oneTest.cptID = testItems[j].CptID
        oneTest.sbjID = testItems[j].SbjID
        oneTest.srcID = testItems[j].SrcID
        oneTest.style = styleItems[i].Style
        // oneTest.style = procStyle(styleItems[i].Type);
        oneTest.styleID = styleItems[i].StyleID
        oneTest.testStyle = styleItems[i].Type
        // oneTest.subStyle = procSubStyle(styleItems[i].Type);
        oneTest.subStyle = styleItems[i].Style || testItems[j].SubType
        oneTest.subStyleType = styleItems[i].Type
        // oneTest.difficulty = styleItems[j].difficulty
        oneTest.testPoint = testItems[j].TestPoint
        oneTest.styleExplain = styleItems[i].Explain

        oneTest.buyStatus = testItems[j].BuyStatus

        _arrAllTest[index] = oneTest
        index++
      } else {
        // console.log('程序运行错误 ：testType = "' + testType + '"，无法解析题型')
      }
    }
  }

  return _arrAllTest
}
