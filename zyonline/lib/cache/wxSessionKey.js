'use strict';
var config = require('../../config');
var redis = require('./redis');
var redisClient = new redis(config.redis_session);
var log = require('../logHelper');

exports.addSession = (openID, sessionKey, callback) => {
    var _time = new Date().getTime();
    var json = {
        "openID": openID,
        "sessionKey": sessionKey,
        "time": _time
    }
    json = JSON.stringify(json);
    redisClient.add(openID, json, (err, result) => {
        if(err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if(callback) {
                callback(null, result);
            }
        }
    });
}

exports.getSession = (openID, callback) => {
    redisClient.get(openID, (err, result) => {
        if(err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if(callback) {
                callback(null, result);
            }
        }
    });
}

exports.removeSession = (openID, callback) => {
    redisClient.remove(openID, (err, result) => {
        if(err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if(callback) {
                callback(null, result);
            }
        }
    });
}