(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoryItemsController', CategoryItemsController);

    function CategoryItemsController(items, CartService) {

        var vm = this;

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 400)),
        });

        function makeShortDescriptions(length, item) {
            if (item.description.length > length) {
                item.shortDescription = item.description.substr(0, length) + '..';
            } else {
                item.shortDescription = item.description;
            }
            return item;
        }
    }
})();