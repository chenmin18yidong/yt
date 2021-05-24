

const mysql = require('../lib/db/mysql').default;
const logger = require('../lib/logHelper');

var config = require('../config');
const axios = require('axios');

exports.homePage = async (req, res) => {
    var ksbClassID = req.query.ksbClassID?req.query.ksbClassID:0;
    var appID = req.query.appID?req.query.appID:0;
    var hLabelID = req.query.hLabelID?req.query.hLabelID:0;
    var pLabelID = req.query.pLabelID?req.query.pLabelID:0;
    //let ksbClassAll = await getKsbClassAll();
    let hotPoint =await getNewsListByCategory(1)
    let practices = await getNewsListByCategory(2)
    let knowledge =await getNewsListByCategory(3)
    practices = practices.concat(knowledge)
    let recruit =await getNewsListByCategory(4)
    res.render("PC/homePage.ejs", {practices:practices,hotPoint:hotPoint,recruit:recruit,pLabelID:pLabelID,hLabelID:hLabelID})
}
exports.phone_home = async (req, res) => {
    var ksbClassID = req.query.ksbClassID?req.query.ksbClassID:0;
    var appID = req.query.appID?req.query.appID:0;
    let ksbClassAll = await getKsbClassAll();
    //let newlist = await getNewsList(ksbClassID,appID,ksbClassAll,'',1)
    let bannerlist = await getBannerList()
    let hotPoint =await getNewsListByCategory(1)
    let practices = await getNewsListByCategory(2)
    let knowledge =await getNewsListByCategory(3)
    res.render("phone/home.ejs", {practices:practices,hotPoint:hotPoint,knowledge:knowledge,bannerlist:bannerlist})
}
exports.ph_occupationalPhysicia = async (req, res) => {
    var ksbClassID = req.query.ksbClassID?req.query.ksbClassID:0;
    var appID = req.query.appID?req.query.appID:req.query.ksbClassID;
    var labelID = req.query.labelID?req.query.labelID:0;
    let ksbClassAll = await getKsbClassAll();
    let newsList = await getNewsList_ph(ksbClassID,appID,ksbClassAll,labelID,1)
    let appName = id2Name(appID,ksbClassAll)
    res.render("phone/ph_occupationalPhysicia.ejs", {page: "./components/ph_occupationalPhysicia_all",newsList:newsList,searchWords:"",appName:appName,ksbClassID:ksbClassID})
}
exports.ph_occupationalPhysicia_skill = async (req, res) => {
    var newsID = req.query.newsID?req.query.newsID:0;
    var client = req.query.client?req.query.client:2;
    let ksbClassAll = await getKsbClassAll();
    let news = await getNewsDetail(newsID);
    await clickNews(newsID,client);
    let appName =await getAppName (newsID,ksbClassAll)

    res.render("phone/ph_occupationalPhysicia.ejs", {page: "./components/ph_occupationalPhysicia_skill",news:news,appName:appName})
}
exports.qualificationPage = async (req, res) => {
    var ksbClassID = req.query.ksbClassID?req.query.ksbClassID:0;
    var appID = req.query.appID?req.query.appID:0;
   // var searchWords = req.query.searchWords?req.query.searchWords:"";
    var indexPage = req.query.indexPage?req.query.indexPage:1;
    let ksbClassAll = await getKsbClassAll();
    let newsList = await getNewsList(ksbClassID,appID,ksbClassAll,'',indexPage)
    let newsTotal = await getNewsTotal(ksbClassID,appID,ksbClassAll)
    let pageTotal = Math.ceil(newsTotal/20)
    let herfStr ="/qualificationPage?" ;
    herfStr = herfStr+(ksbClassID?("ksbClassID="+ksbClassID):"");
    herfStr = herfStr+ (appID?("appID="+appID):"")
    let routes = []
    if(ksbClassID&&ksbClassID!='0'){
        routes =  getRoutesByKsbClassID(ksbClassID,ksbClassAll)
    }else{
        routes =  getRoutesByAppID(appID,ksbClassAll)
    }
    res.render("PC/qualificationPage.ejs", {page: "./components/signUp",ksbClassAll:ksbClassAll,newsList:newsList,searchWords:"",
    pageTotal:pageTotal,indexPage:Number(indexPage),herfStr:herfStr,routes:routes})
}
exports.occupationalPhysicia = async (req, res) => {
    var newsID = req.query.newsID?req.query.newsID:0;
    var client = req.query.client?req.query.client:1;
    let news = await getNewsDetail(newsID);
    let ksbClassAll = await getKsbClassAll();
    let _adjoinNews =await adjoinNews(newsID,ksbClassAll);
    await clickNews(newsID,client);
    let appName =await getAppName (newsID,ksbClassAll)
    res.render("PC/qualificationPage.ejs", {page: "./components/occupationalPhysicia",news:news,ksbClassAll:ksbClassAll,searchWords:"",adjoinNews:_adjoinNews,appName:appName})
}
exports.newsSearch = async (req, res) => {
    var searchWords = req.query.searchWords?req.query.searchWords:"";
    var indexPage = req.query.indexPage?req.query.indexPage:1;
    let ksbClassAll = await getKsbClassAll();
    let newsList = await getNewsListByNewsTitle(searchWords,indexPage);
    let newsTotal = await getNewsTotalByNewsTitle(searchWords)
    let pageTotal = Math.ceil(newsTotal/20)
    let herfStr ="/newsSearch?"+ (searchWords?("searchWords="+searchWords):"")

    res.render("PC/qualificationPage.ejs", {page: "./components/signUp",newsList:newsList,ksbClassAll:ksbClassAll,
    searchWords:searchWords,pageTotal:pageTotal,indexPage:Number(indexPage),herfStr:herfStr,routes:[]})
}

