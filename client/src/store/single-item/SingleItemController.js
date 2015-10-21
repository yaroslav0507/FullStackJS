(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleItemController', SingleItemController);

    function SingleItemController(item, CartService) {

        var vm = this;

        angular.extend(vm, {
            item: item,
            addToCart: addToCart
        });

        vm.item.qty = 1;

        function addToCart(){
            CartService.addToCart(item);
        }

    }
})();