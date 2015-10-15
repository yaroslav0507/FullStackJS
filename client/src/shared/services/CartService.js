(function(){
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    function CartService($http){
        var cart = {};

        var service = {
            addToCart: addToCart,
            deleteFromCart: deleteFromCart,
            getCart: getCart,
            getCurrentCart: getCurrentCart
        };

        return service;

        function addToCart(obj){
            var item = {
                id: obj._id,
                qty: 1
            };

            return $http.post('/add-to-cart/', item).then(function(response){
                angular.copy(response.data, cart);
                toastr["success"]( cart.items[cart.items.length-1].title + " was added to your cart", "Shopping Cart");

                return cart;
            }, function(err){
                return err;
            });
        }

        function deleteFromCart(item){
            var deletedItem;
            cart.items.forEach(function(cartItem){
                if(cartItem._id === item._id){
                    deletedItem = cartItem.title;
                }
            });

            return $http.delete('/delete-from-cart/' + item._id).then(function(response){
                angular.copy(response.data, cart);
                toastr["info"]( deletedItem + " was successfully deleted", "Shopping Cart");

                return cart;
            }, function(err){
                return err;
            });
        }

        function getCart(){
            return $http.get('/get-cart/').then(function(response){
                angular.copy(response.data, cart);
                return cart;
            })
        }

        function getCurrentCart() {
            return cart;
        }

    }
})();