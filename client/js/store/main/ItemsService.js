(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService($http){

        var service = {
            getAll: getAll,
            addItem: addItem,
            deleteItem: deleteItem
        };

        return service;

        function getAll(){
            return $http.get('/items').then(function(response){
                return response.data;
            })
        }

        function addItem(item){
            return $http.post('/items/', item).then(function(response){
               return response.data;
            });
        }

        function deleteItem(id){
            return $http.delete('/items/' + id).then(function(response){
                return response.data;
            })
        }
    }
})();