exports.newsSearch_ph = async (req, res) => {
    var ksbClassID = req.query.ksbClassID?req.query.ksbClassID:0;
    var appID = req.query.appID?req.query.appID:0;
    var labelID = req.query.labelID?req.query.labelID:0;
    var searchWords = req.query.searchWords?req.query.searchWords:"";
    let ksbClassAll = await getKsbClassAll();
    //let newsList = await getNewsListByNewsTitle(searchWords,indexPage);
    let newsList = await getNewsListByNewsTitle_ph(searchWords,ksbClassID,appID,ksbClassAll,labelID,1)
    let herfStr ="/newsSearch?"+ (searchWords?("searchWords="+searchWords):"")
    res.render("phone/ph_occupationalPhysicia.ejs", {page: "./components/ph_occupationalPhysicia_all",newsList:newsList,ksbClassAll:ksbClassAll,
    searchWords:searchWords,appName:"",ksbClassID:ksbClassID})
}


exports.getNewsListBylabel = async (req, res) => {
    var labelID = req.query.labelID?req.query.labelID:"";
    var ksbClassID = req.query.ksbClassID?req.query.ksbClassID:0;
    var appID = req.query.appID?req.query.appID:0;
    let ksbClassAll = await getKsbClassAll();    
    let newlist = await newsListbylabel(labelID)
    let json = {
        "data": newlist,
        "message": "获取成功",
        "status": 200
    }
    res.send(JSON.stringify(json));
    return;
}

async function getNewsList(ksbClassID,appID,ksbClassAll,labelID,page,pageSize){
    if (pageSize == null) {
        pageSize = 20;
    } else {
        pageSize = Number(pageSize);
    }
    let newsList = []
    let sqlHead = `select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,n.labelID,nl.labelName,nl.labelClass
    from news n left join newsandapp na on n.newsID = na.newsID 
    left join newslabel nl on nl.ID = na.appID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now() `;
    let sqlCondition ='';
    let sqlEnd =' order by n.Sorting asc, n.CreateTime desc  limit ?, ?';
    if(ksbClassID&&ksbClassID!='0'){
        let appIDs = getAppsByKsbClass(ksbClassID,ksbClassAll)
        sqlCondition = ' and na.appID in ('+appIDs+') and na.Enable=1'
    }else if(appID&&appID!='0'){
        sqlCondition = ' and na.appID = '+appID +' and na.Enable=1'
    } 
    if(labelID){
        sqlCondition = sqlCondition + ' and nl.ID = '+labelID
    }
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[(page - 1) * pageSize, pageSize])
        newsList = re
        return newsList
    } catch (error) {
        logger.error(error)   
        return newsList
    }
}


