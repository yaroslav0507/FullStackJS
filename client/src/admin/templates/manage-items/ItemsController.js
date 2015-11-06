(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsController', ItemsController);

    function ItemsController(items, ItemsService, categories, $q) {

        var vm = this;

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 120)),
            item: {},
            getAllItems: getAllItems,
            categories: categories,
            addItem: addItem,
            deleteItem: deleteItem,
            validateInputs: validateInputs,
            selectCategory: selectCategory,
            filterByCategory: filterByCategory
        });

        function selectCategory(category){
            vm.item.category = category;
        }

        function filterByCategory(category){
            ItemsService.filterByCategory(category).then(function(response){
                vm.items = response;
            });
        }

        function getAllItems(){
            ItemsService.getAll().then(function(response){
                vm.items = response;
            });
        }

        function validateInputs() {
            if (vm.item.title && vm.item.price && vm.item.description) {
                return true;
            } else {
                vm.message = 'Please fill out all fields';
                return true;
            }
        }

        function addItem() {
            if (vm.validateInputs()) {
                ItemsService.uploadImage(vm.item.files).then(function(imageNames){
                    vm.item.images = imageNames;
                })
                .then(function(){
                        return ItemsService.addItem(vm.item);
                    })
                .then(function (response) {
                        console.log(response);
                        vm.items.push(makeShortDescriptions(160, response));
                        vm.item = {};
                })
                .catch(function(response){
                    vm.message = response.status + ': ' + response.data;
                    return $q.reject();
                });

            }
        }

        function deleteItem(item) {
            var id = item._id;
            console.log(id);

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
                item.shortDescription = item.description;
            }
            return item;
        }

    }
})();