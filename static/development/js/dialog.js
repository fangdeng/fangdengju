/**
 * Created with JetBrains WebStorm.
 * User: dongming
 * Date: 13-6-7
 * Time: 下午1:27
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
    // 引入jQuery
    var $ = require('jquery');
    // 引入jquery ui
    require('jqueryui')($);

    exports.init = function() {
        bindEvent();
    }

    function bindEvent() {
        $('a.openApp', '#screen').bind('click', function(e) {
            e.preventDefault();
            createDialog($(this));

        });

        // 最小化对话框
        $('body').on('click', 'div.customDialog a.minisize', function(e) {
            e.preventDefault();
            miniDialog($(this));
        });

        // 最大化对话框
        $('body').on('click', 'div.customDialog a.maxsize', function(e) {
            e.preventDefault();
            maxDialog($(this));
        });

        // 还原对话框
        $('body').on('click', 'div.customDialog a.restore', function(e) {
            e.preventDefault();
            restoreDialog($(this));
        });

        // 关闭对话框
        $('body').on('click', 'div.customDialog a.shutdown', function(e) {
            e.preventDefault();
            closeDialog($(this));
        });


    }
    // 创建对话框节点
    function createDialog( thisElement ) {
        var randomID = Math.floor(Math.random() * 1000),
            dialogID = 'dialog_' + randomID,
            hasDialogId = thisElement.data('dialogId'),
            appUrl = thisElement.data('appLink');

        console.log(hasDialogId)

        if( typeof hasDialogId !== 'undefined' && hasDialogId !== '' ) {
            $('#' + hasDialogId).dialog('open');
        } else {
            $('<div id="' + dialogID + '"><iframe src="' + appUrl + '" frameborder="0" width="100%" height="100%"></iframe></div>').appendTo($('div.main', '#screen')).hide();
            $('a.openApp', '#screen').attr('data-dialog-id', dialogID);
            $('a.openApp', '#screen').attr('appIndex', dialogID);
            initDialog(dialogID);
        }
    }

    function initDialog( dialogID ) {
        var id = '#' + dialogID,
            windowHeight = $(window).innerHeight(),
            windowWidth = $(window).innerWidth();

        $(id).dialog({
            autoOpen: false,
            dialogClass: 'customDialog',
            width: windowWidth * 0.6,
            height: windowHeight * 0.9
        });

        var toolbar = '<div class="handleBar">\
                            <div class="handleFunction">\
                                <a href="#" class="refresh" title="刷新当前页面"><i class="icon-refresh"></i></a>\
                                <a href="#" class="addToolBox" title="添加到工具箱"><i class="icon-plus"></i></a>\
                                <a href="#" class="addWorkflow" title="添加到工作流"><i class="icon-retweet"></i></a>\
                            </div>\
                            <div class="title">响应式设计工具</div>\
                            <div class="handleWindow">\
                                <a href="#" class="minisize"><i class="icon-minisize"></i></a>\
                                <a href="#" class="maxsize"><i class="icon-maxsize"></i></a>\
                                <a href="#" class="shutdown"><i class="icon-close"></i></a>\
                            </div>\
                        </div>';

        $(id).prev().html(toolbar);

        $(id).dialog( "open" );
    }

    function miniDialog( ele ) {
        ele.closest('div.ui-dialog-titlebar').next().dialog('close');
    }

    function maxDialog( ele ) {
        var windowHeight = $(window).innerHeight(),
            windowWidth = $(window).innerWidth();

        ele.closest('div.ui-dialog').css({
            width: windowWidth,
            height: windowHeight,
            top: 0,
            left: 0
        });

        ele.addClass('restore');
    }

    function closeDialog( ele ) {
        var id = ele.closest('div.ui-dialog-titlebar').next().attr('id');
        $('a[appIndex=' + id +']', '#screen').attr('data-dialog-id', '');
        ele.closest('div.ui-dialog-titlebar').next().dialog('destroy');
    }

    function restoreDialog( ele ) {
        var windowHeight = $(window).innerHeight(),
            windowWidth = $(window).innerWidth();

        ele.closest('div.ui-dialog').css({
            width: windowWidth * 0.6,
            height: windowHeight * 0.9,
            top: (windowHeight - windowHeight * 0.9) / 2,
            left: (windowWidth - windowWidth * 0.6) / 2
        });

        ele.removeClass('restore');
    }
});
