/**
 * @author dongming.jidm
 * @date 2013-05-28
 * 应用起始页面
 */

var express = require('express');
var domain = require('domain');

var port = 3000;
// 日志配置
var log4js = require('log4js');

// 5分钟轮询一次日志配置文件
log4js.configure('./log.json', { reloadSecs: 300 });
var logger = log4js.getLogger('info-logger');

logger.setLevel('INFO');

var staticPath = __dirname + '/static';

var app = express();
app.engine('.html', require('ejs').__express);
app.use(app.router);


app.use('/static', express.static(staticPath));
app.use(express.errorHandler());

app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.configure(function() {
    app.use(log4js.connectLogger(logger, { level: 'auto' }));
});

//引入一个domain的中间件，将每一个请求都包裹在一个独立的domain中
//domain来处理异常
app.use(function (req,res, next) {
    var d = domain.create();
    //监听domain的错误事件
    d.on('error', function (err) {
        logger.error(err);
        res.statusCode = 500;
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);
});


app.get('/', function(req, res) {
    var tools = require('./controllers/default_tools');
    res.render('index', {tools: tools.tools});
});

app.get('/mytools.html', function(req, res) {
    var tools = require('./controllers/default_tools');
    res.render('mytools', {tools: tools.tools});
});

app.get('/myworkflow.html', function(req, res) {
    var tools = require('./controllers/default_tools');
    res.render('myworkflow', {tools: tools.tools});
});

app.listen(port);

logger.info('Server start at port', port);
console.log('Server start at port', port);
