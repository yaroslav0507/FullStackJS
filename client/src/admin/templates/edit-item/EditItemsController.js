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
            showMainThumbnail: true,
            message: '',
            uploadImage: ItemsService.uploadImage,
            currentImage: currentImage,
            selectImage: selectImage,
            deleteImage: deleteImage,
            saveChanges: saveChanges,
            deleteItem: deleteItem
        });

        function currentImage(){
            return vm.item.images[vm.imageIndex];
        }

        function selectImage(index){
            vm.imageIndex = index;
        }

        function saveChanges(){
            var productImage = vm.item.files;

            if(productImage){
                ItemsService.uploadImage(productImage).then(function(urls){

                    vm.item.images = urls;

                    ItemsService.updateItem(vm.item).then(function (item) {
                        vm.message = vm.item.title + ' successfully updated.';
                    });
                    vm.item.files = undefined;
                })
            } else {
                ItemsService.updateItem(vm.item).then(function (item) {
                    vm.message = vm.item.title + ' successfully updated.';
                });
            }
        }

        function deleteImage(){
            var index = vm.imageIndex;
            vm.item.images.splice(index, 1);

            console.log( vm.item.images);
            if(vm.item.images.length == 1){
                vm.showMainThumbnail = false;
                console.log("last image");
            }

            saveChanges();

            vm.imageIndex = 0;
        }

        function deleteItem() {
            var id = vm.item._id;
            ItemsService.deleteItem(id).then(function () {
                $state.go('admin.main');
            });
        }

    }
})();