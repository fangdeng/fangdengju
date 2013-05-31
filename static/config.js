seajs.config({
    // Enable plugins
    plugins: ['shim','text'],

    // Configure alias
    alias: {
        'jquery': {
            src: '/static/lib/jquery-1.9.1.min.js',
            exports: 'jQuery'
        },
        'bootstrap': '/static/bootstrap/js/bootstrap.min.js'
    },
    debug: true
});