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
            templateUrl: 'shared/directives/categories-menu/categories-menu.html'
        };
    }

    function categoriesMenuController($location){

        this.isActive = function(link){
            return '#' + $location.path() === link;
        };
    }

})();