async function getNewsList_ph(ksbClassID,appID,ksbClassAll,labelID,page,pageSize){
    if (pageSize == null) {
        pageSize = 20;
    } else {
        pageSize = Number(pageSize);
    }
    let newsList = []
    let sqlHead = `select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,nal.labelID,nl.labelName,nl.labelClass, na.appID
    from news n left join newsandapp na on n.newsID = na.newsID 
		left join newsandlabel  nal on n.newsID = nal.newsID 
    left join newslabel nl on nl.ID = nal.LabelID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now()  and na.Enable=1 `;
    let sqlCondition ='';
    let sqlEnd =' order by n.Sorting asc, n.CreateTime desc  limit ?, ?';
    if(ksbClassID&&ksbClassID!='0'){
        let appIDs = getAppsByKsbClass(ksbClassID,ksbClassAll)
        sqlCondition = ' and na.appID in ('+appIDs+') and na.Enable=1'
    }else if(appID&&appID!='0'){
        sqlCondition = ' and na.appID = '+appID 
    } 
    if(labelID){
        sqlCondition = sqlCondition + ' and nal.labelID = '+labelID
    }
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[(page - 1) * pageSize, pageSize])
        newsList = re
        return newsList
    } catch (error) {
        logger.error(error)   
        return newsList
    }
}


async function getNewsListByCategory(categoryID){
    let newsList = []
    let sqlHead = `select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,n.labelID,nl.labelName,nl.labelClass
    from news n left join newsandapp na on n.newsID = na.newsID 
    left join newslabel nl on nl.ID = na.appID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now()   `;
    let sqlCondition ='';
    let sqlEnd =' order by n.Sorting asc, n.CreateTime desc  limit 1, 100';
    if(categoryID){
        sqlCondition = ' and n.categoryID = '+categoryID
    }
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[])
        newsList = re
        return newsList
    } catch (error) {
        logger.error(error)   
        return newsList
    }
}


async function newsListbylabel(labelID){
    let sqlHead = `select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,n.labelID,nl.labelName,nl.labelClass
    from news n left join newsandlabel na on n.newsID = na.newsID 
    left join newslabel nl on nl.ID = na.LabelID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now() `;
    let sqlCondition ='';
    let sqlEnd =' order by n.Sorting asc, n.CreateTime desc ';
    sqlCondition = ' and na.labelID = '+labelID
    
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[])
        newsList = re
        return newsList
    } catch (error) {
        logger.error(error)   
        return newsList
    }
}

async function getBannerList(){
    let bannerList = []
    let sql = `
    select b.bannerID,bd.bannerImgUrl from banner b left join banner_detail bd on b.bannerID = bd.bannerID where b.enable =1 and b.LaunchStatus =1  and b.StartTime<=now() and b.EndTime>now()
    order by b.Sorting asc,b.CreateTime desc  `;
    try {
        let re = await mysql.queryParamAsync(sql,[])
        bannerList = re
        return bannerList
    } catch (error) {
        logger.error(error)   
        return bannerList
    }
}
async function getNewsTotal(ksbClassID,appID,ksbClassAll,labelID){
    let sqlHead = `select count(1) total from (select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,n.labelID,nl.labelName,nl.labelClass 
    from news n left join newsandapp na on n.newsID = na.newsID 
    left join newslabel nl on nl.ID = na.appID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now() `;
    let sqlCondition ='';
    if(ksbClassID&&ksbClassID!='0'){
        let appIDs = getAppsByKsbClass(ksbClassID,ksbClassAll)
        sqlCondition = ' and na.appID in ('+appIDs+') and na.Enable=1'
    }else if(appID&&appID!='0'){
        sqlCondition = ' and na.appID = '+appID +' and na.Enable=1'
    }else if(labelID){
        sqlCondition = ' and n.labelID = '+labelID
    }
    let sqlEnd = ') t';
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[])
        return re[0].total
    } catch (error) {
        logger.error(error)   
        return 0
    }
}
async function getNewsListByNewsTitle(title,page,pageSize){
    if (pageSize == null) {
        pageSize = 20;
    } else {
        pageSize = Number(pageSize);
    }
    let newsList = []
    let sqlHead = `select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,n.labelID,nl.labelName,nl.labelClass
    from news n left join newsandapp na on n.newsID = na.newsID 
    left join newslabel nl on nl.ID = na.appID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now() `;
    let sqlCondition ="and n.NewsTitle like '%"+title+"%'";
    let sqlEnd =' order by n.Sorting asc, n.CreateTime desc  limit ?, ?';
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[(page - 1) * pageSize, pageSize])
        newsList = re
        return newsList
    } catch (error) {
        logger.error(error)   
        return newsList
    }
}

