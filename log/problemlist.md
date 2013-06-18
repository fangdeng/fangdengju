开发过程问题记录
==========

1. 设置静态目录时
    ```javascript
        var staticPath = __dirname + '/static';
        app.use('/static', express.static(staticPath));
        // 不能写成这样
        app.use(express.static(staticPath)); // 必须要加静态目录的根目录参数
    ```

2. seajs设置别名时
    非cmd模块儿，例如bootstrap要改造成cmd模块儿然后，在别名设置里这样设置：
    ```javascript
       'bootstrap': '/static/bootstrap/js/bootstrap.min.js'
    ```
    模块化的方式如下：
    ```javascript
        define(function(require, exports, module){
             return function($){
                  //bootstrap.js的源代码
                  !(function($){
                       ….
                  })($)
                  /*
                   注意：
                   bootstrap.js的源代码是由若干!(function($){...})(window.jQuery)段落组成的
                   需要将最后传入的参数改成 $
                  */
             }
        });
    ```
    在其他模块中，这样引用：
    ```javascript
        require('bootstrap')($);
    ```
