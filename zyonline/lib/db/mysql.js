var dbMysql = require('mysql');
var config = require('../../config');

var Mysql = function (config) {
	this.config = config;
	this._pool = dbMysql.createPool(this.config);
};

/************************
 *执行单条sql语句查询s
 *
 ***********************/
Mysql.prototype.query = function(sql, callback) {
	this._pool.getConnection(function (poolErr, connection) {
		var _callback = callback || function (connErr, result, fields) {
			if (connErr) {
				console.error('Mysql.query: ' + sql, connErr);
			}
		};

		if (poolErr) {
			console.log('Mysql.poolErr:' + sql, poolErr);
			return _callback(poolErr);
		}


		var _releaseCallback = function (connErr, result, fields) {
			if (connErr) {
				console.log('Mysql.query:' + sql, connErr);
			}
			connection.release();
			_callback(connErr, result, fields);

		};
		//console.log('come into my query function...');
		connection.query(sql, _releaseCallback);
	});
};

Mysql.prototype.queryAsync = function(sql) {
	var connectionPool = this._pool;
	return new Promise(function (resolve, reject) {
		connectionPool.getConnection(function(poolErr, connection) {
			if(poolErr) {
				reject(poolErr);
			} else {
				connection.query(sql,function(err, result) {
					if(err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			}
		});
	});
};

/************************
 *执行单条sql带参数语句查询
 *
 ***********************/
Mysql.prototype.queryParam = function(sql, param, callback) {
	if (typeof param == 'function') {
		callback = param
		param = null
	}
	this._pool.getConnection(function (poolErr, connection) {
		var _callback = callback || function (connErr, result, fields) {
			if (connErr) {
				console.error('Mysql.queryParam: ' + sql, connErr);
			}
		};
		if (poolErr) {
			console.log('Mysql.poolErr:' + sql, poolErr);
			return _callback(poolErr);
		}


		var _releaseCallback = function (connErr, result, fields) {
			if (connErr) {
				console.log('Mysql.query:' + sql, connErr);
			}
			connection.release();
			_callback(connErr, result, fields);

		};

		//console.log('come into my queryParam function...');
		connection.query(sql, param, _releaseCallback);
	});
};

Mysql.prototype.queryParamAsync = function(sql, param) {
	var connectionPool = this._pool;
	return new Promise(function(resolve, reject) {
		connectionPool.getConnection(function (poolErr, connection) {
			if (poolErr) {
				reject(poolErr);
			} else {
				connection.query(sql, param, function (err, rows) {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
					connection.release();
				});
			}
		});
	});
}

Mysql.prototype.escape = function(obj) {
	return dbMysql.escape(obj);
}

Mysql.prototype.escapeId = function(obj) {
	return dbMysql.escapeId(obj);
}


Mysql.default = new Mysql(config.mysql);

module.exports = Mysql;