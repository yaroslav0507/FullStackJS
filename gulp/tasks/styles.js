'use strict';

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var seq = require('sequence-stream');
var cssGlobbing = require('gulp-css-globbing');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('styles', function(){

    var compile = gulp.src(['./client/scss/core.scss'], {base: 'app'})
        .pipe(cssGlobbing({
            extensions : ['.scss']
        }))

        .pipe(sass());


    var assets = gulp.src(config.paths.src.vendors.styles)
        .pipe(concat('assets.css'));

    // Combine all the streams
    return seq([assets, compile])
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('maps', {sourceRoot: '/client'}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

});
