(function(){
    'use strict';

    angular
        .module('app')
        .factory('LocalCartService', LocalCartService);

    function LocalCartService($window, $http){

        var cartName = 'cart';

        var service = {
            getCart: getCart,
            addToCart: addToCart,
            createCart: createCart,
            updateCart: updateCart,
            getItemById: getItemById,
            deleteFromCart: deleteFromCart,
            getItemsCount: getItemsCount
        };

        return service;

        function createCart(cartName, obj){
            /* initializing an empty cart object */
            var cart = {
                total: 0,
                items: []
            };

            _addItemToCart(cartName, cart, obj);
        }

        function getCart(cartName){
            var cart = $window.localStorage[cartName];
            if (cart){
                return JSON.parse(cart);
            }
        }

        function getItemsCount(){
            var cart = getCart(cartName);

            if(cart){
                console.log(cart);
                return cart.items.length;
            } else {
                return 0;
            }
        }

        function _addItemToCart(cartName, cart, obj){

            var items = cart.items;
            var item = {
                id: obj._id,
                name: obj.title,
                qty: 1
            };

            items.push(item);
            //cart.total += obj.price;

            cart = JSON.stringify(cart);

            $window.localStorage.setItem(cartName, cart);

        }

        function updateCart(cartName, obj){
            /* getting cart object from local storage */
            var cart = getCart(cartName);

            _addItemToCart(cartName, cart, obj);
        }

        function getItemById(cartName, id){
            var cart = getCart(cartName);
            var result;

            cart.items.forEach(function(item){
                if(item.id == id){
                    result = item;
                } else {
                    result = 'Item not found by id: ' + id;
                }
            });

            return result;
        }

        function deleteFromCart(id){
            var cart = getCart(cartName);

            var searchTerm = id,
                index = -1;
            for(var i = 0, len = cart.items.length; i < len; i++) {
                if (cart.items[i].id === searchTerm) {
                    index = i;
                    break;
                }
            }

            console.log(index);

            if(index >= 0){
                cart.items.splice(index,1);

                cart = JSON.stringify(cart);
                $window.localStorage.setItem(cartName, cart);

                console.log(getCart(cartName));
            }

            return index;
        }

        function addToCart(obj){
            var item = {
                id: obj._id,
                qty: 1
            };

            $http.post('/add-to-cart/', item, function(response){
                return response;
            });
            //if($window.localStorage[cartName]){
            //    updateCart(cartName, item);
            //    console.log(getCart(cartName));
            //} else {
            //    createCart(cartName, item);
            //    console.log(getCart(cartName));
            //}
        }

    }
})();