'use strict';

gulp.task('dev', ['lint', 'scripts', 'html', 'styles', 'fonts', 'images','watch']);

gulp.task('serve', ['dev'], function(){

    browserSync.init(null, {
        proxy: "http://localhost:" + process.env.SERVER_PORT,
        files: ["./dist/"],
        browser: "google chrome",
        port: 7000
    });

    gulp.watch('./dist/index.html').on('change', browserSync.reload);

});

