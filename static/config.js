seajs.config({
    // Enable plugins
    plugins: ['shim','text'],

    // Configure alias
    alias: {
        'jquery': {
            src: './static/lib/jquery-1.9.1.min.js',
            exports: 'jQuery'
        },
        'bootstrap': '../../bootstrap/js/bootstrap.min.js',
        'jqueryui': '../../lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js',
        'mousewheel': '../../scrollbar/jquery.mousewheel.js',
        'scrollbar': '../../scrollbar/perfect-scrollbar.js'
    },
    debug: true
});