define(function(require, exports, module) {
    // 引入jQuery
    var $ = require('jquery');
    // 引入bootstrap
    require('bootstrap')($);
    // 引入jquery ui
    require('jqueryui')($);

    require('mousewheel')($);
    require('scrollbar')($);

    var resizePage = require('./pageresize');

    resizePage.init();

    var dialog = require('./dialog');

    dialog.init();

    $('div.cateWrapper', '#screen').perfectScrollbar();

});