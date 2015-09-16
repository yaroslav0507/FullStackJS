(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsController', ItemsController);

    function ItemsController($window, items, ItemsService, Upload, $q) {

        var vm = this;
        var tempImageName = 'uploaded_item_image_name';

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 1200)),
            item: {},

            error: {
                flag: false,
                message: ''
            },
            addItem: addItem,
            uploadFile: uploadFile,
            deleteItem: deleteItem,
            validateInputs: validateInputs
        });


        function validateInputs() {
            if (vm.item.title && vm.item.price && vm.item.description) {
                vm.error.flag = false;
                return true;
            } else {
                vm.error.message = 'Please fill out all fields';
                vm.error.flag = true;
                return false;
            }
        }

        function addItem() {
            if (vm.validateInputs()) {
                vm.uploadFile(vm.item.file).then(function(filename){
                    vm.item.imageURL = '/images/' + filename;

                    ItemsService.addItem(vm.item).then(function () {
                        vm.items.push(makeShortDescriptions(160, vm.item));
                        vm.item = {};
                    });
                }).catch(function(response){
                        vm.error.message = response.status + ': ' + response.data;
                        vm.error.flag = true;
                        return $q.reject();
                    });

            }
        }

        function uploadFile(file) {
            return Upload.upload({
                url: '/upload',
                method: 'POST',
                file: file
            }).then(function (response) {
                $window.localStorage.setItem(tempImageName, response.data);
                return response.data
            });
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

    }
})();