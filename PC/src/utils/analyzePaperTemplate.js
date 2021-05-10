/* eslint-disable */

let errorMsg = null;

var layer = {
    alert: function (s) {
        if (errorMsg == null) {
            errorMsg = s + '\n';
        } else {
            errorMsg += s + '\n';
        }
    }
}

var _testJson = {"SrcID": "", "SbjID": "", "CptID": "", "StyleItems": []}; //最后提交的试题JSON

/**
 * 处理模板一
 * @description 题型题目、答案、解析分开导题
 * @author tfj
 * @date 2019-05-09 08:54:14
 * @version V1.0.0
 */
function analyzeTemplate1(dataObj){

    _testJson = {"SrcID": "", "SbjID": "", "CptID": "", "StyleItems": []};  //清空_testJson数据

    //  A题型（单选）
    var testContext01 = ('\n' + dataObj.ATEST.contentArea).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的单选试题
    var testContext011 = ('\n' + dataObj.ATEST.answer).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的单选答案
    var testContext0111 = ('\n' + dataObj.ATEST.explain).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的单选解析

    if(_analyzeAtestTest(testContext01, testContext011, testContext0111) === -1) return -1;

    //  X题型（多选）
    var testContext02 = ('\n' + dataObj.XTEST.contentArea).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的多选试题
    var testContext022 = ('\n' + dataObj.XTEST.answer).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的多选答案
    var testContext0222 = ('\n' + dataObj.XTEST.explain).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的多选解析

    if(_analyzeXtestTest(testContext02, testContext022, testContext0222) === -1) return -1;

    //  PD题型（判断）
    var testContext03 = ('\n' + dataObj.PDTEST.contentArea).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的判断试题
    var testContext033 = ('\n' + dataObj.PDTEST.answer).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的判断答案
    var testContext0333 = ('\n' + dataObj.PDTEST.explain).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的判断解析

    if(_analyzePDtestTest(testContext03, testContext033, testContext0333) === -1) return -1;

    // A3题型（组合）
    var testContext04 = ('\n' + dataObj.A3TEST.contentArea).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的组合试题
    testContext04 = testContext04.replace(/\n\s*［(\s*组合单选\s*|\s*组合多选\s*)］/g, (_, nodeName) => {
        return `\n[${nodeName}]`
    });
    var testContext044 = ('\n' + dataObj.A3TEST.answer).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的组合答案
    var testContext0444 = ('\n' + dataObj.A3TEST.explain).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的组合解析

    if(_analyzeA3testTest(testContext04, testContext044, testContext0444) === -1) return -1;

    // 简答题
    var testContext05 = ('\n' + dataObj.JDTEST.contentArea).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的简答试题
    var testContext055 = ('\n' + dataObj.JDTEST.answer).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的简答答案
    var testContext0555 = ('\n' + dataObj.JDTEST.explain).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的简答解析

    if(_analyzeJDtestTest(testContext05, testContext055, testContext0555) === -1) return -1;
    // 填空题
    var testContext06 = ('\n' + dataObj.TKTEST.contentArea).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的填空试题
    var testContext066 = ('\n' + dataObj.TKTEST.answer).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的填空答案
    var testContext0666 = ('\n' + dataObj.TKTEST.explain).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');	//录入的填空解析
    var testContext06666 = ('\n' + dataObj.TKTEST.answerSet).replace(/．/g, '.').replace(/\n[\n\s]+/g, '\n');

    if(_analyzeTKtestTest(testContext06, testContext066, testContext0666, testContext06666) === -1) return -1;
}

/**
 * 处理模板二
 * @description 题型题目、答案、解析合并导题
 * @author tfj
 * @date 2019-05-09 08:54:14
 * @version V1.0.0
 */
