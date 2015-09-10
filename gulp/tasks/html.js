'use strict';

gulp.task('html', function(){
    return gulp.src('client/index.html')
        .pipe(gulp.dest('dist'));
});