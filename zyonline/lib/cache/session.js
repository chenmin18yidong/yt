'use strict';
/**
 * session对象内容：{userID, guid, ip, lastUpdateTime}
 */
var config = require('../../config').redis;
var redis = require('./redis');
var redisClient = new redis(config);
var log = require('../logHelper');
var returnModel = require('../model/returnModel');
var timeOut = 21600;
var uuid = require('../utils/uuid');
var redisPrefix_wx = 'st_wx_';    //微信key前缀
var redisPrefix_android = 'st_an_';     //安卓Key前缀
var redisPrefix_apple = "st_ap_";       //苹果key前缀
var redisPrefix_Other = "st_ot_";       //其他端key前缀

/**
 * 添加session
 */
exports.addSession = function(userid, ip, client, callback) {
    var _guid = uuid.create().replace(/\-/g,'');
    var _time = new Date().getTime();
    var redisKey;
    if (client === 1) {
        redisKey = redisPrefix_android + userid;
    } else if (client === 2) {
        redisKey = redisPrefix_apple + userid;
    } else if (client === 4) {
        redisKey = redisPrefix_wx + userid;
    } else {
        redisKey = redisPrefix_Other + userid;
    }
    var json = JSON.stringify({
        'userID':userid,
        'guid': _guid,
        'ip': ip,
        'lastTime': _time
    });
    //redis.addWithExpire(redisKey, json, timeOut, function(err, result) {
    redisClient.add(redisKey, json, function(err, result) {
        if (err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if (callback) {
                callback(null, result);
            }
        }
    });
    return _guid;
}

/**
 * 验证session
 * callback 参数：err,result
 */
exports.checkSession = function(userid, guid, ip, client, res, callback) {
    var redisKey;
    if (client === 1) {
        redisKey = redisPrefix_android + userid;
    } else if (client === 2) {
        redisKey = redisPrefix_apple + userid
    } else if (client == 4) {
        redisKey = redisPrefix_wx + userid;
    } else {
        redisKey = redisPrefix_Other + userid;
    }
    var sessionObj = null;
    redisClient.get(redisKey, function(err, result){
        if(err) {
            if(callback){
                callback(err,false);
                return;
            } else {
                log.error(err);
                return;
            }
        } else {
            checkSessionInfo(result);
        }
    });

    function checkSessionInfo(sessionData) {
        if (sessionData == null){
            var json = {
                "data" : {},
                "message": "登录状态失效，请重新登录！",
                "status": 350
            }
            //res.send(returnModel.getModelJson(null,'登陆状态失效，请重新登陆！', 250));
            res.send(JSON.stringify(json));
            if(callback) {
                callback({message:'Session Not Found'}, false);
                return;
            }
        } else {
            sessionObj = JSON.parse(sessionData);
            if (guid !== sessionObj.guid){
                var json = {
                    "data" : {},
                    "message": "您的帐号在另一地点登录，您被迫下线。如果这不是您本人操作，请注意帐号安全。",
                    "status": 350
                }
                //res.send(returnModel.getModelJson(null,'您的帐号在另一地点登录，您被迫下线。如果这不是您本人操作，请注意帐号安全。', 250));
                res.send(JSON.stringify(json));
                if(callback){
                    callback({message:'Guid Invalid'},false);
                    return;
                }
            } else {
                updateSession();
            }
        }
    }

    function updateSession() {
        sessionObj.lastTime = new Date().getTime();
        var newSessionJson = JSON.stringify(sessionObj);
        //redis.addWithExpire(redisKey, newSessionJson, timeOut, function(err, result){
        redisClient.add(redisKey, newSessionJson, function(err, result) {
            if(err) {
                if (callback){
                    callback(err,null);
                    return;
                } else {
                    log.error(err);
                    return;
                }
            } else {
                if(callback) {
                    callback(null, result);
                    return;
                }
            }
        });
    }
}

/**
 * 移除session
 */
exports.removeSession = function(userid) {
    var redisKey;
    if (client === 1) {
        redisKey = redisPrefix_android + userid;
    } else if (client === 2) {
        redisKey = redisPrefix_apple + userid
    } else if (client == 4) {
        redisKey = redisPrefix_wx + userid;
    } else {
        redisKey = redisPrefix_Other + userid;
    }
    redisClient.remove(redisKey);
}