function analyzeTemplate2(content){
    _testJson = {"SrcID": "", "SbjID": "", "CptID": "", "StyleItems": []};  //清空_testJson数据
    var testContext = ('\n' + content + '\n').replace(/．/g, '.').replace(/\n+/g, '\n');

    testContext = testContext.replace(/\n\s*［(\s*试题答案\s*|\s*单选题\s*|\s*多选题\s*|\s*判断题\s*|\s*组合题\s*|\s*简答题\s*|\s*填空题\s*|\s*组合单选\s*|\s*组合多选\s*|\s*解析\s*)］/g, (_, nodeName) => {
        return `\n[${nodeName}]`
    });

    testContext = testContext.replace(/\n\s*\[(\s*试题答案\s*|\s*单选题\s*|\s*多选题\s*|\s*判断题\s*|\s*组合题\s*|\s*简答题\s*|\s*填空题\s*|\s*组合单选\s*|\s*组合多选\s*|\s*解析\s*)\]/g, (_, nodeName) => {
        return `\n[${nodeName}]`
    });

    //  判断是否有答案标签
    if(! /\[\s*试题答案\s*\]/.test(testContext)){
        layer.alert('没有[试题答案]标签');
        return -1;
    }

    //  检测是否有试题标签
    if(! /\n\s*(?:\[单选题\]|\[多选题\]|\[判断题\]|\[填空题\]|\[简答题\]|\[组合题\])/.test(testContext)){
        layer.alert('没有试题标签!');
        return -1;
    }

    // 判断题号试题重复


    //  切分试题，答案，解析
    var testContext01,testContext011,testContext0111,testContext02,testContext022,testContext0222,testContext03,testContext033,testContext0333,
        testContext04,testContext044,testContext0444,testContext05,testContext055,testContext0555,testContext06,testContext066,testContext0666;

    //  统一赋值为'\n'
    testContext01=testContext011=testContext0111=testContext02=testContext022=testContext0222=testContext03=testContext033=testContext0333=testContext04=testContext044=testContext0444=testContext05=testContext055=testContext0555=testContext06=testContext066=testContext0666='\n';

    var ansContent, expContent;
    var tipArr = testContext.match(/\n\s*(?:\[单选题\]|\[多选题\]|\[判断题\]|\[填空题\]|\[简答题\]|\[组合题\]|\[试题答案\]|\[解析\])/g);
    for (var i = 0; i < tipArr.length; i++) {
        const elem = tipArr[i].trim();
        var regTestPart = new RegExp(elem.replace(/[\[\]]/g, '\\$&')+'\\s*(\\n(?:.|\\n|\\s)*?\\n)(?=\\[|$)');
        switch (elem) {
            case '[单选题]':
                testContext01 = regTestPart.exec(testContext)[1];
                break;
            case '[多选题]':
                testContext02 = regTestPart.exec(testContext)[1];
                break;
            case '[判断题]':
                testContext03 = regTestPart.exec(testContext)[1];
                break;
            case '[组合题]':
                regTestPart = new RegExp(elem.replace(/[\[\]]/g, '\\$&')+'\\s*(\\n(?:.|\\n|\\s)*?\\n)(?=\\[(?!组合)|$)');
                testContext04 = regTestPart.exec(testContext)[1];
                break;
            case '[简答题]':
                testContext05 = regTestPart.exec(testContext)[1];
                break;
            case '[填空题]':
                testContext06 = regTestPart.exec(testContext)[1];
                break;
            case '[试题答案]':
                ansContent = regTestPart.exec(testContext)[1];
                break;
            case '[解析]':
                var result = regTestPart.exec(testContext);
                if(result){
                    expContent = result[1];
                }
                break;
            default:
                break;
        }
    }

    testContext011 = _getAnsOrExp(testContext01, ansContent);
    testContext0111 = _getAnsOrExp(testContext01, expContent);
    testContext022 = _getAnsOrExp(testContext02, ansContent);
    testContext0222 = _getAnsOrExp(testContext02, expContent);
    testContext033 = _getAnsOrExp(testContext03, ansContent);
    testContext0333 = _getAnsOrExp(testContext03, expContent);
    testContext044 = _getAnsOrExp(testContext04, ansContent);
    testContext0444 = _getAnsOrExp(testContext04, expContent);
    testContext055 = _getAnsOrExp(testContext05, ansContent);
    testContext0555 = _getAnsOrExp(testContext05, expContent);
    testContext066 = _getAnsOrExp(testContext06, ansContent);
    testContext0666 = _getAnsOrExp(testContext06, expContent);

    if(_checkTestNO(testContext01+testContext02+testContext03+testContext04+testContext05+testContext06, ansContent, '') == -1) return -1;

    if(_analyzeAtestTest(testContext01, testContext011, testContext0111) === -1) return -1; //单选

    if(_analyzeXtestTest(testContext02, testContext022, testContext0222) === -1) return -1; //多选

    if(_analyzePDtestTest(testContext03, testContext033, testContext0333) === -1) return -1;    //判断

    if(_analyzeA3testTest(testContext04, testContext044, testContext0444) === -1) return -1;    //组合

    if(_analyzeJDtestTest(testContext05, testContext055, testContext0555) === -1) return -1;    //简答

    if(_analyzeTKtestTest(testContext06, testContext066, testContext0666) === -1) return -1;    //填空
}

/**
 * 处理解析(2020/03/10 新增答案判断设置解析)
 * @param {string} testContent 试题内容
 * @param {string} explainContent 解析内容
 * @param {string} type 解析类型 explain / answerType 答案判断类型（填空题）
 * @author tfj
 * @date 2019-05-09 08:44:59
 * @version V1.0.0
 */
function _explainFormat(testContent, explainContent, type) {
    type = type || 'explain';

    if (testContent === '\n') {  //  没有试题
        let explain = '\n'
        return  explain;
    } else {
        var testarr = testContent.match(/\n\s*[1-9][0-9]*(\.|。|、|,|，)/g);

        var ExplainArr = explainContent.split('\n');
        var tt = [];
        for (let y in ExplainArr) {
            if(!ExplainArr[y].match(/^\s*[1-9][0-9]*(\.|。|、|,|，)/)) continue;
            tt.push(ExplainArr[y]);
        }

        if(!testarr){
            layer.alert('试题为空！注意题号加“.”');
            return -1;
        }

        //2020/03/10 内容排序(乱序可以导入)
        tt = tt.sort(function(a, b) {
            var aNo = a.match(/\s*[1-9][0-9]*/);
            var bNo = b.match(/\s*[1-9][0-9]*/);
            aNo = parseInt(aNo);
            bNo = parseInt(bNo);
            return aNo - bNo;
        });
        //2020/03/10

        var explaintemp = testarr;//临时解析
        if (tt) {
            for (let x in testarr) {
                if (tt.length > 0) {
                    if (testarr[x].trim().match(/\s*[1-9][0-9]*/).toString() === tt[0].trim().match(/\s*[1-9][0-9]*/).toString()) {
                        var xuhao = tt[0].trim().match(/\s*[1-9][0-9]*/).toString();
                        var exp = tt[0].replace(/\s+/g, "").replace(/^\s*[1-9][0-9]*(\.|。|、|\,|\，)*/, "");

                        if(type === 'answerType'){
                            if(exp !== '完全一致' && exp !== '顺序可打乱'){
                                layer.alert('第' + xuhao + '题答案判断类型错误！（可选：完全一致 或 顺序可打乱）');
                                return -1;
                            }
                        }

                        explaintemp[x] = '\n' + xuhao + '.' + exp;
                        tt.shift();
                    } else {
                        explaintemp[x] = explaintemp[x].replace(/[。|、|,|，]/g, ".");
                        if(type === 'answerType') explaintemp[x] = explaintemp[x] + '完全一致';
                    }
                } else {
                    explaintemp[x] = explaintemp[x].replace(/[。|、|,|，]/g, ".");
                    if(type === 'answerType') explaintemp[x] = explaintemp[x] + '完全一致';
                }
            }

        }
        // explArr = explaintemp;
        let explain = explaintemp.join("");
        return explain
    }
}


