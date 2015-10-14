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
            controller: shoppingCartController,
            controllerAs: 'cartCtrl',
            templateUrl: 'shared/directives/shoppingCart/cart-directive.html',
            link: function(scope, CartService){

            }
        }

    }

    function shoppingCartController($scope, CartService){
        var vm = this;

        angular.extend(vm, {
            deleteFromCart: deleteFromCart
        });

        function deleteFromCart(id){
            CartService.deleteFromCart(id).then(function(cart){
                $scope.cart = cart;
            });
        }
    }


})();