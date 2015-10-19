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
            error: errorFunc
        });

        function addToCart(id){
            CartService.addToCart(id).then(function(cart){
                vm.cart = cart;
            });
        }

        function errorFunc(evt){
            toastr.warning('This action is under development!', 'Rejected');
            evt.stopPropagation();
        }
    }
})();