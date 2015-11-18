(function(){
    'use strict';

    angular
        .module('app')
        .factory('OrdersService', OrdersService);

    function OrdersService($http){

        var order = {};

        var service = {
            checkout: checkout,
            getAll: getAll,
            deleteOrder: deleteOrder,
            getUserOrders: getUserOrders
        };

        return service;

        function checkout(cart, customer){
            order.cart = cart;
            order.customer = customer;

            return $http.post('/checkout/', order).then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }

        function getAll(){
            return $http.get('/get-orders/').then(function(response){
                return response.data;
            });
        }

        function deleteOrder(id){
            return $http.delete('/order/' + id).then(function(response){
                angular.copy(order, response.data);
                return response.data;
            });
        }

        function getUserOrders(){
            return $http.get('/get-user-orders/').then(function(response){
                return response.data;
            });
        }

    }
})();