/**
 * 检测题号
 * @param {string} testContent  试题信息
 * @param {string} ansContent   答案内容
 * @param {string} testType 试题类型eg:单选题
 * @description
 * @author tfj
 * @date 2019-05-10 11:01:32
 * @version V1.0.0
 */
function _checkTestNO(testContent, ansContent, testType){

    //  单选题是否有试题答案
    var regTA = new RegExp(/\n\s*([1-9][0-9]*)(?:\.|。|，|、)/g);
    var testNumArr = [];
    var ansNumArr = [];
    var tempArr = [];

    //  获取题目题号
    while (tempArr=regTA.exec(testContent)) {
        testNumArr.push(tempArr[1]);
    }
    //  获取答案题号
    while (tempArr=regTA.exec(ansContent)) {
        ansNumArr.push(tempArr[1]);
    }

    if(testNumArr.length == 0 && ansNumArr.length == 0){  //  没有录入
        return 0;
    }

    if(testNumArr.length == 0){
        layer.alert(testType+'题目内容为空，有答案！');
        return -1;
    }

    if(ansNumArr.length == 0){
        layer.alert(testType+'题目答案为空，有题目！');
        return -1;
    }

    // 有些浏览器不支持ES
    // var testNumArrSort = testNumArr.map(Number).sort((a,b) => a-b);     //题号排序
    // var ansNumArrSort = ansNumArr.map(Number).sort((a,b) => a-b);       //答案排序

    var testNumArrSort = testNumArr.map(Number).sort(function(a,b){return a-b;});     //题号排序
    var ansNumArrSort = ansNumArr.map(Number).sort(function(a,b){return a-b;});       //答案排序


    var lenTmp = testNumArrSort.length > ansNumArrSort.length ? testNumArrSort.length : ansNumArrSort.length;   //取数组长度较长的进行循环

    for (var idx = 0; idx < lenTmp; idx++) {
        if (testNumArrSort[idx + 1] && testNumArrSort[idx] === testNumArrSort[idx + 1]) {
            layer.alert(testType+'第' + testNumArrSort[idx] + '题题干的题号重复！');
            return -1;
        }
        if (ansNumArrSort[idx + 1] && ansNumArrSort[idx] === ansNumArrSort[idx + 1]) {
            layer.alert(testType+'第' + testNumArrSort[idx] + '题答案的题号重复！');
            return -1;
        }
        if (testNumArrSort[idx] > ansNumArrSort[idx]) {
            layer.alert(testType+'第' + ansNumArrSort[idx] + '题有答案无题目！');
            return -1;
        } else if (!ansNumArrSort[idx]) {
            layer.alert(testType+'第' + testNumArrSort[idx] + '题有题目无答案！');
            return -1;
        }
        if (testNumArrSort[idx] < ansNumArrSort[idx]) {
            layer.alert(testType+'第' + testNumArrSort[idx] + '题有题目无答案！');
            return -1;
        } else if (!testNumArrSort[idx]) {
            layer.alert(testType+'第' + ansNumArrSort[idx] + '题有答案无题目！');
            return -1;
        }
    }
}

/**
 * 检测选项
 * @description
 * @param {string} testNO 题号
 * @param {string} testTyle 试题题型|"单选"
 * @author tfj
 * @date 2019-05-09 10:58:12
 * @version V1.0.0
 */
