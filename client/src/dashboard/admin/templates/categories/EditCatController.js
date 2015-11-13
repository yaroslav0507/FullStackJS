(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditCategoriesController', EditCategoriesController);

    function EditCategoriesController(categories, CategoriesService) {

        var vm = this;

        angular.extend(vm, {
            category: {},
            categories: categories,
            addNew: addNew,
            deleteCategory: deleteCategory
        });


        function addNew(){
            if(vm.category.name.length){
                CategoriesService.addNew(vm.category).then(function(response){
                    vm.categories.push(response);
                    vm.category = {};
                });
            }
        }

        function deleteCategory(category) {
            var id = category._id;

            CategoriesService.deleteCategory(id).then(function () {
                vm.categories = vm.categories.filter(function (vmCat) {
                    return vmCat._id !== id;
                });
            });
        }



    }
})();