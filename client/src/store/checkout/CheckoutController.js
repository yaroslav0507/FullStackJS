(function(){
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    function CheckoutController(CartService, CheckoutService, $state){

        var vm = this;

        angular.extend(vm, {
            cart: CartService.getCurrentCart(),
            checkout: checkout,
            customer: {
                name: "Yaroslav",
                address: "Kiev, Ukraine",
                phone: "093 34 95 811",
                email: "yaroslav0507@gmail.com"
            }
        });

        function checkout(){

            CheckoutService.checkout(vm.cart, vm.customer).then(function(){
                $state.go('store.checkout.success');
            }, function(){
                $state.go('store.main');
            });

        }

    }
})();