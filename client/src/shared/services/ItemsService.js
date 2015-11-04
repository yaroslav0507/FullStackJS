(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService($http, Upload){

        var service = {
            getAll: getAll,
            getItem: getItem,
            addItem: addItem,
            uploadImage: uploadImage,
            updateItem: updateItem,
            deleteItem: deleteItem,
            filterByCategory: filterByCategory
        };

        return service;

        function getAll(){
            return $http.get('/items').then(function(response){
                return response.data;
            });
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

        function uploadImage(file) {
            return Upload.upload({
                url: '/upload',
                method: 'POST',
                file: file
            }).then(function (response) {
                return response.data;
            });
        }

        function updateItem(item){
            return $http.put('/items/', item).then(function(response){
                return response.data;
            });
        }

        function deleteItem(id){
            return $http.delete('/items/' + id).then(function(response){
                return response.data;
            });
        }

        function filterByCategory(category){
            return $http.get('/category-items/' + category).then(function(response){
                return response.data;
            });
        }
    }
})();