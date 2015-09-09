(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService($http){

        var service = {
            getAll: getAll
        };

        return service;

        function getAll(){
            return $http.get('/items').then(function(response){
                return response.data;
            })
        };
    }
})();