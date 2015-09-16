(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditItemsController', EditItemsController);

    function EditItemsController($window, item, ItemsService, Upload, $q) {

        var vm = this;

        angular.extend(vm, {
            item: item
        });

    }
})();