function _checkSelectedItems(testNO, testContext, testTyle){
        var reg = new RegExp('\\n\\s*'+testNO+'(?:\\.|、|。).*(\\n\\s*[A-Za-z](?:.|\\n)*?)\\n(?!\\s*[A-Za-z][\\.。、])');
        var testRegArr = reg.exec(testContext+'\n');
        var selectItemsStr = null;  //  选项字符串
        if(testRegArr && testRegArr.length > 1){
            selectItemsStr = testRegArr[1];
        }
        if(selectItemsStr == null){
            if(new RegExp('\\n\\s*'+testNO+'(?:\\.|、|。).*(\\n\\s*[A-Za-zＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ](?:.|\\n)*?)\\n(?!\\s*[A-Za-zＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ][\\.。、])').test(testContext+'\n')){
                layer.alert(testTyle + '第' + testNO + '题选项题号存在全角英文字母！');
                return -1;
            }
            layer.alert(testTyle + '第' + testNO + '题选项为空！选项号注意加“.”');
            return -1;
        }

        //获取试题选项号组成数组 如 ['A','B']。
        var selectNOArrTmp = [];
        var regTNO = new RegExp(/\n\s*([A-Za-z])(?:\.|。|、)*/g);
        var resultNO = null;
        while (resultNO=regTNO.exec(selectItemsStr)) {
            selectNOArrTmp.push(resultNO[1].toUpperCase());
        }
        selectNOArrTmp = selectNOArrTmp.sort();

        //判断选项是否少于2个
        if(selectNOArrTmp.length < 2){
            layer.alert(testTyle + '第' + testNO + '题选项少于两个！');
            return -1;
        }

        //判断第一个选项是否是A
        if(selectNOArrTmp[0].charCodeAt(0) != 65){
            layer.alert(testTyle + '第' + testNO + '题选项第一个选项不是“A”！');
            return -1;
        }

        //判断选项是否逐级书写
        for (var i1 = 0; i1 < selectNOArrTmp.length - 1; i1++) {
            if ((selectNOArrTmp[i1].charCodeAt(0) + 1) != (selectNOArrTmp[i1 + 1].charCodeAt(0))) {
                layer.alert(testTyle + '第' + testNO + '题选项没有按ABCD逐级书写！');
                return -1;
            }
        }

        if(selectNOArrTmp.length > 26){
            layer.alert(testTyle + '第' + testNO + '题选项个数过多！');
            return -1;
        }

        var selectItems = [];
        var selectItemsArr = selectItemsStr.split('\n');
        for (var i = 0; i < selectItemsArr.length; i++) {
            var elem = selectItemsArr[i];
            if(elem.toString().trim() == '') continue;

            // 不使用ES6特性
            // elem = elem.trim().replace(/^\s*([A-Za-z])/, m => m.toUpperCase());     //选项小写换大写
            elem = elem.trim().replace(/^\s*([A-Za-z])/, function(m){ return m.toUpperCase(); });     //选项小写换大写
            elem = elem.replace(/^\s*([A-Z])(?:\。|\、|\,|\，)/m, '$1.');

            var ItemName = elem.match(/^\s*([A-Z])/)[1];
            var Content = elem.match(/^\s*[A-Z]\.?(.*)$/)[1];

            if(Content.trim() == ''){
                layer.alert(testTyle + '第' + testNO + '题选项'+ItemName+'内容为空！');
                return -1;
            }

            // 不适用ES6特性
            // var selectItem = {ItemName, Content};
            var selectItem = {ItemName: ItemName, Content: Content};

            selectItems.push(selectItem);
        }

        // console.log(selectItems);
        return selectItems;
}

/**
 * 检查答案（检查单选，多选，A3题型，B题型答案）
 * @description
 * @param {string} testNO 题号
 * @param {string} subType 选项类型（单选，多选）
 * @param {Array} selectItems 选项数组
 * @param {string} ansContent 答案内容（用户填写的）
 * @param {string} testType 试题题型|"单选"
 * @author tfj
 * @date 2019-05-09 11:32:12
 * @version V1.0.0
 */
function _checkAnswer(testNO, subType, selectItems, ansContent, testTyle){

    var reg = new RegExp('\\n\\s*'+testNO+'(?:。|、|,|，|\\.)(.*?)$','m');
    var answerStr = reg.exec(ansContent)[1].trim();

    if(answerStr == ''){
        layer.alert(testTyle + '第' + testNO + '题答案为空！');
        return -1;
    }

    if(!/^\s*[A-Z\s]+$/.test(answerStr)){
        layer.alert(testTyle + '第' + testNO + '题答案格式不正确（只能使用A-Z）！');
    }

    //判断答案选项是否在题目中的选项存在
    var ansArr = answerStr.split('');

    //  不使用ES6特性
    // ansArr = ansArr.filter(m => m.trim());   //  去掉空格元素
    ansArr = ansArr.filter(function(m){ return m.trim() });   //  去掉空格元素
    ansArr = ansArr.sort().filter(function(val,idx,arr){ return !arr[idx+1] || arr[idx+1] != val});    //排序答案去重

    for (var i = 0; i < ansArr.length; i++) {
        const ans = ansArr[i];
        var isExist = false;
        for (var j = 0; j < selectItems.length; j++) {
            const selectItem = selectItems[j];
            if(selectItem.ItemName == ans.trim()){
                isExist = true;
            }
        }
        if(!isExist){
            layer.alert(testTyle + '第' + testNO + '题答案'+ ans +'不在题目的选项中！');
            return -1;
        }
    }

    if(subType == 'ATEST'){
        if(ansArr.length > 1){
            layer.alert(testTyle + '第' + testNO + '题是单选题，不能设置多个答案！');
                return -1;
        }

        return ansArr.join('');
    }
    // else if(subType == 'XTEST'){
    //     if(ansArr.length == 1){
    //         layer.alert(testTyle + '第' + testNO + '题是多选题，不能只有一个答案！');
    //         return -1;
    //     }
    //     return ansArr.join('');
    // }
    return ansArr.join('');
}

/**
 * 获取答案或解析
 * @param {string} testContent 试题信息
 * @param {string} AEContent 答案或者解析
 * @description 导题模式2 根据试题获取答案或解析
 * @author tfj
 * @date 2019-05-10 10:06:55
 * @version V1.0.0
 */
function _getAnsOrExp(testContent, AEContent){

        if(testContent.trim() == '' || !AEContent || AEContent.trim() == ''){
            return '\n';
        }

    var testNOs = testContent.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/g);
    var aeNOs = AEContent.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/g);

    var aes = [];
    for (var i = 0; i < testNOs.length; i++) {
        const elem = testNOs[i];
        const testNO = elem.match(/\n\s*[1-9][0-9]*/)[0].trim();
        for (var j = 0; j < aeNOs.length; j++) {
            const elem1 = aeNOs[j];
            const aeNO = elem1.match(/\n\s*[1-9][0-9]*/)[0].trim();
            if(testNO == aeNO){
                var reg = new RegExp('\\n\\s*'+aeNO+'.*$','m');
                aes.push(reg.exec(AEContent)[0]);
            }
        }
    }

    if(aes.length == 0){
        return '\n';
    }

    return aes.join('');
}

