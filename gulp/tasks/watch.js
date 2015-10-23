'use strict';

var gulp = require('gulp');

gulp.task('watch', function(){
    gulp.watch('client/src/**/*.js', ['lint', 'scripts']);
    gulp.watch(['client/scss/**/*.scss','client/src/**/*.scss'], ['styles']);
    gulp.watch('client/**/*.html', ['html', 'scripts']);
});