async function getNewsTotalByNewsTitle(title){
    let sqlHead = `select count(1) total from (select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,n.labelID,nl.labelName,nl.labelClass
    from news n left join newsandapp na on n.newsID = na.newsID 
    left join newslabel nl on nl.ID = na.appID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now() `;
    let sqlCondition ="and n.NewsTitle like '%"+title+"%'";
    let sqlEnd = ') t';
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[])
        return re[0].total
    } catch (error) {
        logger.error(error)   
        return 0
    }
}
async function getNewsDetail(newsID){
    let sql = `select NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,AuthorName,Briefing,Content,Thumbnail,n.NewsID from news n 
    where n.enable =1 and n.newsID=? `;
    try {
        let re = await mysql.queryParamAsync(sql,[newsID])
        if(re.length>0){
            return re[0]
        }
            return {}
    } catch (error) {
        logger.error(error)   
        return {}
    }
}
async function adjoinNews(newsID,ksbClassAll){
    let re = [null,null]
    let sql1 = `select NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,AuthorName,Briefing,Content,Thumbnail,n.newsID from news n 
    where n.enable =1 and n.newsID>? order by n.newsID asc limit 1 `;
    let sql2 = `select NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,AuthorName,Briefing,Content,Thumbnail,n.newsID from news n 
    where n.enable =1 and n.newsID<? order by n.newsID desc limit 1`;
    try {
        let after = await mysql.queryParamAsync(sql1,[newsID])
        let before = await mysql.queryParamAsync(sql2,[newsID])
        if(before.length>0){
            re[0]=before[0]
            let appName = await getAppName(re[0].newsID,ksbClassAll)
            re[0].appName = appName;
        }
        if(after.length>0){
            re[1] = after[0]
            let appName = await getAppName(re[1].newsID,ksbClassAll)
            re[1].appName = appName;
        }
            return re
    } catch (error) {
        logger.error(error)   
        return re
    }
}


async function getNewsListByNewsTitle_ph(title,ksbClassID,appID,ksbClassAll,labelID,page,pageSize){
    if (pageSize == null) {
        pageSize = 20;
    } else {
        pageSize = Number(pageSize);
    }
    let newsList = []
    let sqlHead = `select DISTINCT NewsTitle,date_format(n.CreateTime, '%Y-%m-%d') CreateTime,n.newsID,n.categoryID,nal.labelID,nl.labelName,nl.labelClass, na.appID
    from news n left join newsandapp na on n.newsID = na.newsID 
		left join newsandlabel  nal on n.newsID = nal.newsID 
    left join newslabel nl on nl.ID = nal.LabelID
    where n.enable =1 and n.LaunchStatus =1  and n.StartTime<=now() and n.EndTime>now()  and na.Enable=1`;
    let sqlCondition =" and n.NewsTitle like '%"+title+"%'";
    let sqlEnd =' order by n.Sorting asc, n.CreateTime desc  limit ?, ?';
    if(ksbClassID&&ksbClassID!='0'){
        let appIDs = getAppsByKsbClass(ksbClassID,ksbClassAll)
        sqlCondition = ' and na.appID in ('+appIDs+') and na.Enable=1'
    }else if(appID&&appID!='0'){
        sqlCondition = ' and na.appID = '+appID 
    } 
    if(labelID){
        sqlCondition = sqlCondition + ' and nal.labelID = '+labelID
    }
    let sql = sqlHead+sqlCondition+sqlEnd;
    try {
        let re = await mysql.queryParamAsync(sql,[(page - 1) * pageSize, pageSize])
        newsList = re
        return newsList
    } catch (error) {
        logger.error(error)   
        return newsList
    }
}

