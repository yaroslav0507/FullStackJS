(function(){
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    function CartService($window, $http){

        var service = {
            getCart: getCart,
            addToCart: addToCart,
            createCart: createCart,
            updateCart: updateCart
        };

        return service;

        function createCart(objName, obj){
            var cart = {
                total: 0,
                items: []
            };
            var items = cart.items;
            var item = {
                id: obj._id,
                qty: 1
            };

            items.push(item);

            cart = JSON.stringify(cart);

            $window.localStorage.setItem(objName, cart);
        }

        function updateCart(objName, obj){
            var cart = JSON.parse($window.localStorage.getItem(objName));
            var items = cart.items;
            items.forEach(function(item){
               if(item._id == obj._id){
                   item.qty += 1;
               }
            });

            var item = {
                id: obj._id,
                qty: 1
            };

            items.push(item);
            cart.total += obj.price;

            cart = JSON.stringify(cart);

            $window.localStorage.setItem(objName, cart);
        }

        function getCart(objName){
            return JSON.parse($window.localStorage[objName]);
        }

        function addToCart(item){
            if($window.localStorage['cart']){
                updateCart('cart', item);
                console.log(getCart('cart'));
            } else {
                createCart('cart', item);
                console.log(getCart('cart'));
            }

        }


    }
})();