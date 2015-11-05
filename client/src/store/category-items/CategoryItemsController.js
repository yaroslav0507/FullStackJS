(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoryItemsController', CategoryItemsController);

    function CategoryItemsController(items, ItemsLocalService) {

        var vm = this;

        angular.extend(vm, {
            items: items.map(ItemsLocalService.makeShortDescriptions.bind(null, 375))
        });


    }
})();