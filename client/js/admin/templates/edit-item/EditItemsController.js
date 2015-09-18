(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditItemsController', EditItemsController);

    function EditItemsController(item, ItemsService, $state) {

        var vm = this;

        angular.extend(vm, {
            item: item,
            message: '',
            saveChanges: saveChanges,
            uploadImage: ItemsService.uploadImage,
            deleteItem: deleteItem
        });

        function saveChanges(){
            var productImage = vm.item.file;
            if(productImage){
                ItemsService.uploadImage(productImage).then(function(filename){
                    vm.item.imageURL = '/images/items/' + filename;

                    ItemsService.updateItem(vm.item).then(function () {
                        vm.message = vm.item.title + ' successfully updated.';
                    });
                })
            } else {
                ItemsService.updateItem(vm.item).then(function () {
                    vm.message = vm.item.title + ' successfully updated.';
                });
            }
        }

        function deleteItem() {
            var id = vm.item._id;
            ItemsService.deleteItem(id).then(function () {
                $state.go('admin.main');
            });
        }
    }
})();