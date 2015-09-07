var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');


/* Basic tasks */
gulp.task('lint', function(){
    return gulp.src('js/*js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function(){
   return gulp.src('client/scss/*.scss')
       .pipe(sass())
       .pipe(rename('app.css'))
       .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['assets'], function(){
    gulp.src([
        '.tmp/assets.js',
        'client/js/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', function(){
   gulp.src([
       'client/vendors/angular/angular.js',
   ])
       .pipe(concat('assets.js'))
       .pipe(gulp.dest('.tmp'));
});

gulp.task('html', function(){
   return gulp.src('client/index.html')
       .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    gulp.watch('client/js/*.js', ['lint', 'scripts']);
    gulp.watch('client/scss/*.scss', ['sass']);
    gulp.watch('client/*.html', ['html']);
});

/* Browser Sync task */
gulp.task('serve', ['dev'], function(){
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('client/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', ['lint', 'sass', 'assets', 'scripts', 'html', 'watch']);


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

gulp.task('build', ['buildJS', 'buildCSS', 'buildHTML']);
