(function(){
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    function CheckoutController(CartService, $state){

        var vm = this;

        angular.extend(vm, {
            cart: CartService.getCurrentCart(),
            checkout: checkout
        });

        function checkout(){
            CartService.deleteAll().then(function(){
                $state.go('store.checkout.success');
            })
        }

    }
})();