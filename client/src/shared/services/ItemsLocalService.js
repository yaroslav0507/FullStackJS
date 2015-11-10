(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsLocalService', ItemsLocalService);

    function ItemsLocalService(){

        var service = {
            makeShortDescriptions: makeShortDescriptions
        };

        return service;

        function makeShortDescriptions(length, item) {
            if (item.description.length > length) {
                item.shortDescription = item.description.substr(0, length - 2) + '..';
            } else {
                item.shortDescription = item.description;
            }
            return item;
        }
    }
})();