(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditItemsController', EditItemsController);

    function EditItemsController(item, categories,  ItemsService, $state) {

        var vm = this;

        angular.extend(vm, {
            item: item,
            categories: categories,
            imageIndex: 0,
            checkMainImage: checkMainImage,
            showMainThumbnail: true,
            message: '',
            uploadImage: ItemsService.uploadImage,
            currentImage: currentImage,
            selectImage: selectImage,
            addImages: addImages,
            deleteImage: deleteImage,
            saveChanges: saveChanges,
            deleteItem: deleteItem,
            selectCategory: selectCategory
        });

        function currentImage(){
            return vm.item.images[vm.imageIndex];
        }

        function selectImage(index){
            vm.imageIndex = index;
        }

        function checkMainImage(){
            vm.item.mainImageIndex = vm.imageIndex;
            console.log("image index", vm.item.mainImageIndex);
        }

        function saveChanges(){
            ItemsService.updateItem(vm.item).then(function (item) {
                vm.message = vm.item.title + ' successfully updated.';
            });
        }

        function addImages(){
            var productImage = vm.item.files;
            ItemsService.uploadImage(productImage).then(function(urls){
                vm.item.images.push(urls[0]);
                return vm.item;
            }).then(function(item) {
                console.log(item);
                ItemsService.updateItem(item);

            })
              .then(function () {
                    console.log(vm.item.images);
                    vm.message = vm.item.title + ' successfully updated.';
            });
            vm.item.files = undefined;
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

        function selectCategory(category){
            vm.item.category = category.name;
        }


    }
})();