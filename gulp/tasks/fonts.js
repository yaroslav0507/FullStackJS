'use strict';

gulp.task('fonts', function(){
    return gulp.src([
        'client/vendors/bootstrap/fonts/*.*',
        'client/vendors/components-font-awesome/fonts/*.*',
        'client/fonts/**/*.*'
    ])
        .pipe(gulp.dest('dist/fonts'));
});