(function(){
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    function CartService($http){

        var service = {
            addToCart: addToCart,
            deleteFromCart: deleteFromCart
        };

        return service;

        function addToCart(obj){
            var item = {
                id: obj._id,
                qty: 1
            };

            $http.post('/add-to-cart/', item, function(response){
                return response;
            });
        }

        function deleteFromCart(id){
            return $http.delete('/delete-from-cart/' + id).then(function(response){
                return response.data;
            });
        }

    }
})();