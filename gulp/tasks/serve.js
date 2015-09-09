'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('dev', ['lint', 'scripts', 'html', 'styles', 'fonts', 'watch']);

gulp.task('serve', ['dev'], function(){

    browserSync.init(null, {
        proxy: "http://localhost:" + process.env.SERVER_PORT,
        files: ["./dist/"],
        browser: "google chrome",
        port: 7000
    });
    console.log(process.env.SERVER_PORT);

    gulp.watch('client/**/*.*').on('change', browserSync.reload);
});
