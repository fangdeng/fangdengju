define(function(require, exports, module) {
    // 引入jQuery
    var $ = require('jquery');
    // 引入bootstrap
    require('bootstrap')($);

    $(window).bind('resize', function() {
        resizeImg();
    });

    $(window).trigger('resize');

    function resizeImg() {
        var screenHeight = $(window).innerHeight();
        $('div.carousel-inner img', '#screen').css('height', screenHeight);
    }
});