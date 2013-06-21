/**
 * Created with JetBrains WebStorm.
 * User: dongming
 * Date: 13-6-17
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    // 引入jQuery
    var $ = require('jquery');
    // 引入bootstrap
    require('bootstrap')($);
    // 引入jquery ui
    require('jqueryui')($);

    var resizePage = require('./pageresize');

    resizePage.init();

    $('#myModal').modal({
        backdrop: true
    });

});
