(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService($http){

        var service = {
            items: [],
            getAll: getAll
        };

        function getAll(){
            return $http.get('results.json').then(function(response){
                service.items = response.data;
            })
        };

        return service;
    }
})();