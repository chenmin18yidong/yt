import config from '@/config/project.config'

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

  // 用户的操作信息
  this.userReply = '' // 用户的答案
  this.isError = ''
  this.flag = 0// 用户标记
  // 用户是否答错,因为提交答案时需要的是 lastReplyIsError，且得到的记录中的isRight：1错，0对。
  this.replyTime = '' // 用户答题时间

  this.isFav = 0
  this.userNote = ''

  // 试题的信息
  this.cptID = 0 // 章节ID
  this.sbjID = 0 // 科目ID
  this.srcID = 0 // 来源ID
  this.styleID = 0 // 试题类型ID
  this.testType = '' // 试题所属题型
  this.subTestType = '' // 小题所属题型
  this.testStyle = '' // 试题类型
  this.styleExplain = '' // 试题类型说明

  // 媒体信息
  this.hasVideo = 0
  this.videoInfo = {}
}

export const testDataHandle = (testData) => {
  const _arrAllTest = []
  let index = 0 // 数组Numbers的索引
  const styleItems = testData.StyleItems
  const testL = styleItems.length

  for (let i = 0; i < testL; i++) {
    const testType = styleItems[i].Type
    const testItems = styleItems[i].TestItems
    for (let j = 0; j < testItems.length; j++) {
      if (testType === 'A3TEST') {
        const a3items = testItems[j].A3TestItems
        for (let k = 0; k < a3items.length; k++) {
          _arrAllTest[index] = new OneTest()
          _arrAllTest[index].testNO = index + 1
          _arrAllTest[index].allTestID = testItems[j].AllTestID
          // if (app.globalData.doExamStatus == 'exam-record') {
          //   _arrAllTest[index].allTestID = testItems[j].TestID
          // }
          _arrAllTest[index].subTestID = a3items[k].A3TestItemID

          if (testItems[j].FrontTitle) {
            _arrAllTest[index].frontTitle = handelImg(testItems[j].FrontTitle)
          }

          if (a3items[k].Title) {
            _arrAllTest[index].title = handelImg(a3items[k].Title)
          }

          if (a3items[k].SelectedItems) {
            _arrAllTest[index].selectedItems = JSON.parse(handelImg(JSON.stringify(a3items[k].SelectedItems)))
          }
          _arrAllTest[index].answer = a3items[k].Answer
          if (a3items[k].Explain) {
            _arrAllTest[index].explain = handelImg(a3items[k].Explain)
          }

          _arrAllTest[index].userReply = a3items[k].userAnswer || ''
          _arrAllTest[index].isFav = a3items[k].IsFav || 0

          _arrAllTest[index].score = a3items[k].score
          _arrAllTest[index].cptID = testItems[j].CptID
          _arrAllTest[index].sbjID = testItems[j].SbjID
          _arrAllTest[index].srcID = testItems[j].SrcID
          _arrAllTest[index].styleID = styleItems[i].StyleID
          _arrAllTest[index].testType = styleItems[i].Type
          _arrAllTest[index].subTestType = a3items[k].Type
          _arrAllTest[index].testStyle = styleItems[i].Style
          _arrAllTest[index].styleExplain = styleItems[i].Explain

          // 多媒体信息（视频）
          _arrAllTest[index].hasVideo = testItems[j].hasVideo || 0
          _arrAllTest[index].videoInfo = testItems[j].videoInfo || {}

          index++
        }
      } else if (testType === 'BTEST') {
        const bitems = testItems[j].BTestItems
        for (let k = 0; k < bitems.length; k++) {
          _arrAllTest[index] = new OneTest()

          _arrAllTest[index].testNO = index + 1
          _arrAllTest[index].allTestID = testItems[j].AllTestID
          // if (app.globalData.doExamStatus == 'exam-record') {
          //   _arrAllTest[index].allTestID = testItems[j].TestID
          // }
          _arrAllTest[index].subTestID = bitems[k].BTestItemID
          _arrAllTest[index].frontTitle = ''
          _arrAllTest[index].title = bitems[k].Title
          _arrAllTest[index].selectedItems = testItems[j].SelectedItems

          _arrAllTest[index].answer = bitems[k].Answer
          _arrAllTest[index].explain = bitems[k].Explain || '无标准答案'

          _arrAllTest[index].userReply = bitems[k].userAnswer || ''
          _arrAllTest[index].isFav = bitems[k].IsFav || 0

          _arrAllTest[index].cptID = testItems[j].CptID
          _arrAllTest[index].sbjID = testItems[j].SbjID
          _arrAllTest[index].srcID = testItems[j].SrcID
          _arrAllTest[index].styleID = styleItems[i].StyleID
          _arrAllTest[index].testType = styleItems[i].Type
          _arrAllTest[index].subTestType = styleItems[i].SubType
          _arrAllTest[index].testStyle = styleItems[i].Style
          _arrAllTest[index].styleExplain = styleItems[i].Explain

          index++
        }
      } else if (testType === 'ATEST' || testType === 'JDTEST' || testType === 'PDTEST' || testType === 'TKTEST' || testType === 'XTEST') {
        _arrAllTest[index] = new OneTest()

        _arrAllTest[index].testNO = index + 1
        _arrAllTest[index].allTestID = testItems[j].AllTestID
        // if (app.globalData.doExamStatus == 'exam-record') {
        //   _arrAllTest[index].allTestID = testItems[j].TestID
        // }
        _arrAllTest[index].subTestID = -1
        _arrAllTest[index].frontTitle = ''

        if (testItems[j].Title) {
          _arrAllTest[index].title = handelImg(testItems[j].Title)
        }

        _arrAllTest[index].score = testItems[j].score || 0

        _arrAllTest[index].isFav = testItems[j].IsFav || 0
        _arrAllTest[index].userNote = testItems[j].UserNoteContent

        if (testItems[j].SelectedItems) {
          _arrAllTest[index].selectedItems = JSON.parse(handelImg(JSON.stringify(testItems[j].SelectedItems)))
        }

        if (testType === 'JDTEST' || testType === 'TKTEST') {
          _arrAllTest[index].answer = handelImg(testItems[j].Answer)
        } else {
          _arrAllTest[index].answer = testItems[j].Answer.toString().trim()
        }

        if (testItems[j].Explain) {
          _arrAllTest[index].explain = handelImg(testItems[j].Explain || '')
        }

        _arrAllTest[index].userReply = testItems[j].userAnswer || ''

        _arrAllTest[index].cptID = testItems[j].CptID
        _arrAllTest[index].sbjID = testItems[j].SbjID
        _arrAllTest[index].srcID = testItems[j].SrcID
        _arrAllTest[index].styleID = styleItems[i].StyleID
        _arrAllTest[index].testType = styleItems[i].Type
        _arrAllTest[index].subTestType = styleItems[i].SubType
        _arrAllTest[index].testStyle = styleItems[i].Style
        _arrAllTest[index].styleExplain = styleItems[i].Explain

        // 多媒体信息（视频）
        _arrAllTest[index].hasVideo = testItems[j].hasVideo || 0
        _arrAllTest[index].videoInfo = testItems[j].videoInfo || {}

        index++
      } else {
        // console.log('程序运行错误，TestData._initArrAllTest ：testType = "' + testType + '"，无法解析题型')
      }
    }
  }

  return _arrAllTest
}
/**
 * 处理试题图片放出去调用
 * @param {*} str
 */
export const dealImg = (str) => {
  return handelImg(str)
}
/**
 * 处理图片
 */
function handelImg (str) {
  str = str.toString()

  let imgStr = str.replace(new RegExp(/</g), '&lt;')
  imgStr = imgStr.replace(new RegExp(/>/g), '&gt;')
  imgStr = imgStr.replace(/\{\*\{/g, "<img style='vertical-align:middle; max-width:100%' src='" + config.stsqurl + '/testimg/').replace(/\}\*\}/g, "'/>")
  imgStr = imgStr.replace(/\{\*\*\{/g, "<img style='vertical-align:middle; max-width:100%' src='" + config.stsqurl + '/formula/').replace(/\}\*\*\}/g, "'/>")
  // eslint-disable-next-line no-useless-escape
  imgStr = imgStr.replace(/\{\-\*\{([\d_]+_(\d+)\.(?:png|jpg|gif))\}\*\-\}/g, "<img style='vertical-align:middle; max-width:100%' src='" + config.stsqurl + "/images/picture/$2/$1' />")
  return imgStr
}
