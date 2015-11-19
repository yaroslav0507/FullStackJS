(function(){
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    function CheckoutController(CartService, OrdersService, $state, $scope, user, cart){

        var vm = this;

        angular.extend(vm, {
            user: user,
            cart: cart,
            checkout: checkout
        });

        function checkout(){
            if($scope.customerInfoForm.$valid){
                performCheckout();
            }
        }

        function performCheckout(){

            OrdersService.checkout(vm.cart, vm.user.contact).then(function(){
                CartService.clearCart({
                    silent: true
                });
                $state.go('store.checkout.success');
            }, function(){
                $state.go('store.main');
            });
        }

    }
})();