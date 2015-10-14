(function(){
    'use strict';

    angular
        .module('app')
        .directive('shoppingCart', shoppingCart);

    function shoppingCart(){
        return {
            restrict: 'EA',
            scope: {
                cart: "="
            },
            templateUrl: 'shared/directives/shoppingCart/shopping-cart.html',
            link: function(scope){

            }
        }

    }


})();