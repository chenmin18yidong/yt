'use strict';

var redis = require('redis');
var config = require('../../config');
var log = require('../logHelper');

function redisManager(config) {
    this.config = config;
    this.redisClient = redis.createClient(this.config);
}

//初始化redis客户端
// var redisClient = redis.createClient({
//     host: config.redis.host,
//     port: config.redis.port,
//     password: config.redis.pass,
//     db: config.redis.db
// });

//连接错误处理
// this.redisClient.on("error", function(err){
//     log.error('Redis连接发生错误:');
//     log.error(err);
// });

/**
 * 插入数据
 */
redisManager.prototype.add = function(key, value, callback) {
    this.redisClient.set(key, value, function(err,result) {
        if (err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            //redisClient.expire(key, config.redis.expire);
            if(callback) {
                callback(null, result);
            }
        }
    });
}

/**
 * 插入指定过期时间数据
 */
redisManager.prototype.addWithExpire = function(key, value, expire, callback){
    this.redisClient.set(key, value, function(err, result) {
        if(err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        }
        else {
            //redisClient.expire(key, (expire || config.redis.expire));
            if(callback) {
                callback(null, result);
            }
        }
    });
}

/**
 * 插入指定过期时间数据
 */
redisManager.prototype.addWithExpire1 = function(key, value, expire, callback){
    let redisC = this.redisClient;
    redisC.set(key, value, function(err, result) {
        if(err) {
            if(callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        }
        else {
            redisC.expire(key, (expire || config.redis.expire));
            if(callback) {
                callback(null, result);
            }
        }
    });
}

redisManager.prototype.updateWithOutExpire = function(key, value, callback) {
    this.redisClient.ttl(key, (err, expireTime) => {
        if (err) {
            if (callback) {
                callback(err, null);
            } else {
                log.error(err.stack);
            }
        } else {
            this.redisClient.set(key, value, (error, result) => {
                if (error) {
                    if (callback) {
                        callback(error, null);
                    } else {
                        log.error(error.stack);
                    }
                } else {
                    if (expireTime != -1 && expireTime != -2) {
                        this.redisClient.expire(key, expireTime);
                    }
                    if (callback) {
                        callback(null, result);
                    }
                }
            });
        }
    });
}

/**
 * 获取字段过期时间
 * @param {*} key 
 */
redisManager.prototype.ttl = function(key) {
    return new Promise((resolve, reject) => {
        this.redisClient.pttl(key, function (err, reply) {
            if (err) {
                log.error(err);
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
}


/**
 * 获取数据
 */
redisManager.prototype.get = function(key, callback){
    this.redisClient.get(key, function (err, reply) {
        if (err) {
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if (callback) {
                callback(null, reply);
            }
        }
    });
}

/**
 * 删除数据
 */
redisManager.prototype.remove = function(key, callback) {
    this.redisClient.del(key, function (err, reply) {
        if (err) {
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if (callback) {
                callback(null, reply);
            }
        }
    });
}

//====================================================================================================================== Hash操作 start
//添加单个 hset
redisManager.prototype.addHash = function(hashKey,fieldName,value,callback){
    this.redisClient.hset(hashKey,fieldName,value,function(err){
        if(err){
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else{
            if (callback) {
                callback(null);
            }
        }
    });
}

// 获取单个值
redisManager.prototype.getHash = function(hashKey, fieldName, callback) {
    this.redisClient.hget(hashKey, fieldName, function(err, value) {
        if (err) {
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else {
            if (callback) {
                callback(null, value);
            }
        }
    });
}

//批量添加 hmset
redisManager.prototype.addMHash = function(hashKey,valueObj,callback){
    this.redisClient.hmset(hashKey,valueObj,function(err){
        if(err){
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else{
            if (callback) {
                callback(null);
            }
        }
    });
}
//获取全部键值 hgetall
redisManager.prototype.getAllHash = function(hashKey,callback){
    this.redisClient.hgetall(hashKey,function(err,result){
        if(err){
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else{
            if (callback) {
                callback(null, result);
            }
        }
    });
}
//删除单个键值 hdel
redisManager.prototype.removeHash = function(hashKey,fieldName,callback){
    this.redisClient.hdel(hashKey,fieldName,function(err){
        if(err){
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else{
            if (callback) {
                callback(null);
            }
        }
    });
}

//哈希表元素个数 hlen
redisManager.prototype.HashKeyCount = function(hashKey,callback){
    this.redisClient.hlen(hashKey,function(err,result){
        if(err){
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else{
            if (callback) {
                callback(null,result);
            }
        }
    })
}

//获取哈希表所有键 hkeys
redisManager.prototype.getAllKey = function(hashKey,callback){
    this.redisClient.hkeys(hashKey,function(err,result){
        if(err){
            if (callback) {
                callback(err, null);
            } else {
                log.error(err);
            }
        } else{
            if (callback) {
                callback(null,result);
            }
        }
    });
}



//====================================================================================================================== Hash操作 end



/***********************************************************Redis 有序列表操作***************************************************************************/
/**
 * 获取列表指定位置元素
 */
redisManager.prototype.getElement = function (key, idx, cb) {
    this.redisClient.lindex(key, idx, (err, result) => {
        if (err) {
            if (cb) {
                log.error('redis发生异常:' + err.stack);
                cb(err, null);
            } else {
                log.error('redis发生异常:' + err.stack);
            }
        } else {
            if (cb) {
                cb(null, result);
            }
        }
    });
}

/**
 * 获取列表指定位置元素(异步)
 */
redisManager.prototype.getElementAsync = function (key, idx) {
    return new Promise((resolve, reject) => {
        this.redisClient.lindex(key, idx, (err, result) => {
            if (err) {
                log.error('redis发生异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 读取指定list所有数据
 */
redisManager.prototype.getAllElement = function (key, cb) {
    this.redisClient.lrange(key, 0, -1, (err, result) => {
        if (err) {
            if (cb) {
                log.error('redis发生异常:' + err.stack);
                cb(err, null);
            } else {
                log.error('redis发生异常:' + err.stack);
            }
        } else {
            if (cb) {
                cb(null, result);
            }
        }
    });
}

/**
 * 读取指定list所有数据(异步)
 */
redisManager.prototype.getAllElementAsync = function (key) {
    return new Promise((resolve, reject) => {
        this.redisClient.lrange(key, 0, -1, (err, result) => {
            if (err) {
                log.error('redis发生异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 左插入
 */
redisManager.prototype.lPush = function (key, val) {
    return new Promise((resolve, reject) => {
        this.redisClient.lpush(key, val, (err, result) => {
            if (err) {
                log.error('redis发生异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
}

/**
 * 右插入
 */
redisManager.prototype.rPush = function (key, val) {
    return new Promise((resolve, reject) => {
        this.redisClient.rpush(key, val, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 移除队列第一个元素
 */
redisManager.prototype.lPop = function (key) {
    return new Promise((resolve, reject) => {
        this.redisClient.lpop(key, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 移除队列最后一个元素
 */
redisManager.prototype.rPop = function (key) {
    return new Promise((resolve, reject) => {
        this.redisClient.rpop(key, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 更新list里指定位置值
 */
redisManager.prototype.lSet = function (key, pos, val) {
    return new Promise((resolve, reject) => {
        this.redisClient.lset(key, pos, val, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 从某个元素前插入
 */
redisManager.prototype.linsertBefore = function (key, val, exval) {
    return new Promise((resolve, reject) => {
        this.redisClient.linsert(key, "BEFORE", exval, val, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 从某个元素前插入
 */
redisManager.prototype.linsertAfter = function (key, val, exval) {
    return new Promise((resolve, reject) => {
        this.redisClient.linsert(key, "AFTER", exval, val, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 从列表中移除与值相等的元素
 */
redisManager.prototype.lRem = function (key, val) {
    return new Promise((resolve, reject) => {
        this.redisClient.lrem(key, 0, val, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * 添加过期时间
 * @param {*} key 
 * @param {*} time 
 */
redisManager.prototype.setExpire = function (key, time) {
    return new Promise((resolve, reject) => {
        this.redisClient.expire(key, time, (err, result) => {
            if (err) {
                log.error('redis异常:' + err.stack);
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}
/*******************************************************************************************************************************************************/

module.exports = redisManager;