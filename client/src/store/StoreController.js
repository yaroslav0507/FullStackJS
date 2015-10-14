(function(){
    'use strict';

    angular
        .module('app')
        .controller('StoreController', StoreController);

    function StoreController(cart, CartService){

        var vm = this;

        angular.extend(vm, {
            cart: cart,
            addToCart: addToCart
        });

        function addToCart(id){
            CartService.addToCart(id).then(function(cart){
                vm.cart = cart;
            });
        }
    }
})();