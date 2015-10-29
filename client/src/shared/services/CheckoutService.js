(function(){
    'use strict';

    angular
        .module('app')
        .factory('CheckoutService', CheckoutService);

    function CheckoutService($http){

        var order = {}

        var service = {
            checkout: checkout
        };

        return service;

        function checkout(cart, customer){
            order.cart = cart;
            order.customer = customer;

            console.log(order);

            return $http.post('/checkout/', order).then(function(response){;
                return response;
            }, function(err){
                return err;
            });
        }

    }
})();