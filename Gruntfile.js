module.exports = function(grunt) {

    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["static/development/less"]
                },
                files: {
                    "static/production/css/index.css": "static/development/less/index.less"
                }
            }
        },

        watch: {
            files: 'static/development/less/**/*.less',
            tasks: ['less']
        },

        uglify: {
            bootstrap: {
                files: {
                    'static/bootstrap/js/bootstrap.min.js': 'static/bootstrap/js/bootstrap.js'
                }
            },
            jqueryui: {
                files: {
                    'static/lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js': 'static/lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('watchless', ['watch']);
    grunt.registerTask('bootstrapmin', ['uglify:bootstrap']);
    grunt.registerTask('jqueryuimin', ['uglify:jqueryui']);

};