/**
 * 设置解析
 * @description
 * @param {string} expContent 解析内容
 * @param {string} testNO 题号
 * @author tfj
 * @date 2019-05-09 11:58:11
 * @version V1.0.0
 */
function _setExplain(expContent, testNO){
    var ExplArr = expContent.split('\n');
    var Explain = null;
    ExplArr && ExplArr.forEach( function(exp) {
        if(exp && exp.toString().trim() && exp.toString().match(/\s*[1-9][0-9]*/)[0].trim() == testNO){
            Explain = exp.replace(/\s*[1-9][0-9]*(\.|。|、)*/, '');
        }
    });
    return Explain;
}
/**
 * 检查题号是否加“.”
 * @param {String} testContent
 * @description
 * @author tfj
 * @date 2019-05-22 16:34:39
 * @version V1.0.0
 */
function _checkTestNOisDot(testContent, testType){

    // 获取有效题号
    // var aTArr = testContent.match(/\n\s*[1-9][0-9]*[\.。，、](.|\n)+?(?=\n\s*[A-Za-z](?:.))/g);
    var aTArr = testContent.match(/\n\s*[1-9][0-9]*[\.。，、].+/g);
    var testNOs = [];

    for (var idx = 0; idx < aTArr.length; idx++) {
        const elem = aTArr[idx];
        var testNO = elem.match(/\n\s*[1-9][0-9]*/)[0].trim();
        testNOs.push(testNO);
    }


    // 获取无效题号
    var regTA = new RegExp(/\n\s*([1-9][0-9]*)(?![\.．。，、])(?![0-9]).*\n/g);
    var testNumArr = [];
    var tempArr = null;
    while (tempArr=regTA.exec(testContent)) {
        testNumArr.push(tempArr[1]);
    }

    if(testNumArr && testNumArr[0] && !testNOs.includes(testNumArr[0])){
        layer.alert(testType+'第'+testNumArr[0]+'题题号请加“.”！');
        return -1;
    }
}

/**
 * 解析单选题
 * @description
 * @param {string} testContext01 录入的单选试题
 * @param {string} testContext011 录入的单选答案
 * @param {string} testContext0111 录入的单选解析
 * @author tfj
 * @date 2019-05-09 09:42:36
 * @version V1.0.0
 */
function _analyzeAtestTest(testContext01, testContext011, testContext0111){
    testContext0111 = _explainFormat(testContext01, testContext0111);
    if(testContext0111 === -1){
        return -1;
    }

    var flag = _checkTestNO(testContext01, testContext011, '单选题');
    if(flag === 0 || flag === -1){
        return flag;
    }

    var flag2 = _checkTestNOisDot(testContext01, '单选题');
    if(flag2 === -1){
        return flag2;
    }

    var ATestArr = [];   //单选题信息

    var aTArr = testContext01.match(/\n\s*[1-9][0-9]*[\.。，、].+/g);    // 拿 题目

    for (var idx = 0; idx < aTArr.length; idx++) {
        const elem = aTArr[idx];
        var testNO = elem.match(/\n\s*[1-9][0-9]*/);

        //  处理题目
        var Title = elem.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
        if(Title == ''){
            layer.alert('单选题第' + testNO + '题题目内容为空！');
            return -1;
        }

        //  设置解析
        var Explain = _setExplain(testContext0111, testNO[0].trim());

        //  设置选项
        var selectItems = _checkSelectedItems(testNO[0].trim(), testContext01, '单选');
        if(selectItems === -1) return -1;

        //  设置答案
        var ans = _checkAnswer(testNO[0].trim(), 'ATEST', selectItems, testContext011, '单选');
        if(ans === -1) return -1;

        var test = {
            "AllTestID": '',
            "ATestID": '',
            "Difficulty": '',
            "BookTestNo": testNO[0].trim(),
            "Title": Title,
            "Explain": Explain,
            "Type": 'ATEST',
            "SubType": '单选题',
            "SelectedItems": selectItems,
            "Answer": ans,
            "TestPoint": "",
            "IsFav": 0,
            "UserNoteContent": ""
        }

        ATestArr.push(test);   //  添加题目到题目数组中

    }

    // console.log('ATestArr:',ATestArr);

    var styleObj = {
        "StyleID": "1",
        "Style": "单选题",
        "Explain": "单项选择题",
        "Score": "",
        "Type": "ATEST",
        "TestCount": "",
        "TestItems": ATestArr
    };

    // console.log(styleObj);
    _testJson.StyleItems.push(styleObj);

}

/**
 * 解析多选题
 * @description
 * @param {string} testContext02 录入的多选试题
 * @param {string} testContext022 录入的多选答案
 * @param {string} testContext0222 录入的多选解析
 * @author tfj
 * @date 2019-05-09 09:42:36
 * @version V1.0.0
 */
