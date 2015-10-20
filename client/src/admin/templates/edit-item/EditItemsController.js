(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditItemsController', EditItemsController);

    function EditItemsController(item, ItemsService, $state) {

        var vm = this;

        angular.extend(vm, {
            item: item,
            imageIndex: 0,
            currentImage: currentImage,
            previousImage: previousImage,
            nextImage: nextImage,
            message: '',
            saveChanges: saveChanges,
            uploadImage: ItemsService.uploadImage,
            deleteItem: deleteItem
        });

        function currentImage(){
            return vm.item.images[vm.imageIndex];
        }

        function previousImage(){
            if(vm.imageIndex !== 0){
                vm.imageIndex -= 1;
            }
        }

        function nextImage(){
            if(vm.imageIndex < vm.item.images.length-1){
                vm.imageIndex += 1;
            }
        }

        function saveChanges(){
            var productImage = vm.item.file;
            if(productImage){
                ItemsService.uploadImage(productImage).then(function(filename){
                    vm.item.images[0] = filename;

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