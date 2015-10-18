'use strict';

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var seq = require('sequence-stream');

gulp.task('styles', function(){

    var reset = gulp.src('client/scss/reset.css');

    var compile = gulp.src([
        'client/scss/main.scss',
        'client/scss/admin.scss'
    ])
        .pipe(sass());

    var assets = gulp.src([
        'client/vendors/bootstrap/dist/css/bootstrap.css',
        'client/vendors/components-font-awesome/css/font-awesome.css',
        'client/vendors/toastr/toastr.css'
    ])
        .pipe(concat('assets.css'));

    // Combine all the streams
    return seq([reset, assets, compile])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

});