function _analyzeXtestTest(testContext02, testContext022, testContext0222){
    testContext0222 = _explainFormat(testContext02, testContext0222);
    if(testContext0222 === -1){
        return -1;
    }

    var flag = _checkTestNO(testContext02, testContext022, '多选题');
    if(flag === 0 || flag === -1){
        return flag;
    }

    var flag2 = _checkTestNOisDot(testContext02, '多选题');
    if(flag2 === -1){
        return flag2;
    }

    var XTestArr = [];   //多选题信息

    var xTArr = testContext02.match(/\n\s*[1-9][0-9]*[\.。，、].+/g);    // 拿 题目

    for (var idx = 0; idx < xTArr.length; idx++) {
        const elem = xTArr[idx];
        var testNO = elem.match(/\n\s*[1-9][0-9]*/);

        //  处理题目
        var Title = elem.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
        if(Title == ''){
            layer.alert('多选题第' + testNO + '题题目内容为空！');
            return -1;
        }

        //  设置解析
        var Explain = _setExplain(testContext0222, testNO[0].trim());

        //  设置选项
        var selectItems = _checkSelectedItems(testNO[0].trim(), testContext02, '多选');
        if(selectItems === -1) return -1;

        //  设置答案
        var ans = _checkAnswer(testNO[0].trim(), 'XTEST', selectItems, testContext022, '多选');
        if(ans === -1) return -1;

        var test = {
            "AllTestID": '',
            "ATestID": '',
            "Difficulty": '',
            "BookTestNo": testNO[0].trim(),
            "Title": Title,
            "Explain": Explain,
            "Type": 'XTEST',
            "SubType": '多选题',
            "SelectedItems": selectItems,
            "Answer": ans,
            "TestPoint": "",
            "IsFav": 0,
            "UserNoteContent": ""
        }

        XTestArr.push(test);   //  添加题目到题目数组中

    }

    // console.log('XTestArr:',XTestArr);

    var styleObj = {
        "StyleID": "2",
        "Style": "多选题",
        "Explain": "多项选择题",
        "Score": "",
        "Type": "XTEST",
        "TestCount": "",
        "TestItems": XTestArr
    };

    // console.log(styleObj);
    _testJson.StyleItems.push(styleObj);

}

/**
 * 解析判断题
 * @description
 * @param {string} testContext03 录入的判断试题
 * @param {string} testContext033 录入的判断答案
 * @param {string} testContext0333 录入的判断解析
 * @author tfj
 * @date 2019-05-09 09:42:36
 * @version V1.0.0
 */
function _analyzePDtestTest(testContext03, testContext033, testContext0333){
    testContext0333 = _explainFormat(testContext03, testContext0333);
    if(testContext0333 === -1){
        return -1;
    }

    var flag = _checkTestNO(testContext03, testContext033, '判断题');
    if(flag === 0 || flag === -1){
        return flag;
    }

    var flag2 = _checkTestNOisDot(testContext03, '判断题');
    if(flag2 === -1){
        return flag2;
    }

    var checkPDAnswer = function(testNO, ansContent){
        var reg = new RegExp('\\n\\s*'+testNO+'(?:。|、|,|，|\\.)(.*?)$','m');
        var answerStr = reg.exec(ansContent)[1];
        answerStr && (answerStr = answerStr.trim());

        if(!answerStr){
            layer.alert('判断题第' + testNO + '题有试题答案为空！');
            return -1;
        }

        if(!/(?:对|错)/.test(answerStr)){
            layer.alert('判断题第' + testNO + '题有试题答案格式错误，只能是“对”或“错”！');
            return -1;
        }

        answerStr = answerStr.match(/对|错/g);
        var answer = null;

        if(answerStr.length > 1){
            layer.alert('判断题第' + testNO + '题有试题答案有多个！');
            return -1;
        }

        if(answerStr){
            answer = answerStr[0];
        }

        if(answer == null){
            layer.alert('判断题第' + testNO + '题有试题答案错误！');
            return -1;
        }
        return answer;
    }

    var PDTestArr = [];   //判断题信息

    var pdTArr = testContext03.match(/\n\s*[1-9][0-9]*[\.|。|,|，|、].+/g);    // 拿 题目

    for (var idx = 0; idx < pdTArr.length; idx++) {
        const elem = pdTArr[idx];
        var testNO = elem.match(/\n\s*[1-9][0-9]*/);

        //  处理题目
        var Title = elem.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
        if(Title == ''){
            layer.alert('判断第' + testNO + '题题目内容为空！');
            return -1;
        }

        //  设置解析
        var Explain = _setExplain(testContext0333, testNO[0].trim());

        //  设置答案
        var ans = checkPDAnswer(testNO[0].trim(), testContext033);
        if(ans === -1) return -1;

        var test = {
            "AllTestID": '',
            "PDTestID": '',
            "Difficulty": '',
            "BookTestNo": testNO[0].trim(),
            "Title": Title,
            "Explain": Explain,
            "Type": 'PDTEST',
            "SubType": '判断题',
            "SelectedItems": [],
            "Answer": ans,
            "TestPoint": "",
            "IsFav": 0,
            "UserNoteContent": ""
        }

        PDTestArr.push(test);   //  添加题目到题目数组中

    }

    // console.log('XTestArr:',XTestArr);

    var styleObj = {
        "StyleID": "7",
        "Style": "判断题",
        "Explain": "判断选择题",
        "Score": "",
        "Type": "PDTEST",
        "TestCount": "",
        "TestItems": PDTestArr
    };

    // console.log(styleObj);
    _testJson.StyleItems.push(styleObj);

}

/**
 * 解析A3题型
 * @param {string} testContext04 录入的组合试题
 * @param {string} testContext044 录入的组合答案
 * @param {string} testContext0444 录入的组合解析
 * @author tfj
 * @date 2019-05-09 08:56:39
 * @version V1.0.0
 */
