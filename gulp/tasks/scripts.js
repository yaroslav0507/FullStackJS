'use strict';

var jshint = require('gulp-jshint');
var seq = require('sequence-stream');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('lint', function(){
    return gulp.src('./client/src/**/*js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){

    var vendors = gulp.src(config.paths.src.vendors.scripts, {base: 'vendors'});

    var app = gulp.src(config.paths.src.components , {base: 'src'});

    var views = gulp.src([
        './client/src/**/*.html'
    ])
        .pipe(templateCache({
            module: 'app'
        }));

    // Combine all the streams
    return seq([vendors, app, views])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('maps', {sourceRoot: '/client'}))
        .pipe(gulp.dest('dist'))
        .on('end', browserSync.reload);
});

