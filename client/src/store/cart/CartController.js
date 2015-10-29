(function(){
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    function CartController(CartService){

        var vm = this;

        angular.extend(vm, {
            cart: CartService.getCurrentCart(),
            deleteFromCart: deleteFromCart,
            deleteAll: clearCart,
            updateCart: updateCart
        });

        function deleteFromCart(item) {
            CartService.deleteFromCart(item);
        }

        function clearCart(){
            CartService.clearCart({
               silent: false
            });
        }

        function updateCart(){
            if(vm.cart){
                CartService.updateCart(vm.cart);
            }
        }

    }
})();