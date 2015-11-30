'use strict';

module.exports = function() {
   var ngModules = [
       './client/vendors/angular/angular.js',
       './client/vendors/angular-animate/angular-animate.js',
       './client/vendors/angular-ui-router/release/angular-ui-router.js',
       './client/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
       './client/vendors/angular-loading-bar/src/loading-bar.js',
       './client/vendors/angular-cookies/angular-cookies.js',
       './client/vendors/ng-file-upload/ng-file-upload-all.js'
   ];

   var vendors = {
       scripts: ngModules.concat([
           './client/vendors/jquery/dist/jquery.js',
           './client/vendors/elevatezoom/jquery.elevateZoom-2.2.3.min.js',
           './client/vendors/bootstrap/dist/js/bootstrap.js',
           './client/vendors/toastr/toastr.js'
       ]),
       styles: [
           './client/vendors/bootstrap/dist/css/bootstrap.css',
           './client/vendors/angular-ui-router-anim-in-out/css/anim-in-out.css',
           './client/vendors/components-font-awesome/css/font-awesome.css',
           './client/vendors/toastr/toastr.css',
           './client/vendors/angular-loading-bar/src/loading-bar.css'
       ]
   };

    var components = [
        './client/src/app/app.js',
        './client/src/**/*.js',
        '!./client/src/**/*.spec.js'
    ];

   return {
     paths: {
         src: {
             vendors: {
                 ngModules: ngModules,
                 scripts: vendors.scripts,
                 styles: vendors.styles
             },
             components: components
         }
     }
   };
};