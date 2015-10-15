(function(){
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    function CartController(CartService){

        var vm = this;

        angular.extend(vm, {
            cart: CartService.getCurrentCart(),
            deleteFromCart: deleteFromCart
        });

        function deleteFromCart(item){
            CartService.deleteFromCart(item);
        }

    }
})();