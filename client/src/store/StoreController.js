(function(){
    'use strict';

    angular
        .module('app')
        .controller('StoreController', StoreController);

    function StoreController(cart, CartService){

        var vm = this;

        angular.extend(vm, {
            cart: cart,
            addToCart: addToCart,
            deleteFromCart: deleteFromCart
        });

        function addToCart(id){
            CartService.addToCart(id).then(function(cart){
                vm.cart = cart;
            });
        }

        function deleteFromCart(id){
            CartService.deleteFromCart(id).then(function(cart){
                vm.cart = cart;
            });
        }
    }
})();