async function clickNews(newsID,Client){
    let sql = `INSERT INTO news_click_history (newsID,Client) VALUES(?,?) on DUPLICATE key update hit = hit+1`;
    try {
        await mysql.queryParamAsync(sql,[newsID,Client])
      
    } catch (error) {
        logger.error(error)   
     
    }
}
//临时
async function getKsbClassAll(){
    let KsbClassAll = []
    try {
       
          KsbClassAll =  [
            {
                "KsbClassID": 4,
                "AppID": 4,
                "KsbClassName": "执业医师"
            },
            {
                "KsbClassID": 10,
                "AppID": 10,
                "KsbClassName": "执业药师"
            },
            {
                "KsbClassID": 13,
                "AppID": 13,
                "KsbClassName": "执业护士"
            },
            {
                "KsbClassID": 14,
                "AppID": 14,
                "KsbClassName": "执业兽医"
            },
            {
                "KsbClassID": 15,
                "AppID": 15,
                "KsbClassName": "医疗招聘",
                "Childs": [
                    {
                        "KsbClassID": 377,
                        "PID": 15,
                        "KsbClassName": "考试信息",
                        "applist": [
                            {
                                "AppID": 17,
                                "KsbClassID": 377,
                                "CName": "信息汇总"
                            },
                            {
                                "AppID": 133,
                                "KsbClassID": 377,
                                "CName": "医院招聘"
                            },
                            {
                                "AppID": 52,
                                "KsbClassID": 377,
                                "CName": "岗位表"
                            },
                            {
                                "AppID": 47,
                                "KsbClassID": 377,
                                "CName": "考试报名入口"
                            },
                            {
                                "AppID": 48,
                                "KsbClassID": 377,
                                "CName": "准考证打印"
                            },
                            {
                                "AppID": 146,
                                "KsbClassID": 377,
                                "CName": "成绩查询"
                            },
                        ],
                    },
                    {
                        "KsbClassID": 378,
                        "PID": 15,
                        "KsbClassName": "考试资讯",
                        "applist": [
                            {
                                "AppID": 119,
                                "KsbClassID": 378,
                                "CName": "笔记通知"
                            },
                            {
                                "AppID": 111,
                                "KsbClassID": 378,
                                "CName": "面试通知"
                            },
                            {
                                "AppID": 75,
                                "KsbClassID": 378,
                                "CName": "资格审查"
                            },
                            {
                                "AppID": 94,
                                "KsbClassID": 378,
                                "CName": "公示"
                            }
                        ],
                    }
                    
                ]
            },
            {
                "KsbClassID": 18,
                "AppID": 18,
                "KsbClassName": "大型医疗设备"
            },
            {
                "KsbClassID": 275,
                "AppID": 275,
                "KsbClassName": "医学考研"
            },
        ]
          return KsbClassAll
        } catch (error) {
            logger.error(error)   
            return KsbClassAll
        }
}

function getAppsByKsbClass(ksbClassID,ksbClassAll){
    let applist = []
    for (let i = 0; i < ksbClassAll.length; i++) {
        if(ksbClassAll[i].KsbClassID == ksbClassID&&ksbClassAll[i].AppID){
                applist.push(ksbClassAll[i].AppID)
        }else if(ksbClassAll[i].Childs&&ksbClassAll[i].Childs.length>0){
            for (let k = 0; k < ksbClassAll[i].Childs.length; k++) {
                if(ksbClassAll[i].Childs[k].KsbClassID == ksbClassID || ksbClassAll[i].Childs[k].PID == ksbClassID){
                    for (let z = 0; z < ksbClassAll[i].Childs[k].applist.length; z++) {
                        applist.push(ksbClassAll[i].Childs[k].applist[z].AppID)
                    }
                }
            }
        }
    }
    return applist
}


