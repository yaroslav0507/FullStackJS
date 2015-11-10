// Karma configuration
// Generated on Mon Nov 09 2015 18:18:06 GMT+0200 (FLE Standard Time)

module.exports = function (config) {

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon-chai'],

        plugins: [
            'karma-chai',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-mocha',
            'karma-ng-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-sinon-chai'
        ],

        // list of files / patterns to load in the browser

        files: [
            './client/vendors/angular/angular.js',
            './client/vendors/angular-mocks/angular-mocks.js',
            './client/vendors/angular-ui-router/release/angular-ui-router.js',
            './client/vendors/ng-file-upload/ng-file-upload.js',
            './client/src/app/app.js',
            './client/src/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
};
