// 添加试题
import { ADDTESTLOCALDATA } from '@/store/mutation-types'
const addTest = {
  state: {
    paperID: '',
    partInputData: {
      ATEST: {
        testType: 'ATEST',
        lineArea: '1\n',
        lineAreaCols: 1,
        contentArea: '',
        answer: '',
        explain: ''
      },
      XTEST: {
        testType: 'XTEST',
        lineArea: '1\n',
        lineAreaCols: 1,
        contentArea: '',
        answer: '',
        explain: ''
      },
      PDTEST: {
        testType: 'PDTEST',
        lineArea: '1\n',
        lineAreaCols: 1,
        contentArea: '',
        answer: '',
        explain: ''
      },
      A3TEST: {
        testType: 'A3TEST',
        lineArea: '1\n',
        lineAreaCols: 1,
        contentArea: '',
        answer: '',
        explain: ''
      },
      JDTEST: {
        testType: 'JDTEST',
        lineArea: '1\n',
        lineAreaCols: 1,
        contentArea: '',
        answer: '',
        explain: ''
      },
      TKTEST: {
        testType: 'TKTEST',
        lineArea: '1\n',
        lineAreaCols: 1,
        contentArea: '',
        answer: '',
        answerSet: '',
        explain: ''
      }
    },
    // 固定在页面上的占位文字和示例文字
    partStaticData: {
      ATEST: {
        preText: `1.药物代谢与反应个体差异的重要原因为
A.环境
B.遗传
C.年龄
D.体重
E.性别
2.异烟肼、普鲁卡因胺、磺胺类药物在体内会发生什么转化
A.乙酰化
B.甲基化
C.磷酸化
D.酯化
E.硫酸化`,
        answerPlaceHolder: `1.A
2.D
3.B
... `,
        explianPlaceHolder: `1.气喘、呼吸困难为中度反应的表现。
2.体层摄影广泛用于胸部疾病的诊断，它可使某一选定层面清晰显示，而非选定层面模糊不清。
....
`
      },
      XTEST: {
        preText: `1.药物代谢与反应个体差异的重要原因为
A.环境
B.遗传
C.年龄
D.体重
E.性别
2.异烟肼、普鲁卡因胺、磺胺类药物在体内会发生什么转化
A.乙酰化
B.甲基化
C.磷酸化
D.酯化
E.硫酸化`,
        answerPlaceHolder: `1.AB
2.ACD
3.BC
...`,
        explianPlaceHolder: `1.两对映异构体活性不同。
....
`
      },
      PDTEST: {
        preText: `1.钓鱼岛是中国的。
2.北回归线位置为23° 26N。`,
        answerPlaceHolder: `1.对
2.对
3.错
...
`,
        explianPlaceHolder: `1.北回归线（Tropic of Cancer），是太阳的光线在北半球能够直射到的离赤道最远的位置，是一条纬线。也就是地球绕太阳公转所绕成平面与地球赤道面所成的最大角度，也是黄赤交角的角度。1976 年第 16 届国际天文学联合会上，决定将 2000 年的回归线位置定为（23° 26′ 21.488″ N）。
....
`
      },
      A3TEST: {
        preText: `男，25岁，突感上腹部剧痛。检查：血压130／80mmHg，脉搏110次／分，板样腹，肠鸣音消失。血红蛋白120g／L，血白细胞数8．O×10。／L 
[组合单选] 
1.首先应采取的检查为 
A.腹部立位X线平片 
B.腹部B超 
C.腹腔穿刺 
D.腹部MRI 
E.腹部CT 
2.以下提示病情危险的是 
A.恶心、呕吐频繁 
B.体温持续升高，寒战 
C.脉搏加快，体温上升 
D.腹痛加重，大汗淋漓 
E.脉搏加快，体温下降 
[组合多选] 
3.若腹穿抽出较多液体，应尽早采取的治疗措施是 
A.胃肠减压、输液 
B.镇痛镇静治疗 
C.全量应用抗生素 
D.输液、纠正水电和酸碱失衡
男，18岁，发热3天伴纳差2天急诊。检查：血压114／70mmHg，左脚拇趾甲沟部红肿破溃，血白细胞计数为20×lO。／L，中性粒细胞为89％ 
[组合单选] 
4.初步诊断是 
A.左拇趾甲沟炎 
B.左拇趾坏疽 
C.左侧小腿丹毒 
D.左小腿蜂窝织炎 
E.感染性休克 
[组合多选] 
5.左拇趾经切开引流处理后应给予 
A.大剂量青霉素
B.激素 
C.退热剂 
D.庆大霉素 
E.维生素 
6.经处理3天后病人体温升高，且血压和血小板计数下降，此时病人可能合并有 
A.败血症 
B.DIC 
C.感染性休克 
D.多器官衰竭 
E.菌血症`,
        answerPlaceHolder: `1.A
2.BC
3.AB
4.A
5.B
6.AB
...`,
        explianPlaceHolder: `1.碘化油常用于支气管、瘘管与子宫输卵管的造影等；泛影葡胺、优堆显多用于血管造影：硫酸钡主要用于食管及胃肠造影。
....
`
      },
      JDTEST: {
        preText: `1.试述小儿头皮静脉穿刺时常选用的静脉及各静脉有何解剖特点。
2.何谓血压?血压受哪些因素影响?`,
        answerPlaceHolder: `1.小儿头皮静脉穿刺时常选用的静脉有颞浅静脉、耳后静脉、前额静脉等。其解剖特点如下。①颞浅静脉：位于两侧颞部、收集颅顶头皮的血液，汇入面后静脉；②耳后静脉：起自颅顶后部的静脉丛，向下汇入颈外静脉，在耳郭后方与同名动脉伴行；③前额静脉：在冠状缝处起于静脉丛，向上沿额骨表面垂直下降汇入面前静脉。头皮静脉穿刺应沿静脉向心方向刺入。 
2.血压是指血管内流动的血液对单位面积血管壁的侧压力。通常所说的血压是指动脉血压。影响因素有：①心输出量，主要影响收缩压；②外周阻力，主要影响舒张压；③大动脉弹性，主要影响脉压；④心率；⑤血量／血管容量比值。
...
`,
        explianPlaceHolder: `1.透视、摄片、B超不能确诊，CT检查较普及，操作简单易行，脑血管造影麻烦、费用高。
....`
      },
      TKTEST: {
        preText: `1.食管的第三狭窄位于食管裂孔处，相当于第_______胸椎平面，距中切牙约_______Cm。 
2.脓毒血症是指______________侵入血流，并在其中大量繁殖，通过血流到达全身各组织或脏器而引起新的_____________。`,
        answerPlaceHolder: `1.10&十|40&四十 
2.化脓性细菌|化脓性病灶
...
`,
        answerSet: `1.完全一致
2.顺序可打乱
....
`,
        explianPlaceHolder: `1．正侧位，必要时还有斜位、切线位、轴位等，应包绕周围的软组织，对称的结构必要时双侧对照，必须包含邻近一个关节，好确定其部位。
....
`
      }
    }
  },
  mutations: {
    storePartInputData: function (state, data) {
      // console.log(state, data)
      for (const i in data) {
        state.partInputData[data.testType][i] = data[i]
      }
      let localData = localStorage.getItem(ADDTESTLOCALDATA)
      if (localData) {
        localData = JSON.parse(localData)
        localData.hasSubmit = false
        localData.partImPortData = state.partInputData
        localStorage.setItem(ADDTESTLOCALDATA, JSON.stringify(localData))
      } else {
        const setData = {
          hasSubmit: false,
          partImPortData: state.partInputData,
          mergeImportData: {}
        }
        localStorage.setItem(ADDTESTLOCALDATA, JSON.stringify(setData))
      }
    },
    clearStoreData: function (state) {
      state.partInputData = {
        ATEST: {
          testType: 'ATEST',
          lineArea: '1\n',
          lineAreaCols: 1,
          contentArea: '',
          answer: '',
          explain: ''
        },
        XTEST: {
          testType: 'XTEST',
          lineArea: '1\n',
          lineAreaCols: 1,
          contentArea: '',
          answer: '',
          explain: ''
        },
        PDTEST: {
          testType: 'PDTEST',
          lineArea: '1\n',
          lineAreaCols: 1,
          contentArea: '',
          answer: '',
          explain: ''
        },
        A3TEST: {
          testType: 'A3TEST',
          lineArea: '1\n',
          lineAreaCols: 1,
          contentArea: '',
          answer: '',
          explain: ''
        },
        JDTEST: {
          testType: 'JDTEST',
          lineArea: '1\n',
          lineAreaCols: 1,
          contentArea: '',
          answer: '',
          explain: ''
        },
        TKTEST: {
          testType: 'TKTEST',
          lineArea: '1\n',
          lineAreaCols: 1,
          contentArea: '',
          answer: '',
          answerSet: '',
          explain: ''
        }
      }
    },
    storePaperID: function (state, paperID) {
      state.paperID = paperID
    }
  }
}
export default addTest
