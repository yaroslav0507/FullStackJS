(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService($http){

        var service = {
            getAll: getAll,
            getItem: getItem,
            addItem: addItem,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        return service;

        function getAll(){
            return $http.get('/items').then(function(response){
                console.log(response.data);
                return response.data;
            })
        }

        function getItem(id){
            return $http.get('/items/' + id).then(function(response){
               return response.data;
            });
        }

        function addItem(item){
            return $http.post('/items/', item).then(function(response){
               return response.data;
            });
        }

        function updateItem(item){
            return $http.put('/items/' + item._id, item).then(function(response){
                return response.data;
            })
        }

        function deleteItem(id){
            return $http.delete('/items/' + id).then(function(response){
                return response.data;
            })
        }
    }
})();