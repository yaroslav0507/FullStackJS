(function(){
    'use strict';

    angular
        .module('app')
        .directive('shoppingCart', shoppingCart);

    function shoppingCart(){
        return {
            restrict: 'EA',
            replace: true,
            controller: shoppingCartController,
            controllerAs: 'cartCtrl',
            templateUrl: 'shared/directives/shoppingCart/shopping-cart.html',
            link: function(scope, element, attrs){

            }
        }

    }

    function shoppingCartController(){

    }
})();