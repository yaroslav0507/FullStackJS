(function(){
    'use strict';

    angular
        .module('app')
        .factory('CategoriesService', CategoriesService);

    function CategoriesService($http){

        var service = {
            getAll: getAll,
            addNew: addNew,
            deleteCategory: deleteCategory
        };

        return service;

        function getAll(){
            return $http.get('/categories/').then(function(response){
                return response.data;
            });
        }

        function addNew(category){
            return $http.post('/categories/', category).then(function(response){
                return response.data;
            });
        }

        function deleteCategory(id){
            return $http.delete('/categories/' + id).then(function(response){
                return response.data;
            });
        }


    }
})();