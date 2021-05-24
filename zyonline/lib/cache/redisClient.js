'use strict'
const logger = require('../logHelper');
const config = require('../../config');
const redis = require('./redis');
const redisManager = require('./redis');
const __redis = new redis(config.redis);
//添加redis
exports.add = (key, value) => {
    return new Promise((resolve, reject) => {
        __redis.add(key, value, function (err, res) {
            if (err) {
                logger.error('redis写入数据错误: ' + err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

exports.addWithExpire = (key, value, expire_time) => {
    return new Promise((resolve, reject) => {
        __redis.addWithExpire1(key, value, expire_time, function (err, res) {
            if (err) {
                logger.error('redis写入数据错误: ' + err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

exports.ttl = async (key) => {
    let ttlTime = await __redis.ttl(key);
    return ttlTime;
}

exports.updateWithOutExpire = (key, value) => {
    return new Promise((resolve, reject) => {
        __redis.updateWithOutExpire(key, value, function (err, res) {
            if (err) {
                logger.error('redis写入数据错误: ' + err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

//读取redis
exports.get = (key) => {
    return new Promise((resolve, reject) => {
        __redis.get(key, (err, res) => {
            if (err) {
                logger.error('redis读取数据错误: ' + err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

//删除redis键
exports.remove = (key) => {
    return new Promise((resolve, reject) => {
        __redis.remove(key, (err, res) => {
            if (err) {
                logger.error('redis读取数据错误: ' + err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

//====================================================================================================================== Hash操作
//添加单个 hset
exports.addHash = (hashKey,fieldName,value) => {
    return new Promise(((resolve, reject) => {
        __redis.addHash(hashKey,fieldName,value,function(err){
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve();
            }
        })
    }));
}

exports.getHash = (hashKey, fieldName) => {
    return new Promise((resolve, reject) => {
        __redis.getHash(hashKey, fieldName, function(err, value) {
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
}

//批量添加 hmset
exports.addMHash = (hashKey,valueObj) => {
    return new Promise(((resolve, reject) => {
        __redis.addMHash(hashKey,valueObj,function(err){
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve();
            }
        })
    }));
}
//获取全部键值 hgetall
exports.getAllHash = (hashKey)=>{
    return new Promise(((resolve, reject) => {
        __redis.getAllHash(hashKey,function(err,result){
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    }));
}

//删除单个键 hdel
exports.removeHash = (hashKey,fieldName)=>{
    return new Promise(((resolve, reject) => {
        __redis.removeHash(hashKey,fieldName,function(err){
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve();
            }
        })
    }));
}

//哈希表元素个数
exports.hashKeyCount = (hashKey)=>{
    return new Promise(((resolve, reject) => {
        __redis.HashKeyCount(hashKey,function(err,result){
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    }))
}

//哈希表所有键
exports.getAllKey = (hashKey)=>{
    return new Promise(((resolve, reject) => {
        __redis.getAllKey(hashKey,function(err,result){
            if (err) {
                logger.error('redis错误:' + err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    }))
}

// =============================================================================================== list操作
// 获取指定元素(异步)
exports.getElementAsync = async (key, idx) => {
    var element = await __redis.getElementAsync(key, idx);
    return element;
}

// 获取指定元素
exports.getElement = (key, idx, cb) => {
    __redis.getElement(key, idx, cb);
}

// 获取所有元素
exports.getAllElement = (key, cb) => {
    __redis.getAllElement(key, cb);
}

// 获取所有元素(异步)
exports.getAllElementAsync = async key => {
    var elementList = await __redis.getAllElementAsync(key);
    return elementList;
}

// 左插入
exports.lPush = async (key, val) => {
    var result = await __redis.lPush(key, val);
    return result;
}

// 右插入
exports.rPush = async (key, val) => {
    var result = await __redis.rPush(key, val);
    return result;
}

exports.lSet = async (key, pos, val) => {
    var result = await __redis.lSet(key, pos, val);
    return result;
}

// 移除列表头部第一个元素
exports.lPop = async key => {
    var result = await __redis.lPop(key);
    return result;
}

// 移除列表尾部最后一个元素
exports.rPop = async key => {
    var result = await __redis.rPop(key);
    return result;
}

// 在对应值元素前插入数据
exports.linsertBefore = async (key, val, exVal) => {
    var result = await __redis.linsertBefore(key, val, exVal);
    return result;
}

// 在对应值元素后插入数据
exports.linsertAfter = async (key, val, exVal) => {
    var result = await __redis.linsertAfter(key, val, exVal);
    return result;
}

// 移除列表对应值的元素
exports.lRem = async (key, val) => {
    var result = await __redis.lRem(key, val);
    return result;
}

exports.setExpire = async (key, time) => {
    var result = await __redis.setExpire(key, time);
    return result;
}























