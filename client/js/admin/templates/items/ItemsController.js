(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsController', ItemsController);

    function ItemsController(items, ItemsService, Upload, $timeout) {

        var vm = this;

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 140)),
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
                ItemsService.addItem(vm.item).then(function () {
                    vm.items.push(makeShortDescriptions(160, vm.item));

                    /* Clear input fields */
                    vm.item = {};
                });
            }
        }

        function uploadFile(file) {
            file.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                file: file
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                })
            }, function (response) {
                if (response.status > 0) {
                    vm.error.message = response.status + ': ' + response.data;
                    vm.error.flag = true;
                }
            })
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