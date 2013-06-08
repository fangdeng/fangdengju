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

        // 刷新按钮
        $('body').on('click', 'div.customDialog a.refreshApp', function(e) {
            e.preventDefault();
            refreshIframe($(this));
        });


    }
    // 创建对话框节点
    function createDialog( thisElement ) {
        var hasDialogId = thisElement.attr('dialogId'),
            appName = thisElement.data('appName'),
            appUrl = thisElement.data('appLink');

        if( typeof hasDialogId !== 'undefined' && hasDialogId !== '' ) {
            $('#' + hasDialogId).closest('div.ui-dialog').show();
        } else {
            var randomID = Math.floor(Math.random() * 1000),
                dialogID = 'dialog_' + randomID;

            $('<div id="' + dialogID + '"><iframe src="' + appUrl + '" frameborder="0" width="100%" height="100%"></iframe></div>').appendTo($('div.main', '#screen')).hide();
            thisElement.attr('dialogId', dialogID);
            initDialog(dialogID, appName);
        }
    }

    function initDialog( dialogID, appName ) {
        var id = '#' + dialogID,
            windowHeight = $(window).innerHeight(),
            offset = Math.floor(Math.random() * 100),
            windowWidth = $(window).innerWidth();

        $(id).dialog({
            autoOpen: false,
            dialogClass: 'customDialog',
            width: windowWidth * 0.6,
            height: windowHeight * 0.9,
            position: {
                my: "center",
                at: "center+"+ offset,
                of: window
            }
        });

        var toolbar = '<div class="handleBar">\
                            <div class="handleFunction">\
                                <a href="#" class="refreshApp" title="刷新当前页面"><i class="icon-refresh"></i></a>\
                                <a href="#" class="addToolBox" title="添加到工具箱"><i class="icon-plus"></i></a>\
                                <a href="#" class="addWorkflow" title="添加到工作流"><i class="icon-retweet"></i></a>\
                            </div>\
                            <div class="title">' + appName + '</div>\
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
        ele.closest('div.ui-dialog').hide();
    }

    function maxDialog( ele ) {
        var windowHeight = $(window).innerHeight(),
            windowWidth = $(window).innerWidth();

        ele.closest('div.ui-dialog-titlebar').next().dialog({
            width: windowWidth,
            height: windowHeight
        });

        ele.addClass('restore');
    }

    function closeDialog( ele ) {
        var id = ele.closest('div.ui-dialog-titlebar').next().attr('id');
        $('a[dialogId=' + id +']', '#screen').attr('dialogId', '');
        ele.closest('div.ui-dialog-titlebar').next().dialog('destroy');
    }

    function restoreDialog( ele ) {
        var windowHeight = $(window).innerHeight(),
            windowWidth = $(window).innerWidth();

        ele.closest('div.ui-dialog-titlebar').next().dialog({
            width: windowWidth * 0.6,
            height: windowHeight * 0.9
        });

        ele.removeClass('restore');
    }

    function refreshIframe( ele ) {
        var src = ele.closest('div.ui-dialog').find('iframe')[0].src;

        ele.closest('div.ui-dialog').find('iframe')[0].src = src;
    }
});
