(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService(){

        var o = {
            items: []
        };

        return o;
    }
})();