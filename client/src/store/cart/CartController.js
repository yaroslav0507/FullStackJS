(function(){
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    function CartController(CartService, $scope){

        var vm = this;

        angular.extend(vm, {
            cart: CartService.getCurrentCart(),
            deleteFromCart: deleteFromCart,
            deleteAll: CartService.deleteAll,
            updateCart: updateCart
        });

        function deleteFromCart(item) {
            CartService.deleteFromCart(item);
        }

        function updateCart(){
            if(vm.cart){
                CartService.updateCart(vm.cart);
            }
        }

    }
})();