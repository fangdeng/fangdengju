define(function(require, exports, module) {
    // 引入jQuery
    var $ = require('jquery');
    // 引入bootstrap
    require('bootstrap')($);

    $(window).bind('resize', function() {
        resizeBackgroundImg();
    });

    $(window).trigger('resize');


    var headerheight = $('div.headerDock', '#screen').outerHeight();

    console.log(headerheight)

    function resizeBackgroundImg() {
        var screenHeight = $(window).innerHeight(),
            screenWidth = $(window).innerWidth(),
            contentHeight = screenHeight - ($('div.headerDock', '#screen').outerHeight() + 1);

        $('div.bgWrapper', '#screen').css({
            'height': screenHeight,
            'width': screenWidth,
            'overflow': 'hidden'
        });

        $('div.bgWrapper img', '#screen').css({
            'height': screenHeight,
            'width': screenWidth
        });

        $('div.main div.content', '#screen').css({
            'height': contentHeight
        });


    }
});