function getRoutesByKsbClassID(ksbClassID,ksbClassAll){
    let routes = []
    for (let i = 0; i < ksbClassAll.length; i++) {
        if(ksbClassAll[i].KsbClassID == ksbClassID){
            let route = {ksbClassID:ksbClassAll[i].KsbClassID,name:ksbClassAll[i].KsbClassName}
            routes.push(route)
            return routes
        }else{
            if(ksbClassAll[i].Childs&&ksbClassAll[i].Childs.length>0){
                for (let k = 0; k < ksbClassAll[i].Childs.length; k++) {
                    if(ksbClassAll[i].Childs[k].KsbClassID == ksbClassID){
                        routes.push({ksbClassID:ksbClassAll[i].KsbClassID,name:ksbClassAll[i].KsbClassName})
                        routes.push({ksbClassID:ksbClassAll[i].Childs[k].KsbClassID,name:ksbClassAll[i].Childs[k].KsbClassName})
                        return routes
                    }
                }
            }
        }
    }
    return routes
}
function getRoutesByAppID(appID,ksbClassAll){
    let routes = []
    for (let i = 0; i < ksbClassAll.length; i++) {
        if(ksbClassAll[i].applist&&ksbClassAll[i].applist.length>0){
            for (let j = 0; j < ksbClassAll[i].applist.length; j++) {
                if(appID==ksbClassAll[i].applist[j].AppID){
                    routes.push({ksbClassID:ksbClassAll[i].KsbClassID,name:ksbClassAll[i].KsbClassName})
                    routes.push({appID:ksbClassAll[i].applist[j].AppID,name:ksbClassAll[i].applist[j].CName})
                    return routes
                }
            }
        }
        if(ksbClassAll[i].Childs&&ksbClassAll[i].Childs.length>0){
            for (let k = 0; k < ksbClassAll[i].Childs.length; k++) {
                    for (let z = 0; z < ksbClassAll[i].Childs[k].applist.length; z++) {
                        if(appID==ksbClassAll[i].Childs[k].applist[z].AppID){
                            routes.push({ksbClassID:ksbClassAll[i].KsbClassID,name:ksbClassAll[i].KsbClassName})
                            routes.push({ksbClassID:ksbClassAll[i].Childs[k].KsbClassID,name:ksbClassAll[i].Childs[k].KsbClassName})
                            routes.push({appID:ksbClassAll[i].Childs[k].applist[z].AppID,name:ksbClassAll[i].Childs[k].applist[z].CName})
                            return routes
                        }
                    }
            }
        }
    }
    return routes
}

async function getAppName (newsID,ksbClassAll){
    let sql = `select  na.appID from news n left join newsandapp na on n.newsID = na.newsID   where n.newsID= ? and na.Enable=1 LIMIT 1`
    let re = await mysql.queryParamAsync(sql,[newsID])
    if(re.length<1){
        return ""
    }
    let appID = re[0].appID
    let appName =  id2Name(appID,ksbClassAll)
    return appName
}

function id2Name (appID,ksbClassAll){
    let appName = ""
    for (let i = 0; i < ksbClassAll.length; i++) {
        if(ksbClassAll[i].AppID&&ksbClassAll[i].AppID == appID){
            appName = ksbClassAll[i].KsbClassName
            return appName
        }else if(ksbClassAll[i].Childs&&ksbClassAll[i].Childs.length>0){
            for (let k = 0; k < ksbClassAll[i].Childs.length; k++) {
                for (let z = 0; z < ksbClassAll[i].Childs[k].applist.length; z++) {
                    if(ksbClassAll[i].Childs[k].applist[z].AppID == appID){
                        appName = ksbClassAll[i].Childs[k].applist[z].CName
                        return appName
                    }
                }
            }
        }
    }
    return appName
}