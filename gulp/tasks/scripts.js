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

    var vendors = gulp.src([
        './client/vendors/angular/angular.js',
        './client/vendors/jquery/dist/jquery.js',
        './client/vendors/elevatezoom/jquery.elevateZoom-2.2.3.min.js',
        './client/vendors/angular-ui-router/release/angular-ui-router.js',
        './client/vendors/angular-cookies/angular-cookies.js',
        './client/vendors/ng-file-upload/ng-file-upload-all.js',
        './client/vendors/bootstrap/dist/js/bootstrap.js',
        './client/vendors/toastr/toastr.js'
    ], {base: 'vendors'});

    var app = gulp.src([
        './client/src/app/app.js',
        './client/src/**/*.js',
        '!./client/src/**/*.spec.js'
    ], {base: 'src'});

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

