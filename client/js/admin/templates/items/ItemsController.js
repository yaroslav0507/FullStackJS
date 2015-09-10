(function(){
    'use strict';

    angular
        .module('app')
        .controller('ItemsController', ItemsController);

    function ItemsController(items, ItemsService){

        var vm = this;

        angular.extend(vm, {
            items: items,
            deleteItem: ItemsService.deleteItem()
        });

        console.log(vm.items);
    }
})();