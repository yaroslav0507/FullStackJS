'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

/* Release tasks */
gulp.task('buildJS', ['default'], function(){
    return gulp.src('client/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('release'));
});

gulp.task('buildCSS', ['default'], function(){
    return gulp.src('client/**/*.css')
        .pipe(concat('app.css'))
        .pipe(gulp.dest('release'));
});

gulp.task('buildHTML', function(){
    return gulp.src('client/index.html')
        .pipe(gulp.dest('release'));
});

gulp.task('release', ['buildJS', 'buildCSS', 'buildHTML']);