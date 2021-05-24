/***********************
 *项目入口文件
 *
 **********************/
//process.env.DEBUG='*'      //  返回服务详细信息
var config       = require('./config');//引入配置文件
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');         //中间件
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var cors         = require('cors');//跨域处理模块
var AntiWy    = require('./middlewares/anti-wy');
var webroutes    = require('./routes/webroutes');//路由表
var lessMiddleware = require('less-middleware');

var app          = express();//express实例

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));//中间件

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text({type: '*/xml'}));
app.use(cookieParser());

// 允许引用的域名白名单
var hosts = ['127.0.0.1','192.168.1.172','192.168.1.113','192.168.1.59'];//'servicewechat','tibosi.com',

// 反盗链类型
var exts = ['.png', '.jpg', '.jpeg', '.gif'];
// 盗链默认指向图片
var pictrue = "/default.png";
app.use('/images',AntiWy({
  allow: hosts,
  exts: exts,
  strict: false,
  log: console.log, // 你也可以使用自己的方法来记录
  default: pictrue
}));

// less
app.use(lessMiddleware('/less', {
    dest: '/stylesheets',
    // debug:true,
    force: true,
    pathRoot: path.join(__dirname, 'public')
}));

app.use(express.static(path.join(__dirname, 'public')));

//设置跨域头
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//使用cors模块解决跨域
app.use(cors());

app.use(function(req, res, next) {
    console.log('*****%s %s', req.method, req.url);
    next();
});



//路由处理
webroutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//listen port
app.listen(config.port, function(){
    console.log('TestService listening on port %d', config.port);
    console.log('You can debug it with http://' + config.hostname + ':' + config.port);
});

module.exports = app;
