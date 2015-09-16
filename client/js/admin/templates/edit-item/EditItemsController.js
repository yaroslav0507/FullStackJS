(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditItemsController', EditItemsController);

    function EditItemsController(item, ItemsService) {

        var vm = this;

        angular.extend(vm, {
            item: item,
            saveChanges: saveChanges
        });

        function saveChanges(){
            ItemsService.updateItem(vm.item).then(function () {

            });
        }

    }
})();