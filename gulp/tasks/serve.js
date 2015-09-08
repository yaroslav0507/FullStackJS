'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('dev', ['lint', 'scripts', 'html', 'styles', 'watch']);

gulp.task('serve', ['dev'], function(){
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('client/**/*.*').on('change', browserSync.reload);
});
