(function(){
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    function CheckoutController(CartService){

        var vm = this;

        angular.extend(vm, {
            cart: CartService.getCurrentCart(),
            checkout: checkout
        });

        function deleteFromCart(item){
            CartService.deleteFromCart(item);
        }

        function checkout(){
            CartService.saveCart(vm.cart);
        }

    }
})();