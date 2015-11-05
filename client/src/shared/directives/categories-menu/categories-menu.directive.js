(function(){
    'use strict';

    angular
        .module('app')
        .directive('categoriesMenu', categoriesMenu);

    function categoriesMenu(){
        return {
            restrict: 'EA',
            scope: {
                categories: '='
            },
            controller: categoriesMenuController,
            controllerAs: 'catMenuCtrl',
            templateUrl: 'shared/directives/categories-menu/categories-menu.html',
            link: function(scope, element, attrs){
                var path = attrs.href;

            }
        };
    }

    function categoriesMenuController($location){
        console.log("Path: ", $location.path());
    }
})();