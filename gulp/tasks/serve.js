'use strict';
var runSequence = require('run-sequence');

gulp.task('dev', function(callback){
    runSequence('scripts', 'styles', ['html',  'fonts', 'images', 'watch'], callback)
});

gulp.task('serve', ['dev'], function(){

    browserSync.init(null, {
        proxy: "http://localhost:" + process.env.SERVER_PORT,
        files: ["./dist/"],
        browser: "google chrome",
        port: 7000
    });

    gulp.watch('./dist/index.html').on('change', browserSync.reload);

});

