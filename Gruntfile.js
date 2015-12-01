module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controllers: {
                src: 'client/scripts/controllers/*.js',
                dest: 'server/public/assets/scripts/controllers.min.js'
            },
            factories: {
                src: 'client/scripts/factories/*.js',
                dest: 'server/public/assets/scripts/factories.min.js'
            }
        },
        copy: {
            jquery: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"
                ],
                "dest": "server/public/vendors/"
            },
            bootstrap: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css/',
                src: [
                    "bootstrap.min.css"
                ],
                dest: "server/public/vendors/"
            },
            angular: {
                expand: true,
                cwd: 'node_modules/angular/',
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            angularRoute: {
                expand: true,
                cwd: 'node_modules/angular-route/',
                src: [
                    "angular-route.min.js",
                    "angular-route.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            angularAnimate: {
                expand: true,
                cwd: 'node_modules/angular-animate/',
                src: [
                    "angular-animate.min.js",
                    "angular-animate.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            angularUpload: {
                expand: true,
                cwd: 'node_modules/ng-file-upload/dist/',
                src: [
                    "ng-file-upload.min.js",
                    "ng-file-upload-shim.min.js"
                ],
                dest: "server/public/vendors/"
            },
            fontAwesome: {
                expand: true,
                cwd: 'node_modules/font-awesome/css/',
                src: [
                    "font-awesome.min.css",
                    "font-awesome.css.map"
                ],
                dest: "server/public/vendors/"
            },
            fontAwesomeFonts:{
                expand: true,
                cwd: 'node_modules/font-awesome/fonts/',
                src: [
                    "*"
                ],
                dest: "server/public/fonts/"
            },
            bootstrapFonts:{
                expand: true,
                cwd: 'node_modules/fonts/',
                src: [
                    "*"
                ],
                dest: "server/public/vendors/fonts/"
            },
            underscore: {
                expand: true,
                cwd: 'node_modules/underscore/',
                src: [
                    "underscore-min.js",
                    "underscore-min.map"
                ],
                dest: "server/public/vendors/"
            },
            css: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/*.css"
                ],
                "dest": "server/public/assets/"
            },
            html: {
                expand: true,
                cwd: 'client/views',
                src: [
                    "*.html",
                    "*/*.html"
                ],
                dest: "server/public/views/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};