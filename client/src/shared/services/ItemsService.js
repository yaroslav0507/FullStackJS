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
            generateURL: generateURL,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        return service;

        function getAll(){
            return $http.get('/items').then(function(response){
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

        function uploadImage(file) {
            return Upload.upload({
                url: '/upload',
                method: 'POST',
                file: file
            }).then(function (response) {
                return response.data;
            });
        }

        function generateURL(filename){
            if(filename){
                return '/images/items/' + filename;
            } else {
                return '/images/service/no-image.png';
            }
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