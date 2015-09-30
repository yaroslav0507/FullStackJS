'use strict';

gulp.task('images', function(){
    return gulp.src('client/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});