(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsController', ItemsController);

    function ItemsController(items, ItemsService, $q) {

        var vm = this;
        var tempImageName = 'uploaded_item_image_name';

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 1200)),
            item: {
            },
            message: '',
            addItem: addItem,
            uploadImage: ItemsService.uploadImage,
            deleteItem: deleteItem,
            validateInputs: validateInputs
        });


        function validateInputs() {
            if (vm.item.title && vm.item.price && vm.item.description) {
                return true;
            } else {
                vm.message = 'Please fill out all fields';
                return false;
            }
        }

        function addItem() {
            if (vm.validateInputs()) {
                vm.uploadImage(vm.item.file).then(function(filename){

                    generateURL(filename);

                    ItemsService.addItem(vm.item).then(function () {
                        vm.items.push(makeShortDescriptions(160, vm.item));
                        vm.item = {};
                    });

                }).catch(function(response){
                    vm.message = response.status + ': ' + response.data;
                    return $q.reject();
                });

            }
        }

        function deleteItem(item) {
            var id = item._id;
            ItemsService.deleteItem(id).then(function () {
                vm.items = vm.items.filter(function (vmItem) {
                    return vmItem._id !== id;
                });
            });
        }


        function makeShortDescriptions(length, item) {
            if (item.description.length > length) {
                item.shortDescription = item.description.substr(0, length) + '..';
            } else {
                item.shortDescription = item.description
            }
            return item;
        }

        /*Check if item has image*/
        function generateURL(filename){
            if(filename){
                vm.item.imageURL = '/images/' + filename;
            } else {
                vm.item.imageURL = '/images/service/no-image.png';
            }
        }

    }
})();