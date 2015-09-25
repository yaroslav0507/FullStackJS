'use strict';

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/* Release tasks */
gulp.task('buildJS', ['dev'], function(){
    return gulp.src('dist/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('release'));
});

gulp.task('buildCSS', ['dev'], function(){
    return gulp.src('dist/**/*.css')
        .pipe(concat('app.css'))
        .pipe(gulp.dest('release'));
});

gulp.task('buildHTML', function(){
    return gulp.src('dist/index.html')
        .pipe(gulp.dest('release'));
});

gulp.task('cloneFonts', function(){
    return gulp.src('dist/fonts/**.*')
        .pipe(gulp.dest('release/fonts/'));
});

gulp.task('release', ['buildJS', 'buildCSS', 'buildHTML', 'cloneFonts']);