'use strict';

var jshint = require('gulp-jshint');
var seq = require('sequence-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('lint', function(){
    return gulp.src('src/*js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){

    var vendors = gulp.src([
        'client/vendors/angular/angular.js',
        'client/vendors/jquery/dist/jquery.js',
        'client/vendors/angular-ui-router/release/angular-ui-router.js',
        'client/vendors/ng-file-upload/ng-file-upload-all.js' ,
        'client/vendors/bootstrap/dist/js/bootstrap.js',
        'client/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
        'client/vendors/toastr/toastr.js'
    ], {base: 'vendors'});

    var app = gulp.src([
        './client/src/app/app.js',
        './client/src/**/*.js'
    ]);

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

