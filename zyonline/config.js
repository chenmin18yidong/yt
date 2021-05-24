/***************************
 *The app configuration
 *
 **************************/

 var path = require('path');

 var config = {
 	//程序运行端口
 	 port: 9008,
	 hostname: '127.0.0.1',
     mysql : {
        host:'', //服务器地址
        port:3306, //端口
        connectionLimit:10, //连接池限制
        database:'', //数据库名
        user:'', //用户名
        password:'', //密码
        connectTimeout: 6 * 1000,
        connectionLimit: 50
    },
    testServer : {
        'url': 'http://120.27.142.68:7012',
        'SessionKey': '454DAF688EE799C0C12D0CFBE56FE62B'
    }
};


 module.exports = config;

 