'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var seq = require('sequence-stream');

gulp.task('styles', function(){

    var reset = gulp.src('client/scss/reset.css');

    var compile = gulp.src([
        'client/scss/main.scss'
    ])
        .pipe(sass());

    var assets = gulp.src([
        'client/vendors/bootstrap/dist/css/bootstrap.css'
    ])
        .pipe(concat('assets.css'));

    // Combine all the streams
    return seq([reset, assets, compile])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'));
});
