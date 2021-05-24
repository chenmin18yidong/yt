'use strict';

var log4js = require('log4js');
log4js.configure({
    appenders:{
        console:{type:'console'},
        log:{
            type:'dateFile',
            //filename:'/yingedu/stsq/wwwrot/stOnline/log/',
            filename:'./log/info',
            pattern:'Log_yyyyMMdd.txt',
            maxLogSize: 10*1024*1024,//10M
            absolute: true,
            alwaysIncludePattern: true,
            encoding : 'utf-8',
            backups: 20
        },
        err:{
            type:'dateFile',
            // filename:'/yingedu/stsq/wwwrot/stOnline/log/',
            filename:'./log/error',
            pattern:'Err_yyyyMMdd.txt',
            maxLogSize: 10*1024*1024,//10M
            absolute: true,
            alwaysIncludePattern: true,
            encoding : 'utf-8',
            backups: 20
        },
        statistics:{
            type:'dateFile',
            filename:'./log/stat',
            pattern:'yyyyMMdd.txt',
            maxLogSize: 100*1024*1024,//10M
            absolute: true,
            alwaysIncludePattern: true,
            encoding : 'utf-8',
            backups: 20
        },
        // apiLog:{
        //     type:'dateFile',
        //     filename:'./log/api',
        //     pattern:'yyyyMMdd.txt',
        //     maxLogSize: 200*1024*1024,//10M
        //     absolute: true,
        //     alwaysIncludePattern: true,
        //     encoding : 'utf-8',
        //     backups: 20
        // }
        apiLog: {
            type: 'file',
            filename: './log/api.log',
            keepFileExt: true,
            maxLogSize: 200*1024*1024,//200M
            backups: 10
        },
        //高防接口日志
        protectLog:{
            type:'dateFile',
            filename:'./log/protect',
            pattern:'yyyyMMdd.txt',
            maxLogSize: 100*1024*1024,//10M
            absolute: true,
            alwaysIncludePattern: true,
            encoding : 'utf-8',
            backups: 10
        },
        //黑名单日志(加入黑名单记录)
        blackListLog:{
            type:'dateFile',
            filename:'./log/blacklist',
            pattern:'yyyyMMdd.txt',
            maxLogSize: 10*1024*1024,//10M
            absolute: true,
            alwaysIncludePattern: true,
            encoding : 'utf-8',
            backups: 10
        }
    },

    // replaceConsole: true,
    categories:{
        default:{appenders: ['console'],level:'debug'},// 空
        log:{appenders: ['console','log'],level:'debug'},// 输出
        err:{appenders: ['console','err'],level:'error'},//报错
        stat:{appenders: ['statistics'],level:'debug'},
        apiLog:{appenders: ['apiLog'],level:'debug'},//api访问记录
        protLog:{appenders: ['protectLog'],level:'debug'},//高防接口访问日志
        blackLog:{appenders: ['blackListLog'],level:'debug'}//黑名单日志
    }
});

var logger = log4js.getLogger('log');
var errLog = log4js.getLogger('err');
var stasLog =  log4js.getLogger('stat');
var apiLog = log4js.getLogger('apiLog');

var protLog = log4js.getLogger('protLog');
var blackLog = log4js.getLogger('blackLog');

//信息输出
exports.log = function(msg){
    logger.info(msg);
}
//调试输出
exports.debug = function(msg){
    logger.debug(msg);
}
//错误输出
exports.error = function(err){
    if(err){
        if(err.stack){
            errLog.error(err.stack);
        } else{
            errLog.error(err);
        }
    }
}

exports.statistics = function(msg){
    stasLog.info(msg);
}

exports.apiLog = function(msg){
    apiLog.info(msg);
}

exports.protectLog = function(msg){
    protLog.info(msg);
}

exports.blackLog = function(msg){
    blackLog.info(msg);
}
