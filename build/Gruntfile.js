module.exports = function(grunt) {

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-processhtml');

    var _vendorPath = "../../vendor/";


    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js')();

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {

        /**
         * We read in our `package.json` file so we can access the package name and version. It's already there, so
         * we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The banner is the comment that is placed at the top of our compiled source files. It is first processed
         * as a Grunt template, where the `<%=` pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
            ' * @appName    <%= pkg.name %>\n' +
            ' * @version    <%= pkg.version %>\n' +
            ' * @date       <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * @homepage   <%= pkg.homepage %>\n' +
            ' * @author  <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                //' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
            ' */\n'
        },

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            src: [
                '<%= buildDir %>/'
            ],
            hooks: [
            ],
            options: {
                force: true
            }
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy our project assets
         * (images, fonts, etc.) and javascripts into `buildDir`, and then to copy the assets to `compileDir`.
         */
        copy: {
            index: {
                files: [
                    {
                        src: '<%= devDir %>/index.html',
                        dest: '<%= buildDir %>/index.html'
                    },
                    {
                        src: '<%= devDir %>/js/require-config.js',
                        dest: '<%= buildDir %>/js/require-config.js'
                    }
                ]
            },
            build_assets: {
                files: [
                    {
                        src: [ '**', '!sass/**','!config.rb'],
                        cwd: '<%= devDir %>/css',
                        dest: '<%= buildDir %>/css/',
                        expand: true
                    }

                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [
                             'requirejs/require.js'
                        //    ,'jquery/dist/jquery.js'
                        //    , 'requirejs-text/text.js'
                        ],
                        cwd: '<%=vendorDir%>',
                        dest: '../dist/vendor',
                        expand: true
                    }
                ]
            },
            prod_app: {
                files: [
                    {
                        src: '<%= devDir %>/js/main.js',
                        dest: '<%= buildDir %>/js/main.js',
                        expand: false

                    }
                ]
            }

        },


        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {

            /**
             * The `source` target is the concatenation of our application source code and all specified vendor
             * source code into a single file.
             */
            source: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: ['<%= buildDir %>/js/main.js'],
                dest: '<%= buildDir %>/js/main.js'
            }
        },
        cssmin: {
            minify: {
                expand: false,
                files: {
                    '<%=devDir%>/css/tasks.css': ['<%=buildDir%>/css/tasks.css']
                }

            }
        },

        processhtml: {
            dist: {
                files: {
                    '<%=buildDir%>/index.html': ['<%=buildDir%>/index.html']
                }
            }
        },

        /**
         * Minifies RJS files and makes it production ready
         * Build files are minified and encapsulated using RJS Optimizer plugin
         */
        requirejs: {
            compile: {
                options: {

                    waitSeconds : 120,
                    appDir  : '',
                    baseUrl : '<%= devDir %>/js',
                    paths   :
                    {
                        // Configure alias to full paths
                        "jquery" : _vendorPath+'jquery/dist/jquery'
                       // , "text": _vendorPath+"requirejs-text/text"
                        , "templates": '../templates'
                        , "hbs": _vendorPath+"require-handlebars-plugin/hbs"
                    },

                    urlArgs: 'v=1.0',

                    shim:
                    {

                    },

                    name: 'main',
                    out: '<%= buildDir %>/js/main.js'


                },
                generateSourceMaps: true,
                preserveLicenseComments : true,
                optimize: "uglify2"
            }
        }

    };




    grunt.registerTask( "build", [
            'clean:src'
          , 'copy:build_assets'
          , 'copy:build_vendorjs'
          , 'copy:prod_app'
          , 'copy:index'
          , 'processhtml'
          , "requirejs"
          , "cssmin:minify"
          , "concat:source"
    ]);

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

};