'use strict';

var gulp = require('gulp');

gulp.task('fonts', function(){
    return gulp.src('client/vendors/bootstrap/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});