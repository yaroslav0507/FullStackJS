(function(){
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    function CartController(cart, ItemsService, CartService){

        var vm = this;

        angular.extend(vm, {
            cart: cart,
            deleteFromCart: deleteFromCart
        });

        function deleteFromCart(id){
            CartService.deleteFromCart(id).then(function(cart){
                vm.cart = cart;
            });
        }

    }
})();