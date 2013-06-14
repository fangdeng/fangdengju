/**
 * Created with JetBrains WebStorm.
 * User: dongming
 * Date: 13-6-7
 * Time: 下午1:29
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    // 引入jQuery
    var $ = require('jquery');

    exports.init = function() {
        $(window).bind('resize', function() {
            resizeBackgroundImg();
        });

        $(window).trigger('resize');

    }

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