'use strict';

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');

/* Release tasks */
gulp.task('buildJS', function(){
    return gulp.src('dist/**/*.js')
        .pipe(concat('app.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('release'));
});

gulp.task('buildCSS', function(){
    var cssOption = {
        compatibility: 'ie8',
        s0: true
    };

    return gulp.src('dist/**/*.css')
        .pipe(concat('app.css'))
        .pipe(sourcemaps.init())
        .pipe(minifyCss(cssOption))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('release'));
});

gulp.task('buildHTML', function(){
    return gulp.src('dist/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('release'));
});

gulp.task('cloneFonts', function(){
    return gulp.src('dist/fonts/**.*')
        .pipe(gulp.dest('release/fonts/'));
});

gulp.task('cloneImages', function(){
    return gulp.src('dist/img/**/*.*')
        .pipe(gulp.dest('release/img/'));
});

gulp.task('release', ['buildJS', 'buildCSS', 'buildHTML', 'cloneFonts', 'cloneImages']);