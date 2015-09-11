(function(){
    'use strict';

    angular
        .module('app')
        .controller('ItemsController', ItemsController);

    function ItemsController($modal, items, ItemsService){

        var vm = this;

        angular.extend(vm, {
            items: items,
            item: {
                title: '',
                description: '',
                price: ''
            },
            addItem: addItem,
            deleteItem: deleteItem,
            openDialog: openDialog
        });

        function addItem(){
            ItemsService.addItem(vm.item).then(function(){
                vm.items.push(vm.item);
                makeShortDescriptions(160);
            });
        }

        function deleteItem(item){
            var id = item._id;
            ItemsService.deleteItem(id).then(function(){
               vm.items = vm.items.filter(function (vmItem) {
                   return vmItem._id !== id;
               });
            });
        }

        function makeShortDescriptions(length){
            vm.items.forEach(function(item){
                if(item.description.length > length){
                    item.shortDescription = item.description.substr(0, length) + '..';
                } else {
                    item.shortDescription = item.description
                }
            });
        }

        makeShortDescriptions(160);

        function openDialog(item){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'shared/dialog/base-dialog.html',
                controller: 'ItemsController',
                controllerAs: 'itemsCtrl',
                item: item,
                resolve: {
                    items: ItemsService.getAll()
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
})();