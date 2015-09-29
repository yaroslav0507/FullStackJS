(function(){
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    function CartService($http){

        var service = {
            addToCart: addToCart
        };

        return service;

        function addToCart(item){
            return $http.post('/add-to-cart', item).then(function(response){
                return response.data;
            }).catch(function (err) {
                return err;
            })
        }


    }
})();