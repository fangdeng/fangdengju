/**
 * @author dongming.jidm
 * @date 2013-05-28
 * 应用起始页面
 */

var express = require('express');
var members = require('./model/members');

var port = 3000;
var staticPath = __dirname + '/static';

var app = express();

app.engine('.html', require('ejs').__express);

app.use(app.router);
app.use('/static', express.static(staticPath));
app.use(express.errorHandler());


app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.get('/', function(req, res) {
    res.render('index', {members: members.members});
});

app.listen(port);

console.log('listening on port: ', port);
