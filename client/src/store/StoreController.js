(function(){
    'use strict';

    angular
        .module('app')
        .controller('StoreController', StoreController);

    function StoreController(cart, categories, CartService, UsersService, $state, $cookies){

        var vm = this;

        angular.extend(vm, {
            cart: cart,
            categories: categories,
            addToCart: addToCart,
            buyNow: buyNow
        });

        initialize();

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

        function initialize(){
            UsersService.getUserData().then(function(response){
                var userID = response.data._id;

                $cookies.put('user.id', userID);
            });

        }
    }

})();