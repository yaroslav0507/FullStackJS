(function(){
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    function CartService($http){

        var service = {
            addToCart: addToCart,
            deleteFromCart: deleteFromCart,
            getCart: getCart
        };

        return service;

        function addToCart(obj){
            var item = {
                id: obj._id,
                qty: 1
            };

            $http.post('/add-to-cart/', item).then(function(res){
                return res;
            }, function(err){
                return err;
            });
        }

        function deleteFromCart(id){
            return $http.delete('/delete-from-cart/' + id).then(function(response){
                return response.data;
            });
        }

        function getCart(){
            return $http.get('/get-cart/').then(function(response){
                return response.data;
            })
        }

    }
})();