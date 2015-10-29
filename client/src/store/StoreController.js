(function(){
    'use strict';

    angular
        .module('app')
        .controller('StoreController', StoreController);

    function StoreController(cart, CartService, $state){

        var vm = this;

        angular.extend(vm, {
            cart: cart,
            addToCart: addToCart,
            buyNow: buyNow,
            error: errorFunc
        });

        function addToCart(item){
            CartService.addToCart(item).then(function(cart){
                vm.cart = cart;
            });
        }

        function buyNow(item){
            CartService.addToCart(item).then(function(cart){
                vm.cart = cart;
                $state.go('store.checkout');
            });
        }

        function errorFunc(evt){
            toastr.warning('This action is under development!', 'Rejected');
            evt.stopPropagation();
        }
    }
})();