function _analyzeA3testTest(testContext04, testContext044, testContext0444){

    testContext0444 = _explainFormat(testContext04, testContext0444);
    if(testContext0444 === -1){
        return -1;
    }

    var flag = _checkTestNO(testContext04, testContext044, '组合题');
    if(flag === 0 || flag === -1){
        return flag;
    }

    var bigIssueArr = [];   //大题信息

    var bsArr = testContext04.match(/\n\s*(?![A-Za-z][\.。,，、]).+/g);    // 拿 题干，小题，[组合单选]， [组合多选]

    var lastType = null; //  小题类型标签
    for (var idx = 0; idx < bsArr.length; idx++) {
        const elem = bsArr[idx];
        if(elem.search(/\n\s*\[组合/) === -1 && elem.search(/\n\s*[1-9][0-9]*(?:\.|、|。)/) === -1){  //  大题题目（题干）
            var testObj = {
                "AllTestID": '',
                "FrontTitle": elem.trim(),
                "TestPoint": "",
                "Type": 'A3TEST',
                "Difficulty": "",
                "A3TestItems": [],
                "Score": 0
            };
            bigIssueArr.push(testObj);
            lastType = null; //  大题之后清除小题类型标签
            continue;
        }
        if(elem.search(/\n\s*\[\s*组合单选\s*\]/) !== -1 || elem.search(/\n\s*【\s*组合单选\s*】/) !== -1){ //  单选题标签
            lastType = 'ATEST';
            continue;
        }
        if(elem.search(/\n\s*\[\s*组合多选\s*\]/) !== -1 || elem.search(/\n\s*【\s*组合多选\s*】/) !== -1){ //  多选题标签
            lastType = 'XTEST';
            continue;
        }
        if(elem.search(/\n\s*[1-9][0-9]*(?:\.|、|。)/) !== -1 ){  //  小题
            var testNO = elem.match(/\n\s*[1-9][0-9]*/);
            if(lastType === null){
                layer.alert('组合题第' + testNO[0].trim() + '题没有设置小题类型“[组合单选]”或“[组合多选]”！');
                return -1;
            }

            //  处理题目
            var Title = elem.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
            if(Title == ''){
                layer.alert('组合题第' + testNO + '题题目内容为空！');
                return -1;
            }

            //  设置解析
            var Explain = _setExplain(testContext0444, testNO[0].trim());

            //  设置选项
            var selectItems = _checkSelectedItems(testNO[0].trim(), testContext04, '组合题');
            if(selectItems === -1) return -1;

            //  设置答案
            var ans = _checkAnswer(testNO[0].trim(), lastType, selectItems, testContext044, '组合题');
            if(ans === -1) return -1;

            // 设置小题题型中文标签
            var subType = null;
            var subStyleID = null;
            if(lastType == 'ATEST'){
                subType = '组合单选题';
                subStyleID = '1';

            }else if(lastType == 'XTEST'){
                subType = '组合多选题';
                subStyleID = '2';
            }

            var test = {
                "A3TestItemID": '',
                "BookTestNo": testNO[0].trim(),
                "StyleID": subStyleID,
                "Title": Title,
                "Explain": Explain,
                "Type": lastType,
                "SubType": subType,
                "SelectedItems": selectItems,
                "Answer": ans,
                "TestPoint": "",
                "IsFav": 0,
                "UserNoteContent": ""
            }

            bigIssueArr[bigIssueArr.length-1].A3TestItems.push(test);   //  添加小题到大题中
        }
    }

    // 检测大题是否取错/大题中是否有小题
    for (var idx = 0; idx < bigIssueArr.length; idx++) {
        const elem = bigIssueArr[idx];
        if(elem.A3TestItems.length == 0 && elem.FrontTitle != ''){
            layer.alert('组合题“' + elem.FrontTitle + '”大题中没有小题！');
            return -1;
        }
    }

    // console.log('bigIssueArr:',bigIssueArr);
    var styleObj = {
        "StyleID": "22",
        "Style": "计算分析题",
        "Explain": "组合题型，一个题干多小题（类似阅读题）",
        "Score": "",
        "Type": "A3TEST",
        "TestCount": "",    // bigIssueArr.reduce((a, b) => a+b.A3TestItems.length, 0)
        "TestItems": bigIssueArr
    };

    // console.log(styleObj);
    _testJson.StyleItems.push(styleObj);

}

/**
 * 解析JD题型
 * @param {string} testContext05 录入的简答试题
 * @param {string} testContext055 录入的简答答案
 * @param {string} testContext0555 录入的简答解析
 * @author tfj
 * @date 2019-05-09 08:56:39
 * @version V1.0.0
 */
function _analyzeJDtestTest(testContext05, testContext055, testContext0555){

    testContext0555 = _explainFormat(testContext05, testContext0555);
    if(testContext0555 === -1){
        return -1;
    }

    var flag = _checkTestNO(testContext05, testContext055, '简答题');
    if(flag === 0 || flag === -1){
        return flag;
    }

    var flag2 = _checkTestNOisDot(testContext05, '简答题');
    if(flag2 === -1){
        return flag2;
    }

    var testArr = testContext05.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取题目数组
    var ansArr = testContext055.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取答案数组
    var expArr = testContext0555.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取解析数组
    var testItems = [];

    for (var i = 0; i < testArr.length; i++) {

        const elem1 = testArr[i];
        var testNO = elem1.match(/\n\s*[1-9][0-9]*/)[0].trim();

        //  处理题目
        var Title = elem1.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
        if(Title == ''){
            layer.alert('简答题第' + testNO + '题题目内容为空！');
            return -1;
        }

        //  处理答案
        var Answer = null;
        for (var j = 0; j < ansArr.length; j++) {
            const elem2 = ansArr[j];
            if(elem1.match(/\n\s*[1-9][0-9]*/g)[0] == elem2.match(/\n\s*[1-9][0-9]*/g)[0]){
                Answer = elem2.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
                if(Answer == ''){
                    layer.alert('简答题第' + testNO + '题题目答案为空！');
                    return -1;
                }
            }
        }
        if(Answer == null){
            layer.alert('简答题第' + testNO + '题没有答案！');
            return -1;
        }

        //  解析
        var Explain = expArr[i].replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');

        var test = {
            "BookTestNo": testNO[0].trim(),
            "JDTestID": '',
            "AllTestID": '',
            "Type": 'JDTEST',
            "Title": Title,
            "Explain":Explain,
            "Difficulty": "",
            "TestPoint": "",
            "Answer": Answer,
            "IsFav": 0,
            "UserNoteContent": ""
        };

        testItems.push(test);
    }

    var styleObj = {
        "StyleID": "24",
        "Style": "简答题",
        "Explain": "简答题说明",
        "Score": "",
        "Type": "JDTEST",
        "TestCount": "",
        "TestItems": testItems
    };

    // console.log('styleObj',styleObj);

    _testJson.StyleItems.push(styleObj);
}

/**
 * 解析TK题型
 * @param {string} testContext06 录入的填空试题
 * @param {string} testContext066 录入的填空答案
 * @param {string} testContext0666 录入的填空解析
 * @param {string} testContext06666 录入填空题答案判断设置
 * @author tfj
 * @date 2019-05-09 08:56:39
 * @version V1.0.0
 */
function _analyzeTKtestTest(testContext06, testContext066, testContext0666, testContext06666){
    testContext06666 = testContext06666 || '\n';

    // 解析
    testContext0666 = _explainFormat(testContext06, testContext0666);
    if(testContext0666 === -1){
        return -1;
    }

    // 答案判断设置
    testContext06666 = _explainFormat(testContext06, testContext06666, "answerType");
    if(testContext06666 === -1){
        return -1;
    }

    var flag = _checkTestNO(testContext06, testContext066, '填空题');
    if(flag === 0 || flag === -1){
        return flag;
    }

    var flag2 = _checkTestNOisDot(testContext06, '填空题');
    if(flag2 === -1){
        return flag2;
    }

    var testArr = testContext06.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取题目数组
    var ansArr = testContext066.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取答案数组
    var expArr = testContext0666.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取解析数组
    var ansTypeArr = testContext06666.match(/\n\s*[1-9][0-9]*(?:\.|。|，|、).*$/gm);  //  获取答案类型数组



    var testItems = [];

    for (var i = 0; i < testArr.length; i++) {

        const elem1 = testArr[i];
        var testNO = elem1.match(/\n\s*[1-9][0-9]*/)[0].trim();

        //  处理题目
        var Title = elem1.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
        if(Title == ''){
            layer.alert('填空题第' + testNO + '题题目内容为空！');
            return -1;
        }

        //  处理答案
        var Answer = null;
        for (var j = 0; j < ansArr.length; j++) {
            const elem2 = ansArr[j];
            if(elem1.match(/\n\s*[1-9][0-9]*/g)[0] == elem2.match(/\n\s*[1-9][0-9]*/g)[0]){
                Answer = elem2.replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');
                if(Answer == ''){
                    layer.alert('填空题第' + testNO + '题答案为空！');
                    return -1;
                }
            }
        }
        if(Answer == null){
            layer.alert('填空题第' + testNO + '题没有答案！');
            return -1;
        }
        var answerArr = Answer.trim().split(/\s*[\|｜]\s*/);
        for (var k = 0; k < answerArr.length; k++) {
            var item = answerArr[k];
            if(item && item.toString().indexOf("&") !== -1){
                var sItem = item.toString().split('&');
                sItem = sItem.filter(function(val){ return (val.toString().trim() !== '')});
                answerArr[k] = sItem;
            }
        }

        //  解析
        var Explain = expArr[i].replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');

        // 答案类型（有序无序）
        var answerType = ansTypeArr[i].replace(/\n\s*[1-9][0-9]*(?:\.|。|，|、)/,'');

        var test = {
            "BookTestNo": testNO[0].trim(),
            "TKTestID": '',
            "AllTestID": '',
            "Type": 'TKTEST',
            "Title": Title,
            "Explain":Explain,
            "TestPoint": "",
            "Difficulty": "",
            "answerType": answerType === '顺序可打乱' ? 1 : 0,
            "Answer": JSON.stringify(answerArr),
            "IsFav": 0,
            "UserNoteContent": ""
        };

        testItems.push(test);
    }

    var styleObj = {
        "StyleID": "",
        "Style": "填空题",
        "Explain": "填空题说明",
        "Score": "",
        "Type": "TKTEST",
        "TestCount": "",
        "TestItems": testItems
    };

    // console.log('styleObj',styleObj);

    _testJson.StyleItems.push(styleObj);
}

/**
 * 提交试题（新增试题）
 * @description 新增试题，就是在原有试卷去批量添加试题
 * @author tfj
 * @date 2019-05-10 14:25:15
 * @version V1.0.0
 */
function addTest() {
    //TODO
    return _testJson;
  }
  
  function outputErrorMsg () {
    let errorMsgTemp = errorMsg;
    errorMsg = '';
    return errorMsgTemp;
  }
  
  
  const partImport = analyzeTemplate1
  const mergeImport = analyzeTemplate2
  
  export {partImport, mergeImport, outputErrorMsg, addTest}
